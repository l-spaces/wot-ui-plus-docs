# DateStrip 日期条

## 组件概述

DateStrip 日期条组件用于横向展示日期列表，支持按周切换和平铺模式，可自定义选中样式、禁用日期、显示农历等功能。适用于日期选择、日程管理、签到打卡等场景。

## 核心功能描述

- **两种模式**：week（按周切换）和 none（平铺展示）
- **自定义样式**：支持选中背景色、文字色、圆角等
- **禁用日期**：通过 `disabledDate` 和 `disabledFun` 禁用特定日期
- **显示农历**：通过 `showLunar` 显示农历
- **日期格式化**：通过 `formatter` 自定义日期显示
- **补零显示**：通过 `padZero` 对小于10的日期补零

## 适用业务场景

- **日程管理**：选择日期查看日程安排
- **签到打卡**：按日期签到
- **预约选择**：选择可用日期预约

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | Number | 0 | 否 | 选中的值（时间戳） |
| defaultDate | String / Number | '' | 否 | 默认选中的日期 |
| mode | String | 'week' | 否 | 切换模式，可选值：none（平铺）/ week（按周切换） |
| minDate | Number | 0 | 否 | 可选择的最小日期 |
| maxDate | Number | 0 | 否 | 可选择的最大日期 |
| height | String | '55px' | 否 | 插件高度 |
| itemWidth | String | '50px' | 否 | 每格日期宽度 |
| itemRound | String | '6px' | 否 | 每格日期圆角 |
| activeBgColor | String | '#3c9cff' | 否 | 选中框背景色 |
| activeColor | String | '#ffffff' | 否 | 选中框文本色 |
| activeStyle | Object | {} | 否 | 选中框自定义样式 |
| bgColor | String | '' | 否 | 横条背景色 |
| round | String | '' | 否 | 选中框圆角 |
| firstDayOfWeek | Number | 0 | 否 | 第一天从星期几开始，0=周日 |
| activeMode | String | 'both' | 否 | 高亮模式，可选值：both / date / text |
| formatter | Function / null | null | 否 | 日期格式化函数 |
| monthNum | Number / String | 1 | 否 | 最多展示月份数量 |
| disabledFun | Function / null | null | 否 | 禁止选择的日期函数 |
| disabledDate | Array / String / null | null | 否 | 禁止选择的日期 |
| disabledColor | String | '#c8c9cc' | 否 | 禁用日期的文字颜色 |
| showLunar | Boolean | false | 否 | 是否显示农历 |
| padZero | Boolean | false | 否 | 是否对小于10的数字补0 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| update:value | 选中日期变化时触发 | (timestamp: number) | 当前选中的时间戳，建议配合 `v-model:value` 使用 |
| change | 日期选择变化时触发 | ({ weekday, date, timestamp, lunar? }) | 星期、日期、时间戳、农历信息 |

### Methods

| 方法名称 | 参数 | 返回值 | 说明 |
|---------|------|--------|------|
| setFormatter | (formatter: Function) | void | 设置日期格式化函数 |

## 使用示例

### 示例1：基础用法

默认按周切换模式，通过 `v-model:value` 绑定选中日期。

```vue
<template>
  <wd-date-strip v-model:value="value" @change="onChange" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import dayjs from 'dayjs'

const value = ref(dayjs().valueOf())

function onChange(item: any) {
  console.log('选中日期:', item.timestamp)
}
</script>
```

### 示例2：平铺模式与自定义样式

设置 `mode` 为 none 平铺展示，自定义选中颜色和圆角。

```vue
<template>
  <wd-date-strip v-model:value="value1" mode="none" :min-date="minDate" :max-date="maxDate" />
  <wd-date-strip v-model:value="value2" bg-color="#f5f5f5" active-bg-color="#ff6b35" active-color="#fff" round="10px" />
  <wd-date-strip v-model:value="value3" active-mode="date" height="80px" item-width="45px" item-round="100px" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import dayjs from 'dayjs'

const value1 = ref(dayjs().valueOf())
const value2 = ref(dayjs().valueOf())
const value3 = ref(dayjs().valueOf())
const minDate = ref(dayjs('2025-6-1').valueOf())
const maxDate = ref(dayjs('2025-10-1').valueOf())
</script>
```

### 示例3：禁用日期与显示农历

通过 `disabled-date` 禁用特定日期，`show-lunar` 显示农历。

```vue
<template>
  <wd-date-strip v-model:value="value" :show-lunar="true" height="70px" />
  <wd-date-strip v-model:value="value2" :disabled-date="disabledDates" :disabled-fun="disabledFun" mode="none" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import dayjs from 'dayjs'

const value = ref(dayjs().valueOf())
const value2 = ref(dayjs().valueOf())
const disabledDates = ref(['2025-08-09', '2025-08-10', '2025-08-15'])

const disabledFun = (day: { weekday: string }): [boolean, string] | boolean => {
  if (day.weekday === '二') {
    return [true, '星期二']
  }
  return false
}
</script>
```

## 注意事项

- 组件当前通过 `update:value` 对外同步值，推荐使用 `v-model:value` 绑定而不是默认 `v-model`
- `modelValue` 使用时间戳格式
- `mode` 为 none 时平铺展示所有日期，week 时按周切换
- `disabledFun` 返回 `[true, '原因']` 禁用并显示原因，返回 `false` 不禁用
- `showLunar` 显示农历信息
- 微信小程序不支持函数作为 props，需通过 ref 调用 `setFormatter` 方法设置格式化函数
