'use strict';

const js      = require( '@eslint/js' );
const globals = require( 'globals' );

const align = require( '../eslint-plugin-align' );

module.exports = [
	js.configs.recommended,
	{
		name:            'cosmicgiant/laravel',
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType:  'module',
			globals:     {
				...globals.browser,
				...globals.node,
			},
		},
		plugins:         { align },
		rules:           {
			// Alignment rules (same as WordPress for consistency)
			'align/align-assignments': [
				'warn',
				{ requiresOnly: false },
			],
			'align/align-import':      [ 'warn' ],

			// Modern JavaScript best practices
			'no-console':              [ 'warn' ],
			'no-var':                  [ 'error' ],
			'prefer-const':            [ 'warn' ],
			'prefer-arrow-callback':   [ 'warn' ],
			'prefer-template':         [ 'warn' ],

			// Formatting rules (matching WordPress style)
			'brace-style':             [ 'warn', '1tbs' ],
			camelcase:                 [ 'warn' ],
			'comma-dangle':            [ 'warn', 'always-multiline' ],
			curly:                     [ 'warn', 'all' ],
			indent:                    [ 'warn', 'tab' ],
			'key-spacing':             [ 'warn', {
				mode: 'minimum', align: 'value',
			} ],
			'no-multiple-empty-lines': [ 'warn', { max: 2 } ],
			'no-multi-spaces':         [ 'warn', {
				exceptions: {
					VariableDeclarator: true,
					ImportDeclaration:  true,
				},
			} ],
			'no-undef':                [ 'error' ],
			'object-curly-spacing':    [ 'warn', 'always' ],
			'padded-blocks':           [ 'warn', 'never' ],
			semi:                      [ 'warn', 'always' ],
			'space-in-parens':         [ 'warn', 'always', {
				exceptions: [ 'empty' ],
			} ],

			// Additional quality rules
			'no-unused-vars':          [ 'warn', {
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^_',
			} ],
			eqeqeq:                    [ 'warn', 'smart' ],
		},
	},
];
