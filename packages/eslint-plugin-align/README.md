# @cosmicgiant/eslint-plugin-align

Assignment and import alignment rules for ESLint 8, 9, and 10.

## Why this exists

The shared configs previously used `eslint-plugin-align-assignments` and
`eslint-plugin-align-import`. Both were last published in May 2022 and crash on
ESLint 9+ with `TypeError: context.getSourceCode is not a function` — that
accessor was removed in ESLint 9. Neither has a maintained replacement, and no
rule in ESLint core or `@stylistic/eslint-plugin` aligns assignments or
import `from` clauses.

Rather than drop the alignment style — the JavaScript counterpart to the
`WordPress.Arrays.MultipleStatementAlignment` PHP rule — the rules are vendored
here with the minimum changes needed to run on current ESLint.

Changes from upstream:

- `context.getSourceCode()` → `context.sourceCode || context.getSourceCode()`,
  so the rules work on ESLint 8 through 10.
- `align-assignments` gained a `meta.schema` for its `requiresOnly` option.
  ESLint 9+ rejects options on any rule that does not declare a schema, so
  upstream's rule could not accept the option the shared configs pass.

Rule logic is otherwise unmodified. See `LICENSE` for upstream attribution.

## Rules

| Rule | Fixable | Description |
|------|---------|-------------|
| `align/align-assignments` | ✓ | Aligns `=` within a group of consecutive assignments |
| `align/align-import` | ✓ | Aligns the `from` clause across a block of imports |
| `align/trim-import` | ✓ | Removes stray spacing around the `import` keyword |

`align-assignments` accepts `{ requiresOnly: boolean }` — when `true`, only
groups containing `require(` are aligned.

## Usage

You do not normally reference this plugin directly; the shared configs wire it
up. To use it standalone in a flat config:

```js
import align from '@cosmicgiant/coding-standards/packages/eslint-plugin-align/index.js';

export default [
	{
		plugins: { align },
		rules:   {
			'align/align-assignments': [ 'warn', { requiresOnly: false } ],
			'align/align-import':      [ 'warn' ],
		},
	},
];
```
