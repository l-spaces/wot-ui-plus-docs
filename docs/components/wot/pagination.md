# Pagination 分页

## 组件概述

Pagination 分页组件用于数据分页导航，支持页码切换、总条数展示、图标模式等功能。适用于列表数据分页展示场景。

## 核心功能描述

- **页码切换**：上一页、下一页、指定页码
- **总条数展示**：通过 `showMessage` 显示总条数
- **图标模式**：通过 `showIcon` 使用图标替代文字
- **自动计算**：通过 `total` 和 `pageSize` 自动计算总页数
- **单页隐藏**：通过 `hideIfOnePage` 只有一页时隐藏

## 适用业务场景

- **列表分页**：数据列表的分页导航
- **搜索结果**：搜索结果分页展示
- **数据表格**：表格数据分页

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | Number | - | 是 | 当前页码，支持 v-model 双向绑定 |
| totalPage | Number | 1 | 否 | 总页数，有 total 时优先使用 total 计算 |
| showIcon | Boolean | false | 否 | 是否展示分页为图标 |
| showMessage | Boolean | false | 否 | 是否展示总条数 |
| total | Number | 0 | 否 | 总条数 |
| pageSize | Number | 10 | 否 | 每页条数 |
| prevText | String | - | 否 | 上一页文本 |
| nextText | String | - | 否 | 下一页文本 |
| hideIfOnePage | Boolean | true | 否 | 总页数只有一页时是否隐藏 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| change | 页码变化时触发 | ({ value }) | 当前页码 |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-pagination v-model="current" :total="100" :page-size="10" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const current = ref(1)
</script>
```

### 示例2：图标模式与总条数

```vue
<template>
  <wd-pagination v-model="current" :total="50" :page-size="10" show-icon show-message />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const current = ref(1)
</script>
```

### 示例3：自定义文本

```vue
<template>
  <wd-pagination v-model="current" :total-page="5" prev-text="上一页" next-text="下一页" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const current = ref(1)
</script>
```

## 注意事项

- 设置 `total` 和 `pageSize` 后会自动计算总页数，优先级高于 `totalPage`
- `hideIfOnePage` 为 true 时，总页数为 1 时组件不显示
- `showIcon` 为 true 时使用箭头图标替代文字按钮
