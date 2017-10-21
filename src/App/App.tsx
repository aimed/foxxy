import './App.css';

import * as React from 'react';

import { AppHeader } from './AppHeader';

const logo = require('../Common/TMDBIcon/tmdb-powered-by-rectangle-blue.svg');

type AppProps = {
};

export class App extends React.Component<AppProps, {}> {
  render() {
    return (
      <div className="app">
        <AppHeader />
        <div className="app__content">{this.props.children}</div>
        <div className="app__footer"><a href="https://www.themoviedb.org"><img src={logo} height="20px" /></a></div>
      </div>
    );
  }
}

