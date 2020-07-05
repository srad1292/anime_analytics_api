import { Router as ExpressRouter, Request, Response, response } from 'express';

import { Controller } from "../../../../common/interface/controller.interface";
import { getOverviewService } from '../service';
import { ValidateQuery } from '../../../../common/decorators/validate.decorator';
import { PaginationOptionsQuery } from '../../../../common/dto/pagination-options.dto';

class GetOverviewController implements Controller {
    public path: string = '/analytics/overview';
    public router = ExpressRouter();
    
    constructor() {
        this.setupRoutes();
    }

    setupRoutes() {
        this.router.get('/counts', this.getOverviewCounts);
        this.router.get('/highest-rated', this.getHighestRated);
        this.router.get('/lowest-rated', this.getLowestRated);
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

    @ValidateQuery(PaginationOptionsQuery)
    async getHighestRated(request: Request, response: Response) {
        try {
            const paginationOptions = request.query;
            const highestRated = await getOverviewService.getHighestRated(paginationOptions);
            response.status(200).send(highestRated);
        } catch(error) {
            console.log({error});
            response.status(400).send({error: "some error occurred"});
        }
    }

    async getLowestRated(request: Request, response: Response) {
        try {
            const paginationOptions = request.query;
            const lowestRated = await getOverviewService.getLowestRated(paginationOptions);
            response.status(200).send(lowestRated);
        } catch(error) {
            console.log({error});
            response.status(400).send({error: "some error occurred"});
        }
    }
}

export default GetOverviewController;