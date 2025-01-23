import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Kichat API",
  description: "Kichat API Documentation",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Documentation', link: '/intro/what-is-kichat-api' },
      { text: 'Examples', link: '/rest-api/api-examples1' }
    ],

    sidebar: [
      {
        text: 'Introduction to Kichat API',
        items: [
          { text: 'What is Kichat API?', link: '/intro/what-is-kichat-api' },
          { text: 'Why use a proxy API?', link: '/intro/why-use-proxy-api' },
          { text: 'API Structure', link: '/intro/api-structure' },
        ]
      },
      {
        text: 'REST API Endpoints',
        items: [
          { text: 'API Endpoints', link: '/rest-api/endpoints' },
          { text: 'Get Channel', link: '/rest-api/get-channel' }
        ]
      },
      {
        text: 'Chatroom Stream',
        items: [
          { text: 'API Examples1', link: '/chatroom/api-examples1' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
