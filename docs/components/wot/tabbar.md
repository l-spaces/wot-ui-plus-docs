# Tabbar 标签栏

## 组件概述

Tabbar 标签栏组件用于底部导航，由 `wd-tabbar` 和 `wd-tabbar-item` 两个组件配合使用。支持固定底部、圆形形状、自定义颜色、徽标提示等功能。适用于应用底部导航栏场景。

## 核心功能描述

- **固定底部**：通过 `fixed` 固定在页面底部
- **圆形形状**：通过 `shape="round"` 设置圆角标签栏
- **自定义颜色**：通过 `activeColor` 和 `inactiveColor` 自定义颜色
- **徽标提示**：tabbar-item 支持数字徽标和红点提示
- **占位元素**：通过 `placeholder` 在固定时生成等高占位元素
- **安全距离**：通过 `safeAreaInsetBottom` 适配底部安全区域

## 适用业务场景

- **应用导航**：应用底部导航栏
- **页面切换**：底部标签切换不同页面

## API

### Tabbar Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | Number / String | 0 | 否 | 选中标签的索引值或名称，支持 v-model 双向绑定 |
| fixed | Boolean | false | 否 | 是否固定在底部 |
| bordered | Boolean | true | 否 | 是否显示顶部边框 |
| safeAreaInsetBottom | Boolean | false | 否 | 是否设置底部安全距离 |
| shape | String | 'default' | 否 | 标签栏形状，可选值：default / round |
| activeColor | String | - | 否 | 激活标签的颜色 |
| inactiveColor | String | - | 否 | 未激活标签的颜色 |
| placeholder | Boolean | false | 否 | 固定在底部时是否生成等高占位元素 |
| zIndex | Number | 99 | 否 | 层级 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### TabbarItem Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| title | String | - | 否 | 标签页标题 |
| name | Number / String | - | 否 | 唯一标识符 |
| icon | String | - | 否 | 图标名称 |
| value | Number / String / null | null | 否 | 徽标显示值 |
| isDot | Boolean | - | 否 | 是否点状徽标 |
| max | Number | - | 否 | 徽标最大值 |
| badgeProps | Object | - | 否 | 徽标属性，透传给 Badge 组件 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Tabbar Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| change | 切换标签时触发 | ({ value: number \| string }) | 当前选中标签的值 |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-tabbar v-model="active" @change="handleChange">
    <wd-tabbar-item title="首页" icon="home" />
    <wd-tabbar-item title="分类" icon="category" />
    <wd-tabbar-item title="消息" icon="chat" :value="5" />
    <wd-tabbar-item title="我的" icon="user" />
  </wd-tabbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(0)

function handleChange({ value }) {
  console.log('切换到:', value)
}
</script>
```

### 示例2：固定底部与圆形

```vue
<template>
  <wd-tabbar v-model="active" fixed placeholder shape="round">
    <wd-tabbar-item title="首页" icon="home" />
    <wd-tabbar-item title="分类" icon="category" />
    <wd-tabbar-item title="消息" icon="chat" is-dot />
    <wd-tabbar-item title="我的" icon="user" />
  </wd-tabbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(0)
</script>
```

### 示例3：自定义颜色

```vue
<template>
  <wd-tabbar v-model="active" active-color="#ee0a24" inactive-color="#999">
    <wd-tabbar-item title="首页" icon="home" />
    <wd-tabbar-item title="分类" icon="category" />
  </wd-tabbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(0)
</script>
```

## 注意事项

- `fixed` 为 true 时建议同时设置 `placeholder` 为 true，避免内容被遮挡
- `shape="round"` 时标签栏底部会有圆角效果
- `name` 属性用于自定义标识符，不设置时默认使用索引
