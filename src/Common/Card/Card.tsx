import './Card.css';

import * as React from 'react';

import { classnames } from '../../utils/classnames';

export interface CardState { }
export interface CardProps {
    title?: string;
    subtitle?: string;
    className?: string;
    avatar?: JSX.Element;
}

export class Card extends React.Component<CardProps, CardState> {
    render() {
        const {
            title,
            subtitle,
            avatar,
            children,
            className
        } = this.props;

        const containerClasses = classnames([
            'mdc-card',
            className,
            avatar && 'mdc-card--avatar'
        ]);

        return (
            <div className={containerClasses}>
                {(title || subtitle) && 
                    <div className="mdc-card__primary">
                        {avatar && <div className="mdc-card__avatar">{avatar}</div>}
                        {title && <div className="mdc-card__title">{title}</div>}
                        {subtitle && <div className="mdc-card__subtitle">{subtitle}</div>}
                    </div>
                }
                {children}
            </div>
        );
    }
}
