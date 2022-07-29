import { BaseService } from "./BaseService";

export class UserService extends BaseService {
    userSignUp = (userSignup) => {
        return this.post(`Users/signup`, userSignup)
    }
    getUser = (keyword) => {
        return this.get(`Users/getUser?keyword=${keyword}`)
    }

    getAllUser = () => {
        return this.get(`Users/getUser`)
    }
    assignUserProject = (userProject) => {
        return this.post(`Project/assignUserProject`, userProject)
    }

    deleteUserProject = (userProject) => {
        return this.post(`Project/removeUserFromProject`, userProject)
    }

    deleteUser = (userId) => {
        return this.delete(`Users/deleteUser?id=${userId}`)
    }

    editUser = (userEdit) => {
        return this.put(`Users/editUser`, userEdit)
    }

    getuserByProjectId = (idProject) => {
        return this.get(`Users/getUserByProjectId?idProject=${idProject}`)
    }
}
export const userService = new UserService();