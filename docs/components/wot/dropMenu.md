# DropMenu 下拉菜单

## 组件概况

DropMenu 下拉菜单组件用于向下或向上展开的菜单，由 `wd-drop-menu` 和 `wd-drop-menu-item` 两个组件配合使用。支持向上/向下展开、选项列表、自定义标题、切换前拦截等功能。适用于筛选、排序等场景。

## 核心功能描述

- **双向展开**：支持向下（down）和向上（up）展开
- **选项列表**：通过 `options` 设置选项数据
- **自定义标题**：通过 `title` 自定义菜单标题
- **蒙层控制**：支持显示/隐藏蒙层
- **切换前拦截**：通过 `beforeToggle` 在展开/收起前拦截
- **实例方法**：提供 open、close、toggle 方法

## 适用业务场景

- **商品筛选**：按价格、销量、评分等筛选商品
- **排序选择**：选择排序方式
- **分类筛选**：多维度筛选条件

## API

### DropMenu Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| zIndex | Number | 12 | 否 | 弹框层级 |
| direction | String | 'down' | 否 | 菜单展开方向，可选值：up / down |
| modal | Boolean | true | 否 | 是否展示蒙层 |
| closeOnClickModal | Boolean | true | 否 | 是否点击蒙层时关闭 |
| duration | Number | 200 | 否 | 菜单展开收起动画时间，单位 ms |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### DropMenuItem Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | String / Number | - | 否 | 当前选中项的值 |
| options | Array | [] | 否 | 列表数据，数据结构 [{label, value, tip}] |
| disabled | Boolean | false | 否 | 是否禁用 |
| title | String | - | 否 | 菜单标题 |
| icon | String | 'arrow-down' | 否 | 菜单图标 |
| iconSize | Number / String | - | 否 | 菜单图标大小 |
| iconName | String | 'check' | 否 | 选中图标名称 |
| valueKey | String | 'value' | 否 | 选项对象中 value 对应的 key |
| labelKey | String | 'label' | 否 | 选项对象中展示文本对应的 key |
| tipKey | String | 'tip' | 否 | 选项对象中选项说明对应的 key |
| beforeToggle | Function | - | 否 | 切换前的钩子函数 |
| customTitle | String | '' | 否 | 左侧文字样式类 |
| customIcon | String | '' | 否 | 右侧图标样式类 |
| customPopupClass | String | '' | 否 | 自定义下拉菜单 popup 样式类 |
| customPopupStyle | String | '' | 否 | 自定义下拉菜单 popup 样式 |
| popupHeight | String | '' | 否 | 弹出层高度 |
| rootPortal | Boolean | false | 否 | 是否从页面中脱离 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### DropMenuItem Methods

| 方法名称 | 参数 | 返回值 | 说明 |
|---------|------|--------|------|
| open | - | void | 打开下拉菜单 |
| close | - | void | 关闭下拉菜单 |
| toggle | - | void | 切换下拉菜单 |
| getShowPop | - | boolean | 获取当前菜单是否展开 |

### DropMenuItem Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| change | 选中项变化时触发 | `({ value, selectedItem })` | 当前选中值与选中项对象 |
| update:modelValue | 值变化时触发 | `(value: string \| number)` | 当前选中值 |
| open | 菜单打开时触发 | - | - |
| opened | 菜单打开动画结束后触发 | - | - |
| close | 菜单关闭时触发 | - | - |
| closed | 菜单关闭动画结束后触发 | - | - |

### DropMenu Slots

| 插槽名称 | 作用域参数 | 使用场景 |
|---------|-----------|---------|
| default | - | 放置多个 `wd-drop-menu-item` |

### DropMenuItem Slots

| 插槽名称 | 作用域参数 | 使用场景 |
|---------|-----------|---------|
| default | - | 自定义菜单项展开内容 |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-drop-menu>
    <wd-drop-menu-item v-model="value1" title="排序" :options="option1" />
    <wd-drop-menu-item v-model="value2" title="筛选" :options="option2" />
  </wd-drop-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref('0')
const value2 = ref('0')

const option1 = [
  { label: '默认排序', value: '0' },
  { label: '销量优先', value: '1' },
  { label: '价格升序', value: '2' }
]
const option2 = [
  { label: '全部', value: '0' },
  { label: '有货', value: '1' }
]
</script>
```

### 示例2：向上展开

```vue
<template>
  <wd-drop-menu direction="up">
    <wd-drop-menu-item v-model="value" title="排序" :options="options" />
  </wd-drop-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('0')
const options = [
  { label: '默认排序', value: '0' },
  { label: '销量优先', value: '1' },
  { label: '价格升序', value: '2' }
]
</script>
```

### 示例3：切换前拦截

```vue
<template>
  <wd-drop-menu>
    <wd-drop-menu-item v-model="value" title="筛选" :options="options" :before-toggle="beforeToggle" />
  </wd-drop-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('0')
const options = [{ label: '选项一', value: '0' }, { label: '选项二', value: '1' }]

function beforeToggle({ status, resolve }) {
  resolve(true)
}
</script>
```

## 注意事项

- 同一 `wd-drop-menu` 中同时只能展开一个菜单项
- `beforeToggle` 需调用 `resolve(true)` 允许切换，`resolve(false)` 阻止切换
- `direction` 为 up 时菜单向上展开
