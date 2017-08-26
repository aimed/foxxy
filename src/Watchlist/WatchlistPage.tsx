import './WatchlistPage.css';
import { TMDBMovie } from '../Api/TMDB/TMDBMovie';
import { TMDBAccount } from '../Api/TMDB/TMDBAccount';
import { defaultConnection } from '../Api/TMDB/TMDBConnection';
import * as React from 'react';
import { authStore } from '../stores/AuthStore';
import { Redirect } from 'react-router';
import { Spinner } from '../Common/Spinner/Spinner';

interface WatchlistPageState {
    account?: TMDBAccount;
    watchlist: TMDBMovie[];
    loadedWatchlist: boolean;
}

export class WatchlistPage extends React.Component<{}, WatchlistPageState> {
    public state: WatchlistPageState = {
        watchlist: [],
        loadedWatchlist: false
    };

    public async componentDidMount() {
        const session = authStore.session;
        if (!session) {
            return;
        }

        const account = await TMDBAccount.getAccount(defaultConnection);
        if (!account) {
            return;
        }
        this.setState({ account });

        const watchlist = await TMDBAccount.getWatchlist(defaultConnection, account.id);
        if (!watchlist) {
            return;
        }

        const movies = [...this.state.watchlist, ...watchlist.entries];
        this.setState({ watchlist: movies, loadedWatchlist: true });
    }

    public render() {
        const session = authStore.session;

        if (!session) {
            return <Redirect to="/login" />;
        }

        if (!this.state.account) {
            return <Spinner text="Getting account info" />;
        }

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