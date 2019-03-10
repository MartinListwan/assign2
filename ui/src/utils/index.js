export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}

export const createRequestActionType = (base) => ({
        'request':`${base}_REQUEST`,
        'success':`${base}_SUCCESS`,
        'failure':`${base}_FAILURE`,
});