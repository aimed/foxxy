import './index.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { AccountProvider } from './Auth/AccountProvider';
import { App } from './App/App';
import { BrowserRouter } from 'react-router-dom';
import { FinalizeAuthPage } from './Auth/FinalizeAuthPage';
import { LoginPage } from './Auth/LoginPage';
import { RandomPage } from './Random/RandomPage';
import { Route } from 'react-router';
import { WatchlistPage } from './Watchlist/WatchlistPage';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
    <App>
      <Route exact path="/" component={AccountProvider(RandomPage)} />
      <Route path="/tmdb-finalize-auth" component={FinalizeAuthPage} />
      <Route path="/watchlist" component={AccountProvider(WatchlistPage)} />
      <Route path="/login" component={LoginPage} />
    </App>
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
