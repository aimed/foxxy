import './MovieRating.css';

import * as React from 'react';

import { TMDBMovie } from '../../Api/TMDB/TMDBMovie';

export interface MovieRatingState {}
export interface MovieRatingProps {
    movie: TMDBMovie;
}

export class MovieRating extends React.Component<MovieRatingProps, MovieRatingState> {
  render() {
    const { movie } = this.props;

    return (
      <div className="movie-rating">
        <div className="movie-rating__bar">
          <span className="movie-rating__vote-average">{movie.voteAverage}</span>
          <span className="movie-rating__vote-average-bar" style={{ right: `${((10 - movie.voteAverage) * 10)}%` }} />
        </div>
        <div className="movie-rating__vote-count">{movie.voteCount}</div>
      </div>
    );
  }
}
