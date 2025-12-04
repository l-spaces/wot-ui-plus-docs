# UI组件快速上手指南

## 目录

- [1. 组件库概述](#1-组件库概述)
- [2. 环境要求与安装步骤](#2-环境要求与安装步骤)
- [3. 基础配置方法](#3-基础配置方法)
- [4. 常见问题解决方案与错误排查指南](#4-常见问题解决方案与错误排查指南)
- [5. 组件使用最佳实践建议](#5-组件使用最佳实践建议)
- [6. 高级功能与扩展](#6-高级功能与扩展)

## 1. 组件库概述

### 1.1 设计理念

wot-ui-plus 是一个基于 Vue3 + TypeScript 构建的跨平台 UI 组件库，参照 wot-design 打造，专为 uni-app 框架设计。其核心设计理念是提供高质量、全端适配的 UI 组件解决方案，帮助开发者快速构建美观、易用的移动应用。

### 1.2 核心特性

- 🎯 **多平台覆盖**：支持微信小程序、支付宝小程序、钉钉小程序、H5、APP 等主流平台
- 🚀 **88+ 高质量组件**：覆盖移动端主流场景，提供丰富的 UI 组件选择
- 💪 **TypeScript 支持**：使用 TypeScript 构建，提供完善的组件类型系统
- 🌍 **国际化支持**：内置 15 种语言包，轻松实现多语言切换
- 🎨 **主题定制**：支持通过 CSS 变量修改主题，支持暗黑模式
- 📖 **丰富的文档和示例**：提供详细的组件文档和使用示例
- 🍭 **现代化设计**：采用简洁、美观的设计风格，符合现代移动应用设计趋势

### 1.3 适用场景

wot-ui-plus 适用于各种基于 uni-app 框架开发的移动应用，包括但不限于：

- 电商类应用
- 社交类应用
- 工具类应用
- 企业级应用
- 内容资讯类应用

### 1.4 差异化优势

| 特性 | wot-ui-plus | 其他组件库 |
| ---- | ----------- | ---------- |
| 框架支持 | 专注于 uni-app | 多框架支持 |
| TypeScript 支持 | 原生支持，类型完善 | 部分支持或无类型支持 |
| 组件数量 | 88+ | 数量不等 |
| 国际化 | 内置 15 种语言包 | 部分支持或无 |
| 暗黑模式 | 支持 | 部分支持或无 |
| 主题定制 | 支持 CSS 变量修改 | 部分支持 |
| 跨端一致性 | 高度一致 | 差异较大 |

## 2. 环境要求与安装步骤

### 2.1 前置环境要求

| 环境 | 版本要求 | 说明 |
| ---- | -------- | ---- |
| Node.js | ≥ 14.0.0 | 推荐使用最新稳定版 |
| npm | ≥ 6.0.0 | 或使用 yarn ≥ 1.22.0 |
| HBuilderX | ≥ 3.8.7 | 使用 HBuilderX 开发时需要 |
| uni-app | Vue 3 版本 | 仅支持 Vue 3，不支持 Vue 2 |
| 编译器 | Vite | 推荐使用 Vite 编译器 |

### 2.2 安装方式

#### 2.2.1 npm 安装

```bash
# 使用 npm 安装
npm install wot-ui-plus --save

# 使用 yarn 安装
yarn add wot-ui-plus

# 使用 pnpm 安装
pnpm add wot-ui-plus
```

#### 2.2.2 指定版本安装

```bash
# 安装指定版本
npm install wot-ui-plus@3.1.0 --save

# 安装最新版本
npm install wot-ui-plus@latest --save
```

#### 2.2.3 HBuilderX 导入

1. 打开 HBuilderX，点击顶部菜单的「工具」->「插件安装」
2. 在插件市场搜索「wot-ui-plus」
3. 点击「安装」按钮，等待安装完成
4. 在项目中右键点击「uni_modules」目录，选择「导入插件」->「从插件市场导入」
5. 搜索「wot-ui-plus」并导入

#### 2.2.4 手动下载引入

1. 从 GitHub 仓库下载最新版本：[https://github.com/l-spaces/wot-ui-plus](https://github.com/l-spaces/wot-ui-plus)
2. 将下载的文件解压，将 `src/uni_modules/wot-ui-plus` 目录复制到你的项目的 `src/uni_modules` 目录下
3. 在项目中直接使用组件

### 2.3 验证安装成功

在项目中创建一个测试页面，引入并使用 wot-ui-plus 的组件，验证安装是否成功。

```vue
<template>
  <view class="test-container">
    <wd-button type="primary" @click="showToast">点击测试</wd-button>
  </view>
</template>

<script setup lang="ts">
import { useToast } from '@/uni_modules/wot-ui-plus'

const toast = useToast()

const showToast = () => {
  toast.show({
    message: '安装成功！',
    position: 'middle'
  })
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

## 3. 基础配置方法

### 3.1 全局注册组件

#### 3.1.1 完整配置流程

1. 在项目的入口文件（通常是 `main.ts` 或 `main.js`）中导入组件库
2. 使用 `app.use()` 方法全局注册组件
3. 引入全局样式

#### 3.1.2 代码示例

```typescript
// main.ts
import { createSSRApp } from 'vue'
import App from './App.vue'
import WotUI from '@/uni_modules/wot-ui-plus'
import '@/uni_modules/wot-ui-plus/components/common/index.scss'

export function createApp() {
  const app = createSSRApp(App)
  app.use(WotUI)
  return {
    app
  }
}
```

### 3.2 按需引入组件

#### 3.2.1 手动按需引入

```vue
<template>
  <view>
    <wd-button type="primary">主要按钮</wd-button>
    <wd-toast ref="toastRef" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import WdButton from '@/uni_modules/wot-ui-plus/components/wd-button/wd-button.vue'
import WdToast from '@/uni_modules/wot-ui-plus/components/wd-toast/wd-toast.vue'

const toastRef = ref(null)
</script>
```

#### 3.2.2 使用自动导入插件

1. 安装自动导入插件

```bash
# 安装 unplugin-vue-components
npm install unplugin-vue-components --save-dev
```

2. 在 `vite.config.ts` 中配置

```typescript
import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite'
import { WotUIResolver } from 'wot-ui-plus/resolver'

export default defineConfig({
  plugins: [
    Components({
      resolvers: [
        WotUIResolver()
      ]
    })
  ]
})
```

### 3.3 主题定制方案

#### 3.3.1 主题变量覆盖

wot-ui-plus 支持通过 CSS 变量修改主题颜色、字体大小等样式。可以在全局样式文件中覆盖这些变量。

```scss
/* app.scss */
:root {
  /* 主色调 */
  --wd-color-theme: #007aff;
  /* 成功色 */
  --wd-color-success: #4cd964;
  /* 警告色 */
  --wd-color-warning: #ff9500;
  /* 危险色 */
  --wd-color-danger: #ff3b30;
  /* 信息色 */
  --wd-color-info: #5ac8fa;
}
```

#### 3.3.2 使用 ConfigProvider 定制主题

ConfigProvider 是一个全局配置组件，可以用来定制主题、切换语言等。

```vue
<template>
  <wd-config-provider :theme-vars="themeVars">
    <router-view />
  </wd-config-provider>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import WdConfigProvider from '@/uni_modules/wot-ui-plus/components/wd-config-provider/wd-config-provider.vue'

const themeVars = reactive({
  colorTheme: '#007aff',
  colorSuccess: '#4cd964',
  colorWarning: '#ff9500',
  colorDanger: '#ff3b30'
})
</script>
```

#### 3.3.3 暗黑模式切换

wot-ui-plus 内置了暗黑模式支持，可以通过 ConfigProvider 的 `theme` 属性切换。

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
import WdConfigProvider from '@/uni_modules/wot-ui-plus/components/wd-config-provider/wd-config-provider.vue'
import WdButton from '@/uni_modules/wot-ui-plus/components/wd-button/wd-button.vue'

const theme = ref('light')
const themeVars = reactive({
  // 浅色主题变量
  colorTheme: '#007aff',
  // 深色主题变量
  darkBackground: '#1a1a1a',
  darkColor: '#ffffff'
})

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>
```

### 3.4 全局配置项

#### 3.4.1 尺寸设置

wot-ui-plus 支持全局设置组件尺寸，通过 ConfigProvider 的 `size` 属性设置。

```vue
<wd-config-provider size="large">
  <!-- 所有子组件都会继承 large 尺寸 -->
  <wd-button>大号按钮</wd-button>
  <wd-input placeholder="大号输入框" />
</wd-config-provider>
```

#### 3.4.2 语言国际化

1. 导入语言包
2. 使用 ConfigProvider 的 `locale` 属性设置语言

```vue
<template>
  <wd-config-provider :locale="locale">
    <router-view />
  </wd-config-provider>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import WdConfigProvider from '@/uni_modules/wot-ui-plus/components/wd-config-provider/wd-config-provider.vue'
import enUS from '@/uni_modules/wot-ui-plus/locale/lang/en-US'
import zhCN from '@/uni_modules/wot-ui-plus/locale/lang/zh-CN'

// 根据需要切换语言
const locale = ref(zhCN)
</script>
```

#### 3.4.3 组件默认参数配置

部分组件支持全局配置默认参数，例如 Toast 组件。

```typescript
// main.ts
import { createSSRApp } from 'vue'
import App from './App.vue'
import { Toast } from '@/uni_modules/wot-ui-plus'

// 配置 Toast 默认参数
Toast.setDefaultOptions({
  duration: 2000,
  position: 'bottom'
})

export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
```




## 7. 总结

wot-ui-plus 是一个功能强大、易于使用的 uni-app UI 组件库，提供了丰富的组件和功能，支持多平台适配、主题定制、国际化等高级特性。通过本快速上手指南，你可以快速了解和掌握 wot-ui-plus 的使用方法，将其应用到你的项目开发中。

在使用过程中，如果你遇到任何问题，可以查阅官方文档、查看示例代码，或在社区中寻求帮助。同时，建议你遵循最佳实践，优化组件的使用方式，提高应用的性能和用户体验。

最后，祝你在使用 wot-ui-plus 开发项目时取得成功！
