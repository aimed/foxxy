import './GenreList.css';

import * as React from 'react';

import { QueryRenderer } from '../../Common/QueryRenderer/QueryRenderer';
import { TMDBGenre } from '../../Api/TMDB/TMDBGenre';
import { connectionStore } from '../../stores/ConnectionStore';
import { observer } from 'mobx-react';

export type GenreQuery = { [index: number]: TMDBGenre };

export interface GenreListState {}
export interface GenreListProps {
    data: GenreQuery;
    genreIds: number[];
}

export class GenreList extends React.Component<GenreListProps, GenreListState> {
    render() {
        const genres = this.props.data;
        const ids = this.props.genreIds;

        if (!genres || !ids) {
            return null;
        }
        const genreNames = ids.map(id => genres[id]).filter(g => !!g).map(genre => genre.name);

        return (
            <span className="genre-list">{genreNames.join(' | ')}</span>
        );
    }
}

type QueryVariables = {
    language: string
};
export type GenreMap = QueryVariables;
export interface GenreListWithDataState { }
export interface GenreListWithDataProps { 
    genreIds: number[];
    genres?: GenreQuery;
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

        if (this.props.genres) {
            return <GenreList data={this.props.genres} genreIds={this.props.genreIds} />;
        }

        return (
            <QueryRenderer
                variables={variables}
                loading={() => null}
                query={this.query}
                component={data => <GenreList data={data as any} genreIds={this.props.genreIds} />}
            />
        );
    }
}
