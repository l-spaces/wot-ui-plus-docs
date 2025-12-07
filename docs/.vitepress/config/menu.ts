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
            text: '展示组件',
            link: `${this.localeStr}/wot/icon`
          },
          {
            text: '表单组件',
            link: `${this.localeStr}/wot/input`
          },
          {
            text: '日期时间组件',
            link: `${this.localeStr}/wot/calendar`
          },
          {
            text: '交互组件',
            link: `${this.localeStr}/wot/popup`
          },
          {
            text: '输入设备组件',
            link: `${this.localeStr}/wot/keyboard`
          },
          {
            text: '高级组件',
            link: `${this.localeStr}/wot/transition`
          },
          {
            text: '配置组件',
            link: `${this.localeStr}/wot/configProvider`
          },
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
        text: '基础组件',
        collapsed: false,
        items: [
          {
            link: 'button',
            text: 'Button 按钮组件'
          },
          {
            link: 'fab',
            text: 'Fab 悬浮按钮'
          },
          {
            link: 'sortButton',
            text: 'SortButton 排序按钮'
          },
          {
            link: 'switch',
            text: 'Switch 开关组件'
          },
          {
            link: 'layout',
            text: 'Layout 布局组件'
          },
          {
            link: 'grid',
            text: 'Grid 网格布局'
          },
          {
            link: 'gap',
            text: 'Gap 间隔组件'
          },
          {
            link: 'divider',
            text: 'Divider 分割线'
          },
          {
            link: 'card',
            text: 'Card 卡片组件'
          },
          {
            link: 'cell',
            text: 'Cell 单元格组件'
          },
          {
            link: 'navbar',
            text: 'Navbar 导航栏'
          },
          {
            link: 'noticeBar',
            text: 'NoticeBar 通知栏'
          },
          {
            link: 'tabbar',
            text: 'Tabbar 标签栏'
          },
          {
            link: 'tabs',
            text: 'Tabs 标签页'
          },
          {
            link: 'sidebar',
            text: 'Sidebar 侧边栏'
          },
          {
            link: 'steps',
            text: 'Steps 步骤条'
          },
          {
            link: 'backtop',
            text: 'Backtop 返回顶部'
          },
          {
            link: 'indexBar',
            text: 'IndexBar 索引栏'
          }
        ]
      },
      {
        text: '展示组件',
        collapsed: false,
        items: [
          {
            link: 'icon',
            text: 'Icon 图标组件'
          },
          {
            link: 'img',
            text: 'Img 图片组件'
          },
          {
            link: 'imgCropper',
            text: 'ImgCropper 图片裁剪'
          },
          {
            link: 'avatar',
            text: 'Avatar 头像组件'
          },
          {
            link: 'badge',
            text: 'Badge 徽标组件'
          },
          {
            link: 'text',
            text: 'Text 文本组件'
          },
          {
            link: 'tag',
            text: 'Tag 标签组件'
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
            link: 'rate',
            text: 'Rate 评分组件'
          },
          {
            link: 'skeleton',
            text: 'Skeleton 骨架屏'
          },
          {
            link: 'watermark',
            text: 'Watermark 水印'
          },
          {
            link: 'table',
            text: 'Table 表格组件'
          },
          {
            link: 'swiper',
            text: 'Swiper 轮播图'
          },
          {
            link: 'waterfall',
            text: 'Waterfall 瀑布流'
          },
          {
            link: 'sticky',
            text: 'Sticky 粘性布局'
          }
        ]
      },
      {
        text: '表单组件',
        collapsed: false,
        items: [
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
            link: 'passwordInput',
            text: 'PasswordInput 密码输入框'
          },
          {
            link: 'code',
            text: 'Code 验证码获取'
          },
          {
            link: 'codeInput',
            text: 'CodeInput 验证码输入'
          },
          {
            link: 'search',
            text: 'Search 搜索框'
          },
          {
            link: 'radio',
            text: 'Radio 单选框'
          },
          {
            link: 'checkbox',
            text: 'Checkbox 复选框'
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
            link: 'colPicker',
            text: 'ColPicker 多列选择器'
          },
          {
            link: 'selectPicker',
            text: 'SelectPicker 选择选择器'
          },
          {
            link: 'slider',
            text: 'Slider 滑块'
          },
          {
            link: 'segmented',
            text: 'Segmented 分段器'
          },
          {
            link: 'form',
            text: 'Form 表单组件'
          }
        ]
      },
      {
        text: '日期时间组件',
        collapsed: false,
        items: [
          {
            link: 'calendar',
            text: 'Calendar 日历组件'
          },
          {
            link: 'calendarView',
            text: 'CalendarView 日历视图'
          },
          {
            link: 'datetimePicker',
            text: 'DatetimePicker 日期时间选择器'
          },
          {
            link: 'datetimePickerView',
            text: 'DatetimePickerView 日期时间选择器视图'
          },
          {
            link: 'countDown',
            text: 'CountDown 倒计时'
          },
          {
            link: 'countTo',
            text: 'CountTo 数字动画'
          },
          {
            link: 'dateStrip',
            text: 'DateStrip 日期横条'
          }
        ]
      },
      {
        text: '交互组件',
        collapsed: false,
        items: [
          {
            link: 'popup',
            text: 'Popup 弹出层'
          },
          {
            link: 'popover',
            text: 'Popover 气泡弹出框'
          },
          {
            link: 'overlay',
            text: 'Overlay 遮罩层'
          },
          {
            link: 'toast',
            text: 'Toast 轻提示'
          },
          {
            link: 'notify',
            text: 'Notify 通知提示'
          },
          {
            link: 'messageBox',
            text: 'MessageBox 消息框'
          },
          {
            link: 'tooltip',
            text: 'Tooltip 文字提示'
          },
          {
            link: 'actionSheet',
            text: 'ActionSheet 动作面板'
          },
          {
            link: 'loading',
            text: 'Loading 加载中'
          },
          {
            link: 'loadingPage',
            text: 'LoadingPage 加载页面'
          },
          {
            link: 'loadmore',
            text: 'Loadmore 加载更多'
          },
          {
            link: 'statusTip',
            text: 'StatusTip 状态提示'
          },
          {
            link: 'swipeAction',
            text: 'SwipeAction 滑动操作'
          },
          {
            link: 'collapse',
            text: 'Collapse 折叠面板'
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
            link: 'sliderButton',
            text: 'SliderButton 滑动按钮'
          }
        ]
      },
      {
        text: '输入设备组件',
        collapsed: false,
        items: [
          {
            link: 'keyboard',
            text: 'Keyboard 键盘组件'
          },
          {
            link: 'signature',
            text: 'Signature 签名板'
          }
        ]
      },
      {
        text: '高级组件',
        collapsed: false,
        items: [
          {
            link: 'transition',
            text: 'Transition 动画组件'
          },
          {
            link: 'curtain',
            text: 'Curtain 幕布组件'
          },
          {
            link: 'lazyLoad',
            text: 'LazyLoad 懒加载'
          },
          {
            link: 'resize',
            text: 'Resize 尺寸监听'
          },
          {
            link: 'rootPortal',
            text: 'RootPortal 根节点传送'
          },
          {
            link: 'pagination',
            text: 'Pagination 分页器'
          },
          {
            link: 'tree',
            text: 'Tree 树形控件'
          },
          {
            link: 'upload',
            text: 'Upload 上传组件'
          },
          {
            link: 'tour',
            text: 'Tour 引导组件'
          }
        ]
      },
      {
        text: '配置组件',
        collapsed: false,
        items: [
          {
            link: 'configProvider',
            text: 'ConfigProvider 全局配置'
          },
          {
            link: 'color',
            text: 'Color 主题配置'
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
