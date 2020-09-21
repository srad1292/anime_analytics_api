import { GetOverviewService } from "./get-overview.service";
import { GetGenreService } from "./get-genre.service";
import { GetStudioService } from "./get-studio.service";
import { GetProducerDao } from "../dao/get-producer.dao";
import { GetTimeService } from "./get-time.service";


const getOverviewService = new GetOverviewService();
const getGenreService = new GetGenreService();
const getStudioService = new GetStudioService();
const getProducerService = new GetProducerDao();
const getTimeService = new GetTimeService();

export {
    getOverviewService,
    getGenreService,
    getStudioService,
    getProducerService,
    getTimeService,
}