import { Db } from "mongodb";
import { Database } from "../../../../common/database/Database";
import { DatabaseCollection } from "../../../../common/database/DatabaseCollection.enum";
import { AnimeRatingDto } from "../dto/anime-rating.dto";
import { BulkAnimeRatingDto } from "../dto/bulk-anime.dto";

class CreateAnimeDao {
    public db: Db;

    constructor() {
        this.db = Database.getInstance();
    }

    async createAnime(anime: AnimeRatingDto) {
        let document = await this.db.collection(DatabaseCollection.CompletedAnime).insertOne(anime)
        .then(data => {
            console.log({data});
            return anime;
        });

        return document;
    }

    async bulkCreateAnime(bulkAnime: BulkAnimeRatingDto) {
        const anime: AnimeRatingDto[] = bulkAnime.anime;
        let documents = await this.db.collection(DatabaseCollection.CompletedAnime).insertMany(anime)
        .then(data => {
            console.log({data});
            return anime;
        });

        return documents;
    }
}

export default CreateAnimeDao;