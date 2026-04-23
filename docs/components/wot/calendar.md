# Calendar 日历

## 组件概述

Calendar 日历组件用于日期选择，支持单选、多选、范围选择三种模式。可自定义日期范围、标记日期、自定义文案等。常用于预约日期、行程选择、签到打卡等场景。

## 核心功能描述

- **三种选择模式**：`type` 支持 date（单选）、dates（多选）、range（范围选择）
- **日期范围限制**：`minDate` 和 `maxDate` 限制可选日期范围
- **自定义格式化**：`formatter` 可自定义日期单元格的样式和状态
- **周起始日**：`firstDayOfWeek` 设置每周从周几开始
- **确认按钮**：`showConfirm` 控制是否显示确认按钮
- **蒙层关闭**：`closeOnClickModal` 点击蒙层是否关闭弹窗

## 适用业务场景

- **预约日期**：酒店预订、医院挂号等选择日期
- **行程选择**：旅游出行选择出发和返回日期（范围模式）
- **签到打卡**：展示已签到日期（多选模式）

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | Date / Date[] / null | null | 否 | 选中日期 |
| type | String | 'date' | 否 | 选择类型，可选值：date / dates / range |
| minDate | Date | 当前日期 | 否 | 最小日期 |
| maxDate | Date | 当前日期+6个月 | 否 | 最大日期 |
| firstDayOfWeek | Number | 0 | 否 | 第一天从周几开始，0-6 |
| formatter | Function | - | 否 | 日期格式化函数 |
| title | String | - | 否 | 标题 |
| showConfirm | Boolean | true | 否 | 是否显示确认按钮 |
| confirmText | String | - | 否 | 确认按钮文案 |
| closeOnClickModal | Boolean | true | 否 | 点击蒙层是否关闭 |
| safeAreaInsetBottom | Boolean | true | 否 | 底部安全距离 |
| zIndex | Number | 15 | 否 | 层级 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| confirm | 点击确认时触发 | ({ value }) | 选中日期 |
| cancel | 点击取消时触发 | - | - |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-calendar v-model="date" label="选择日期" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const date = ref(null)
</script>
```

默认单选模式，点击输入框弹出日历面板选择日期。

### 示例2：多选与范围选择

```vue
<template>
  <wd-calendar v-model="dates" type="dates" label="多选日期" />
  <wd-calendar v-model="range" type="range" label="选择范围" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const dates = ref([])
const range = ref(null)
</script>
```

`dates` 模式可选择多个日期，`range` 模式选择起止日期范围。

### 示例3：自定义格式化

```vue
<template>
  <wd-calendar v-model="date" :formatter="formatter" :min-date="minDate" :max-date="maxDate" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const date = ref(null)
const minDate = new Date(2024, 0, 1)
const maxDate = new Date(2024, 11, 31)

function formatter(day) {
  if (day.date.getDay() === 0 || day.date.getDay() === 6) {
    day.type = 'weekend'
  }
  return day
}
</script>
```

`formatter` 自定义日期单元格样式，`minDate` 和 `maxDate` 限制可选范围。

## 注意事项

- `modelValue` 类型随 `type` 变化：date 为 Date，dates 为 Date[]，range 为 Date[]
- `firstDayOfWeek` 为 0 表示周日，1 表示周一，以此类推
- `formatter` 函数接收 day 对象，可修改 type、className 等属性
- 范围选择模式下，选择起始日期后需再选择结束日期
