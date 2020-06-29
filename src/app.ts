import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from 'cors';

import { requestLoggerMiddleware } from "./middleware/request-logger.middleware";
import { Controller } from "./common/interface/controller.interface";
import { Db } from "mongodb";


class App {
    public app: express.Application;
    public port: number;
    
    constructor(port: number, controllers: Controller[], db: Db) {
        this.app = express();
        this.app.locals.db = db;
        this.port = port;

        this._initializeMiddleWares();
        this._initializeControllers(controllers);
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`);
        });
    }


    private _initializeMiddleWares() {
        this.app.use(bodyParser.json({limit: '50mb'}));
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(requestLoggerMiddleware);
        this.app.use(cors());
    }

    private _initializeControllers(controllers: Controller[]) {
        this.app.get('/', (request, response) => {
            response.status(200).send({message: 'Anime analytics service is running!'});
        });

        controllers.forEach((controller: Controller) => {
            this.app.use(controller.path, controller.router);
        });
    }
}

export default App;