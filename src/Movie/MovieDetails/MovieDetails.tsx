import './MovieDetails.css';

import * as React from 'react';

import { GenreListWithData, GenreMap } from '../GenreList/GenreList';

import { AddWatchlistButton } from '../AddWatchlistButton/AddWatchlistButton';
import { Button } from '../../Common/Button/Button';
import { MovieBackdrop } from '../MovieBackdrop/MovieBackdrop';
import { MoviePoster } from '../MoviePoster/MoviePoster';
import { MovieRating } from '../MovieRating/MovieRating';
import { TMDBAccount } from '../../Api/TMDB/TMDBAccount';
import { TMDBMovie } from '../../Api/TMDB/TMDBMovie';

export interface MovieDetailsState { }
export interface MovieDetailsProps {
    account?: TMDBAccount | null;
    movie: TMDBMovie;
    genres?: GenreMap;
}

export class MovieDetails extends React.Component<MovieDetailsProps, MovieDetailsState> {
    render() {
        const { movie, account } = this.props;
        
        return (
            <div className="movie-details">
                <MovieBackdrop movie={movie}>
                    <MoviePoster movie={movie} />
                </MovieBackdrop>
                <section className="movie-details__info">
                    <h1 className="movie-details__title">{movie.title}</h1>
                    <div className="movie-details__meta-data">
                        <div className="movie-details__meta-data-item">
                            <span className="movie-details__release-year">{movie.releaseDate.getFullYear()}</span>
                        </div>
                        <div className="movie-details__meta-data-item">
                            <GenreListWithData genreIds={movie.genreIds} genres={this.props.genres} />
                        </div>
                        <div className="movie-details__meta-data-item movie-details__meta-data-item--movie-rating">
                            <MovieRating movie={movie} />
                        </div>
                    </div>
                    <div className="movie-details__description">{movie.overview}</div>
                    <div className="movie-details__actions">
                        {/* <div className="movie-details__actions-item">.</div> */}
                        <div className="movie-details__actions-item">
                            {account && <AddWatchlistButton movie={movie} account={account} />}
                        </div>
                        <div className="movie-details__actions-item">
                            <Button href={`//themoviedb.org/movie/${movie.id}`} linkInNewTab>View on TMDb</Button>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
