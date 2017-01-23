import { request } from "~/util/ajax";
import { emit } from "~/util/sio";
import { receiveMessage as receiveMessageShared } from "~/shared/actions";
import { currentUser, getRandomString } from "~/util";

export const addChat = (chat) => async (dispatch) => {
    const { data } = await request("POST", "/chats", chat);
    dispatch({
        type: "ADD_CHAT_SUCCESS",
        chat: data,
    });
}

export const deleteChat = (chatId) => async (dispatch, getState)=> {
    const {chats} = getState();
    let newCurrentChatId;
    if(chats.length === 1) {
        newCurrentChatId = null;
    } else if(chats[0]._id === chatId) {
        newCurrentChatId = chats[1]._id;
    } else {
        newCurrentChatId = chats[0]._id;
    }
    await request("DELETE", "/chats/id/" + chatId);
    dispatch({
       type: "DELETE_CHAT_SUCCESS",
       chatId,
       newChatId: newCurrentChatId,
    });
}

export const receiveMessage = ({ chatId, message, type, name }) => (dispatch, getState) => {
    const { currentChatId } = getState();
    let meta = {};
    if (!window.__isFocused && (currentUser._id !== message.author._id)) {
        meta = {
            sound: "chatMessageNotification",
        };
    }
    if (window.__isFocused && currentChatId !== chatId) {
        dispatch(receiveMessageShared({ chatId, message, type, name }));
    }
    dispatch({
        type: "RECEIVE_MESSAGE_SUCCESS",
        chatId,
        message: {
            ...message,
            // giving each message a unique id lets the view know which
            // messages are new
            _id: getRandomString(),
        },
        meta, // this is part of redux-sounds
        timestamp: new Date(),
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

export const messageSent = ({ chatId, content }) => (dispatch) => {
    dispatch({
        type: "SEND_MESSAGE_SUCCESS",
        chatId,
        content,
        messageId: getRandomString(),
        timestamp: new Date(),
    });
}

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

export const setCurrentChatId = (chatId) => (dispatch) => {
    localStorage.selectedChatId = chatId;
    dispatch({
        type: "SET_CURRENT_CHAT_ID",
        chatId,
    })
}

export const loadMessages = () => async (dispatch, getState) => {
    const { currentChatId, chats } = getState();
    const chat = chats.find(chat => chat._id == currentChatId);
    if (!chat) {
        return;
    }
    const { data } = await request("GET",
        `/chats/id/${currentChatId}/messages?skip=${chat.messages.length}`
        + "&" + Date.now()
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

export const setInputSize = (heightDiff) => ({
    type: "SET_INPUT_SIZE",
    heightDiff,
})


export const loadChats = (query) => async (dispatch, getState) => {
    const { currentTab } = getState();
    const { data } = await request("GET", "/chats?" + Date.now);
    let sentData;
    if (currentTab === "inter") {
        sentData = data.filter(obj => obj.audience.isMultiTeam);
    } else {
        sentData = data.filter(obj => !obj.audience.isMultiTeam);
    }
    const chatId = query
        || (sentData.length > 0 ? sentData[0]._id : null);
    dispatch({
        type: "LOAD_CHATS_SUCCESS",
        chats: sentData,
        chatId: chatId,
    });
}

export const setTab = (tab, query) => (dispatch) => {
    dispatch({
        type: "SET_TAB",
        tab,
    })
    dispatch(loadChats(query));
}

export async function initialActions(dispatch) {
    const { data } = await request("GET", "/chats?" + Date.now);
    if(window.location.search.match(/[\?&]id=([^&]+)/)) {
        const query = window.location.search.match(/[\?&]id=([^&]+)/)[1];
        if (data.map(obj => obj._id).indexOf(query) === -1) {
            dispatch(loadChats(localStorage.selectedChatId));
        }
        else if (data.filter(obj => !obj.audience.isMultiTeam).map(obj => obj._id).indexOf(query) === -1
        ) {
            dispatch(setTab("inter", query));
        }
    } else {
        dispatch(loadChats(localStorage.selectedChatId));
    }
}
