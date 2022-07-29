import axios from "axios"
import { DOMAIN_CYBERBUGS, TOKEN } from '../util/constants/SettingSystem'

export const cyberBugsService = {
    signinCyberBugs: (userLogin) => {
        return axios({
            url: `${DOMAIN_CYBERBUGS}/users/signin`,
            method: 'POST',
            data: userLogin
        })
    },
    getAllProjectCategory: () => {
        return axios({
            url: `${DOMAIN_CYBERBUGS}/ProjectCategory`,
            method: 'GET'
        })
    },

    createProject: (newProject) => {
        return axios({
            url: `${DOMAIN_CYBERBUGS}/Project/createProject`,
            method: 'POST',
            data: newProject
        })
    },

    createProjectAuthorization: (newProject) => {
        return axios({
            url: `${DOMAIN_CYBERBUGS}/Project/createProjectAuthorize`,
            method: 'POST',
            data: newProject,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    },
    getListProject: () => {
        return axios({
            url: `${DOMAIN_CYBERBUGS}/Project/getAllProject`,
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    },

    updateProject: (projectUpdate) => {
        return axios({
            url: `${DOMAIN_CYBERBUGS}/Project/updateProject?projectId=${projectUpdate.id}`,
            method: 'PUT',
            data: projectUpdate,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    }

}