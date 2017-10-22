import './App.css';

import * as React from 'react';

export interface AppProps {
}

export class App extends React.Component<AppProps, {}> {
  render() {
    return (
      <div className="app spinner-container">{this.props.children}</div>
    );
  }
}
