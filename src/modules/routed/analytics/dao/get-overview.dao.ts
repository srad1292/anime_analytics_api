import { Db, AggregationCursor } from "mongodb";

import { Database } from "../../../../common/database/Database";
import { DatabaseCollection } from "../../../../common/database/DatabaseCollection.enum";
import { AnimeRatingDto } from "../../anime/dto/anime-rating.dto";

export class GetOverviewDao {

    public db: Db;

    constructor() {
        this.db = Database.getInstance();
    }

    async getOverviewCounts() {

        let countsByRatingCursor: AggregationCursor = await this.db.collection(DatabaseCollection.CompletedAnime)
        .aggregate([ 
            { '$group': { '_id': '$animeListScore', count: { '$sum': 1 } } }
        ]);

        let response: any = {
            totalCount: 0,
            ratedCount: 0,
            averageRating: 0,
            countsByRating: [],
        };
        await countsByRatingCursor.toArray().then(countsByRating => {
            let sum = 0;
            countsByRating = countsByRating.map(count => {
                count.score = count._id;
                delete count._id; 

                response.totalCount += count.count;

                if(count.score > 0) {
                    response.ratedCount += count.count;
                    sum += (count.score * count.count);
                }

                return count;
            });

            response.countsByRating = countsByRating;

            if(response.ratedCount > 0) {
                response.averageRating = sum / response.ratedCount;
            }
        });

        return response;
    }
}