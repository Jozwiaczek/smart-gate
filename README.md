# [Smart Gate](https://github.com/Jozwiaczek/smart-gate)

![CI](https://github.com/Jozwiaczek/smart-gate/workflows/Continuous%20Integration/badge.svg)

## 🚩 Table of Contents

- [Getting started](#-getting-started)
  - [Prerequisites](#-prerequisites)
  - [Installation](#-installation)
- [Packages Docs](#-packages-docs)
- [Conventional Commits](#-conventional-commits)
- [Available scripts](#-available-scripts)
- [Useful docs](#-useful-docs)

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/en/) >= 12
- [Yarn](https://classic.yarnpkg.com/lang/en/) >=1.22

### Installation

```shell script
yarn
```

## 📦 Packages Docs

- Backend:
  - [Api](./packages/api/README.md)
- Frontend:
  - [Client](./packages/client/README.md)
  - [Admin](./packages/admin/README.md)

## 📏 Conventional Commits

Commitlint checks if your commit messages meet the [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) format.
Also it requires package scope (https://www.npmjs.com/package/@commitlint/config-lerna-scopes).

Structure:

```git
type(package-name): general info
```

Structure with more inforamtion:

```git
type(package-name): general info

- add login panel
- add avatar
```

Example:

```git
feat(smart-gate-api): add comment section
```

Common types according to commitlint-config-conventional (based on the Angular convention) can be:
[conventional-commit-types](https://github.com/commitizen/conventional-commit-types/blob/master/index.json).
Header (first line) must not be longer than 100 characters.

For just validating your commit message without commiting it use terminal:

```shell
echo 'foo: bar' | commitlint
```

## Available scripts

To run script, in terminal type `yarn {script}`.

| Script            | Description                                               | Note                                       |
| ----------------- | --------------------------------------------------------- | ------------------------------------------ |
| `check`           | Runs linter, prettier, tests and ts-check in all packages |                                            |
| `preinstall`      | Checks is yarn was used package manager                   | It runs automatically before every install |
| `lint`            | Checks linter rules                                       |                                            |
| `lint:fix`        | Fix linter                                                |                                            |
| `prettier`        | Checks prettier rules                                     |                                            |
| `prettier:fix`    | Fix prettier                                              |                                            |
| `sortPackageJson` | Sort alphabetical all package.json in project             |                                            |
| `test`            | Runs tests for all packages                               |                                            |
| `type-check`      | Checks TypeScript types for all packages                  |                                            |

## Useful docs
