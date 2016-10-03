import { fork, take, call, put, select } from "redux-saga/effects";
import { takeEvery } from "redux-saga";
import ajax from "~/util/ajax";
import { makeWatchers } from "~/util/redux";
import { emit } from "~/shared/sio";

function* loadChats() {
    const { data } = yield call(ajax.request, "GET", "/chats");
    yield put({
        type: "LOAD_CHATS_SUCCESS",
        chats: data,
    });
}

function* addChat(chat) {
    const { data } = yield call(ajax.request, "POST", "/chats", chat);
    yield put({
        type: "ADD_CHAT_SUCCESS",
        chat: data,
    });
}

function* sendMessage(content) {
    const currentChatId = yield select(state => state.currentChatId);
    yield call(emit, "sendMessage", {
        chatId: currentChatId,
        content,
    });
    yield put({
        type: "SEND_MESSAGE_LOADING",
        chatId: currentChatId,
        content,
    });
}

function* setChatName({ chatId, name }) {
    yield call(ajax.request, "PUT", "/chats/group/id/" + chatId + "/name", {
        newName: name,
    });
    yield put({
        type: "SET_CHAT_NAME_SUCCESS",
        chatId,
        name,
    });
}

function* loadMessages() {
    const currentChatId = yield select(state => state.currentChatId);
    if (!currentChatId) {
        return;
    }
    const chats = yield select(state => state.chats);
    const chat = chats.find(chat => chat._id == currentChatId);
    const { data } = yield call(ajax.request, "GET", 
        "/chats/id/" + currentChatId + "/messages?skip=" + chat.messages.length
    );
    if (data.length === 0) {
        yield put({
            type: "ALL_MESSAGES_LOADED",
            chatId: currentChatId,
        });
    } else {
        yield put({
            type: "LOAD_MESSAGES_SUCCESS",
            messages: data,
            chatId: currentChatId,
        });
    }
}

function* start() {
    yield* loadChats();
}

export default function*() {
    yield [
        fork(start),
        fork(makeWatchers({
            "ADD_CHAT": addChat,
            "SEND_MESSAGE": sendMessage,
            "SET_CHAT_NAME": setChatName,
            "LOAD_MESSAGES": loadMessages,
        })),
    ]
}

