import { Db, AggregationCursor, FindOneOptions } from "mongodb";

import { Database } from "../../../../common/database/Database";
import { DatabaseCollection } from "../../../../common/database/DatabaseCollection.enum";
import { AnimeRatingDto } from "../../anime/dto/anime-rating.dto";
import { RatingEdge } from "../enums/rating-edge.enum";

export class GetTimeDao {

    public db: Db;

    constructor() {
        this.db = Database.getInstance();
    }

    async getFinishedDateAnalytics() {

        let countsByYearCursor: AggregationCursor = await this.db.collection(DatabaseCollection.CompletedAnime)
        .aggregate([
            {
                $match: { animeListScore: { "$gt": 0 } }
            },
            { 
                '$group': { 
                    '_id': { $substr: ["$animeListFinishedDate", 0, 4]}, 
                    count: { '$sum': 1 }, 
                    totalRating: { '$sum': "$animeListScore" }, 
                    average: { '$avg': "$animeListScore" },
                     
                } 
            } 
        ]);

        let response: any = {
            finishedYear: [],
        };

        await countsByYearCursor.toArray().then(dbCountsByYear => {
            console.log(dbCountsByYear);

            let countsByYear = dbCountsByYear.map(count => {
                count.year = count._id;
                count.average = parseFloat(count.average.toFixed(2));
                delete count._id; 

                return count;
            });

            response.finishedYear = countsByYear.sort((a, b) => {
                return parseInt(a.year)-parseInt(b.year);
            });
        });

        return response;
    }

    async getStartedAiringDateAnalytics() {

        let countsByYearCursor: AggregationCursor = await this.db.collection(DatabaseCollection.CompletedAnime)
        .aggregate([
            {
                $match: { animeListScore: { "$gt": 0 } }
            },
            { 
                '$group': { 
                    '_id': { $substr: ["$aired.from", 0, 4]}, 
                    count: { '$sum': 1 }, 
                    totalRating: { '$sum': "$animeListScore" }, 
                    average: { '$avg': "$animeListScore" },
                     
                } 
            } 
        ]);

        let response: any = {
            startedAiringYear: [],
        };

        await countsByYearCursor.toArray().then(dbCountsByYear => {
            console.log(dbCountsByYear);

            let countsByYear = dbCountsByYear.map(count => {
                count.year = count._id;
                count.average = parseFloat(count.average.toFixed(2));
                delete count._id; 

                return count;
            });

            response.startedAiringYear = countsByYear.sort((a, b) => {
                return parseInt(a.year)-parseInt(b.year);
            });
        });

        return response;
    }



}