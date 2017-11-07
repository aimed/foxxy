import { TMDBConnection } from './TMDBConnection';

export class TMDBGenre {
    public id: number;
    public name: string;

    public static fromJSON(data: any): TMDBGenre {
        return new TMDBGenre(data.id, data.name);
    }

    public static async getGenres(con: TMDBConnection, language?: string): Promise<TMDBGenre[]> {
        return await con.getRequest(TMDBGenre.fromResponse, `/genre/movie/list`, { language });
    }

    private static fromResponse(data: any): TMDBGenre[] {
        const response = data.genres as any[];
        return response.map(TMDBGenre.fromJSON);
    }

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}