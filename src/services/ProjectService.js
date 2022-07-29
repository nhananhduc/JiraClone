import { BaseService } from "./BaseService";

export class ProjectService extends BaseService {
    constructor() {
        super();
    }

    getAllProject = () => {
        return this.get(`Project/getAllProject`)
    }

    deleteProject = (id) => {
        return this.delete(`/Project/deleteProject?projectId=${id}`)
    }

    getProjectDetail = (projectId) => {
        return this.get(`/Project/getProjectDetail?id=${projectId}`)
    }
}

export const projectService = new ProjectService();