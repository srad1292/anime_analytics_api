import * as glob from "glob";
import { Environment } from "./utils/validate-env";
import { Controller } from "./common/interface/controller.interface";
import App from "./app";

Environment.validateEnv();

console.log("Starting Server: ");
let controllers: Controller[] = [];


async function setUpApp() { 
    await glob("src/modules/routed/**/*.controller.ts", async(error: Error, paths: String[]) => {
        for(let path of paths) {
            const file: string = path.toString().replace(/^src/, ".");
            const module = await import(file);
            const controllerKey = Object.keys(module).find((key: string) => {
                return key.match(/Controller$/) !== null;
            });
            const controller = module.default ? module.default : module[controllerKey];
            if(controller) {
                const item: Controller = new controller();
                controllers.push(item);
            }
        }    
        
        const app = new App(Environment.environment.PORT, controllers);
        app.listen();
        
    });
}

setUpApp();