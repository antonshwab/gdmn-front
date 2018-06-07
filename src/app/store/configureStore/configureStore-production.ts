import { applyMiddleware, compose, createStore } from 'redux';
import { IRootState, TRootReducer } from '@src/app/store/rootReducer';

// import thunkMiddleware from 'store-thunk';

function configureStore(rootReducer: TRootReducer, middlewares?: any, initialState?: IRootState) {
  return createStore(
    rootReducer,
    initialState!,
    compose(
      applyMiddleware(
        // thunkMiddleware,
        ...middlewares
      )
    )
  );
}

export { configureStore };