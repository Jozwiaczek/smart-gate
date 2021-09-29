import React, { ReactElement } from 'react';

interface FeatureSection {
  title: string;
  description: ReactElement;
  imgSrc: string;
  imgAlt: string;
}

export const features: Array<FeatureSection> = [
  {
    title: 'Open from anywhere',
    description: (
      <p>
        You can open your gate/door from anywhere in the world.
        <br />
        Application will be available in your browser or after installation as a desktop or mobile
        app.
      </p>
    ),
    imgSrc: '/img/features/app_open_preview.png',
    imgAlt: 'Smart Gate open gate preview',
  },
  {
    title: 'Manage and monitor all access',
    description: (
      <p>
        Track detailed history with details about who and when unlocked lock.
        <br /> As a admin user you will have also access to more device logs and events.
      </p>
    ),
    imgSrc: '/img/features/app_history_preview.png',
    imgAlt: 'Smart Gate history preview',
  },
  {
    title: 'App without installation',
    description: (
      <p>
        The frontend part of Smart Gate works as a PWA. It means that you can use the app in your
        web browser, mount it on your desktop or even on your mobile device and it will gonna look
        like a native app.
      </p>
    ),
    imgSrc: '/img/features/pwa.png',
    imgAlt: 'Progressive Web Application',
  },
  {
    title: 'Hardware agnostic',
    description: (
      <p>
        Everything relays on a Raspberry Pi microcomputer with a WiFi module.
        <br />
        You can define how GPIOs will behave on device initialisation and on open.
        <br />
        <br />
        If you also have a USB camera or native RPI camera connected to Raspberry Pi, or even a
        camera that serves video through WiFi you can also easily add it!
      </p>
    ),
    imgSrc: '/img/features/rpi.png',
    imgAlt: 'Raspberry Pi',
  },
  {
    title: 'Open source',
    description: (
      <p>
        Unlike other smart locks, Smart Gate is <strong>completely free!</strong>
        <br /> This is the main idea of this project, <em>from people for people</em>. <br />
        <br />
        In fact, Smart Gate is only the software part of the smart lock system, but in
        documentation, we guide you on how to prepare the electronic part of the project for any
        electric door/gate.
      </p>
    ),
    imgSrc: '/img/features/open-source.png',
    imgAlt: 'Open Source',
  },
  {
    title: 'Compatible with Apple Shortcuts',
    description: (
      <p>
        If you have devices with the iOS system you can integrate Smart Gate with Apple Shortcuts.
        <br />
        This makes it possible to open the door/gate automatically when you will back home or just
        using Siri.
      </p>
    ),
    imgSrc: '/img/features/shortcuts.png',
    imgAlt: 'Apple Shortcuts',
  },
];
