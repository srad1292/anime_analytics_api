export interface AnimeSearchItem {
    malId: number;
    url: string;
    title: string;
    synopsis: string;
    episodes: number;
    type: string;
    score: number;
    startDate: string;
    endDate: string;
}

export interface AnimeSearchList {
    anime: AnimeSearchItem[];
    totalPages: number;
}