
/**
 * 中文环境变量配置
 */
// import { createRequire } from 'module'
import { defineConfig, type DefaultTheme } from 'vitepress'
import Menu from './menu'
// const require = createRequire(import.meta.url)
// const pkg = require('vitepress/package.json')
const menu = new Menu('zh')

export const zh = defineConfig({
  lang: 'zh-Hans',

  description: 'wot-ui-plus 是以解决方案为驱动，包含项目的最佳实践，最佳的组件实现和便捷的工具类封装',

  themeConfig: {
    nav: menu.nav(),

    sidebar: menu.sidebar(),

    // editLink: {
    //   pattern: 'https://github.com/anyup/wot-ui-plus-Docs/docs/:path',
    //   text: '在 GitHub 上编辑此页面'
    // },

    footer: {
      message: '备案许可：<a style="color:#4e6e8e;" rel="noopener noreferrer" target="_blank" href="https://beian.miit.gov.cn/">鲁ICP备2021040594号-5</a>',
      copyright: `Copyright © ${new Date().getFullYear()} <a target="_blank" href="https://github.com/anyup"> wot-ui-plus </a>`
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      label: '页面导航'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'full',
      }
    },

    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  }
})

export const search: DefaultTheme.AlgoliaSearchOptions['locales'] = {
  zh: {
    placeholder: '搜索文档',
    translations: {
      button: {
        buttonText: '搜索文档',
        buttonAriaLabel: '搜索文档'
      },
      modal: {
        searchBox: {
          resetButtonTitle: '清除查询条件',
          resetButtonAriaLabel: '清除查询条件',
          cancelButtonText: '取消',
          cancelButtonAriaLabel: '取消'
        },
        startScreen: {
          recentSearchesTitle: '搜索历史',
          noRecentSearchesText: '没有搜索历史',
          saveRecentSearchButtonTitle: '保存至搜索历史',
          removeRecentSearchButtonTitle: '从搜索历史中移除',
          favoriteSearchesTitle: '收藏',
          removeFavoriteSearchButtonTitle: '从收藏中移除'
        },
        errorScreen: {
          titleText: '无法获取结果',
          helpText: '你可能需要检查你的网络连接'
        },
        footer: {
          selectText: '选择',
          navigateText: '切换',
          closeText: '关闭',
          searchByText: '搜索提供者'
        },
        noResultsScreen: {
          noResultsText: '无法找到相关结果',
          suggestedQueryText: '你可以尝试查询',
          reportMissingResultsText: '你认为该查询应该有结果？',
          reportMissingResultsLinkText: '点击反馈'
        }
      }
    }
  }
}
