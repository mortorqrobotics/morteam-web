import { combineReducers } from "redux";
import update from "react/lib/update";

const folders = (state = [], action) => {
    switch (action.type) {
        case "ADD_FOLDER":
            return update(state, {
                $push: [action.folder]
            });
        case "SET_FOLDERS":
            return action.folders
        default:
            return state
    }
}

const files = (state = [], action) => {
    switch (action.type) {
        case "ADD_FILE":
            return update(state, {
                $push: [action.file]
            });
        case "SET_FOLDER":
            return action.files
        default:
            return state
    }
}

const selectedFolder = (state = {}, action) => { // TODO: how to make initalstate first folder?
    switch (action.type) {
        case "SET_FOLDER":
            return action.folder
        default:
            return state
    }
}

export default combineReducers({
    folders,
    files,
    selectedFolder,
})
