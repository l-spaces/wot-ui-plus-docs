# SortButton 排序按钮

## 组件概况

SortButton 排序按钮组件用于列表排序，支持升序、降序和重置三种状态，常与筛选栏、下拉菜单等组合使用。

## 核心功能描述

- **三态切换**：支持升序 `1`、降序 `-1`、重置 `0` 三种状态。
- **填充箭头**：通过 `filled` 切换为填充风格图标。
- **优先降序**：通过 `descFirst` 控制首次点击优先进入降序。
- **允许重置**：通过 `allowReset` 控制是否可从排序状态回到 `0`。
- **下划线样式**：通过 `line` 和 `lineColor` 控制激活样式。

## 适用业务场景

- **商品列表排序**：按价格、销量、上架时间等字段排序。
- **筛选面板排序**：与 `wd-drop-menu` 等组件组合使用。

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | Number | 0 | 否 | 当前排序状态，`1` 为升序，`0` 为未选中，`-1` 为降序。 |
| title | String | `''` | 否 | 排序按钮文案。 |
| filled | Boolean | false | 否 | 是否使用填充箭头图标。 |
| allowReset | Boolean | false | 否 | 是否允许切换回未选中状态。 |
| descFirst | Boolean | false | 否 | 是否首次点击优先进入降序。 |
| line | Boolean | true | 否 | 是否显示激活下划线。 |
| lineColor | String | - | 否 | 自定义下划线颜色。 |
| customStyle | String | `''` | 否 | 自定义根节点样式。 |
| customClass | String | `''` | 否 | 自定义根节点样式类。 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调说明 |
|---------|---------|---------|---------|
| change | 排序状态变化时触发 | `({ value: number })` | 当前排序值。 |
| update:modelValue | 排序状态变化时触发 | `(value: number)` | 用于 `v-model` 双向绑定。 |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-sort-button v-model="sort" title="价格" @change="handleChange" />
  <wd-sort-button v-model="sort" filled title="价格" @change="handleChange" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const sort = ref(0)

function handleChange({ value }: { value: number }) {
  console.log(value)
}
</script>
```

### 示例2：允许重置与优先降序

```vue
<template>
  <wd-sort-button v-model="sort1" title="价格" allow-reset />
  <wd-sort-button v-model="sort2" title="销量" desc-first />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const sort1 = ref(0)
const sort2 = ref(0)
</script>
```

### 示例3：下划线样式与组合使用

```vue
<template>
  <wd-sort-button v-model="sort1" title="价格" line-color="red" />

  <wd-drop-menu>
    <wd-drop-menu-item>
      <wd-sort-button v-model="sort2" title="价格" :line="false" />
      <wd-sort-button v-model="sort3" title="上架时间" />
    </wd-drop-menu-item>
  </wd-drop-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const sort1 = ref(0)
const sort2 = ref(0)
const sort3 = ref(0)
</script>
```

## 注意事项

- 默认点击顺序为 `0 -> 1 -> -1`，开启 `allowReset` 后才会出现第三步重置到 `0`。
- `descFirst` 为 `true` 时，点击顺序改为 `0 -> -1 -> 1`。
- `line` 通常用于多个排序按钮并列展示；单个排序按钮场景可按需关闭。
