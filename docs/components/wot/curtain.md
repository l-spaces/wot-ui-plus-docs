# Curtain 幕帘

## 组件概况

Curtain 幕帘组件用于展示全屏广告图片，支持自定义关闭按钮位置、点击图片跳转、长按识别小程序码等功能。适用于 App 开屏广告、活动弹窗等场景。

## 核心功能描述

- **全屏展示**：覆盖整个页面展示广告图片
- **关闭按钮**：支持 8 种关闭按钮位置
- **图片跳转**：通过 `to` 设置点击图片的跳转链接
- **长按识别**：通过 `showMenuByLongpress` 开启长按识别小程序码
- **点击关闭**：通过 `closeOnClick` 控制点击图片是否关闭

## 适用业务场景

- **开屏广告**：App 启动时展示全屏广告
- **活动弹窗**：展示活动宣传图片
- **公告通知**：展示重要公告图片

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | Boolean | false | 否 | 是否显示幕帘，支持 v-model 双向绑定 |
| src | String | - | 是 | 幕帘图片地址，必须使用网络地址 |
| closePosition | String | 'inset' | 否 | 关闭按钮位置，可选值：inset / top / bottom / top-left / top-right / bottom-left / bottom-right |
| to | String | - | 否 | 幕帘图片点击链接 |
| width | Number | - | 否 | 幕帘图片宽度 |
| closeOnClickModal | Boolean | false | 否 | 点击遮罩是否关闭 |
| hideWhenClose | Boolean | true | 否 | 关闭时是否隐藏 |
| zIndex | Number | 10 | 否 | 层级 |
| showMenuByLongpress | Boolean | false | 否 | 是否开启长按识别小程序码，仅微信小程序 |
| closeOnClick | Boolean | true | 否 | 点击图片是否关闭 |
| rootPortal | Boolean | false | 否 | 是否从页面中脱离 |
| customCloseClass | String | '' | 否 | 自定义关闭按钮样式类 |
| customCloseStyle | String | '' | 否 | 自定义关闭按钮样式 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| close | 幕帘关闭时触发 | - | - |
| click | 点击幕帘图片时触发 | - | - |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-button @click="show = true">显示幕帘</wd-button>
  <wd-curtain v-model="show" src="https://example.com/ad.jpg" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(false)
</script>
```

### 示例2：自定义关闭按钮位置

```vue
<template>
  <wd-curtain v-model="show" src="https://example.com/ad.jpg" close-position="top-right" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(false)
</script>
```

### 示例3：点击跳转

```vue
<template>
  <wd-curtain
    v-model="show"
    src="https://example.com/ad.jpg"
    to="/pages/activity/index"
    :close-on-click="false"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(false)
</script>
```

## 注意事项

- `src` 必须使用网络地址，不支持本地图片
- `closePosition` 为 inset 时关闭按钮显示在图片内部右上角
- `showMenuByLongpress` 仅在微信小程序平台有效
- `closeOnClick` 默认为 true，点击图片会关闭幕帘
