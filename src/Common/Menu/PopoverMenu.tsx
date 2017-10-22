import './PopoverMenu.css';

import * as React from 'react';

export interface PopoverMenuState {
    visible: boolean;
}

export interface PopoverMenuProps { 
    label: string | JSX.Element;
    anchor?: 'bottom-left' | 'bottom-right';
}

export class PopoverMenu extends React.Component<PopoverMenuProps, PopoverMenuState> {
    state: PopoverMenuState = {
        visible: false
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
            this.toggle(false);
        }
    }

    toggle = (visible?: boolean) => {
        this.setState({ visible: visible !== undefined ? visible : !this.state.visible });
    }

    componentDidMount() {
        document.addEventListener('click', this.onDocumentClick);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.onDocumentClick);
    }

    render() {
        const { label, anchor = 'bottom-right' } = this.props;
        const classNames = [
            'popovermenu',
            '-' + anchor
        ].filter(n => !!n);

        return (
            <div className={classNames.join(' ')} ref={r => this.ref = r}>
                <div className="popovermenu__label" onClick={e => this.toggle()}>{label}</div>
                <div className="popovermenu__inner">{
                    this.state.visible && this.props.children
                }</div>
            </div>
        );
    }
}
