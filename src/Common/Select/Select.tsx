import './Select.css';

import * as React from 'react';

export interface SelectState { }
export interface SelectProps extends React.HTMLProps<HTMLSelectElement> { }

export class Select extends React.Component<SelectProps, SelectState> {
  render() {
    return (<select className="mdc-select" {...this.props} />);
  }
}
