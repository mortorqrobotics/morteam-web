import { fullName } from "~/util";
import { currentUser } from "~/util";
import { setCurrentChatId } from "~/chat/actions";
import { navbarHeight, dropdownTop } from "~/shared/styles/navbar";

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
            if (window.location.pathname !== "/chat") {
                window.location.assign("/chat");
            }
            dispatch(setCurrentChatId(chatId));
        })
    }
}

export const toggleLeftbar = () => (dispatch, getState) => {
    const { isLeftbarOpen } = getState();
    if (isLeftbarOpen) {
        dispatch(closeLeftbar());
    } else {
        dispatch(openLeftbar());
    }
}

export function openLeftbar() {
    $(".leftbar").velocity({ left: "0px" }, { duration: 300, queue: false });
    $(".hidebutton").velocity({ left: "270px" }, { duration: 300, queue: false });
    return {
        type: "OPEN_LEFTBAR"
    }
}

export function closeLeftbar() {
    $(".leftbar").velocity({ left: "-260px" }, { duration: 300, queue: false }) ;
    $(".hidebutton").velocity({ left: "10px" }, { duration: 300, queue: false });
    return {
        type: "CLOSE_LEFTBAR"
    }
}

export const toggleDropdown = () => (dispatch, getState) => {
    const { isDropdownOpen } = getState();
    if (isDropdownOpen) {
        $(".dropdown").velocity({
            top: dropdownTop,
        }, 200);
    }
    else {
        $(".dropdown").velocity({
            top: navbarHeight,
        }, 200);
    }
    dispatch({ type: "TOGGLE_DROPDOWN" });
}
