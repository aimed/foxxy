export type TMDBDate = {};
export const MakeTMDBDate = (date: Date) => `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}` as TMDBDate;