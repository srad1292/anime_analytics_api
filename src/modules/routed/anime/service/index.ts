import CreateAnimeService from "./create-anime.service";
import GetAnimeService from "./get-anime.service";


const createAnimeService = new CreateAnimeService();
const getAnimeService = new GetAnimeService();

export {
    createAnimeService,
    getAnimeService
}