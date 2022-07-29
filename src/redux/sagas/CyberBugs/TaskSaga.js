
import { useSelector } from "react-redux"
import { call, put, select, takeLatest } from "redux-saga/effects"
import { taskService } from "../../../services/TaskService"
import { STATUS_CODE } from "../../../util/constants/SettingSystem"
import { notifyFunction } from "../../../util/Notification/notificationCyberBugs"
import { GET_PROJECT_DETAIL } from "../../constants/CyberBugs/CyberBugs"
import { CHANGE_ASSIGNESS, CHANGE_TASK_MODAL, CREATE_TASK_SAGA, GET_TASK_DETAIL, GET_TASK_DETAIL_SAGA, HANDLE_CHANGE_POST_API_SAGA, INSERT_COMMENT_SAGA, REMOVE_USER_ASSIGN, UPDATE_STATUS_TASK_SAGA, UPDATE_TASK_SAGA } from "../../constants/CyberBugs/TaskConstant"
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst"

function* createTaskSaga(action) {
    try {
        yield put({
            type: DISPLAY_LOADING
        })
        const { data, status } = yield call(() => taskService.createTask(action.taskObject))
        if (status === STATUS_CODE.SUCCESS) {
            notifyFunction('success', 'New task has been created!')
            yield put({
                type: GET_PROJECT_DETAIL,
                projectId: action.taskObject.projectId
            })
            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskId: action.taskObject.taskId
            })
        }
    } catch (err) {
        console.log(err)
    }
    yield put({
        type: 'CLOSE_DRAWER'
    })
    yield put({
        type: HIDE_LOADING
    })
}

export function* followCreateTaskSaga() {
    yield takeLatest(CREATE_TASK_SAGA, createTaskSaga)
}

function* getTaskDetailSaga(action) {
    try {
        const { data, status } = yield call(() => taskService.getTaskDetail(action.taskId))
        yield put({
            type: GET_TASK_DETAIL,
            taskDetailModal: data.content
        })
    } catch (err) {
        console.log(err)
    }
}

export function* followGetTaskDetailSaga() {
    yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetailSaga)
}

function* updateTaskStatusSaga(action) {
    try {
        const { data, status } = yield call(() => taskService.updateStatusTask(action.taskUpdateStatus));
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_PROJECT_DETAIL,
                projectId: action.taskUpdateStatus.projectId
            })
            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskId: action.taskUpdateStatus.taskId
            })
        }
    } catch (err) {
        console.log(err)
    }
}

export function* followUpdateTaskStatusSaga() {
    yield takeLatest(UPDATE_STATUS_TASK_SAGA, updateTaskStatusSaga)
}


export function* handleChangePostApi(action) {
    switch (action.actionType) {
        case CHANGE_TASK_MODAL: {
            const { value, name } = action;
            yield put({
                type: CHANGE_TASK_MODAL,
                name,
                value
            });
        };
            break;
        case CHANGE_ASSIGNESS: {
            const { userSelected } = action;
            yield put({
                type: CHANGE_ASSIGNESS,
                userSelected
            })
        };
            break;
        case REMOVE_USER_ASSIGN: {
            const { userId } = action;
            yield put({
                type: REMOVE_USER_ASSIGN,
                userId
            });
            break;
        };
        default: break;
    }
    let { taskDetailModal } = yield select(state => state.TaskReducer);
    const listUserAsign = taskDetailModal.assigness.map((user, index) => {
        return user.id
    });
    const taskUpdateApi = { ...taskDetailModal, listUserAsign }
    try {
        const { data, status } = yield call(() => taskService.updateTask(taskUpdateApi))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_PROJECT_DETAIL,
                projectId: taskUpdateApi.projectId
            })
            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskId: taskUpdateApi.taskId
            })
        }
    } catch (err) {
        console.log(err)
        console.log(err.response.data)
    }
}

export function* followHandleChangePostApi() {
    yield takeLatest(HANDLE_CHANGE_POST_API_SAGA, handleChangePostApi)
}

