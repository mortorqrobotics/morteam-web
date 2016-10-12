import { put, call, fork, select } from "redux-saga/effects";
import { takeEvery } from "redux-saga";
import { makeWatchers } from "~/util/redux";
import ajax from "~/util/ajax";

function* addAnnouncement(announcement) {
    const { data } = yield call(ajax.request, "POST", "/announcements", announcement);
    yield put({
        type: "ADD_ANNOUNCEMENT_SUCCESS",
        announcement: data,
    });
}

function* deleteAnnouncement(announcementId) {
    yield call(ajax.request, "DELETE", "/announcements/id/" + announcementId);
    yield put({
        type: "DELETE_ANNOUNCEMENT_SUCCESS",
        announcementId,
    });
}

function* loadAnnouncements() {
    const skip = yield select(state => state.announcements.length);
    yield put({
        type: "LOAD_ANNOUNCEMENTS_START",
    });
    const { data } = yield call(ajax.request, "GET", "/announcements", { skip });
    yield put({
        type: "LOAD_ANNOUNCEMENTS_SUCCESS",
        announcements: data,
    });
}

function* start() {
    yield* loadAnnouncements();
}

export default function*() {
    yield [
        fork(start),
        fork(makeWatchers({
            "ADD_ANNOUNCEMENT": addAnnouncement,
            "DELETE_ANNOUNCEMENT": deleteAnnouncement,
            "LOAD_ANNOUNCEMENTS": loadAnnouncements,
        })),
    ]
}
