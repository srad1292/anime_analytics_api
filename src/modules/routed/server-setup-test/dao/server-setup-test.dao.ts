import { Db } from "mongodb";
import { request } from 'express';
import { Database } from "../../../../common/database/Database";
import { DatabaseCollection } from "../../../../common/database/DatabaseCollection.enum";



class ServerSetupTestDao {
    
    public db: Db;

    constructor() {
        this.db = Database.getInstance();
    }

    async createMongoDocument(body) {
        let document = await this.db.collection(DatabaseCollection.TestCollectionOne).insertOne(body)
        .then(data => {
            return body;
        });

        return document;
    }
}

export default ServerSetupTestDao;