import { createAnimeDao } from '../dao/index';


class CreateAnimeService {

    constructor() {}

    async createAnime(anime: any) {
        return await createAnimeDao.createAnime(anime);
    }

    async bulkCreateAnime(anime: any[]) {
        return await createAnimeDao.bulkCreateAnime(anime);
    }
}

export default CreateAnimeService;