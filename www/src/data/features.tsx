import React, { ReactElement } from 'react';

export type FeatureSectionImageSize = 'normal' | 'large' | 'small';

export interface FeatureSectionProps {
  title: string;
  description: ReactElement;
  imgSrc: string;
  imgAlt: string;
  isOdd?: boolean;
  imgSize?: 'normal' | 'large' | 'small';
}

export const features: Array<FeatureSectionProps> = [
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
    imgAlt: 'Smart Gate dashboard preview',
  },
  {
    title: 'Manage and monitor all access',
    description: (
      <p>
        Track detailed history with details about who and when unlocked lock.
        <br />
        As a admin user you will have also access to more device logs and events.
      </p>
    ),
    imgSrc: '/img/features/app_history_preview.png',
    imgAlt: 'Smart Gate history preview',
  },
  {
    title: 'Desktop access',
    description: (
      <p>
        Smart Gate is designed to be accessible on every device.
        <br />
        You can quickly open the app from a desktop browser, on a tablet, same as on mobile.
      </p>
    ),
    imgSrc: '/img/features/desktop-access.png',
    imgAlt: 'Smart Gate application preview on desktop version',
  },
  {
    title: 'Monitor your device',
    description: (
      <p>
        Monitor the health of your Raspberry Pi from the app.
        <br />
        You can track in real-time details like temperature, ram usage, Wi-Fi connection, or logs.
      </p>
    ),
    imgSrc: '/img/features/device-config.png',
    imgAlt: 'Smart Gate device configuration and health monitoring preview',
    imgSize: 'large',
  },
  {
    title: 'Track statistics',
    description: <p>Track statistics like total number of users, admins and gate opens in time.</p>,
    imgSrc: '/img/features/statistics.png',
    imgAlt: 'Smart Gate statistics preview',
    imgSize: 'large',
  },
  {
    title: 'Multi language',
    description: (
      <p>
        Every user can choose his preferable language.
        <br />
        Thus, you can easily add support for new languages as a contributor to the SG main
        repository.
      </p>
    ),
    imgSrc: '/img/features/i18n.png',
    imgAlt: 'Multi language icon',
    imgSize: 'small',
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
    imgAlt: 'Progressive Web Application logo',
    imgSize: 'small',
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
    imgAlt: 'Raspberry Pi logo',
    imgSize: 'small',
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
    imgAlt: 'Open Source logo',
    imgSize: 'small',
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
    imgAlt: 'Apple Shortcuts logo',
    imgSize: 'small',
  },
];
