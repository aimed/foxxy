import * as React from 'react';

import { DiscoverOptions, TMDBMovie } from '../../Api/TMDB/TMDBMovie';
import { randomInArray, randomInt } from '../../utils/random';

import { MakeTMDBDate } from '../../Api/TMDB/TMDBDate';
import { TMDBAccount } from '../../Api/TMDB/TMDBAccount';
import { TMDBGenre } from '../../Api/TMDB/TMDBGenre';
import { connectionStore } from '../../stores/ConnectionStore';

type QuerySettings = {
    genre?: TMDBGenre | null;
    language?: string;
};

type Settings = QuerySettings & { watchlist: boolean };

export interface RandomMovieComponentProps { 
    selectedMovie: TMDBMovie | null;
    history: TMDBMovie[]; 
    reroll: () => Promise<void>;
}

export interface RandomMovieProviderState {
    history: TMDBMovie[];
    selectedMovie: TMDBMovie | null;
}
export interface RandomMovieProviderProps {
    settings: Settings;
    children: (data: RandomMovieComponentProps) => JSX.Element;
}

export class RandomMovieProvider extends React.Component<RandomMovieProviderProps, RandomMovieProviderState> {
    state: RandomMovieProviderState = {
        history: [],
        selectedMovie: null,
    };

    pagesForWatchlist = 1;
    pagesForGenre: {[index: number]: number} = {};

    reroll = () => {
        return this.selectRandomMovie(this.props.settings);
    }

    componentDidMount() {
        this.selectRandomMovie(this.props.settings);
    }

    getWatchlistMovies = async (settings: QuerySettings, account: TMDBAccount): Promise<TMDBMovie[]> => {
        const { genre, language } = settings;
        const connection = connectionStore.connection;

        const page = randomInt(1, this.pagesForWatchlist);
        const watchlistPage = await TMDBAccount.getWatchlist(connection, account, page, language);
        const movies = watchlistPage.entries;
        
        this.pagesForWatchlist = watchlistPage.totalPages;

        return genre 
            ? movies.filter(movie => !!movie.genreIds.find(genreId => genreId === genre.id))
            : movies;
    }

    getDiscoverMovies = async (settings: QuerySettings): Promise<TMDBMovie[]> => {
        const connection = connectionStore.connection;
        const { genre, language } = settings;

        // If a genre is set we assumere at least 5 pages of that genre to exist.
        // Otherwise we randomly select one of the first 300 pages.
        const page = randomInt(1, genre ? this.pagesForGenre[genre.id] || 5 : 300);
        const twentyYearsAgo = new Date();
        twentyYearsAgo.setFullYear(new Date().getFullYear() - 20);

        const discoverOptions: DiscoverOptions = {
            'primary_release_date.gte': MakeTMDBDate(twentyYearsAgo),
            'vote_average.gte': 5,
            page
        };

        if (genre) {
            discoverOptions.with_genres = '' + genre.id;
        }

        // The movies to randomly select one from.
        const moviesPage = await TMDBMovie.discover(connection, discoverOptions, language);

        if (genre) {
            this.pagesForGenre[genre.id] = moviesPage.totalPages;
        }

        return moviesPage.entries;
    }

    getMovies = async (settings: Settings): Promise<TMDBMovie[]> => {
        if (settings.watchlist) {
            const account = await connectionStore.whenAccount();
            if (account) {
                return this.getWatchlistMovies(settings, account);
            }
        }

        return this.getDiscoverMovies(settings);
    }

    selectRandomMovie = (settings: Settings) => new Promise<void>(async (resolve, reject) => {
        const movies = await this.getMovies(settings);
        const selectedMovie = randomInArray(movies);
        const history = selectedMovie && !this.state.history.find(movie => movie.id === selectedMovie.id)
            ? [selectedMovie, ...this.state.history] 
            : this.state.history;
        this.setState({ selectedMovie, history }, () => resolve());
    })

    render() {
        const { selectedMovie, history } = this.state;
        return this.props.children({ selectedMovie, history, reroll: this.reroll });
    }
}
