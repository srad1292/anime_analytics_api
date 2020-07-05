import { GetOverviewDao } from "./get-overview.dao";
import { GetGenreDao } from "./get-genre.dao";


const getOverviewDao = new GetOverviewDao();
const getGenreDao = new GetGenreDao();

export {
    getOverviewDao,
    getGenreDao,
}