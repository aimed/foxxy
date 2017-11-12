import './MovieBackdrop.css';

import * as React from 'react';

import { TMDBMovie } from '../../Api/TMDB/TMDBMovie';

export interface MovieBackdropState { }
export interface MovieBackdropProps {
  movie: TMDBMovie;
  minHeight?: string;
}

export class MovieBackdrop extends React.Component<MovieBackdropProps, MovieBackdropState> {
  render() {
    const { movie, minHeight } = this.props;

    const containerStyle: React.CSSProperties = {
      minHeight
    };

    const backdropStyle: React.CSSProperties = { 
      backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdropPath})` 
    };

    return (
      <div className="movie-backdrop" style={containerStyle}>
        <div className="movie-backdrop__backdrop" style={backdropStyle} />
        {this.props.children}
      </div>
    );
  }
}
