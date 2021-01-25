# API

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# DB

Postgresql and PgAdmin powered by the docker compose

## Requirements:

- docker >= 17.12.0+
- docker-compose

## Quick Start

- Run this command `docker-compose up -d`
- For stopping container run `docker-compose down`

## Environments

This composes file contains the following environment variables:

- `POSTGRES_USER` the default value is **postgres**
- `POSTGRES_PASSWORD` the default value is **changeme**
- `PGADMIN_PORT` the default value is **5050**
- `PGADMIN_DEFAULT_EMAIL` the default value is **pgadmin4@pgadmin.org**
- `PGADMIN_DEFAULT_PASSWORD` the default value is **admin**

## Access to postgres:

- `localhost:5432`
- **Username:** postgres (as a default)
- **Password:** changeme (as a default)

## Access to PgAdmin:

- **URL:** `http://localhost:5050`
- **Username:** pgadmin4@pgadmin.org (as a default)
- **Password:** admin (as a default)

## Add a new server in PgAdmin:

- **Host name/address** `postgres`
- **Port** `5432`
- **Username** as `POSTGRES_USER`, by default: `postgres`
- **Password** as `POSTGRES_PASSWORD`, by default `changeme`

## Drop local DB

```shell
docker-compose down --rmi all --volumes
```
