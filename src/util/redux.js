import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

export function makeStore(reducers, ...otherMiddleware) {
    return createStore(
        combineReducers(reducers),
        applyMiddleware(thunk, ...otherMiddleware)
    );
}

