/**
 * 配置
 */
import { defineConfig } from 'vitepress'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'
import { getEnvVar } from './env'
import vitepressProtectPlugin from 'vitepress-protect-plugin'
import llmstxt from 'vitepress-plugin-llms'

import Menu from './menu'
const menu = new Menu('components')

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
  ogUrl: 'https://l-spaces.github.io/wot-ui-plus-docs/',
  baiduUnion: 'wot-ui-plus官网',
  baiduImage: 'https://l-spaces.github.io/wot-ui-plus-docs/images/wot-logo.png'
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
  ['meta', { name: 'apple-mobile-web-app-title', content: 'wot-ui-plus官网' }],
  ['meta', { itemprop: 'image', content: seo.baiduImage }],
  ['meta', { property: 'og:image', content: seo.baiduImage }],
  ['script',{defer: '',async: '',src: '//cdn.busuanzi.cc/busuanzi/3.6.9/busuanzi.min.js'}],
  ['script',{defer: 'true', async: '',src: 'https://cloud.umami.is/script.js', 'data-website-id': '0694cfbf-79b0-41a6-b38c-5f96ffde7844'}]
   
]

// 获取环境变量
const baseUrl = getEnvVar('VITE_BASE_URL', '/json')
const base = getEnvVar('VITE_BASE', '/')

// Configure vitepress-plugin-llms and coerce types to avoid mismatched vite typings
const llmsPlugins = llmstxt({
  domain: seo.ogUrl?.replace(/\/$/, '') || 'https://l-spaces.github.io/wot-ui-plus-docs/',
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

export const general = defineConfig({
  base: '/wot-ui-plus-docs/',
  lang: 'zh-Hans',

  title: 'wot-ui-plus',
  description: seo.description,
  lastUpdated: true,
  cleanUrls: false, // 简洁的 URL，需要服务器支持
  metaChunk: true, // 将页面元数据提取到单独的 JavaScript 块中，而不是内联在初始 HTML 中
  ignoreDeadLinks: true,
  markdown: {
    // 启用数学公式解析
    math: true,
    //行号显示
    lineNumbers: false,
    // 使用 `!!code` 防止转换
    codeTransformers: [
      {
        postprocess(code: string) {
          return code.replace(/\[\!\!code/g, '[!code')
        }
      }
    ],
    // 开启图片懒加载
    image: {
      lazyLoading: true
    },
    config(md) {
      //代码组图标
      md.use(groupIconMdPlugin)
    }
  },
  vite: {
    define: {
      // 将环境变量暴露给客户端
      'import.meta.env.VITE_BASE_URL': JSON.stringify(baseUrl),
      'import.meta.env.VITE_BASE': JSON.stringify(base)
    },
    plugins: [
      groupIconVitePlugin(),
      vitepressProtectPlugin({
        disableF12: false, // 禁用F12开发者模式
        disableCopy: false, // 禁用文本复制
        disableSelect: false // 禁用文本选择
      })
    ] as any
    // plugins: llmsPlugins
  },
  sitemap: {
    hostname: 'https://l-spaces.github.io/wot-ui-plus-docs/',
    transformItems(items) {
      return items.filter((item) => !item.url.includes('migration'))
    }
  },

  /* prettier-ignore */
  head: [
    ...seoHead,
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],

  themeConfig: {
    logo: { src: '/images/wot-logo.png', width: 24, height: 24 },

    nav: menu.nav(),

    sidebar: menu.sidebar(),

    footer: {
      message: `📖  Released under the MIT License`, // 版权前显示的信息
      copyright: 'Copyright © 2025 Wot UI Plus' // 实际的版权文本
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      label: '页面导航'
    },
    // 编辑链接 配置
    editLink: {
      pattern: 'https://github.com/l-spaces/wot-ui-plus-docs/blob/dev/docs/:path',
      text: '为此页提供修改建议'
    },
    lastUpdated: {
      text: '更新时间',
      formatOptions: {
        dateStyle: 'medium'
      }
    },

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
    },
    // search: {
    //   provider: 'algolia',
    //   options: {
    //     appId: '49TSLRH0UN',
    //     apiKey: '38f4ac30e2abb02c7a4194a03523ef40',
    //     indexName: 'wot-ui-plus',
    //     locales: {
    //       zh: {
    //         placeholder: '搜索文档',
    //         translations: {
    //           button: {
    //             buttonText: '搜索文档',
    //             buttonAriaLabel: '搜索文档'
    //           },
    //           modal: {
    //             searchBox: {
    //               resetButtonTitle: '清除查询条件',
    //               resetButtonAriaLabel: '清除查询条件',
    //               cancelButtonText: '取消',
    //               cancelButtonAriaLabel: '取消'
    //             },
    //             startScreen: {
    //               recentSearchesTitle: '搜索历史',
    //               noRecentSearchesText: '没有搜索历史',
    //               saveRecentSearchButtonTitle: '保存至搜索历史',
    //               removeRecentSearchButtonTitle: '从搜索历史中移除',
    //               favoriteSearchesTitle: '收藏',
    //               removeFavoriteSearchButtonTitle: '从收藏中移除'
    //             },
    //             errorScreen: {
    //               titleText: '无法获取结果',
    //               helpText: '你可能需要检查你的网络连接'
    //             },
    //             footer: {
    //               selectText: '选择',
    //               navigateText: '切换',
    //               closeText: '关闭',
    //               searchByText: '搜索提供者'
    //             },
    //             noResultsScreen: {
    //               noResultsText: '无法找到相关结果',
    //               suggestedQueryText: '你可以尝试查询',
    //               reportMissingResultsText: '你认为该查询应该有结果？',
    //               reportMissingResultsLinkText: '点击反馈'
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    // },
    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
    // carbonAds: { code: 'CEBDT27Y', placement: 'vuejsorg' }
  }
})
