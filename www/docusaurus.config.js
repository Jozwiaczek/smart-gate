const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Smart Gate',
  tagline: 'Secure system for opening electric gates or doors',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'Jozwiaczek', // Usually your GitHub org/user name.
  projectName: 'smart-gate', // Usually your repo name.

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/Jozwiaczek/smart-gate/edit/main/www/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      image: '/img/social-media-card.png',
      announcementBar: {
        backgroundColor: '#257d69',
        textColor: '#ffffff',
        content:
          '⭐️ If you like Smart Gate, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/Jozwiaczek/smart-gate">GitHub</a>! ⭐️',
      },
      navbar: {
        title: 'Smart Gate',
        hideOnScroll: true,
        logo: {
          alt: 'Smart Gate Logo',
          src: 'img/sg-logo.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Documentation',
          },
          {
            to: 'https://github.com/Jozwiaczek/smart-gate',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        logo: {
          alt: 'Smart Gate Logo',
          src: 'img/sg-logo.png',
        },
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Source',
            items: [
              {
                label: 'Github',
                href: 'https://github.com/Jozwiaczek/smart-gate',
              },
              {
                label: 'Figma',
                href: 'https://www.figma.com/file/MqlnLhknWh1u0Ho8z1Oefe/Smart-Gate?node-id=0%3A1',
              },
              {
                label: 'Storybook',
                href: 'https://main--6059282c88843d002106b484.chromatic.com/',
              },
              {
                label: 'Project Roadmap',
                href: 'https://github.com/Jozwiaczek/smart-gate/projects/1',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Smart Gate`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};
