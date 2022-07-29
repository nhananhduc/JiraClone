import { takeLatest, put, delay, call, select } from "redux-saga/effects";
import { cyberBugsService } from "../../../services/CyberBugsService";
import { userService } from "../../../services/UserService";
import { STATUS_CODE, TOKEN, USER_LOGIN } from "../../../util/constants/SettingSystem";
import { notifyFunction } from "../../../util/Notification/notificationCyberBugs";
import { ASSIGN_USER_API, DELETE_USER_API, DELETE_USER_SAGA, EDIT_USER_SAGA, GET_ALL_USER, GET_ALL_USER_SAGA, GET_LIST_PROJECT_SAGA, GET_USER_API, GET_USER_BY_PROJECT_ID, GET_USER_BY_PROJECT_ID_SAGA, GET_USER_SEARCH, USER_SIGNIN_API, USER_SIGNUP_API, USlOGIN } from "../../constants/CyberBugs/CyberBugs";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst"
import { history } from "../../../util/history";


function* signinSaga(action) {
    yield put({
        type: DISPLAY_LOADING
    })

    try {
        const { data } = yield call(() => cyberBugsService.signinCyberBugs(action.userLogin))
        localStorage.setItem(TOKEN, data.content.accessToken);
        localStorage.setItem(USER_LOGIN, JSON.stringify(data.content))

        yield put({
            type: USlOGIN,
            userLogin: data.content
        })

        let history = yield select(state => state.HistoryReducer.history)
        history.push('/home')

    } catch (err) {
        console.log(err.response.data)
    }
    yield put({
        type: HIDE_LOADING
    })
}


export function* followSignin() {
    yield takeLatest(USER_SIGNIN_API, signinSaga)
}

function* signupSaga(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    try {
        const { status } = yield call(() => userService.userSignUp(action.userSignup))
        if (status === STATUS_CODE.SUCCESS) {
            notifyFunction('success', 'User register successful!')
            history.push('/login')
        }
    } catch (err) {
        console.log(err)
    }
    yield put({
        type: HIDE_LOADING
    })
}

export function* followSignup() {
    yield takeLatest(USER_SIGNUP_API, signupSaga)
}

function* getUserSaga(action) {
    try {
        const { data } = yield call(() => userService.getUser(action.keyword))
        yield put({
            type: GET_USER_SEARCH,
            listUserSearch: data.content
        })

    } catch (err) {
        console.log(err.response.data)
    }

}

export function* followGetUser() {
    yield takeLatest(GET_USER_API, getUserSaga)
}

function* getAllUser() {
    try {
        const { data } = yield call(() => userService.getAllUser())
        yield put({
            type: GET_ALL_USER,
            listUser: data.content
        })
    }
    catch (err) {
        console.log(err)
    }
}

export function* followGetAllUserSaga() {
    yield takeLatest(GET_ALL_USER_SAGA, getAllUser)
}

function* assignUserSaga(action) {
    try {
        yield call(() => userService.assignUserProject(action.userProject))
        yield put({
            type: GET_LIST_PROJECT_SAGA
        })

    } catch (err) {
        console.log(err.response.data)
    }

}

export function* followAssignUser() {
    yield takeLatest(ASSIGN_USER_API, assignUserSaga)
}

function* deleteUserProject(action) {
    try {
        const { status } = yield call(() => userService.deleteUserProject(action.userProject))
        yield put({
            type: GET_LIST_PROJECT_SAGA
        })
        if (status === STATUS_CODE.SUCCESS) {
            notifyFunction('success', 'User has been removed!')
        }

    } catch (err) {
        console.log(err.response.data)
    }

}



export function* followDeleteUserProject() {
    yield takeLatest(DELETE_USER_API, deleteUserProject)
}

function* deleteUserSaga(action) {
    try {
        const { status } = yield call(() => userService.deleteUser(action.userId))
        yield put({
            type: GET_USER_API,
            keyword: ''
        })
        if (status === STATUS_CODE.SUCCESS) {
            notifyFunction('success', 'User has been deleted!')
        }

    } catch (err) {
        console.log(err.response.data)
    }
}

export function* followDeleteUserSaga() {
    yield takeLatest(DELETE_USER_SAGA, deleteUserSaga)
}

function* editUserSaga(action) {
    try {
        const { status } = yield call(() => userService.editUser(action.userEdit))
        yield put({
            type: GET_USER_API,
            keyword: ''
        })
        if (status === STATUS_CODE.SUCCESS) {
            notifyFunction('success', 'User has been updated!')
        }

    } catch (err) {
        console.log(err.response.data)
    }
    yield put({
        type: 'CLOSE_DRAWER'
    })
}

export function* followEditUserSaga() {
    yield takeLatest(EDIT_USER_SAGA, editUserSaga)
}



function* getUserByProjectIdSaga(action) {
    const { idProject } = action;
    try {
        const { data, status } = yield call(() => userService.getuserByProjectId(idProject))
        yield put({
            type: GET_USER_BY_PROJECT_ID,
            arrUser: data.content
        })

    } catch (err) {
        console.log(err);
        console.log(err.response.data);
        if (err.response.data.statusCode === STATUS_CODE.NOT_FOUND) {
            yield put({
                type: GET_USER_BY_PROJECT_ID,
                arrUser: []
            })
        }
    }
}

export function* followGetUserByProjectId() {
    yield takeLatest(GET_USER_BY_PROJECT_ID_SAGA, getUserByProjectIdSaga)
}
