// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import { theme, useOpenapi } from 'vitepress-openapi/client'
import 'vitepress-openapi/dist/style.css'

import spec from '../../public/openapi.json' assert { type: 'json' } 
export default {
    extends: DefaultTheme,
    async enhanceApp({ app, router, siteData }) {
        const openapi = await useOpenapi({ 
            spec: spec as any
        }) 
        theme.enhanceApp({ app, router, siteData, openapi: openapi as any }) 
    }
}