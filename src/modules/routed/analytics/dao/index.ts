import { GetOverviewDao } from "./get-overview.dao";
import { GetGenreDao } from "./get-genre.dao";
import { GetStudioDao } from "./get-studio.dao";


const getOverviewDao = new GetOverviewDao();
const getGenreDao = new GetGenreDao();
const getStudioDao = new GetStudioDao();

export {
    getOverviewDao,
    getGenreDao,
    getStudioDao,
}