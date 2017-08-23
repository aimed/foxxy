export class TMDBPage<T> {
    public page: number;
    public totalPages: number;
    public entries: T[];

    public static fromJSON<T>(parseObject: (object: {}) => T): (data: {}) => TMDBPage<T> {
        return (data: any): TMDBPage<T> => {
            const page = new TMDBPage<T>(data.page, data.total_pages);
            const results = data.results as {}[];
            const entries = results.map(parseObject);
            page.entries = entries;
            return page;
        };
    }

    public hasMore(): boolean {
        return this.page < this.totalPages;
    }

    private constructor(page: number, totalPages: number) {
        this.page = page;
        this.totalPages = totalPages;
    }

}