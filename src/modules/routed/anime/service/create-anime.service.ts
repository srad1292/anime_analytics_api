import { createAnimeDao } from '../dao/index';
import { BulkAnimeDto } from '../dto/bulk-anime.dto';
import { AnimeDto } from '../dto/anime.dto';


class CreateAnimeService {

    constructor() {}

    async createAnime(anime: AnimeDto) {
        return await createAnimeDao.createAnime(anime);
    }

    async bulkCreateAnime(anime: BulkAnimeDto) {
        return await createAnimeDao.bulkCreateAnime(anime);
    }
}

export default CreateAnimeService;