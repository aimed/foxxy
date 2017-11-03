import './FilterMenu.css';

import * as React from 'react';

import { Button } from '../../Common/Button/Button';
import { QueryRenderer } from '../../Common/QueryRenderer/QueryRenderer';
import { TMDBAccount } from '../../Api/TMDB/TMDBAccount';
import { TMDBGenre } from '../../Api/TMDB/TMDBGenre';
import { TMDBMovie } from '../../Api/TMDB/TMDBMovie';
import { TMDBPage } from '../../Api/TMDB/TMDBPage';
import { connectionStore } from '../../stores/ConnectionStore';
import { filtersStore } from '../../stores/FiltersStore';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

interface FilterGenreItemProps {
    genre: TMDBGenre;
    toggle: (genre: TMDBGenre) => void;
    isSelected: boolean;
}

const FilterGenreItem = (props: FilterGenreItemProps) => {
    const { genre, toggle, isSelected } = props;

    const classNames = [
        'filter-genre__item',
        isSelected && '-selected'
    ].filter(n => !!n);

    return (
        <p className={classNames.join(' ')} onClick={() => toggle(genre)}>{genre.name}</p>
    );
};

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
     * @type {TMDBGenre[]}
     * @memberof FilterMenu
     */
    @observable
    private selectedGenres: TMDBGenre[] = [...filtersStore.genres];

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
     * Determines if the genre has been selected by the user.
     * 
     * @memberof FilterMenu
     */
    isSelected = (genre: TMDBGenre) => !!this.selectedGenres.find(genreSelected => genreSelected.id === genre.id);

    /**
     * Selects/Unselects the given genre.
     * 
     * @memberof FilterMenu
     */
    toggleGenre = (genre: TMDBGenre) => {
        const selected = this.selectedGenres.indexOf(genre);
        if (selected >= 0) {
            this.selectedGenres.splice(selected, 1);
        } else {
            this.selectedGenres.push(genre);
        }
    }

    /**
     * Applies the filters.
     * 
     * @memberof FilterMenu
     */
    applyFilters = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        filtersStore.watchlist = this.watchlistOnly;

        filtersStore.genres = this.watchlistOnly
            ? this.selectedGenres.filter(genre => this.watchlistGenreIds.find(id => id === genre.id))
            : this.selectedGenres;
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
            ? genres.filter(genre => this.watchlistGenreIds.find(id => id === genre.id))
            : genres;

        return (
            <form className="filter-menu" onSubmit={this.applyFilters}>
                <fieldset>
                    <Button type="submit">Apply</Button>
                </fieldset>
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
                    <FilterGenreItem
                        genre={allGenres}
                        isSelected={this.selectedGenres.length === 0}
                        toggle={() => this.selectedGenres = []}
                    />
                    {availiableGenres.map(genre =>
                        <FilterGenreItem
                            key={genre.id}
                            genre={genre}
                            isSelected={this.isSelected(genre)}
                            toggle={this.toggleGenre}
                        />
                    )}
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
                variables={variables}
                query={this.query}
                component={FilterMenu}
            />
        );
    }
}
