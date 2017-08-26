import { authStore } from '../stores/AuthStore';
import { Button } from '../Common/Button/Button';
import { defaultConnection } from '../Api/TMDB/TMDBConnection';
import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

interface AppHeaderProps {
}

@withRouter
@observer
export class AppHeader extends React.Component<AppHeaderProps, {}> {
    public onLogout = () => {
        const props = this.props as RouteComponentProps<{}>;
        defaultConnection.destroySession();
        props.history.push('/');
        authStore.session = null;
    }

    public render() {
        const session = authStore.session;
        return (
            <div className="app__header">
                <div className="app__header__logo-menu">
                    <div className="app__header__logo"><Link to="/">Foxxy</Link></div>
                    {session && 
                        <div className="app__header__menu">
                            <Link to="/">Random Movie</Link>
                            <Link to="/watchlist">My Watchlist</Link>
                        </div>
                    }
                </div>
                {session && 
                    <div className="app__header__account">
                        <Button plain onClick={this.onLogout}>Logout</Button>
                    </div>
                }
            </div>
        );
    }
}