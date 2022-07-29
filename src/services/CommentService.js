import { BaseService } from "./BaseService";

export class CommentService extends BaseService {
    constructor() {
        super();
    }

    getAllComment = (taskId) => {
        return this.get(`Comment/getAll?taskId=${taskId}`)
    }

    insertComment = (newComment) => {
        return this.post(`Comment/insertComment`, newComment)
    }

    editComment = (id, contentComment) => {
        return this.put(`Comment/updateComment?id=${id}&contentComment=${contentComment}`)
    }

    deleteComment = (idComment) => {
        return this.delete(`Comment/deleteComment?idComment=${idComment}`)
    }
}

export const commentService = new CommentService();