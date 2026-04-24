# RootPortal 根门户

## 组件概况

RootPortal 根门户组件用于将子元素从当前组件树中脱离出来渲染到页面根节点，解决 fixed 定位在嵌套组件中失效的问题。在不同平台使用不同实现：H5 使用 Teleport，微信/支付宝小程序使用 root-portal，App 端使用 renderjs。

## 核心功能描述

- **跨端实现**：H5 使用 Vue3 Teleport，小程序使用 root-portal 组件，App 使用 renderjs
- **样式继承**：自动继承 ConfigProvider 的主题样式，确保门户内容与页面主题一致
- **fixed 定位修复**：解决在 transform 等容器内 fixed 定位失效的问题
- **无额外 Props**：组件无自定义属性，仅通过插槽传递内容

## 适用业务场景

- **弹窗定位修复**：在含有 transform 的容器内使用 Popup 等弹窗组件时，通过 RootPortal 将弹窗渲染到根节点
- **全局浮层**：需要在页面最顶层显示的浮层、遮罩等元素
- **组件隔离**：需要脱离当前组件树渲染的元素，避免 CSS 污染

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Slots

| 插槽名称 | 作用域参数 | 使用场景 |
|---------|-----------|---------|
| default | - | 需要渲染到根节点的内容 |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-root-portal>
    <wd-popup v-model="show">弹窗内容</wd-popup>
  </wd-root-portal>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(false)
</script>
```

将 Popup 包裹在 RootPortal 中，确保弹窗渲染到页面根节点。

### 示例2：修复 fixed 定位

```vue
<template>
  <view style="transform: translateZ(0)">
    <wd-root-portal>
      <view style="position: fixed; top: 0; left: 0">固定定位内容</view>
    </wd-root-portal>
  </view>
</template>
```

在含有 transform 的容器内，使用 RootPortal 将 fixed 定位元素渲染到根节点，避免定位失效。

### 示例3：全局浮层

```vue
<template>
  <wd-root-portal>
    <wd-overlay :show="loading" />
    <view v-if="loading" class="global-loading">加载中...</view>
  </wd-root-portal>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const loading = ref(false)
</script>
```

全局浮层（如 loading 遮罩）通过 RootPortal 确保始终在最顶层渲染。

## 注意事项

- 组件在不同平台使用不同实现方式，H5 使用 Teleport，小程序使用 root-portal，App 使用 renderjs
- 钉钉小程序不支持 root-portal，内容会渲染在原位置
- 组件会自动继承 ConfigProvider 的主题样式，无需手动传递
- App 端使用 renderjs 将 DOM 节点移动到 body 下，组件销毁时自动移回
- 使用 RootPortal 后，子组件的事件冒泡路径会改变，可能影响事件捕获
