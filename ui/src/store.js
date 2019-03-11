import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import middleware from './middleware'
import rootReducer from './reducers'

export default createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
)