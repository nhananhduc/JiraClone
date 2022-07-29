import { call, put, takeLatest } from 'redux-saga/effects'
import { cyberBugsService } from '../../../services/CyberBugsService'
import { STATUS_CODE } from '../../../util/constants/SettingSystem';
import { GET_ALL_PROJECT_CATEGORY, GET_ALL_PROJECT_CATEGORY_SAGA } from '../../constants/CyberBugs/CyberBugs';


function* getAllProjectCategorySaga() {
    try {

        const { data, status } = yield call(() => cyberBugsService.getAllProjectCategory());
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_PROJECT_CATEGORY,
                data: data.content
            })
        }
    } catch (err) {
        console.log(err)
    }

}

export function* followGetAllProjectCategory() {
    yield takeLatest(GET_ALL_PROJECT_CATEGORY_SAGA, getAllProjectCategorySaga)
}