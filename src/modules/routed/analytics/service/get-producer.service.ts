import { getProducerDao } from "../dao";

export class GetProducerService {

    async getProducerAnalytics() {
        return await getProducerDao.getProducerAnalytics();
    }
}