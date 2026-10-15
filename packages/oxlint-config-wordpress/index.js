'use strict';

const path = require( 'path' );

const config = require( './.oxlintrc.json' );

// Oxlint resolves a relative jsPlugins specifier against the config file that
// declares it. Once this object is spread or extended from a vite.config.js
// lint block, that file is the consumer's, so the local plugins are rewritten
// to absolute paths here. Bare package names still resolve from the consumer.
const resolveSpecifier = ( specifier ) => (
	specifier.startsWith( '.' ) ? path.join( __dirname, specifier ) : specifier
);

module.exports = {
	...config,
	jsPlugins: config.jsPlugins.map( ( plugin ) => (
		'string' === typeof plugin
			? resolveSpecifier( plugin )
			: { ...plugin, specifier: resolveSpecifier( plugin.specifier ) }
	) ),
};
