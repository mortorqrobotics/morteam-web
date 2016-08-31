import ajax from "~/util/ajax";

const setFolders = (folders) => {
    return {
        type: "SET_FOLDERS",
        folders,
    }
}

export const fetchFolders = () => {
    return (dispatch) => {
        return ajax.request("GET", "/folders")
            .then(({ data }) => dispatch(setFolders(data)))
    }
}

const addFolderSync = (folder) => {
    return {
        type: "ADD_FOLDER",
        folder,
    }
}

export const addFolder = (folder) => {
    return (dispatch) => {
        return ajax.request("post", "/folders", folder)
            .then(({ data }) => dispatch(addFolderSync(data)))
    }
}

const setFolderSync = (folder, files) => {
    return {
        type: "SET_FOLDER",
        folder,
        files,
    }
}

export const setFolder = (folder) => {
    return (dispatch) => {
        return ajax.request("get", "/folders/id/"+ folder._id + "/files")
            .then(({ data }) => dispatch(setFolderSync(folder, data)));
    }
}

const addFileSync = (file) => {
    return {
        type: "ADD_FILE",
        file,
    }
}

export const addFile = (file) => {
    return (dispatch) => {
        return ajax.request("post", "/files/upload", file)
            .then(({ data }) => dispatch(addFileSync(data)))
    }
}
