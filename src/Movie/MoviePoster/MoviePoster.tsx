import * as React from 'react';

import { TMDBMovie } from '../../Api/TMDB/TMDBMovie';

export interface MoviePosterProps extends React.HTMLAttributes<HTMLImageElement> {
    movie: TMDBMovie | null;
    width?: number;
}

export class MoviePoster extends React.Component<MoviePosterProps, {}> {
    public static getUrl = (
        movie: TMDBMovie, 
        width: number = 500
    ): string => `https://image.tmdb.org/t/p/w${width}/${movie.posterPath}`

    public render() {
        const { movie, width = 500, ...props } = this.props;

        if (!(movie && movie.posterPath)) {
            return null;
        }

        return (<img src={MoviePoster.getUrl(movie, width)} {...props} />);
    }
}