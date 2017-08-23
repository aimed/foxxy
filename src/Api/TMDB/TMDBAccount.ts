import { TMDBMovie } from './TMDBMovie';
import { TMDBPage } from './TMDBPage';
import { TMDBConnection } from './TMDBConnection';

export class TMDBAccount {
    public id: number;
    public username: string;
    
    public static async getAccount(con: TMDBConnection) {
        const session = con.getSession();
        if (!session) {
            throw new Error('Connection needs an active session');
        }

        if (session.account) {
            return session.account;
        }

        const account = await con.getRequest(TMDBAccount.fromJSON, `/account`);
        session.account = account;
        
        return account;
    }

    public static getWatchlist(con: TMDBConnection, id: number, page: number = 1): Promise<TMDBPage<TMDBMovie>> {
        return con.getRequest(TMDBPage.fromJSON(TMDBMovie.fromJSON), `/account/${id}/watchlist/movies`, { page });
    }

    public static fromJSON(data: any): TMDBAccount {
        return new TMDBAccount(data.id, data.username);
    }
    
    constructor(id: number, username: string) {
        this.id = id;
        this.username = username;
    }
}