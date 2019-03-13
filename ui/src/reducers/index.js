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
    vmList: [],
    cost: undefined,
}

const actionHandlers = {
    [vmCreate.request]: (state) => R.assoc('createLoading', true, state),
    [vmCreate.success]: (state) => R.assoc('createLoading', false, state),
    [vmCharges.success]: (state, { payload }) => R.assoc('cost', payload, state),
}

const rootReducer = createReducer(initialState, actionHandlers)

export default rootReducer

