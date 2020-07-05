import { GetOverviewDao } from "./get-overview.dao";
import { GetGenreDao } from "./get-genre.dao";
import { GetStudioDao } from "./get-studio.dao";
import { GetProducerDao } from "./get-producer.dao";


const getOverviewDao = new GetOverviewDao();
const getGenreDao = new GetGenreDao();
const getStudioDao = new GetStudioDao();
const getProducerDao = new GetProducerDao();

export {
    getOverviewDao,
    getGenreDao,
    getStudioDao,
    getProducerDao,
}