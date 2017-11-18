import './Button.css';

import * as React from 'react';

import { SyntheticEvent } from 'react';
import { classnames } from '../../utils/classnames';

// Sound provided by http://facebook.design/soundkit
const soundFile = require('./sound.m4a');

export interface ButtonProps {
        primary?: boolean;
        secondary?: boolean;
        sound?: boolean;
        raised?: boolean;
        unelevated?: boolean;
        stroked?: boolean;
        dense?: boolean;
        compact?: boolean;
        href?: string;
        linkInNewTab?: boolean;
        className?: string;
        style?: React.CSSProperties;
        onClick?: React.EventHandler<SyntheticEvent<HTMLButtonElement>>;
        type?: string;
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
            href,
            linkInNewTab,
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
        
        return href 
        ? (
            <a
                className={classNames}
                href={href}
                target={linkInNewTab ? '__blank' : undefined}
                {...props}
            />
        ) 
        : (
            <button 
                className={classNames}
                onClick={handleClick} 
                {...props} 
            />
        );
    }
}
