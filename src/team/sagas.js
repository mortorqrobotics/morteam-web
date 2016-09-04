import { put, call, fork, take } from "redux-saga/effects";
import { takeEvery } from "redux-saga";
import ajax from "~/util/ajax";

function* loadUsers() {
    const { data } = yield call(ajax.request, "GET", "/teams/current/users");
    yield put({
        type: "LOAD_USERS_SUCCESS",
        users: data,
    });
}

function* deleteUser({ userId }) {
    yield call(ajax.request, "DELETE", "/teams/current/users/id/" + userId);
    yield put({
        type: "DELETE_USER_SUCCESS",
        userId,
    });
}

function* watchDeleteUser() {
    yield takeEvery("DELETE_USER", deleteUser);
}

function* start() {
    yield* loadUsers();
}

export default function*() {
    yield [
        fork(start),
        fork(watchDeleteUser),
    ]
}
