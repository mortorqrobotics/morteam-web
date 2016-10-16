import { request } from "~/util/ajax";
import { emit } from "~/util/sio";

export const addChat = (chat) => async (dispatch) => {
    const { data } = await request("POST", "/chats", chat);
    dispatch({
        type: "ADD_CHAT_SUCCESS",
        chat: data,
    });
}

export const receiveMessage = ({ chatId, message }) => (dispatch, getState) => {
    const { currentChatId } = getState();
    let meta = {};
    if (currentChatId !== chatId || !window.__isFocused) {
        meta = {
            sound: "chatMessageNotification",
        };
    }
    dispatch({
        type: "RECEIVE_MESSAGE_SUCCESS",
        chatId,
        message,
        meta, // this is part of redux-sounds
    });
}

export const sendMessage = (content) => (dispatch, getState) => {
    const { currentChatId } = getState();
    emit("sendMessage", {
        chatId: currentChatId,
        content,
    });
    dispatch(stopTyping());
    dispatch({
        type: "SEND_MESSAGE_LOADING",
        chatId: currentChatId,
        content,
    });
}

export const messageSent = ({ chatId, content }) => ({
    type: "SEND_MESSAGE_SUCCESS",
    chatId,
    content,
})

export const setChatName = ({ chatId, name }) => async (dispatch) => {
    await request("PUT", `/chats/group/id/${chatId}/name`, {
        newName: name,
    });
    dispatch({
        type: "SET_CHAT_NAME_SUCCESS",
        chatId,
        name,
    });
}

export const setCurrentChatId = (chatId) => ({
    type: "SET_CURRENT_CHAT_ID",
    chatId,
})

export const loadMessages = () => async (dispatch, getState) => {
    const { currentChatId, chats } = getState();
    if (!currentChatId) {
        return;
    }
    const chat = chats.find(chat => chat._id == currentChatId);
    const { data } = await request("GET",
        `/chats/id/${currentChatId}/messages?skip=${chat.messages.length}`
    );
    if (data.length === 0) {
        dispatch({
            type: "ALL_MESSAGES_LOADED",
            chatId: currentChatId,
        });
    } else {
        dispatch({
            type: "LOAD_MESSAGES_SUCCESS",
            messages: data,
            chatId: currentChatId,
        });
    }
}

export const setIsTyping = ({ chatId, isTyping }) => ({
    type: "SET_IS_TYPING",
    chatId,
    isTyping,
})

export const startTyping = () => (dispatch, getState) => {
    const { currentChatId } = getState();
    emit("start typing", {
        chatId: currentChatId,
    });
}

export const stopTyping = () => (dispatch, getState) => {
    const { currentChatId } = getState();
    emit("stop typing", {
        chatId: currentChatId,
    });
}

export const pageClose = () => (dispatch) => {
    dispatch(stopTyping());
}

export async function initialActions(dispatch) {
    const { data } = await request("GET", "/chats");
    dispatch({
        type: "LOAD_CHATS_SUCCESS",
        chats: data,
    });
}
