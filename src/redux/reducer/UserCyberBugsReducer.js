import { USER_LOGIN } from "../../util/constants/SettingSystem";
import { EDIT_USER, GET_ALL_USER, GET_USER_BY_PROJECT_ID, GET_USER_SEARCH, USlOGIN } from "../constants/CyberBugs/CyberBugs";

let usLogin = {};
if (localStorage.getItem(USER_LOGIN)) {
    usLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
    userLogin: usLogin,
    userSearch: [],
    arrUser: [],
    listUser: [],
    userEdit: []
}

export const UserCyberBugsReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case USlOGIN: {
            state.userLogin = action.userLogin;
            return { ...state }
        }
        case GET_USER_SEARCH: {
            state.userSearch = action.listUserSearch;
            return { ...state }
        }
        case GET_USER_BY_PROJECT_ID: {
            return { ...state, arrUser: action.arrUser }
        }
        case GET_ALL_USER: {
            return { ...state, listUser: action.listUser }
        }
        case EDIT_USER: {
            return { ...state, userEdit: action.userEdit }
        }
        default: return state

    }
}