import './GenreList.css';

import * as React from 'react';

import { QueryRenderer, QueryRendererComponentProps } from '../../Common/QueryRenderer/QueryRenderer';

import { TMDBGenre } from '../../Api/TMDB/TMDBGenre';
import { connectionStore } from '../../stores/ConnectionStore';
import { observer } from 'mobx-react';

export type GenreQuery = { [index: number]: TMDBGenre };

export interface GenreListState {}
export interface GenreListProps extends QueryRendererComponentProps<GenreQuery> {
    genreIds: number[];
}

export class GenreList extends React.Component<GenreListProps, GenreListState> {
    render() {
        const genres = this.props.data;
        const ids = this.props.genreIds;

        if (!genres || !ids) {
            return null;
        }

        return (
            <ul className="genre-list">{ids.map(id => genres[id] &&
                <li className="genre-list__item" key={id}>{genres[id].name}</li>
            )}</ul>
        );
    }
}

type QueryVariables = {
    language: string
};

export interface GenreListWithDataState { }
export interface GenreListWithDataProps { 
    genreIds: number[];
}

@observer
export class GenreListWithData extends React.Component<GenreListWithDataProps, GenreListWithDataState> {
    query = async (variables: QueryVariables) => {
        const genres: { [index: number]: TMDBGenre } = {};
        const genreList = await TMDBGenre.getGenres(connectionStore.connection, variables.language);

        for (const genre of genreList) {
            genres[genre.id] = genre;
        }
        return genres;
    }

    render() {
        const language = connectionStore.language;
        const variables: QueryVariables = { language };
        const R = (p: QueryRendererComponentProps<GenreQuery>) => <GenreList {...p} genreIds={this.props.genreIds} />;
        return (
            <QueryRenderer
                variables={variables}
                loading={() => null}
                query={this.query}
                component={R}
            />
        );
    }
}
