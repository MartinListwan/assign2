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
        path: '/post',
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
    
}

export function* postVMStop({ params }) {

}

export function* postVMDelete({ params }) {

}

export function* postVMUpgrade({ params }) {

}

export function* postVMDowngrade({ params }) {

}

export function* getVMUsage({ params }) {

}

export function* getVMCharges({ params }) {

}