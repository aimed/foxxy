import * as React from 'react';

import { MovieCard } from '../../Movie/MovieCard/MovieCard';
import { TMDBMovie } from '../../Api/TMDB/TMDBMovie';

export interface RollHistoryState {}
export interface RollHistoryProps {
    history: TMDBMovie[];
}

export class RollHistory extends React.Component<RollHistoryProps, RollHistoryState> {
  render() {
    return (
        <div className="roll-history">{this.props.history.map(movie => 
            <MovieCard key={movie.id} movie={movie} />
        )}</div>
    );
  }
}
