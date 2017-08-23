import './Button.css';
import * as React from 'react';

interface ButtonProps extends 
    React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
}

export class Button extends React.Component<ButtonProps, {}> {
    public render() {
        const { className, ...props } = this.props;

        return (
            <button className={`btn ${className}`} {...props} />
        );
    }
}
