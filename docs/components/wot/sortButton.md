# SortButton 排序按钮
<demo-model url="/subPages/sortButton/Index"></demo-model>

## 组件概况

### 组件概述
排序按钮是用于实现数据排序功能的交互组件，支持升序、降序和重置三种状态切换，提供直观的视觉反馈和灵活的配置选项。

### 详细功能描述
- 支持升序、降序和重置三种排序状态
- 支持自定义标题文本
- 支持填充箭头和线框箭头两种图标样式
- 支持配置是否允许手动重置按钮
- 支持设置优先降序或优先升序的切换逻辑
- 支持配置是否显示下划线
- 支持自定义下划线颜色
- 支持自定义样式和类名

### 适用业务场景
- 表格数据排序
- 列表数据排序
- 卡片列表排序
- 任何需要排序交互的场景

## 完整API参考

### Props属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| modelValue | number | 0 | 否 | 排序状态，1表示升序，0表示重置，-1表示降序 |
| title | string | '' | 否 | 排序按钮展示的文案 |
| filled | boolean | false | 否 | 是否展示填充箭头 |
| allowReset | boolean | false | 否 | 当展示双箭头时，是否允许手动重置按钮 |
| descFirst | boolean | false | 否 | 是否优先切换为降序，不开启则默认优先切换为升序 |
| line | boolean | true | 否 | 是否展示下划线，当只有一个排序按钮时通常不展示 |
| lineColor | string | - | 否 | 自定义下划线颜色 |
| customStyle | string | - | 否 | 自定义根节点样式 |
| customClass | string | - | 否 | 自定义根节点样式类 |

### Events事件

| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| update:modelValue | 排序状态变化时 | value: 新的排序状态（1: 升序，0: 重置，-1: 降序） |
| change | 排序状态变化时 | { value: 新的排序状态 } |

### Methods方法

该组件没有对外暴露的方法。

### Slots插槽

该组件没有可用的插槽。

## 多场景使用示例代码

### 1. 基础用法

```vue
<template>
  <view class="sort-button-demo">
    <!-- 基础排序按钮 -->
    <wd-sort-button title="排序" v-model="sortValue"></wd-sort-button>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 排序状态，1表示升序，0表示重置，-1表示降序
const sortValue = ref(0)
</script>

<style scoped>
.sort-button-demo {
  padding: 20rpx;
}
</style>
```

### 2. 允许重置的排序按钮

```vue
<template>
  <view class="sort-button-demo">
    <!-- 允许重置的排序按钮 -->
    <wd-sort-button 
      title="价格" 
      v-model="sortValue" 
      allowReset 
    ></wd-sort-button>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const sortValue = ref(0)
</script>

<style scoped>
.sort-button-demo {
  padding: 20rpx;
}
</style>
```

### 3. 优先降序的排序按钮

```vue
<template>
  <view class="sort-button-demo">
    <!-- 优先降序的排序按钮 -->
    <wd-sort-button 
      title="销量" 
      v-model="sortValue" 
      desc-first 
    ></wd-sort-button>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const sortValue = ref(0)
</script>

<style scoped>
.sort-button-demo {
  padding: 20rpx;
}
</style>
```

### 4. 填充箭头样式

```vue
<template>
  <view class="sort-button-demo">
    <!-- 填充箭头样式 -->
    <wd-sort-button 
      title="评分" 
      v-model="sortValue" 
      filled 
    ></wd-sort-button>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const sortValue = ref(0)
</script>

<style scoped>
.sort-button-demo {
  padding: 20rpx;
}
</style>
```

### 5. 自定义下划线颜色

```vue
<template>
  <view class="sort-button-demo">
    <!-- 自定义下划线颜色 -->
    <wd-sort-button 
      title="时间" 
      v-model="sortValue" 
      line-color="#1989fa" 
    ></wd-sort-button>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const sortValue = ref(0)
</script>

<style scoped>
.sort-button-demo {
  padding: 20rpx;
}
</style>
```

## 样式定制指南

### 1. 使用customStyle自定义样式

```vue
<template>
  <wd-sort-button 
    title="自定义样式" 
    v-model="sortValue"
    customStyle="font-size: 32rpx; color: #1989fa;"
  ></wd-sort-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const sortValue = ref(0)
</script>
```

### 2. 使用customClass自定义类名

```vue
<template>
  <wd-sort-button 
    title="自定义类名" 
    v-model="sortValue"
    customClass="my-sort-button"
  ></wd-sort-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const sortValue = ref(0)
</script>

<style scoped>
:deep(.my-sort-button) {
  font-weight: bold;
  text-transform: uppercase;
}
</style>
```

### 3. 自定义下划线颜色

```vue
<template>
  <wd-sort-button 
    title="自定义下划线" 
    v-model="sortValue"
    line-color="#ff6b6b"
  ></wd-sort-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const sortValue = ref(0)
</script>
```

## 注意事项

1. **排序状态值**：modelValue属性使用1表示升序，0表示重置，-1表示降序，使用时需注意对应关系。

2. **切换逻辑**：
   - 当descFirst为false（默认）时，切换顺序为：重置 → 升序 → 降序 → 重置（如果allowReset为true）
   - 当descFirst为true时，切换顺序为：重置 → 降序 → 升序 → 重置（如果allowReset为true）

3. **重置功能**：只有当allowReset为true时，点击按钮才能回到重置状态，否则会在升序和降序之间循环切换。

4. **下划线显示**：当只有一个排序按钮时，通常建议将line属性设置为false，不显示下划线。

5. **样式优先级**：customStyle的优先级高于组件内部样式，customClass可以通过穿透选择器覆盖组件内部样式。

6. **事件触发**：排序状态变化时，会同时触发update:modelValue和change事件，可以根据需要选择使用。

7. **性能优化**：避免在排序按钮中使用过于复杂的内容，以免影响渲染性能。

8. **跨平台兼容性**：该组件在各平台表现一致，无需特殊处理。