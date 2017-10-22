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
export interface QueryRendererProps<T> {
    query: () => Promise<T>;
    component: React.ComponentClass<QueryRendererComponentProps<T>>;
    loading?: () => JSX.Element;
}

/**
 * 
 * 
 * @export
 * @class QueryRenderer
 * @extends {React.Component<QueryRendererProps<T>, QueryRendererState<T>>}
 * @template T 
 */
export class QueryRenderer<T extends {}> extends React.Component<QueryRendererProps<T>, QueryRendererState<T>> {
    state: QueryRendererState<T> = {
    };
    
    refresh = () => {
        this.props.query().then(data => this.setState({ data }));        
    }

    componentWillMount() {
        this.refresh();
    }

    render() {
        const { data } = this.state;
        const { component, loading } = this.props;
        
        if (!data) {
            return loading ? loading() : <Spinner />;
        }

        const Component = component;
        return (
            <Component 
                data={data}
                refresh={this.refresh}
            />
        );
    }
}
