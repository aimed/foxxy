import './Checkbox.css';

import * as React from 'react';

export interface CheckboxState { }
export interface CheckboxProps extends React.HTMLProps<HTMLInputElement> {
    label?: string;
}

export class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
    private static _id = 0;

    render() {
        const id = '' + Checkbox._id++;
        const { label, ...props } = this.props;
        
        return (
            <span>
                <div className="mdc-switch">
                    <input type="checkbox" id={id} className="mdc-switch__native-control" {...props} />
                    <div className="mdc-switch__background">
                        <div className="mdc-switch__knob" />
                    </div>
                </div>
                {label && <label htmlFor={id} className="mdc-switch-label">{label}</label>}
            </span>
        );
    }
}
