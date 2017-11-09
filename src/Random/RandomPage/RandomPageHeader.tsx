import * as React from 'react';

import { Button } from '../../Common/Button/Button';
import { Gravatar } from '../../User/Gravatar/Gravatar';
import { IconExpandMore } from '../../Common/Icons/IconExpandMore';
import { MaterialMenu } from '../../Common/Menu/MaterialMenu';
import { MaterialMenuItem } from '../../Common/Menu/MaterialMenuItem';
import { Menu } from '../../Common/Menu/Menu';
import { Navbar } from '../../Common/Navbar/Navbar';
import { TMDBAuthentication } from '../../Api/TMDB/TMDBAuthentication';
import { connectionStore } from '../../stores/ConnectionStore';
import { filtersStore } from '../../stores/FiltersStore';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router';

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
        const { onReroll = () => filtersStore.rerollTry = filtersStore.rerollTry + 1 } = this.props;

        return (
            <Navbar
                left={<img src={require('./FoxxyIcon.svg')} alt="Foxxy" />}
                right={
                    <Menu direction="horizontal">
                        {onReroll && 
                            <Button onClick={onReroll}>Reroll</Button>
                        }

                        <Button onClick={this.showFilterMenu}>Filters</Button>

                        {account &&
                            <span style={{display: 'flex', alignItems: 'center'}}>
                                <Gravatar account={account} size={24} style={{ borderRadius: '50%' }} />
                            </span>
                        }
                        {account &&
                            <MaterialMenu
                                label={
                                    <Button><IconExpandMore /></Button>
                                }
                            >
                                <MaterialMenuItem onClick={this.signOut}>Sign out</MaterialMenuItem>
                            </MaterialMenu>
                        }
                        
                        {!account && !session &&
                            <Button onClick={this.signIn}>TMDb Connect</Button>
                        }
                    </Menu>
                }
            />
        );
    }
}
