"use strict";

let gulp = require("gulp");
let source = require("vinyl-source-stream");
let browserify = require("browserify");
let babelify = require("babelify");
let streamify = require("gulp-streamify");
let uglify = require("gulp-uglify");

gulp.task("build", function() {
    let pages = [
        "signup"
    ];
    for (let page of pages) {
        let bundler = browserify({
            entries: ["./src/components/" + page + "/" + page.capitalize() + ".js"],
            debug: true,
            cache: {},
            packageCache: {},
            fullPaths: true
        });
        bundler.external("react");
        bundler.external("axios");
        bundler
            .transform(babelify, {
                presets: ["es2015", "react"],
                plugins: ["syntax-async-functions", "transform-regenerator"]
            })
            .bundle()
            .pipe(source(page + ".js"))
            .pipe(streamify(uglify()))
            .pipe(gulp.dest("./build/"));
    }
});

String.prototype.capitalize = function() {
    return this[0].toUpperCase() + this.substring(1);
};

