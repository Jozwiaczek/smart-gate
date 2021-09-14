# Contributing to Smart Gate

## 🚩 Table of Contents

- [About](#-about)
- [Want to Help?](#-want-to-help)
- [Getting started](#-getting-started)
- [Packages Docs](#-packages-docs)
- [Conventional Commits](#-conventional-commits)
- [Hygen - Code generator](#-hygen-code-generator)
- [Available root scripts](#-available-root-scripts)

## About

👍🎉 First off, thanks for taking the time to contribute! 🎉👍

The following is a set of guidelines for contributing to Smart Gate and its packages. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Want to Help?

Want to file a bug, contribute some code, or improve documentation? Excellent!

Read up on our guidelines for contributing and then check out one of our issues labeled as [![Help Wanted](https://img.shields.io/github/issues/Jozwiaczek/smart-gate/help%20wanted.svg)](https://github.com/Jozwiaczek/smart-gate/issues?q=is%3Aopen+is%3Aissue+label%3A%22help-wanted%22) or [![Good First Issue](https://img.shields.io/github/issues/Jozwiaczek/smart-gate/good%20first%20issue.svg)](https://github.com/Jozwiaczek/smart-gate/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22).

## 🎓 Getting started

### Prerequisites

- [Node.js](https://nodejs.org/en/) >= 14
- [Yarn](https://classic.yarnpkg.com/lang/en/) >=1.22

### General project dependencies installation

```shell script
yarn
```

## 📦 Packages Docs

Each package have their own documentation in a README file with set of guidelines.

Check below list of packages for details:

- Backend:
  - [Api](./packages/api/README.md)
  - [Device](./packages/device/README.md)
- Frontend:
  - [Client](./packages/client/README.md)
- Utils:
  - [CI scripts](./packages/ci-scipts/README.md)
  - [E2E tests](./packages/e2e/README.md)

## 📏 Conventional Commits

Commitlint checks if your commit messages meet the [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) format.
Also it requires [package scope](https://www.npmjs.com/package/@commitlint/config-lerna-scopes).

**Structure:**

```git
type(package-name): general info
```

**Structure with more inforamtion:**

```git
type(package-name): general info

- add login panel
- add avatar
```

**Examples:**

```git
feat(api): add comment section
```

```git
fix(client): flickering header
```

Common types according to commitlint-config-conventional (based on the Angular convention) can be:
[conventional-commit-types](https://github.com/commitizen/conventional-commit-types/blob/master/index.json).
Header (first line) must not be longer than 100 characters.

For just validating your commit message without commiting it use terminal:

```shell
echo 'foo: bar' | commitlint
```

## 🤖 Hygen - Code generator

Hygen is the cli dev tool that provides the ability for generating scalable code.
All code generation templates are defined in the `__template` directory.
Remember to add created model to git files (typically those files are excluded from default).

It is completly optional but in long term it is very helpful.

For more details check [Hygen docs](https://www.hygen.io/docs/quick-start/).

### Available generators:

| Package | Script          | Description                                                               |
| ------- | --------------- | ------------------------------------------------------------------------- |
| client  | `hygen:element` | Creates new standardize React component, story and style file             |
| client  | `hygen:icon`    | Creates new standardize Icon component and adds it to the main icon story |
| client  | `hygen:util`    | Creates new standardize helper function in util directory                 |

## 📝 Available root scripts

Below you can find all scripts available in root [package.json](package.json).

In general all packages have their own scripts, but here you can find all general propouse project scripts.

To run script, in terminal type `yarn {script}`.

| Script               | Description                                               | Note                                       |
| -------------------- | --------------------------------------------------------- | ------------------------------------------ |
| `build`              | Builds all packages                                       |                                            |
| `check`              | Runs linter, prettier, tests and ts-check in all packages |                                            |
| `heroku-postbuild`   | It runs on heroku before api build                        |                                            |
| `preinstall`         | Checks is yarn was used package manager                   | It runs automatically before every install |
| `lint`               | Checks linter rules                                       |                                            |
| `lint:fix`           | Fix linter                                                |                                            |
| `prettier`           | Checks prettier rules                                     |                                            |
| `prettier:fix`       | Fix prettier                                              |                                            |
| `prepare`            | Install husky                                             | It runs automatically after every install  |
| `removeNodeModules`  | Remove all node_modules from project (all packages)       | Works only for linux systems               |
| `removeEslintCaches` | Remove all Eslint cache from project (all packages)       | Works only for linux systems               |
| `sortPackageJson`    | Sort alphabetical all package.json in project             |                                            |
| `start`              | Used to run api package on heroku                         |                                            |
| `start:ci`           | Start concurrently api and client in test mode            |                                            |
| `test`               | Runs tests for all packages                               |                                            |
| `type-check`         | Checks TypeScript types for all packages                  |                                            |
