"use strict";

let gulp = require("gulp");
let source = require("vinyl-source-stream");
let browserify = require("browserify");
let babelify = require("babelify");

gulp.task("build", function() {
	let bundler = browserify({
		entries: ["./src/test.js"],
		debug: true,
		cache: {},
		packageCache: {},
		fullPaths: true
	});
	bundler
		.transform(babelify, { presets: ["es2015", "react"] })
		.bundle()
		.pipe(source("test.js"))
		.pipe(gulp.dest("./build/"));
});
