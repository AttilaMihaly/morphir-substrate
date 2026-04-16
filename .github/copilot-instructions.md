# Copilot Instructions

These instructions guide contributions to the substrate language specification.

## Specification Structure

- All specification files live under `specs/`.
- `specs/vision.md` describes the high-level vision. Do not repeat its content elsewhere.
- `specs/language.md` provides a high-level index of all language modules. Update it when adding or renaming modules.
- Language modules live under `specs/language/`. Each module is a single markdown file covering one type or type class.

## File Naming

- Use lowercase for single-word module names (e.g., `boolean.md`, `number.md`).
- Use dash-separated lowercase for multi-word names (e.g., `ordering-relation.md`).

## Module Types

### Types

Describe a concrete data type. Structure:

1. **Overview** — what the type represents.
2. **Member Values** — each value with a one-line description.
3. **Type Class Instances** — which type classes this type implements, with links.

### Type Classes

Describe a shared interface analogous to Haskell type classes, without type theory. Structure:

1. **Overview** — what the type class abstracts; list any extended type classes with links.
2. **Operations** — one subsection per operation (see below).

## Operations

- Every operation gets its own `###` subsection, even if it results in more content.
- Mark each operation as _Required_ or _Derived_.
- Derived operations must reference the required operation(s) they are defined in terms of.
- Each operation section includes a truth table or example table that provides full-coverage test cases.
- All operations that return a truth value must declare [Boolean](../specs/language/expressions/boolean.md) as the return type.

## Cross-References

- Always use relative markdown links when referencing other modules (e.g., `[Boolean](boolean.md)`).
- Use anchor links when referencing a specific section within a module (e.g., `[Less](ordering-relation.md#less)`).
- Every reference to a type, operation, or module in prose should be a link to its definition. Links are the primary mechanism for attaching semantic meaning to the document.

## Markdown Syntax

- Use native markdown syntax wherever possible.
- Only use extended syntax that is broadly supported, with GitHub-flavored Markdown (GFM) as the primary compatibility target.
- Do not use features unsupported by GitHub rendering (e.g., inline footnotes with `^[...]`). Use reference-style footnotes (`[^label]`) when footnotes are needed.

## Content Guidelines

- Describe semantics only. Do not include language syntax.
- Be succinct without losing accuracy.
- Preconditions (e.g., non-zero divisor) must be stated explicitly in the operation description.
- Algebraic laws (e.g., identity, inverse) should be stated where they clarify the operation's meaning.

## Markdown Validation

After editing any markdown file, always run the lint scripts to verify correctness:

- `npm run lint:md` — checks formatting rules via markdownlint.
- `npm run lint:links` — checks that all internal links and anchors resolve.
- `npm run lint` — runs both checks in sequence.

Fix any errors reported before considering the edit complete.
