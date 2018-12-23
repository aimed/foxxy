import { TMDBConnection } from './TMDBConnection';
import { TMDBMovie } from './TMDBMovie';
import { TMDBPage } from './TMDBPage';

/**
 * 
 */
type TMDBGravatarInfo = {
    hash: string;
};

/**
 * 
 * 
 * @class TMDBAvatar
 */
class TMDBAvatar {
    /**
     * 
     * 
     * @type {TMDBGravatarInfo}
     * @memberof TMDBAvatar
     */
    public gravatar?: TMDBGravatarInfo;

    /**
     * 
     * 
     * @static
     * @param {*} data 
     * @returns 
     * @memberof TMDBAvatar
     */
    public static fromJSON(data: any) {
        const avatar = new TMDBAvatar();
        avatar.gravatar = data.gravatar && { hash: data.gravatar.hash };
        return avatar;
    }
}

/**
 * 
 * 
 * @export
 * @class TMDBAccount
 */
export class TMDBAccount {
    /**
     * 
     * 
     * @type {number}
     * @memberof TMDBAccount
     */
    public id: number;

    /**
     * 
     * 
     * @type {string}
     * @memberof TMDBAccount
     */
    public username: string;

    /**
     * 
     * 
     * @type {TMDBAvatar}
     * @memberof TMDBAccount
     */
    public avatar: TMDBAvatar;

    /**
     * 
     * 
     * @static
     * @param {TMDBConnection} con 
     * @returns 
     * @memberof TMDBAccount
     */
    public static async getAccount(con: TMDBConnection) {
        const session = con.getSession();

        if (!session) {
            throw new Error('Connection needs an active session');
        }

        if (!session.account) {
            session.account = await con.getRequest(TMDBAccount.fromJSON, `/account`);
        }

        return session.account;
    }

    /**
     * 
     * 
     * @static
     * @param {TMDBConnection} con 
     * @param {TMDBAccount} account 
     * @param {number} [page=1] 
     * @returns {Promise<TMDBPage<TMDBMovie>>} 
     * @memberof TMDBAccount
     */
    public static getWatchlist(
        con: TMDBConnection,
        account: TMDBAccount,
        page: number = 1,
        language?: string
    ): Promise<TMDBPage<TMDBMovie>> {
        return con.getRequest(
            TMDBPage.fromJSON(TMDBMovie.fromJSON),
            `/account/${account.id}/watchlist/movies`,
            { page, language }
        );
    }

    /**
     * 
     * 
     * @static
     * @param {TMDBConnection} con 
     * @param {TMDBAccount} account 
     * @param {TMDBMovie} movie 
     * @param {boolean} [watchlist=true] 
     * @returns {Promise<boolean>} 
     * @memberof TMDBAccount
     */
    public static addToWatchlist(
        con: TMDBConnection,
        account: TMDBAccount,
        movie: TMDBMovie,
        watchlist: boolean = true
    ): Promise<boolean> {
        return con.postRequest(
            TMDBConnection.SuccessResponseParser,
            `/account/${account.id}/watchlist`,
            {
                media_type: 'movie',
                media_id: movie.id,
                watchlist
            }
        );
    }

    /**
     * 
     * 
     * @static
     * @param {*} data 
     * @returns {TMDBAccount} 
     * @memberof TMDBAccount
     */
    public static fromJSON(data: any): TMDBAccount {
        return new TMDBAccount(data.id, data.username, TMDBAvatar.fromJSON(data.avatar));
    }

    /**
     * Creates an instance of TMDBAccount.
     * @param {number} id 
     * @param {string} username 
     * @memberof TMDBAccount
     */
    constructor(id: number, username: string, avatar: TMDBAvatar) {
        this.id = id;
        this.username = username;
        this.avatar = avatar;
    }
}