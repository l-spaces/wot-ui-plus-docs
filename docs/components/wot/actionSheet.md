# ActionSheet 动作面板

## 组件概况

ActionSheet 动作面板组件用于从底部弹出一组操作项，由 `wd-popup` 提供弹层基础能力。除常规 `actions` 列表外，还支持 `panels` 图文面板、自定义头部样式和默认插槽内容，适用于分享、快捷操作和多入口选择场景。

## 核心功能描述

- **动作列表**：通过 `actions` 渲染标准操作项
- **图文面板**：通过 `panels` 渲染单行或多行图文入口
- **取消与关闭**：支持取消按钮、点击蒙层关闭和头部关闭按钮
- **状态控制**：支持禁用、加载和颜色定制
- **弹层事件**：支持打开、关闭、已打开、已关闭等生命周期事件

## 适用业务场景

- **分享面板**：微信、朋友圈、QQ 等分享入口选择
- **更多操作**：列表项的批量操作、卡片操作入口
- **快捷菜单**：图文式快捷功能导航

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | Boolean | false | 是 | 是否显示面板，支持 `v-model` |
| actions | `Action[]` | `[]` | 否 | 动作项列表 |
| panels | `Panel[] \| Panel[][]` | `[]` | 否 | 图文面板数据；一维数组为单行，二维数组为多行 |
| title | String | - | 否 | 头部标题 |
| cancelText | String | - | 否 | 取消按钮文案 |
| closeOnClickAction | Boolean | true | 否 | 点击动作项或面板项后是否自动关闭 |
| closeOnClickModal | Boolean | true | 否 | 点击蒙层是否关闭 |
| duration | Number | 200 | 否 | 动画时长 |
| zIndex | Number | 10 | 否 | 弹层层级 |
| lazyRender | Boolean | true | 否 | 是否懒渲染内容 |
| safeAreaInsetBottom | Boolean | true | 否 | 是否适配底部安全区 |
| rootPortal | Boolean | false | 否 | 是否脱离当前页面层级渲染 |
| customHeaderClass | String | `''` | 否 | 自定义头部样式类 |
| customStyle | String | `''` | 否 | 自定义根节点样式 |
| customClass | String | `''` | 否 | 自定义根节点样式类 |

### Action 类型

| 属性名称 | 类型 | 是否必填 | 说明 |
|---------|------|---------|------|
| name | String | 是 | 选项名称 |
| subname | String | 否 | 选项描述 |
| color | String | 否 | 选项颜色 |
| disabled | Boolean | 否 | 是否禁用 |
| loading | Boolean | 否 | 是否处于加载中 |

### Panel 类型

| 属性名称 | 类型 | 是否必填 | 说明 |
|---------|------|---------|------|
| iconUrl | String | 是 | 图标地址 |
| title | String | 是 | 面板标题 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| select | 点击动作项或面板项时触发 | `({ item, index })` / `({ item, rowIndex, colIndex })` | 动作项返回 `item + index`；多行面板返回 `item + rowIndex + colIndex` |
| click-modal | 点击蒙层时触发 | - | - |
| cancel | 点击取消按钮时触发 | - | - |
| open | 弹层开始打开时触发 | - | - |
| opened | 弹层打开动画结束后触发 | - | - |
| close | 组件执行关闭逻辑时触发 | - | - |
| closed | 弹层关闭动画结束后触发 | - | - |
| update:modelValue | 显示状态变化时触发 | `(value: boolean)` | 用于同步显隐状态 |

### Slots

| 插槽名称 | 说明 |
|---------|------|
| default | 自定义面板主体内容 |

## 使用示例

### 示例 1：基础动作列表

```vue
<template>
  <wd-button @click="show = true">显示动作面板</wd-button>
  <wd-action-sheet v-model="show" :actions="actions" @select="handleSelect" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(false)
const actions = [
  { name: '选项一' },
  { name: '选项二' },
  { name: '选项三', subname: '补充描述' }
]

function handleSelect({ item, index }: { item: { name: string }; index: number }) {
  console.log(item.name, index)
}
</script>
```

### 示例 2：图文面板

```vue
<template>
  <wd-action-sheet
    v-model="show"
    :panels="panels"
    cancel-text="取消"
    @select="handleSelect"
  />
</template>

<script lang="ts" setup>
const panels = [
  [
    { iconUrl: 'https://example.com/wechat.png', title: '微信好友' },
    { iconUrl: 'https://example.com/moment.png', title: '朋友圈' }
  ],
  [{ iconUrl: 'https://example.com/qq.png', title: 'QQ 好友' }]
]

function handleSelect(payload: {
  item: { title: string }
  rowIndex: number
  colIndex: number
}) {
  console.log(payload.item.title, payload.rowIndex, payload.colIndex)
}
</script>
```

### 示例 3：自定义内容

```vue
<template>
  <wd-action-sheet v-model="show" title="标题" cancel-text="取消">
    <view style="padding: 16px 16px 120px;">自定义内容区域</view>
  </wd-action-sheet>
</template>
```

## 注意事项

- 组件当前没有 `description`、`lockScroll` 等 props，若旧文档出现这些字段，应以源码当前实现为准。
- `select` 在 `actions` 和 `panels` 两种模式下返回结构不同，面板多行模式会额外返回 `rowIndex` 与 `colIndex`。
- `close` 代表组件执行关闭动作，真正关闭动画结束应使用 `closed`。
- 当 `actions`、`panels` 和默认插槽都为空时，面板不会展示实际内容。
