---
title: Server
sidebar_position: 3
---

# Setup Guide - Server

In this section you will deploy your own instance of Smart Gate Server.

## Before deploy

### Sendgrid

### Sentry (Optional)

## Deploy

:::caution
In order to login into your application you still have to deploy server which is described in next section.
:::

### Heroku 1-click deploy (Recommended)

Click the button below to deploy `api package` with predefined [Heroku](https://www.heroku.com) template.

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/Jozwiaczek/smart-gate)

### Custom deploy

Smart Gate server is Node.js server, so you should be able to deploy it by your own using your preferable methods and services.
Source code of server you will find in repository `smart-gate/packages/api`.
In order to build package use `yarn build` command and `yarn start:prod` to start server.

Keep in mind that you still have to deliver `REACT_APP_API_URL` secret ENV for client package(Application) in order to establish connection.
Check more details in [After Deploy](#after-deploy) section.

## After Deploy
