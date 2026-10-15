# CosmicGiant Oxlint Config - WordPress

The [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) form of
[`@cosmicgiant/eslint-config-wordpress`](../eslint-config-wordpress). Same rules, same
severities, same autofix output, for projects that lint with Oxlint or
[Vite+](https://viteplus.dev/guide/lint) (`vp lint`) instead of ESLint.

## What is in the package

| File | Purpose |
|------|---------|
| `.oxlintrc.json` | The rule set. The single source of truth. |
| `index.js` | The same config as a JS object, with the local plugin paths made absolute. This is what a `vite.config.js` lint block spreads. |
| `plugin.js` | JS plugin `cosmicgiant`, holding ESLint core rules Oxlint does not implement (currently `camelcase`). |
| `lib/rules/camelcase.js` | ESLint's `camelcase` rule, vendored (MIT). |

The alignment rules come from the sibling package
[`../eslint-plugin-align`](../eslint-plugin-align), loaded by relative path. It needs no
install of its own.

## How the ESLint config maps over

- **Native Oxlint rules.** The core, `import`, `jsdoc`, `react` (including the hooks
  rules) and `jsx-a11y` rules from `@wordpress/eslint-plugin`'s
  `recommended-with-formatting` run natively. `no-undef` and `import/named` are nursery
  rules in Oxlint and are switched on by name.
- **`@wordpress/eslint-plugin`**, loaded as a JS plugin, for the WordPress-only rules
  (i18n, `valid-sprintf`, `no-unsafe-wp-apis` and the rest).
- **`@stylistic/eslint-plugin`**, loaded as a JS plugin, for every formatting rule.
  Oxlint does not implement ESLint's deprecated formatting rules, and
  `@stylistic/eslint-plugin` is their maintained continuation. The house overrides keep
  their ESLint options: `key-spacing` (mode `minimum`, align `value`),
  `no-multi-spaces` (VariableDeclarator and ImportDeclaration exceptions),
  `no-multiple-empty-lines`, `padded-blocks`, all at warn.
- **`align/align-assignments`** (`requiresOnly: false`) and **`align/align-import`**,
  at warn, with the same rule names as under ESLint.
- **`cosmicgiant/camelcase`** at warn, with `properties: 'never'` as WordPress sets it.
- **Globals**: the browser and Node environments plus `wp`, `gform` and `ajaxurl`.
- **jsdoc settings**: `@return`/`@yield` tag names and the `Object`/`boolean`
  preferred types, as in the WordPress config.

### Rules that did not carry over

| ESLint rule | Why |
|-------------|-----|
| `import/no-unresolved`, `import/no-extraneous-dependencies` | Not implemented in Oxlint. The ESLint config only produced resolver noise with them (`import/resolver: 'webpack'` cannot resolve a Vite project). |
| `jsdoc/no-undefined-types`, `jsdoc/valid-types`, `jsdoc/check-types`, `jsdoc/check-param-names`, `jsdoc/check-alignment`, `jsdoc/check-line-alignment`, `jsdoc/multiline-blocks`, `jsdoc/no-multi-asterisks`, `jsdoc/tag-lines`, `jsdoc/reject-any-type`, `jsdoc/reject-function-type`, `jsdoc/require-returns-check`, `jsdoc/require-yields-check`, `jsdoc/require-next-type`, `jsdoc/escape-inline-tags`, `jsdoc/ts-no-empty-object-type` | Not implemented in Oxlint's native `jsdoc` plugin. Loading `eslint-plugin-jsdoc` as a JS plugin as well would clash with the native plugin name, so they are dropped. |
| `dot-notation` | Oxlint only has the type-aware `typescript/dot-notation`. |
| `no-dupe-args` | Not implemented in Oxlint, which treats it as superseded by strict mode (duplicate parameters are a syntax error in modules and classes). |
| `no-undef-init` | Not implemented in Oxlint. |
| `react/jsx-uses-react`, `react/jsx-uses-vars` | Not needed: Oxlint's `no-unused-vars` already counts JSX usage. |
| `react/no-deprecated` | Oxlint only has it through type-aware linting. |
| `react/jsx-indent` | Not loaded: `@stylistic/indent` already reports JSX indentation, and `@stylistic/jsx-indent` is deprecated and double-reports. |

Some rule names change, which matters for inline disable comments (Oxlint reads
`eslint-disable` comments) and for overrides:

- Formatting rules are `@stylistic/<name>`. `// eslint-disable-line key-spacing` no
  longer suppresses anything; write `// eslint-disable-line @stylistic/key-spacing`.
- Oxlint reserves the plugin name `eslint`, so `camelcase` is `cosmicgiant/camelcase`.
- Everything else keeps its ESLint name, including `align/*`, `@wordpress/*`,
  `jsdoc/*`, `jsx-a11y/*` and `react-hooks/*`.

## Installation

Projects get this package through Composer, which installs the whole repository under
`includes/vendor/cosmicgiant/coding-standards/` (or `vendor/cosmicgiant/coding-standards/`).
Nothing inside the vendored copy is npm-installed. The two JS plugins the config loads
by package name are peer dependencies, installed in the consuming project. Oxlint
resolves them from the vendored config's location upward, so they are found in the
project's root `node_modules`.

```bash
vp add -D @wordpress/eslint-plugin @stylistic/eslint-plugin
```

Or with npm:

```bash
npm install --save-dev @wordpress/eslint-plugin @stylistic/eslint-plugin oxlint
```

`@wordpress/eslint-plugin` declares `eslint` as a peer. pnpm and npm 7+ install it
automatically; it is only loaded as a library and never run as a linter. Vite+ projects
do not install `oxlint` themselves, since `vp lint` ships it.

## Usage

### Vite+ (`vp lint`)

Vite+ reads lint configuration from the `lint` block of `vite.config.js` and recommends
against a separate `.oxlintrc.json`. Spread the config into the block:

```js
import { defineConfig } from 'vite-plus';

import wordpress from './includes/vendor/cosmicgiant/coding-standards/packages/oxlint-config-wordpress/index.js';

export default defineConfig( {
	lint: {
		...wordpress,
		ignorePatterns: [ 'dist/**', 'includes/vendor/**' ],
	},
} );
```

Spread rather than `extends: [ wordpress ]`. Oxlint's `extends` does not carry `env`,
`globals` or `settings` over from the extended config, so with `extends` every
`window` and `document` reference fails `no-undef` and every `@return` tag fails
`jsdoc/check-tag-names`. The spread keeps them.

To change rules, spread the base values and add your own after them:

```js
lint: {
	...wordpress,
	globals:   {
		...wordpress.globals,
		cgcomAtlas: 'readonly',
	},
	rules:     {
		...wordpress.rules,
		'@wordpress/i18n-text-domain': [ 'error', { allowedTextDomain: 'my-text-domain' } ],
	},
	overrides: [
		...wordpress.overrides,
		{
			files: [ 'scripts/**' ],
			rules: { 'no-console': 'off' },
		},
	],
},
```

Then:

```bash
vp lint
vp lint --fix
```

### Oxlint on its own

Point Oxlint at the JSON config directly:

```bash
npx oxlint -c includes/vendor/cosmicgiant/coding-standards/packages/oxlint-config-wordpress/.oxlintrc.json src/js
npx oxlint -c includes/vendor/cosmicgiant/coding-standards/packages/oxlint-config-wordpress/.oxlintrc.json --fix src/js
```

To add project rules, write an `oxlint.config.mjs` that spreads `index.js` the same way
as the Vite+ example, and pass it with `-c`. A project `.oxlintrc.json` that `extends`
the JSON file loses `env`, `globals` and `settings`, for the reason given above.

## No Oxfmt

Oxfmt, Oxc's formatter, is not used here or in any project on this config. It cannot
align assignments or object values, which is the house style, and it would undo every
fix `align/*` and `key-spacing` make. Formatting comes from the linters' autofix:
`vp lint --fix` (or `oxlint --fix`) for JavaScript and `composer lint:fix` for PHP.
In Vite+ projects, leave the `fmt` block out of `vite.config.js` and do not run
`vp fmt` or `vp check --fix`.

## Keeping it in step with ESLint

`.oxlintrc.json` started from `npx @oxlint/migrate` run against
`../eslint-config-wordpress/index.js`, then was checked by hand. When the ESLint config
changes, change this one to match, then compare both on the same code. `vp lint --fix`
and `eslint --fix` with the ESLint config should leave identical files.
