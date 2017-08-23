import { TMDBMovie } from '../Api/TMDB/TMDBMovie';
import { TMDBAccount } from '../Api/TMDB/TMDBAccount';
import { defaultConnection } from '../Api/TMDB/TMDBConnection';
import * as React from 'react';

interface WatchlistPageState {
    account?: TMDBAccount;
    watchlist: TMDBMovie[];
}

export class WatchlistPage extends React.Component<{}, WatchlistPageState> {
    public state: WatchlistPageState = {
        watchlist: []
    };

    public async componentDidMount() {
        const session = defaultConnection.getSession();
        
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
        this.setState({ watchlist: movies });
    }

    public render() {
        return (
            <div>
                <div className="watchlist">
                    {this.state.watchlist.map(movie => (<div key={movie.id}>{movie.title}</div>))}
                </div>
            </div>
        );
    }
}