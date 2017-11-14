import './Card.css';

import * as React from 'react';

import { classnames } from '../../utils/classnames';

export interface CardState { }
export interface CardProps {
    title?: string;
    subtitle?: string;
    titleLarge?: boolean;
    className?: string;
    avatar?: JSX.Element;
}

export class Card extends React.Component<CardProps, CardState> {
    render() {
        const {
            title,
            subtitle,
            titleLarge,
            avatar,
            children,
            className
        } = this.props;

        const containerClasses = classnames([
            'mdc-card',
            className,
            avatar && 'mdc-card--avatar'
        ]);

        const titleClasses = classnames([
            'mdc-card__title',
            titleLarge && 'mdc-card__title--large'
        ]);

        return (
            <div className={containerClasses}>
                {(title || subtitle) && 
                    <div className="mdc-card__primary">
                        {avatar && <div className="mdc-card__avatar">{avatar}</div>}
                        {title && <div className={titleClasses}>{title}</div>}
                        {subtitle && <div className="mdc-card__subtitle">{subtitle}</div>}
                    </div>
                }
                {children}
            </div>
        );
    }
}
