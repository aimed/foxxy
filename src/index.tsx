import './index.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { App } from './App/App';
import { BrowserRouter } from 'react-router-dom';
import { FinalizeAuthPage } from './Auth/FinalizeAuthPage';
import { RandomPageWithData } from './Random/RandomPage/RandomPage';
import { Route } from 'react-router';
import { register as registerServiceWorker } from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
    <App>
      <Route exact path="/" component={RandomPageWithData} />
      <Route path="/tmdb-finalize-auth" component={FinalizeAuthPage} />
    </App>
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
