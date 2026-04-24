# CalendarView 日历视图

## 组件概况

CalendarView 日历视图组件用于日历面板的嵌入展示，支持日期选择、日期范围选择、多日期选择、周选择、月选择、日期时间选择等多种模式。与 Calendar 弹出式组件不同，CalendarView 直接在页面中渲染日历面板，适用于需要常驻展示日历的场景。

## 核心功能描述

- **多种类型**：支持 date、dates、datetime、week、month、daterange、datetimerange、weekrange、monthrange 九种类型
- **范围选择**：支持日期范围、周范围、月范围选择
- **自定义格式化**：通过 `formatter` 自定义日期单元格内容
- **时间选择**：datetime 类型支持时分秒选择
- **农历显示**：通过 `showLunar` 显示农历
- **周起始日**：通过 `firstDayOfWeek` 设置周起始天
- **范围限制**：通过 `maxRange` 限制最大选择范围

## 适用业务场景

- **日程管理**：在页面中常驻展示日历，选择日期查看日程
- **酒店预订**：选择入住和离店日期范围
- **考勤打卡**：选择日期查看考勤记录

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | Number / Number[] / null | - | 是 | 选中值，13位时间戳 |
| type | String | 'date' | 否 | 日期类型，可选值：date / dates / datetime / week / month / daterange / datetimerange / weekrange / monthrange |
| minDate | Number | 当前日期往前12个月 | 否 | 最小可选日期（13位时间戳） |
| maxDate | Number | 当前日期往后12个月 | 否 | 最大可选日期（13位时间戳） |
| firstDayOfWeek | Number | 1 | 否 | 周起始天，0=周日，1-6=周一至周六 |
| formatter | CalendarFormatter | - | 否 | 日期格式化函数 |
| maxRange | Number | - | 否 | 最大日期范围（范围选择时有效） |
| rangePrompt | String | - | 否 | 范围超出提示文案 |
| allowSameDay | Boolean | false | 否 | 是否允许选择同一天 |
| showPanelTitle | Boolean | true | 否 | 是否展示面板标题 |
| defaultTime | String / String[] | '00:00:00' | 否 | 选中日期的具体时刻 |
| panelHeight | Number | 378 | 否 | 可滚动面板高度 |
| timeFilter | CalendarTimeFilter | - | 否 | 时间选择器过滤器 |
| hideSecond | Boolean | false | 否 | 是否隐藏秒选择 |
| immediateChange | Boolean | false | 否 | 是否立即触发 change 事件 |
| showLunar | Boolean | true | 否 | 是否显示农历 |
| showMark | Boolean | true | 否 | 是否显示月份背景标记 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| change | 选中值变化时触发 | ({ value }) | 当前选中值，13位时间戳 |
| pickstart | 开始选择日期时触发 | - | - |
| pickend | 结束选择日期时触发 | - | - |

### Methods

| 方法名称 | 参数 | 返回值 | 说明 |
|---------|------|--------|------|
| scrollIntoView | - | void | 使当前日期或选中日期滚动到可视区域 |

## 使用示例

### 示例1：基础日期选择

通过 `type` 属性切换日期、周、月选择模式。

```vue
<template>
  <wd-radio-group v-model="type" shape="button">
    <wd-radio value="date">date</wd-radio>
    <wd-radio value="week">week</wd-radio>
    <wd-radio value="month">month</wd-radio>
  </wd-radio-group>
  <wd-calendar-view :type="type" v-model="value" @change="handleChange" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const type = ref('date')
const value = ref(Date.now())

function handleChange({ value }: any) {
  console.log('选中日期:', value)
}
</script>
```

### 示例2：日期范围选择

使用 `daterange`、`weekrange`、`monthrange` 类型进行范围选择，`allow-same-day` 允许选择同一天。

```vue
<template>
  <wd-radio-group v-model="type" shape="button">
    <wd-radio value="daterange">daterange</wd-radio>
    <wd-radio value="weekrange">weekrange</wd-radio>
    <wd-radio value="monthrange">monthrange</wd-radio>
  </wd-radio-group>
  <wd-calendar-view :type="type" allow-same-day v-model="value" @change="handleChange" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const type = ref('daterange')
const value = ref([Date.now() - 24 * 60 * 60 * 1000 * 33, Date.now()])

function handleChange({ value }: any) {
  console.log('选中范围:', value)
}
</script>
```

### 示例3：自定义日期与限制范围

通过 `formatter` 自定义日期单元格，`max-range` 限制最大选择范围。

```vue
<template>
  <wd-calendar-view type="daterange" :max-range="3" v-model="value1" />
  <wd-calendar-view type="daterange" allow-same-day v-model="value2" :formatter="formatter" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { CalendarFormatter } from '@/uni_modules/wot-ui-plus/components/wd-calendar-view/types'

const value1 = ref([Date.now() - 24 * 60 * 60 * 1000 * 3, Date.now()])
const value2 = ref([Date.now() - 24 * 60 * 60 * 1000 * 3, Date.now()])

const formatter: CalendarFormatter = (day) => {
  const date = new Date(day.date)
  const now = new Date()
  if (date.getMonth() === now.getMonth() && date.getDate() === now.getDate()) {
    day.topInfo = '今天'
  }
  if (day.type === 'start') {
    day.bottomInfo = '开始'
  }
  if (day.type === 'end') {
    day.bottomInfo = '结束'
  }
  return day
}
</script>
```

## 注意事项

- `modelValue` 使用13位时间戳格式
- `type` 为 range 类型时，`modelValue` 为数组 `[startTimestamp, endTimestamp]`
- `formatter` 函数接收 day 对象，可设置 `topInfo`、`bottomInfo`、`className` 等属性
- `maxRange` 仅在范围选择模式下有效
- `firstDayOfWeek` 设置为 0 表示周日为第一天，1-6 表示周一至周六
