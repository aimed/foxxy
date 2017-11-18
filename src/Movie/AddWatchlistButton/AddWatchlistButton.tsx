import * as React from 'react';

import { Button, ButtonProps } from '../../Common/Button/Button';
import { TMDBAccountState, TMDBMovie } from '../../Api/TMDB/TMDBMovie';

import { TMDBAccount } from '../../Api/TMDB/TMDBAccount';
import { connectionStore } from '../../stores/ConnectionStore';

export interface AddWatchlistButtonState { 
    accountState: TMDBAccountState | null;
}

export interface AddWatchlistButtonProps extends ButtonProps {
    movie: TMDBMovie;
    account: TMDBAccount;
}

// TODO: Doesn't play nice with account changes.
export class AddWatchlistButton extends React.Component<AddWatchlistButtonProps, AddWatchlistButtonState> {
    state: AddWatchlistButtonState = {
        accountState: null
    };

    constructor(props: AddWatchlistButtonProps) {
        super(props);
        if (props.account) {
            this.fetchAccountState();
        }
    }

    componentWillReceiveProps(next: AddWatchlistButtonProps) {
        this.setState({ accountState: null }, () => this.fetchAccountState());
    }

    async fetchAccountState() {
        const accountState = await TMDBMovie.accountState(connectionStore.connection, this.props.movie);
        this.setState({ accountState });
    }

    toggleWatchlist = async () => {
        if (this.state.accountState) {
            const success = await TMDBAccount.addToWatchlist(
                connectionStore.connection, 
                this.props.account, 
                this.props.movie, !this.state.accountState.watchlist
            );

            if (success) {
                const accountState = new TMDBAccountState(this.state.accountState);
                accountState.watchlist = !accountState.watchlist;
                this.setState({ accountState });
            }
        }
    }

    render() {
        const {
            account,
            movie,
            ...props
        } = this.props;

        if (this.state.accountState === null || !this.props.account) {
            return null;
        }
        
        const prefix = this.state.accountState.watchlist ? '-' : '+';
        return (
            <Button onClick={this.toggleWatchlist} {...props}>{prefix} Watchlist</Button>
        );
    }
}
