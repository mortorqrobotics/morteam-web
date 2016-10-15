import { request } from "~/util/ajax";

const fetchFolders = () => async (dispatch, getStore) => {
    const store = getStore();
    const { data } = await request("GET", "/folders");
    dispatch({
        type: "SET_FOLDERS",
        folders: data,
    });
    if (!store.selectedFolder && data.length !== 0) {
        dispatch(setFolder(data[0]))
    }
}

export const addFolder = (folder) => async (dispatch) => {
    const { data } = await request("post", "/folders", folder)
    dispatch({
        type: "ADD_FOLDER",
        folder: data,
    });
}

export const setFolder = (folder) => async (dispatch) => {
    const { data } = await request("get", `/folders/id/${folder._id}/files`);
    dispatch({
        type: "SET_FOLDER",
        folder,
        files: data,
    });
}

export const addFile = (file) => async (dispatch) => {
    const { data } = await request("post", "/files/upload", file);
    dispatch({
        type: "ADD_FILE",
        file: data,
    });
}

const deleteFileSync = (file) => {
    return {
        type: "DELETE_FILE",
        file,
    }
}

export const deleteFile = (file) => async (dispatch) => {
    const { data } = await request("delete", `/files/id/${file._id}`);
    dispatch({
        type: "DELETE_FILE",
        file,
    });
}

export const sortFilesBy = (sortType) => ({
    type: "SORT_FILES",
    sortType,
})

export function initialActions(dispatch) {
    dispatch(fetchFolders());
}
