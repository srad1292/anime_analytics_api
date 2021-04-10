import { Router as ExpressRouter, Request, Response, response } from 'express';

import { Controller } from "../../../../common/interface/controller.interface";
import { getAnimeService } from "../service/index";
import { ValidateQuery } from '../../../../common/decorators/validate.decorator';
import { SearchAnimeDto } from '../dto/search-anime.dto';

class GetAnimeController implements Controller {
    public path: string = '/anime';
    public router = ExpressRouter();
    
    constructor() {
        this.setupRoutes();
    }

    setupRoutes() {
        this.router.get('/', this.searchAnime);
        this.router.get('/:animeId', this.getAnime);
    }

    @ValidateQuery(SearchAnimeDto)
    async searchAnime(request: Request, response: Response) {
        try {
            let searchAnime: SearchAnimeDto = (request.query as any) as SearchAnimeDto;
            const anime = await getAnimeService.searchAnime(searchAnime);
            response.status(200).send(anime);
        } catch(error) {
            console.log({error});
            response.status(400).send({error: "some error occurred"});
        }
    }

    async getAnime(request: Request, response: Response) {
        try {
            const animeId: number = +request.params.animeId;
            const anime = await getAnimeService.getAnime(animeId);
            response.status(200).send(anime);
        } catch(error) {
            console.log({error});
            response.status(400).send({error: "some error occurred"});
        }
    }
}

export default GetAnimeController;