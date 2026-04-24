# CountTo 数字滚动

## 组件概况

CountTo 数字滚动组件用于数字的动态滚动效果，支持起始值、结束值、持续时间、小数位数、千分位分隔符、前缀后缀等配置。通过 requestAnimationFrame 实现平滑动画，适用于数据大屏、营销活动、统计面板等场景。

## 核心功能描述

- **数字滚动**：从起始值到结束值的平滑动画
- **缓动函数**：通过 `useEasing` 开启缓动效果
- **小数位数**：通过 `decimals` 设置小数位数
- **千分位分隔**：通过 `separator` 设置千分位分隔符
- **前缀后缀**：通过 `prefix` 和 `suffix` 设置前后缀
- **手动控制**：通过 `start`、`pause`、`reset` 方法手动控制滚动
- **主题类型**：支持 primary、error、warning、success 主题

## 适用业务场景

- **数据大屏**：展示关键指标的数字滚动效果
- **营销活动**：展示活动参与人数、销售额等动态数字
- **统计面板**：展示累计数据的增长动画

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| fontSize | Number | 16 | 否 | 字体大小 |
| color | String | '' | 否 | 文本颜色 |
| type | String | 'default' | 否 | 主题类型，可选值：default / primary / error / warning / success |
| startVal | Number | 0 | 否 | 起始值 |
| endVal | Number | 2024 | 否 | 最终值 |
| duration | Number | 3000 | 否 | 从起始值到结束值数字变动的时间（毫秒） |
| autoStart | Boolean | true | 否 | 是否自动开始 |
| decimals | Number | 0 | 否 | 保留的小数位数（>=0） |
| decimal | String | '.' | 否 | 小数点符号 |
| separator | String | ',' | 否 | 千分位分隔符 |
| prefix | String | '' | 否 | 前缀文本 |
| suffix | String | '' | 否 | 后缀文本 |
| useEasing | Boolean | true | 否 | 是否使用缓动函数 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| mounted | 组件挂载完成时触发 | - | - |
| finish | 数字滚动完成时触发 | - | - |

### Methods

| 方法名称 | 参数 | 返回值 | 说明 |
|---------|------|--------|------|
| start | - | void | 开始数字滚动 |
| pause | - | void | 暂停数字滚动 |
| reset | - | void | 重置数字滚动（若 autoStart 为 true，重设后会自动开始） |

### Slots

| 插槽名称 | 作用域参数 | 使用场景 |
|---------|-----------|---------|
| default | - | 默认文本区域，替换数字文本显示 |
| prefix | - | 前缀区域，替换默认前缀文本 |
| suffix | - | 后缀区域，替换默认后缀文本 |

## 使用示例

### 示例1：基础用法

设置 `end-val` 最终值，`prefix` 前缀，`suffix` 后缀，`decimals` 小数位数。

```vue
<template>
  <wd-count-to :end-val="2024" suffix="年" color="#16baaa" />
  <wd-count-to prefix="￥" :decimals="2" :end-val="186.32" :font-size="32" suffix="%" color="#1e9fff" />
  <wd-count-to prefix="￥" :decimals="2" :end-val="21286.32" :font-size="32" suffix="%" color="#ff5722" />
</template>
```

### 示例2：设置主题类型

通过 `type` 设置主题颜色。

```vue
<template>
  <wd-count-to type="primary" prefix="￥" :start-val="0" :end-val="888888" suffix="%" />
  <wd-count-to type="error" prefix="￥" :start-val="0" :end-val="888888" suffix="%" />
  <wd-count-to type="success" prefix="￥" :start-val="0" :end-val="888888" suffix="%" />
  <wd-count-to type="warning" prefix="￥" :start-val="0" :end-val="888888" suffix="%" />
</template>
```

### 示例3：手动控制

设置 `auto-start` 为 false，通过 ref 调用 `start`、`pause`、`reset` 方法手动控制。

```vue
<template>
  <wd-count-to
    ref="countTo"
    :auto-start="false"
    prefix="￥"
    :start-val="1000"
    :decimals="3"
    :end-val="9999.32"
    :font-size="32"
    suffix="%"
    color="#1e9fff"
  />
  <wd-grid clickable border>
    <wd-grid-item text="开始" icon="play-circle-stroke" @itemclick="start" />
    <wd-grid-item text="暂停" icon="pause-circle" @itemclick="pause" />
    <wd-grid-item text="重置" icon="refresh" @itemclick="reset" />
  </wd-grid>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { CountToInstance } from '@/uni_modules/wot-ui-plus/components/wd-count-to/types'

const countTo = ref<CountToInstance>()

function start() {
  countTo.value!.start()
}
function pause() {
  countTo.value!.pause()
}
function reset() {
  countTo.value!.reset()
}
</script>
```

## 注意事项

- `autoStart` 默认开启，组件挂载后自动开始滚动
- `decimals` 设置小数位数，默认为 0（整数）
- `useEasing` 默认开启缓动函数，使动画更自然
- `separator` 默认为逗号，设置千分位分隔符
- 滚动完成后触发 `finish` 事件
