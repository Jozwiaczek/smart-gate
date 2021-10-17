---
title: Application
sidebar_position: 2
---

# Setup Guide - Application

In this section you will deploy your own instance of Smart Gate Web Application.

## Deploy

:::caution
In order to login into your application you still have to deploy server which is described in next section.
:::

### Netlify 1-click deploy (Recommended)

[Netlify](https://www.netlify.com/) is a web hosting infrastructure and automation technology company based in San Francisco.

In case of deploying Smart Gate application it assumes usage of `Starter plan` which is **completely free**.
More details about Netlify pricing plans you can find [here](https://www.netlify.com/pricing/).

It automatically takes predefined Smart Gate configuration and just deploy your site without any further steps ✨

---

To deploy you application you must have your [GitHub](https://github.com) account or [create new account](https://github.com/signup) for free.

Click the button below to deploy your application with predefined template.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Jozwiaczek/smart-gate)

After successful deployment you should be able to enter to your newly created page.
The link to your site you will find in Netlify `Site overview`.

:::tip
From default your application will have auto-generated site name, but you can change that in Netlify `Site settings`,
under `Site information` section.
:::

### Custom deploy

Smart Gate application is just a React web application, so you should be able to deploy it by your own using your preferable methods and services.
Source code of application you will find in repository `smart-gate/packages/client`.
In order to build package use `yarn build` command.

Keep in mind that you still have to deliver `REACT_APP_API_URL` secret ENV for this package in order to establish connection with server.
Check more details in [After Server Deploy](#after-server-deploy) section.

## After Server Deploy

In order to get access to application you also need to provide Server URL for your application.

**TODO**

## PWA

Thanks to the [Progressive Web App (PWA)](https://web.dev/progressive-web-apps/) approach in Smart Gate, the application works as something in the middle of standard Web App and Native Mobile apps.
In short, it automatically caches content and works in any browser and delivers an option to install the app on your mobile home screen as well as on your desktop.

### How to add Smart Gate to mobile device home screen

#### iPhone or iPad

1. Launch “Safari” app. This does not work from the “Chrome” app.
2. Enter into the address field the URL of the website you want to create a shortcut to. Tap “Go.”
3. Tap the icon featuring a right-pointing arrow coming out of a box along the top of the Safari window to open a drop-down menu.
4. Tap “Add to Home Screen.” The Add to Home dialog box will appear, with the icon that will be used for this website on the left side of the dialog box.
5. Enter the name for the shortcut using the on-screen keyboard and tap “Add”. Safari will close automatically, and you will be taken to where the icon is located on your iPad’s desktop.

#### Android

1. Launch “Chrome” app.
2. Open the website or web page you want to pin to your home screen.
3. Tap the menu icon (3 dots in upper right-hand corner) and tap Add to homescreen.
4. You’ll be able to enter a name for the shortcut and then Chrome will add it to your home screen.
