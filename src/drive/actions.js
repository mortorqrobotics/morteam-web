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
            .then(() => dispatch(addFolderSync(folder)))
    }
}
