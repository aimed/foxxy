import './Button.css';

import * as React from 'react';

import { classnames } from '../../utils/classnames';

// Sound provided by http://facebook.design/soundkit
const soundFile = require('./sound.m4a');

interface ButtonProps extends 
    React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
        primary?: boolean;
        secondary?: boolean;
        sound?: boolean;
        raised?: boolean;
        unelevated?: boolean;
        stroked?: boolean;
        dense?: boolean;
        compact?: boolean;
}

export class Button extends React.Component<ButtonProps, {}> {
    private static audio = new Audio(soundFile);

    public render() {
        const { 
            className, 
            onClick, 
            primary, 
            secondary,
            raised,
            unelevated,
            stroked,
            dense,
            compact,
            sound, 
            ...props 
        } = this.props;
        
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
            primary && 'mdc-theme--primary-bg mdc-theme--text-primary-on-primary',
            secondary && 'mdc-theme--secondary-bg mdc-theme--text-secondary-on-secondary',
            raised && 'mdc-button--raised',
            unelevated && 'mdc-button--unelevated',
            stroked && 'mdc-button--stroked',
            dense && 'mdc-button--dense',
            compact && 'mdc-button--compact'
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
