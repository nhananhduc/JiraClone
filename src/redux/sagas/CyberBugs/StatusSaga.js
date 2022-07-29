import { call, put, takeLatest } from "redux-saga/effects";
import { statusService } from "../../../services/StatusService";
import { GET_ALL_STATUS, GET_ALL_STATUS_SAGA } from '../../constants/CyberBugs/StatusConstant'

function* getAllStatusSaga(action) {
    try {
        const { data, status } = yield call(() => statusService.getAllStatus())
        yield put({
            type: GET_ALL_STATUS,
            arrStatus: data.content
        })
    } catch (err) {
        console.log(err)
    }
}

export function* followGetAllStatusSaga() {
    yield takeLatest(GET_ALL_STATUS_SAGA, getAllStatusSaga)
}