import './Button.css';
import * as React from 'react';

// Sound provided by http://facebook.design/soundkit
const sound = require('./sound.m4a');

interface ButtonProps extends 
    React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
        plain?: boolean;
}

export class Button extends React.Component<ButtonProps, {}> {
    private static audio = new Audio(sound);
    public render() {
        const { className, onClick, plain, ...props } = this.props;
        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            Button.audio.play();
            if (onClick) {
                onClick(event);
            }
        };
        return (
            <button 
                className={`btn ${className} ${plain ? 'btn--plain' : 'btn--float'}`}
                onClick={handleClick} 
                {...props} 
            />
        );
    }
}
