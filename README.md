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
    Storybook:
    <a href="https://main--6059282c88843d002106b484.chromatic.com"><strong>smart-gate.chromatic.com</strong></a>
</p>

<hr>

[![Netlify Status](https://api.netlify.com/api/v1/badges/426cfdcb-e5e4-4067-97f2-c6106bde9195/deploy-status)](https://app.netlify.com/sites/smart-gate/deploys)
[![CI](https://github.com/Jozwiaczek/smart-gate/actions/workflows/continous_integration.yml/badge.svg?branch=dev)](https://github.com/Jozwiaczek/smart-gate/actions/workflows/continous_integration.yml)
[![GitHub last commit](https://img.shields.io/github/last-commit/Jozwiaczek/smart-gate)](https://github.com/Jozwiaczek/smart-gate/commits)
[![CodeFactor](https://www.codefactor.io/repository/github/jozwiaczek/smart-gate/badge)](https://www.codefactor.io/repository/github/jozwiaczek/smart-gate)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg)](#contributors-)
[![Star on GitHub](https://img.shields.io/github/stars/Jozwiaczek/smart-gate.svg?style=social)](https://github.com/Jozwiaczek/smart-gate)

## 🚩 Table of Contents

- [About](#-about)
- [Getting started](#-getting-started)
  - [Prerequisites](#-prerequisites)
  - [General installation](#-general-installation)
- [Packages Docs](#-packages-docs)
- [Conventional Commits](#-conventional-commits)
- [Hygen - Code generator](#-hygen-code-generator)
- [Available root scripts](#-available-root-scripts)
- [Changelog](#-changelog)
- [Contributors](#-contributors)
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
  - [Device](./packages/device/README.md)
- Frontend:
  - [Client](./packages/client/README.md)
- Utils:
  - [CI scripts](./packages/ci-scipts/README.md)
  - [E2E tests](./packages/e2e/README.md)

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

## 📝 Available root scripts

To run script, in terminal type `yarn {script}`.

| Script              | Description                                               | Note                                       |
| ------------------- | --------------------------------------------------------- | ------------------------------------------ |
| `build`             |                                                           |                                            |
| `check`             | Runs linter, prettier, tests and ts-check in all packages |                                            |
| `heroku-postbuild`  | It runs on heroku before api build                        |                                            |
| `preinstall`        | Checks is yarn was used package manager                   | It runs automatically before every install |
| `lint`              | Checks linter rules                                       |                                            |
| `lint:fix`          | Fix linter                                                |                                            |
| `stylelint`         | Checks stylelint rules for styled-components              |                                            |
| `prettier`          | Checks prettier rules                                     |                                            |
| `prettier:fix`      | Fix prettier                                              |                                            |
| `prepare`           | Install husky                                             | It runs automatically after every install  |
| `removeNodeModules` | Remove all node_modules from project (all packages)       |                                            |
| `sortPackageJson`   | Sort alphabetical all package.json in project             |                                            |
| `start`             | Used to run api package on heroku                         |                                            |
| `start:ci`          | Start concurrently api and client in test mode            |                                            |
| `test`              | Runs tests for all packages                               |                                            |
| `type-check`        | Checks TypeScript types for all packages                  |                                            |

## Changelog

[Learn about the latest improvements](CHANGELOG.md).

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/Jozwiaczek"><img src="https://avatars.githubusercontent.com/u/29049653?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jakub Jóźwiak</b></sub></a><br /><a href="https://github.com/Jozwiaczek/smart-gate/commits?author=Jozwiaczek" title="Code">💻</a> <a href="https://github.com/Jozwiaczek/smart-gate/commits?author=Jozwiaczek" title="Documentation">📖</a> <a href="#design-Jozwiaczek" title="Design">🎨</a> <a href="#ideas-Jozwiaczek" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-Jozwiaczek" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/Jozwiaczek/smart-gate/pulls?q=is%3Apr+reviewed-by%3AJozwiaczek" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/Mefjus"><img src="https://avatars.githubusercontent.com/u/29005327?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mefjus</b></sub></a><br /><a href="https://github.com/Jozwiaczek/smart-gate/commits?author=Mefjus" title="Code">💻</a> <a href="#ideas-Mefjus" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/Jozwiaczek/smart-gate/pulls?q=is%3Apr+reviewed-by%3AMefjus" title="Reviewed Pull Requests">👀</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## License

Copyright 2020 Jakub Jóźwiak.
Licensed under the [MIT license](LICENSE).
