import { Router as ExpressRouter, Request, Response, response } from 'express';

import { Controller } from "../../../../common/interface/controller.interface";
import { getStudioService } from '../service';


class GetOverviewController implements Controller {
    public path: string = '/analytics/studio';
    public router = ExpressRouter();
    
    constructor() {
        this.setupRoutes();
    }

    setupRoutes() {
        this.router.get('/', this.getStudioCounts);

    }

    async getStudioCounts(request: Request, response: Response) {
        try {
            const counts = await getStudioService.getStudioAnalytics();
            response.status(200).send(counts);
        } catch(error) {
            console.log({error});
            response.status(400).send({error: "some error occurred"});
        }
    }

}

export default GetOverviewController;