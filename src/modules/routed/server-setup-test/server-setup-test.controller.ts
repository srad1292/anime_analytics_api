import { Router as ExpressRouter, Request, Response, response } from 'express';

import { Controller } from "../../../common/interface/controller.interface";
import ServerSetupTestDao from './dao/server-setup-test.dao';


class ServerSetupTestController implements Controller {
    public path: string = '/setup-test';
    public router = ExpressRouter();
    
    public serverSetupDao = new ServerSetupTestDao();

    constructor() {
        this.setupRoutes();
    }

    setupRoutes() {
        this.router.get('/', this.getControllerTest);
        this.router.post('/test-mongo-connection', this.createMongoDocument);
    }

    getControllerTest = async(request: Request, response: Response) => {
        response.status(200).send({message: "Controller imported successfully"});
    }

    createMongoDocument = async(request: Request, response: Response) => {
        try {
            const document = await this.serverSetupDao.createMongoDocument(request.body);
            console.log({boop: 'beep', document});
            response.status(200).send(document);
        } catch(error) {
            console.log({error});
            response.status(400).send({error: "some error occurred"});
        }
    }

}

export default ServerSetupTestController;