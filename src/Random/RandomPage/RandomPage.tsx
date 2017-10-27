import './RandomPage.css';

import * as React from 'react';

import { DiscoverOptions, TMDBMovie } from '../../Api/TMDB/TMDBMovie';
import { QueryRenderer, QueryRendererComponentProps } from '../../Common/QueryRenderer/QueryRenderer';

import { RandomPageDetails } from './RandomPageDetails';
import { RandomPageHeader } from './RandomPageHeader';
import { RandomPageHero } from './RandomPageHero';
import { TMDBAccount } from '../../Api/TMDB/TMDBAccount';
import { TMDBPage } from '../../Api/TMDB/TMDBPage';
import { connectionStore } from '../../stores/ConnectionStore';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { randomStore } from '../../stores/RandomStore';

/**
 * Utility function to randomly select an element in an array.
 * 
 * @template T 
 * @param {T[]} items 
 * @returns {(T | null)} 
 */
function randomInArray<T>(items: T[]): T | null {
    if (items.length === 0) {
        return null;
    }
    const max = items.length - 1;
    const rnd = Math.floor(Math.random() * (max + 1));
    return items[rnd];
}

/**
 * Data required for the page.
 */
type QueryData = {
    movies: TMDBPage<TMDBMovie>;
};

/**
 * 
 * 
 * @export
 * @interface RandomPageProps
 * @extends {QueryRendererComponentProps<QueryData>}
 */
export interface RandomPageProps extends QueryRendererComponentProps<QueryData> { }

/**
 * 
 * 
 * @export
 * @class RandomPage
 * @extends {React.Component<RandomPageProps, {}>}
 */
@observer
export class RandomPage extends React.Component<RandomPageProps, {}> {
    @observable
    public randomMovie: TMDBMovie | null = null;

    public reroll = () => {
        this.randomMovie = randomInArray(this.props.data.movies.entries);
        randomStore.setRerollCount(randomStore.rerollCount + 1);
    }

    public componentDidMount() {
        this.reroll();
    }

    public render() {
        const movie = this.randomMovie;

        if (!movie) {
            return null;
        }

        return (
            <div className="random-page">
                <RandomPageHeader onReroll={this.reroll} />
                <RandomPageHero movie={movie} />
                <RandomPageDetails movie={movie} />
            </div>
        );
    }
}

/**
 * 
 * 
 * @export
 * @class RandomPageWithData
 * @extends {React.Component<{}, {}>}
 */
export class RandomPageWithData extends React.Component<{}, {}> {
    /**
     * Performs queries to display the RandomPage
     * 
     * @memberof RandomPageWithData
     */
    query = async () => {
        // The users account if availiable.
        const { account, connection } = connectionStore;

        // Randomly select one year within the last x years.
        // From that year we'r randomly going to select a movie.
        const lastYears = Array(20).fill(new Date().getFullYear()).map((y, i) => y - i);
        const discoverOptions: DiscoverOptions = {
            'primary_release_year': randomInArray(lastYears) as number,
            'vote_average.gte': 5
        };

        // The movies to randomly select one from.
        const movies = account
            ? await TMDBAccount.getWatchlist(connection, account)
            : await TMDBMovie.discover(connection, discoverOptions);

        return {
            movies
        };
    }

    render() {
        return (
            <QueryRenderer
                query={this.query}
                component={RandomPage}
            />
        );
    }
}
