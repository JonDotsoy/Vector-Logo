import gulp from "gulp";
import watch from "gulp-watch";
import gutil from "gulp-util";
import browserify from "browserify";
import babelify from "babelify";
import source from "vinyl-source-stream";
import uglify from "gulp-uglify";


let files = {
	"app": {
		"src": "app.jsx",
		"out": "app.js",
	},
}


gulp.task("build", function () {
	return browserify({
		entries: [
			files.app.src,
		],
		extensions: [".jsx"],
		debug: true,
	})
	.transform("babelify", {presets: ["es2015", "react"]})
	.bundle()
	.pipe(source(files.app.out))
	.pipe(gulp.dest("."));
	// .pipe(uglify())
});


gulp.task("watch", ["build"], function () {
	watch([files.app.src], function () {
		gulp.start("build");
	});
})

gulp.task("default", ["build"]);

