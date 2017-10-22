import * as React from 'react';

import { MoviePoster } from '../../Movie/MoviePoster';
import { TMDBMovie } from '../../Api/TMDB/TMDBMovie';

export interface RandomPageHeroState { }
export interface RandomPageHeroProps {
    movie: TMDBMovie;
}

export class RandomPageHero extends React.Component<RandomPageHeroProps, RandomPageHeroState> {
    render() {
        const { movie } = this.props;

        if (!movie) {
            return null;
        }

        return (
            <section className="random-page-hero">
                <MoviePoster movie={movie} className="random-page-hero__poster" />
                <div 
                    className="random-page-hero__backdrop" 
                    style={{backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdropPath})`}}  
                />
            </section>
        );
    }
}
