import { GetOverviewService } from "./get-overview.service";
import { GetGenreService } from "./get-genre.service";


const getOverviewService = new GetOverviewService();
const getGenreService = new GetGenreService();

export {
    getOverviewService,
    getGenreService
}