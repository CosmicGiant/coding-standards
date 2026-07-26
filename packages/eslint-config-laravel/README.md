# CosmicGiant ESLint Config - Laravel

ESLint configuration for Laravel projects with modern JavaScript best practices and custom alignment rules.

## Features

- Based on `eslint:recommended`
- Modern ES2021+ support
- Custom alignment rules for improved readability
- Stricter rules for modern JavaScript
- No WordPress-specific dependencies
- Compatible with Vue.js (common in Laravel)

## Installation

```bash
npm install --save-dev github:cosmicgiant/coding-standards#main eslint
```

## Usage

Create an `eslint.config.js` file in your project root:

```js
const cosmicgiant = require( '@cosmicgiant/coding-standards/packages/eslint-config-laravel' );

module.exports = [
	...cosmicgiant,
];
```

Or reference it directly:

```js
module.exports = require( '@cosmicgiant/coding-standards/packages/eslint-config-laravel' );
```

## Custom Rules

### Modern JavaScript (Errors/Warnings)

- **no-var**: Error - Use `const` or `let` instead of `var`
- **prefer-const**: Warning - Use `const` for variables that are never reassigned
- **prefer-arrow-callback**: Warning - Use arrow functions for callbacks
- **prefer-template**: Warning - Use template literals instead of string concatenation
- **no-console**: Warning - Avoid console.log in production code

### Alignment Rules (Warnings)

- **align-assignments**: Aligns variable assignments for better readability
  ```js
  // Good
  const shortVar  = 'value';
  const longerVar = 'another value';
  ```

- **align-import**: Aligns import statements
  ```js
  // Good
  import { short }  from './short';
  import { longer } from './longer';
  ```

### Formatting Rules (Warnings)

- **camelcase**: Enforce camelCase naming
- **key-spacing**: Align object keys to values
  ```js
  // Good
  const obj = {
  	short:  'value',
  	longer: 'value',
  };
  ```
- **no-multiple-empty-lines**: Max 2 consecutive blank lines
- **no-multi-spaces**: Prevent multiple spaces (except for alignment)
- **no-undef**: Error on undefined variables
- **padded-blocks**: Control padding in code blocks

### Code Quality

- **no-unused-vars**: Warning for unused variables (ignores variables starting with `_`)
- **eqeqeq**: Warning for loose equality (use `===` instead of `==`)

## Differences from WordPress Config

| Feature | WordPress Config | Laravel Config |
|---------|-----------------|----------------|
| **Base** | @wordpress/eslint-plugin | eslint:recommended |
| **Globals** | `gform`, `ajaxurl` | None |
| **no-var** | Not enforced | **Error** |
| **prefer-const** | Not enforced | **Warning** |
| **no-console** | Allowed | **Warning** |
| **Target** | jQuery-based projects | Modern ES6+ projects |

## Scripts

Add these scripts to your `package.json`:

```json
{
	"scripts": {
		"lint": "eslint resources/js",
		"lint:fix": "eslint resources/js --fix",
		"lint:report": "eslint resources/js --format table"
	}
}
```

## Vue.js Support

To add Vue.js support, install the Vue ESLint plugin:

```bash
npm install --save-dev eslint-plugin-vue
```

Update your `eslint.config.js`:

```js
const cosmicgiant = require( '@cosmicgiant/coding-standards/packages/eslint-config-laravel' );
const vue         = require( 'eslint-plugin-vue' );

module.exports = [
	...cosmicgiant,
	...vue.configs['flat/recommended'],
];
```

## TypeScript Support

To add TypeScript support:

```bash
npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

Update your `eslint.config.js`:

```js
const cosmicgiant = require( '@cosmicgiant/coding-standards/packages/eslint-config-laravel' );
const tseslint    = require( 'typescript-eslint' );

module.exports = [
	...cosmicgiant,
	...tseslint.configs.recommended,
];
```

## Laravel Mix Integration

Add to your `webpack.mix.js`:

```js
const mix = require( 'laravel-mix' );

mix.js( 'resources/js/app.js', 'public/js' )
	.eslint( {
		fix: true,
		extensions: [ 'js' ],
	} );
```

## Pre-commit Hook Setup

Install Husky and lint-staged:

```bash
npm install --save-dev husky lint-staged
npx husky init
```

Create `.husky/pre-commit`:

```bash
#!/usr/bin/env sh
npx lint-staged
```

Add to `package.json`:

```json
{
	"lint-staged": {
		"resources/js/**/*.js": [
			"eslint --quiet --fix"
		]
	}
}
```

## IDE Integration

### VS Code

Install the ESLint extension and add to `.vscode/settings.json`:

```json
{
	"eslint.enable": true,
	"eslint.autoFixOnSave": true,
	"editor.codeActionsOnSave": {
		"source.fixAll.eslint": true
	},
	"eslint.workingDirectories": [
		"."
	]
}
```

### PhpStorm

1. Go to Settings > Languages & Frameworks > JavaScript > Code Quality Tools > ESLint
2. Enable ESLint
3. Select "Automatic ESLint configuration"
4. Set "Run eslint --fix on save"

## Customization

You can override or extend rules in your project's `eslint.config.js`. Later entries
win, so put your overrides after the spread:

```js
const globals     = require( 'globals' );
const cosmicgiant = require( '@cosmicgiant/coding-standards/packages/eslint-config-laravel' );

module.exports = [
	...cosmicgiant,
	{
		rules:           {
			// Make console an error instead of warning
			'no-console':           'error',

			// Allow underscore dangle (common in Laravel)
			'no-underscore-dangle': 'off',
		},
		languageOptions: {
			// Add additional environments
			globals: { ...globals.jest },
		},
	},
];
```

## Troubleshooting

### "Cannot find module 'eslint'"

Install the peer dependency:

```bash
npm install --save-dev eslint
```

### "Parsing error: Unexpected token"

Make sure you're using a compatible Node version (20.10.0+):

```bash
node --version
```

Check your `.nvmrc` file or install the correct version:

```bash
nvm install 20.10.0
nvm use 20.10.0
```

## Related Packages

- [eslint](https://www.npmjs.com/package/eslint)
- [@cosmicgiant/eslint-plugin-align](../eslint-plugin-align) — vendored alignment rules
- [eslint-plugin-vue](https://www.npmjs.com/package/eslint-plugin-vue) (optional)

## License

MIT License - Copyright (c) CosmicGiant
