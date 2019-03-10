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


export function* postVMCreate() {
    const args = { 
        path: '/post', 
        params: {
            'param1': 'param1'
        },
    }
    const { response, error } = yield call(api.postHelper, args)
    if (response) {
        yield put({ type: vmCreate.success, payload: response })
    } else {
        yield put({ type: vmCreate.failure, error: error })
    }
}

export function* postVMStart() {
    
}

export function* postVMStop() {

}

export function* postVMDelete() {

}

export function* postVMUpgrade() {

}

export function* postVMDowngrade() {

}

export function* getVMUsage() {

}

export function* getVMCharges() {

}