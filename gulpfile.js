"use strict";

let gulp = require("gulp");
let source = require("vinyl-source-stream");
let browserify = require("browserify");
let babelify = require("babelify");
let streamify = require("gulp-streamify");
let uglify = require("gulp-uglify");

gulp.task("build", function() {
    let bundler = browserify({
        entries: ["./src/test.js"],
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true
    });
    bundler
        .transform(babelify, {
            presets: ["es2015", "react"]
        })
        .bundle()
        .pipe(source("test.js"))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest("./build/"));
});
