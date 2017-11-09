import './MovieCard.css';

import * as React from 'react';

import { Card } from '../../Common/Card/Card';
import { MoviePoster } from '../MoviePoster/MoviePoster';
import { TMDBMovie } from '../../Api/TMDB/TMDBMovie';

export interface MovieCardState { }
export interface MovieCardProps {
    movie: TMDBMovie;
}

export class MovieCard extends React.Component<MovieCardProps, MovieCardState> {
    render() {
        const { movie } = this.props;
        return (
            <Card
                className="movie-card"
                title={movie.title}
                subtitle={movie.releaseDate.getFullYear() + ''}
                avatar={<MoviePoster movie={movie} />}
            />
        );
    }
}
