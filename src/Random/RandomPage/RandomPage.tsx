import './RandomPage.css';

import * as React from 'react';

import { DiscoverOptions, TMDBMovie } from '../../Api/TMDB/TMDBMovie';
import { QueryRenderer, QueryRendererComponentProps } from '../../Common/QueryRenderer/QueryRenderer';

import { FilterMenuWithData } from '../FilterMenu/FilterMenu';
import { MakeTMDBDate } from '../../Api/TMDB/TMDBDate';
import { RandomPageDetails } from './RandomPageDetails';
import { RandomPageHeader } from './RandomPageHeader';
import { RandomPageHero } from './RandomPageHero';
import { RollHistory } from '../RollHistory/RollHistory';
import { TMDBAccount } from '../../Api/TMDB/TMDBAccount';
import { TMDBGenre } from '../../Api/TMDB/TMDBGenre';
import { connectionStore } from '../../stores/ConnectionStore';
import { filtersStore } from '../../stores/FiltersStore';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { randomStore } from '../../stores/RandomStore';

/**
 * Create a random number between 0 and max.
 * 
 * @param {number} max 
 * @returns {number} 
 */
function randomInt(max: number): number {
    return Math.floor(Math.random() * (max + 1));
}

/**
 * Utility function to randomly select an element in an array.
 * 
 * @template T 
 * @param {T[]} items 
 * @returns {(T | null)}
 */
function randomInArray<T>(items: T[]): T | null {
    if (items.length === 0) {
        return null;
    }
    const max = items.length - 1;
    const rnd = randomInt(max);
    return items[rnd];
}

/**
 * Data required for the page.
 */
type QueryData = {
    movies: TMDBMovie[];
};

/**
 * 
 * 
 * @export
 * @interface RandomPageProps
 * @extends {QueryRendererComponentProps<QueryData>}
 */
export interface RandomPageProps extends QueryRendererComponentProps<QueryData> { }

/**
 * 
 * 
 * @export
 * @class RandomPage
 * @extends {React.Component<RandomPageProps, {}>}
 */
@observer
export class RandomPage extends React.Component<RandomPageProps, {}> {
    @observable
    public randomMovie: TMDBMovie | null = null;

    @observable
    public showFilters: boolean = false;

    @observable
    public rollHistory: TMDBMovie[] = [];

    public reroll = () => {
        const movie = randomInArray(this.props.data.movies);
        this.randomMovie = movie;
        randomStore.setRerollCount(randomStore.rerollCount + 1);

        if (movie && !this.rollHistory.find(m => m.id === movie.id)) {
            this.rollHistory = [...this.rollHistory, movie];
        }
    }

    public componentDidMount() {
        this.reroll();
    }

    public componentWillReceiveProps(next: RandomPageProps) {
        if (this.props.data.movies !== next.data.movies) {
            this.reroll();
        }
    }

    public render() {
        const movie = this.randomMovie;

        if (!movie) {
            return null;
        }

        return (
            <div className="random-page">
                <RandomPageHeader onReroll={this.reroll} onToggleFilters={() => this.showFilters = !this.showFilters} />
                {this.showFilters && <FilterMenuWithData />}
                <RandomPageHero movie={movie} />
                <RandomPageDetails movie={movie} />
                <RollHistory history={this.rollHistory} />
            </div>
        );
    }
}

type QueryVariables = {
    language: string;
    genre: TMDBGenre | null;
    watchlist: boolean;
};

/**
 * 
 * 
 * @export
 * @class RandomPageWithData
 * @extends {React.Component<{}, {}>}
 */
@observer
export class RandomPageWithData extends React.Component<{}, {}> {
    /**
     * Performs queries to display the RandomPage
     * 
     * @memberof RandomPageWithData
     */
    query = async (variables: QueryVariables): Promise<QueryData> => {
        // The users account if availiable.
        const { connection } = connectionStore;
        const account = await connectionStore.whenAccount();
        
        const { genre, language } = variables;

        // Pick a random movie from the last 20 years.
        // Assume that at least 20 pages exist.
        const page = randomInt(20);
        const twentyYearsAgo = new Date();
        twentyYearsAgo.setFullYear(new Date().getFullYear() - 20);

        const discoverOptions: DiscoverOptions = {
            'primary_release_date.gte': MakeTMDBDate(twentyYearsAgo),
            'vote_average.gte': 5,
            'page': page
        };

        if (genre) {
            discoverOptions.with_genres = '' + genre.id;
        }
        
        // The movies to randomly select one from.
        const useWatchlist = account && variables.watchlist;
        const moviesPage = account && useWatchlist
            ? await TMDBAccount.getWatchlist(connection, account, 1, language)
            : await TMDBMovie.discover(connection, discoverOptions, language);
        const movies = useWatchlist && genre
            // tslint:disable-next-line:max-line-length
            ? moviesPage.entries.filter(movie => movie.genreIds.find(gid => gid === genre.id))
            : moviesPage.entries;
        
        return {
            movies
        };
    }

    render() {
        const { language } = connectionStore;
        const { genre, watchlist } = filtersStore;
        const variables: QueryVariables = { genre, watchlist, language };
        return (
            <QueryRenderer
                variables={variables}
                query={this.query}
                component={RandomPage}
            />
        );
    }
}
