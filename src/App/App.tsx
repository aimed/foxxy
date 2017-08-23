import { AppHeader } from './AppHeader';
import * as React from 'react';
import './App.css';

type AppProps = {
};

class App extends React.Component<AppProps, {}> {
  render() {
    return (
      <div className="app">
        <AppHeader />
        <div className="app__content">{this.props.children}</div>
      </div>
    );
  }
}

export default App;
