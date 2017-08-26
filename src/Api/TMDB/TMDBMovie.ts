
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
    
    private constructor() {}

}