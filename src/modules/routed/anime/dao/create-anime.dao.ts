import { Db } from "mongodb";
import { Database } from "../../../../common/database/Database";
import { DatabaseCollection } from "../../../../common/database/DatabaseCollection.enum";
import { BulkAnimeDto } from "../dto/bulk-anime.dto";
import { AnimeDto } from "../dto/anime.dto";

class CreateAnimeDao {
    public db: Db;

    constructor() {
        this.db = Database.getInstance();
    }

    async createAnime(anime: AnimeDto) {
        let document = await this.db.collection(DatabaseCollection.CompletedAnime).insertOne(anime)
        .then(data => {
            console.log({data});
            return anime;
        });

        return document;
    }

    async bulkCreateAnime(bulkAnime: BulkAnimeDto) {
        const anime: AnimeDto[] = bulkAnime.anime;
        let documents = await this.db.collection(DatabaseCollection.CompletedAnime).insertMany(anime)
        .then(data => {
            console.log({data});
            return anime;
        });

        return documents;
    }
}

export default CreateAnimeDao;