import { Db, AggregationCursor, FindOneOptions } from "mongodb";

import { Database } from "../../../../common/database/Database";
import { DatabaseCollection } from "../../../../common/database/DatabaseCollection.enum";
import { AnimeRatingDto } from "../../anime/dto/anime-rating.dto";
import { RatingEdge } from "../enums/rating-edge.enum";

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

    async getRatedList(edge: RatingEdge, paginationOptions: any = {}) {
        let ratedResponse = {
            count: 0,
            data: []
        };
        
        const edgeRating = await this._getEdgeRating(edge);
        if(!edgeRating) { return ratedResponse; }

        const count = await this.db.collection(DatabaseCollection.CompletedAnime)
            .countDocuments({animeListScore: edgeRating})
            .then(count => {
                return count;
            });
                
        const options: FindOneOptions = this._getRatedListOptions(paginationOptions);        

        const edgeRatedQuery = this.db.collection(DatabaseCollection.CompletedAnime)
            .find({animeListScore: edgeRating}, options).sort({animeListScore:-1, title: 1});

        const edgeRated = await edgeRatedQuery.toArray().then(data => {
            return data;
        });

        return {
            rating: edgeRating,
            count,
            data: edgeRated
        };
    }

    private async _getEdgeRating(edge: RatingEdge) {
        const edgeRatingOptions: FindOneOptions = this._getEdgeRatingOptions();
        const order = edge === RatingEdge.Max ? -1 : 1;
        const query = edge === RatingEdge.Max ? {} : { animeListScore : { $gt: 0}}; 

        const edgeRatingQuery = await this.db
            .collection(DatabaseCollection.CompletedAnime)
            .find(query, edgeRatingOptions)
            .sort({ animeListScore: order });

        return await edgeRatingQuery.toArray().then(ratings => {
            if (!ratings || ratings.length < 1) {
                return null;
            }
            return ratings[0].animeListScore;
        });
    }

    private _getRatedListOptions(paginationOptions: any = {}): FindOneOptions {
        let options: FindOneOptions = {
            projection: {
                title: 1,
                titleEnglish: 1,
                url: 1,
                trailerUrl: 1,
                episodes: 1,
                animeListFinishedDate: 1,
                score: 1
            }
        };

        if(paginationOptions.paginate === "true") {
            const records = parseInt(paginationOptions.records);
            const page = parseInt(paginationOptions.page);
            const offset = (page-1) * records;

            options.limit = records;
            options.skip = offset;
        }

        return options;
    }

    private _getEdgeRatingOptions(): FindOneOptions {
        return {
            limit: 1,
            projection: {
                animeListScore: 1 
            }
        };
    }
}