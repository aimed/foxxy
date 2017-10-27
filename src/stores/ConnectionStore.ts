import { autorun, computed, observable } from 'mobx';

import { TMDBAccount } from '../Api/TMDB/TMDBAccount';
import { TMDBConnection } from '../Api/TMDB/TMDBConnection';
import { TMDBSession } from '../Api/TMDB/TMDBSession';

const tmdbApiKey = process.env.REACT_APP_TMDB_API_KEY as string;

if (!tmdbApiKey) {
    throw new Error('No REACT_APP_TMDB_API_KEY set.');
}

export class ConnectionStore {
    public connection: TMDBConnection = new TMDBConnection(tmdbApiKey);
    
    @observable
    public account: TMDBAccount | null = null;
    
    @observable
    private _session: TMDBSession | null = null;

    @computed
    public get session() {
        return this._session;
    }

    public set session(session: TMDBSession | null) {
        this._session = session;
        this.connection.setSession(session);
        
        if (!session) {
            this.account = null;
            window.localStorage.removeItem('ssid');
        } else {
            window.localStorage.setItem('ssid', session.sessionId);
            TMDBAccount.getAccount(this.connection).then(account => this.account = account);
        }
    }

    private static sessionFromLocalStorage(): TMDBSession | null {
        const ssid = window.localStorage && window.localStorage.getItem('ssid');
        return ssid ? new TMDBSession(ssid) : null;
    }

    constructor() {
        this.session = ConnectionStore.sessionFromLocalStorage();
        autorun(() => {
            // Always bind the stores session to it's connection.
            this.connection.setSession(this.session);
        });
    }
}

export const connectionStore = new ConnectionStore();