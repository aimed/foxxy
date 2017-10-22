import * as React from 'react';
import * as querystring from 'querystring';

import { RouteComponentProps, withRouter } from 'react-router';

import { Spinner } from '../Common/Spinner/Spinner';
import { TMDBAuthentication } from '../Api/TMDB/TMDBAuthentication';
import { TMDBRequestToken } from '../Api/TMDB/TMDBRequestToken';
import { accountStore } from '../stores/AccountStore';
import { defaultConnection } from '../Api/TMDB/TMDBConnection';

export interface FinalizeAuthPageProps extends RouteComponentProps<{}> {
}

interface FinalizeAuthPageState {
}

@withRouter
export class FinalizeAuthPage extends React.Component<FinalizeAuthPageProps, FinalizeAuthPageState> {
    async componentDidMount() {
        const queryString = this.props.location.search.replace('?', '');
        const query = querystring.parse(queryString);

        const approved = query.approved as string;
        const requestToken = query.request_token as string;

        if (approved && approved === 'true') {
            if (requestToken) {
                const token = TMDBRequestToken.fromTokenString(requestToken);
                const session = await TMDBAuthentication.getSessionId(defaultConnection, token);
                accountStore.session = session;
                window.localStorage.setItem('ssid', session.sessionId);
                this.props.history.replace('/');
                return;
            }
        }
        this.props.history.replace('/');
    }

    render() {
        return (
            <Spinner text="Finalizing login..." />
        );
    }
}
