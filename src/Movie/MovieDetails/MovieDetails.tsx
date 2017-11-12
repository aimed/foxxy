import './MovieDetails.css';

import * as React from 'react';

import { GenreListWithData } from '../GenreList/GenreList';
import { MovieBackdrop } from '../MovieBackdrop/MovieBackdrop';
import { MoviePoster } from '../MoviePoster/MoviePoster';
import { TMDBMovie } from '../../Api/TMDB/TMDBMovie';

export interface MovieDetailsState { }
export interface MovieDetailsProps {
    movie: TMDBMovie;
}

export class MovieDetails extends React.Component<MovieDetailsProps, MovieDetailsState> {
    render() {
        const { movie } = this.props;
        return (
            <div className="movie-details">
                <MovieBackdrop movie={movie}>
                    <MoviePoster movie={movie} />
                </MovieBackdrop>
                <section className="movie-details__info">
                    <h1 className="movie-details__title">
                        <span>{movie.title}</span>
                        <span className="movie-details__release-year">{movie.releaseDate.getFullYear()}</span>
                    </h1>
                    <div className="movie-details__rating">
                        Rating: {movie.voteAverage} ({movie.voteCount})
                    </div>
                    <div className="movie-details__description">{movie.overview}</div>
                    <div className="movie-details__genres"><GenreListWithData genreIds={movie.genreIds} /></div>
                </section>
            </div>
        );
    }
}
