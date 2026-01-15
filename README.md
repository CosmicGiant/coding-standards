# CosmicGiant Coding Standards

Shared coding standards for WordPress and Laravel projects at CosmicGiant. This package provides customized PHP_CodeSniffer rulesets and ESLint configurations that enforce consistent code style while prioritizing readability and team preferences.

## Table of Contents

- [Features](#features)
- [Philosophy](#philosophy)
- [Installation](#installation)
- [Usage - WordPress Projects](#usage---wordpress-projects)
- [Usage - Laravel Projects](#usage---laravel-projects)
- [IDE Integration](#ide-integration)
  - [PHPStorm / IntelliJ IDEA](#phpstorm--intellij-idea)
  - [VS Code](#vs-code)
  - [Other IDEs](#other-ides)
- [GitHub Actions Integration](#github-actions-integration)
- [Customization](#customization)
- [Key Differences: WordPress vs Laravel](#key-differences-wordpress-vs-laravel)
- [Design Decisions](#design-decisions)

## Features

- **WordPress Standards**: Based on WordPress-Core with company-specific customizations
- **Laravel Standards**: Based on PSR-2 with modern PHP best practices (Slevomat)
- **JavaScript Standards**: Separate ESLint configurations for WordPress and Laravel
- **IDE Integration**: Full setup guides for PHPStorm, VS Code, and other editors
- **GitHub Actions**: Reusable workflow for automated code quality checks
- **Flexible**: Warnings for style preferences, errors for code quality issues

## Philosophy

Our coding standards prioritize **readability and consistency** over strict adherence to external standards. We:

- Use **tabs for indentation** (not spaces)
- Require **spaces inside parentheses**: `if ( $condition )` instead of `if ($condition)`
- Set many formatting rules as **warnings** instead of errors
- Allow pragmatic patterns like short ternary operators and assignments in conditions
- Enforce code quality while allowing team-specific style choices


## Installation

### PHP Standards (via Composer)

Add this repository to your project's `composer.json`:

```json
{
  "repositories": [
    {
      "type": "vcs",
      "url": "https://github.com/cosmicgiant/coding-standards"
    }
  ],
  "require-dev": {
    "cosmicgiant/coding-standards": "dev-main"
  }
}
```

Then install:

```bash
composer install
```

### JavaScript Standards (via npm)

```bash
# WordPress projects
npm install --save-dev github:cosmicgiant/coding-standards#main @wordpress/eslint-plugin

# Laravel projects
npm install --save-dev github:cosmicgiant/coding-standards#main eslint
```


## Usage - WordPress Projects

### PHP Coding Standards

Create a `phpcs.xml` file in your project root:

```xml
<?xml version="1.0"?>
<ruleset name="My WordPress Project">
	<!-- Use the CosmicGiant WordPress ruleset -->
	<rule ref="./vendor/cosmicgiant/coding-standards/CosmicGiant/ruleset-wordpress.xml"/>

	<!-- Scan these directories -->
	<file>.</file>

	<!-- Exclude common directories -->
	<exclude-pattern>/vendor/*</exclude-pattern>
	<exclude-pattern>/node_modules/*</exclude-pattern>
</ruleset>
```

Run PHPCS:

```bash
vendor/bin/phpcs
```

Fix automatically fixable issues:

```bash
vendor/bin/phpcbf
```

### JavaScript Coding Standards

Create an `.eslintrc.js` file in your project root:

```js
module.exports = {
	extends: [
		'./node_modules/@cosmicgiant/coding-standards/packages/eslint-config-wordpress/.eslintrc.js'
	]
};
```

Add npm scripts to your `package.json`:

```json
{
	"scripts": {
		"lint:php": "phpcs",
		"lint:js": "eslint .",
		"lint": "npm run lint:php && npm run lint:js",
		"fix:js": "eslint . --fix"
	}
}
```

Run ESLint:

```bash
npm run lint:js
```


## Usage - Laravel Projects

### PHP Coding Standards

Create a `phpcs.xml` file in your project root:

```xml
<?xml version="1.0"?>
<ruleset name="My Laravel Project">
	<!-- Use the CosmicGiant Laravel ruleset -->
	<rule ref="./vendor/cosmicgiant/coding-standards/CosmicGiant/ruleset-laravel.xml"/>

	<!-- Scan Laravel directories -->
	<file>app</file>
	<file>config</file>
	<file>database</file>
	<file>routes</file>
</ruleset>
```

Run PHPCS:

```bash
vendor/bin/phpcs
```

Fix automatically fixable issues:

```bash
vendor/bin/phpcbf
```

### JavaScript Coding Standards

Create an `.eslintrc.js` file in your project root:

```js
module.exports = {
	extends: [
		'./node_modules/@cosmicgiant/coding-standards/packages/eslint-config-laravel/.eslintrc.js'
	]
};
```

Add composer scripts:

```json
{
	"scripts": {
		"lint:php": "phpcs",
		"lint:js": "npm run lint",
		"lint": "composer lint:php && npm run lint"
	}
}
```


## IDE Integration

Configure your IDE to automatically check and fix coding standards as you write code.

### PHPStorm / IntelliJ IDEA

#### 1. Configure PHP_CodeSniffer

1. Open **Settings/Preferences** → **PHP** → **Quality Tools** → **PHP_CodeSniffer**
2. Click the **...** button next to "Configuration"
3. Set the PHP_CodeSniffer path:
   - **Local**: `/path/to/your-project/vendor/bin/phpcs`
   - **Docker**: Configure remote interpreter first, then use container path
4. Click **Validate** to ensure it's working
5. Click **OK**

#### 2. Enable Inspections

1. Go to **Settings/Preferences** → **Editor** → **Inspections**
2. Search for "PHP_CodeSniffer"
3. Check **PHP** → **Quality Tools** → **PHP_CodeSniffer validation**
4. Set Severity to **Warning** (matches our philosophy)
5. Click **Show ignored files** and ensure your project files aren't ignored

#### 3. Configure Coding Standard

1. In the **PHP_CodeSniffer validation** inspection settings
2. Check **Show sniff name**
3. Set **Coding standard** to **Custom**
4. Click the **...** button next to "Custom"
5. Browse to your project's `phpcs.xml` file (or specify the ruleset directly):
   - **WordPress**: `vendor/cosmicgiant/coding-standards/CosmicGiant/ruleset-wordpress.xml`
   - **Laravel**: `vendor/cosmicgiant/coding-standards/CosmicGiant/ruleset-laravel.xml`

#### 4. Enable Automatic Fixing (Optional)

1. Go to **Settings/Preferences** → **Tools** → **External Tools**
2. Click **+** to add a new tool
3. Configure:
   - **Name**: PHPCBF (PHP Code Beautifier and Fixer)
   - **Program**: `$ProjectFileDir$/vendor/bin/phpcbf`
   - **Arguments**: `$FilePath$`
   - **Working directory**: `$ProjectFileDir$`
4. Click **OK**

Now you can right-click any file and select **External Tools** → **PHPCBF** to auto-fix issues.

#### 5. Configure Code Style (Tab Indentation)

Since our standards use tabs, configure PHPStorm accordingly:

1. Go to **Settings/Preferences** → **Editor** → **Code Style** → **PHP**
2. Under **Tabs and Indents**:
   - **Use tab character**: ✓ Checked
   - **Tab size**: 4 (or your preference)
   - **Indent**: 1
   - **Continuation indent**: 2
3. Click **OK**

#### Screenshots / Visual Guide

**Before you start coding:**
- Real-time highlighting of coding standard violations
- Warnings appear as yellow underlines
- Errors appear as red underlines
- Hover over violations to see the sniff name and description

**Keyboard Shortcuts:**
- **Alt + Enter** (Windows/Linux) or **⌥ + Enter** (Mac): Show quick-fixes for the current violation
- Right-click → **External Tools** → **PHPCBF**: Auto-fix entire file


### VS Code

#### 1. Install Extensions

Install these VS Code extensions:
- [phpcs](https://marketplace.visualstudio.com/items?itemName=ikappas.phpcs) by Ioannis Kappas
- [phpcbf](https://marketplace.visualstudio.com/items?itemName=persoderlind.vscode-phpcbf) by Per Soderlind (optional, for auto-fixing)

#### 2. Configure Settings

Add to your project's `.vscode/settings.json` (or user settings):

```json
{
	"phpcs.enable": true,
	"phpcs.executablePath": "${workspaceFolder}/vendor/bin/phpcs",
	"phpcs.standard": "${workspaceFolder}/phpcs.xml",
	"phpcs.showWarnings": true,
	"phpcs.showSources": true,
	"phpcbf.enable": true,
	"phpcbf.executablePath": "${workspaceFolder}/vendor/bin/phpcbf",
	"phpcbf.standard": "${workspaceFolder}/phpcs.xml",
	"phpcbf.onsave": false,
	"editor.tabSize": 4,
	"editor.insertSpaces": false,
	"editor.detectIndentation": false,
	"[php]": {
		"editor.tabSize": 4,
		"editor.insertSpaces": false,
		"editor.defaultFormatter": "persoderlind.vscode-phpcbf"
	}
}
```

#### 3. Enable Auto-Fix on Save (Optional)

To automatically fix issues when you save:

```json
{
	"phpcbf.onsave": true,
	"editor.formatOnSave": true
}
```

#### 4. Usage

- Violations appear as problems in the **Problems** panel (View → Problems)
- Hover over underlined code to see violation details
- **Right-click** → **Format Document** to auto-fix (if phpcbf extension is installed)
- Use **Cmd/Ctrl + Shift + M** to open the Problems panel


### Other IDEs

#### Sublime Text

1. Install [SublimeLinter](https://packagecontrol.io/packages/SublimeLinter)
2. Install [SublimeLinter-phpcs](https://packagecontrol.io/packages/SublimeLinter-phpcs)
3. Configure in **Preferences** → **Package Settings** → **SublimeLinter** → **Settings**:

```json
{
	"linters": {
		"phpcs": {
			"cmd": "${folder}/vendor/bin/phpcs",
			"standard": "${folder}/phpcs.xml"
		}
	}
}
```

#### Vim / Neovim

Use [ALE (Asynchronous Lint Engine)](https://github.com/dense-analysis/ale):

```vim
let g:ale_linters = {
\   'php': ['phpcs'],
\}
let g:ale_fixers = {
\   'php': ['phpcbf'],
\}
let g:ale_php_phpcs_executable = './vendor/bin/phpcs'
let g:ale_php_phpcs_standard = './phpcs.xml'
let g:ale_php_phpcbf_executable = './vendor/bin/phpcbf'
let g:ale_php_phpcbf_standard = './phpcs.xml'
```


### Troubleshooting IDE Integration

#### "Cannot find phpcs" or "Executable not found"

**Solution:** Run `composer install` to install dependencies first. The phpcs binary is located at `vendor/bin/phpcs` after installation.

#### "No coding standard specified"

**Solution:** Ensure your project has a `phpcs.xml` file in the root, or specify the ruleset path directly in your IDE settings.

#### "Wrong indentation detected" (spaces instead of tabs)

**Solution:** Configure your IDE to use tabs for PHP files (see code style settings above).

#### Violations not showing in real-time

**Solution:**
- Check that the phpcs executable path is correct
- Verify the ruleset path is correct
- Try restarting your IDE
- Check IDE logs for phpcs errors

#### "Too many errors" or slow performance

**Solution:** PHPCS can be slow on large files. Consider:
- Excluding large generated files in your `phpcs.xml`
- Increasing PHP memory limit in phpcs configuration
- Using `phpcbf` to auto-fix issues in bulk first


## GitHub Actions Integration

This package includes a reusable GitHub Actions workflow for automated code quality checks on pull requests.

**What it does:**
- Runs PHP_CodeSniffer (PHPCS) on changed PHP files
- Runs ESLint on changed JavaScript files
- Posts violations as PR comments/annotations
- Only runs when PHP or JS files are modified

### WordPress Projects

Create `.github/workflows/coding-standards.yml` in your WordPress project:

```yaml
name: Coding Standards

on:
  pull_request:
    paths:
      - '**.php'
      - '**.js'
      - 'composer.json'
      - 'composer.lock'
      - 'package.json'
      - 'package-lock.json'
      - '.github/workflows/coding-standards.yml'

jobs:
  coding-standards:
    uses: cosmicgiant/coding-standards/.github/workflows/coding-standards.yml@main
    with:
      project-type: wordpress
      php-version: '7.4'  # Optional, defaults to 7.4 for WordPress
```

**What this does:**
1. Triggers only when PHP/JS files or dependency files change
2. Automatically installs your project's dependencies
3. Runs PHPCS using the WordPress ruleset on changed PHP files
4. Runs ESLint on changed JavaScript files
5. Shows violations inline in the PR

### Laravel Projects

Create `.github/workflows/coding-standards.yml` in your Laravel project:

```yaml
name: Coding Standards

on:
  pull_request:
    paths:
      - '**.php'
      - '**.js'
      - '**.vue'  # Include Vue files if using Laravel + Vue
      - 'composer.json'
      - 'composer.lock'
      - 'package.json'
      - 'package-lock.json'
      - '.github/workflows/coding-standards.yml'

jobs:
  coding-standards:
    uses: cosmicgiant/coding-standards/.github/workflows/coding-standards.yml@main
    with:
      project-type: laravel
      php-version: '8.4'  # Optional, defaults to 8.4 for Laravel
```

**What this does:**
1. Triggers only when PHP/JS/Vue files or dependency files change
2. Automatically installs your project's dependencies
3. Runs PHPCS using the Laravel ruleset on changed PHP files
4. Runs ESLint on changed JavaScript/Vue files
5. Shows violations inline in the PR

### Workflow Options

- `project-type` (required): `wordpress` or `laravel`
- `php-version` (optional): Override default PHP version
- `node-version-file` (optional): Path to `.nvmrc` file (default: `.nvmrc`)
- `run-javascript-standards` (optional): Run ESLint checks (default: `true`)
- `phpcs-path` (optional): Custom PHPCS binary path (default: `vendor/bin/phpcs`)

### Advanced Examples

**Skip JavaScript checks:**

```yaml
jobs:
  coding-standards:
    uses: cosmicgiant/coding-standards/.github/workflows/coding-standards.yml@main
    with:
      project-type: wordpress
      run-javascript-standards: false
```

**Custom PHPCS path (for projects with vendor in subdirectory):**

```yaml
jobs:
  coding-standards:
    uses: cosmicgiant/coding-standards/.github/workflows/coding-standards.yml@main
    with:
      project-type: wordpress
      phpcs-path: 'includes/vendor/bin/phpcs'
```

**Run on specific branches only:**

```yaml
on:
  pull_request:
    branches:
      - main
      - develop
    paths:
      - '**.php'
      - '**.js'
```


## Customization

### Extending Rulesets

You can extend the base rulesets and add your own custom rules:

```xml
<?xml version="1.0"?>
<ruleset name="My Custom Project">
	<!-- Use the base ruleset -->
	<rule ref="./vendor/cosmicgiant/coding-standards/CosmicGiant/ruleset-wordpress.xml"/>

	<!-- Add custom rules -->
	<rule ref="Generic.Commenting.Todo"/>

	<!-- Exclude specific directories -->
	<exclude-pattern>/build/*</exclude-pattern>

	<!-- Override a rule severity -->
	<rule ref="WordPress.NamingConventions.ValidVariableName">
		<type>error</type>
	</rule>
</ruleset>
```

### Excluding Specific Rules

To disable a rule entirely:

```xml
<rule ref="./vendor/cosmicgiant/coding-standards/CosmicGiant/ruleset-wordpress.xml">
	<exclude name="WordPress.Files.FileName"/>
</rule>
```


## Key Differences: WordPress vs Laravel

| Aspect | WordPress | Laravel |
|--------|-----------|---------|
| **Base Standard** | WordPress-Core | PSR-2 |
| **PHP Version** | 5.6+ | 8.4+ |
| **Indentation** | Tabs | Tabs |
| **Spacing in Parentheses** | Yes (via custom rules) | Yes (via custom rules) |
| **Type Hints** | Optional | **Required** (enforced via Slevomat) |
| **Array Syntax** | Flexible (`array()` or `[]`) | **Short only** (`[]`) |
| **Array Alignment** | **Required** (auto-fixable) | **Required** (auto-fixable) |
| **Trailing Commas** | Not required | **Required** in multi-line arrays |
| **Import Sorting** | Not enforced | **Alphabetical** (required) |
| **Null-Safe Operator** | N/A | Suggested (PHP 8.0+) |
| **WordPress-Specific Rules** | Extensive (with exclusions) | None |
| **Class Organization** | Not enforced | **Strict** (via Slevomat ClassStructure) |
| **ESLint Base** | WordPress plugin | eslint:recommended |


## Design Decisions

### Why Tabs?

Tabs provide better accessibility, allowing developers to set their preferred indentation width. They also align with WordPress coding standards.

### Why Spaces Inside Parentheses?

We find `if ( $condition )` more readable than `if ($condition)`, especially for function calls with multiple arguments: `my_function( $arg1, $arg2 )`.

### Why Warnings vs Errors?

We set many formatting preferences as warnings to allow flexibility during development while still highlighting potential issues. This prevents blocking commits for subjective style choices.

### Why Exclude Certain WordPress Rules?

- **Yoda Conditions**: Not enforced (`$var === 5` instead of `5 === $var`)
- **Strict Comparisons**: Allowed loose comparisons where appropriate
- **Variable Naming**: More flexible than strict snake_case

### Why Array Alignment?

We require array items to be aligned for better readability and consistency:

```php
// Required format
$config = [
	'name'        => 'Test',
	'description' => 'This is a longer description',
	'enabled'     => true,
];

// Not allowed (unaligned)
$config = [
	'name' => 'Test',
	'description' => 'This is a longer description',
	'enabled' => true,
];
```

Benefits:
- **Easier to scan**: Aligned values are visually grouped together
- **Easier to diff**: Changes to array values don't affect surrounding lines
- **Auto-fixable**: `phpcbf` can automatically align arrays for you
- **Consistent**: All arrays follow the same visual pattern

Both WordPress and Laravel standards enforce this rule.

### Why Slevomat for Laravel?

Slevomat Coding Standard provides advanced PHP rules that leverage modern PHP 8+ features like:
- Type hint enforcement
- Class organization
- Import management
- Trailing commas
- Null-safe operators


## Development

### Testing the Rulesets

```bash
# Install dependencies
composer install

# Test WordPress ruleset
vendor/bin/phpcs --standard=CosmicGiant/ruleset-wordpress.xml path/to/file.php

# Test Laravel ruleset
vendor/bin/phpcs --standard=CosmicGiant/ruleset-laravel.xml path/to/file.php
```

### Testing ESLint Configurations

```bash
# Test WordPress config
npx eslint --config packages/eslint-config-wordpress/.eslintrc.js path/to/file.js

# Test Laravel config
npx eslint --config packages/eslint-config-laravel/.eslintrc.js path/to/file.js
```


## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with both WordPress and Laravel projects
5. Submit a pull request


## License

MIT License - Copyright (c) CosmicGiant


## Support

For issues or questions:
- Open an issue on GitHub
- Contact the development team at CosmicGiant


## Resources

- [WordPress Coding Standards](https://developer.wordpress.org/coding-standards/)
- [PSR-2: Coding Style Guide](https://www.php-fig.org/psr/psr-2/)
- [PHP_CodeSniffer](https://github.com/squizlabs/PHP_CodeSniffer)
- [Slevomat Coding Standard](https://github.com/slevomat/coding-standard)
- [ESLint](https://eslint.org/)
