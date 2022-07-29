import { BaseService } from "./BaseService";

export class PriorityService extends BaseService {
    constructor() {
        super();
    }

    getAllPriority = () => {
        return this.get(`Priority/getAll`)
    }
}

export const priorityService = new PriorityService();