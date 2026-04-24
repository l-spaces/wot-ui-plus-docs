# UI组件快速上手指南

## 环境要求与安装步骤

### 前置环境要求

| 环境 | 版本要求 | 说明 |
| ---- | -------- | ---- |
| Node.js | ≥ 14.0.0 | 推荐使用最新稳定版 |
| npm | ≥ 6.0.0 | 或使用 yarn ≥ 1.22.0，推荐使用 pnpm |
| HBuilderX | ≥ 3.8.7 | 使用 HBuilderX 开发时需要 |
| uni-app | Vue 3 版本 | 仅支持 Vue 3，不支持 Vue 2 |
| sass | 1.75.0 | 高版本废除了 `@import` 语法，请锁定此版本 |
| Vue | ≥ 3.2.47 | 组件库基于 Vue 3 构建 |
| 编译器 | Vite | 推荐使用 Vite 编译器 |

:::warning 注意
sass 版本必须锁定为 `1.75.0`，更高版本已废弃 `@import` 语法，会导致组件库样式编译失败。在 `package.json` 中应明确指定：
```json
{
  "devDependencies": {
    "sass": "1.75.0"
  }
}
```
:::

### 支持平台

wot-ui-plus 支持以下平台：

| 平台 | 支持状态 | 说明 |
| ---- | -------- | ---- |
| H5 | ✅ 支持 | 支持 Safari、Chrome、Edge、Firefox 等主流浏览器 |
| 微信小程序 | ✅ 支持 | — |
| 支付宝小程序 | ✅ 支持 | — |
| QQ 小程序 | ✅ 支持 | — |
| 钉钉小程序 | ✅ 支持 | — |
| App | ✅ 支持 | 支持 app-vue，不支持 app-nvue / app-uvue |
| 百度小程序 | ⚠️ 待验证 | 部分功能可能不兼容 |
| 字节跳动小程序 | ⚠️ 待验证 | 部分功能可能不兼容 |
| 快应用 | ⚠️ 待验证 | 华为、联盟快应用待验证 |

### 安装方式

#### npm 安装

```bash
# 使用 npm 安装
npm install wot-ui-plus --save

# 使用 yarn 安装
yarn add wot-ui-plus

# 使用 pnpm 安装（推荐）
pnpm add wot-ui-plus
```

#### 指定版本安装

```bash
# 安装指定版本
npm install wot-ui-plus@3.3.1 --save

# 安装最新版本
npm install wot-ui-plus@latest --save
```

#### HBuilderX 导入

1. 打开 HBuilderX，在项目中右键点击 `uni_modules` 目录
2. 选择「导入插件」→「从插件市场导入」
3. 搜索「wot-ui-plus」并点击导入
4. 等待导入完成即可使用

#### 手动下载引入

1. 从 GitHub 仓库下载最新版本：[https://github.com/l-spaces/wot-ui-plus](https://github.com/l-spaces/wot-ui-plus)
2. 将下载的文件解压，将 `src/uni_modules/wot-ui-plus` 目录复制到你的项目的 `src/uni_modules` 目录下
3. 在项目中直接使用组件

### 验证安装成功

在项目中创建一个测试页面，引入并使用 wot-ui-plus 的组件，验证安装是否成功。

```vue
<template>
  <view class="test-container">
    <wd-button type="primary" @click="showToast">点击测试</wd-button>
    <wd-toast />
  </view>
</template>

<script setup lang="ts">
import { useToast } from 'wot-ui-plus'

const toast = useToast()

const showToast = () => {
  toast.show('安装成功！')
}
</script>

<style scoped>
.test-container {
  padding: 20px;
  text-align: center;
}
</style>
```

如果页面能正常显示按钮，点击后能弹出提示框，则说明安装成功。

:::tip 提示
使用 `useToast` 时，必须在模板中同时放置 `<wd-toast />` 组件，否则 Toast 将无法正常显示。`useMessage` 和 `useNotify` 同理，需要分别放置 `<wd-message-box />` 和 `<wd-notify />` 组件。
:::

## 配置自动引入组件

### Volar 类型提示支持

如需在 CLI 项目中获得 Volar 的全局组件类型提示，请在 `tsconfig.json` 中添加：

```json
{
  "compilerOptions": {
    // npm 方式
    "types": ["wot-ui-plus/global"]
    // uni_modules 方式
    // "types": ["@/uni_modules/wot-ui-plus/global"]
  }
}
```

配置后，在模板中使用 `<wd-xxx>` 组件时，Volar 将提供完整的类型提示和自动补全。

### 基于 easycom 配置自动引入组件

uni-app 内置了 easycom 机制，配置后无需手动 import 组件即可直接在模板中使用。在 `pages.json` 中配置 easycom 规则：

```json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      // npm 方式
      "^wd-(.*)": "wot-ui-plus/components/wd-$1/wd-$1.vue"
      // uni_modules 方式
      // "^wd-(.*)": "@/uni_modules/wot-ui-plus/components/wd-$1/wd-$1.vue"
    }
  },
  "pages": [
    // ...
  ]
}
```

配置完成后，在模板中直接使用组件即可，无需手动 import：

```vue
<template>
  <wd-button type="primary">主要按钮</wd-button>
</template>
```

### 手动按需引入

如果不使用 easycom，也可以手动引入组件：

```vue
<template>
  <view>
    <wd-button type="primary">主要按钮</wd-button>
    <wd-toast />
  </view>
</template>

<script setup lang="ts">
// npm 方式
import WdButton from 'wot-ui-plus/components/wd-button/wd-button.vue'
import WdToast from 'wot-ui-plus/components/wd-toast/wd-toast.vue'

// uni_modules 方式
// import WdButton from '@/uni_modules/wot-ui-plus/components/wd-button/wd-button.vue'
// import WdToast from '@/uni_modules/wot-ui-plus/components/wd-toast/wd-toast.vue'
</script>
```

## 主题定制方案

wot-ui-plus 提供了灵活的主题定制能力，支持通过 CSS 变量覆盖、ConfigProvider 组件配置、暗黑模式切换等方式自定义主题。

### 主题变量覆盖

wot-ui-plus 的所有样式均基于 CSS 变量构建，变量统一使用 `--wot-` 前缀。可以在全局样式文件中覆盖这些变量来修改主题。

```scss
/* app.scss */
:root {
  /* 主色调 */
  --wot-color-theme: #2979ff;
  /* 成功色 */
  --wot-color-success: #19be6b;
  /* 警告色 */
  --wot-color-warning: #ff9900;
  /* 危险色 */
  --wot-color-danger: #fa4350;
  /* 信息色 */
  --wot-color-info: #909399;
}
```

#### 基础主题变量列表

以下是常用的基础主题变量，完整变量列表请参考各组件文档：

| 变量名 | 默认值 | 说明 |
| ------ | ------ | ---- |
| `--wot-color-theme` | `#2979ff` | 主题色 |
| `--wot-color-success` | `#19be6b` | 成功色 |
| `--wot-color-warning` | `#ff9900` | 警告色 |
| `--wot-color-danger` | `#fa4350` | 危险色 |
| `--wot-color-info` | `#909399` | 信息色 |
| `--wot-color-title` | `rgb(0, 0, 0)` | 标题文字颜色 |
| `--wot-color-content` | `#262626` | 正文文字颜色 |
| `--wot-color-bg` | `#f5f5f5` | 背景色 |
| `--wot-color-border` | `#d9d9d9` | 边框颜色 |
| `--wot-fs-title` | `16px` | 标题字号 |
| `--wot-fs-content` | `14px` | 正文字号 |
| `--wot-fs-secondary` | `12px` | 辅助信息字号 |
| `--wot-size-side-padding` | `15px` | 屏幕两侧留白间距 |

### 使用 ConfigProvider 定制主题

ConfigProvider 是一个全局配置组件，可以用来定制主题变量、切换暗黑模式等。它通过 `themeVars` 属性接收驼峰命名的主题变量对象，内部会自动将其转换为对应的 CSS 变量。

```vue
<template>
  <wd-config-provider :theme-vars="themeVars">
    <router-view />
  </wd-config-provider>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const themeVars = reactive({
  colorTheme: '#2979ff',
  colorSuccess: '#19be6b',
  colorWarning: '#ff9900',
  colorDanger: '#fa4350'
})
</script>
```

:::warning 注意
`themeVars` 中的属性名使用驼峰命名法（如 `colorTheme`），组件内部会自动转换为 CSS 变量名（如 `--wot-color-theme`）。请勿直接使用 CSS 变量名作为属性名。
:::

#### themeVars 命名规则

CSS 变量名与驼峰属性名的转换规则如下：

- 去除 `--wot-` 前缀
- 将 `kebab-case` 转换为 `camelCase`

示例对照：

| CSS 变量名 | themeVars 属性名 |
| ---------- | ---------------- |
| `--wot-color-theme` | `colorTheme` |
| `--wot-button-primary-bg-color` | `buttonPrimaryBgColor` |
| `--wot-cell-title-fs` | `cellTitleFs` |
| `--wot-tabs-nav-active-color` | `tabsNavActiveColor` |

### 暗黑模式切换

wot-ui-plus 内置了暗黑模式支持，可以通过 ConfigProvider 的 `theme` 属性切换。`theme` 属性支持 `'light'` 和 `'dark'` 两个值。

```vue
<template>
  <wd-config-provider :theme="theme" :theme-vars="themeVars">
    <view class="container">
      <wd-button type="primary" @click="toggleTheme">切换主题</wd-button>
    </view>
  </wd-config-provider>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const theme = ref<'light' | 'dark'>('light')

const themeVars = reactive({
  colorTheme: '#2979ff'
})

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>
```

当 `theme` 设置为 `'dark'` 时，ConfigProvider 会在根元素上添加 `wot-theme-dark` 类名，组件库内部的暗黑模式样式将自动生效。

#### 暗黑模式相关变量

| 变量名 | 默认值 | 说明 |
| ------ | ------ | ---- |
| `--wot-dark-background` | `#131313` | 暗黑模式背景色1 |
| `--wot-dark-background2` | `#1b1b1b` | 暗黑模式背景色2 |
| `--wot-dark-background3` | `#141414` | 暗黑模式背景色3 |
| `--wot-dark-background4` | `#323233` | 暗黑模式背景色4 |
| `--wot-dark-color` | `rgb(255, 255, 255)` | 暗黑模式文字颜色 |
| `--wot-dark-border-color` | `#3a3a3c` | 暗黑模式边框颜色 |

## 全局配置项

### 尺寸设置

wot-ui-plus 组件支持 `size` 属性来设置组件尺寸，部分组件（如 Button、Input、Cell 等）支持 `small`、`medium`（默认）、`large` 三种尺寸。

```vue
<template>
  <view>
    <wd-button size="small" type="primary">小号按钮</wd-button>
    <wd-button size="medium" type="primary">中号按钮</wd-button>
    <wd-button size="large" type="primary">大号按钮</wd-button>
  </view>
</template>
```

### 语言国际化

wot-ui-plus 内置了 15 种语言包，支持运行时动态切换语言。

#### 支持的语言

| 语言 | 代码 |
| ---- | ---- |
| 简体中文 | zh-CN |
| 繁体中文（香港） | zh-HK |
| 繁体中文（台湾） | zh-TW |
| 英语 | en-US |
| 日语 | ja-JP |
| 韩语 | ko-KR |
| 阿拉伯语 | ar-SA |
| 德语 | de-DE |
| 西班牙语 | es-ES |
| 法语 | fr-FR |
| 葡萄牙语 | pt-PT |
| 俄语 | ru-RU |
| 泰语 | th-TH |
| 土耳其语 | tr-TR |
| 维吾尔语 | ug-CN |
| 越南语 | vi-VN |

#### 使用 Locale 模块切换语言

```typescript
import { Locale } from 'wot-ui-plus'

// 切换为英文
Locale.use('en-US')

// 切换为日文
Locale.use('ja-JP')

// 切换语言的同时添加自定义语言包
Locale.use('en-US', {
  button: {
    confirm: 'OK',
    cancel: 'Cancel'
  }
})
```

#### 添加自定义语言包

```typescript
import { Locale } from 'wot-ui-plus'

// 添加新的语言包
Locale.add({
  'fr-FR': {
    calendar: {
      placeholder: 'Sélectionner',
      title: 'Choisir une date',
      confirm: 'Confirmer',
      cancel: 'Annuler'
    },
    picker: {
      cancel: 'Annuler',
      done: 'Confirmer',
      placeholder: 'Sélectionner'
    }
  }
})

// 切换到自定义语言
Locale.use('fr-FR')
```

#### 扩展现有语言包

```typescript
import { Locale } from 'wot-ui-plus'

// 扩展现有的中文语言包
Locale.add({
  'zh-CN': {
    custom: {
      label: '自定义标签'
    }
  }
})
```

#### 获取当前语言

```typescript
import { useCurrentLang } from 'wot-ui-plus/locale'

const currentLang = useCurrentLang()
console.log(currentLang.value) // 'zh-CN'
```

### 函数式调用组件

wot-ui-plus 提供了三个函数式调用的组件：Toast、MessageBox、Notify。它们通过 Composition API 的方式使用，无需在模板中手动控制显示隐藏。

#### useToast

Toast 用于轻量级的消息提示。

```vue
<template>
  <view>
    <wd-button @click="showSuccess">成功提示</wd-button>
    <wd-button @click="showError">错误提示</wd-button>
    <wd-button @click="showLoading">加载提示</wd-button>
    <wd-toast />
  </view>
</template>

<script setup lang="ts">
import { useToast } from 'wot-ui-plus'

const toast = useToast()

const showSuccess = () => {
  toast.success('操作成功')
}

const showError = () => {
  toast.error('操作失败')
}

const showLoading = () => {
  toast.loading({
    msg: '加载中...',
    duration: 0 // 不自动关闭
  })
  // 手动关闭
  setTimeout(() => {
    toast.close()
  }, 3000)
}
</script>
```

**Toast 方法列表：**

| 方法名 | 说明 | 参数 |
| ------ | ---- | ---- |
| `show` | 显示 Toast | `ToastOptions \| string` |
| `success` | 显示成功提示 | `ToastOptions \| string` |
| `error` | 显示错误提示 | `ToastOptions \| string` |
| `warning` | 显示警告提示 | `ToastOptions \| string` |
| `info` | 显示信息提示 | `ToastOptions \| string` |
| `loading` | 显示加载提示 | `ToastOptions \| string` |
| `close` | 关闭 Toast | — |

**ToastOptions 参数：**

| 参数 | 类型 | 默认值 | 说明 |
| ---- | ---- | ------ | ---- |
| msg | `string` | `''` | 提示信息 |
| duration | `number` | `2000` | 展示时长（ms），值为 0 时不自动关闭 |
| position | `'top' \| 'middle-top' \| 'middle' \| 'bottom'` | `'middle-top'` | 展示位置 |
| iconName | `'success' \| 'error' \| 'warning' \| 'loading' \| 'info'` | `''` | 图标类型 |
| iconSize | `number` | — | 图标大小 |
| direction | `'vertical' \| 'horizontal'` | `'horizontal'` | 图标与文字排列方向 |
| cover | `boolean` | `false` | 是否显示遮罩层 |
| zIndex | `number` | `100` | 层级 |
| opened | `() => void` | — | 完全展示后的回调 |
| closed | `() => void` | — | 完全关闭时的回调 |

:::tip 多个 Toast 实例
如果页面中需要同时使用多个 Toast 实例，可以通过 `selector` 参数区分：

```vue
<template>
  <view>
    <wd-toast selector="toast1" />
    <wd-toast selector="toast2" />
  </view>
</template>

<script setup lang="ts">
import { useToast } from 'wot-ui-plus'

const toast1 = useToast('toast1')
const toast2 = useToast('toast2')

toast1.success('第一个 Toast')
toast2.error('第二个 Toast')
</script>
```
:::

#### useMessage

MessageBox 用于弹窗确认、输入等交互场景，返回 Promise 对象。

```vue
<template>
  <view>
    <wd-button @click="showAlert">Alert 弹框</wd-button>
    <wd-button @click="showConfirm">Confirm 弹框</wd-button>
    <wd-button @click="showPrompt">Prompt 输入框</wd-button>
    <wd-message-box />
  </view>
</template>

<script setup lang="ts">
import { useMessage } from 'wot-ui-plus'

const message = useMessage()

const showAlert = async () => {
  await message.alert('这是一个提示框')
  console.log('Alert 关闭')
}

const showConfirm = async () => {
  try {
    await message.confirm({
      title: '确认操作',
      msg: '确定要执行此操作吗？'
    })
    console.log('用户点击了确认')
  } catch {
    console.log('用户点击了取消')
  }
}

const showPrompt = async () => {
  try {
    const { value } = await message.prompt({
      title: '请输入',
      inputType: 'text',
      inputPlaceholder: '请输入内容'
    })
    console.log('用户输入:', value)
  } catch {
    console.log('用户取消了输入')
  }
}
</script>
```

**Message 方法列表：**

| 方法名 | 说明 | 参数 |
| ------ | ---- | ---- |
| `show` | 显示 MessageBox | `MessageOptions \| string` |
| `alert` | 显示 Alert 弹框 | `MessageOptions \| string` |
| `confirm` | 显示 Confirm 弹框 | `MessageOptions \| string` |
| `prompt` | 显示 Prompt 输入弹框 | `MessageOptions \| string` |
| `close` | 关闭 MessageBox | — |

#### useNotify

Notify 用于页面顶部的通知提示。

```vue
<template>
  <view>
    <wd-button @click="showDanger">危险通知</wd-button>
    <wd-button @click="showSuccess">成功通知</wd-button>
    <wd-notify />
  </view>
</template>

<script setup lang="ts">
import { useNotify } from 'wot-ui-plus'

const { showNotify, closeNotify } = useNotify()

const showDanger = () => {
  showNotify({
    type: 'danger',
    message: '操作失败，请重试'
  })
}

const showSuccess = () => {
  showNotify({
    type: 'success',
    message: '操作成功'
  })
}
</script>
```

**Notify 方法列表：**

| 方法名 | 说明 | 参数 |
| ------ | ---- | ---- |
| `showNotify` | 显示通知 | `NotifyProps \| string` |
| `closeNotify` | 关闭通知 | — |

**NotifyProps 参数：**

| 参数 | 类型 | 默认值 | 说明 |
| ---- | ---- | ------ | ---- |
| type | `'primary' \| 'success' \| 'danger' \| 'warning'` | `'danger'` | 通知类型 |
| message | `string` | `''` | 通知内容 |
| duration | `number` | `3000` | 展示时长（ms），值为 0 时不自动关闭 |
| position | `'top' \| 'bottom'` | `'top'` | 展示位置 |
| zIndex | `number` | `99` | 层级 |
| color | `string` | — | 自定义文字颜色 |
| background | `string` | — | 自定义背景颜色 |

**设置 Notify 默认选项：**

```typescript
import { setNotifyDefaultOptions, resetNotifyDefaultOptions } from 'wot-ui-plus'

// 设置默认选项
setNotifyDefaultOptions({
  type: 'primary',
  duration: 5000
})

// 重置为默认选项
resetNotifyDefaultOptions()
```

### Composables 组合式函数

wot-ui-plus 还导出了一系列实用的组合式函数，可以在业务开发中直接使用：

```typescript
import {
  useCell,
  useChildren,
  useCountDown,
  useLockScroll,
  useParent,
  usePopover,
  useQueue,
  useRaf,
  useTouch,
  useTranslate,
  useUpload,
  useConfigProvider
} from 'wot-ui-plus'
```

| 函数名 | 说明 |
| ------ | ---- |
| `useCell` | Cell 组件相关逻辑 |
| `useChildren` | 父子组件关系管理 |
| `useCountDown` | 倒计时逻辑 |
| `useLockScroll` | 锁定滚动 |
| `useParent` | 获取父组件实例 |
| `usePopover` | Popover 弹出层定位 |
| `useQueue` | 队列管理 |
| `useRaf` | requestAnimationFrame 封装 |
| `useTouch` | 触摸事件处理 |
| `useTranslate` | 国际化翻译 |
| `useUpload` | 文件上传逻辑 |
| `useConfigProvider` | 主题配置 |

### 其他导出

wot-ui-plus 还导出了以下实用工具：

```typescript
// dayjs 日期处理库
import { dayjs } from 'wot-ui-plus'

// 通用工具函数
import { CommonUtil } from 'wot-ui-plus'

// 点击外部检测
import { clickOut } from 'wot-ui-plus'

// 主题变量类型定义
import type { ConfigProviderThemeVars } from 'wot-ui-plus'
```

## 组件列表

wot-ui-plus 提供了 88+ 个高质量组件，覆盖移动端主流场景。以下是按功能分类的组件列表：

### 基础组件

| 组件名 | 说明 |
| ------ | ---- |
| wd-button | 按钮 |
| wd-icon | 图标 |
| wd-cell | 单元格 |
| wd-cell-group | 单元格组 |
| wd-config-provider | 全局配置 |
| wd-text | 文本 |
| wd-divider | 分割线 |
| wd-gap | 间隔 |

### 表单组件

| 组件名 | 说明 |
| ------ | ---- |
| wd-input | 输入框 |
| wd-textarea | 文本域 |
| wd-radio | 单选框 |
| wd-radio-group | 单选框组 |
| wd-checkbox | 复选框 |
| wd-checkbox-group | 复选框组 |
| wd-switch | 开关 |
| wd-slider | 滑块 |
| wd-slider-button | 滑动验证按钮 |
| wd-rate | 评分 |
| wd-picker | 选择器 |
| wd-picker-view | 选择器视图 |
| wd-datetime-picker | 日期时间选择器 |
| wd-datetime-picker-view | 日期时间选择器视图 |
| wd-calendar | 日历 |
| wd-calendar-view | 日历视图 |
| wd-col-picker | 多列选择器 |
| wd-select-picker | 筛选选择器 |
| wd-search | 搜索 |
| wd-input-number | 数字输入框 |
| wd-code-input | 验证码输入 |
| wd-password-input | 密码输入框 |
| wd-form | 表单 |
| wd-form-item | 表单项 |
| wd-upload | 文件上传 |
| wd-signature | 签名 |

### 反馈组件

| 组件名 | 说明 |
| ------ | ---- |
| wd-toast | 轻提示 |
| wd-message-box | 消息弹框 |
| wd-notify | 消息通知 |
| wd-action-sheet | 动作面板 |
| wd-popup | 弹出层 |
| wd-overlay | 遮罩层 |
| wd-loading | 加载 |
| wd-loading-page | 加载页 |
| wd-loadmore | 加载更多 |
| wd-progress | 进度条 |
| wd-circle | 环形进度条 |
| wd-skeleton | 骨架屏 |
| wd-status-tip | 状态提示 |

### 导航组件

| 组件名 | 说明 |
| ------ | ---- |
| wd-navbar | 导航栏 |
| wd-navbar-capsule | 导航栏胶囊 |
| wd-tabbar | 标签栏 |
| wd-tabbar-item | 标签栏项 |
| wd-tabs | 标签页 |
| wd-tab | 标签面板 |
| wd-sidebar | 侧边栏 |
| wd-sidebar-item | 侧边栏项 |
| wd-steps | 步骤条 |
| wd-step | 步骤项 |
| wd-index-bar | 索引栏 |
| wd-index-anchor | 索引锚点 |
| wd-pagination | 分页 |
| wd-backtop | 回到顶部 |
| wd-sticky | 粘性布局 |
| wd-sticky-box | 粘性容器 |

### 展示组件

| 组件名 | 说明 |
| ------ | ---- |
| wd-badge | 徽标 |
| wd-tag | 标签 |
| wd-avatar | 头像 |
| wd-avatar-group | 头像组 |
| wd-card | 卡片 |
| wd-grid | 宫格 |
| wd-grid-item | 宫格项 |
| wd-swiper | 轮播 |
| wd-swiper-nav | 轮播导航 |
| wd-notice-bar | 通知栏 |
| wd-collapse | 折叠面板 |
| wd-collapse-item | 折叠面板项 |
| wd-table | 表格 |
| wd-table-col | 表格列 |
| wd-tree | 树形控件 |
| wd-waterfall | 瀑布流 |
| wd-count-down | 倒计时 |
| wd-count-to | 数字动画 |
| wd-segmented | 分段器 |
| wd-img | 图片 |
| wd-img-cropper | 图片裁剪 |
| wd-video-preview | 视频预览 |
| wd-watermark | 水印 |

### 操作组件

| 组件名 | 说明 |
| ------ | ---- |
| wd-drop-menu | 下拉菜单 |
| wd-drop-menu-item | 下拉菜单项 |
| wd-sort-button | 排序按钮 |
| wd-swipe-action | 滑动操作 |
| wd-fab | 悬浮按钮 |
| wd-popover | 气泡弹出框 |
| wd-tooltip | 文字提示 |
| wd-tour | 引导 |
| wd-floating-panel | 浮动面板 |

### 键盘组件

| 组件名 | 说明 |
| ------ | ---- |
| wd-keyboard | 键盘 |
| wd-number-keyboard | 数字键盘 |

### 布局组件

| 组件名 | 说明 |
| ------ | ---- |
| wd-row | 行 |
| wd-col | 列 |
| wd-lazy-load | 懒加载 |
| wd-resize | 尺寸监听 |
| wd-root-portal | 根门户 |
| wd-transition | 过渡动画 |
| wd-date-strip | 日期条 |
| wd-curtain | 幕帘 |
| wd-code | 验证码 |

## 常见问题

### 1. 样式编译报错：`@import` 语法不支持

**原因**：sass 版本过高，1.75.0 以上版本已废弃 `@import` 语法。

**解决方案**：在 `package.json` 中锁定 sass 版本为 `1.75.0`：

```json
{
  "devDependencies": {
    "sass": "1.75.0"
  }
}
```

然后删除 `node_modules` 重新安装依赖。

### 2. 组件无法自动引入

**原因**：未正确配置 easycom 规则。

**解决方案**：在 `pages.json` 中添加 easycom 配置，参见上方「基于 easycom 配置自动引入组件」章节。

### 3. Toast / MessageBox / Notify 无法显示

**原因**：使用函数式调用时，未在模板中放置对应的组件标签。

**解决方案**：确保在使用 `useToast`、`useMessage`、`useNotify` 的页面模板中分别放置 `<wd-toast />`、`<wd-message-box />`、`<wd-notify />` 组件。

### 4. Volar 无法识别组件类型

**原因**：未在 `tsconfig.json` 中配置类型声明。

**解决方案**：在 `tsconfig.json` 的 `compilerOptions.types` 中添加 `"wot-ui-plus/global"`。

### 5. 暗黑模式不生效

**原因**：未使用 `wd-config-provider` 包裹页面内容，或 `theme` 属性未正确设置。

**解决方案**：确保在根组件中使用 `<wd-config-provider :theme="theme">` 包裹内容，并将 `theme` 设置为 `'dark'`。

### 6. npm 方式安装后组件路径找不到

**原因**：easycom 配置中的组件路径与实际安装路径不一致。

**解决方案**：确认 `node_modules/wot-ui-plus/components/` 目录结构，确保 easycom 的 `custom` 规则路径正确。

## 总结

wot-ui-plus 是一个基于 Vue 3 + TypeScript 构建的高质量 uni-app 组件库，提供了 88+ 个组件，覆盖移动端主流场景。核心特性包括：

- **多平台覆盖**：支持微信小程序、支付宝小程序、钉钉小程序、H5、APP 等多个平台
- **TypeScript 支持**：完整的类型定义，提供良好的开发体验
- **国际化**：内置 15 种语言包，支持运行时动态切换
- **主题定制**：基于 CSS 变量的主题系统，支持 ConfigProvider 动态配置
- **暗黑模式**：内置暗黑模式支持，一键切换
- **函数式调用**：Toast、MessageBox、Notify 支持函数式调用，开发更便捷
- **Composables**：提供丰富的组合式函数，方便业务逻辑复用

在使用过程中，如果遇到问题，可以查阅官方文档、查看示例代码，或在 [GitHub Issues](https://github.com/l-spaces/wot-ui-plus/issues) 中寻求帮助。
