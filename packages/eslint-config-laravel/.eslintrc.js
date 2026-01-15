module.exports = {
	root:          true,
	env:           {
		browser: true,
		es2021:  true,
		node:    true,
	},
	extends:       [
		'eslint:recommended',
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType:  'module',
	},
	plugins:       [
		'align-assignments',
		'align-import',
	],
	rules:         {
		// Alignment rules (same as WordPress for consistency)
		'align-assignments/align-assignments': [
			'warn',
			{ requiresOnly: false },
		],
		'align-import/align-import':           [ 'warn' ],

		// Modern JavaScript best practices
		'no-console':                          [ 'warn' ],
		'no-var':                              [ 'error' ],
		'prefer-const':                        [ 'warn' ],
		'prefer-arrow-callback':               [ 'warn' ],
		'prefer-template':                     [ 'warn' ],

		// Formatting rules (matching WordPress style)
		camelcase:                             [ 'warn' ],
		'key-spacing':                         [ 'warn', {
			mode: 'minimum', align: 'value',
		} ],
		'no-multiple-empty-lines':             [ 'warn', { max: 2 } ],
		'no-multi-spaces':                     [ 'warn', {
			exceptions: {
				VariableDeclarator: true,
				ImportDeclaration:  true,
			},
		} ],
		'no-undef':                            [ 'error' ],
		'padded-blocks':                       [ 'warn' ],

		// Additional quality rules
		'no-unused-vars':                      [ 'warn', {
			argsIgnorePattern: '^_',
			varsIgnorePattern: '^_',
		} ],
		'eqeqeq':                              [ 'warn', 'smart' ],
	},
};
