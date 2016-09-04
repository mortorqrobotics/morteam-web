import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { take, fork } from "redux-saga/effects";

export function makeStore(reducers) {
    return createStore(reducers, applyMiddleware(thunk));
}

export function makeStoreSaga(reducers, sagas) {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(reducers, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(sagas);
    return store;
}

export function makeWatchers(obj) {
    const arr = Object.keys(obj).map(actionName => (
        function*() {
            while (true) {
                const action = yield take(actionName);
                yield fork(obj[actionName], action.payload);
            }
        }
    ));
    return function*() {
        yield arr.map(fork);
    }
}

