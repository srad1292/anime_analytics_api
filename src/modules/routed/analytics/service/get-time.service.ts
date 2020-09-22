import { getTimeDao } from "../dao";

export class GetTimeService {
    
    async getFinishedDateAnalytics() {
        return await getTimeDao.getFinishedDateAnalytics();
    }

    async getStartedAiringDateAnalytics() {
        return await getTimeDao.getStartedAiringDateAnalytics();
    }
}