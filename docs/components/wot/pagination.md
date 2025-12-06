# Pagination 分页

<demo-model url="/subPages/pagination/Index"></demo-model>


## 组件概况

### 组件概述
分页组件用于展示和切换页码，通常用于列表页、数据表格、搜索结果页等需要分页显示数据的场景。wd-pagination 组件提供了灵活的配置选项，支持页码切换、总条数显示、图标/文本模式切换等功能。

### 详细功能描述
- 支持当前页双向绑定
- 支持总页数自动计算或手动设置
- 支持上一页/下一页切换
- 支持图标模式和文本模式切换
- 支持显示总条数、当前页信息
- 支持自定义上一页/下一页文本
- 支持总页数为1时隐藏分页组件
- 支持国际化文本
- 支持自定义样式和类名

### 适用业务场景
- 列表页数据分页
- 数据表格分页
- 搜索结果页分页
- 长列表加载更多
- 任何需要分页显示数据的场景

## 完整API参考

### Props属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| modelValue | number | - | 是 | 当前页 |
| totalPage | number | 1 | 否 | 总页数，如果有total，则优先使用total计算页数 |
| showIcon | boolean | false | 否 | 是否展示分页为Icon图标 |
| showMessage | boolean | false | 否 | 是否展示总条数 |
| total | number | 0 | 否 | 总条数 |
| pageSize | number | 10 | 否 | 每页条数 |
| prevText | string | - | 否 | 上一页文本 |
| nextText | string | - | 否 | 下一页文本 |
| hideIfOnePage | boolean | true | 否 | 总页数只有一页时是否隐藏 |
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |

### Events事件

| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| change | 页码改变时 | { value: number } - 新的页码值 |
| update:modelValue | 页码改变时 | number - 新的页码值 |

### Methods方法

该组件没有对外暴露的方法。

### Slots插槽

该组件没有定义插槽。

## 多场景使用示例代码

### 1. 基础用法

```vue
<template>
  <view class="pagination-demo">
    <wd-pagination 
      v-model="currentPage" 
      :total="100" 
      :page-size="10" 
      @change="handlePageChange"
    />
    <view class="page-info">当前页码：{{ currentPage }}</view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const currentPage = ref(1)

const handlePageChange = (params: { value: number }) => {
  console.log('页码改变', params.value)
}
</script>

<style scoped>
.pagination-demo {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.page-info {
  font-size: 16px;
  color: #666;
}
</style>
```

### 2. 显示总条数

```vue
<template>
  <view class="pagination-demo">
    <wd-pagination 
      v-model="currentPage" 
      :total="150" 
      :page-size="20" 
      show-message
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const currentPage = ref(1)
</script>
```

### 3. 图标模式

```vue
<template>
  <view class="pagination-demo">
    <wd-pagination 
      v-model="currentPage" 
      :total="200" 
      :page-size="15" 
      show-icon
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const currentPage = ref(1)
</script>
```

### 4. 自定义上一页/下一页文本

```vue
<template>
  <view class="pagination-demo">
    <wd-pagination 
      v-model="currentPage" 
      :total="120" 
      :page-size="10" 
      prev-text="上一页" 
      next-text="下一页"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const currentPage = ref(1)
</script>
```

### 5. 总页数为1时不隐藏

```vue
<template>
  <view class="pagination-demo">
    <wd-pagination 
      v-model="currentPage" 
      :total="5" 
      :page-size="10" 
      :hide-if-one-page="false"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const currentPage = ref(1)
</script>
```

## 样式定制指南

### customStyle 用法
使用 customStyle 属性可以自定义分页组件的内联样式，例如修改颜色、字体大小、间距等。

```vue
<wd-pagination 
  v-model="currentPage" 
  :total="100" 
  :page-size="10" 
  custom-style="color: #409eff; font-size: 14px; gap: 10px;"
/>
```

### customClass 用法
使用 customClass 属性可以为分页组件添加自定义样式类，便于在外部 CSS 中进行样式定制。

```vue
<wd-pagination 
  v-model="currentPage" 
  :total="100" 
  :page-size="10" 
  custom-class="my-pagination"
/>

<style scoped>
:deep(.my-pagination) {
  --wd-button-default-color: #606266;
  --wd-button-default-bg-color: #f5f7fa;
  --wd-button-default-border-color: #dcdfe6;
  --wd-button-plain-color: #409eff;
  --wd-button-plain-border-color: #c6e2ff;
}
</style>
```

## 注意事项

1. **总页数计算**：如果同时设置了 total 和 totalPage 属性，组件会优先使用 total 和 pageSize 计算总页数，忽略 totalPage 属性。

2. **双向绑定**：组件支持使用 v-model 双向绑定 currentPage，也可以使用 :model-value 和 @update:model-value 手动绑定。

3. **hideIfOnePage 属性**：当 hideIfOnePage 为 true 且总页数只有一页时，分页组件会自动隐藏。

4. **showMessage 属性**：当 showMessage 为 true 时，组件会显示当前页、总页数、总条数等信息。

5. **showIcon 属性**：当 showIcon 为 true 时，上一页/下一页按钮会显示为图标，否则显示为文本。

6. **国际化支持**：组件内置了国际化支持，默认使用英文文本，也可以通过 prevText 和 nextText 属性自定义文本。

7. **性能优化**：对于大数据量的场景，建议使用 total 属性计算总页数，而不是手动设置 totalPage 属性。

8. **样式定制**：可以通过 customStyle 和 customClass 属性自定义组件样式，也可以通过 CSS 变量修改组件的主题色、边框颜色等。