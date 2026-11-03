const config = {
  title: 'Novčić API',
  tagline: 'Build with confidence. Trade with precision.',
  favicon: 'img/mark.svg',
  url: 'https://novcic.github.io',
  baseUrl: '/docs/',
  organizationName: 'novcic',
  projectName: 'docs',
  trailingSlash: true,
  onBrokenLinks: 'throw',
  markdown: {hooks: {onBrokenMarkdownLinks: 'throw'}},
  i18n: {defaultLocale: 'en', locales: ['en']},
  presets: [['classic', {
    docs: {routeBasePath: '/', sidebarPath: './sidebars.js', editUrl: 'https://github.com/novcic/docs/edit/master/'},
    blog: false,
    theme: {customCss: ['./src/css/tokens.css', './src/css/custom.css']}
  }]],
  themeConfig: {
    colorMode: {defaultMode: 'light', disableSwitch: true, respectPrefersColorScheme: false},
    navbar: {title: 'novčić.', logo: {alt: 'Novčić', src: 'img/mark.svg'}, items: [
      {to: '/', label: 'Integration guide', position: 'left'},
      {to: '/reference/public/config', label: 'API reference', position: 'left'},
      {href: 'https://github.com/novcic/docs', label: 'GitHub', position: 'right'},
      {type: 'search', position: 'right'}
    ]},
    footer: {style: 'light', copyright: 'Novčić · API integration documentation · Meadow design system 1.0.0'},
    prism: {additionalLanguages: ['bash', 'python', 'json', 'typescript', 'http']}
  }
};
export default config;
