import * as React from 'react';

import { Spinner } from '../Spinner/Spinner';

/**
 * Props that will be injected into the component.
 * 
 * @export
 * @interface QueryRendererComponentProps
 * @template T 
 */
export interface QueryRendererComponentProps<T> {
    refresh: () => void;
    data: T;
}

/**
 * Internal state used to query data and update components.
 * 
 * @export
 * @interface QueryRendererState
 * @template T 
 */
export interface QueryRendererState<T> {
    data?: T;
}

/**
 * Props passed to QueryRenderer.
 * 
 * @export
 * @interface QueryRendererProps
 * @template T 
 */
export interface QueryRendererProps<T, V> {
    query: (variables?: V) => Promise<T>;
    // tslint:disable-next-line:max-line-length
    component: (data: T) => JSX.Element;
    loading?: () => JSX.Element | null;
    variables?: V;
}

/**
 * 
 * 
 * @export
 * @class QueryRenderer
 * @extends {React.Component<QueryRendererProps<T>, QueryRendererState<T>>}
 * @template T 
 */
export class QueryRenderer<T, V> extends React.Component<QueryRendererProps<T, V>, QueryRendererState<T>> {
    state: QueryRendererState<T> = {
    };
    
    refresh = (props?: QueryRendererProps<T, V>) => {
        this.props.query((props || this.props).variables).then(data => this.setState({ data }));        
    }

    componentWillMount() {
        this.refresh();
    }

    componentWillReceiveProps(next: QueryRendererProps<T, V>) {
        this.refresh(next);
    }

    render() {
        const { data } = this.state;
        const { component, loading } = this.props;
        
        if (!data) {
            return loading ? loading() : <Spinner />;
        }

        return component(data);
    }
}
