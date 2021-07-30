export function createStore(reducer, enhancer) {
  // 调用中间件
  if (typeof enhancer === 'function') {
    return enhancer(createStore)(reducer);
  }

  let state;
  const listeners = [];

  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach((listen) => listen());
    return action;
  }

  function subscribe(listen) {
    listeners.push(listen);
  }

  dispatch({ type: '@INIT/REDUX' });

  return {
    getState,
    dispatch,
    subscribe,
  };
}

export function applyMiddleware(...middlewares) {
  return (createStore) => (reducer) => {
    const store = createStore(reducer);
    let dispatch = store.dispatch;

    const middlewareAPI = {
      getState: store.getState,
      dispatch,
    };
    const middlewareChains = middlewares.map((middleware) =>
      middleware(middlewareAPI)
    );
    // 重写dispatch
    dispatch = compose(...middlewareChains)(dispatch);

    return {
      ...store,
      dispatch,
    };
  };
}

function compose(...funcs) {
  if (funcs.length === 0) {
    return () => {};
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}
