---
sidebar_position: 1
---

# Overview

![Docs Version Dropdown](/img/banner-about.png)

:::tip Set up Guide
Wants to jump quickly into the setup guide? [Click here](guide/intro.md).
:::

Smart Gate is the complete system for building custom smart doors/locks/gates.
In other words, it's a set of free software packages (incl. application, server, device) which can be easy deployed for free on your own,
in order to connect them with your electric mechanism.

Due to the fact that Smart Gate is only the software part of this documentation, we will guide you,
what do you need and how to prepare the physical part of this project.

The whole concept might sound familiar to other commercial projects.
What's makes here the main difference is that everything is free and open for the community.
You can discover the whole code repository, diagrams, designs, and project backlog.
Besides visibility, you can even download the whole code and adjust for your own or just contribute to the project on GitHub.

## Main Features

- **Open from anywhere** - You can open your gate/door from anywhere in the world.
  Application will be available in your browser or after installation as a desktop or mobile app.
- **Manage and monitor all access** - Track detailed history with details about who and when unlocked lock.
  As an admin user you will have also accessed to more device logs and events.
- **Desktop access** -
  Smart Gate is designed to be accessible on every device.
  You can quickly open the app from a desktop browser, on a tablet, same as on mobile.
- **Monitor your device** - Monitor the health of your Raspberry Pi from the app.
  You can track in real-time details like temperature, ram usage, Wi-Fi connection, or logs.
- **Track statistics** - Track statistics like total number of users, admins and gate opens in time.
- **Multi language** - Every user can choose his preferable language.
  Thus, you can easily add support for new languages as a contributor to the SG main repository.
- **App without installation** - The frontend part of Smart Gate works as a PWA. It means that you can use the app in your web browser, mount it on your desktop or even on your mobile device, and it will be going to look like a native app.
- **Hardware agnostic** - Everything relays on a Raspberry Pi microcomputer with a Wi-Fi module.
  You can define how GPIOs will behave on device initialisation and on open.
  If you also have a USB camera or native RPI camera connected to Raspberry Pi, or even a camera that serves video through Wi-Fi you can also easily add it!
- **Open source** - Unlike other smart locks, Smart Gate is **completely free!**
  This is the main idea of this project, from people for people.
  In fact, Smart Gate is only the software part of the smart lock system, but in documentation, we guide you on how to prepare the electronic part of the project for any electric door/gate.
- **Compatible with Apple Shortcuts** - If you have devices with the iOS system you can integrate Smart Gate with Apple Shortcuts.
  This makes it possible to open the door/gate automatically when you will back home or just using Siri.

:::caution More features
Smart Gate is constantly developed and there are many features in future plans or currently in progress.

For more details check **[project backlog](https://github.com/Jozwiaczek/smart-gate/projects/1)** in GitHub repository.
:::

## Why & How it's Completely Free

> **TL;DR:** You're deploying smart gate by your own but every part of hosting or usage of external service assumes usage of free plan and
> it is described in [setup guide](guide/intro.md). Only what you must have or have to buy is [Raspberry Pi](https://www.raspberrypi.com/).

The origin of the Smart Gate system was that we wanted to have simple and fast way for opening entry home gate and door.
We knew that there were similar solutions on the market, but they were also expensive, unsecure or just with the poor/old applications.
That's why we decided to prepare something that will fit to most electric doors/gates/locks and just have it for free.

In order to keep the Smart Gate system secure along with great features, it uses external services.
Overall every usage of hosting or external service assumes usage of a free plan without any additional setup apart from just creating an account.
In [setup guide](guide/intro.md) we will guide you step by step how to prepare everything quick and easy by your own.

Apart from the software which is handled by Smart Gate, you must have your electric door/lock/gate and Raspberry Pi which is a cheap microcomputer.
This approach where we deliver only free software, putting aside physical parts, allows us to fit Smart Gate to most electric locks, doors, or gates.

## Requirements

- Physical electric lock/door/gate
- Raspberry Pi
- Relay module 5V 220VAC
- 2x DC/AC (For Raspberry Pi and Relay module)
- Connecting wires
- Micro SD Card (16 GB recommended or larger)
- Internet access (Cable or Wi-Fi)

## How Is It Built

Before you get too far into this, note that this section is prepared strictly for developers.

### Technology overview

Here are the primary technologies used in this project:

- **TypeScript:** Typed JavaScript
- **NestJs:** Framework for server
- **Postgres:** Battle tested SQL database
- **TypeORM:** Database ORM
- **Node RPIO:** Library for accessing GPIO interface
- **React:** For the UI
- **Styled Components:** Styling library
- **AnimeJs:** Animations library
- **i18next:** Internationalization framework
- **React Query:** Data fetching library
- **Socket.io:** Real Time Connection
- **Storybook:** Tool for building UI components in isolation - visual testing
- **Cypress:** E2E testing framework
- **Jest:** Unit/Component testing framework
- **Testing Library:** Simple utilities for testing DOM based user interfaces
- **Octokit:** Library making interacting with the GitHub API easier.

Here are the external services:

- **GitHub Actions:** Hosted CI pipeline service
- **Sentry:** Error reporting service
- **SendGrid:** Email delivery service
- **Netlify:** Client hosting platform
- **Heroku:** Server hosting platform
- **Ngrok:** Secure HTTP tunneling for camera access

### Architectural overview

The architecture of Smart Gate is split for three main packages, physical elements and external services.

![Services Architecture Diagram](../static/diagrams/services-architecture.drawio.png)

#### Main software packages

- **Server (api)** - Heart of the system and bridge between all elements.
  Main server with HTTP(REST) and Websockets(Socket.io) communication.
- **Application (client)** - Main user-face application. Works as web-app with PWA.
- **Raspberry Pi (device)** - Server which runs on Raspberry Pi. It manages opening gate/lock/door and optionally exposes camera preview.

#### Physical elements

- **Electric lock** - Your physical electric lock/door/gate
- **Relay module** - Electric module which switch state of your lock
- **Camera** - Camera module (Raspi Camera, any USB web camera or locally served over http camera connection)

#### External services

- **Database** - Postgres database for storing all system data
- **Email delivery service** - Delivering emails to your users
- **Camera proxy** - Secure HTTP tunneling for camera access - _Optional service_
- **Application monitoring service** - Tracking your client and api errors - _Optional service_
