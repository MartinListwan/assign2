import * as R from 'ramda'
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
import { createReducer } from '../utils'  

const initialState = {
    createLoading: false,
}

const actionHandlers = {
    [vmCreate.request]: (state) => R.assoc('createLoading', true, state),
    [vmCreate.success]: (state) => R.assoc('createLoading', false, state),
}

const rootReducer = createReducer(initialState, actionHandlers)

export default rootReducer

