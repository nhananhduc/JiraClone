import { BaseService } from "./BaseService";

export class StatusService extends BaseService {
    constructor() {
        super();
    }

    getAllStatus = () => {
        return this.get(`Status/getAll`)
    }
}

export const statusService = new StatusService();