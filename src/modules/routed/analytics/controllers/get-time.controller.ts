import { Router as ExpressRouter, Request, Response, response } from 'express';

import { Controller } from "../../../../common/interface/controller.interface";
import { getTimeService } from '../service';


class GetTimeController implements Controller {
    public path: string = '/analytics/time';
    public router = ExpressRouter();
    
    constructor() {
        this.setupRoutes();
    }

    setupRoutes() {
        this.router.get('/finished-date', this.getFinishedDateAnalytics);
    }

    async getFinishedDateAnalytics(request: Request, response: Response) {
        try {
            const data = await getTimeService.getFinishedDateAnalytics();
            response.status(200).send(data);
        } catch(error) {
            console.log({error});
            response.status(400).send({error: "some error occurred"});
        }
    }

}

export default GetTimeController;