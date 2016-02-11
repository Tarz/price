var gulp = require( 'gulp' );
var gutil = require( 'gulp-util' );
var gulpif = require( 'gulp-if' );
var uglify = require( 'gulp-uglify' );
var htmlmin = require('gulp-htmlmin');
var browserify = require( 'gulp-browserify' );
var compass = require( 'gulp-compass' );
var webserver = require('gulp-webserver');
var concat = require( 'gulp-concat' );
var env, jsSources,  sassSources, htmlSources,  outputDir, sassStyle;


env = process.env.NODE_ENV || "development";

if(env === "development") {
	outputDir = "builds/development/";
	sassStyle = "expanded";
} else {
	outputDir = "builds/production/";
	sassStyle = "compressed";
}

jsSources = ["components/scripts/**/*.js"];
sassSources = [ "components/sass/style.scss" ];
htmlSources = [ outputDir + "*.html" ];

gulp.task("js", function() {
	return gulp.src(jsSources)
	.pipe(concat('script.js'))
	.pipe(browserify())
	.pipe(gulpif(env === "production", uglify()))
	.pipe(gulp.dest(outputDir + "js"));
});

gulp.task("compass", function() {
	return gulp.src(sassSources)
	.pipe(compass({
		sass: "components/sass",
		css: outputDir + 'css',
		image: outputDir + "images",
		style: sassStyle,
		require: ['susy', 'breakpoint']
		
	}))
	.on("error", function(err) {
		console.error('Error!', err.message);
	})
	.pipe(gulp.dest( outputDir + "css"));
});
gulp.task("html", function() {
	
	 return gulp.src("builds/development/*.html")
    .pipe(gulpif(env === "production", htmlmin({
    	collapseWhitespace: true, 
    	removeComments: true, 
    	removeOptionalTags: true,
    	minifyJS: true
    })))
    .pipe(gulpif(env === "production", gulp.dest(outputDir)));
});



gulp.task("watch", function() {
	gulp.watch(jsSources, ["js"]);
	gulp.watch("components/sass/**/*.scss", ["compass"]);
	gulp.watch("builds/development/**/*.html", ["html"]);
});


gulp.task('webserver', function() {
    gulp.src('builds/development/')
        .pipe(webserver({
            livereload: true,
            open: true,
            port: 8080
        }));
});

gulp.task("default",[ "html",  "js", "compass", "webserver", "watch" ]);