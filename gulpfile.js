"use strict";

let gulp = require("gulp");
let gutil = require("gulp-util");
let source = require("vinyl-source-stream");
let browserify = require("browserify");
let babelify = require("babelify");
let watchify = require("watchify");
let tap = require("gulp-tap");
let eventStream = require("event-stream");
let streamify = require("gulp-streamify");
let uglify = require("gulp-uglify");

let libs = [
    "axios",
    "dompurify",
    "radium",
    "react",
    "react-bootstrap",
    "react-context-menus",
    "react-dom",
    "react-google-maps",
    "react-masonry-component",
    "react-modal",
    "react-redux",
    "redux",
    "redux-sounds",
    "redux-thunk",
    "socket.io-client",
];

let allPages = [
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
    "map",
    "fp",
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

function build(pages) {
    return gulp.src(pages.map(page => (
        "./src/" + page + "/components/" + capitalize(page) + ".js"
    )), { read: false, })
        .pipe(tap(file => {
            let options = {};
            if (process.env.NODE_ENV !== "production") {
                options.debug = true;
            }
            let bundler = browserify(file.path, options);
            file.contents = stuff(bundler).bundle();
        }))
        .pipe(streamify(uglify()))
        .on("error", function(err) {
            console.log(err.toString());
            console.log(err.codeFrame);
        })
        .pipe(gulp.dest("./build/"));
}

gulp.task("build", () => {
    return build(allPages);
});

for (let page of allPages) {
    gulp.task("build-" + page, () => {
        return build([page]);
    });
}

function watchPage(page) {
    let path = "./src/" + page + "/components/" + capitalize(page) + ".js";
    let bundler = watchify(browserify({
        entries: [path],
        debug: true,
        cache: [],
        packageCache: [],
    }));
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
}

gulp.task("watch", () => {
    let streams = allPages.map(watchPage);
    return eventStream.merge(streams);
});

for (let page of allPages) {
    gulp.task("watch-" + page, () => {
        return watchPage(page);
    });
}

gulp.task("vendor", function() {
    let bundler = browserify({
        debug: true,
        cache: {},
        packageCache: {},
    });
    for (let lib of libs) {
        bundler.require(lib);
    }
    let thing = bundler
        .bundle()
        .pipe(source("vendor.js"));
    if (process.env.NODE_ENV === "production") {
        thing = thing.pipe(streamify(uglify()));
    }
    return thing.pipe(gulp.dest("./build/"));
});

function capitalize(str) {
    return str[0].toUpperCase() + str.substring(1);
};
