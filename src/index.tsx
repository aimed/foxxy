import { RandomPage } from './Random/RandomPage';
// import { defaultConnection } from './Api/TMDB/TMDBConnection';
import { WatchlistPage } from './Watchlist/WatchlistPage';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FinalizeAuthPage } from './Auth/FinalizeAuthPage';
import { LoginPage } from './Auth/LoginPage';
import { BrowserRouter } from 'react-router-dom';
import App from './App/App';
import registerServiceWorker from './registerServiceWorker';
import { Route /* , Redirect */ } from 'react-router';
import './index.css';

/*
const PrivateRoute = ({ component: JSX, ...rest }) => (
  <Route {...rest} render={props => (
    defaultConnection.getSession() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
);
*/

ReactDOM.render(
  <BrowserRouter>
    <App>
      <Route exact path="/" component={LoginPage} />
      <Route path="/tmdb-finalize-auth" component={FinalizeAuthPage} />
      <Route path="/watchlist" component={WatchlistPage} />
      <Route path="/random" component={RandomPage} />
    </App>
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
