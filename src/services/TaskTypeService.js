import { BaseService } from "./BaseService";

export class TaskTypeService extends BaseService {
    constructor() {
        super();
    }

    getAllTaskType = () => {
        return this.get(`TaskType/getAll`)
    }
}

export const taskTypeService = new TaskTypeService();