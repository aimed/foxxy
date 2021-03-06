import { TMDBConnection } from './TMDBConnection';
import { TMDBDate } from './TMDBDate';
import { TMDBPage } from './TMDBPage';

export class TMDBAccountState {
    public id: number;
    public favorite: boolean;
    public rated: boolean | { rated: number };
    public watchlist: boolean;

    public static fromJSON(data: any): TMDBAccountState {
        return new TMDBAccountState(data);
    }

    public constructor(data: any) {
        this.id = data.id;
        this.favorite = data.favorite;
        this.rated = data.rated;
        this.watchlist = data.watchlist;
    }
}

type DiscoverSortOptions =
    'popularity.asc' | 'popularity.desc' |
    'release_date.asc' | 'release_date.desc' |
    'revenue.asc' | 'revenue.desc' |
    'primary_release_date.asc' | 'vote_count.desc' |
    'primary_release_date.desc' | 'original_title.asc' |
    'original_title.desc' | 'vote_average.asc' |
    'vote_average.desc' | 'vote_count.asc';

// TODO: Complete list of options.
export type DiscoverOptions = {
    'sort_by'?: DiscoverSortOptions;
    'primary_release_year'?: number;
    'primary_release_date.gte'?: TMDBDate;
    'vote_average.gte'?: number;
    'with_genres'?: string;
    'page'?: number;
};

export class TMDBMovie {
    public posterPath: string | null;
    public overview: string;
    public releaseDate: Date;
    public genreIds: number[];
    public id: number;
    public title: string;
    public backdropPath: string | null;
    public voteAverage: number;
    public voteCount: number;

    public static fromJSON(data: any): TMDBMovie {
        const movie = new TMDBMovie();
        movie.id = data.id;
        movie.title = data.title;
        movie.posterPath = data.poster_path;
        movie.backdropPath = data.backdrop_path;
        movie.releaseDate = new Date(data.release_date);
        movie.genreIds = data.genre_ids;
        movie.voteAverage = data.vote_average;
        movie.overview = data.overview;
        movie.voteCount = data.vote_count;
        return movie;
    }

    // tslint:disable-next-line:max-line-length
    public static discover(con: TMDBConnection, query: DiscoverOptions, language?: string): Promise<TMDBPage<TMDBMovie>> {
        return con.getRequest(TMDBPage.fromJSON(TMDBMovie.fromJSON), '/discover/movie', { ...query, language });
    }

    public static accountState(con: TMDBConnection, movie: TMDBMovie): Promise<TMDBAccountState> {
        return con.getRequest(TMDBAccountState.fromJSON, `/movie/${movie.id}/account_states`);
    }

    private constructor() { }
}