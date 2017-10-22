import { TMDBConnection } from './TMDBConnection';
import { TMDBPage } from './TMDBPage';

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
    'vote_average.gte'?: number;
    'with_genres'?: string;
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
        return movie;
    }

    public static discover(con: TMDBConnection, query: DiscoverOptions): Promise<TMDBPage<TMDBMovie>> {
        return con.getRequest(TMDBPage.fromJSON(TMDBMovie.fromJSON), '/discover/movie', query);
    }

    private constructor() { }

}