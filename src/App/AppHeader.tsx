import { Button } from '../Common/Button/Button';
import { defaultConnection } from '../Api/TMDB/TMDBConnection';
import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

interface AppHeaderProps {
}

@withRouter
export class AppHeader extends React.Component<AppHeaderProps, {}> {
    public onLogout = () => {
        const props = this.props as RouteComponentProps<{}>;
        defaultConnection.destroySession();
        props.history.push('/');
    }

    public render() {
        const session = defaultConnection.getSession();
        return (
            <div className="app__header">
                <div className="app__header__title">Foxxy</div>
                {session && 
                    <div className="app__header__menu">
                        <Button onClick={this.onLogout}>Logout</Button>
                    </div>
                }
            </div>
        );
    }
}