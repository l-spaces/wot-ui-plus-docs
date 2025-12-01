/**
 * 共享配置
 */
import { defineConfig } from 'vitepress'
import { search as zhSearch } from './zh'
import { groupIconMdPlugin } from 'vitepress-plugin-group-icons'
import { getEnvVar } from './env'
import llmstxt from 'vitepress-plugin-llms'

// SEO 优化配置
export const seo = {
  title: 'wot-ui-plus 组件库 - 官网',
  description:
    'wot-ui-plus - 基于 Vue3 & TypeScript 的高质量 uni-app 组件库，基于 uview、uviewui、wot-ui-plus、uview ui、uniapp、vue3、typescript、ts、components，打造最强大的 uni-app 生态组件库。',
  keywords:
    'uview,wot-ui-plus,wot-ui-plus,uniapp,vue3,typescript,ts,components,uviewui,uview ui,官网,wot-ui-plus,uni-app,组件库,vue组件,vue3组件,ts组件',
  ogSiteName: 'wot-ui-plus 官网',
  ogType: 'website',
  ogTitle: 'wot-ui-plus 组件库 - 官网',
  ogDescription:
    'wot-ui-plus - 基于 Vue3 & TypeScript 的高质量 uni-app 组件库，基于 uview、uviewui、wot-ui-plus、uview ui、uniapp、vue3、typescript、ts、components，打造最强大的 uni-app 生态组件库。',
  ogUrl: 'https://wot-ui-plus.cn',
  baiduUnion: 'wot-ui-plus官网',
  baiduImage: 'https://wot-ui-plus.cn/images/website.png'
}

export const seoHead: [string, Record<string, string>][] = [
  ['meta', { name: 'keywords', content: seo.keywords }],
  ['meta', { name: 'description', content: seo.description }],
  ['meta', { name: 'referrer', content: 'no-referrer' }],
  ['meta', { property: 'og:site_name', content: seo.ogSiteName }],
  ['meta', { property: 'og:type', content: seo.ogType }],
  ['meta', { property: 'og:title', content: seo.ogTitle }],
  ['meta', { property: 'og:description', content: seo.ogDescription }],
  ['meta', { property: 'og:url', content: seo.ogUrl }],
  ['meta', { name: 'baidu_union_verify', content: seo.baiduUnion }],
  ['meta', { name: 'baidu-site-verification', content: 'codeva-v20DwV5zvD' }],
  ['meta', { name: 'apple-mobile-web-app-title', content: 'wot-ui-plus官网' }],
  ['meta', { name: 'algolia-site-verification', content: '4ECBFE6F077846E3' }],
  ['meta', { itemprop: 'image', content: seo.baiduImage }],
  ['meta', { property: 'og:image', content: seo.baiduImage }]
]

// 获取环境变量
const baseUrl = getEnvVar('VITE_BASE_URL', '/json')
const base = getEnvVar('VITE_BASE', '/')

console.log('Environment variables loaded:')
console.log('VITE_BASE_URL:', baseUrl)
console.log('VITE_BASE:', base)

// Configure vitepress-plugin-llms and coerce types to avoid mismatched vite typings
const llmsPlugins = llmstxt({
  domain: seo.ogUrl?.replace(/\/$/, '') || 'https://wot-ui-plus.cn',
  generateLLMsTxt: true,
  generateLLMsFullTxt: true,
  generateLLMFriendlyDocsForEachPage: true,
  stripHTML: true,
  injectLLMHint: false,
  ignoreFiles: ['.vitepress/**', 'public/**', 'images/**', 'assets/**', '**/changelog**'],
  excludeUnnecessaryFiles: true,
  excludeIndexPage: true,
  excludeBlog: true,
  excludeTeam: true,
  customTemplateVariables: {
    title: seo.title,
    description: seo.description
  }
}) as unknown as any

export const shared = defineConfig({
  base,
  vite: {
    define: {
      // 将环境变量暴露给客户端
      'import.meta.env.VITE_BASE_URL': JSON.stringify(baseUrl),
      'import.meta.env.VITE_BASE': JSON.stringify(base)
    },
    // plugins: llmsPlugins
  },
  title: 'wot-ui-plus',
  description: seo.description,
  lastUpdated: true,
  cleanUrls: false, // 简洁的 URL，需要服务器支持
  metaChunk: true, // 将页面元数据提取到单独的 JavaScript 块中，而不是内联在初始 HTML 中
  ignoreDeadLinks: true,
  markdown: {
    math: true,
    codeTransformers: [
      // We use `[!!code` in demo to prevent transformation, here we revert it back.
      {
        postprocess(code) {
          return code.replace(/\[\!\!code/g, '[!code')
        }
      }
    ],
    config(md) {
      md.use(groupIconMdPlugin)
    }
  },

  sitemap: {
    hostname: 'https://wot-ui-plus.cn',
    transformItems(items) {
      return items.filter(item => !item.url.includes('migration'))
    }
  },

  /* prettier-ignore */
  head: [
    ...seoHead,
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],

  themeConfig: {
    logo: { src: '/images/logo.png', width: 24, height: 24 },

    // 社交链接 配置
    socialLinks: [
      { icon: 'gitee', link: 'https://github.com/l-spaces/wot-ui-plus' },
      {
        icon: 'github',
        link: 'https://github.com/l-spaces/wot-ui-plus',
        ariaLabel: 'GitHub'
      }
    ],

    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          }
        }
      }
    }
    // search: {
    //   provider: 'algolia',
    //   options: {
    //     appId: '49TSLRH0UN',
    //     apiKey: '38f4ac30e2abb02c7a4194a03523ef40',
    //     indexName: 'wot-ui-plus',
    //     // locales: { ...zhSearch }
    //   }
    // },

    // carbonAds: { code: 'CEBDT27Y', placement: 'vuejsorg' }
  }
})
