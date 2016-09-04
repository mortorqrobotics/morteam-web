import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

export function makeStore(reducers) {
    return createStore(reducers, applyMiddleware(thunk));
}

export function makeStoreSaga(reducers, sagas) {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(reducers, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(sagas);
    return store;
}

