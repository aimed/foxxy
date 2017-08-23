import * as querystring from 'querystring';
import { TMDBSession } from './TMDBSession';

export class TMDBConnection {
    private _apiKey: string;
    private _baseUrl: string = 'https://api.themoviedb.org/3';

    private session: TMDBSession | null = null;

    constructor(apiKey: string) {
        this._apiKey = apiKey;
    }

    public getSession(): TMDBSession | null {
        const localSession = window.localStorage.getItem('ssid');
        if (!this.session && localSession) {
            this.session = new TMDBSession(localSession);
        }
        return this.session;
    }

    public setSession(session: TMDBSession) {
        this.session = session;
    }

    public destroySession() {
        window.localStorage.removeItem('ssid');
    }

    public async getRequest<T>(responseParser: (response: any) => T, endpoint: string, query: Object = {}): Promise<T> {
        const queryData = { 
            ...query, 
            api_key: this._apiKey, 
            session_id: this.session ? this.session.sessionId : undefined 
        };
        const queryString = querystring.stringify(queryData);
        const url = `${this._baseUrl}${endpoint}?${queryString}`;
        const response = await window.fetch(url);
        const json = await response.json();
        return responseParser(json);
    }
}

const tmdbApiKey = process.env.TMDB_API_KEY as string || '640bd7ae03ae22f56de919c278fdd070';

if (!tmdbApiKey) {
    throw new Error('No TMDB_API_KEY set.');
}

export const defaultConnection = new TMDBConnection(tmdbApiKey);
