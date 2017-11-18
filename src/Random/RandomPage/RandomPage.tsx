import './RandomPage.css';

import * as React from 'react';

import { FilterMenuWithData } from '../FilterMenu/FilterMenu';
import { MovieDetails } from '../../Movie/MovieDetails/MovieDetails';
import { RandomMovieProvider } from '../RandomMovieProvider/RandomMovieProvider';
import { RandomPageHeader } from './RandomPageHeader';
import { RollHistory } from '../RollHistory/RollHistory';
import { Spinner } from '../../Common/Spinner/Spinner';
import { TMDBMovie } from '../../Api/TMDB/TMDBMovie';
import { connectionStore } from '../../stores/ConnectionStore';
import { filtersStore } from '../../stores/FiltersStore';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

const tmdbPoweredBy = require('./TMDBPoweredBy.svg');

const RandomPageCredits = () => (
    <div className="random-page__credits">
        <a href="//themoviedb.org">
            <img src={tmdbPoweredBy} alt="Powered by TMDb" height="30px" />
        </a>
    </div>
);

/**
 * 
 * 
 * @export
 * @interface RandomPageProps
 * @extends {QueryRendererComponentProps<QueryData>}
 */
export interface RandomPageProps {
    history: TMDBMovie[];
    selectedMovie: TMDBMovie | null;
    reroll: () => Promise<void>;
}

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
    public showFilters: boolean = false;

    public render() {
        const account = connectionStore.account;
        const { selectedMovie, history, reroll } = this.props;
        
        return (
            <div className="random-page">
                <RandomPageHeader onReroll={reroll} onToggleFilters={() => this.showFilters = !this.showFilters} />
                {this.showFilters && <FilterMenuWithData reroll={reroll} />}
                {selectedMovie && <MovieDetails movie={selectedMovie} account={account} />}
                {selectedMovie && <RandomPageCredits />}
                {!selectedMovie && <Spinner />}
                <RollHistory history={history} />
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
@observer
export class RandomPageWithData extends React.Component<{}, {}> {
    render() {
        const { language } = connectionStore;
        const { genre, watchlist } = filtersStore;
        const settings = { language, genre, watchlist };

        return (
            <RandomMovieProvider settings={settings}>
                {(props) => <RandomPage {...props} />}
            </RandomMovieProvider>
        );
    }
}
