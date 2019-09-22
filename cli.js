#!/usr/bin/env node
'use strict';
const meow = require('meow');
const injectEnvBrowserRun = require('.');

const cli = meow(`
	Usage
	  $ inject-env-browser-run

	Options
	  --dest  the destination where the env-config file will be created [Required]

	Examples
	  $ inject-env-browser-run --dest=src/foo/bar
		creates an \`env-config.js\` file in the path src/foo/bar
`);

if (cli.flags.dest) {
	injectEnvBrowserRun(cli.flags.dest);
} else {
	throw new Error('--dest flag is required! use --help to show all the options');
}
