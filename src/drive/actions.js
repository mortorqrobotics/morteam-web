import { request } from "~/util/ajax";
import { filterMultiTeam } from "~/util";

const fetchFolders = () => async (dispatch, getStore, getState) => {
    const store = getStore();
    const currentTab = store.currentTab;
    const { data } = await request("GET", "/folders");
    let sentData = filterMultiTeam(data, currentTab);
    if (currentTab === "intra") {
        const defaultFolders = sentData.filter(folder => folder.defaultFolder);
        sentData = [
            defaultFolders.find(folder => folder.name === "Team Files"),
            defaultFolders.find(folder => folder.name === "Personal Files")
        ].concat(sentData.filter(f => defaultFolders.indexOf(f) === -1));
    }
    dispatch({
        type: "SET_FOLDERS",
        folders: sentData,
    });
}

export const setTab = (tab) => (dispatch, getState) => {
    const { currentTab } = getState();
    if(currentTab !== tab){
        dispatch({
            type: "SET_TAB",
            tab,
        })
        dispatch(fetchFolders());
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
