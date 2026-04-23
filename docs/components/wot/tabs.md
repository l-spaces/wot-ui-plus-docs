# Tabs 标签页

## 组件概述

Tabs 标签页组件用于内容分类切换，由 `wd-tabs` 和 `wd-tab` 两个组件配合使用。支持滑动导航、粘性布局、手势滑动、切换动画、导航地图等功能。适用于内容分类、多面板切换等场景。

## 核心功能描述

- **滑动导航**：标签数超过阈值自动切换为可滑动模式
- **导航地图**：标签数超过阈值显示导航地图弹窗
- **粘性布局**：通过 `sticky` 吸顶固定
- **手势滑动**：通过 `swipeable` 开启手势滑动切换
- **切换动画**：通过 `animated` 开启内容切换动画
- **自定义底部条**：支持自定义底部条宽度和高度
- **懒加载**：tab 内容默认懒加载

## 适用业务场景

- **内容分类**：商品列表按分类切换
- **信息面板**：详情页多个信息面板切换
- **多步骤表单**：分步表单的步骤切换

## API

### Tabs Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | Number / String | 0 | 否 | 绑定值，支持 v-model 双向绑定 |
| slidableNum | Number | 6 | 否 | 标签数超过此阈值可滑动 |
| mapNum | Number | 10 | 否 | 标签数超过此阈值显示导航地图 |
| mapTitle | String | - | 否 | 导航地图标题 |
| sticky | Boolean | false | 否 | 是否粘性布局 |
| offsetTop | Number | 0 | 否 | 粘性布局吸顶位置 |
| swipeable | Boolean | false | 否 | 是否开启手势滑动 |
| autoLineWidth | Boolean | false | 否 | 是否自动调整底部条宽度 |
| lineWidth | Number / String | - | 否 | 底部条宽度 |
| lineHeight | Number / String | - | 否 | 底部条高度 |
| color | String | '' | 否 | 激活颜色 |
| inactiveColor | String | '' | 否 | 非激活颜色 |
| animated | Boolean | false | 否 | 是否开启切换动画 |
| duration | Number | 300 | 否 | 切换动画过渡时间，单位 ms |
| slidable | String | 'auto' | 否 | 是否开启滚动导航，可选值：auto / always |
| showScrollbar | Boolean | false | 否 | 是否显示滚动条 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Tab Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| name | Number / String | - | 否 | 唯一标识符 |
| title | String | - | 否 | 标签标题 |
| disabled | Boolean | false | 否 | 是否禁用 |
| lazy | Boolean | true | 否 | 是否懒加载 |
| badgeProps | Object | - | 否 | 徽标属性，透传给 Badge 组件 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Tabs Methods

| 方法名称 | 参数 | 返回值 | 说明 |
|---------|------|--------|------|
| setActive | (value, init, setScroll) | void | 设置激活项 |
| scrollIntoView | - | void | 使选中项滚动到可视区域 |
| updateLineStyle | (animation?) | void | 更新底部条样式 |

### Tabs Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| change | 切换标签时触发 | ({ name }) | 当前选中标签的 name |
| disabled | 点击禁用标签时触发 | ({ name }) | 被点击的禁用标签的 name |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-tabs v-model="active">
    <wd-tab title="标签一">内容一</wd-tab>
    <wd-tab title="标签二">内容二</wd-tab>
    <wd-tab title="标签三">内容三</wd-tab>
  </wd-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(0)
</script>
```

### 示例2：粘性布局与手势滑动

```vue
<template>
  <wd-tabs v-model="active" sticky swipeable>
    <wd-tab title="标签一">内容一</wd-tab>
    <wd-tab title="标签二">内容二</wd-tab>
    <wd-tab title="标签三">内容三</wd-tab>
  </wd-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(0)
</script>
```

### 示例3：切换动画与自定义底部条

```vue
<template>
  <wd-tabs v-model="active" animated line-width="20" line-height="3">
    <wd-tab title="标签一">内容一</wd-tab>
    <wd-tab title="标签二">内容二</wd-tab>
  </wd-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(0)
</script>
```

## 注意事项

- `lazy` 默认为 true，切换到该 tab 时才渲染内容
- `sticky` 需配合 `offsetTop` 使用，offsetTop 为吸顶时距离顶部的偏移量
- `swipeable` 在 H5 和 App 端支持手势滑动
- `slidable` 为 always 时始终显示滚动导航
