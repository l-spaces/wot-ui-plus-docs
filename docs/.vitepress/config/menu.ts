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
          { text: '介绍', link: `${this.localeStr}/guide/intro` },
          { text: '问题', link: `${this.localeStr}/guide/problem` },
          { text: '实践', link: `${this.localeStr}/guide/practice` },
          { text: '功能扩展', link: `${this.localeStr}/guide/extend` },
        ]
      },
      {
        text: '组件',
        activeMatch: `${this.localeStr}/wot`,
        items: [
          {
            text: '组件总览',
            link: `${this.localeStr}/wot/a`
          },
          {
            text: '基础组件',
            link: `${this.localeStr}/wot/button`
          },
          {
            text: '导航组件',
            link: `${this.localeStr}/wot/pagination`
          },
          {
            text: '数据输入',
            link: `${this.localeStr}/wot/calendar`
          },
          {
            text: '反馈组件',
            link: `${this.localeStr}/wot/actionSheet`
          },
          {
            text: '数据展示',
            link: `${this.localeStr}/wot/badge`
          }
        ]
      },
      {
        text: '资源',
        activeMatch: `${this.localeStr}/intro`,
        // link: `${this.localeStr}/tools/intro`
        items: [{ text: '起步', link: `${this.localeStr}/tools/intro` }]
      },
      // {
      //   text: '模版',
      //   activeMatch: `${this.localeStr}/layout`,
      //   // link: `${this.localeStr}/layout/intro`
      //   items: [{ text: '起步', link: `${this.localeStr}/layout/intro` }]
      // },
      // {
      //   text: '资源',
      //   // link: `${this.localeStr}/resource/intro`,
      //   items: [{ text: '资源下载', link: `${this.localeStr}/resource/intro` }]
      // },
      {
        text: '交流反馈',
        link: `${this.localeStr}/resource/about`
      },
      {
        text: '赞赏',
        link: `${this.localeStr}/resource/donation`
      }
      // {
      //   text: `v${version}`,
      //   items: [
      //     {
      //       text: '版本地址',
      //       link: 'https://github.com/anyup/wot-ui-plus/releases',
      //     },
      //     {
      //       text: '更新日志',
      //       link: `${this.localeStr}/components/changelog`
      //     },
      //     {
      //       component: 'RainbowAnimationSwitcher',
      //       props: {
      //         text: '彩虹动画',
      //       },
      //     },
      //   ],
      // },
    ]
  }
  // 侧边栏
  sidebar(): DefaultTheme.Sidebar {
    return {
      '/components/guide/': { base: `${this.localeStr}/guide/`, items: this.sidebarGuide() },
      '/components/tools/': { base: `${this.localeStr}/tools/`, items: this.sidebarTools() },
      '/components/layout/': { base: `${this.localeStr}/layout/`, items: this.sidebarLayout() },
      '/components/wot/': { base: `${this.localeStr}/wot/`, items: this.sidebarComponents() }
    }
  }
  // guide 文档
  sidebarGuide(): DefaultTheme.SidebarItem[] {
    return [
      {
        text: '指南',
        base: `${this.localeStr}/guide/`,
        items: [
          { text: '介绍', link: 'intro' },
          { text: '问题', link: 'problem' },
          { text: '实践', link: 'practice' },
          { text: '功能扩展', link: 'extend' }
        ]
      }
    ]
  }
  // components 文档
  sidebarComponents(): DefaultTheme.SidebarItem[] {
    return [
      {
        text: '总览',
        link: 'a'
      },
      {
        text: '基础',
        collapsed: false,
        items: [
          {
            link: 'button',
            text: 'Button 按钮'
          },
          {
            link: 'icon',
            text: 'Icon 图标'
          },
          {
            link: 'layout',
            text: 'Layout 布局'
          },
          {
            link: 'configProvider',
            text: 'ConfigProvider 全局配置'
          },
          {
            link: 'popup',
            text: 'Popup 弹出层'
          },
          {
            link: 'resize',
            text: 'Resize 监听元素尺寸变化'
          },
          {
            link: 'transition',
            text: 'Transition 动画'
          },
          {
            link: 'fab',
            text: 'Fab 悬浮按钮'
          },
          {
            link: 'text',
            text: 'Text 文本'
          },
          {
            link: 'rootPortal',
            text: 'RootPortal 根节点'
          }
        ]
      },
      {
        text: '导航',
        collapsed: false,
        items: [
          {
            link: 'pagination',
            text: 'Pagination 分页'
          },
          {
            link: 'popover',
            text: 'Popover 气泡'
          },
          {
            link: 'tabs',
            text: 'Tabs 标签页'
          },
          {
            link: 'segmented',
            text: 'Segmented 分段器'
          },
          {
            link: 'tabbar',
            text: 'Tabbar 标签栏'
          },
          {
            link: 'navbar',
            text: 'Navbar 导航栏'
          },
          {
            link: 'sidebar',
            text: 'Sidebar 侧边栏'
          },
          {
            link: 'backtop',
            text: 'Backtop 回到顶部'
          },
          {
            link: 'indexBar',
            text: 'IndexBar 索引栏'
          }, {
            link: 'tour',
            text: 'Tour 漫游'
          }
        ]
      },
      {
        text: '数据输入',
        collapsed: false,
        items: [
          {
            link: 'calendar',
            text: 'Calendar 日历选择器'
          },
          {
            link: 'calendarView',
            text: 'CalendarView 日历面板'
          },
          {
            link: 'checkbox',
            text: 'Checkbox 复选框'
          },
          {
            link: 'colPicker',
            text: 'ColPicker 多列选择器'
          },
          {
            link: 'datetimePicker',
            text: 'DatetimePicker 时间选择器'
          },
          {
            link: 'datetimePickerView',
            text: 'DatetimePickerView 时间选择器视图'
          },
          {
            link: 'form',
            text: 'Form 表单'
          },
          {
            link: 'input',
            text: 'Input 输入框'
          },
          {
            link: 'textarea',
            text: 'Textarea 文本域'
          },
          {
            link: 'inputNumber',
            text: 'InputNumber 计数器'
          },
          {
            link: 'picker',
            text: 'Picker 选择器'
          },
          {
            link: 'pickerView',
            text: 'PickerView 选择器视图'
          },
          {
            link: 'radio',
            text: 'Radio 单选框'
          },
          {
            link: 'rate',
            text: 'Rate 评分'
          },
          {
            link: 'search',
            text: 'Search 搜索框'
          },
          {
            link: 'selectPicker',
            text: 'SelectPicker 单复选选择器'
          },
          {
            link: 'slider',
            text: 'Slider 滑块'
          },
          {
            link: 'switch',
            text: 'Switch 开关'
          },
          {
            link: 'upload',
            text: 'Upload 上传'
          },
          {
            link: 'passwordInput',
            text: 'PasswordInput 密码输入框'
          },
          {
            link: 'signature',
            text: 'Signature 签名'
          }
        ]
      },
      {
        text: '反馈',
        collapsed: false,
        items: [
          {
            link: 'actionSheet',
            text: 'ActionSheet 动作面板'
          },
          {
            link: 'dropMenu',
            text: 'DropMenu 下拉菜单'
          },
          {
            link: 'floatingPanel',
            text: 'FloatingPanel 浮动面板'
          },
          {
            link: 'loading',
            text: 'Loading 加载'
          },
          {
            link: 'messageBox',
            text: 'MessageBox 弹框'
          },
          {
            link: 'noticeBar',
            text: 'NoticeBar 通知栏'
          },
          {
            link: 'overlay',
            text: 'Overlay 遮罩层'
          },
          {
            link: 'progress',
            text: 'Progress 进度条'
          },
          {
            link: 'circle',
            text: 'Circle 环形进度条'
          },
          {
            link: 'sortButton',
            text: 'SortButton 排序按钮'
          },
          {
            link: 'statusTip',
            text: 'StatusTip 缺省提示'
          },
          {
            link: 'swipeAction',
            text: 'SwipeAction 滑动操作'
          },
          {
            link: 'toast',
            text: 'Toast 轻提示'
          },
          {
            link: 'notify',
            text: 'Notify 消息通知'
          },
          {
            link: 'tooltip',
            text: 'Tooltip 文字提示'
          },
          {
            link: 'countDown',
            text: 'CountDown 倒计时'
          },
          {
            link: 'countTo',
            text: 'CountTo 数字滚动'
          },
          {
            link: 'keyboard',
            text: 'Keyboard 虚拟键盘'
          },
          {
            link: 'numberKeyboard',
            text: 'NumberKeyboard 数字键盘'
          }
        ]
      },
      {
        text: '数据展示',
        collapsed: false,
        items: [
          {
            link: 'badge',
            text: 'Badge 徽标'
          },
          {
            link: 'card',
            text: 'Card 卡片'
          },
          {
            link: 'cell',
            text: 'Cell 单元格'
          },
          {
            link: 'collapse',
            text: 'Collapse 折叠面板'
          },
          {
            link: 'curtain',
            text: 'Curtain 幕帘'
          },
          {
            link: 'divider',
            text: 'Divider 分割线'
          },
          {
            link: 'gap',
            text: 'Gap 间隔槽'
          },
          {
            link: 'img',
            text: 'Img 图片'
          },
          {
            link: 'imgCropper',
            text: 'ImgCropper 图片裁剪'
          },
          {
            link: 'grid',
            text: 'Grid 宫格'
          },
          {
            link: 'loadMore',
            text: 'LoadMore 加载更多'
          },
          {
            link: 'skeleton',
            text: 'Skeleton 骨架屏'
          },
          {
            link: 'steps',
            text: 'Steps 步骤条'
          },
          {
            link: 'sticky',
            text: 'Sticky 粘性布局'
          },
          {
            link: 'tag',
            text: 'Tag 标签'
          },
          {
            link: 'watermark',
            text: 'Watermark 水印'
          },
          {
            link: 'swiper',
            text: 'Swiper 轮播图'
          },
          {
            link: 'table',
            text: 'Table 表格'
          }
        ]
      },
      {
        text: '组合式API',
        items: [
          { text: 'useUpload', link: 'use-upload' },
          { text: 'useCountDown', link: 'use-count-down' },
          { text: 'useToast', link: 'use-toast' },
          { text: 'useMessage', link: 'use-message' }
        ]
      }
    ]
  }
  // tools 文档
  sidebarTools(): DefaultTheme.SidebarItem[] {
    return [
      {
        text: '起步',
        items: [{ text: '脚手架与模板', link: 'intro' }]
      }, {
        text: 'API对比',
        items: [
          {
            text: '🔍 Vue3+Uniapp组合式API',
            link: 'api-list'
          },
          {
            text: '📖 Vue3与Uniapp的API对比',
            link: 'api-contrast'
          },
        ]
      }
    ]
  }
  // layout 文档
  sidebarLayout(): DefaultTheme.SidebarItem[] {
    return [
      {
        text: '起步',
        items: [{ text: '介绍', link: 'intro' }]
      }
    ]
  }
}

export default Menu
