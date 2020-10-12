import { Router as ExpressRouter, Request, Response, response } from 'express';

import { Controller } from "../../../../common/interface/controller.interface";
import { createAnimeService } from "../service/index";
import { ValidateBody } from '../../../../common/decorators/validate.decorator';
import { BulkAnimeRatingDto } from '../dto/bulk-anime.dto';
import { AnimeRatingDto } from '../dto/anime-rating.dto';

class CreateAnimeController implements Controller {
    public path: string = '/anime';
    public router = ExpressRouter();
    
    constructor() {
        this.setupRoutes();
    }

    setupRoutes() {
        this.router.post('/', this.createAnime);
        this.router.post('/bulk', this.bulkCreateAnime);
    }

    @ValidateBody(AnimeRatingDto)
    async createAnime(request: Request, response: Response) {
        try {
            const anime = request.body as AnimeRatingDto;
            const document = await createAnimeService.createAnime(anime);
            response.status(201).send(document);
        } catch(error) {
            console.log({error});
            response.status(400).send({error: "some error occurred"});
        }
    }

    @ValidateBody(BulkAnimeRatingDto)
    async bulkCreateAnime(request: Request, response: Response) {
        try {
            const document = await createAnimeService.bulkCreateAnime(request.body as BulkAnimeRatingDto);
            response.status(201).send(document);
        } catch(error) {
            console.log({error});
            response.status(400).send({error: "some error occurred"});
        }
    }

}

export default CreateAnimeController;