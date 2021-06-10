function logger() {
  return (dispatch) => (action) => {
    console.log(action);
    return dispatch(action);
  };
}

export default logger;
