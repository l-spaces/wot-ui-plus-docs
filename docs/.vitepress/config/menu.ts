
/**
 * 导航栏菜单配置
 */
import { type DefaultTheme } from 'vitepress'
import { version } from '../../../package.json'

// 自动化，给text添加索引值
// function addTextIndex(array): DefaultTheme.SidebarItem[] {
//   return array.map(arr => {
//     arr.items = arr.items.map((item, index) => {
//       item.text = `${index + 1}. ${item.text}`
//       return item
//     })
//     return arr
//   })
// }

class Menu<T> {
  locale: string
  localeStr: string
  constructor(locale: string) {
    this.locale = locale
    this.localeStr = `/${this.locale}`
  }
  // 导航栏
  nav(): DefaultTheme.NavItem[] {
    return [
      {
        text: '指南',
        activeMatch: `${this.localeStr}/guide`,
        // link: `${this.localeStr}/guide/intro`
        items: [
          { text: '介绍', link: `${this.localeStr}/guide/intro` }
        ]
      },
      {
        text: '组件',
        activeMatch: `${this.localeStr}/components`,
        // link: `${this.localeStr}/components/intro`
        items: [
          { text: '组件总览', link: `${this.localeStr}/components/intro` },
          // { text: '快速起步', link: `${this.localeStr}/components/install` },
          // { text: '基础组件', link: `${this.localeStr}/components/color` },
          // { text: '表单组件', link: `${this.localeStr}/components/input` },
          // { text: '数据组件', link: `${this.localeStr}/components/circleProgress` },
          // { text: '反馈组件', link: `${this.localeStr}/components/actionSheet` },
          // { text: '布局组件', link: `${this.localeStr}/components/line` },
          // { text: '导航组件', link: `${this.localeStr}/components/dropdown` },
          // { text: '其他组件', link: `${this.localeStr}/components/messageInput` },
        ]
      },
      {
        text: '工具',
        activeMatch: `${this.localeStr}/intro`,
        // link: `${this.localeStr}/tools/intro`
        items: [
          { text: '起步', link: `${this.localeStr}/tools/intro` }
        ]
      },
      {
        text: '模版',
        activeMatch: `${this.localeStr}/layout`,
        // link: `${this.localeStr}/layout/intro`
        items: [
          { text: '起步', link: `${this.localeStr}/layout/intro` }
        ]
      },
      {
        text: '资源',
        // link: `${this.localeStr}/resource/intro`,
        items: [
          { text: '资源下载', link: `${this.localeStr}/resource/intro` }
        ]
      },
      {
        text: '交流反馈',
        link: `${this.localeStr}/resource/about`
      },
      {
        text: '捐赠',
        link: `${this.localeStr}/resource/donation`
      },
      {
        text: `v${version}`,
        items: [
          {
            text: '版本地址',
            link: 'https://github.com/anyup/wot-ui-plus/releases',
          },
          {
            text: '更新日志',
            link: `${this.localeStr}/components/changelog`
          },
          {
            component: 'RainbowAnimationSwitcher',
            props: {
              text: '彩虹动画',
            },
          },
        ],
      },
    ]
  }
  // 侧边栏
  sidebar(): DefaultTheme.Sidebar {
    return {
      '/zh/guide/': { base: `${this.localeStr}/guide/`, items: this.sidebarGuide() },
      '/zh/tools/': { base: `${this.localeStr}/tools/`, items: this.sidebarTools() },
      '/zh/layout/': { base: `${this.localeStr}/layout/`, items: this.sidebarLayout() },
      '/zh/components/': {
        base: `${this.localeStr}/components/`,
        items: this.sidebarComponents()
      },
    }
  }
  // guide 文档
  sidebarGuide(): DefaultTheme.SidebarItem[] {
    return [
      {
        text: '指南',
        base: `${this.localeStr}/guide/`,
        items: [
          { text: '介绍', link: 'intro' }
        ]
      }
    ]
  }
  // components 文档
  sidebarComponents(): DefaultTheme.SidebarItem[] {
    return [
      {
        text: '起步',
        items: [
          { text: '总览', link: 'intro' }
        ]
      },
      {
        text: '基础组件',
        items: [
          { text: 'Color 色彩', link: 'color' }
        ]
      }
    ]
  }
  // tools 文档
  sidebarTools(): DefaultTheme.SidebarItem[] {
    return [
      {
        text: '起步',
        items: [
          { text: '介绍', link: 'intro' }
        ]
      }
    ]
  }
  // layout 文档
  sidebarLayout(): DefaultTheme.SidebarItem[] {
    return [
      {
        text: '起步',
        items: [
          { text: '介绍', link: 'intro' },
        ]
      }
    ]
  }
}

export default Menu
