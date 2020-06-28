import { cleanEnv, port } from 'envalid';

interface IEnvironment { 
    PORT?: number
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
        }

        Environment.environment = cleanEnv(process.env, environmentVariables);
    }
}