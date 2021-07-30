import React, { createContext, useContext } from 'react';
import type { FC } from 'react';

export interface Store<T> {
  Provider: FC;
  useStore: () => T;
}

export type Hook<T, P> = (params?: P) => T;

function createStore<ObservableState, P = void>(
  useHook: Hook<ObservableState, P>,
  params?: P
): Store<ObservableState> {
  const Context = createContext<ObservableState | null>(null);
  Context.displayName = 'Store';

  const Provider: FC = ({ children }) => (
    <Context.Provider value={useHook(params)}>{children}</Context.Provider>
  );

  const useStore = (): ObservableState => {
    const state = useContext(Context);
    if (state === null) {
      throw new Error('state cannot be null!');
    }
    return state;
  };

  return { Provider, useStore };
}

export default createStore;
