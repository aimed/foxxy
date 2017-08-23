import { TMDBConnection } from './TMDBConnection';
import { TMDBRequestToken } from './TMDBRequestToken';
import { TMDBSession } from './TMDBSession';

export class TMDBAuthentication {
    public static async getSessionId(
        con: TMDBConnection, 
        requestToken: TMDBRequestToken, 
        setSessionOnConnection: boolean = true): Promise<TMDBSession> {
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

    public static async getRequestToken(con: TMDBConnection): Promise<TMDBRequestToken> {
        return con.getRequest(TMDBRequestToken.fromJSON, '/authentication/token/new');
    }

    public static authenticateRequestToken(requestToken: TMDBRequestToken): void {
        const { origin } = window.location;
        const url = `${origin}/tmdb-finalize-auth`;
        const redirectTo = encodeURIComponent(url);
        // tslint:disable-next-line:max-line-length
        window.location.href = `https://www.themoviedb.org/authenticate/${requestToken.requestToken}?redirect_to=${redirectTo}`;
    }
}
