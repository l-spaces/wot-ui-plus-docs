# SortButton 排序按钮

## 组件概述

SortButton 排序按钮组件用于列表排序，支持升序、降序和重置三种状态。支持填充箭头、优先降序、允许重置等功能。通常与 DropMenu 配合使用。

## 核心功能描述

- **三种状态**：升序（1）、降序（-1）、重置（0）
- **填充箭头**：通过 `filled` 使用填充箭头样式
- **优先降序**：通过 `descFirst` 优先切换为降序
- **允许重置**：通过 `allowReset` 允许手动重置
- **下划线**：通过 `line` 显示下划线

## 适用业务场景

- **列表排序**：商品列表按价格、销量排序
- **筛选排序**：筛选面板中的排序选项

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | Number | 0 | 否 | 选中状态，1 升序、0 重置、-1 降序 |
| title | String | '' | 否 | 排序按钮展示文案 |
| filled | Boolean | false | 否 | 是否展示填充箭头 |
| allowReset | Boolean | false | 否 | 是否允许手动重置 |
| descFirst | Boolean | false | 否 | 是否优先切换为降序 |
| line | Boolean | true | 否 | 是否展示下划线 |
| lineColor | String | - | 否 | 自定义下划线颜色 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| change | 排序状态变化时触发 | ({ value }) | 当前排序状态值 |
| update:modelValue | 排序状态变化时触发 | (value: number) | 用于 v-model 双向绑定 |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-sort-button v-model="sort" title="价格" @change="onSortChange" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const sort = ref(0)

function onSortChange({ value }) {
  console.log('排序:', value)
}
</script>
```

### 示例2：优先降序与允许重置

```vue
<template>
  <wd-sort-button v-model="sort" title="销量" desc-first allow-reset />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const sort = ref(0)
</script>
```

### 示例3：配合 DropMenu

```vue
<template>
  <wd-drop-menu>
    <wd-drop-menu-item>
      <wd-sort-button v-model="sort1" title="价格" />
      <wd-sort-button v-model="sort2" title="销量" />
    </wd-drop-menu-item>
  </wd-drop-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const sort1 = ref(0)
const sort2 = ref(0)
</script>
```

## 注意事项

- 默认点击顺序为：升序 → 降序 → 重置（如 allowReset 开启）
- `descFirst` 为 true 时优先切换为降序
- 多个排序按钮同时使用时，建议互斥处理
