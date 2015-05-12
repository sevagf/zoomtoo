# ZoomToo [![Build Status](https://secure.travis-ci.org/sevagf/zoomtoo.svg?branch=master)](https://travis-ci.org/sevagf/zoomtoo) ![Bower Version](https://badge.fury.io/bo/jquery-boilerplate.svg) [![Code Climate](https://codeclimate.com/github/sevagf/zoomtoo/badges/gpa.svg)](https://codeclimate.com/github/sevagf/zoomtoo)

ZoomToo is a jQuery plugin to show case your images with a magnifying lens when hovering.

## Usage

1. Include jQuery:

	```html
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
	```

2. Include ZoomToo code:

	```html
	<script src="dist/jquery.zoomtoo.min.js"></script>
	```

3. Call the plugin:

	```javascript
	$("#element").zoomtoo({
		magnify: 1
	});
	```

## Structure

The basic structure of the project is given in the following way:

```
├── demo/
│   └── index.html
├── dist/
│   ├── jquery.zoomtoo.js
│   └── jquery.zoomtoo.min.js
├── src/
│   └── jquery.zoomtoo.js
├── .editorconfig
├── .gitignore
├── .jshintrc
├── .travis.yml
├── bower.json
├── CONTRIBUTING.md
├── Gruntfile.js
├── package.json
├── README.md
└── zoomtoo.jquery.json
```

#### [demo/](https://github.com/sevagf/zoomtoo/tree/master/demo)

Contains a simple HTML file to demonstrate the plugin.

#### [dist/](https://github.com/sevagf/zoomtoo/tree/master/dist)

This is where the generated files are stored once Grunt runs.

#### [src/](https://github.com/sevagf/zoomtoo/tree/master/src)

Contains the files responsible for the plugin, you can choose between JavaScript or CoffeeScript.

#### [.editorconfig](https://github.com/sevagf/zoomtoo/tree/master/.editorconfig)

This file is for unifying the coding style for different editors and IDEs.

> Check [editorconfig.org](http://editorconfig.org) if you haven't heard about this project yet.

#### [.gitignore](https://github.com/sevagf/zoomtoo/tree/master/.gitignore)

List of files that we don't want Git to track.

> Check this [Git Ignoring Files Guide](https://help.github.com/articles/ignoring-files) for more details.

#### [.jshintrc](https://github.com/sevagf/zoomtoo/tree/master/.jshintrc)

List of rules used by JSHint to detect errors and potential problems in JavaScript.

> Check [jshint.com](http://jshint.com/about/) if you haven't heard about this project yet.

#### [.travis.yml](https://github.com/sevagf/zoomtoo/tree/master/.travis.yml)

Definitions for continous integration using Travis.

> Check [travis-ci.org](http://about.travis-ci.org/) if you haven't heard about this project yet.

#### [zoomtoo.jquery.json](https://github.com/sevagf/zoomtoo/tree/master/zoomtoo.jquery.json)

Package manifest file used to publish plugins in jQuery Plugin Registry.

> Check this [Package Manifest Guide](http://plugins.jquery.com/docs/package-manifest/) for more details.

#### [Gruntfile.js](https://github.com/sevagf/zoomtoo/tree/master/Gruntfile.js)

Contains all automated tasks using Grunt.

> Check [gruntjs.com](http://gruntjs.com) if you haven't heard about this project yet.

#### [package.json](https://github.com/sevagf/zoomtoo/tree/master/package.json)

Specify all dependencies loaded via Node.JS.

> Check [NPM](https://npmjs.org/doc/json.html) for more details.

## Guides

#### How did we get here?

Have you got in this repo and still not sure about using this boilerplate?

Well, extending jQuery with plugins and methods is very powerful and can save you and your peers a lot of development time by abstracting your most clever functions into plugins.

[This awesome guide](https://github.com/sevagf/zoomtoo/wiki/How-did-we-get-here%3F), adapted from [jQuery Plugins/Authoring](http://docs.jquery.com/Plugins/Authoring), will outline the basics, best practices, and common pitfalls to watch out for as you begin writing your plugin.

#### How to publish plugins?

Also, check our guide on [How to publish a plugin in jQuery Plugin Registry](https://github.com/sevagf/zoomtoo/wiki/How-to-publish-a-plugin-in-jQuery-Plugin-Registry)!

## Contributing

Check [CONTRIBUTING.md](https://github.com/sevagf/zoomtoo/blob/master/CONTRIBUTING.md) for more information.

## History

Check [Releases](https://github.com/sevagf/zoomtoo/releases) for detailed changelog.

## License

[MIT License](http://sevagf.mit-license.org/) © Sevag Frankian

## License
Copyright (c) 2015 Sevag Frankian Licensed under the MIT license.
