/**
 * 组件概览
 */
<template>
  <div class="overview-container">
    <div class="search-content">
      <el-input
        ref="searchRef"
        v-model="query"
        :prefix-icon="Search"
        size="large"
        placeholder="Search Components"
      />
    </div>

    <div class="main-content">
      <div
        v-for="(group, groupIndex) in filteredSidebars"
        :key="groupIndex"
        class="component-group"
      >
        <p class="component-title">
          {{ group.text }}
          <el-tag effect="dark" round size="small">
            {{ group.children.length }}
          </el-tag>
        </p>
        <div class="card-content">
          <el-card
            v-for="(item, index) in group.children"
            :key="index"
            tabindex="0"
            shadow="hover"
            @click="toPage(item?.link)"
            @keydown.enter="toPage(item?.link)"
          >
            <template #header>
              <el-text truncated>{{ item.text }}</el-text>
              <span v-if="item.promotion" class="vp-tag">
                {{ item.promotion }}
              </span>
            </template>

            <template #default>
              <component :is="getIcon(item.link)" v-if="getIcon(item.link)" />
              <span v-else>Todo</span>
            </template>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, ref } from 'vue'
import { useRouter } from 'vitepress'
import { Search } from '@element-plus/icons-vue'
import overviewIcons from './overview-icons'
import type { InputInstance } from 'element-plus'

const router = useRouter()

interface SidebarItem {
  text: string
  link?: string
  promotion?: string
  children?: SidebarItem[]
}

const query = ref('')
const searchRef = ref<InputInstance>()
const sidebars: SidebarItem[] = [
  {
    text: '基础组件',
    children: [
      { text: 'Color 色彩', link: 'color' },
      { text: 'Icon 图标', link: 'icon' },
      { text: 'Image 图片', link: 'image' },
      { text: 'Button 按钮', link: 'button' },
      { text: 'Layout 布局', link: 'layout' },
      { text: 'Cell 单元格', link: 'cell' },
      { text: 'Badge 徽标数', link: 'badge' },
      { text: 'Tag 标签', link: 'tag' },
      { text: 'Text 文本', link: 'text' },
      { text: 'Fab 悬浮按钮', link: 'fab' },
      { text: 'RootPortal 根节点传送', link: 'rootPortal' },
      { text: 'ConfigProvider 全局配置', link: 'configProvider' }
    ]
  },
  {
    text: '表单组件',
    children: [
      { text: 'Form 表单', link: 'form' },
      { text: 'Input 输入框', link: 'input' },
      { text: 'Textarea 文本域', link: 'textarea' },
      { text: 'Calendar 日历', link: 'calendar' },
      { text: 'Select 列选择器', link: 'select' },
      { text: 'Keyboard 键盘', link: 'keyboard' },
      { text: 'Picker 选择器', link: 'picker' },
      { text: 'Rate 评分', link: 'rate' },
      { text: 'Search 搜索', link: 'search' },
      { text: 'NumberBox 步进器', link: 'numberBox' },
      { text: 'Upload 上传', link: 'upload' },
      {
        text: 'VerificationCode 验证码倒计时',
        link: 'verificationCode'
      },
      { text: 'Field 输入框', link: 'field' },
      { text: 'Checkbox 复选框', link: 'checkbox' },
      { text: 'Radio 单选框', link: 'radio' },
      { text: 'Switch 开关选择器', link: 'switch' },
      { text: 'Slider 滑动选择器', link: 'slider' }
    ]
  },
  {
    text: '数据组件',
    children: [
      { text: 'CircleProgress 圆形进度条', link: 'circleProgress' },
      { text: 'LineProgress 线形进度条', link: 'lineProgress' },
      { text: 'Table 表格', link: 'table' },
      { text: 'CountDown 倒计时', link: 'countDown' },
      { text: 'CountTo 数字滚动', link: 'countTo' }
    ]
  },
  {
    text: '反馈组件',
    children: [
      { text: 'ActionSheet 操作菜单', link: 'actionSheet' },
      { text: 'AlertTips 警告提示', link: 'alertTips' },
      { text: 'Toast 消息提示', link: 'toast' },
      { text: 'NoticeBar 滚动通知', link: 'noticeBar' },
      { text: 'TopTips 顶部提示', link: 'topTips' },
      { text: 'Collapse 折叠面板', link: 'collapse' },
      { text: 'Popup 弹出层', link: 'popup' },
      { text: 'SwipeAction 滑动单元格', link: 'swipeAction' },
      { text: 'Modal 模态框', link: 'modal' },
      { text: 'FullScreen 压窗屏', link: 'fullScreen' }
    ]
  },
  {
    text: '布局组件',
    children: [
      { text: 'Line 线条', link: 'line' },
      { text: 'Card 卡片', link: 'card' },
      { text: 'Mask 遮罩层', link: 'mask' },
      { text: 'NoNetwork 无网络提示', link: 'noNetwork' },
      { text: 'Grid 宫格布局', link: 'grid' },
      { text: 'Swiper 轮播图', link: 'swiper' },
      { text: 'TimeLine 时间轴', link: 'timeLine' },
      { text: 'Skeleton 骨架屏', link: 'skeleton' },
      { text: 'Sticky 吸顶', link: 'sticky' },
      { text: 'Waterfall 瀑布流', link: 'waterfall' },
      { text: 'Divider 分割线', link: 'divider' }
    ]
  },
  {
    text: '导航组件',
    children: [
      { text: 'Dropdown 下拉菜单', link: 'dropdown' },
      { text: 'Tabbar 底部导航栏', link: 'tabbar' },
      { text: 'BackTop 返回顶部', link: 'backTop' },
      { text: 'Navbar 导航栏', link: 'navbar' },
      { text: 'Tabs 标签', link: 'tabs' },
      { text: 'TabsSwiper 全屏选项卡', link: 'tabsSwiper' },
      { text: 'Subsection 分段器', link: 'subsection' },
      { text: 'IndexList 索引列表', link: 'indexList' },
      { text: 'Steps 步骤条', link: 'steps' },
      { text: 'Empty 内容为空', link: 'empty' },
      { text: 'Link 超链接', link: 'link' },
      { text: 'Section 查看更多', link: 'section' },
      { text: 'Pagination 分页', link: 'pagination' }
    ]
  },
  {
    text: '其他组件',
    children: [
      { text: 'MessageInput 验证码输入', link: 'messageInput' },
      { text: 'Loadmore 加载更多', link: 'loadMore' },
      { text: 'ReadMore 展开阅读更多', link: 'readMore' },
      { text: 'LazyLoad 懒加载', link: 'lazyLoad' },
      { text: 'Gap 间隔槽', link: 'gap' },
      { text: 'Avatar 头像', link: 'avatar' },
      { text: 'Loading 加载动画', link: 'loading' },
      { text: 'LoadingPopup 加载弹窗', link: 'loadingPopup' },
      { text: 'safeAreaInset 底部安全区', link: 'safeAreaInset' }
    ]
  }
]

const filteredSidebars = computed(() =>
  sidebars
    .map(group => ({
      ...group,
      children:
        group?.children?.filter(item => {
          const value = query.value.trim().toLowerCase()
          return (
            group.text.toLowerCase().includes(value) ||
            item.text.toLowerCase().includes(value)
          )
        }) ?? []
    }))
    .filter(group => group.children.length)
)

const toPage = (link?: string) => {
  if (link) {
    router.go(`/zh/components/${link}`)
  }
}

const getIcon = (link?: string) => {
  if (!link) return null
  const name = link.split('/').pop()
  // @ts-ignore
  return name ? overviewIcons[name] : null
}

onMounted(() => {
  nextTick(() => {
    searchRef.value?.focus()
  })
})
</script>

<style scoped lang="scss">
.overview-container {
  position: relative;

  .search-content {
    position: sticky;
    top: 70px;
    z-index: 10;

    .el-input {
      background: var(--bg-color);
    }
  }

  .main-content {
    .component-group {
      margin-top: 32px;

      .component-title {
        display: flex;
        align-items: center;
        font-size: 20px;
        font-weight: 600;
        color: var(--el-text-color-primary);
        gap: 8px;
      }

      .card-content {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 16px;

        :deep(.el-card) {
          cursor: pointer;
          transition: none;

          &:focus-visible {
            outline: 2px solid var(--el-color-primary);
            outline-offset: 1px;
          }

          .el-card__header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 8px;
            padding: 8px 12px;

            .el-text {
              font-size: 14px;
              font-weight: 500;
              color: var(--el-text-color-regular);
              line-height: 24px;
            }
          }

          .el-card__body {
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            aspect-ratio: 280 / 180;

            svg {
              width: 100%;
              height: auto;
            }
          }
        }
      }
    }

    .designed-by {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 5px;
      font-size: 14px;
    }
  }
}
</style>
