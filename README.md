# generator-angular-typescript-gulp [![NPM version][npm-image]][npm-url]
> A no-fluff yeoman generator for AngularJS/Typescript apps, uses Gulp instead of Grunt

## What you get

Once you've run the generator, you'll have:

<ul>
	<li>A demo page, injected with bower dependencies plus wired to compile and inject your own src files</li>
	<li>Gulp tasks for transpiling, concatenating and minifying TS -> JS</li>
	<li>Gulp tasks for compiling, concatenating and minifying SASS -> CSS</li>
	<li>Gulp tasks for compiling and injecting your directives with angular template cache</li> 
	<li>Gulp tasks to watch (nodemon) and serve files with express</li>
	<li>A shell Angular-TypeScript app, with TypeScript Definitions hooked up ready to go</li>
</ul>	

## Installation

First, install [Yeoman](http://yeoman.io) and generator-angular-typescript-gulp using [npm](https://www.npmjs.com/) 
(we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-angular-typescript-gulp
```

Then generate your new project:

```bash
yo angular-typescript-gulp
```

Then build and serve (oh yeah, you'll also need [tsd](https://www.npmjs.com/package/tsd) installed):

```bash
tsd install
gulp
```

## App scaffold

```
project/
│   README.md
│   bower.json
│   gulpfile.js
│   package.json
│   server.js
│   tsd.json   
└───node_modules/
│
│
└───typings/
│       tsd.d.ts
│    
└───public/
    │   index.html   
    │
    ├───dist/ 
    │
    │   
    ├───lib/ (bower_components)    
    │  
    │
    └───src/ (add your own components in here)
        │    
        └───app/
            │   app.ts (app root)   
            │
            demo/ (example component)    
    
```

Just write and add your own src files (.ts, .html, .scss) to tidy little component folders under `public/src` (example: `public/src/demo` folder),
and they'll be gulped and served.

## Project framework options 
<p>(ok a little fluff)</p>
<ul>
	<li><strong>Front-end framework:</strong> Bootstrap, Foundation</li>
	<li><strong>Icon font:</strong> Font Awesome (or Bootstrap comes with Glyphs)</li>
</ul>	


## License

Apache-2.0 © [Daniel Wild](http://etchdesign.com.au)

[npm-image]: https://badge.fury.io/js/generator-angular-typescript-gulp.svg
[npm-url]: https://npmjs.org/package/generator-angular-typescript-gulp

