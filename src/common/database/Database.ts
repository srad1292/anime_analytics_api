import { MongoClient, Db } from 'mongodb';
import { Environment } from '../../utils/validate-env';

export class Database {
    private static instance: Db | undefined;

    static async setUpInstance() {
        if(!Database.instance) {
            const client = await MongoClient.connect(
                `${Environment.environment.MONGO_URL}/`,
                { 
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                }
            );

            Database.instance = client.db(Environment.environment.DATABASE);
        } 
            
        return Database.instance;
    }

    public static getInstance() {
        return Database.instance;
    }


}