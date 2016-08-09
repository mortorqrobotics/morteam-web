import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

export const makeStore = (reducers) => {
    return createStore(reducers, applyMiddleware(thunk));
}
