# CosmicGiant ESLint Config - WordPress

ESLint configuration for WordPress projects with custom alignment rules and WordPress-specific globals.

## Features

- Based on `@wordpress/eslint-plugin/recommended-with-formatting`
- Custom alignment rules for improved readability
- WordPress globals (`gform`, `ajaxurl`)
- ES2021+ support
- Tab-based indentation (to match PHP standards)

## Installation

```bash
npm install --save-dev github:cosmicgiant/coding-standards#main @wordpress/eslint-plugin
```

## Usage

Create an `.eslintrc.js` file in your project root:

```js
module.exports = {
	extends: [
		'./node_modules/@cosmicgiant/coding-standards/packages/eslint-config-wordpress/.eslintrc.js'
	]
};
```

Or reference it directly:

```js
module.exports = require( './node_modules/@cosmicgiant/coding-standards/packages/eslint-config-wordpress/.eslintrc.js' );
```

## Custom Rules

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
- **no-undef**: Warn on undefined variables
- **padded-blocks**: Control padding in code blocks

## WordPress Globals

The following globals are predefined as `readonly`:
- `gform` - Gravity Forms object
- `ajaxurl` - WordPress AJAX URL

## Scripts

Add these scripts to your `package.json`:

```json
{
	"scripts": {
		"lint:js": "eslint .",
		"lint:js:fix": "eslint . --fix",
		"lint:js:report": "eslint . --format table"
	}
}
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
		"*.js": [
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
	}
}
```

### PhpStorm

1. Go to Settings > Languages & Frameworks > JavaScript > Code Quality Tools > ESLint
2. Enable ESLint
3. Select "Automatic ESLint configuration"

## Customization

You can override or extend rules in your project's `.eslintrc.js`:

```js
module.exports = {
	extends: [
		'./node_modules/@cosmicgiant/coding-standards/packages/eslint-config-wordpress/.eslintrc.js'
	],
	rules: {
		// Override rules
		'camelcase': 'error', // Change from warning to error
		'no-console': 'warn', // Add new rule
	},
	globals: {
		// Add custom globals
		myCustomGlobal: 'readonly',
	},
};
```

## Troubleshooting

### "Cannot find module '@wordpress/eslint-plugin'"

Install the peer dependency:

```bash
npm install --save-dev @wordpress/eslint-plugin
```

### "Parsing error: The keyword 'const' is reserved"

Update your `.eslintrc.js` to set the correct parser options:

```js
{
	parserOptions: {
		ecmaVersion: 'latest',
	},
}
```

## Related Packages

- [@wordpress/eslint-plugin](https://www.npmjs.com/package/@wordpress/eslint-plugin)
- [eslint-plugin-align-assignments](https://www.npmjs.com/package/eslint-plugin-align-assignments)
- [eslint-plugin-align-import](https://www.npmjs.com/package/eslint-plugin-align-import)

## License

MIT License - Copyright (c) CosmicGiant
