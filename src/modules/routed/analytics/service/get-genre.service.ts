import { getGenreDao } from "../dao";

export class GetGenreService {

    async getGenreAnalytics() {
        return await getGenreDao.getGenreAnalytics();
    }
}