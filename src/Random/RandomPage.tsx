import './RandomPage.css';

import * as React from 'react';

import { Button } from '../Common/Button/Button';
import { MoviePoster } from '../Movie/MoviePoster';
import { Spinner } from '../Common/Spinner/Spinner';
import { TMDBAccount } from '../Api/TMDB/TMDBAccount';
import { TMDBGenre } from '../Api/TMDB/TMDBGenre';
import { TMDBMovie } from '../Api/TMDB/TMDBMovie';
import { accountStore } from '../stores/AccountStore';
import { defaultConnection } from '../Api/TMDB/TMDBConnection';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { randomStore } from '../stores/RandomStore';

interface RandomPageState {
    watchlist: TMDBMovie[];
    randomMovie?: TMDBMovie | null;
}

function randomInArray<T>(items: T[]): T | null {
    if (items.length === 0) {
        return null;
    }
    const max = items.length - 1;
    const rnd = Math.floor(Math.random() * (max + 1));
    return items[rnd];
}

@observer
export class RandomPage extends React.Component<{}, RandomPageState> {
    @observable
    public watchlistLoaded: boolean = false;

    @observable
    public genres: TMDBGenre[] | null = null;

    @observable
    public selectedGenre?: TMDBGenre | null = undefined;

    public state: RandomPageState = {
        watchlist: [],
    };

    public async componentDidMount() {
        if (!accountStore.account) {
            throw new Error('Account needed');
        }

        const watchlist = await TMDBAccount.getWatchlist(defaultConnection, accountStore.account);
        this.watchlistLoaded = true;

        const movies = [...this.state.watchlist, ...watchlist.entries];
        this.setState({ watchlist: movies });

        this.genres = await TMDBGenre.getGenres(defaultConnection);
    }

    public reselectMovie = () => {
        const didSelect = !!this.selectedGenre;
        const selected = didSelect 
        ? this.state.watchlist.filter(m => m.genreIds.find(g => !!this.selectedGenre && g === this.selectedGenre.id)) 
        : this.state.watchlist;

        if (selected.length === 0) {
            this.selectedGenre = undefined;
            return;
        }
        
        const randomMovie = randomInArray(selected);
        this.setState({ randomMovie });
        randomStore.setRerollCount(randomStore.rerollCount + 1);
    }

    public markCurrentMovieAsWatched = async () => {
        const account = accountStore.account;
        const { randomMovie } = this.state;
        if (!account || !randomMovie) {
            return;
        }
        await TMDBAccount.addToWatchlist(defaultConnection, account, randomMovie, false);
        
        const watchlist = this.state.watchlist.filter(m => m.id !== randomMovie.id);
        this.setState({ watchlist });
        this.reselectMovie();
    }

    public render() {
        if (this.selectedGenre === undefined) {
            return this.renderGenrePicker();
        }

        const movie = this.state.randomMovie;
        if (!movie) {
            return <Spinner text="Picking a random movie" />;
        }

        const rerollsLeft = 3 - randomStore.rerollCount;
        const canReroll = rerollsLeft > 0;

        return (
            <div className="random">
                <div className="random__movie">
                    <div className="random__movie__poster-container">
                        <div>
                            <MoviePoster movie={movie} />
                        </div>
                    </div>
                    <div className="random__movie__info">
                        <h1 className="random__title">{movie.title}</h1>
                        <div className="random__summary">{movie.overview}</div>
                        {canReroll && 
                            <div className="random__reroll">
                                <Button onClick={this.reselectMovie}>Reroll ({rerollsLeft})</Button>
                            </div>
                        }
                        <div className="random__rate">
                                <Button onClick={this.markCurrentMovieAsWatched}>Remove from Watchlist</Button>
                        </div>
                    </div>

                    {movie.backdropPath &&
                        <div
                            className="random__movie__backdrop" 
                            style={{backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdropPath})`}} 
                        />
                    }
                </div>
            </div>
        );
    }

    private selectGenreHandler(genre: TMDBGenre | null) {
        return () => {
            this.selectedGenre = genre;
            this.reselectMovie();
        };
    }

    private renderGenrePicker() {
        if (this.genres === null) {
            return <Spinner text="Getting genres" />;
        }

        if (!this.watchlistLoaded) {  
            return <Spinner text="Getting watchlist" />;
        }
        const selectableGenres = {};
        this.state.watchlist.forEach(v => v.genreIds.forEach(g => { selectableGenres[g] = true; }));
        const selg = this.genres.filter(g => selectableGenres[g.id]);

        return (
            <div className="random__genres">
                <Button onClick={this.selectGenreHandler(null)}>All Genres</Button>
                {selg.map(g => <Button key={g.id} onClick={this.selectGenreHandler(g)}>{g.name}</Button>)}
            </div>
        );
    }
}