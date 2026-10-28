import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'ToneCustoms',
  description: 'Official FiveM script documentation — built for roleplay, made with purpose.',
  lang: 'en-US',
  base: '/tonecustoms-docs/',
  cleanUrls: true,
  lastUpdated: true,
  appearance: 'dark',
  sitemap: { hostname: 'https://tonecustoms.github.io/tonecustoms-docs/' },
  head: [
    ['meta', { name: 'theme-color', content: '#10091a' }],
    ['meta', { property: 'og:title', content: 'ToneCustoms Documentation' }],
    ['meta', { property: 'og:description', content: 'Installation guides, products, support and updates for ToneCustoms FiveM resources.' }]
  ],
  themeConfig: {
    siteTitle: 'ToneCustoms',
    logo: 'https://raw.githubusercontent.com/tonyiswavy/tonyiswavy/main/assets/tonecustoms-header.svg',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/ABOUT' },
      { text: 'Updates', link: '/policies/UPDATES' },
      { text: 'Support', link: '/SUPPORT' },
      { text: 'Partnerships', link: '/PARTNERSHIPS' },
      { text: 'Start Here', link: '/START_HERE' },
      { text: 'Products', link: '/products/' },
      { text: 'Free Scripts', link: '/products/free-resources' },
      { text: 'Installation', link: '/INSTALLATION' },
      { text: 'Policies', link: '/policies/' },
      { text: 'Shop', link: 'https://tonecustoms.tebex.store/' }
    ],
    sidebar: [
      {
        text: 'Get Started',
        items: [
          { text: 'Documentation Home', link: '/' },
          { text: 'Start Here', link: '/START_HERE' },
          { text: 'About ToneCustoms', link: '/ABOUT' },
          { text: 'Meet the Founder', link: '/ABOUT#meet-the-developer-tone' },
          { text: 'Our Development Process', link: '/OUR_PROCESS' },
          { text: 'Frequently Asked Questions', link: '/FAQ' }
        ]
      },
      {
        text: 'Products',
        collapsed: true,
        items: [
          { text: 'Product Catalog', link: '/products/' },
          { text: 'Find the Right Script', link: '/CHOOSE_A_SCRIPT' },
          { text: 'Free FiveM Scripts', link: '/products/free-resources' },
          { text: 'Gun Jam — Overview', link: '/products/gun-jam' },
          { text: 'Family System', link: '/products/family-system' },
          { text: 'Family System — Installation', link: '/products/family-system-installation' },
          { text: 'Family System — Troubleshooting', link: '/products/family-system-troubleshooting' },
          { text: 'Family System — Release History', link: '/products/family-system-changelog' },
          { text: 'Window Cleaning', link: '/products/window-cleaning' },
          { text: 'Window Cleaning — Installation', link: '/products/window-cleaning-installation' },
          { text: 'Window Cleaning — Troubleshooting', link: '/products/window-cleaning-troubleshooting' },
          { text: 'Window Cleaning — Release History', link: '/products/window-cleaning-changelog' },
          { text: 'Gun Jam — Installation', link: '/products/gun-jam-installation' },
          { text: 'Gun Jam — Troubleshooting', link: '/products/gun-jam-troubleshooting' },
          { text: 'Gun Jam — Release History', link: '/products/gun-jam-changelog' },
          { text: 'Queue', link: '/products/queue' },
          { text: 'Farming', link: '/products/farming' },
          { text: 'Skills', link: '/products/skills' },
          { text: '3D Roleplay Text', link: '/products/roleplay-text' },
          { text: 'Multi Job', link: '/products/multi-job' },
          { text: 'Pharmacy', link: '/products/pharmacy' }
        ]
      },
      {
        text: 'Customer Guides',
        items: [
          { text: 'Customer Checklist', link: '/CUSTOMER_CHECKLIST' },
          { text: 'Installation Hub', link: '/INSTALLATION' },
          { text: 'Troubleshooting Center', link: '/TROUBLESHOOTING' },
          { text: 'Framework Compatibility', link: '/COMPATIBILITY' },
          { text: 'Purchase & Delivery', link: '/PURCHASE_AND_DELIVERY' },
          { text: 'Updating a Script', link: '/UPDATE_GUIDE' },
          { text: 'Contact & Feedback', link: '/CONTACT' },
          { text: 'Custom Development Inquiries', link: '/CUSTOM_DEVELOPMENT' },
          { text: 'Support', link: '/SUPPORT' },
          { text: 'Partnerships & Collaborations', link: '/PARTNERSHIPS' },
          { text: 'Partnership Agreement Template', link: '/PARTNERSHIP_AGREEMENT_TEMPLATE' },
          { text: 'Known Issues & Fixes', link: '/KNOWN_ISSUES' },
          { text: 'Support Dashboard', link: '/SUPPORT_DASHBOARD' }
        ]
      },
      {
        text: 'Customer Policies',
        collapsed: true,
        items: [
          { text: 'Policy Center', link: '/policies/' },
          { text: 'Licensing', link: '/policies/LICENSING' },
          { text: 'Purchases & Refunds', link: '/policies/PURCHASES_AND_REFUNDS' },
          { text: 'Script Swaps', link: '/policies/SCRIPT_SWAPS' },
          { text: 'Updates & Releases', link: '/policies/UPDATES' },
          { text: 'Customer Support', link: '/policies/CUSTOMER_SUPPORT' },
          { text: 'Privacy (Draft)', link: '/policies/PRIVACY' }
        ]
      },
      {
        text: 'Documentation',
        collapsed: true,
        items: [
          { text: 'Documentation Changelog', link: '/DOCUMENTATION_CHANGELOG' },
          { text: 'Development Workflow', link: '/development/README' },
          { text: 'Resource Repository Checklist', link: '/development/RESOURCE_REPOSITORY_TEMPLATE' },
          { text: 'Contributing', link: '/CONTRIBUTING' },
          { text: 'Security', link: '/SECURITY' }
        ]
      }
    ],
    search: {
      provider: 'local',
      options: {
        miniSearch: {
          searchOptions: { fuzzy: 0.2, prefix: true }
        }
      }
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ToneCustoms/tonecustoms-docs' },
      { icon: 'youtube', link: 'https://www.youtube.com/@tonyiswavy12' },
      { icon: 'discord', link: 'https://discord.gg/JdZ7NTG5KF' }
    ],
    editLink: {
      pattern: 'https://github.com/ToneCustoms/tonecustoms-docs/edit/main/:path',
      text: 'Suggest a documentation edit'
    },
    footer: {
      message: 'Built for Roleplay. Made with Purpose.',
      copyright: '© 2026 ToneCustoms · Documentation does not distribute paid source code.'
    },
    outline: { level: [2, 3], label: 'On this page' },
    docFooter: { prev: 'Previous guide', next: 'Next guide' }
  }
})
