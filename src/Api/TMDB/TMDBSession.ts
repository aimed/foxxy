import { TMDBAccount } from './TMDBAccount';

export class TMDBSession {
    public sessionId: string;
    public account?: TMDBAccount;
    
    public static fromJSON(data: any): TMDBSession {
        return new TMDBSession(data.session_id);
    }

    public constructor(sessionId: string) {
        this.sessionId = sessionId;
    }
}