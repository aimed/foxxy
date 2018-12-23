import { TMDBConnection } from './TMDBConnection';
import { TMDBRequestToken } from './TMDBRequestToken';
import { TMDBSession } from './TMDBSession';

/**
 * Utility to implement the TMDB auth flow.
 * Steps to authenticate a user:
 * - request a TMDBRequestToken -> getRequestToken
 * - authenticate the TMDBRequestToken with imdb -> authenticateRequestToken
 * - having obtained a valid request token, you can then get a TMDBSession -> getSessionId
 * 
 * @export
 * @class TMDBAuthentication
 */
export class TMDBAuthentication {
    /**
     * Gets a valid session id using the given request token.
     * The session can be used to perform actions against the TMDB api
     * on behalf of the user.
     * 
     * @static
     * @param {TMDBConnection} con 
     * @param {TMDBRequestToken} requestToken 
     * @param {boolean} [setSessionOnConnection=true] 
     * @returns {Promise<TMDBSession>} 
     * @memberof TMDBAuthentication
     */
    public static async getSessionId(
        con: TMDBConnection,
        requestToken: TMDBRequestToken,
        setSessionOnConnection: boolean = true,
    ): Promise<TMDBSession> {
        const session = await con.getRequest(
            TMDBSession.fromJSON,
            '/authentication/session/new',
            { request_token: requestToken.requestToken }
        );

        if (setSessionOnConnection) {
            con.setSession(session);
        }

        return session;
    }

    // TODO: Open in PopUp?
    /**
     * Asks the user to authenticate the token by redirecting to the TMDB website.
     * 
     * @static
     * @param {TMDBRequestToken} requestToken 
     * @param {string} redirectUrl URL to redirect to after authenticating the request token.
     * @memberof TMDBAuthentication
     */
    public static authenticateRequestToken(requestToken: TMDBRequestToken, redirectUrl: string): void {
        const redirectTo = encodeURIComponent(redirectUrl);
        // tslint:disable-next-line:max-line-length
        window.location.href = `https://www.themoviedb.org/authenticate/${requestToken.requestToken}?redirect_to=${redirectTo}`;
    }

    /**
     * Acquires a request token that, which can be validated and then used to get a user session.
     * 
     * @static
     * @param {TMDBConnection} con 
     * @returns {Promise<TMDBRequestToken>} 
     * @memberof TMDBAuthentication
     */
    public static async getRequestToken(con: TMDBConnection): Promise<TMDBRequestToken> {
        return con.getRequest(TMDBRequestToken.fromJSON, '/authentication/token/new');
    }

}
