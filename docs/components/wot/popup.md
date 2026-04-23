# Popup 弹出层

## 组件概述

Popup 弹出层组件是所有弹出类组件的基础组件，支持从顶部、底部、左侧、右侧和中心弹出。提供遮罩层、关闭按钮、动画效果、懒渲染等功能。是 ActionSheet、Picker、Keyboard 等组件的底层依赖。

## 核心功能描述

- **五个位置**：center、top、right、bottom、left
- **动画效果**：支持多种过渡动画，通过 `transition` 自定义
- **遮罩层**：支持显示/隐藏遮罩层，自定义遮罩样式
- **关闭按钮**：通过 `closable` 显示关闭按钮
- **懒渲染**：通过 `lazyRender` 延迟渲染弹层内容
- **锁定滚动**：通过 `lockScroll` 防止背景滚动
- **安全距离**：通过 `safeAreaInsetBottom` 适配底部安全区域
- **根门户**：通过 `rootPortal` 解决 fixed 定位问题

## 适用业务场景

- **底部弹窗**：选择器、动作面板等底部弹出内容
- **中央弹窗**：对话框、确认框等居中弹出内容
- **侧边弹窗**：筛选面板、侧边导航等侧边弹出内容

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | Boolean | false | 否 | 是否显示弹出层，支持 v-model 双向绑定 |
| position | String | 'center' | 否 | 弹出位置，可选值：center / top / right / bottom / left |
| transition | String | - | 否 | 动画类型，可选值：fade / fade-up / fade-down / fade-left / fade-right / slide-up / slide-down / slide-left / slide-right / zoom-in |
| closable | Boolean | false | 否 | 是否显示关闭按钮 |
| closeOnClickModal | Boolean | true | 否 | 点击遮罩是否关闭 |
| duration | Number / Boolean | 300 | 否 | 动画持续时间，false 表示无动画 |
| modal | Boolean | true | 否 | 是否显示遮罩 |
| modalStyle | String | '' | 否 | 遮罩样式 |
| zIndex | Number | 10 | 否 | 层级 |
| hideWhenClose | Boolean | true | 否 | 关闭时是否隐藏（display: none） |
| safeAreaInsetBottom | Boolean | false | 否 | 底部安全距离 |
| lazyRender | Boolean | true | 否 | 是否懒渲染 |
| lockScroll | Boolean | true | 否 | 是否锁定滚动 |
| rootPortal | Boolean | false | 否 | 是否从页面中脱离 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| open | 弹出层打开后触发 | - | - |
| close | 弹出层关闭后触发 | - | - |
| clickModal | 点击遮罩时触发 | - | - |

### Slots

| 插槽名称 | 作用域参数 | 使用场景 |
|---------|-----------|---------|
| default | - | 弹出层内容 |

## 使用示例

### 示例1：底部弹出

```vue
<template>
  <wd-button @click="show = true">底部弹出</wd-button>
  <wd-popup v-model="show" position="bottom">
    <view style="padding: 20px;">弹出内容</view>
  </wd-popup>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(false)
</script>
```

### 示例2：中央弹出

```vue
<template>
  <wd-button @click="show = true">中央弹出</wd-button>
  <wd-popup v-model="show" position="center" closable>
    <view style="padding: 30px; text-align: center;">
      <text>中央弹出内容</text>
    </view>
  </wd-popup>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(false)
</script>
```

### 示例3：自定义动画

```vue
<template>
  <wd-button @click="show = true">缩放动画</wd-button>
  <wd-popup v-model="show" position="center" transition="zoom-in">
    <view style="padding: 20px;">缩放动画</view>
  </wd-popup>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(false)
</script>
```

### 示例4：无遮罩与懒渲染

```vue
<template>
  <wd-button @click="show = true">无遮罩弹出</wd-button>
  <wd-popup v-model="show" :modal="false" :lazy-render="false">
    <view style="padding: 20px;">无遮罩弹出</view>
  </wd-popup>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(false)
</script>
```

## 注意事项

- `position` 为 center 时默认使用 fade 动画，其他位置使用对应的 slide 动画
- `transition` 属性优先级高于 `position` 的默认动画
- `lazyRender` 为 true 时，首次显示前不会渲染弹层内容
- `rootPortal` 在 H5 使用 teleport，小程序使用 root-portal，APP 使用 renderjs
- `hideWhenClose` 为 true 时关闭后设置 display: none，避免影响页面布局
