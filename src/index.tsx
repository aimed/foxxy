import { AccountProvider } from './Auth/AccountProvider';
import { WatchlistPage } from './Watchlist/WatchlistPage';
import './index.css';
import { RandomPage } from './Random/RandomPage';
// import { defaultConnection } from './Api/TMDB/TMDBConnection';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FinalizeAuthPage } from './Auth/FinalizeAuthPage';
import { LoginPage } from './Auth/LoginPage';
import { BrowserRouter } from 'react-router-dom';
import App from './App/App';
import registerServiceWorker from './registerServiceWorker';
import { Route } from 'react-router';

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
