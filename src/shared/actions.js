import { fullName } from "~/util";
import { currentUser } from "~/util";

export const setOnlineClients = (userIds) => ({
    type: "SET_ONLINE_CLIENTS",
    userIds,
})

export const joinOnlineClient = (userId) => ({
    type: "JOIN_ONLINE_CLIENT",
    userId,
})

export const leaveOnlineClient = (userId) => ({
    type: "LEAVE_ONLINE_CLIENT",
    userId,
})

export const receiveMessage = ({ chatId, message, type, name }) => (dispatch) => {
    if(currentUser._id !== message.author._id){  
        dispatch({
            type: "NOTHING_HERE",
            meta: {
                sound: "chatMessageNotification",
            },
        });
        new jBox("Notice", {
            attributes: {
                x: "right",
                y: "bottom"
            },
            theme: "NoticeBorder",
            volume: 100,
            animation: {
                open: "slide:bottom",
                close: "slide:right"
            },
            content: message.content,
            maxWidth: 300,
            maxHeight: 105,
            title: type === "group" ? fullName(message.author) + " in " + name
                : fullName(message.author),
            closeOnClick: false,
            onOpen: function() {
                $($(this)[0].content).parent().parent().addClass("messageNotification"); // beauty
            },
        });
        $(document).on("click", ".messageNotification", function() {
            window.location.assign("/chat");
        })
    }
}

export function toggleLeftbar() {
    return {
        type: "TOGGLE_LEFTBAR",
    }
}

export function openLeftbar() {
    return {
        type: "OPEN_LEFTBAR"
    }
}

export function closeLeftbar() {
    return {
        type: "CLOSE_LEFTBAR"
    }
}

