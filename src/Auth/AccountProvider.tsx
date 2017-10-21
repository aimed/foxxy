import * as React from 'react';

import { Redirect } from 'react-router';
import { Spinner } from '../Common/Spinner/Spinner';
import { TMDBAccount } from '../Api/TMDB/TMDBAccount';
import { accountStore } from '../stores/AccountStore';
import { defaultConnection } from '../Api/TMDB/TMDBConnection';
import { observer } from 'mobx-react';

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
