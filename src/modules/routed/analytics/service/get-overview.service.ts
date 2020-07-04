import { getOverviewDao } from "../dao";

export class GetOverviewService {
    
    async getOverviewCounts() {
        return await getOverviewDao.getOverviewCounts();
    }
}