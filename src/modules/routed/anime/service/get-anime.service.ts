import { SearchAnimeDto } from "../dto/search-anime.dto";
import { AnimeSearchItem } from "../models/anime-search-list.interface";
import { AnimeDto } from "../dto/anime.dto";
import { MalItemDto } from "../dto/mal-item.dto";
import { AnimeRatingDto } from "../dto/anime-rating.dto";
import { getAnimeDao } from "../dao";
const axios = require('axios');

class GetAnimeService {

    constructor() {}

    async searchAnime(searchAnime: SearchAnimeDto) {
        const response = await axios.get(`https://api.jikan.moe/v3/search/anime?q=${searchAnime.title}&page=${searchAnime.page}`)
        .then(animeFound => {
            if(animeFound && animeFound.data && animeFound.data.results) {
                const anime: AnimeSearchItem[] = animeFound.data.results.map(item => {
                    return {
                        malId: item.mal_id,
                        url: item.url,
                        title: item.title,
                        synopsis: item.synopsis,
                        episodes: item.episodes,
                        type: item.type,
                        score: item.score,
                        startDate: item.start_date,
                        endDate: item.end_date,
                    } as AnimeSearchItem;
                });
                return {
                    anime: anime,
                    totalPages: animeFound.data.last_page
                };
            } else {
                console.log(animeFound);
                return {
                    anime: [],
                    totalPages: 0
                };
            }
        })
        .catch(error => {
            throw(error);
        });

        return response;
    }

    async getAnime(animeId: number): Promise<AnimeRatingDto[]> {
        let ratings = await getAnimeDao.getAnime(animeId);

        if(ratings && ratings.length > 0) {
            return ratings;
        }
        
        let anime: AnimeRatingDto = await axios.get(`https://api.jikan.moe/v3/anime/${animeId}`)
        .then(anime => {
            console.log(anime);
            if(anime && anime.data) {
                const animeResponse = this._animeToDto(anime.data);
                return animeResponse
            } else {
                return null;
            }
        })
        .catch(error => {
            throw(error);
        });

        if(anime == null) {
            return [];
        }

        anime.ratingId = null;
        anime.animeListStatus = null;
        anime.animeListStatusName = null;
        anime.animeListScore = null;
        anime.animeListFinishedDate = null;
        return [anime];
    }

    private _animeToDto(anime: any): AnimeDto {
        const related = !!anime.related ? anime.related : {};

        return {
            malId: anime.mal_id,
            url: anime.url,
            imageUrl: anime.image_url,
            trailerUrl: anime.trailer_url,
            title: anime.title,
            titleEnglish: anime.title_english,
            titleJapanese: anime.title_japanese,
            titleSynonyms: anime.title_synonyms,
            type: anime.type,
            source: anime.source,
            episodes: anime.episodes,
            status: anime.status,
            airing: anime.airing,
            aired: anime.aired,
            duration: anime.duration,
            rating: anime.rating,
            score: anime.score,
            scoredBy: anime.scored_by,
            rank: anime.rank,
            popularity: anime.popularity,
            members: anime.member,
            favorites: anime.favorites,
            synopsis: anime.synopsis,
            background: anime.background,
            premiered: anime.premiered,
            broadcast: anime.broadcast,
            related: {
                adaptation: this._mapMalItemToDto(related.Adaptation),
                alternativeSetting: this._mapMalItemToDto(related['Alternative setting']),
                alternativeVersion: this._mapMalItemToDto(related['Alternative version']),
                character: this._mapMalItemToDto(related.Character),
                other: this._mapMalItemToDto(related.Other),
                parentStory: this._mapMalItemToDto(related["Parent story"]),
                prequel: this._mapMalItemToDto(related.Prequel),
                sequel: this._mapMalItemToDto(related.Sequel),
                sideStory: this._mapMalItemToDto(related['Side story']),
                spinOff: this._mapMalItemToDto(related['Spin-off']),
                summary: this._mapMalItemToDto(related.Summary),
            },
            producers: this._mapMalItemToDto(anime.producers),
            licensors: this._mapMalItemToDto(anime.licensors),
            studios: this._mapMalItemToDto(anime.studios),
            genres: this._mapMalItemToDto(anime.genres),
            openingThemes: anime.opening_themes,
            endingThemes: anime.ending_themes
        };
    }

    private _mapMalItemToDto(items: any[]): MalItemDto[] {
        if(!items || !items.length) { return []; }

        return items.map(item => {
            return {
                malId: item.mal_id,
                type: item.type,
                name: item.name,
                url: item.url
            };
        });
    }

}

export default GetAnimeService;