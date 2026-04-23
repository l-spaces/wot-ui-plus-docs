# Slider 滑块

## 组件概述

Slider 滑块组件用于在给定范围内选择值，支持单滑块和双滑块模式、自定义步长、自定义颜色、标签显示等功能。常用于价格区间筛选、音量调节、参数配置等场景，通过拖拽滑块直观地选择数值。

## 核心功能描述

- **单/双滑块**：`modelValue` 为数字时为单滑块模式，为数组时为双滑块模式
- **范围与步长**：`min` 和 `max` 设置取值范围，`step` 设置步进值
- **标签显示**：默认显示当前值标签，`hideLabel` 隐藏标签，`hideMinMax` 隐藏最小最大值
- **自定义颜色**：`activeColor` 设置激活进度条颜色，`inactiveColor` 设置未激活轨道颜色
- **禁用状态**：`disabled` 禁用后滑块隐藏，不可操作
- **拖拽事件**：`dragstart`、`dragmove`、`dragend` 三个事件覆盖完整拖拽生命周期
- **方法暴露**：`initSlider` 方法可手动重新初始化滑块宽度

## 适用业务场景

- **价格区间筛选**：电商商品列表中双滑块选择价格范围
- **音量/亮度调节**：系统设置中单滑块调节音量或亮度值
- **参数配置面板**：表单中通过滑块设置数值型参数

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | Number / Array | 0 | 否 | 当前值，双滑块时为数组 |
| min | Number | 0 | 否 | 最小值 |
| max | Number | 100 | 否 | 最大值 |
| step | Number | 1 | 否 | 步长 |
| disabled | Boolean | false | 否 | 是否禁用 |
| activeColor | String | '' | 否 | 激活颜色 |
| inactiveColor | String | '#e5e5e5' | 否 | 非激活颜色 |
| hideLabel | Boolean | false | 否 | 是否隐藏标签 |
| hideMinMax | Boolean | false | 否 | 是否隐藏最小最大值 |
| customMinClass | String | '' | 否 | 自定义最小值样式类名 |
| customMaxClass | String | '' | 否 | 自定义最大值样式类名 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| dragstart | 开始拖拽时触发 | ({ value }) | 当前滑块值 |
| dragmove | 拖拽过程中触发 | ({ value }) | 当前滑块值 |
| dragend | 结束拖拽时触发 | ({ value }) | 当前滑块值 |

### Methods

| 方法名称 | 参数 | 返回值 | 说明 |
|---------|------|--------|------|
| initSlider | - | void | 重新初始化滑块宽度，在容器尺寸变化后调用 |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-slider v-model="value" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(50)
</script>
```

默认范围 0-100，步长为1的单滑块。

### 示例2：自定义范围与步长

```vue
<template>
  <wd-slider v-model="value" :min="0" :max="1000" :step="100" active-color="#07c160" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(300)
</script>
```

设置取值范围 0-1000，步长为100，自定义激活颜色。

### 示例3：双滑块与禁用状态

```vue
<template>
  <wd-slider v-model="range" :min="0" :max="500" :step="10" />
  <wd-slider v-model="value" disabled hide-min-max />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const range = ref([100, 300])
const value = ref(50)
</script>
```

`modelValue` 传入数组即启用双滑块模式，两个滑块分别控制范围的最小值和最大值；`disabled` 禁用后滑块不可操作。

## 注意事项

- `step` 必须大于 0，否则会自动修正为 1 并在控制台警告
- 双滑块模式下 `modelValue` 必须为包含至少2个元素的数组，否则会自动修正为 [min, max]
- 双滑块模式下两个值会自动排序，确保左小右大
- 步长对齐使用 `toFixed(10)` 处理浮点精度，避免 0.1 + 0.2 ≠ 0.3 的问题
- 组件挂载时自动调用 `initSlider` 获取轨道宽度，若容器尺寸动态变化需手动调用
- 钉钉小程序有额外的 DOM 包裹处理
