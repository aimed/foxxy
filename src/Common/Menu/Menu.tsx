import './Menu.css';

import * as React from 'react';

export interface MenuState { }

export interface MenuProps {
    direction?: 'horizontal' | 'vertical';
}

export class Menu extends React.Component<MenuProps, MenuState> {
    render() {
        const { direction } = this.props;
        const horizontal = direction && direction === 'horizontal';
        
        const classNames = [
            'menu',
            horizontal ? '-horizontal' : '-vertical',
        ].filter(n => !!n);

        return (
            <div className={classNames.join(' ')}>{this.props.children}</div>
        );
    }
}
