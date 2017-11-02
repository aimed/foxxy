import { TMDBGenre } from '../Api/TMDB/TMDBGenre';
import { observable } from 'mobx';

export class FiltersStore {
    @observable
    public genres: TMDBGenre[] = [];

    @observable
    public watchlist: boolean = false;
}

export const filtersStore = new FiltersStore();
