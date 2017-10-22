import './Spinner.css';

import * as React from 'react';

export interface SpinnerProps {
    text?: string;
}

export class Spinner extends React.Component<SpinnerProps, {}> {
    public render() {
        return (
            <div className="spinner">
                <div className="spinner__spinner" />
                {this.props.text && <div className="spinner__text">{this.props.text}</div>}
            </div>
        );
    }
}
