# NoticeBar 通知栏

## 组件概述

NoticeBar 通知栏组件用于页面顶部或底部的通知消息展示，支持水平滚动、垂直滚动、多文本轮播、自定义图标、可关闭等功能。适用于系统通知、活动公告、消息提醒等场景。

## 核心功能描述

- **四种类型**：warning（警告）、info（信息）、danger（危险）、默认
- **滚动模式**：支持水平滚动和垂直滚动两种方向
- **多文本轮播**：`text` 传入数组实现多文本自动轮播
- **可关闭**：通过 `closable` 显示关闭按钮
- **换行显示**：通过 `wrapable` 允许文本换行
- **自定义图标**：通过 `prefix` 设置左侧图标，支持插槽自定义
- **自定义颜色**：支持自定义文字颜色和背景颜色
- **重置动画**：通过 `reset` 方法重置滚动动画

## 适用业务场景

- **系统通知**：展示系统级别的通知消息
- **活动公告**：滚动展示活动信息
- **网络状态**：网络断开时显示通知

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| text | String / String[] | '' | 否 | 通知栏文案，支持多文本轮播 |
| type | String | 'warning' | 否 | 通知栏类型，可选值：warning / info / danger / '' |
| scrollable | Boolean | true | 否 | 是否可滚动 |
| delay | Number | 1 | 否 | 滚动延迟时间（秒） |
| speed | Number | 50 | 否 | 滚动速度（px/s） |
| closable | Boolean | false | 否 | 是否可关闭 |
| wrapable | Boolean | false | 否 | 是否换行显示 |
| prefix | String | - | 否 | 左侧图标名称 |
| color | String | - | 否 | 文字和图标颜色 |
| backgroundColor | String | - | 否 | 背景颜色 |
| direction | String | 'horizontal' | 否 | 滚动方向，可选值：horizontal / vertical |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| close | 关闭通知栏时触发 | - | - |
| next | 滚动到下一条文本时触发 | (index: number) | 当前文本索引 |
| click | 点击通知栏内容时触发 | ({ index, text }) | 索引和文本内容 |

### Methods

| 方法名称 | 参数 | 返回值 | 说明 |
|---------|------|--------|------|
| reset | - | void | 重置通知栏动画 |

### Slots

| 插槽名称 | 作用域参数 | 使用场景 |
|---------|-----------|---------|
| default | - | 通知栏内容 |
| prefix | - | 左侧图标区域（未设置 prefix prop 时生效） |
| suffix | - | 右侧区域（未设置 closable 时生效） |

## 使用示例

### 示例1：基础用法与类型

通过 `text` 设置文案，`type` 设置通知栏类型。

```vue
<template>
  <wd-notice-bar text="这是一条消息提示信息这是一条消息提示信息这是一条消息提示信息" prefix="warn-bold" />
  <wd-notice-bar type="danger" text="当前网络不可用，请检查你的网络设置" prefix="wifi-error" />
  <wd-notice-bar type="info" text="点击查看信息详情点击查看信息详情点击查看信息详情" prefix="check-outline" />
</template>
```

### 示例2：多文本轮播与垂直滚动

`text` 传入数组实现多文本轮播，`direction` 设置为 `vertical` 实现垂直滚动。

```vue
<template>
  <wd-notice-bar :text="textArray" prefix="check-outline" @next="onNext" />
  <wd-notice-bar prefix="warn-bold" direction="vertical" :text="textArray" :delay="3" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const textArray = ref([
  '欢迎使用 wot-ui-plus',
  '该组件库基于 uniapp + vue3 + ts 构建',
  '我们的目标是打造最强 uniapp 组件库'
])

function onNext(index: number) {
  console.log('当前展示第', index, '条')
}
</script>
```

### 示例3：自定义颜色与插槽

通过 `color` 和 `background-color` 自定义颜色，使用插槽自定义图标和右侧内容。

```vue
<template>
  <wd-notice-bar
    text="这是一条消息提示信息"
    prefix="check-outline"
    color="#34D19D"
    background-color="#f0f9eb"
  />
  <wd-notice-bar :scrollable="false">
    <template #prefix>
      <wd-icon name="attention" />
    </template>
    通知被禁或时段内消息屏蔽可能造成消…
    <template #suffix>
      <view style="color: #4d80f0">查看</view>
    </template>
  </wd-notice-bar>
</template>
```

## 注意事项

- `scrollable` 默认为 true，文本超出时自动滚动
- `wrapable` 为 true 时允许文本换行，需同时设置 `scrollable` 为 false
- `direction` 为 vertical 时，`text` 需传入数组
- `closable` 为 true 时显示关闭按钮，点击后触发 `close` 事件并隐藏通知栏
- 可通过 ref 调用 `reset` 方法重置滚动动画
