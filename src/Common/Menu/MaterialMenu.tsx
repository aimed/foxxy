import './MaterialMenu.css';

import * as React from 'react';

import { classnames } from '../../utils/classnames';

export interface MaterialMenuState {
    open: boolean;
}
export interface MaterialMenuProps {
    label?: JSX.Element;
}

export class MaterialMenu extends React.Component<MaterialMenuProps, MaterialMenuState> {
    state: MaterialMenuState = {
        open: false
    };

    ref: HTMLDivElement | null = null;

    isChildOfRef = (e: Element | null) => {
        while (e !== null) {
            if (e === this.ref) {
                return true;
            }
            e = e.parentElement;
        }
        return false;
    }

    onDocumentClick = (e: Event) => {
        if (!this.isChildOfRef(e.srcElement)) {
            this.toggle();
        }
    }

    onEscPress = (e: KeyboardEvent) => {
        if (e.keyCode === 27) {
            this.toggle();
        }
    }

    toggle = () => {        
        const open = !this.state.open;
        this.setState({ open });

        if (open) {
            this.registerDocumentListener();
        } else {
            this.unregisterDocumentListener();
        }

    }

    registerDocumentListener() {
        document.addEventListener('keyup', this.onEscPress);
        document.addEventListener('click', this.onDocumentClick);
    }

    unregisterDocumentListener() {
        document.removeEventListener('keyup', this.onEscPress);
        document.removeEventListener('click', this.onDocumentClick);
    }

    componentWillUnmount() {
        this.unregisterDocumentListener();
    }

    render() {
        const className = classnames({
            'mdc-simple-menu': true,
            'mdc-simple-menu--open': this.state.open
        });        

        return (
            <div className="mdc-menu-anchor">
                <div onClick={() => this.toggle()}>{this.props.label}</div>
                <div className={className} tabIndex={-1} ref={r => this.ref = r} style={{ right: 0 }}>
                    <ul className="mdc-simple-menu__items mdc-list" role="menu" aria-hidden="true">
                        {this.props.children}
                    </ul>
                </div>
            </div>
        );
    }
}
