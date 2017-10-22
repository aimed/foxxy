import * as querystring from 'querystring';

import { TMDBSession } from './TMDBSession';

/**
 * Connection used in requests to the tmdb api.
 * 
 * @export
 * @class TMDBConnection
 */
export class TMDBConnection {
    /**
     * The api key of the app. Used to authenticate.
     * 
     * @private
     * @type {string}
     * @memberof TMDBConnection
     */
    private _apiKey: string;

    /**
     * Base url used for requests.
     * 
     * @private
     * @type {string}
     * @memberof TMDBConnection
     */
    private _baseUrl: string = 'https://api.themoviedb.org/3';

    /**
     * A session attached to the request.
     * Used to authenticate the user when performing requests.
     * 
     * @private
     * @type {(TMDBSession | null)}
     * @memberof TMDBConnection
     */
    private session: TMDBSession | null = null;

    /**
     * Checks if the response was successfull.
     * 
     * @static
     * @param {*} data 
     * @returns {boolean} 
     * @memberof TMDBConnection
     */
    public static SuccessResponseParser(data: any): boolean {
        return data.status_code === 1;
    }

    /**
     * Creates an instance of TMDBConnection.
     * @param {string} apiKey 
     * @memberof TMDBConnection
     */
    constructor(apiKey: string) {
        this._apiKey = apiKey;
    }

    /**
     * The authenticated session attached to the connection.
     * 
     * @returns {(TMDBSession | null)} 
     * @memberof TMDBConnection
     */
    public getSession(): TMDBSession | null {
        const localSession = window.localStorage && window.localStorage.getItem('ssid');
        if (!this.session && localSession) {
            this.session = new TMDBSession(localSession);
        }
        return this.session;
    }

    /**
     * Sets the session. This authenticates requests with the given user.
     * 
     * @param {TMDBSession} session 
     * @memberof TMDBConnection
     */
    public setSession(session: TMDBSession) {
        this.session = session;
    }

    /**
     * Destroys the attached session, removing the authentication from following requests.
     * This further clears the localstorage.
     * 
     * @memberof TMDBConnection
     */
    public destroySession() {
        window.localStorage.removeItem('ssid');
        this.session = null;
    }

    /**
     * Performs a get request on the tmdb api.
     * 
     * @template T 
     * @param {(response: any) => T} responseParser 
     * @param {string} endpoint 
     * @param {Object} [query={}] 
     * @returns {Promise<T>} 
     * @memberof TMDBConnection
     */
    public async getRequest<T>(
        responseParser: (response: any) => T, endpoint: string, query: Object = {}): Promise<T> {
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

    /**
     * Performs a post request on the tmdb api.
     * 
     * @template T 
     * @param {(response: any) => T} responseParser 
     * @param {string} endpoint 
     * @param {Object} [data={}] 
     * @param {Object} [query={}] 
     * @returns {Promise<T>} 
     * @memberof TMDBConnection
     */
    public async postRequest<T>(
        responseParser: (response: any) => T, 
        endpoint: string,
        data: Object = {},
        query: Object = {}): Promise<T> {
        const queryData = { 
            ...query, 
            api_key: this._apiKey, 
            session_id: this.session ? this.session.sessionId : undefined 
        };
        const queryString = querystring.stringify(queryData);
        const url = `${this._baseUrl}${endpoint}?${queryString}`;
        const response = await window.fetch(url, { 
            method: 'POST', 
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        });
        const json = await response.json();
        return responseParser(json);
    }
}

const tmdbApiKey = process.env.REACT_APP_TMDB_API_KEY as string;

if (!tmdbApiKey) {
    throw new Error('No REACT_APP_TMDB_API_KEY set.');
}

/**
 * A preconfigured connection that can be used within the app.
 */
export const defaultConnection = new TMDBConnection(tmdbApiKey);
