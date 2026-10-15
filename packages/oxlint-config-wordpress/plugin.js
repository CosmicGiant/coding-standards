'use strict';

const pkg = require( './package.json' );

const camelcase = require( './lib/rules/camelcase' );

// ESLint core rules Oxlint does not implement natively, loaded through jsPlugins.
module.exports = {
	meta:  {
		name:    pkg.name,
		version: pkg.version,
	},
	rules: {
		camelcase,
	},
};
