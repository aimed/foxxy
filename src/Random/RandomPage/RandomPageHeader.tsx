import * as React from 'react';

import { Button } from '../../Common/Button/Button';
import { Menu } from '../../Common/Menu/Menu';
import { Navbar } from '../../Common/Navbar/Navbar';
import { PopoverMenu } from '../../Common/Menu/PopoverMenu';
import { TMDBAccount } from '../../Api/TMDB/TMDBAccount';

export interface RandomPageHeaderState { }
export interface RandomPageHeaderProps {
    account: TMDBAccount | null;
    onReroll?: () => void;
}

export class RandomPageHeader extends React.Component<RandomPageHeaderProps, RandomPageHeaderState> {
    render() {
        const { account, onReroll } = this.props;
        return (
            <Navbar
                left={<img src={require('./FoxxyIcon.svg')} alt="Foxxy" />}
                right={
                    <Menu direction="horizontal">
                        <Button plain onClick={onReroll}>Reroll</Button>
                        {account && <PopoverMenu label={account.username}>Sign out</PopoverMenu>}
                        {!account && <Button plain>Sign in</Button>}
                    </Menu>
                }
            />
        );
    }
}
