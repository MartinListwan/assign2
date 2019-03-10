import React from 'react';
import { Provider } from 'react-redux'
import saga from './sagas'
import store from './store'
import Main from './views/main'
import { sagaMiddleware } from './middleware'

const App = () =>  (
  <Provider store={store}>
    <Main />
  </Provider>
)

export default App;

sagaMiddleware.run(saga)
