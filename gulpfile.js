"use strict";

let gulp = require("gulp");
let gutil = require("gulp-util");
let source = require("vinyl-source-stream");
let browserify = require("browserify");
let babelify = require("babelify");
let watchify = require("watchify");
let tap = require("gulp-tap");
let eventStream = require("event-stream");

let libs = [
    "react",
    "react-dom",
    "axios",
    "radium",
    "axios-cancel",
    "react-modal",
    "react-redux",
    "redux-thunk",
    "socket.io-client",
];

let pages = [
    "signup",
    "login",
    "void",
    "home",
    "user",
    "calendar",
    "chat",
    "team",
    "group",
    "drive",
];

function stuff(bundler) {
    for (let lib of libs) {
        bundler.external(lib);
    }
    return bundler
        .transform(babelify, {
            presets: ["es2015", "react"],
            plugins: [
                "syntax-async-functions",
                "transform-regenerator",
                "transform-decorators-legacy",
                "transform-class-properties",
                "transform-object-rest-spread",
                ["babel-root-import", { rootPathSuffix: "src" }],
                ["transform-runtime", { polyfill: false, regenerator: true }],
            ],
        })
}

gulp.task("build", function() {
    return gulp.src(pages.map(page => (
        "./src/" + page + "/components/" + capitalize(page) + ".js"
    )), { read: false, })
        .pipe(tap(file => {
            let bundler = browserify(file.path, { debug: true, });
            file.contents = stuff(bundler).bundle();
        }))
        .on("error", function(err) {
            console.log(err.toString());
            console.log(err.codeFrame);
        })
        .pipe(gulp.dest("./build/"));
});

gulp.task("watch", () => {
    let streams = pages.map(page => {
        let path = "./src/" + page + "/components/" + capitalize(page) + ".js";
        let bundler = watchify(browserify({
            entries: [path],
            debug: true,
        }))
        bundler = stuff(bundler);
        let watcher = () => {
            return bundler.bundle()
                .on("error", function(err) {
                    console.log(err.toString());
                    console.log(err.codeFrame);
                    this.emit("end");
                })
                .pipe(source(capitalize(page) + ".js"))
                .pipe(gulp.dest("./build/"));
        }
        bundler.on("update", watcher);
        bundler.on("log", gutil.log);
        return watcher();
    });
    return eventStream.merge(streams);
});

gulp.task("vendor", function() {
    let bundler = browserify({
        debug: true,
        cache: {},
        packageCache: {},
    });
    for (let lib of libs) {
        bundler.require(lib);
    }
    bundler
        .bundle()
        .pipe(source("vendor.js"))
        .pipe(gulp.dest("./build/"));
});

function capitalize(str) {
    return str[0].toUpperCase() + str.substring(1);
};
