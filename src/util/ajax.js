import axios from "axios";
import cancelAdapter from "axios-cancel";
import { Cancellation } from "axios-cancel/cancel";

let ajax = {};
export default ajax;

export function request(method, path, data, cancellable) {
    if (!cancellable) {
        return axios({
            method: method,
            url: path,
            data: data,
        });
    } else {
        let cancellation = new Cancellation();
        return {
            cancel: () => cancellation.cancel(),
            req: axios({
                method: method,
                url: path,
                data: data,
                adapter: cancelAdapter,
                cancellation: cancellation,
            }),
        };
        /* usage

           let { cancel, req } = ajax.request(stuff, stuff, stuff, true);
           this.cancelRequest = cancel;
           try {
               let result = await req;
           } catch (err) {
               handle(err); 
           }

           this.cancelRequest();

       */
    }
}
ajax.request = request;

export function getRoute(name) { // also takes more arguments
    let path = routes[name];
    let args = Array.prototype.slice.call(arguments, 1);
    return path.split("/").map(part => {
        if (part[0] != ":") {
            return part;
        }
        if (typeof args[0] == "object") {
            return args[0][part.substring(1)];
        } else {
            return args.splice(0, 1)[0]
        }
    }).join("/");
    //while (path != (path = path.replace(/:([^\/]+)/, value("$1"))));
}
ajax.getRoute = getRoute;

let routes = {
    "login": "/login",
    "logout": "/logout",
    "users": "/users",
    "user": "/users/id/:userId",
    "user-position": "/users/id/:userId/position/:newPosition",
    "users-search": "/users/search",
    "own-password": "/password",
    "own-profile": "/profile",
    "own-user": "/users/self",
    "forgot-password": "/forgotPassword",
    "announcements": "/announcements",
    "announcement": "/announcements/id/:announcementId",
    "chats": "/chats",
    "chat-messages": "/chats/id/:chatId/messages",
    "chat-users": "/chats/id/:chatId/messages",
    "chat-all-members": "/chats/id/:chatId/allMembers",
    "chat-name": "/chats/group/id/:chatId/name",
    "chat": "/chats/id/:chatId",
    "file": "/files/id/:fileId",
    "folders": "/folders",
    "folder-subfolders": "/folders/id/:folderId/subfolders",
    "folder-files": "/folders/id/:folderId/files",
    "files-upload": "/files/upload",
    "events-year-month": "/events/year/:year/month/:month",
    "events-upcoming": "/events/upcoming",
    "events": "/events",
    "event": "/events/id/:eventId",
    "event-attendance": "/events/id/:eventId/attendance",
    "excuse-absence": "/events/id/:eventId/users/:userId/excuseAbsence",
    "user-absences": "/users/id/:userId/absences",
    "groups": "/groups",
    "group": "/groups/id/:groupId",
    "user-tasks": "/users/id/:userId/tasks",
    "user-tasks-completed": "/users/id/:userId/tasks/completed",
    "user-tasks-pending": "/users/id/:userId//tasks/pending",
    "task-mark-completed": "/tasks/id/:taskId/markCompleted",
    "current-team-users": "/teams/current/users",
    "teams": "/teams",
    "team-code-join": "/teams/code/:teamCode/join",
    "current-team-number": "/teams/current/number",
    "team-number-exists": "/teams/number/:teamNumber/exists",
    "current-team-user": "/teams/current/users/id/:userId",
    "user-team-info": "/users/id/:userId/teamInfo",
}
