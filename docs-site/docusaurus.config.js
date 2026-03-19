// @ts-check
const { themes } = require("prism-react-renderer");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "LearnFlow Documentation",
  tagline: "AI-Powered Python Tutoring Platform",
  favicon: "img/favicon.ico",
  url: "https://learnflow.dev",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: { defaultLocale: "en", locales: ["en"] },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: { sidebarPath: require.resolve("./sidebars.js"), routeBasePath: "/" },
        blog: false,
        theme: { customCss: require.resolve("./src/css/custom.css") },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "LearnFlow Docs",
        items: [
          { type: "docSidebar", sidebarId: "docs", position: "left", label: "Documentation" },
          { href: "https://github.com/your-org/learnflow-app", label: "GitHub", position: "right" },
        ],
      },
      footer: {
        style: "dark",
        copyright: `Built with Docusaurus. Hackathon III - Reusable Intelligence.`,
      },
      prism: { theme: themes.github, darkTheme: themes.dracula },
    }),
};

module.exports = config;
