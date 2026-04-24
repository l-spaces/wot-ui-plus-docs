# Tooltip 文字提示

## 组件概况

Tooltip 文字提示组件用于点击目标元素后展示轻量提示信息，支持 12 种位置、自定义内容、关闭按钮、禁用状态以及手动显隐控制。适合功能说明、信息补充和操作引导等场景。

## 核心功能描述

- **12 种展示位置**：支持 `top / bottom / left / right` 及其 `start / end` 变体。
- **内容定制**：可通过 `content` 传入文本，也可通过 `content` 插槽自定义内容。
- **箭头控制**：通过 `visibleArrow` 控制是否展示箭头。
- **关闭按钮**：通过 `showClose` 在浮层内展示关闭图标。
- **偏移量控制**：通过 `offset` 调整浮层位置，支持数字、数组和对象。
- **手动控制**：支持 `v-model` 控制显隐，也支持通过实例方法 `open`、`close` 手动调用。

## 适用业务场景

- **功能说明**：对按钮、图标、操作项补充简短解释。
- **辅助提示**：在信息密度较高的页面提供补充说明。
- **交互引导**：引导用户理解某个操作的含义或后果。

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | Boolean | false | 否 | 是否显示提示，支持 `v-model`。 |
| content | String / Array | - | 否 | 提示内容。使用插槽时可不传。 |
| placement | String | `'bottom'` | 否 | 展示位置，可选值：`top`、`top-start`、`top-end`、`bottom`、`bottom-start`、`bottom-end`、`left`、`left-start`、`left-end`、`right`、`right-start`、`right-end`。 |
| visibleArrow | Boolean | true | 否 | 是否显示箭头。 |
| disabled | Boolean | false | 否 | 是否禁用提示。 |
| offset | Number / Array / Object | 0 | 否 | 浮层偏移量，支持 `number`、`[x, y]`、`{ x, y }`。 |
| useContentSlot | Boolean | false | 否 | 是否使用 `content` 插槽渲染内容。 |
| showClose | Boolean | false | 否 | 是否显示关闭按钮。 |
| customArrow | String | `''` | 否 | 自定义箭头样式类。 |
| customPop | String | `''` | 否 | 自定义浮层内容样式类。 |
| customStyle | String | `''` | 否 | 自定义根节点样式。 |
| customClass | String | `''` | 否 | 自定义根节点样式类。 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|---------|
| update:modelValue | 显隐状态变化时触发 | `(value: boolean)` | 用于 `v-model` 双向绑定。 |
| change | 显隐状态变化时触发 | `({ show: boolean })` | 当前是否显示。 |
| open | 打开时触发 | - | - |
| close | 关闭时触发 | - | - |

### Methods

| 方法名称 | 参数 | 返回值 | 说明 |
|---------|------|--------|------|
| open | - | void | 打开 Tooltip。 |
| close | - | void | 关闭 Tooltip。 |

### Slots

| 插槽名称 | 作用域参数 | 使用场景 |
|---------|-----------|---------|
| default | - | 触发 Tooltip 的目标内容。 |
| content | - | 自定义提示内容，需配合 `useContentSlot` 使用。 |

## 使用示例

### 示例1：基础用法与位置

```vue
<template>
  <wd-tooltip placement="bottom" content="bottom 提示文字">
    <wd-button :round="false">底部</wd-button>
  </wd-tooltip>

  <wd-tooltip placement="top-start" content="top-start 提示文字">
    <wd-button :round="false">顶部开始</wd-button>
  </wd-tooltip>

  <wd-tooltip placement="right-end" content="right-end 提示文字">
    <wd-button :round="false">右侧结束</wd-button>
  </wd-tooltip>
</template>
```

### 示例2：关闭按钮与自定义内容

```vue
<template>
  <wd-tooltip content="显示关闭按钮" placement="right" show-close>
    <wd-button :round="false">显示关闭按钮</wd-button>
  </wd-tooltip>

  <wd-tooltip placement="right" use-content-slot>
    <wd-button :round="false">多行文本</wd-button>
    <template #content>
      <view>
        <view>多行文本1</view>
        <view>多行文本2</view>
        <view>多行文本3</view>
      </view>
    </template>
  </wd-tooltip>
</template>
```

### 示例3：通过 v-model 控制显隐

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

### 示例4：事件监听与实例方法

```vue
<template>
  <wd-tooltip ref="tooltip" placement="right-end" content="事件">
    <wd-button :round="false">事件</wd-button>
  </wd-tooltip>

  <wd-button size="small" @click="tooltip?.open()">打开</wd-button>
  <wd-button size="small" @click="tooltip?.close()">关闭</wd-button>
</template>

<script lang="ts" setup>
import type { TooltipInstance } from '@/uni_modules/wot-ui-plus/components/wd-tooltip/types'
import { ref } from 'vue'

const tooltip = ref<TooltipInstance>()
</script>
```

## 注意事项

- 组件通过点击目标元素切换显隐，不是悬停触发。
- `content` 不应传入 `null` 或 `undefined`。
- `useContentSlot` 为 `true` 时，应通过 `#content` 插槽提供浮层内容。
- 使用 `v-model` 和实例方法时，最终都会同步触发 `update:modelValue`、`change` 以及对应的 `open` / `close` 事件。
