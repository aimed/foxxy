import { TMDBConnection } from './TMDBConnection';

export class TMDBGenre {
    private static _genres: TMDBGenre[] | null = null;

    public id: number;
    public name: string;

    public static fromJSON(data: any): TMDBGenre {
        const genre = new TMDBGenre();
        genre.id = data.id;
        genre.name = data.name;
        return genre;
    }

    public static async getGenres(con: TMDBConnection): Promise<TMDBGenre[]> {
        if (!TMDBGenre._genres) {
            TMDBGenre._genres = await con.getRequest(TMDBGenre.fromResponse, `/genre/movie/list`);
        }
        return TMDBGenre._genres;
    }

    private static fromResponse(data: any): TMDBGenre[] {
        const response = data.genres as any[];
        return response.map(TMDBGenre.fromJSON);
    }
}