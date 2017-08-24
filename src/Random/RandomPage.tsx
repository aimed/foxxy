import { Button } from '../Common/Button/Button';
import { Spinner } from '../Common/Spinner/Spinner';
import { defaultConnection } from '../Api/TMDB/TMDBConnection';
import { TMDBAccount } from '../Api/TMDB/TMDBAccount';
import { TMDBMovie } from '../Api/TMDB/TMDBMovie';
import * as React from 'react';
import './RandomPage.css';

interface RandomPageState {
    account?: TMDBAccount;
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

export class RandomPage extends React.Component<{}, RandomPageState> {
    public state: RandomPageState = {
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
        const randomMovie = randomInArray(movies);
        this.setState({ watchlist: movies, randomMovie });
    }

    public reselectMovie = () => {
        const randomMovie = randomInArray(this.state.watchlist);
        this.setState({ randomMovie });
    }
    
    public render() {
        if (!this.state.account) {  
            return <Spinner text="Getting account info" />;
        }

        const movie = this.state.randomMovie;

        if (!movie) {
            return <Spinner text="Picking a random movie" />;
        }

        return (
            <div className="random">
                <div className="random__movie">
                    {movie.posterPath && 
                        <img 
                            src={`https://image.tmdb.org/t/p/w500/${movie.posterPath}`} 
                            className="random__movie__poster" 
                        />
                    }
                    {movie.backdropPath &&
                        <div
                            style={{backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdropPath})`}} 
                            className="random__movie__backdrop" 
                        />
                    }
                    <div className="random__movie__info">
                        <h1 className="random__title">{movie.title}</h1>
                        <div className="random__summary">{movie.overview}</div>
                    </div>
                </div>
                <div className="random__reroll">
                    <Button onClick={this.reselectMovie}>Reroll</Button>
                </div>
            </div>
        );
    }

}