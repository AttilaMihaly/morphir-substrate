# Packages

A substrate package is a directory of markdown files (and any accompanying
alternative-format artifacts) intended to be reused by other corpora. The
package system exists so that cross-repository markdown links resolve
reliably without extending markdown itself: dependencies are vendored into
a conventional directory, and authors write ordinary relative links through
that directory.

No custom link protocol is introduced. No build step rewrites author-written
markdown. Tooling provides installation, version resolution, and link
validation; everything else is plain markdown.

## Package Identity

A package is identified by `@<github-org>/<repo>`, matching the GitHub
repository that hosts it. GitHub serves as the registry; there is no
separate namespace or central server to operate.

A package version is a git tag on the source repository, interpreted as
[semver](https://semver.org). A tag `v0.1.3` satisfies a manifest entry
of `^0.1.0`. Tags without a leading `v` are accepted.

## Directory Layout

A corpus that depends on one or more packages has the following layout:

```text
├── substrate.toml               # manifest
├── substrate.lock               # lockfile
├── substrate/
│   └── packages/
│       └── @<scope>/
│           └── <name>/          # vendored package contents
└── <corpus's own content>
```

The `substrate/` parent directory is reserved for substrate tooling
artifacts and is committed to the repository alongside everything else.
The `substrate/packages/` subdirectory contains the full contents of each
installed package under a `@<scope>/<name>/` path.

All three artifacts — `substrate.toml`, `substrate.lock`, and the entire
`substrate/packages/` tree — are committed. GitHub renders cross-package
links natively because the target files are present at the expected paths.
Updating a dependency is an explicit commit with a reviewable diff.

## Manifest

The manifest is `substrate.toml` at the corpus root:

```toml
[package]
name = "@MyOrg/fr2052a-lcr"
version = "0.1.0"

[dependencies]
"@AttilaMihaly/morphir-substrate" = "^0.1.0"
```

The `[package]` table declares this corpus's own identity and version.
A corpus that is not itself published may omit `version`.

The `[dependencies]` table lists each required package and a semver range.
Keys are the full scoped package name; values are semver ranges following
standard operators (`^`, `~`, `>=`, exact).

## Lockfile

The lockfile is `substrate.lock` at the corpus root. It records the
resolved version of every dependency and is managed by tooling:

```toml
[[packages]]
name = "@AttilaMihaly/morphir-substrate"
requested = "^0.1.0"
resolved = "0.1.3"
commit = "ef7d96a1b2c3d4e5f6..."
integrity = "sha256-..."
```

`requested` copies the manifest range. `resolved` is the concrete version
selected. `commit` is the full git SHA of the resolved tag. `integrity`
is a hash of the installed package contents, used to detect tampering or
accidental edits to vendored files.

## Authoring Cross-Package Links

Authors write ordinary markdown links — inline or reference-style —
using relative paths through `substrate/packages/`. The existing
[link reference conventions](../language.md#link-references) apply
unchanged:

```markdown
Retail Outflow Rate uses a [Decision Table][dt] over [records][rec].

[dt]: substrate/packages/@AttilaMihaly/morphir-substrate/specs/language/concepts/decision-table.md
[rec]: substrate/packages/@AttilaMihaly/morphir-substrate/specs/language/concepts/record.md
```

Link paths are the author's responsibility. Tooling does not rewrite
them. Reference-style definitions keep the verbose paths out of the
prose.

## Exports

Every markdown file within an installed package is addressable from
depending corpora. Packages do not declare an explicit exports list;
any file a consumer chooses to link to is part of the public surface.
Package authors who wish to signal a narrower intended surface should
do so through package documentation rather than enforcement.

## Commands

### `substrate install`

Reads `substrate.toml` and `substrate.lock` (if present) and populates
`substrate/packages/` so that every declared dependency is present at
its expected path.

When `substrate.lock` is absent, versions are resolved from the
manifest ranges against each dependency's available git tags, the
lockfile is written, and the resolved versions are installed.

When `substrate.lock` is present, it is authoritative: the exact
`resolved` versions are installed. The lockfile is regenerated only by
`substrate update`.

The command is idempotent: running it repeatedly with an unchanged
manifest and lockfile yields no changes.

### `substrate update [<package>]`

Bumps the resolved version of the named package (or of every
dependency, when no package is named) to the latest git tag that
satisfies the manifest's semver range. Rewrites `substrate.lock`,
updates the vendored contents under `substrate/packages/`, and leaves
the working tree staged for review and commit.

### `substrate validate`

Walks every markdown file in the corpus and verifies that every link
target exists on disk. Applies to both inline links and reference-style
definitions. Reports unresolved links and exits with code `1` if any
are found.

Validation is the safety net for manually authored reference
definitions: any typo or stale path after an update surfaces here.
Validation checks link resolution only; it does not verify lockfile
integrity or semver constraints at this stage.

### `substrate publish`

Prepares the corpus for release:

1. Confirms `substrate.toml` and `substrate.lock` are committed and the
   working tree is clean.
2. Runs `substrate validate` and aborts on any failure.
3. Creates a git tag matching the `[package].version` field and pushes
   it to the origin remote.

Publishing does not interact with any central registry. Consumers
depend on the tagged commit directly via their own manifest.
