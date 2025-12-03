// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
// giscusTalk 评论插件
import giscusTalk from 'vitepress-plugin-comment-with-giscus'
// 自定义样式
import 'virtual:group-icons.css'
import './vp-code-group.scss'
import './vp-code.scss'
import './vp-code-title.scss'
import './vp-hidden.scss'
import './vp-scrollbar.scss'
import './overrides.scss'
import './vars.scss'

// 全局引入ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { useData, useRoute } from 'vitepress'
import { h, watch } from 'vue'

// 自定义组件
import DemoScan from '../components/DemoScan.vue'
import DemoPreview from '../components/DemoPreview.vue'
import HomeFooter from '../components/HomeFooter.vue'
import CustomIcon from '../components/CustomIcon.vue'
import SitePV from '../components/SitePV.vue'
import ProjectInfo from '../components/ProjectInfo.vue'
import TipsDialog from '../components/TipsDialog.vue'
import DemoModel from '../components/DemoModel.vue'
import ChatGroup from '../components/ChatGroup.vue'
import Donation from '../components/Donation.vue'
import TemplateDownload from '../components/TemplateDownload.vue'
import ToApi from '../components/ToApi.vue'
import IconList from '../components/IconList.vue'
import CustomBlock from '../components/CustomBlock.vue'
import AdsLeftAside from '../components/AdsLeftAside.vue'
import MyLayout from '../components/MyLayout.vue'
import Contributors from '../components/Contributors.vue'
import Developers from '../components/Developers.vue'
import HomePartners from '../components/HomePartners.vue'
import HomeVersion from '../components/HomeVersion.vue'
import Backtotop from '../components/backtotop.vue' //返回顶部
import HomeUnderline from '../components/HomeUnderline.vue'

let homePageStyle: HTMLStyleElement | undefined = undefined

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,

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
    app.component('HomeFooter', HomeFooter)
    // 自定义图标
    app.component('CustomIcon', CustomIcon)
    // 站点访问量
    app.component('SitePV', SitePV)
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
    // 模板下载
    app.component('TemplateDownload', TemplateDownload)
    // API 跳转
    app.component('ToApi', ToApi)
    // 图标列表
    app.component('IconList', IconList)
    // 自定义块
    app.component('CustomBlock', CustomBlock)
    // 侧边栏广告
    app.component('AdsLeftAside', AdsLeftAside)
    // 贡献者
    app.component('Contributors', Contributors)
    // 开发者
    app.component('Developers', Developers)
    // 合作伙伴
    app.component('HomePartners', HomePartners)
    // 版本号
    app.component('HomeVersion', HomeVersion)
    // 返回顶部
    app.component('Backtotop', Backtotop)
    // 标题下划线
    app.component('HomeUnderline', HomeUnderline)

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

  Layout() {
    return h(MyLayout)
  },
  setup() {
    const route = useRoute()
    const { frontmatter } = useData()
    // giscus配置
    giscusTalk(
      {
        repo: 'l-spaces/wot-ui-plus-docs',
        repoId: 'R_kgDOQgyhYw',
        category: 'General',
        categoryId: 'DIC_kwDOQgyhY84CzR3J',
        mapping: 'pathname',
        inputPosition: 'bottom',
        lang: 'zh-CN'
      },
      {
        frontmatter,
        route
      },
      true // 是否启用评论功能；
    )
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
