import { TMDBGenre } from '../Api/TMDB/TMDBGenre';
import { observable } from 'mobx';

export class FiltersStore {
    @observable
    public genre: TMDBGenre | null = null;

    @observable
    public watchlist: boolean = false;

    @observable
    public rerollTry: number = 0;
}

export const filtersStore = new FiltersStore();
