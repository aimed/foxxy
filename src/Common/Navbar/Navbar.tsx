import './Navbar.css';

import * as React from 'react';

export interface NavbarState { }

export interface NavbarProps {
    left?: JSX.Element;
    right?: JSX.Element;
}

export class Navbar extends React.Component<NavbarProps, NavbarState> {
    render() {
        const { left, right } = this.props;
        return (
            <nav className="navbar">
                {left}
                <span className="navbar__separator" />
                {right}
            </nav>
        );
    }
}
