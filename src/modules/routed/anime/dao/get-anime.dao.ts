import { Db } from "mongodb";
import { Database } from "../../../../common/database/Database";
import { DatabaseCollection } from "../../../../common/database/DatabaseCollection.enum";
import { AnimeRatingDto } from "../dto/anime-rating.dto";


class GetAnimeDao {
    public db: Db;

    constructor() {
        this.db = Database.getInstance();
    }

    async getAnime(animeId: number): Promise<AnimeRatingDto[]> {
        let anime = await this.db.collection(DatabaseCollection.CompletedAnime)
        .find({malId: {$eq: animeId}})
        .toArray()
        .then(data => {
            console.log(data);
            if(!data || data.length === 0) {
                return [];
            }
            if(data.length == 1 && !data[0].malId) {
                return [];
            }
            return data.map(rating => {
                rating.ratingId = rating._id;
                delete rating._id;
                return rating;
            });
        }).catch(error => {
            return [];
        });
        console.log("returning anime");
        console.log(anime);
        return anime;
    }

}

export default GetAnimeDao;