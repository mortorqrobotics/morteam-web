import { fork, take, call, put, select } from "redux-saga/effects";
import { takeEvery } from "redux-saga";
import ajax from "~/util/ajax";
import { makeWatchers } from "~/util/redux";
import { prevAbsMonth, nextAbsMonth, currentAbsMonth } from "~/util/date";

function* addEvent(event) {
    const { data } = yield call(ajax.request, "POST", "/events", event);
    yield put({
        type: "ADD_EVENT_SUCCESS",
        event: data,
    });
}

function* setAbsMonth({ month, year }) {
    const state = yield select(state => state.events);
    const absMonths = [
        prevAbsMonth({ month, year }),
        { month, year },
        nextAbsMonth({ month, year }),
    ].filter(({ month, year }) => (
        !(year in state) || !(month in state[year])
    ));
    let events = [];
    if (absMonths.length > 0) {
        const first = absMonths[0];
        const last = absMonths[absMonths.length - 1];
        const { data } = yield call(ajax.request, "GET", "/events"
            + "/startYear/" + first.year + "/startMonth/" + first.month
            + "/endYear/" + last.year + "/endMonth/" + last.month
        );
        events = data;
    }
    yield put({
        type: "SET_ABS_MONTH_SUCCESS",
        month,
        year,
        events,
    });
}

function* loadPendingTasks() {
    const { data } = yield call(ajax.request, "GET",
        "/users/id/" + window.__userInfo._id + "/tasks/pending"
    );
    yield put({
        type: "LOAD_PENDING_TASKS_SUCCESS",
        tasks: data,
    });
}

function* start() {
    yield fork(setAbsMonth, currentAbsMonth());
    yield* loadPendingTasks();
}

export default function*() {
    yield [
        fork(start),
        fork(makeWatchers({
            "ADD_EVENT": addEvent,
            "SET_ABS_MONTH": setAbsMonth,
        })),
    ]
}
