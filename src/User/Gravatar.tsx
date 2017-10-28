import * as React from 'react';

import { TMDBAccount } from '../Api/TMDB/TMDBAccount';

const gravatarUrl = (hash: string, size: number) => `https://www.gravatar.com/avatar/${hash}?s=${size}`;

export interface GravatarState { }
export interface GravatarProps extends React.HTMLProps<HTMLImageElement> {
    account: TMDBAccount;
    size?: number;
}

export class Gravatar extends React.Component<GravatarProps, GravatarState> {
    render() {
        const { account, size = 20, ...props } = this.props;
        const gravatar = account.avatar.gravatar;
        
        if (!gravatar) {
            return null;
        }

        return <img src={gravatarUrl(gravatar.hash, size)} height={size + 'px'} width={size + 'px'} {...props} />;
    }
}
