import { TMDBConnection } from './TMDBConnection';

export class TMDBGenre {
    public id: number;
    public name: string;

    public static fromJSON(data: any): TMDBGenre {
        const genre = new TMDBGenre();
        genre.id = data.id;
        genre.name = data.name;
        return genre;
    }

    public static getGenres(con: TMDBConnection): Promise<TMDBGenre[]> {
        return con.getRequest(TMDBGenre.fromResponse, `/genre/movie/list`);
    }

    private static fromResponse(data: any): TMDBGenre[] {
        const response = data.genres as any[];
        return response.map(TMDBGenre.fromJSON);
    }
}