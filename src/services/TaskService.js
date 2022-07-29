import { BaseService } from "./BaseService";

export class TaskService extends BaseService {

    createTask = (taskObject) => {
        return this.post(`Project/createTask`, taskObject)
    }

    getTaskDetail = (taskId) => {
        return this.get(`Project/getTaskDetail?taskId=${taskId}`)
    }

    updateStatusTask = (taskStatusUpdate) => {
        return this.put(`Project/updateStatus`, taskStatusUpdate)
    }

    updateTask = (taskUpdate) => {
        return this.post(`Project/updateTask`, taskUpdate)
    }

    insertComment = (taskId, contentComment) =>  {
        return this.post(`Comment/insertComment`, taskId, contentComment)
    }
}

export const taskService = new TaskService();