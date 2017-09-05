import { defaultConnection } from '../Api/TMDB/TMDBConnection';
import { TMDBAccount } from '../Api/TMDB/TMDBAccount';
import { Spinner } from '../Common/Spinner/Spinner';
import { accountStore } from '../stores/AuthStore';
import * as React from 'react';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router';

export const AccountProvider = (component: React.ComponentClass<{}>) => {
    const Component = component;
    return observer(() => {
        if (!accountStore.session) {
            return <Redirect to="/login" />;
        }

        if (!accountStore.account) {
            TMDBAccount.getAccount(defaultConnection).then((account) => {
                accountStore.account = account;
            });
            return <Spinner text="Getting account" />;
        }

        return <Component />;
    });
};
