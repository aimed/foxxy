import './FilterMenu.css';

import * as React from 'react';

import { action, observable } from 'mobx';

import { Button } from '../../Common/Button/Button';
import { QueryRenderer } from '../../Common/QueryRenderer/QueryRenderer';
import { Spinner } from '../../Common/Spinner/Spinner';
import { TMDBAccount } from '../../Api/TMDB/TMDBAccount';
import { TMDBGenre } from '../../Api/TMDB/TMDBGenre';
import { TMDBMovie } from '../../Api/TMDB/TMDBMovie';
import { TMDBPage } from '../../Api/TMDB/TMDBPage';
import { connectionStore } from '../../stores/ConnectionStore';
import { filtersStore } from '../../stores/FiltersStore';
import { observer } from 'mobx-react';

/**
 * A genre that indicates that all genres have been selected.
 */
const allGenres = new TMDBGenre(-1, 'All genres');

export interface FilterMenuState { }
export interface FilterMenuProps {
    refresh: () => void;
    data: {
        account: TMDBAccount | null;
        genres: TMDBGenre[];
        watchlist: TMDBPage<TMDBMovie> | null;
    };
}

/**
 * Allows the user to specify which movies to choose from.
 * 
 * @export
 * @class FilterMenu
 * @extends {React.Component<FilterMenuProps, FilterMenuState>}
 */
@observer
export class FilterMenu extends React.Component<FilterMenuProps, FilterMenuState> {
    /**
     * Whether or not to only use the watchlist.
     * 
     * @private
     * @type {boolean}
     * @memberof FilterMenu
     */
    @observable
    private watchlistOnly: boolean = !!filtersStore.watchlist;

    /**
     * List of selected genres.
     * 
     * @private
     * @type {number | null}
     * @memberof FilterMenu
     */
    @observable
    private selectedGenre: number | null = filtersStore.genre && filtersStore.genre.id;

    /**
     * Gets all genre ids in the watchlist.
     * 
     * @readonly
     * @private
     * @memberof FilterMenu
     */
    private get watchlistGenreIds() {
        return this.props.data.watchlist
            ? this.props.data.watchlist.entries.reduce((p, c) => [...p, ...c.genreIds], [])
            : [];
    }

    /**
     * 
     * 
     * @readonly
     * @private
     * @memberof FilterMenu
     */
    private get selectedGenreField() {
        return this.selectedGenre ? this.selectedGenre + '' : '-1';
    }

    /**
     * Determines if the genre has been selected by the user.
     * 
     * @memberof FilterMenu
     */
    isSelected = (genre: TMDBGenre): boolean => !!this.selectedGenre && genre.id === this.selectedGenre;

    /**
     * Selects/Unselects the given genre.
     * 
     * @memberof FilterMenu
     */
    toggleGenre = (genreId: number) => {
        if (this.selectedGenre && this.selectedGenre === genreId || genreId === allGenres.id) {
            this.selectedGenre = null;
        } else {
            this.selectedGenre = genreId;
        }
    }

    /**
     * Applies the filters.
     * 
     * @memberof FilterMenu
     */
    @action
    applyFilters = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        filtersStore.watchlist = this.watchlistOnly;
        
        const selectedGenre = this.selectedGenre;
        const watchlistContainsGenre = selectedGenre && this.watchlistGenreIds.find(id => id === selectedGenre);
        const genre = selectedGenre ? this.props.data.genres.find(g => g.id === selectedGenre) || null : null;
        filtersStore.genre = this.watchlistOnly && !watchlistContainsGenre ? null : genre;
    }

    /**
     * 
     * 
     * @returns 
     * @memberof FilterMenu
     */
    render() {
        const { data: { account, genres, watchlist } } = this.props;

        const availiableGenres = account && this.watchlistOnly
            ? [allGenres, ...genres.filter(genre => this.watchlistGenreIds.find(id => id === genre.id))]
            : [allGenres, ...genres];

        return (
            <form className="filter-menu" onSubmit={this.applyFilters}>
                {account && watchlist && watchlist.entries.length > 0 &&
                    <fieldset>
                        <input
                            type="checkbox"
                            checked={this.watchlistOnly}
                            onChange={e => this.watchlistOnly = e.currentTarget.checked}
                        />
                        Only from my watchlist
                        </fieldset>
                }
                <fieldset>
                    <select 
                        onChange={e => this.toggleGenre(parseInt(e.currentTarget.value, 10))} 
                        value={this.selectedGenreField}
                    >
                        {availiableGenres.map(genre => 
                            <option key={genre.id} value={genre.id}>{genre.name}</option>
                        )}
                    </select>
                </fieldset>
                <fieldset>
                    <Button type="submit" plain>Apply</Button>
                </fieldset>
            </form>
        );
    }
}

type QueryVariables = {
    account: TMDBAccount | null;
};

/**
 * Allows the user to specify which movies to choose from.
 * 
 * @export
 * @class FilterMenuWithData
 * @extends {React.Component<{}, {}>}
 */
@observer
export class FilterMenuWithData extends React.Component<{}, {}> {
    query = async (variables: QueryVariables) => {
        const { account } = variables;
        const genres = await TMDBGenre.getGenres(connectionStore.connection);
        const watchlist = account ? await TMDBAccount.getWatchlist(connectionStore.connection, account) : null;

        return {
            watchlist,
            account,
            genres
        };
    }

    render() {
        const account = connectionStore.account;
        const variables: QueryVariables = { account };

        return (
            <QueryRenderer
                loading={() => <div className="spinner-container"><Spinner /></div>}
                variables={variables}
                query={this.query}
                component={FilterMenu}
            />
        );
    }
}
