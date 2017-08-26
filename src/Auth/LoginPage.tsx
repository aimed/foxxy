import './LoginPage.css';
import { Button } from '../Common/Button/Button';
import * as React from 'react';
import { TMDBAuthentication } from '../Api/TMDB/TMDBAuthentication';
import { defaultConnection } from '../Api/TMDB/TMDBConnection';

const logo = require('../Common/TMDBIcon/tmdb-primary-green.svg');

type LoginPageState = {
    requestingRequestToken: boolean;
};

export class LoginPage extends React.Component<{}, LoginPageState> {
    public state = {
        requestingRequestToken: false
    };

    public render() {
        return (
            <div className="login-page">
                
                <Button disabled={this.state.requestingRequestToken} onClick={this.handleLogin}>
                    <div><img src={logo} width="100px" /></div>
                    <div>Connect</div>
                </Button>
            </div>
        );
    }

    private handleLogin = () => {
        this.setState({ requestingRequestToken: true });
        TMDBAuthentication.getRequestToken(defaultConnection).then(requestToken => {
            TMDBAuthentication.authenticateRequestToken(requestToken);
        });
    }
}
