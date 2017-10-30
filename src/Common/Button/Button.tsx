import './Button.css';

import * as React from 'react';

// Sound provided by http://facebook.design/soundkit
const soundFile = require('./sound.m4a');

interface ButtonProps extends 
    React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
        plain?: boolean;
        sound?: boolean;
}

export class Button extends React.Component<ButtonProps, {}> {
    private static audio = new Audio(soundFile);

    public render() {
        const { className, onClick, plain, sound, ...props } = this.props;
        
        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            if (sound) {
                Button.audio.play();
            }
            
            if (onClick) {
                onClick(event);
            }
        };

        const classNames = [
            'btn',
            plain && '-plain'
        ].filter(n => !!n);

        return (
            <button 
                className={classNames.join(' ')}
                onClick={handleClick} 
                {...props} 
            />
        );
    }
}
