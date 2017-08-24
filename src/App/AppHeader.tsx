import { authStore } from '../stores/authStore';
import { Button } from '../Common/Button/Button';
import { defaultConnection } from '../Api/TMDB/TMDBConnection';
import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { observer } from 'mobx-react';

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