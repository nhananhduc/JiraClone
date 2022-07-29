
import { call, put, takeLatest, delay } from 'redux-saga/effects'
import { cyberBugsService } from '../../../services/CyberBugsService'
import { STATUS_CODE } from '../../../util/constants/SettingSystem';
import { CREATE_PROJECT_SAGA, DELETE_PROJECT_SAGA, GET_ALL_PROJECT_SAGA, GET_LIST_PROJECT_SAGA, GET_PROJECT_DETAIL, GET_USER_BY_PROJECT_ID_SAGA, UPDATE_PROJECT_SAGA } from '../../constants/CyberBugs/CyberBugs';
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constants/LoadingConst'
import { history } from '../../../util/history'
import { projectService } from '../../../services/ProjectService';
import { notifyFunction } from '../../../util/Notification/notificationCyberBugs';
import { GET_ALL_PROJECT } from '../../constants/CyberBugs/ProjectCyberBugsConstant';

//Create Project
function* createProjectSaga(action) {
    yield put({
        type: DISPLAY_LOADING
    })

    yield delay(500);

    try {

        const { data, status } = yield call(() => cyberBugsService.createProjectAuthorization(action.newProject));
        if (status === STATUS_CODE.SUCCESS) {
            notifyFunction('success', 'Create project successful!')
            history.push('/projectmanagement')
        }
    } catch (err) {
        console.log(err)
    }

    yield put({
        type: HIDE_LOADING
    })

}

export function* followCreateProjectSaga() {
    yield takeLatest(CREATE_PROJECT_SAGA, createProjectSaga)
}

//Get list project
function* getListProjectSaga(action) {
    try {
        const { data, status } = yield call(() => cyberBugsService.getListProject());
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: 'GET_LIST_PROJECT',
                projectList: data.content
            })
        }
    } catch (err) {
        console.log(err)
    }
}

export function* followGetListProjectSaga() {
    yield takeLatest(GET_LIST_PROJECT_SAGA, getListProjectSaga)
}

//Update project

function* updateProjectSaga(action) {
    yield put({
        type: DISPLAY_LOADING
    })

    yield delay(500);

    try {

        const { status } = yield call(() => cyberBugsService.updateProject(action.projectUpdate));
        if (status === STATUS_CODE.SUCCESS) {
            notifyFunction('success', 'Update project succesful!')
        }
    } catch (err) {
        console.log(err)
    }

    yield put({
        type: GET_LIST_PROJECT_SAGA
    })

    yield put({
        type: 'CLOSE_DRAWER'
    })

    yield put({
        type: HIDE_LOADING
    })

}

export function* followUpdateProjectSaga() {
    yield takeLatest(UPDATE_PROJECT_SAGA, updateProjectSaga)
}

//Delete project
function* deleteProjectSaga(action) {
    yield put({
        type: DISPLAY_LOADING
    })

    yield delay(500);

    try {

        const { data, status } = yield call(() => projectService.deleteProject(action.idProject));
        if (status === STATUS_CODE.SUCCESS) {
            notifyFunction('success', 'Delete project successful!')
        } else {
            notifyFunction('error', 'Delete project failed!')
        }
    } catch (err) {
        notifyFunction('error', 'Delete project failed!')
        console.log(err)
    }

    yield put({
        type: GET_LIST_PROJECT_SAGA
    })

    yield put({
        type: HIDE_LOADING
    })

}

export function* followDeleteProjectSaga() {
    yield takeLatest(DELETE_PROJECT_SAGA, deleteProjectSaga)
}

//Project detail
function* getProjectDetailSaga(action) {
    yield put({
        type: DISPLAY_LOADING
    })

    yield delay(500);

    try {
        const { data, status } = yield call(() => projectService.getProjectDetail(action.projectId));
        yield put({
            type: 'PUT_PROJECT_DETAIL',
            projectDetail: data.content
        })
    } catch (err) {
        console.log(err)
        history.push('/projectmanagement')
    }



    yield put({
        type: HIDE_LOADING
    })

}

export function* followGetProjectDetail() {
    yield takeLatest(GET_PROJECT_DETAIL, getProjectDetailSaga)
}

function* getAllProjectSaga(action) {
    yield put({
        type: DISPLAY_LOADING
    })

    yield delay(500);

    try {
        const { data, status } = yield call(() => projectService.getAllProject());
        yield put({
            type: GET_ALL_PROJECT,
            arrProject: data.content
        })

        yield put({
            type: GET_USER_BY_PROJECT_ID_SAGA,
            idProject: data.content[0].id
        })
    } catch (err) {
        console.log(err)
        history.push('/projectmanagement')
    }



    yield put({
        type: HIDE_LOADING
    })

}

export function* followGetAllProjectSaga() {
    yield takeLatest(GET_ALL_PROJECT_SAGA, getAllProjectSaga)
}