export class TMDBRequestToken {
    public success?: boolean;
    public expiresAt?: Date;
    public requestToken: string;

    public static fromJSON(data: any): TMDBRequestToken {
        return new TMDBRequestToken(data.request_token, data.success, new Date(data.expires_at));
    }

    public static fromTokenString(token: string): TMDBRequestToken {
        return new TMDBRequestToken(token);
    }

    constructor(requestToken: string, success?: boolean, expiresAt?: Date) {
        this.success = success;
        this.expiresAt = expiresAt;
        this.requestToken = requestToken;
    }
}