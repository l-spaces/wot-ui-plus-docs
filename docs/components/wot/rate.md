# Rate 评分

## 组件概述

Rate 评分组件用于评分场景，支持半选、自定义图标、自定义颜色、只读模式、可清除等功能。常用于商品评价、服务满意度调查等交互场景，通过直观的星级评分让用户快速表达评价。

## 核心功能描述

- **评分交互**：通过点击图标设置评分值，支持 `v-model` 双向绑定
- **半选模式**：`allowHalf` 开启后支持半星评分，点击左半部分为半星，右半部分为整星
- **自定义图标**：`icon` 和 `activeIcon` 分别设置未选中和选中状态的图标名称
- **颜色分段**：`activeColor` 支持字符串或数组，数组时根据评分值分段显示不同颜色（低于60%显示第一色，高于60%显示第二色）
- **只读与禁用**：`readonly` 仅展示不可操作，`disabled` 展示灰色且不可操作
- **可清除**：`clearable` 开启后，再次点击相同最小值时可将评分重置为 0
- **触摸滑动**：支持触摸滑动评分，在移动端体验更佳

## 适用业务场景

- **商品评价打分**：电商订单完成后对商品进行星级评分
- **服务满意度调查**：对客服、配送等服务进行满意度评价
- **内容质量评分**：对文章、视频等内容进行质量评分

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | String / Number / null | null | 否 | 当前分数，支持 v-model |
| num | Number | 5 | 否 | 评分最大值 |
| readonly | Boolean | false | 否 | 是否只读 |
| size | String | '16px' | 否 | 图标大小 |
| space | String | '4px' | 否 | 图标间距 |
| color | String | '#E8E8E8' | 否 | 未选中颜色 |
| activeColor | String / Array | 渐变色 | 否 | 选中颜色，支持数组分段颜色 |
| icon | String | 'star-filled' | 否 | 未选中图标 |
| activeIcon | String | 'star-filled' | 否 | 选中图标 |
| disabled | Boolean | false | 否 | 是否禁用 |
| disabledColor | String | 渐变灰色 | 否 | 禁用颜色 |
| allowHalf | Boolean | false | 否 | 是否允许半选 |
| clearable | Boolean | false | 否 | 是否可清除 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| change | 分数变化时触发 | ({ value }) | 当前分数 |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-rate v-model="value" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(3)
</script>
```

默认5星评分，点击即可设置评分值。

### 示例2：半选与自定义样式

```vue
<template>
  <wd-rate v-model="value" allow-half size="20px" space="6px" active-color="#ee0a24" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(3.5)
</script>
```

开启半选模式后支持 0.5 的评分粒度，自定义图标大小、间距和选中颜色。

### 示例3：分段颜色与状态控制

```vue
<template>
  <wd-rate v-model="value" :active-color="colors" :num="5" clearable />
  <wd-rate v-model="readonlyValue" readonly size="14px" />
  <wd-rate v-model="disabledValue" disabled size="14px" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(1)
const readonlyValue = ref(4)
const disabledValue = ref(2)
const colors = ['#ee0a24', '#07c160']
</script>
```

`activeColor` 传入数组时，评分低于60%显示第一色（红色），高于60%显示第二色（绿色）；`clearable` 允许点击相同值清空评分；`readonly` 和 `disabled` 分别展示只读和禁用状态。

## 注意事项

- `modelValue` 必须为 Number 类型，传入字符串会在控制台报错
- `activeColor` 传入数组时不能为空数组，否则控制台报错
- `clearable` 仅在点击值等于当前最小值（半选为 0.5，整选为 1）时才触发清除
- `allowHalf` 开启时，点击图标左半部分为半星，右半部分为整星
- 触摸滑动评分在 `readonly` 或 `disabled` 状态下不生效
- 默认选中颜色为渐变色（黄色），未选中为灰色，禁用为渐变灰色
