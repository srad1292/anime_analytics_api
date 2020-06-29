import { cleanEnv, port, str } from 'envalid';

interface IEnvironment { 
    PORT?: number;
    MONGO_URL?: string;
    DATABASE?: string;
}

export abstract class Environment {

    public static environment: IEnvironment;

    public static validateEnv = () => {
        const environmentVariables = {
            PORT: port({
                devDefault: 5001,
                example: "5001",
                desc: "The port number for the url used to hit this service"
            }),
            MONGO_URL: str({
                devDefault: "mongodb://localhost:27017/",
                example: "mongodb://localhost:27017/",
                desc: "The URL for the mongodb connection"
            }),
            DATABASE: str({
                example: "local",
                desc: "The database to connect to"
            }),
        }

        Environment.environment = cleanEnv(process.env, environmentVariables);
    }
}