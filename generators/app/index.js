'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({

	prompting: function () {

		var done = this.async();

		// Have Yeoman greet the user.
		this.log(yosay(
			'Welcome to the terrific ' + chalk.red('angular-typescript-gulp') + ' generator!'
		));

		var prompts = [
			{
				type    : 'input',
				name    : 'name',
				message : 'Your project name',
				default : this.appname, // Default to current folder name
			},
			{
				type: 'confirm',
				name: 'someOption',
				message: 'Would you like to enable the flux capacitor?',
				default: true
			},
			{
				type: 'list',
				name: 'cssFramework',
				message: 'What CSS framework would you like?',
				choices: ['bootstrap', 'foundation']
			}
		];

		this.prompt(prompts, function (props) {

			// access this.props.someOption;
			this.props = props;

			done();
		}.bind(this));
	},

	install: function () {
		this._initNpm();
	},

	writing: function () {

		this.fs.copyTpl(
			this.templatePath(this.props.cssFramework+'-index.html'),
			this.destinationPath('public/views/index.html'),
			{
				title: 'Hello Angular TypeScript!',
				name: this.props.name,
				cssFramework: this.props.cssFramework
			}
		);

		this.fs.copy(
			this.templatePath('gulpfile.js'),
			this.destinationPath('gulpfile.js')
		);

		this.fs.copy(
			this.templatePath('server.js'),
			this.destinationPath('server.js')
		);
	},

	buildPackageFiles: function() {
		//this.typescript = this.env.options.typescript;

		this.template('pkg/_bower.json', 'bower.json');
		this.template('pkg/_bowerrc', '.bowerrc');

		//if (this.gulp) {
		//	this.template('root/_gulpfile.js', 'gulpfile.js');
		//}
		//if (this.typescript) {
		//	this.template('root/_tsd.json', 'tsd.json');
		//}
		//this.template('root/README.md', 'README.md');

	},


_initNpm: function() {
		this.npmInstall(['express', 'gulp'], { 'saveDev': false });
		this.npmInstall([
			'gulp-inject',
			'gulp-nodemon',
			'wiredep',
			//'gulp-angular-templatecache',
			//'gulp-concat',
			//'gulp-concat-css',
			//'gulp-minify-css',
			//'gulp-rename',
			//'gulp-sass',
			//'gulp-sourcemaps',
			//'gulp-tslint',
			//'gulp-typescript',
			//'gulp-uglify',
			//'tsd'
		], { 'saveDev': true });
	},

	_initBower: function() {
		this.bowerInstall(['bootstrap', 'angular'], { 'saveDev': false });
	}
});
