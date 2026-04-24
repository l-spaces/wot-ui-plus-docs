# DatetimePicker 日期时间选择器

## 组件概况

DatetimePicker 日期时间选择器用于选择日期和时间，支持 date、year-month、time、datetime、year 五种类型。提供日期范围限制、自定义格式化、过滤选项、确认前校验等功能。基于 Picker 组件封装，点击后弹出底部面板进行选择。

## 核心功能描述

- **五种类型**：date（日期）、year-month（年月）、time（时间）、datetime（日期时间）、year（年份）
- **日期范围**：通过 `minDate` 和 `maxDate` 限制可选日期范围
- **时间范围**：通过 `minHour`/`maxHour`/`minMinute`/`maxMinute` 限制可选时间范围
- **秒选择**：通过 `useSecond` 启用秒选择（仅 time 和 datetime 类型）
- **自定义格式化**：通过 `formatter` 自定义选项文案，通过 `displayFormat` 自定义展示文案
- **过滤选项**：通过 `filter` 过滤可选项
- **确认前校验**：通过 `beforeConfirm` 在确认前进行校验拦截
- **默认日期**：通过 `defaultValue` 设置面板打开时默认选中的日期

## 适用业务场景

- **日期选择**：选择出生日期、预约日期等
- **时间选择**：选择闹钟时间、营业时间等
- **日期时间**：选择日程的开始时间
- **年月选择**：选择账单月份、合同有效期等

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | String / Number / Array | - | 是 | 选中项的值，time 类型为字符串，其他为时间戳 |
| type | String | 'datetime' | 否 | 选择器类型，可选值：date / year-month / time / datetime / year |
| label | String | - | 否 | 选择器左侧文案 |
| placeholder | String | - | 否 | 选择器占位符 |
| disabled | Boolean | false | 否 | 是否禁用 |
| readonly | Boolean | false | 否 | 是否只读 |
| loading | Boolean | false | 否 | 加载中状态 |
| loadingColor | String | '#4D80F0' | 否 | 加载颜色 |
| title | String | - | 否 | 弹出层标题 |
| cancelButtonText | String | - | 否 | 取消按钮文案 |
| confirmButtonText | String | - | 否 | 确认按钮文案 |
| required | Boolean | false | 否 | 是否必填 |
| size | String | - | 否 | 尺寸，可选值：large |
| labelWidth | String | '33%' | 否 | 左侧标题宽度 |
| error | Boolean | false | 否 | 错误状态 |
| alignRight | Boolean | false | 否 | 值靠右展示 |
| closeOnClickModal | Boolean | true | 否 | 点击蒙层是否关闭 |
| safeAreaInsetBottom | Boolean | true | 否 | 底部安全距离 |
| ellipsis | Boolean | false | 否 | 文本溢出省略号 |
| columnsHeight | Number | 217 | 否 | 选项总高度 |
| valueKey | String | 'value' | 否 | 选项值键名 |
| labelKey | String | 'label' | 否 | 选项文本键名 |
| minDate | Number | 当前年份-10年1月1日 | 否 | 最小日期时间戳 |
| maxDate | Number | 当前年份+10年12月31日 | 否 | 最大日期时间戳 |
| minHour | Number | 0 | 否 | 最小小时，time 类型时生效 |
| maxHour | Number | 23 | 否 | 最大小时，time 类型时生效 |
| minMinute | Number | 0 | 否 | 最小分钟，time 类型时生效 |
| maxMinute | Number | 59 | 否 | 最大分钟，time 类型时生效 |
| useSecond | Boolean | false | 否 | 是否启用秒选择，仅 time 和 datetime 类型 |
| minSecond | Number | 0 | 否 | 最小秒数，仅 time 和 datetime 类型 |
| maxSecond | Number | 59 | 否 | 最大秒数，仅 time 和 datetime 类型 |
| filter | Function | - | 否 | 自定义过滤选项的函数 |
| formatter | Function | - | 否 | 自定义选项文案的格式化函数 |
| displayFormat | Function | - | 否 | 自定义展示文案的格式化函数 |
| beforeConfirm | Function | - | 否 | 确认前校验函数 |
| defaultValue | String / Number / Array | - | 否 | 默认日期 |
| zIndex | Number | 15 | 否 | 弹窗层级 |
| prop | String | - | 否 | 表单域 model 字段名 |
| rules | Array | [] | 否 | 表单验证规则 |
| immediateChange | Boolean | false | 否 | 手指松开时立即触发 change 事件 |
| rootPortal | Boolean | false | 否 | 是否从页面中脱离 |
| clearable | Boolean | false | 否 | 是否显示清空按钮 |
| markerSide | String | 'before' | 否 | 必填标记位置 |
| customCellClass | String | '' | 否 | 自定义 cell 样式类 |
| customViewClass | String | '' | 否 | 自定义 pickerView 样式类 |
| customLabelClass | String | '' | 否 | 自定义标签样式类 |
| customValueClass | String | '' | 否 | 自定义值样式类 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Methods

| 方法名称 | 参数 | 返回值 | 说明 |
|---------|------|--------|------|
| open | - | void | 打开选择器弹框 |
| close | - | void | 关闭选择器弹框 |
| setLoading | (loading: boolean) | void | 设置加载状态 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| confirm | 点击确认按钮时触发 | ({ value }) | value 为选中值（时间戳或时间字符串） |
| cancel | 点击取消按钮时触发 | - | - |
| change | 选项变化时触发 | ({ value }) | 滚动选择时触发 |

### Slots

| 插槽名称 | 作用域参数 | 使用场景 |
|---------|-----------|---------|
| default | - | 自定义触发元素 |
| label | - | 自定义标签内容 |

## 使用示例

### 示例1：日期选择

```vue
<template>
  <wd-datetime-picker v-model="value" type="date" label="选择日期" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(Date.now())
</script>
```

### 示例2：时间选择

```vue
<template>
  <wd-datetime-picker v-model="value" type="time" label="选择时间" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('12:00')
</script>
```

### 示例3：日期时间与范围限制

```vue
<template>
  <wd-datetime-picker v-model="value" type="datetime" label="选择日期时间" :min-date="minDate" :max-date="maxDate" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(Date.now())
const minDate = new Date(2020, 0, 1).getTime()
const maxDate = new Date(2030, 11, 31).getTime()
</script>
```

### 示例4：自定义格式化与过滤

```vue
<template>
  <wd-datetime-picker
    v-model="value"
    type="date"
    label="选择日期"
    :formatter="formatter"
    :filter="filter"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(Date.now())

function formatter(type, value) {
  if (type === 'year') return value + '年'
  if (type === 'month') return value + '月'
  if (type === 'date') return value + '日'
  return value
}

function filter(type, values) {
  if (type === 'date') {
    return values.filter(value => value % 2 === 0)
  }
  return values
}
</script>
```

## 注意事项

- `modelValue` 在 time 类型时为字符串格式（如 '12:00'），其他类型为时间戳
- `minDate` 和 `maxDate` 为时间戳格式
- `formatter` 函数接收 type（year/month/date/hour/minute/second）和 value 两个参数
- `filter` 函数接收 type 和 values 数组，返回过滤后的数组
- `beforeConfirm` 回调需调用 `resolve(true)` 允许确认或 `resolve(false)` 阻止确认
