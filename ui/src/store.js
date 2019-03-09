import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import middleware from './middleware'
import reducers from './reducers'

export default createStore(
    combineReducers({
        ...reducers,
    }),
    composeWithDevTools(applyMiddleware(...middleware))
)