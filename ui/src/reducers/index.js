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
    received: 'not posting',
}

const actionHandlers = {
    [vmCreate.request]: (state) => R.assoc('received', 'loading', state),
    [vmCreate.success]: (state) => R.assoc('received', 'was received', state),
}

const rootReducer = createReducer(initialState, actionHandlers)

export default rootReducer

