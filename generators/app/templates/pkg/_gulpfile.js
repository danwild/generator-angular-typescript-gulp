var gulp        = require('gulp');
var nodemon     = require('gulp-nodemon');
var inject      = require('gulp-inject');
var wiredep     = require('wiredep').stream;

var addStream     = require('add-stream');
var concat        = require('gulp-concat');
var concatCss     = require('gulp-concat-css');
var rename        = require('gulp-rename');
var sourceMaps    = require('gulp-sourcemaps');
var templateCache = require('gulp-angular-templatecache');
var ts            = require('gulp-typescript');
var tslint        = require('gulp-tslint');
var uglify        = require('gulp-uglify');
var sass          = require('gulp-sass');
var minifyCss     = require('gulp-minify-css');
var _             = require('underscore');


var watchFiles = [

	'./public/src/**/*.html',
	'./public/src/**/*.ts',
	'./public/src/**/*.css'
];

// Concatenate & Minify JS
gulp.task('scripts', ['inject'], function() {

	return gulp.src('public/src/**/*.ts')
		.pipe(addStream.obj(prepareTemplates()))
		.pipe(sourceMaps.init())
		.pipe(ts({
			noImplicitAny: true,
			suppressImplicitAnyIndexErrors: true,
			out: 'app.js'
		}))
		.pipe(gulp.dest('public/dist'))
		.pipe(rename('app.min.js'))
		.pipe(uglify())
		.pipe(sourceMaps.write('.'))
		.pipe(gulp.dest('public/dist'));
});

gulp.task('inject', function(){

	// inject our src from public
	var injectSrc = gulp.src([
		'./public/src/**/*.css'
	], { read: false });

	var injectOptions = {
		ignorePath: '/public'
	};

	// inject bower deps
	var options = {
		bowerJson: require('./bower.json'),
		directory: './public/lib',
		ignorePath: '../../public'
	};

	return gulp.src('./public/*.html')
		.pipe(wiredep(options))
		.pipe(inject(injectSrc, injectOptions))
		.pipe(gulp.dest('./public'));

});

gulp.task('serve', ['inject'], function(){

	var options = {
		script: 'server.js',
		delayTime: 1,
		env: {
			'PORT': 3000
		},
		watch: watchFiles
	};

	return nodemon(options)
		.on('restart', function(ev){
			console.log('restarting..');
		});
});

// Default Task
gulp.task('default', ['inject', 'scripts', 'serve']);


function prepareTemplates() {

	// we get a conflict with the < % = var % > syntax for $templateCache
	// template header, so we need to encode values to keep yo happy
	var encodedHeader = "angular.module(&quot;&lt;%= module %&gt;&quot;&lt;%= standalone %&gt;).run([&quot;$templateCache&quot;, function($templateCache:any) {";
	return gulp.src('public/src/**/*.html')
		.pipe(templateCache('templates.ts', {
			root: "app-templates",
			module: "app.templates",
			standalone : true,
			templateHeader: _.unescape(encodedHeader)
		}));
}