import { TMDBMovie } from '../Api/TMDB/TMDBMovie';
import * as React from 'react';

export interface MoviePosterProps {
    movie: TMDBMovie | null;
    width?: number;
}

export class MoviePoster extends React.Component<MoviePosterProps, {}> {
    public render() {
        const { movie, width = 500 } = this.props;

        if (!(movie && movie.posterPath)) {
            return null;
        }

        return (<img src={`https://image.tmdb.org/t/p/w${width}/${movie.posterPath}`} />);
    }
}