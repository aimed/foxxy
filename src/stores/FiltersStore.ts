import { TMDBGenre } from '../Api/TMDB/TMDBGenre';
import { observable } from 'mobx';

export class FiltersStore {
    @observable
    public genre: TMDBGenre | null = null;

    @observable
    public watchlist: boolean = false;
}

export const filtersStore = new FiltersStore();
