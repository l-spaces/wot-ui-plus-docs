# Tooltip 文字提示

## 组件概述

Tooltip 文字提示组件用于鼠标悬停或点击时展示文字提示信息，支持 12 种位置、自定义内容、关闭按钮、禁用等功能。与 Popover 不同，Tooltip 更轻量，主要用于文字提示场景。

## 核心功能描述

- **12种位置**：支持 top、bottom、left、right 及其 start/end 变体
- **自定义内容**：通过 `useContentSlot` 使用内容插槽
- **关闭按钮**：通过 `showClose` 显示关闭按钮
- **偏移量**：支持数字、数组、对象类型的偏移量设置
- **手动控制**：通过 v-model 控制显隐，通过 `open`、`close` 方法手动控制
- **禁用**：通过 `disabled` 禁用提示

## 适用业务场景

- **功能说明**：对按钮或图标添加功能说明
- **信息补充**：对文本添加补充说明
- **操作引导**：引导用户了解功能

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | Boolean | false | 否 | 是否显示，支持 v-model 双向绑定 |
| content | String / Array | - | 否 | 显示内容 |
| placement | String | 'bottom' | 否 | 出现位置，可选值：top / top-start / top-end / bottom / bottom-start / bottom-end / left / left-start / left-end / right / right-start / right-end |
| visibleArrow | Boolean | true | 否 | 是否显示箭头 |
| disabled | Boolean | false | 否 | 是否禁用 |
| offset | Number / Array / Object | 0 | 否 | 出现位置的偏移量 |
| useContentSlot | Boolean | false | 否 | 是否使用内容插槽 |
| showClose | Boolean | false | 否 | 是否显示关闭按钮 |
| customArrow | String | '' | 否 | 自定义箭头样式类 |
| customPop | String | '' | 否 | 自定义弹出内容样式类 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| change | 显隐变化时触发 | ({ show: boolean }) | 当前显示状态 |
| open | 打开时触发 | - | - |
| close | 关闭时触发 | - | - |

### Methods

| 方法名称 | 参数 | 返回值 | 说明 |
|---------|------|--------|------|
| open | - | void | 打开 tooltip |
| close | - | void | 关闭 tooltip |

### Slots

| 插槽名称 | 作用域参数 | 使用场景 |
|---------|-----------|---------|
| default | - | 触发 tooltip 的目标元素 |
| content | - | 自定义提示内容（需设置 useContentSlot 为 true） |

## 使用示例

### 示例1：基础用法与位置

通过 `content` 设置提示内容，`placement` 设置弹出位置。

```vue
<template>
  <wd-tooltip placement="bottom" content="bottom 提示文字">
    <wd-button :round="false">底部</wd-button>
  </wd-tooltip>
  <wd-tooltip placement="top" content="top 提示文字">
    <wd-button :round="false">顶部</wd-button>
  </wd-tooltip>
  <wd-tooltip placement="left" content="left 提示文字">
    <wd-button :round="false">左侧</wd-button>
  </wd-tooltip>
  <wd-tooltip placement="right" content="right 提示文字">
    <wd-button :round="false">右侧</wd-button>
  </wd-tooltip>
</template>
```

### 示例2：显示关闭按钮与自定义内容

通过 `show-close` 显示关闭按钮，`use-content-slot` 使用插槽自定义多行内容。

```vue
<template>
  <wd-tooltip content="显示关闭按钮" placement="right" show-close>
    <wd-button :round="false">显示关闭按钮</wd-button>
  </wd-tooltip>

  <wd-tooltip placement="right" use-content-slot>
    <template #content>
      <view>
        <view>多行文本1</view>
        <view>多行文本2</view>
        <view>多行文本3</view>
      </view>
    </template>
    <wd-button :round="false">多行文本</wd-button>
  </wd-tooltip>
</template>
```

### 示例3：v-model 控制显隐

通过 `v-model` 手动控制 tooltip 的显隐。

```vue
<template>
  <wd-button plain size="small" @click="toggle">{{ show ? '关闭' : '打开' }}</wd-button>
  <wd-tooltip placement="top" content="控制显隐" v-model="show">
    <wd-button :round="false">top</wd-button>
  </wd-tooltip>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(false)

function toggle() {
  show.value = !show.value
}
</script>
```

## 注意事项

- `placement` 支持 12 种位置，根据页面空间选择合适的位置
- `offset` 支持三种类型：数字（统一偏移）、数组 `[x, y]`、对象 `{ x, y }`
- `useContentSlot` 为 true 时，需使用 `#content` 插槽传入内容
- 可通过 ref 调用 `open` 和 `close` 方法手动控制显隐
