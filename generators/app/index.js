'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _     = require('underscore.string');

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
				default : this.appname // Default to current folder name
			},
			{
				type: 'confirm',
				name: 'someOption',
				message: 'Would you like to enable the flux capacitor?',
				default: true
			},
			{
				type    : 'input',
				name    : 'description',
				message : 'Project description',
				default : 'No description yet'
			},
			{
				type    : 'input',
				name    : 'version',
				message : 'Project version',
				default : '0.0.0'
			},
			{
				type    : 'input',
				name    : 'authorName',
				message : 'Author Name',
				default : ''
			},
			{
				type    : 'input',
				name    : 'authorEmail',
				message : 'Author Email',
				default : ''
			},
			{
				type    : 'input',
				name    : 'authorUrl',
				message : 'Author Url',
				default : ''
			},
			{
				type    : 'input',
				name    : 'repo',
				message : 'Project repository',
				default : ''
			},
			{
				type: 'confirm',
				name: 'addLicense',
				message: 'Add a license for the project?',
				default: true
			},
			{
				when: function ( answers ) {
					return answers.addLicense;
				},
				type: 'list',
				name: 'license',
				message: 'Which license',
				choices: ['Apache-2.0', 'MIT License', 'GNU General Public License 2.0', 'ISC']
			},
			{
				type: 'list',
				name: 'cssFramework',
				message: 'Which front-end framework would you like?',
				choices: ['bootstrap', 'foundation']
			},
			{
				when: function ( answers ) {
					// bootstrap ships with glyphicons
					return answers.cssFramework != 'bootstrap';
				},
				type: 'confirm',
				name: 'useIcons',
				message: 'Would you like to use some sweet font icons?',
				default: true
			},
			{
				when: function ( answers ) {
					return answers.useIcons;
				},
				type: 'list',
				name: 'iconFont',
				message: 'Which icon set would you like?',
				choices: ['font-awesome']
			}

		];

		this.prompt(prompts, function (props) {

			// access this.props.someOption;
			this.props = props;
			this.appname = props.name;
			this.props.nameDasherized = _.dasherize(this.appname);
			this.props.nameCamelized = _.camelize(this.appname);

			done();
		}.bind(this));
	},

	writing: function () {

		this.fs.copyTpl(
			this.templatePath('src/app/' +this.props.cssFramework+'-index.html'),
			this.destinationPath('public/src/app/index.html'),
			{
				title: 'Hello Angular TypeScript!',
				nameDasherized: this.props.nameDasherized,
				nameCamelized: this.props.nameCamelized,
				cssFramework: this.props.cssFramework,
				hasIcons: this.props.useIcons,
				iconsProvider: this.props.iconFont
			}
		);

		this.template('gulpfile.js', 'gulpfile.js');
		this.template('server.js', 'server.js');

		// app shell
		this.template('src/app/app.js', 'public/src/app/app.js');
		this.template('src/demo/demo.html', 'public/src/demo/demo.html');
		this.template('src/demo/demo.js', 'public/src/demo/demo.js');
		this.template('src/demo/demo.css', 'public/src/demo/demo.css');
	},

	// setup our pkg files
	buildPackageFiles: function() {
		this.template('pkg/_package.json', 'package.json');
		this.template('pkg/_bower.json', 'bower.json');
		this.template('pkg/_bowerrc', '.bowerrc');
		this.template('pkg/_tsd.json', 'tsd.json');
		this.template('pkg/README.md', 'README.md');
	},

	// load up all our deps
	install: function () {
		this.installDependencies();
	}

//_initNpm: function() {
//		this.npmInstall(['express', 'gulp'], { 'saveDev': false });
//		this.npmInstall([
//			'gulp-inject',
//			'gulp-nodemon',
//			'wiredep'
//			//'gulp-angular-templatecache',
//			//'gulp-concat',
//			//'gulp-concat-css',
//			//'gulp-minify-css',
//			//'gulp-rename',
//			//'gulp-sass',
//			//'gulp-sourcemaps',
//			//'gulp-tslint',
//			//'gulp-typescript',
//			//'gulp-uglify',
//			//'tsd'
//		], { 'saveDev': true });
//	}
});
