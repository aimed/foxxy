import './Card.css';

import * as React from 'react';

import { classnames } from '../../utils/classnames';

export interface CardState { }
export interface CardProps {
    title?: string;
    subtitle?: string;
    className?: string;
}

export class Card extends React.Component<CardProps, CardState> {
    render() {
        const {
            title,
            subtitle,
            children,
            className
        } = this.props;

        const containerClasses = classnames([
            'mdc-card',
            className
        ]);

        return (
            <div className={containerClasses}>
                {(title || subtitle) && 
                    <div className="mdc-card__primary">
                        {title && <div className="mdc-card__title">{title}</div>}
                        {subtitle && <div className="mdc-card__subtitle">{subtitle}</div>}
                    </div>
                }
                {children}
            </div>
        );
    }
}
