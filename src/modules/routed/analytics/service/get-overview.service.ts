import { getOverviewDao } from "../dao";
import { RatingEdge } from "../enums/rating-edge.enum";

export class GetOverviewService {
    
    async getOverviewCounts() {
        return await getOverviewDao.getOverviewCounts();
    }

    async getHighestRated(paginationOptions: any) {
        return await getOverviewDao.getRatedList(RatingEdge.Max, paginationOptions);
    }

    async getLowestRated(paginationOptions: any) {
        return await getOverviewDao.getRatedList(RatingEdge.Min, paginationOptions);
    }
}