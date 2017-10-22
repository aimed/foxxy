import * as React from 'react';

import { GenreListWithData } from '../../Movie/GenreList/GenreList';
import { TMDBMovie } from '../../Api/TMDB/TMDBMovie';

export interface RandomPageDetailsState { }
export interface RandomPageDetailsProps {
    movie: TMDBMovie;
}

export class RandomPageDetails extends React.Component<RandomPageDetailsProps, RandomPageDetailsState> {
    render() {
        const { movie } = this.props;
        
        return (
            <section className="random-page-details">
                <h1 className="random-page-details__title">{movie.title}</h1>
                <div className="random-page-details__release-year">{movie.releaseDate.getFullYear()}</div>
                <div className="random-page-details__description">{movie.overview}</div>
                <div className="random-page-details__genres"><GenreListWithData genreIds={movie.genreIds} /></div>
                <div className="random-page-details__credits">
                    <a href="//themoviedb.org">
                        <img src={require('./TMDBPoweredBy.svg')} alt="TMDb" width="100px" />
                    </a>
                </div>
            </section>
        );
    }
}
