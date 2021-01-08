# [Smart Gate](https://github.com/Jozwiaczek/smart-gate)

![CI](https://github.com/Jozwiaczek/smart-gate/workflows/Continuous%20Integration/badge.svg)

## 🚩 Table of Contents

- [Getting started](#-getting-started)
  - [Prerequisites](#-prerequisites)
  - [Installation](#-installation)
  - [Prepare and fill secrets](#-prepare-and-fill-secrets)
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

### Prepare and fill secrets

Copy and paste .env.example into .env.development and fill all secrets.

> **Note:** In order to expose a variable to the browser you have to prefix the variables with `NEXT_PUBLIC_`

| Secret  | Description                  |
| ------- | ---------------------------- |
| API_URL | Api url (without `/graphql`) |

## 📏 Conventional Commits

Commitlint checks if your commit messages meet the [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) format.

Example:

```git
feat(blog): add comment section
```

Common types according to commitlint-config-conventional (based on the Angular convention) can be:
[conventional-commit-types](https://github.com/commitizen/conventional-commit-types/blob/master/index.json)

## Available scripts

To run script, in terminal type `yarn {script}`.

| Script                            | Description                                                      | Note                                         |
| --------------------------------- | ---------------------------------------------------------------- | -------------------------------------------- |
| `prebuild`                        | Runs yarn clean                                                  | It runs automatically before every build     |
| `build`                           | Builds app in prod mode                                          |                                              |
| `build:dev`                       | Builds app in dev mode                                           |                                              |
| `check`                           | Runs linter, prettier and ts check                               |                                              |
| `clean`                           | Removes build directory if it exists                             |                                              |
| `graphql:generate-typedefs`       | Generates ts types and resources hooks based on graphql endpoint | For more details check `graphql-codegen.yml` |
| `graphql:generate-typedefs:watch` | Runs type generation in watch mode                               |                                              |
| `preinstall`                      | Checks is yarn was used package manager                          | It runs automatically before every install   |
| `lint`                            | Checks linter rules                                              |                                              |
| `lint:fix`                        | Fix linter                                                       |                                              |
| `prettier`                        | Checks prettier rules                                            |                                              |
| `prettier:fix`                    | Fix prettier                                                     |                                              |
| `serve:build`                     | Serves locally app from build directory                          | Before serve, run `yarn build`               |
| `serve:coverage`                  | Serves locally coverage from tests                               | Before serve, run `yarn test:coverage`       |
| `sort:packageJson`                | Sort alphabetical all package.json in project                    | It runs automatically on every push          |
| `start`                           | Starts app locally                                               |                                              |
| `start:prod`                      | Starts app locally in prod mode                                  |                                              |
| `test`                            | Runs test for utils and helpers                                  |                                              |
| `test:coverage`                   | Runs test in coverage mode                                       |                                              |
| `test:watch`                      | Runs test in watch mode for all tests                            |                                              |
| `type-check`                      | Checks TypeScript types                                          |                                              |

## Useful docs
