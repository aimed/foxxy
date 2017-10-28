import { autorun, computed, observable, when } from 'mobx';

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
        this.connection.setSession(session);

        if (!session) {
            // Remove account and session data from local storage.
            this.account = null;
            // tslint:disable-next-line:no-unused-expression
            this.session && window.localStorage.removeItem(this.session.sessionId);
            window.localStorage.removeItem('ssid');
        } else {
            window.localStorage.setItem('ssid', session.sessionId);
            this.account = ConnectionStore.accountFromLocalStorage(session);
            TMDBAccount.getAccount(this.connection).then(account => {
                this.account = account;
                // Cache the account response.
                window.localStorage.setItem(session.sessionId, JSON.stringify(account));
            });
        }
        this._session = session;
    }

    private static sessionFromLocalStorage(): TMDBSession | null {
        const ssid = window.localStorage && window.localStorage.getItem('ssid');
        return ssid ? new TMDBSession(ssid) : null;
    }

    private static accountFromLocalStorage(session: TMDBSession): TMDBAccount | null {
        // Check for cached account data that belongs to the account.
        const cachedAccount = window.localStorage.getItem(session.sessionId);
        if (cachedAccount) {
            return TMDBAccount.fromJSON(JSON.parse(cachedAccount));
        }
        return null;
    }

    constructor() {
        this.session = ConnectionStore.sessionFromLocalStorage();

        autorun(() => {
            // Always bind the stores session to it's connection.
            this.connection.setSession(this.session);
        });
    }

    public whenAccount(): Promise<TMDBAccount | null> {
        if (!this.session) {
            return Promise.resolve(null);
        }

        if (this.account) {
            return Promise.resolve(this.account);
        }

        return new Promise((resolve, reject) => when(
            () => !!this.account,
            () => resolve(this.account)
        ));
    }
}

export const connectionStore = new ConnectionStore();