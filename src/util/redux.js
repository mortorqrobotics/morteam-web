import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import reduxSounds from "redux-sounds";

// https://github.com/zalmoxisus/redux-devtools-extension#12-advanced-store-setup
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export function makeStore(reducers, ...otherMiddleware) {
    return createStore(
        combineReducers(reducers),
        composeEnhancers(applyMiddleware(thunk, ...otherMiddleware))
    );
}

export function soundsMiddleware() {
    return reduxSounds({
        chatMessageNotification: {
            urls: [
                "/audio/bling2.mp3",
                "/audio/bling2.ogg",
                "/audio/bling2.wav",
            ],
            volume: 0.2,
        },
    });
}
