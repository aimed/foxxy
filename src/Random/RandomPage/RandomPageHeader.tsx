import * as React from 'react';

import { RouteComponentProps, withRouter } from 'react-router';

import { Button } from '../../Common/Button/Button';
import { Gravatar } from '../../User/Gravatar/Gravatar';
import { IconExpandMore } from '../../Common/Icons/IconExpandMore';
import { Menu } from '../../Common/Menu/Menu';
import { Navbar } from '../../Common/Navbar/Navbar';
import { PopoverMenu } from '../../Common/Menu/PopoverMenu';
import { TMDBAuthentication } from '../../Api/TMDB/TMDBAuthentication';
import { connectionStore } from '../../stores/ConnectionStore';
import { observer } from 'mobx-react';

export interface RandomPageHeaderState { }
export interface RandomPageHeaderProps {
    onReroll?: () => void;
    onToggleFilters?: () => void;
}

@withRouter
@observer
export class RandomPageHeader extends React.Component<RandomPageHeaderProps, RandomPageHeaderState> {
    showFilterMenu = () => {
        if (this.props.onToggleFilters) {
            this.props.onToggleFilters();
        }
    }

    showRandomMovie = () => {
        const router = this.props as any as RouteComponentProps<{}>;
        router.history.push('/');        
    }

    signIn = () => {
        TMDBAuthentication.getRequestToken(connectionStore.connection).then(token => {
            const url = `${window.location.origin}/tmdb-finalize-auth`;
            TMDBAuthentication.authenticateRequestToken(token, url);
        });
    }

    signOut = () => {
        connectionStore.connection.destroySession();
        connectionStore.session = null;
    }

    render() {
        const { account, session } = connectionStore;
        const { onReroll } = this.props;

        return (
            <Navbar
                left={<img src={require('./FoxxyIcon.svg')} alt="Foxxy" />}
                right={
                    <Menu direction="horizontal">
                        {onReroll && 
                            <Button plain onClick={onReroll}>Reroll</Button>
                        }

                        {/* <Button plain onClick={this.showRandomMovie}>Random</Button> */}
                        <Button plain onClick={this.showFilterMenu}>Filters</Button>

                        {account &&
                            <span style={{display: 'flex', alignItems: 'center', marginRight: '-0.5em'}}>
                                <Gravatar account={account} size={24} style={{ borderRadius: '50%' }} />
                            </span>
                        }
                        {account &&
                            <PopoverMenu
                                label={
                                    <Button plain><IconExpandMore /></Button>
                                }
                            >
                                <Button plain onClick={this.signOut}>Sign out</Button>
                            </PopoverMenu>
                        }
                        
                        {!account && !session &&
                            <Button plain onClick={this.signIn}>Connect to TMDb</Button>
                        }
                    </Menu>
                }
            />
        );
    }
}
