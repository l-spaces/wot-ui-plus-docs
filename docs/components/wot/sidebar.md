# Sidebar 侧边栏

## 组件概述

Sidebar 侧边栏组件用于侧边导航，由 `wd-sidebar` 和 `wd-sidebar-item` 两个组件配合使用。支持徽标提示、禁用状态、切换前拦截等功能。适用于分类导航、设置页面等场景。

## 核心功能描述

- **侧边导航**：垂直排列的导航项
- **徽标提示**：支持数字徽标和红点提示
- **禁用状态**：支持禁用单个导航项
- **切换前拦截**：通过 `beforeChange` 在切换前进行校验
- **图标支持**：导航项支持图标

## 适用业务场景

- **分类导航**：商品分类侧边导航
- **设置页面**：设置项分组导航
- **筛选面板**：筛选条件分类导航

## API

### Sidebar Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | Number / String | 0 | 否 | 当前导航项的索引，支持 v-model 双向绑定 |
| beforeChange | Function | - | 否 | 切换前的钩子函数，接收 { value, resolve } 参数 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### SidebarItem Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| label | String | - | 是 | 当前选项标题 |
| value | Number / String | - | 是 | 当前选项的值，唯一标识 |
| badge | String / Number / null | null | 否 | 徽标显示值 |
| badgeProps | Object | - | 否 | 徽标属性，透传给 Badge 组件 |
| icon | String | - | 否 | 图标 |
| isDot | Boolean | - | 否 | 是否点状徽标 |
| max | Number | - | 否 | 徽标最大值 |
| disabled | Boolean | false | 否 | 是否禁用 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Sidebar Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| change | 切换导航项时触发 | ({ value }) | 当前选中项的值 |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-sidebar v-model="active">
    <wd-sidebar-item label="标签一" :value="1" />
    <wd-sidebar-item label="标签二" :value="2" />
    <wd-sidebar-item label="标签三" :value="3" />
  </wd-sidebar>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(1)
</script>
```

### 示例2：带徽标与禁用

```vue
<template>
  <wd-sidebar v-model="active">
    <wd-sidebar-item label="消息" :value="1" :badge="5" />
    <wd-sidebar-item label="通知" :value="2" is-dot />
    <wd-sidebar-item label="设置" :value="3" disabled />
  </wd-sidebar>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(1)
</script>
```

### 示例3：切换前拦截

```vue
<template>
  <wd-sidebar v-model="active" :before-change="beforeChange">
    <wd-sidebar-item label="标签一" :value="1" />
    <wd-sidebar-item label="标签二" :value="2" />
  </wd-sidebar>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(1)

function beforeChange({ value, resolve }) {
  if (value === 2) {
    resolve(false)
  } else {
    resolve(true)
  }
}
</script>
```

## 注意事项

- `value` 属性为必填项，用于唯一标识导航项
- `beforeChange` 需调用 `resolve(true)` 允许切换，`resolve(false)` 阻止切换
- 禁用状态的导航项不可点击
