import { defaultConnection } from '../Api/TMDB/TMDBConnection';
import { observable } from 'mobx';
import { TMDBSession } from '../Api/TMDB/TMDBSession';

class AuthStore {
    @observable 
    public session: TMDBSession | null =  AuthStore.sessionFromLocalStorage();

    static sessionFromLocalStorage(): TMDBSession | null {
        const ssid = window.localStorage.getItem('ssid');
        return ssid ? new TMDBSession(ssid) : null;
    }

    public setSession(session: TMDBSession | null) {
        this.session = session;
        if (session) {
            defaultConnection.setSession(session);
        } else {
            defaultConnection.destroySession();
        }
    }

}

export const authStore = new AuthStore();