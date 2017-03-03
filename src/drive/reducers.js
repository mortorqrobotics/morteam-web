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
        case "DELETE_FILE":
            return update(state, {
                $splice: [
                    [state.findIndex(file => (
                        file == action.file
                    )), 1]
                ]
            });
        case "SET_FOLDER":
            return action.files
        case "SORT_FILES":
            // TODO: correctly sort files that are newly added
            let func;
            if (action.sortType === "Date") {
                func = (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
            } else if (action.sortType === "Name") {
                func = (a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase());
            } else if (action.sortType === "Size") {
                func = (a, b) => a.size - b.size;
            } else if (action.sortType === "Type") {
                func = (a, b) => a.mimetype.localeCompare(b.mimetype);
            } else {
                throw new Error("Invalid sort type: " + action.sortType);
            }
            return state.slice().sort(func);
        default:
            return state
    }
}

const selectedFolder = (state = null, action) => {
    switch (action.type) {
        case "SET_FOLDER":
            return action.folder
        case "ADD_FOLDER":
            if (!state) {
                return action.folder
            }
        default:
            return state
    }
}

export default {
    folders,
    files,
    selectedFolder,
}
