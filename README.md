# ZoomToo [![Build Status](https://secure.travis-ci.org/sevagf/zoomtoo.svg?branch=master)](https://travis-ci.org/sevagf/zoomtoo) ![Bower Version](https://badge.fury.io/bo/jquery-boilerplate.svg) [![Code Climate](https://codeclimate.com/github/sevagf/zoomtoo/badges/gpa.svg)](https://codeclimate.com/github/sevagf/zoomtoo)

ZoomToo is a jQuery plugin to show case your images with a magnifying lens when hovering.

## Usage

1. Include jQuery:

	```html
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
	```

2. Include ZoomToo code:

	```html
	<script src="dist/jquery.zoomtoo.js"></script>
	```

3. Markup the container element:

	```html
	<div id="#frame">
		<img src="low_res.jpg" data-src="high_res.jpg" />
	</div>
	```

4. Call the plugin:

	```javascript
	$("#frame").zoomtoo({
		magnify: 1
	});
	```

This plugin is also registered under http://bower.io/ to simplify integration. Try:

    npm install -g bower
    bower install zoomtoo


## Compatibility

jQuery Mask Plugin has been tested with jQuery 1.7.1 on all major browsers:

 * Firefox 2+ (Win, Mac, Linux);
 * IE7+ (Win);
 * Chrome 6+ (Win, Mac, Linux, Android, iPhone);
 * Safari 3.2+ (Win, Mac, iPhone);
 * Opera 8+ (Win, Mac, Linux, Android, iPhone).

## Contributing

Check [CONTRIBUTING.md](https://github.com/sevagf/zoomtoo/blob/master/CONTRIBUTING.md) for more information.

## History

Check [Releases](https://github.com/sevagf/zoomtoo/releases) for detailed changelog.

## License

[MIT License](http://sevagf.mit-license.org/) © Sevag Frankian
