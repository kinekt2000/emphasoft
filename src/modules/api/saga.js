import api from "@modules/api/api"
import {apiActions, API_ACTIONS} from "@modules/api/actions"
import { all, put, takeEvery } from "@redux-saga/core/effects"

export function* watchApiLoad() {
    yield takeEvery(action => action.type.startsWith(API_ACTIONS.FETCH_START), onApiLoad)
}

export function* onApiLoad({type, payload}) {
    const actionType = type.replace(API_ACTIONS.FETCH_START, "").toLowerCase()

    try {
        const response = yield api.fetch({endpoint: actionType, ...payload})
        yield put(apiActions.fetchSuccess(actionType, response))
    } catch (e) {
        yield put(apiActions.fetchFailure(actionType, e))
    }
}

export default function* apiRootSaga() {
    yield all([
        watchApiLoad()
    ])
}