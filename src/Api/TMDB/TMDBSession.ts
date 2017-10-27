import { TMDBAccount } from './TMDBAccount';

export interface SessionDelegate {
    onSessionCreated(session: TMDBSession): void;
    onSessionDestroyed(session: TMDBSession): void;
}

export class TMDBSession {
    private static _sessionDelegates: Set<SessionDelegate> = new Set<SessionDelegate>();
    public sessionId: string;
    public account?: TMDBAccount;

    public static registerDelegate(delegate: SessionDelegate) {
        TMDBSession._sessionDelegates.add(delegate);
    }

    public static unregisterDelegate(delegate: SessionDelegate) {
        TMDBSession._sessionDelegates.delete(delegate);
    }

    public static fromJSON(data: any): TMDBSession {
        return new TMDBSession(data.session_id);
    }

    public constructor(sessionId: string) {
        this.sessionId = sessionId;
        TMDBSession._sessionDelegates.forEach(d => d.onSessionCreated(this));
    }

    public destroy() {
        TMDBSession._sessionDelegates.forEach(d => d.onSessionDestroyed(this));
        this.sessionId = '';
    }
}