import { call, takeLatest, put } from "redux-saga/effects";
import { commentService } from '../../../services/CommentService'
import { DELETE_COMMENT_SAGA, EDIT_COMMENT, EDIT_COMMENT_SAGA, GET_ALL_COMMENT, GET_ALL_COMMENT_SAGA, INSERT_COMMENT_SAGA } from '../../constants/CyberBugs/CommentConstant'

function* getAllCommentSaga(action) {
    try {
        const { data } = yield call(() => commentService.getAllComment(action.taskId));
        yield put({
            type: GET_ALL_COMMENT,
            arrComment: data.content
        })
    }
    catch (err) {
        console.log(err)
    }
}

export function* followGetAllCommentSaga() {
    yield takeLatest(GET_ALL_COMMENT_SAGA, getAllCommentSaga)
}

function* insertCommentSaga(action) {
    try {
        yield call(() => commentService.insertComment(action.newComment));
        yield put({
            type: GET_ALL_COMMENT_SAGA,
            taskId: action.newComment.taskId
        })
    } catch (err) {
        console.log(err)
    }
}

export function* followInsertCommentSaga() {
    yield takeLatest(INSERT_COMMENT_SAGA, insertCommentSaga)
}

function* editCommentSaga(action) {
    const { id, contentComment } = action
    try {
        yield call(() => commentService.editComment(id, contentComment))
        yield put({
            type: GET_ALL_COMMENT_SAGA,
            taskId: action.taskId
        })
    } catch (err) {
        console.log(err)
    }
}

export function* followEditCommentSaga() {
    yield takeLatest(EDIT_COMMENT_SAGA, editCommentSaga)
}

function* deleteCommentSaga(action) {
    try {
        yield call(() => commentService.deleteComment(action.idComment));
        yield put({
            type: GET_ALL_COMMENT_SAGA,
            taskId: action.taskId
        })
    } catch (err) {
        console.log(err)
    }
}

export function* followDeleteCommentSaga() {
    yield takeLatest(DELETE_COMMENT_SAGA, deleteCommentSaga)
}