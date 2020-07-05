import { Db, AggregationCursor } from "mongodb";

import { Database } from "../../../../common/database/Database";
import { DatabaseCollection } from "../../../../common/database/DatabaseCollection.enum";


export class GetStudioDao {

    public db: Db;

    constructor() {
        this.db = Database.getInstance();
    }

    async getStudioAnalytics() {         
        const studioQuery: AggregationCursor = this.db.collection(DatabaseCollection.CompletedAnime)
            .aggregate([
                {
                    $match: { animeListScore: { "$gt": 0 } }
                },
                {
                    $unwind: "$studios"
                },
                {
                    $group: {
                        '_id': '$studios.name',
                        count: { '$sum': 1 },
                        totalRating: { '$sum': "$animeListScore" },
                        average: { '$avg': "$animeListScore" }
                    },
                },                
            ]);

        const studioData = await studioQuery.toArray().then(data => {
            data = data.map(studio => {
                studio.average = parseFloat(studio.average.toFixed(2));
                studio.name = studio._id;
                delete studio._id;
                return studio;
            });

            data = data.sort((current, next) => {
                return `${current.name}`.localeCompare(next.name);
            });
            return data;
        });

        return {
            studios: studioData
        };
    }

}