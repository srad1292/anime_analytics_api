import CreateAnimeDao from "./create-anime.dao";
import GetAnimeDao from "./get-anime.dao";


const createAnimeDao = new CreateAnimeDao();
const getAnimeDao = new GetAnimeDao();

export {
    createAnimeDao,
    getAnimeDao
}