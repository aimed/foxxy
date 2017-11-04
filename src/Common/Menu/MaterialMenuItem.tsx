import * as React from 'react';

export interface MaterialMenuItemState {}
// tslint:disable-next-line:max-line-length
export interface MaterialMenuItemProps extends React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> {
}

export class MaterialMenuItem extends React.Component<MaterialMenuItemProps, MaterialMenuItemState> {
  render() {
    return (
        <li className="mdc-list-item" role="menuitem" tabIndex={0} {...this.props}>{this.props.children}</li>
    );
  }
}
