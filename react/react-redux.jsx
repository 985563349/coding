import { Component, createContext } from 'react';

const StoreContext = createContext();

export class Provider extends Component {
  render() {
    return (
      <StoreContext.Provider value={this.props.store}>
        {this.props.children}
      </StoreContext.Provider>
    );
  }
}

export function connect(mapStateToProps, mapDispatchToProps) {
  return (WrapComponent) =>
    class extends Component {
      state = { ...this.props };

      static contextType = StoreContext;

      componentDidMount() {
        const { subscribe } = this.context;
        this.update();

        subscribe(() => {
          this.update();
        });
      }

      update() {
        const { dispatch, getState } = this.context;
        const stateProps = mapStateToProps?.(getState());
        let dispatchProps;

        if (typeof mapDispatchToProps === 'object') {
          dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
        } else if (typeof mapDispatchToProps === 'function') {
          dispatchProps = mapDispatchToProps(dispatch);
        } else {
          dispatchProps = { dispatch };
        }

        this.setState({ ...stateProps, ...dispatchProps });
      }

      render() {
        return <WrapComponent {...this.state} />;
      }
    };
}

function actionCreator(creator, dispatch) {
  return (...args) => dispatch(creator(...args));
}

function bindActionCreators(creators, dispatch) {
  const res = {};
  for (let key in creators) {
    res[key] = actionCreator(creators[key], dispatch);
  }
  return res;
}
