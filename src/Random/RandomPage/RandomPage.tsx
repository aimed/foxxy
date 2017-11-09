import './RandomPage.css';

import * as React from 'react';

import { FilterMenuWithData } from '../FilterMenu/FilterMenu';
import { RandomMovieProvider } from '../RandomMovieProvider/RandomMovieProvider';
import { RandomPageDetails } from './RandomPageDetails';
import { RandomPageHeader } from './RandomPageHeader';
import { RandomPageHero } from './RandomPageHero';
import { RollHistory } from '../RollHistory/RollHistory';
import { TMDBMovie } from '../../Api/TMDB/TMDBMovie';
import { connectionStore } from '../../stores/ConnectionStore';
import { filtersStore } from '../../stores/FiltersStore';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

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
    reroll?: () => void;
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
        const { selectedMovie, history, reroll } = this.props;

        if (!selectedMovie) {
            return null;
        }

        return (
            <div className="random-page">
                <RandomPageHeader onReroll={reroll} onToggleFilters={() => this.showFilters = !this.showFilters} />
                {this.showFilters && <FilterMenuWithData />}
                <RandomPageHero movie={selectedMovie} />
                <RandomPageDetails movie={selectedMovie} />
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
        const { genre, watchlist, rerollTry } = filtersStore;
        const settings = { language, genre, watchlist };

        return (
            <RandomMovieProvider
                rerollTry={rerollTry}
                settings={settings}
            >
                {({ selectedMovie, history }) => <RandomPage selectedMovie={selectedMovie} history={history} />}
            </RandomMovieProvider>
        );
    }
}
