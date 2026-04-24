# Popover 气泡卡片

## 组件概况

Popover 气泡卡片组件用于围绕目标元素展示浮层内容，支持普通内容模式和菜单模式。组件内置 12 种定位方向、箭头、关闭按钮、内容插槽和手动显隐方法，适用于轻量信息展示和小型操作菜单。

## 核心功能描述

- **12 种定位**：支持上下左右及 `start / end` 变体
- **两种内容模式**：普通文本模式与菜单模式
- **插槽扩展**：支持自定义触发区和内容区
- **手动控制**：支持 `open` / `close` 实例方法
- **队列互斥**：打开一个气泡时会尝试关闭其他同类浮层

## 适用业务场景

- **轻提示**：按钮旁补充说明信息
- **操作菜单**：消息列表、搜索框旁的快捷菜单
- **自定义小卡片**：承载短内容或局部交互

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | Boolean | false | 否 | 是否显示，支持 `v-model` |
| content | String / Object | - | 否 | 展示内容；`menu` 模式下传入数组对象 |
| placement | String | `'bottom'` | 否 | 出现位置，支持 12 种方位 |
| visibleArrow | Boolean | true | 否 | 是否显示箭头 |
| disabled | Boolean | false | 否 | 是否禁用触发 |
| offset | Number | 0 | 否 | 偏移量 |
| useContentSlot | Boolean | false | 否 | 是否使用 `content` 插槽 |
| showClose | Boolean | false | 否 | 是否显示关闭按钮 |
| mode | String | `'normal'` | 否 | 模式，可选值：`normal` / `menu` |
| customArrow | String | `''` | 否 | 自定义箭头样式类 |
| customPop | String | `''` | 否 | 自定义弹出层内容样式类 |
| customStyle | String | `''` | 否 | 自定义根节点样式 |
| customClass | String | `''` | 否 | 自定义根节点样式类 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| change | 显隐变化时触发 | `({ show })` | 当前显示状态 |
| open | 打开时触发 | - | - |
| close | 关闭时触发 | - | - |
| menuclick | 菜单项点击时触发 | `({ item, index })` | 返回当前菜单项和索引 |
| update:modelValue | 显隐变化时触发 | `(value: boolean)` | 用于同步显隐状态 |

### Methods

| 方法名称 | 说明 | 参数 |
|---------|------|------|
| open | 打开气泡卡片 | - |
| close | 关闭气泡卡片 | - |

### Slots

| 插槽名称 | 说明 |
|---------|------|
| default | 触发区域内容 |
| content | 自定义弹出内容，需配合 `useContentSlot` 使用 |

## 使用示例

### 示例 1：基础用法

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

### 示例 2：菜单模式

```vue
<template>
  <wd-popover
    v-model="show"
    mode="menu"
    :content="menu"
    @menuclick="handleMenuClick"
  >
    <wd-button>列表</wd-button>
  </wd-popover>
</template>

<script lang="ts" setup>
const menu = [
  { iconClass: 'read', content: '全部标记已读' },
  { iconClass: 'delete', content: '清空最近会话' }
]

function handleMenuClick({
  item,
  index
}: {
  item: { content: string }
  index: number
}) {
  console.log(item.content, index)
}
</script>
```

### 示例 3：自定义内容

```vue
<template>
  <wd-popover v-model="show" use-content-slot show-close>
    <template #content>
      <view style="padding: 12px; color: #8268de; font-weight: bold;">
        这是一段自定义内容。
      </view>
    </template>
    <wd-button>自定义内容</wd-button>
  </wd-popover>
</template>
```

## 注意事项

- `normal` 模式下 `content` 应为字符串；`menu` 模式下应为数组对象，否则源码会直接报错提示。
- 菜单模式点击项后组件会先关闭，再触发 `menuclick`。
- `change` 会在每次显隐变化时触发，并返回 `{ show }`。
- 关闭按钮展示依赖 `showClose`，其关闭行为与手动调用 `close()` 一致。
