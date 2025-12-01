// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
// 自定义样式
import './rainbow.css'
import './vars.css'
import './overrides.css'
import './iconfont.css'
// 全局引入ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { h, watch } from 'vue'
// 自定义组件
import DemoScan from '../components/DemoScan.vue'
import DemoPreview from '../components/DemoPreview.vue'
import FooterInfo from '../components/FooterInfo.vue'
import ArticleFooter from '../components/ArticleFooter.vue'
import CustomIcon from '../components/CustomIcon.vue'
import SitePV from '../components/SitePV.vue'
import ProjectInfo from '../components/ProjectInfo.vue'
import TipsDialog from '../components/TipsDialog.vue'
import ColorPicker from '../components/ColorPicker.vue'
import DemoModel from '../components/DemoModel.vue'
import ChatGroup from '../components/ChatGroup.vue'
import Donation from '../components/Donation.vue'
import ThemeGenerate from '../components/ThemeGenerate.vue'
import ThemesGenerate from '../components/ThemesGenerate.vue'
import TemplateDownload from '../components/TemplateDownload.vue'
import BadgeVersion from '../components/BadgeVersion.vue'
import BadgeText from '../components/BadgeText.vue'
import ToApi from '../components/ToApi.vue'
import IconList from '../components/IconList.vue'
import CustomBlock from '../components/CustomBlock.vue'
import SidebarAdvs from '../components/SidebarAdvs.vue'
import Layout from './Layout.vue'
import Contributors from '../components/Contributors.vue'
import Developers from '../components/Developers.vue'
import Overview from '../components/Overview.vue'
import Partners from '../components/Partners.vue'
import RainbowSwitcher from '../components/RainbowSwitcher.vue'
import RainbowAnimationSwitcher from '../components/RainbowAnimationSwitcher.vue'
import Version from '../components/Version.vue'

let homePageStyle: HTMLStyleElement | undefined = undefined

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout() {
    return h(Layout)
  },
  enhanceApp({ app, router }: { app: any; router: any }) {
    // 注册ElementPlus
    app.use(ElementPlus, {
      locale: zhCn
    })
    // 注册自定义全局组件
    // 扫码演示
    app.component('DemoScan', DemoScan)
    // 预览演示
    app.component('DemoPreview', DemoPreview)
    // 页脚信息
    app.component('FooterInfo', FooterInfo)
    // 文章页脚
    app.component('ArticleFooter', ArticleFooter)
    // 自定义图标
    app.component('CustomIcon', CustomIcon)
    // 站点访问量
    app.component('SitePV', SitePV)
    // 颜色选择器
    app.component('ColorPicker', ColorPicker)
    // 项目信息
    app.component('ProjectInfo', ProjectInfo)
    // 提示弹窗
    app.component('TipsDialog', TipsDialog)
    // 模型演示
    app.component('DemoModel', DemoModel)
    // 交流群
    app.component('ChatGroup', ChatGroup)
    // 捐赠
    app.component('Donation', Donation)
    // 主题生成
    app.component('ThemeGenerate', ThemeGenerate)
    // 主题批量生成
    app.component('ThemesGenerate', ThemesGenerate)
    // 模板下载
    app.component('TemplateDownload', TemplateDownload)
    // 版本徽章
    app.component('BadgeVersion', BadgeVersion)
    // 文本徽章
    app.component('BadgeText', BadgeText)
    // API 跳转
    app.component('ToApi', ToApi)
    // 图标列表
    app.component('IconList', IconList)
    // 自定义块
    app.component('CustomBlock', CustomBlock)
    // 侧边栏广告
    app.component('SidebarAdvs', SidebarAdvs)
    // 贡献者
    app.component('Contributors', Contributors)
    // 开发者
    app.component('Developers', Developers)
    // 概览
    app.component('Overview', Overview)
    // 合作伙伴
    app.component('Partners', Partners)
    // 彩虹开关
    app.component('RainbowSwitcher', RainbowSwitcher)
    // 彩虹动画开关
    app.component('RainbowAnimationSwitcher', RainbowAnimationSwitcher)
    // 版本号
    app.component('Version', Version)
    
    if (typeof window === 'undefined') return
    document.documentElement.classList.add('rainbow')

    // 统计函数
    function triggerStats(isHomePage = false) {
      // if (isHomePage) return
      // // 不蒜子统计刷新
      // if (window.bszCaller && window.bszCaller.fetch) {
      //   // 调用统计刷新
      //   window.bszCaller.fetch(
      //     '//busuanzi.ibruce.info/busuanzi?jsonpCallback=BusuanziCallback',
      //     function () {
      //       console.log('Notify bsz')
      //     }
      //   )
      // }
      // 百度统计刷新
      // if (window._hmt) {
      //   window._hmt.push([
      //     '_trackPageview',
      //     location.pathname + location.search
      //   ])
      //   console.log('Notify hm')
      // }
    }

    watch(
      () => router.route.data.relativePath,
      () => {
        updateHomePageStyle(location.pathname === '/')
        setTimeout(() => {
          triggerStats(location.pathname === '/')
        }, 300)
      },
      { immediate: true }
    )
  },
  setup() {

  }
}

// Speed up the rainbow animation on home page
function updateHomePageStyle(value: any) {
  if (value) {
    if (homePageStyle) return

    homePageStyle = document.createElement('style')
    homePageStyle.innerHTML = `
    :root {
      animation: rainbow 12s linear infinite;
    }`
    document.body.appendChild(homePageStyle)
  } else {
    if (!homePageStyle) return
    homePageStyle.remove()
    homePageStyle = undefined
  }
}
