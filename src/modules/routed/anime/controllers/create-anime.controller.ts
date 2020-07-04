import { Router as ExpressRouter, Request, Response, response } from 'express';

import { Controller } from "../../../../common/interface/controller.interface";
import { createAnimeService } from "../service/index";
import { ValidateBody } from '../../../../common/decorators/validate.decorator';
import { BulkAnimeDto } from '../dto/bulk-anime.dto';
import { AnimeDto } from '../dto/anime.dto';

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

    @ValidateBody(AnimeDto)
    async createAnime(request: Request, response: Response) {
        try {
            const anime = request.body as AnimeDto;
            const document = await createAnimeService.createAnime(anime);
            response.status(201).send(document);
        } catch(error) {
            console.log({error});
            response.status(400).send({error: "some error occurred"});
        }
    }

    @ValidateBody(BulkAnimeDto)
    async bulkCreateAnime(request: Request, response: Response) {
        try {
            const document = await createAnimeService.bulkCreateAnime(request.body as BulkAnimeDto);
            response.status(201).send(document);
        } catch(error) {
            console.log({error});
            response.status(400).send({error: "some error occurred"});
        }
    }

}

export default CreateAnimeController;