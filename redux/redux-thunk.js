function thunk({ getState }) {
  return (dispatch) => (action) => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    } else {
      return dispatch(action);
    }
  };
}

export default thunk;
