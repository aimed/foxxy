import './index.css';

import * as React from 'react';

import { App } from './App/App';
import { BrowserRouter } from 'react-router-dom';
import { FinalizeAuthPage } from './Auth/FinalizeAuthPage';
import { RandomPageWithData } from './Random/RandomPage/RandomPage';
import { Route } from 'react-router';
import { register as registerServiceWorker } from './registerServiceWorker';
import { render } from 'react-snapshot';

render(
  <BrowserRouter>
    <App>
      <Route exact path="/" component={RandomPageWithData} />
      <Route path="/tmdb-finalize-auth" component={FinalizeAuthPage} />
    </App>
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
