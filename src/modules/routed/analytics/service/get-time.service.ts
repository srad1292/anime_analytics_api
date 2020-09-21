import { getTimeDao } from "../dao";

export class GetTimeService {
    
    async getFinishedDateAnalytics() {
        return await getTimeDao.getFinishedDateAnalytics();
    }
}