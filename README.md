# [Smart Gate](https://github.com/Jozwiaczek/smart-gate)

> 🔐 System for handling access to any physical entry gate.

[![Netlify Status](https://api.netlify.com/api/v1/badges/426cfdcb-e5e4-4067-97f2-c6106bde9195/deploy-status)](https://app.netlify.com/sites/smart-gate/deploys)
![CI](https://github.com/Jozwiaczek/smart-gate/workflows/Continuous%20Integration/badge.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/Jozwiaczek/smart-gate)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FJozwiaczek%2Fsmart-gate.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FJozwiaczek%2Fsmart-gate?ref=badge_shield)

<a href="https://www.figma.com/file/MqlnLhknWh1u0Ho8z1Oefe/Smart-Gate?node-id=8%3A30">
  <img
    src="https://theme.zdassets.com/theme_assets/9325143/ec27c7adedf401a3bc21f3e389011dfad2caa67b.png"
    alt="Figma logo"
    width="auto"
  /> 
</a>

## 🚩 Table of Contents

- [About](#-about)
- [Getting started](#-getting-started)
  - [Prerequisites](#-prerequisites)
  - [General installation](#-general-installation)
- [Packages Docs](#-packages-docs)
- [Conventional Commits](#-conventional-commits)
- [Hygen - Code generator](#-hygen-code-generator)
- [Available scripts](#-available-scripts)

## 📖 About

System for managing and handling access to any physical entry home gate.

## 🎓 Getting started

### Prerequisites

- [Node.js](https://nodejs.org/en/) >= 12
- [Yarn](https://classic.yarnpkg.com/lang/en/) >=1.22

### General installation

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

## 🤖 Hygen - Code generator

Hygen is the cli dev tool that provides the ability for generating scalable code. All code generation templates are defined in the `__template` directory.
Remember to add created model to git files (typically those files are excluded from default).
For more details check [Hygen docs](https://www.hygen.io/docs/quick-start/).

### Available generators:

| Package | Script          | Description                                                   |
| ------- | --------------- | ------------------------------------------------------------- |
| admin   | `hygen:model`   | Creates selected views for admin model                        |
| client  | `hygen:element` | Creates new standardize React component, story and style file |

## 📝 Available scripts

To run script, in terminal type `yarn {script}`.

| Script              | Description                                               | Note                                       |
| ------------------- | --------------------------------------------------------- | ------------------------------------------ |
| `build`             |                                                           |                                            |
| `check`             | Runs linter, prettier, tests and ts-check in all packages |                                            |
| `heroku-postbuild`  | It runs on heroku before api build                        |                                            |
| `preinstall`        | Checks is yarn was used package manager                   | It runs automatically before every install |
| `lint`              | Checks linter rules                                       |                                            |
| `lint:fix`          | Fix linter                                                |                                            |
| `prettier`          | Checks prettier rules                                     |                                            |
| `prettier:fix`      | Fix prettier                                              |                                            |
| `removeNodeModules` | Remove all node_modules from project (all packages)       |                                            |
| `sortPackageJson`   | Sort alphabetical all package.json in project             |                                            |
| `start`             | Used to run api package on heroku                         |                                            |
| `test`              | Runs tests for all packages                               |                                            |
| `test:e2e`          | Runs end to end tests for all packages                    |                                            |
| `type-check`        | Checks TypeScript types for all packages                  |                                            |


## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FJozwiaczek%2Fsmart-gate.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FJozwiaczek%2Fsmart-gate?ref=badge_large)