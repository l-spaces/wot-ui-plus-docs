# Tabs 标签页

## 组件概况

Tabs 标签页组件用于内容分类切换，由 `wd-tabs` 和 `wd-tab` 两个组件配合使用。支持滚动导航、导航地图、粘性布局、手势滑动、切换动画和徽标展示，适用于频道切换、详情页多面板切换等场景。

## 核心功能描述

- **双向绑定切换**：通过 `v-model` 维护当前激活标签
- **滚动导航**：标签数量超过阈值后支持横向滚动
- **导航地图**：标签过多时可展开地图面板快速定位
- **手势滑动**：开启 `swipeable` 后支持左右手势切换
- **切换动画**：开启 `animated` 后为内容区域添加滑动动画
- **粘性布局**：开启 `sticky` 后标签栏可吸顶显示

## 适用业务场景

- **内容分类**：资讯、商品、频道等列表切换
- **详情页信息分组**：商品详情、用户主页等多面板展示
- **多步骤内容承载**：不同阶段信息分块展示

## API

### Tabs Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | Number / String | 0 | 否 | 当前激活标签的 `name` 或索引，支持 `v-model` |
| slidableNum | Number | 6 | 否 | 标签数量超过该值时启用滚动导航 |
| mapNum | Number | 10 | 否 | 标签数量超过该值时显示导航地图入口，设为 `0` 可关闭 |
| mapTitle | String | - | 否 | 导航地图标题 |
| sticky | Boolean | false | 否 | 是否启用吸顶布局 |
| offsetTop | Number | 0 | 否 | 吸顶时距离顶部的偏移量 |
| swipeable | Boolean | false | 否 | 是否支持手势滑动切换 |
| autoLineWidth | Boolean | false | 否 | 未设置 `lineWidth` 时，是否根据文字宽度自动调整底部条宽度 |
| lineWidth | Number / String | - | 否 | 底部条宽度 |
| lineHeight | Number / String | - | 否 | 底部条高度 |
| color | String | `''` | 否 | 激活状态颜色 |
| inactiveColor | String | `''` | 否 | 非激活状态颜色 |
| animated | Boolean | false | 否 | 是否开启内容切换动画 |
| duration | Number | 300 | 否 | 切换动画时长，单位 `ms` |
| slidable | String | `'auto'` | 否 | 是否开启滚动导航，可选值：`auto` / `always` |
| showScrollbar | Boolean | false | 否 | 滚动导航时是否显示滚动条 |
| customStyle | String | `''` | 否 | 自定义根节点样式 |
| customClass | String | `''` | 否 | 自定义根节点样式类 |

### Tab Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| name | Number / String | - | 否 | 当前标签唯一标识，不传时默认按索引匹配 |
| title | String | - | 否 | 标签标题 |
| disabled | Boolean | false | 否 | 是否禁用当前标签 |
| lazy | Boolean | true | 否 | 是否懒加载标签内容 |
| badgeProps | Object | - | 否 | 徽标属性，透传给 `wd-badge` |
| customStyle | String | `''` | 否 | 自定义根节点样式 |
| customClass | String | `''` | 否 | 自定义根节点样式类 |

### Tabs Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| change | 激活标签变化时触发 | `({ index, name })` | 返回当前激活标签索引和名称 |
| click | 点击可切换标签时触发 | `({ index, name })` | 返回被点击标签索引和名称 |
| disabled | 点击禁用标签时触发 | `({ index, name })` | 返回被点击的禁用标签索引和名称 |
| update:modelValue | 激活标签变化时触发 | `(name: number \| string)` | 用于同步当前激活值 |

### Tabs Methods

| 方法名称 | 说明 | 参数 |
|---------|------|------|
| setActive | 设置当前激活项 | `(value: number \| string, init: boolean, setScroll: boolean)` |
| scrollIntoView | 让当前激活标签滚动到可视区域 | - |
| updateLineStyle | 更新底部条样式 | `(animation?: boolean)` |

### Tabs Slots

| 插槽名称 | 说明 |
|---------|------|
| default | `wd-tabs` 默认插槽，用于放置多个 `wd-tab` |

### Tab Slots

| 插槽名称 | 说明 |
|---------|------|
| default | 当前标签页内容 |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-tabs v-model="active" @change="handleChange">
    <wd-tab title="标签一" :name="0">内容一</wd-tab>
    <wd-tab title="标签二" :name="1">内容二</wd-tab>
    <wd-tab title="标签三" :name="2">内容三</wd-tab>
  </wd-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(0)

function handleChange({ index, name }: { index: number; name: number | string }) {
  console.log(index, name)
}
</script>
```

### 示例2：粘性布局与手势滑动

```vue
<template>
  <wd-tabs v-model="active" sticky swipeable offset-top="44">
    <wd-tab title="标签一">内容一</wd-tab>
    <wd-tab title="标签二">内容二</wd-tab>
    <wd-tab title="标签三">内容三</wd-tab>
  </wd-tabs>
</template>
```

### 示例3：滚动导航与禁用事件

```vue
<template>
  <wd-tabs
    v-model="active"
    slidable="always"
    :map-num="8"
    animated
    @click="handleClick"
    @disabled="handleDisabled"
  >
    <wd-tab title="标签一" :name="'a'">内容一</wd-tab>
    <wd-tab title="标签二" :name="'b'" disabled>内容二</wd-tab>
    <wd-tab title="标签三" :name="'c'">内容三</wd-tab>
  </wd-tabs>
</template>

<script lang="ts" setup>
function handleClick(payload: { index: number; name: number | string }) {
  console.log('click', payload)
}

function handleDisabled(payload: { index: number; name: number | string }) {
  console.log('disabled', payload)
}
</script>
```

## 注意事项

- `wd-tabs` 会通过 `name` 匹配激活项；如果 `wd-tab` 未设置 `name`，则退回到子项索引。
- `change`、`click`、`disabled` 回调都会返回 `{ index, name }`，不要只按单个字段读取。
- `modelValue` 为字符串时必须与某个 `wd-tab` 的 `name` 精确匹配，否则会回退到第一个标签。
- `mapNum` 设为 `0` 时不会显示导航地图入口。
- `sticky` 模式内部依赖 `wd-sticky` 和 `wd-sticky-box` 实现，页面滚动容器较复杂时建议实际联调吸顶效果。
