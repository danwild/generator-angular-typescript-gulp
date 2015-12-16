var gulp        = require('gulp');
var nodemon     = require('gulp-nodemon');
var inject      = require('gulp-inject');
var wiredep     = require('wiredep').stream;


var watchFiles = [
	'./public/views/*.html',
	'./public/js/*.js',
	'./public/css/*.js'
];

gulp.task('inject', function(){

	// inject our src from public
	var injectSrc = gulp.src([
		'./public/css/*.css',
		'./public/js/*.js'
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

	return gulp.src('./public/views/*.html')
		.pipe(wiredep(options))
		.pipe(inject(injectSrc, injectOptions))
		.pipe(gulp.dest('./public/views'));

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
gulp.task('default', ['inject', 'serve']);