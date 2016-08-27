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

export default combineReducers({
    folders,
})
