import { Router as ExpressRouter, Request, Response } from 'express';

import { Controller } from "../../../common/interface/controller.interface";


class ServerSetupTestController implements Controller {
    public path: string = '/setup-test';
    public router = ExpressRouter();
    
    constructor() {
        this.setupRoutes();
    }

    setupRoutes() {
        this.router.get('/', this.getControllerTest);
    }

    getControllerTest = async(request: Request, response: Response) => {
        response.status(200).send({message: "Controller imported successfully"});
    }

}

export default ServerSetupTestController;