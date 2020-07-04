import { Router as ExpressRouter, Request, Response, response } from 'express';

import { Controller } from "../../../../common/interface/controller.interface";
import { getOverviewService } from '../service';

class GetOverviewController implements Controller {
    public path: string = '/analytics/overview';
    public router = ExpressRouter();
    
    constructor() {
        this.setupRoutes();
    }

    setupRoutes() {
        this.router.get('/counts', this.getOverviewCounts);
    }

    async getOverviewCounts(request: Request, response: Response) {
        try {
            const counts = await getOverviewService.getOverviewCounts();
            response.status(200).send(counts);
        } catch(error) {
            console.log({error});
            response.status(400).send({error: "some error occurred"});
        }
    }
}

export default GetOverviewController;