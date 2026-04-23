# Transition 过渡动画

## 组件概述

Transition 过渡动画组件用于元素的进入和离开动画，支持 fade、slide、zoom 等多种内置动画类型，也支持自定义动画类名。常用于弹窗、抽屉、提示框等组件的过渡效果。

## 核心功能描述

- **内置动画**：支持 fade / fade-up / fade-down / fade-left / fade-right / slide-up / slide-down / slide-left / slide-right / zoom-in / zoom-out 共11种动画
- **动画时长**：`duration` 支持数字（毫秒）、对象（分别设置 enter/leave 时长）、布尔值
- **懒渲染**：`lazyRender` 开启后首次展示时才渲染内容
- **销毁控制**：`destroy` 控制动画结束时是否销毁子节点（display: none）
- **自定义动画**：通过 `enterClass`、`enterActiveClass`、`enterToClass`、`leaveClass`、`leaveActiveClass`、`leaveToClass` 自定义过渡类名
- **触摸滚动**：`disableTouchMove` 阻止触摸滚动穿透
- **动画事件**：提供 enter / afterEnter / leave / afterLeave 等完整生命周期事件

## 适用业务场景

- **弹窗动画**：Popup、Dialog 等弹窗的进入和离开动画
- **内容切换**：Tab 切换、步骤切换时的过渡效果
- **提示信息**：Toast、Notify 等提示信息的出现和消失动画

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| show | Boolean | false | 否 | 是否展示组件 |
| name | String / Array | 'fade' | 否 | 动画类型，可选值：fade / fade-up / fade-down / fade-left / fade-right / slide-up / slide-down / slide-left / slide-right / zoom-in / zoom-out |
| duration | Number / Object / Boolean | 300 | 否 | 动画时长，对象格式可分别设置 enter 和 leave |
| lazyRender | Boolean | false | 否 | 是否懒渲染 |
| destroy | Boolean | true | 否 | 是否在动画结束时销毁子节点 |
| enterClass | String | '' | 否 | 进入过渡的开始状态类名 |
| enterActiveClass | String | '' | 否 | 进入过渡的激活状态类名 |
| enterToClass | String | '' | 否 | 进入过渡的结束状态类名 |
| leaveClass | String | '' | 否 | 离开过渡的开始状态类名 |
| leaveActiveClass | String | '' | 否 | 离开过渡的激活状态类名 |
| leaveToClass | String | '' | 否 | 离开过渡的结束状态类名 |
| disableTouchMove | Boolean | false | 否 | 是否阻止触摸滚动 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| enter | 进入动画开始时触发 | - | - |
| enterCancelled | 进入动画被取消时触发 | - | - |
| afterEnter | 进入动画结束时触发 | - | - |
| leave | 离开动画开始时触发 | - | - |
| leaveCancelled | 离开动画被取消时触发 | - | - |
| afterLeave | 离开动画结束时触发 | - | - |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-button @click="show = !show">切换显示</wd-button>
  <wd-transition :show="show" name="fade-up">
    <view class="content">动画内容</view>
  </wd-transition>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(false)
</script>
```

使用 `fade-up` 动画类型，`show` 控制显示隐藏。

### 示例2：不同动画类型

```vue
<template>
  <wd-transition :show="show" name="zoom-in">
    <view class="content">缩放进入</view>
  </wd-transition>
  <wd-transition :show="show" name="slide-left">
    <view class="content">左侧滑入</view>
  </wd-transition>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(false)
</script>
```

`name` 支持多种内置动画类型，选择适合场景的动画效果。

### 示例3：自定义时长与事件

```vue
<template>
  <wd-transition :show="show" :duration="{ enter: 500, leave: 300 }" @after-enter="onAfterEnter" @after-leave="onAfterLeave">
    <view class="content">自定义时长</view>
  </wd-transition>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(false)

function onAfterEnter() {
  console.log('进入动画结束')
}
function onAfterLeave() {
  console.log('离开动画结束')
}
</script>
```

`duration` 传入对象分别设置进入和离开动画时长，监听动画生命周期事件。

## 注意事项

- `destroy` 默认为 true，动画结束后子节点设置 display: none，设为 false 则保留 DOM
- `lazyRender` 适合内容较重的场景，首次展示时才渲染减少初始加载开销
- `name` 传入数组时可同时应用多种动画效果
- 自定义动画类名时需确保对应的 CSS 样式已定义
- `disableTouchMove` 可防止弹窗内容滚动时触发页面滚动
