import { Db } from "mongodb";
import { Database } from "../../../../common/database/Database";
import { DatabaseCollection } from "../../../../common/database/DatabaseCollection.enum";

class CreateAnimeDao {
    public db: Db;

    constructor() {
        this.db = Database.getInstance();
    }

    async createAnime(anime) {
        let document = await this.db.collection(DatabaseCollection.TestCollectionAnime).insertOne(anime)
        .then(data => {
            console.log({data});
            return anime;
        });

        return document;
    }

    async bulkCreateAnime(anime: any[]) {
        let documents = await this.db.collection(DatabaseCollection.TestCollectionAnime).insertMany(anime)
        .then(data => {
            console.log({data});
            return anime;
        });

        return documents;
    }
}

export default CreateAnimeDao;