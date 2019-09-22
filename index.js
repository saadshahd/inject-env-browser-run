'use strict';

const fs = require('fs');
const del = require('del');
const cosmiconfig = require('cosmiconfig');

const explorer = cosmiconfig('inject-env-browser-run');

module.exports = async dest => {
	const file = `${dest}/env-config.js`;
	const [, result] = await Promise.all([
		del([file]),
		explorer.search()
	]);

	if (!result || !result.config || !result.config.required) {
		return console.log('No required env variables!');
	}

	const {config} = result;
	const {required} = config;
	const mapSysEnvReducer = (obj, varName) => ({...obj, [varName]: process.env[varName]});
	const envObj = required.reduce(mapSysEnvReducer, {});
	const content = `window._env_ = ${JSON.stringify(envObj, null, '  ')}`;

	console.log(`
========================
inject-env-browser-run
========================
	`);

	required.forEach(varName => {
		if (envObj[varName]) {
			console.log(`Success: ${varName} defined with value ${envObj[varName]}`);
		} else {
			console.warn(`Warn: ${varName} is undefined!`);
		}
	});

	fs.writeFile(file, content, err => {
		if (err) {
			throw err;
		}

		console.log(`
========================
env injected to the browser successfully
========================
		`);
	});
};
