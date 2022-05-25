export default function createStore(initialState, reducer) {
  let state = initialState;
  let listeners = [];
  const getState = () => state;

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((l) => l());
  };

  return {
    getState,
    subscribe,
    dispatch
  };
}
