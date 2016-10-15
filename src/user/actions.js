import { request } from "~/util/ajax";
import { pageOptions } from "~/util";

const fetchTasks = (userId) => async (dispatch) => {
    const [{ data: pending }, { data: completed }] = await Promise.all([
        request("GET", `/users/id/${userId}/tasks/pending`),
        request("GET", `/users/id/${userId}/tasks/completed`),
    ]);
    dispatch({
        type: "SET_TASKS",
        pending,
        completed,
    });
}

export const addTask = (userId, task) => async (dispatch) => {
    const { data } = await request("POST", `/users/id/${userId}/tasks`, task);
    dispatch({
        type: "ADD_TASK",
        task: data,
    });
}

export const markTaskCompleted = (taskId) => async (dispatch) => {
    await request("POST", `/tasks/id/${taskId}/markCompleted`)
    dispatch({
        type: "MARK_TASK_COMPLETED",
        taskId,
    });
}

export function initialActions(dispatch) {
    dispatch(fetchTasks(pageOptions.userId));
}
