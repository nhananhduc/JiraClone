
import { call, put, takeLatest } from "redux-saga/effects"
import { priorityService } from "../../../services/PriorityService"
import { GET_ALL_PRIORITY, GET_ALL_PRIORITY_SAGA } from "../../constants/CyberBugs/PriorityConstant"

function* getAllPrioritySaga(action) {
    try {
        const { data } = yield call(() => priorityService.getAllPriority());
        yield put({
            type: GET_ALL_PRIORITY,
            arrPriority: data.content
        })
    } catch (err) {
        console.log(err)
    }
}

export function* followGetAllPriority() {
    yield takeLatest(GET_ALL_PRIORITY_SAGA, getAllPrioritySaga)
}

