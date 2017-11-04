import './Button.css';

import * as React from 'react';

import { classnames } from '../../utils/classnames';

// Sound provided by http://facebook.design/soundkit
const soundFile = require('./sound.m4a');

interface ButtonProps extends 
    React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
        primary?: boolean;
        sound?: boolean;
}

export class Button extends React.Component<ButtonProps, {}> {
    private static audio = new Audio(soundFile);

    public render() {
        const { className, onClick, primary, sound, ...props } = this.props;
        
        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            if (sound) {
                Button.audio.play();
            }
            
            if (onClick) {
                onClick(event);
            }
        };

        const classNames = classnames([
            className,
            'mdc-button',
            primary && 'mdc-theme--primary-bg mdc-theme--text-primary-on-primary'
        ]);
        
        return (
            <button 
                className={classNames}
                onClick={handleClick} 
                {...props} 
            />
        );
    }
}
