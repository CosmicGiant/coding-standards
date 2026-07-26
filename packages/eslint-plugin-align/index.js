'use strict';

const pkg = require('./package.json');

const alignAssignments = require('./lib/rules/align-assignments');
const alignImport      = require('./lib/rules/align-import');
const trimImport       = require('./lib/rules/trim-import');

// meta.name/version let ESLint report this plugin in --print-config and cache keys.
module.exports = {
	meta:  {
		name:    pkg.name,
		version: pkg.version,
	},
	rules: {
		'align-assignments': alignAssignments,
		'align-import':      alignImport,
		'trim-import':       trimImport,
	},
};
