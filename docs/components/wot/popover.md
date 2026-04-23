# Popover 气泡卡片

## 组件概述

Popover 气泡卡片组件用于点击或悬停时展示气泡弹出框，支持 12 种位置、自定义内容、菜单模式、箭头、关闭按钮等功能。与 Tooltip 不同，Popover 支持菜单模式和更丰富的交互。

## 核心功能描述

- **12种位置**：支持 top、bottom、left、right 及其 start/end 变体
- **两种模式**：normal（普通内容）和 menu（菜单列表）
- **自定义内容**：通过 `useContentSlot` 使用内容插槽
- **菜单模式**：通过 `mode` 设置为 menu，配合 `content` 传入菜单数据
- **箭头控制**：通过 `visibleArrow` 控制箭头显示
- **关闭按钮**：通过 `showClose` 显示关闭按钮
- **手动控制**：通过 `open`、`close` 方法手动控制显隐

## 适用业务场景

- **操作菜单**：点击按钮弹出操作菜单列表
- **信息提示**：点击展示补充信息
- **自定义弹框**：通过插槽自定义弹出内容

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | Boolean | false | 否 | 是否显示，支持 v-model 双向绑定 |
| content | String / Array | - | 否 | 显示内容，菜单模式时传入数组 |
| placement | String | 'bottom' | 否 | 出现位置，可选值：top / top-start / top-end / bottom / bottom-start / bottom-end / left / left-start / left-end / right / right-start / right-end |
| visibleArrow | Boolean | true | 否 | 是否显示箭头 |
| disabled | Boolean | false | 否 | 是否禁用 |
| offset | Number | 0 | 否 | 偏移量 |
| useContentSlot | Boolean | false | 否 | 是否使用内容插槽 |
| showClose | Boolean | false | 否 | 是否显示关闭按钮 |
| mode | String | 'normal' | 否 | 显示模式，可选值：normal / menu |
| customArrow | String | '' | 否 | 自定义箭头样式类 |
| customPop | String | '' | 否 | 自定义弹出内容样式类 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| change | 显隐变化时触发 | ({ show: boolean }) | 当前显示状态 |
| menuclick | 菜单模式点击时触发 | ({ item, index }) | item 为菜单项对象，index 为索引 |
| open | 打开时触发 | - | - |
| close | 关闭时触发 | - | - |

### Methods

| 方法名称 | 参数 | 返回值 | 说明 |
|---------|------|--------|------|
| open | - | void | 打开 popover |
| close | - | void | 关闭 popover |

### Slots

| 插槽名称 | 作用域参数 | 使用场景 |
|---------|-----------|---------|
| default | - | 触发弹出框的目标元素 |
| content | - | 自定义弹出框内容（需设置 useContentSlot 为 true） |

## 使用示例

### 示例1：基础用法

通过 `content` 设置气泡内容，`placement` 设置弹出位置。

```vue
<template>
  <wd-popover content="这是一段内容。" placement="bottom" v-model="show">
    <wd-button>点击展示</wd-button>
  </wd-popover>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(false)
</script>
```

### 示例2：菜单模式

设置 `mode` 为 `menu`，`content` 传入菜单数组，点击菜单项触发 `menuclick` 事件。

```vue
<template>
  <wd-popover v-model="show" mode="menu" :content="menu" @menuclick="onMenuClick">
    <wd-button>列表</wd-button>
  </wd-popover>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(false)
const menu = ref([
  { iconClass: 'read', content: '全部标记已读' },
  { iconClass: 'delete', content: '清空最近会话' },
  { iconClass: 'detection', content: '消息订阅设置' }
])

function onMenuClick({ item, index }: any) {
  console.log('选择了:', item.content)
}
</script>
```

### 示例3：自定义内容与关闭按钮

通过 `use-content-slot` 使用内容插槽自定义弹出内容，`show-close` 显示关闭按钮。

```vue
<template>
  <wd-popover v-model="show" use-content-slot placement="bottom" show-close>
    <template #content>
      <view style="padding: 10px; color: #8268de; font-weight: bold;">
        这是一段自定义样式的内容。
      </view>
    </template>
    <wd-button>自定义内容</wd-button>
  </wd-popover>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(false)
</script>
```

## 注意事项

- `mode` 为 menu 时，`content` 需传入数组，每项包含 `iconClass` 和 `content` 字段
- `useContentSlot` 为 true 时，需使用 `#content` 插槽传入内容
- `placement` 支持 12 种位置，根据页面空间选择合适的位置
- 可通过 ref 调用 `open` 和 `close` 方法手动控制显隐
