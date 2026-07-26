'use strict';

const globals   = require( 'globals' );
const wordpress = require( '@wordpress/eslint-plugin' );

const align = require( '../eslint-plugin-align' );

// recommended-with-formatting keeps ESLint's formatting rules on. Swap to
// 'recommended' to hand formatting to Prettier or to enable TypeScript support.
const wordpressRecommended = wordpress.configs[ 'recommended-with-formatting' ];

module.exports = [
	...wordpressRecommended,
	{
		name:            'cosmicgiant/wordpress',
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType:  'module',
			globals:     {
				...globals.browser,
				gform:   'readonly',
				ajaxurl: 'readonly',
			},
		},
		plugins:         { align },
		settings:        {
			'import/resolver': 'webpack',
			jsdoc:             {
				preferredTypes: {
					bool: 'boolean',
				},
			},
		},
		rules:           {
			'align/align-assignments': [
				'warn',
				{ requiresOnly: false },
			],
			'align/align-import':      [ 'warn' ],
			camelcase:                 [ 'warn' ],
			'key-spacing':             [ 'warn', {
				mode: 'minimum', align: 'value',
			} ],
			'no-multiple-empty-lines': [ 'warn' ],
			'no-multi-spaces':         [ 'warn', {
				exceptions: {
					VariableDeclarator: true,
					ImportDeclaration:  true,
				},
			} ],
			'no-undef':                [ 'warn' ],
			'padded-blocks':           [ 'warn' ],
		},
	},
];
