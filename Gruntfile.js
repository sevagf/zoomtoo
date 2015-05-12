module.exports = function(grunt) {

	grunt.initConfig({

		// Import package manifest
		pkg: grunt.file.readJSON("zoomtoo.jquery.json"),

		// Banner definitions
		meta: {
			banner: "/*\n" +
				" *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
				" *  <%= pkg.description %>\n" +
				" *  <%= pkg.homepage %>\n" +
				" *\n" +
				" *  Made by <%= pkg.author.name %>\n" +
				" *  Under <%= pkg.licenses[0].type %> License\n" +
				" */\n"
		},

		// Lint definitions
		jshint: {
			files: ["dist/jquery.zoomtoo.js"],
			options: {
				jshintrc: ".jshintrc"
			}
		},

		// Minify definitions
		uglify: {
			my_target: {
				src: ["dist/jquery.zoomtoo.js"],
				dest: "dist/jquery.zoomtoo.min.js"
			},
			options: {
				banner: "<%= meta.banner %>"
			}
		},

		// Watch for CoffeeScript code changes, then recompile
		watch: {
			files: ['src/*'],
			tasks: ['compile']
		},

		// Compile CoffeeScript to JS with source maps
		coffee: {
			compileWithMaps: {
				options: {
					sourceMap: true
				},
				files: {
					'dist/jquery.zoomtoo.js': 'src/jquery.zoomtoo.coffee'
				}
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks('grunt-contrib-coffee');

	grunt.registerTask("default", ["compile", "jshint", "uglify"]);
	grunt.registerTask("travis", ["jshint"]);
	grunt.registerTask("compile", ["coffee"]);

};
