import { getStudioDao } from "../dao";

export class GetStudioService {

    async getStudioAnalytics() {
        return await getStudioDao.getStudioAnalytics();
    }
}