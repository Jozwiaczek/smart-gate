<h1 align="center">Smart Gate</h1>

<p align="center">
    <a href="https://github.com/Jozwiaczek/smart-gate">
        <img src="./readme-logo.png" alt="smart gate logo" width="120px" height="120px"/>
    </a>
    <br>
    <i>🔐 System for handling access to any physical entry gate.</i>
    <br>
    <br>
    <i>Created by <b>Jakub Jóźwiak</b> and <b>Mateusz Nestorowicz</b></i>
</p>

<p align="center">
    Live app:
    <a href="https://smart-gate.netlify.app/"><strong>smart-gate.netlify.app</strong></a>
    <br>
    <br>
    UI/UX:
    <a href="https://www.figma.com/file/MqlnLhknWh1u0Ho8z1Oefe/Smart-Gate?node-id=0%3A1"><strong>figma.com/smart-gate</strong></a>
    <br>
    <br>
    PRD:
    <a href="https://docs.google.com/document/d/14E-0rzD669n-rqC-OYjqsSLxrUU7D3bg7K5M9_AFOvs/edit#heading=h.gqa5vpc8p3qt"><strong>docs.google.com</strong></a>
</p>

<hr>

[![Netlify Status](https://api.netlify.com/api/v1/badges/426cfdcb-e5e4-4067-97f2-c6106bde9195/deploy-status)](https://app.netlify.com/sites/smart-gate/deploys)
![CI](https://github.com/Jozwiaczek/smart-gate/workflows/Continuous%20Integration/badge.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/Jozwiaczek/smart-gate)
[![CodeFactor](https://www.codefactor.io/repository/github/jozwiaczek/smart-gate/badge)](https://www.codefactor.io/repository/github/jozwiaczek/smart-gate)

## 🚩 Table of Contents

- [About](#-about)
- [Getting started](#-getting-started)
  - [Prerequisites](#-prerequisites)
  - [General installation](#-general-installation)
- [Packages Docs](#-packages-docs)
- [Conventional Commits](#-conventional-commits)
- [Hygen - Code generator](#-hygen-code-generator)
- [Available scripts](#-available-scripts)
- [License](#-license)

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
| client  | `hygen:element` | Creates new standardize React component, story and style file |

## 📝 Available scripts

To run script, in terminal type `yarn {script}`.

| Script              | Description                                               | Note                                       |
| ------------------- | --------------------------------------------------------- | ------------------------------------------ |
| `build`             |                                                           |                                            |
| `check`             | Runs linter, prettier, tests and ts-check in all packages |                                            |
| `ci:setup:db`       | Creates mock database for continous integration           | It's should be used only by Github Actions |
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

Copyright 2020 Jakub Jóźwiak.
Licensed under the [MIT license](LICENSE).
