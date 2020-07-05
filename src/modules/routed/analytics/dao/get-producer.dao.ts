import { Db, AggregationCursor } from "mongodb";

import { Database } from "../../../../common/database/Database";
import { DatabaseCollection } from "../../../../common/database/DatabaseCollection.enum";


export class GetProducerDao {

    public db: Db;

    constructor() {
        this.db = Database.getInstance();
    }

    async getProducerAnalytics() {         
        const producerQuery: AggregationCursor = this.db.collection(DatabaseCollection.CompletedAnime)
            .aggregate([
                {
                    $match: { animeListScore: { "$gt": 0 } }
                },
                {
                    $unwind: "$producers"
                },
                {
                    $group: {
                        '_id': '$producers.name',
                        count: { '$sum': 1 },
                        totalRating: { '$sum': "$animeListScore" },
                        average: { '$avg': "$animeListScore" }
                    },
                },                
            ]);

        const producerData = await producerQuery.toArray().then(data => {
            data = data.map(producer => {
                producer.average = parseFloat(producer.average.toFixed(2));
                producer.name = producer._id;
                delete producer._id;
                return producer;
            });

            data = data.sort((current, next) => {
                return `${current.name}`.localeCompare(next.name);
            });
            return data;
        });

        return {
            producers: producerData
        };
    }

}