# DatetimePickerView 日期时间选择器视图

## 组件概况

DatetimePickerView 日期时间选择器视图是 `wd-datetime-picker` 的平铺形态，直接在页面中渲染滚动选择列，不包含弹出层和确认栏。它适合嵌入式日期选择面板、自定义筛选区域和复杂表单场景，能够在页面布局内持续展示选择器内容。

## 核心功能描述

- **平铺展示**：直接嵌入页面内容区，不依赖弹层容器
- **多类型支持**：支持 `date`、`year-month`、`time`、`datetime`、`year`
- **范围限制**：支持日期、小时、分钟、秒级别的上下限配置
- **格式化能力**：支持 `formatter` 和 `columnFormatter` 对列内容进行定制
- **过滤能力**：支持 `filter` 对列值进行二次筛选
- **实例方法暴露**：提供列更新、值修正、原始列数据读取等方法

## 适用业务场景

- **嵌入式日期选择**：在自定义表单或卡片中直接展示日期选择器
- **预约与排期**：结合最小、最大时间限制控制用户可选区间
- **复杂业务筛选**：通过自定义列格式和过滤规则构建业务化日期选择器

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | String / Number | - | 是 | 选中值；`time` 类型为字符串，其余类型为时间戳 |
| loading | Boolean | false | 否 | 是否显示加载状态 |
| loadingColor | String | '#4D80F0' | 否 | 加载图标颜色 |
| columnsHeight | Number | 217 | 否 | 选择列总高度 |
| itemHeight | Number | 35 | 否 | 单项高度 |
| valueKey | String | 'value' | 否 | 选项值字段名 |
| labelKey | String | 'label' | 否 | 选项文案字段名 |
| type | String | 'datetime' | 否 | 选择器类型，可选值：date / year-month / time / datetime / year |
| filter | Function | - | 否 | 自定义过滤选项的函数 |
| formatter | Function | - | 否 | 自定义选项文案格式化函数 |
| columnFormatter | Function | - | 否 | 自定义整列数据格式化函数 |
| minDate | Number | 当前年份前 10 年的 1 月 1 日时间戳 | 否 | 最小日期 |
| maxDate | Number | 当前年份后 10 年的 12 月 31 日时间戳 | 否 | 最大日期 |
| minHour | Number | 0 | 否 | 最小小时，仅 `time` 类型生效 |
| maxHour | Number | 23 | 否 | 最大小时，仅 `time` 类型生效 |
| minMinute | Number | 0 | 否 | 最小分钟，仅 `time` 类型生效 |
| maxMinute | Number | 59 | 否 | 最大分钟，仅 `time` 类型生效 |
| useSecond | Boolean | false | 否 | 是否启用秒选择，仅 `time` 和 `datetime` 类型生效 |
| minSecond | Number | 0 | 否 | 最小秒数 |
| maxSecond | Number | 59 | 否 | 最大秒数 |
| immediateChange | Boolean | false | 否 | 是否在手指松开时立即触发 `change` 事件 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Methods

| 方法名称 | 参数 | 返回值 | 说明 |
|---------|------|--------|------|
| updateColumns | - | DatetimePickerViewOption[][] | 更新并返回当前列数据 |
| setColumns | (columnList) | void | 手动设置列数据 |
| getSelects | - | Record\<string, any\> / Record\<string, any\>[] / undefined | 获取当前选中项 |
| correctValue | (value) | string / number | 将传入值修正为合法值 |
| getOriginColumns | - | { type, values }[] | 获取原始列配置 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| change | 选项变化时触发 | ({ value }) | 当前选中值 |
| pickstart | 开始滚动时触发 | - | - |
| pickend | 滚动结束时触发 | - | - |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-datetime-picker-view v-model="value" type="date" @change="handleChange" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(Date.now())

function handleChange({ value }) {
  console.log(value)
}
</script>
```

### 示例2：时间选择

```vue
<template>
  <wd-datetime-picker-view v-model="value" type="time" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('12:00')
</script>
```

### 示例3：限制可选范围

通过 `min-date` 限制可选范围，适合预约、排期等场景。

```vue
<template>
  <wd-datetime-picker-view v-model="value" type="datetime" :min-date="minDate" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(Date.now())
const minDate = ref(new Date(2020, 0, 1).getTime())
</script>
```

## 注意事项

- 该组件是平铺视图，不包含弹出层、标题栏和确认取消按钮
- `modelValue` 在 `time` 类型下是字符串，其他类型均为时间戳
- `immediateChange` 的可用性受平台能力影响，跨端使用前建议实际验证
- 如果业务直接依赖实例方法，请确保通过组件实例获取暴露方法后再调用
