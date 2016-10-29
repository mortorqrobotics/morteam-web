import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import reduxSounds from "redux-sounds";

export function makeStore(reducers, ...otherMiddleware) {
    return createStore(
        combineReducers(reducers),
        applyMiddleware(thunk, ...otherMiddleware)
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
