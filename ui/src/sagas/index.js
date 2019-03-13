import { call, takeLatest, put } from 'redux-saga/effects'
import { 
    vmCreate,
    vmStart,
    vmStop,
    vmDelete,
    vmUpgrade,
    vmDowngrade,
    vmUsage,
    vmCharges,
} from '../actions'
import * as api from './apiHelper.js'

export default function* watchMainActions() {
    yield takeLatest(vmCreate.request, postVMCreate)
    yield takeLatest(vmStart.request, postVMStart) 
    yield takeLatest(vmStop.request, postVMStop)
    yield takeLatest(vmDelete.request, postVMDelete)
    yield takeLatest(vmUpgrade.request, postVMUpgrade)
    yield takeLatest(vmDowngrade.request, postVMDowngrade)
    yield takeLatest(vmUsage.request, getVMUsage)
    yield takeLatest(vmCharges.request, getVMCharges)
}


export function* postVMCreate({ params }) {
    const args = { 
        path: '/createVM',
        params,
    }
    const { response, error } = yield call(api.postHelper, args)
    if (response) {
        yield put({ type: vmCreate.success, payload: response })
    } else {
        yield put({ type: vmCreate.failure, error: error })
    }
}

export function* postVMStart({ params }) {
    const args = { 
        path: '/startVM',
        params,
    }
    const { response, error } = yield call(api.postHelper, args)
    if (response) {
        yield put({ type: vmStart.success, payload: response })
    } else {
        yield put({ type: vmStart.failure, error: error })
    }
}

export function* postVMStop({ params }) {
    const args = { 
        path: '/stopVM',
        params,
    }
    const { response, error } = yield call(api.postHelper, args)
    if (response) {
        yield put({ type: vmStop.success, payload: response })
    } else {
        yield put({ type: vmStop.failure, error: error })
    }
}

export function* postVMDelete({ params }) {
    const args = { 
        path: '/deleteVM',
        params,
    }
    const { response, error } = yield call(api.postHelper, args)
    if (response) {
        yield put({ type: vmDelete.success, payload: response })
    } else {
        yield put({ type: vmDelete.failure, error: error })
    }
}

export function* postVMUpgrade({ params }) {
    const args = { 
        path: '/upgradeVM',
        params,
    }
    const { response, error } = yield call(api.postHelper, args)
    if (response) {
        yield put({ type: vmUpgrade.success, payload: response })
    } else {
        yield put({ type: vmUpgrade.failure, error: error })
    }
}

export function* postVMDowngrade({ params }) {
    const args = { 
        path: '/downgradeVM',
        params,
    }
    const { response, error } = yield call(api.postHelper, args)
    if (response) {
        yield put({ type: vmDowngrade.success, payload: response })
    } else {
        yield put({ type: vmDowngrade.failure, error: error })
    }
}

export function* getVMUsage({ params }) {
    const args = { 
        path: '/totalUsageVM',
        params,
    }
    const { response, error } = yield call(api.getHelper, args)
    if (response) {
        yield put({ type: vmUsage.success, payload: response })
    } else {
        yield put({ type: vmUsage.failure, error: error })
    }
}

export function* getVMCharges({ params }) {
   const args = { 
        path: '/totalUsageVM',
        params,
    }
    const { response, error } = yield call(api.getHelper, args)
    if (response) {
        yield put({ type: vmCharges.success, payload: response })
    } else {
        yield put({ type: vmCharges.failure, error: error })
    }
}