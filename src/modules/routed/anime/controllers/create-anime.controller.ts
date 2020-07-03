import { Router as ExpressRouter, Request, Response, response } from 'express';

import { Controller } from "../../../../common/interface/controller.interface";
import { createAnimeService } from "../service/index";

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

    createAnime = async(request: Request, response: Response) => {
        try {
            const document = await createAnimeService.createAnime(request.body);
            response.status(201).send(document);
        } catch(error) {
            console.log({error});
            response.status(400).send({error: "some error occurred"});
        }
    }

    bulkCreateAnime = async(request: Request, response: Response) => {
        try {
            const document = await createAnimeService.bulkCreateAnime(request.body);
            response.status(201).send(document);
        } catch(error) {
            console.log({error});
            response.status(400).send({error: "some error occurred"});
        }
    }

}

export default CreateAnimeController;