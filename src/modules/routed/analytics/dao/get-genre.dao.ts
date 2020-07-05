import { Db, AggregationCursor } from "mongodb";

import { Database } from "../../../../common/database/Database";
import { DatabaseCollection } from "../../../../common/database/DatabaseCollection.enum";


export class GetGenreDao {

    public db: Db;

    constructor() {
        this.db = Database.getInstance();
    }

    async getGenreAnalytics() {         
        const genreQuery: AggregationCursor = this.db.collection(DatabaseCollection.CompletedAnime)
            .aggregate([
                {
                    $match: { animeListScore: { "$gt": 0 } }
                },
                {
                    $unwind: "$genres"
                },
                {
                    $group: {
                        '_id': '$genres.name',
                        count: { '$sum': 1 },
                        totalRating: { '$sum': "$animeListScore" },
                        average: { '$avg': "$animeListScore" }
                    },
                },                
            ]);

        const genreData = await genreQuery.toArray().then(data => {
            data = data.map(genre => {
                genre.average = parseFloat(genre.average.toFixed(2));
                genre.name = genre._id;
                delete genre._id;
                return genre;
            });

            data = data.sort((current, next) => {
                return `${current.name}`.localeCompare(next.name);
            });
            return data;
        });

        return {
            genres: genreData
        };
    }

}