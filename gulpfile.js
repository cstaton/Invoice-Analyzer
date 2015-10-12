var gulp = require("gulp");
var jshint = require("gulp-jshint");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var sass = require("gulp-sass");
var ngAnnotate = require("gulp-ng-annotate");
var templateCache = require("gulp-angular-templatecache");
var rename = require("gulp-rename");
var sass = require("gulp-sass");

var paths = {
	angular: "./client/lib/angular/angular.js",
	uiRouter: "./client/lib/angular-ui-router/release/angular-ui-router.js",
	app: "./client/app/app.js",
	modules: "./client/app/**/*.module.js",
	html: "./client/**/**/*.html",
	templateCache: "./dist/templates.js",
	css: "./client/styles/**/*.scss",
};	


gulp.task("cache", function() {
	return gulp.src(paths.html)
		.pipe(templateCache("templates.js", {
			module: "plastiq.templates",
			standalone: true,
		}))
		.pipe(gulp.dest("dist"));
});

gulp.task("lint", function() {
	return gulp.src([paths.app, paths.modules])
		.pipe(jshint())
		.pipe(jshint.reporter("default"));
});

gulp.task("scripts", function() {
	return gulp.src([paths.angular, paths.uiRouter, paths.templateCache, paths.modules, paths.app])
		.pipe(concat("all.js"))
		.pipe(gulp.dest("dist"));
});

gulp.task("annotate", function() {
	return gulp.src("dist/all.js")
		.pipe(ngAnnotate())
		.pipe(gulp.dest("dist"));
});

gulp.task("minify", function() {
	return gulp.src("dist/all.js")
		.pipe(rename("all.min.js"))
		.pipe(uglify())
		.pipe(gulp.dest("dist"));
});

gulp.task("sass", function() {
	return gulp.src("client/styles/main.scss")
		.pipe(sass())
		.pipe(gulp.dest("client/styles"));
});

gulp.task("watch", function() {
	gulp.watch(paths.css, ['sass']);
});

gulp.task("build", ["lint", "cache", "scripts", "annotate", "minify"]);

