import './WatchlistPage.css';
import { TMDBMovie } from '../Api/TMDB/TMDBMovie';
import { TMDBAccount } from '../Api/TMDB/TMDBAccount';
import { defaultConnection } from '../Api/TMDB/TMDBConnection';
import * as React from 'react';
import { accountStore } from '../stores/AuthStore';
import { Spinner } from '../Common/Spinner/Spinner';

interface WatchlistPageState {
    watchlist: TMDBMovie[];
    loadedWatchlist: boolean;
}

export class WatchlistPage extends React.Component<{}, WatchlistPageState> {
    public state: WatchlistPageState = {
        watchlist: [],
        loadedWatchlist: false
    };

    public async componentDidMount() {
        const account = accountStore.account;
        if (!account) {
            throw new Error('Account needed');
        }

        const watchlist = await TMDBAccount.getWatchlist(defaultConnection, account);
        if (!watchlist) {
            return;
        }

        const movies = [...this.state.watchlist, ...watchlist.entries];
        this.setState({ watchlist: movies, loadedWatchlist: true });
    }

    public render() {
        if (!this.state.loadedWatchlist) {
            return <Spinner text="Loading Watchlist" />;
        }

        return (
            <div className="watchlist">
                <ul>
                    {this.state.watchlist.map(movie => (<li key={movie.id}>{movie.title}</li>))}
                </ul>
            </div>
        );
    }
}