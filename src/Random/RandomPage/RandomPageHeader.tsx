import * as React from 'react';

import { Button } from '../../Common/Button/Button';
import { Gravatar } from '../../User/Gravatar';
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
}

@observer
export class RandomPageHeader extends React.Component<RandomPageHeaderProps, RandomPageHeaderState> {
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
                        <Button plain onClick={onReroll}>Reroll</Button>
                        
                        {account && 
                            <PopoverMenu 
                                label={
                                    <Button plain>
                                        <Gravatar account={account} size={14} style={{borderRadius: '50%'}} />
                                        <span style={{margin: 'auto 0.5em'}}>{account.username}</span>
                                        <IconExpandMore />
                                    </Button>
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
