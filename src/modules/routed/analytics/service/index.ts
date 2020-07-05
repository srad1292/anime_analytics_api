import { GetOverviewService } from "./get-overview.service";
import { GetGenreService } from "./get-genre.service";
import { GetStudioService } from "./get-studio.service";


const getOverviewService = new GetOverviewService();
const getGenreService = new GetGenreService();
const getStudioService = new GetStudioService();

export {
    getOverviewService,
    getGenreService,
    getStudioService,
}