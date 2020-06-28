import * as express from "express";

export interface Controller {
    path: string;
    router: express.Router;

    setupRoutes: Function;
}