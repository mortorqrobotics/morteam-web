import { put, call, fork } from "redux-saga/effects";
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
    const { data } = yield call(ajax.request, "GET", "/announcements");
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
        })),
    ]
}
