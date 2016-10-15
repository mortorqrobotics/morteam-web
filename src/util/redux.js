import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

export function makeStore(reducers) {
    return createStore(combineReducers(reducers), applyMiddleware(thunk));
}

