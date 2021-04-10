import { createAnimeDao } from '../dao/index';
import { AnimeRatingDto } from '../dto/anime-rating.dto';
import { BulkAnimeRatingDto } from '../dto/bulk-anime.dto';


class CreateAnimeService {

    constructor() {}

    async createAnime(anime: AnimeRatingDto) {
        return await createAnimeDao.createAnime(anime);
    }

    async bulkCreateAnime(anime: BulkAnimeRatingDto) {
        return await createAnimeDao.bulkCreateAnime(anime);
    }
}

export default CreateAnimeService;