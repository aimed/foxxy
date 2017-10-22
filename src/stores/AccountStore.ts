import { TMDBAccount } from '../Api/TMDB/TMDBAccount';
import { TMDBSession } from '../Api/TMDB/TMDBSession';
import { defaultConnection } from '../Api/TMDB/TMDBConnection';
import { observable } from 'mobx';

export class AccountStore {
    @observable 
    public session: TMDBSession | null =  AccountStore.sessionFromLocalStorage();

    @observable
    public account: TMDBAccount | null = null;

    static sessionFromLocalStorage(): TMDBSession | null {
        const ssid = window.localStorage && window.localStorage.getItem('ssid');
        return ssid ? new TMDBSession(ssid) : null;
    }

    public setSession(session: TMDBSession | null) {
        this.session = session;
        if (session) {
            defaultConnection.setSession(session);
        } else {
            this.account = null;
            defaultConnection.destroySession();
        }
    }

}

export const accountStore = new AccountStore();