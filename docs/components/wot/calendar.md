# Calendar 日历

## 组件概况

Calendar 日历组件用于日期、日期时间、周和月份的选择，由 `wd-calendar` 与 `wd-calendar-view` 组合实现。当前版本以 **13 位时间戳** 作为值模型，支持单选、多选、范围选择、快捷选项、日周月切换、清空和确认前校验。

## 核心功能描述

- **多种时间类型**：支持 `date / dates / datetime / week / month / daterange / datetimerange / weekrange / monthrange`
- **时间戳模型**：组件对外统一使用 13 位时间戳或时间戳数组
- **快捷操作**：支持快捷选项与快捷回调
- **类型切换**：支持在日 / 周 / 月面板间切换
- **确认前校验**：支持 `beforeConfirm`
- **清空与扩展区**：支持清空按钮、确认区左右插槽和实例方法

## 适用业务场景

- **预约 / 出行**：日期或日期范围选择
- **报表统计**：按周、按月、按时间范围筛选
- **表单录入**：与 `wd-form` 配合进行日期字段校验

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | Number / Number[] / null | - | 是 | 当前选中值，使用 13 位时间戳 |
| type | String | `'date'` | 否 | 选择类型，支持 `date / dates / datetime / week / month / daterange / datetimerange / weekrange / monthrange` |
| minDate | Number | 当前时间往前 12 个月当天开始 | 否 | 最小可选时间戳 |
| maxDate | Number | 当前时间往后 12 个月当天结束 | 否 | 最大可选时间戳 |
| firstDayOfWeek | Number | 0 | 否 | 周起始日 |
| formatter | Function | - | 否 | 日期项格式化函数 |
| maxRange | Number | - | 否 | 范围选择时的最大跨度 |
| rangePrompt | String | - | 否 | 超出最大范围时的提示文案 |
| allowSameDay | Boolean | false | 否 | 范围选择时是否允许同一天 |
| defaultTime | String / String[] | - | 否 | 选中日期的默认时分秒 |
| timeFilter | Function | - | 否 | 时间选择器过滤函数 |
| hideSecond | Boolean | false | 否 | 时间选择时是否隐藏秒 |
| label | String | - | 否 | 左侧标题 |
| labelWidth | String | `'33%'` | 否 | 左侧标题宽度 |
| disabled | Boolean | false | 否 | 是否禁用 |
| readonly | Boolean | false | 否 | 是否只读 |
| placeholder | String | - | 否 | 占位文案 |
| title | String | - | 否 | 弹层标题 |
| alignRight | Boolean | false | 否 | 值是否右对齐 |
| error | Boolean | false | 否 | 是否为错误状态 |
| required | Boolean | false | 否 | 是否必填 |
| size | String | - | 否 | 尺寸 |
| center | Boolean | false | 否 | 是否垂直居中 |
| closeOnClickModal | Boolean | true | 否 | 点击蒙层是否关闭 |
| zIndex | Number | 15 | 否 | 弹层层级 |
| showConfirm | Boolean | true | 否 | 是否显示确认按钮 |
| confirmText | String | - | 否 | 确认按钮文案 |
| displayFormat | Function | - | 否 | 自定义外部展示文案 |
| innerDisplayFormat | Function | - | 否 | 自定义范围选择面板内部回显文案 |
| ellipsis | Boolean | false | 否 | 文本是否超出省略 |
| showTypeSwitch | Boolean | false | 否 | 是否显示日 / 周 / 月切换 |
| shortcuts | Array | `[]` | 否 | 快捷选项数组，元素至少包含 `text` |
| onShortcutsClick | Function | - | 否 | 快捷选项点击回调，返回新的时间戳值或数组 |
| safeAreaInsetBottom | Boolean | true | 否 | 是否适配底部安全区 |
| beforeConfirm | Function | - | 否 | 确认前校验，接收 `{ value, resolve }` |
| prop | String | - | 否 | 表单字段名 |
| rules | Array | `[]` | 否 | 表单校验规则 |
| customViewClass | String | `''` | 否 | 自定义日历视图样式类 |
| customLabelClass | String | `''` | 否 | 自定义标题样式类 |
| customValueClass | String | `''` | 否 | 自定义值样式类 |
| immediateChange | Boolean | false | 否 | 是否在手指松开时立即触发内部滚轮变化 |
| withCell | Boolean | true | 否 | 是否使用内置 `wd-cell` 触发区 |
| rootPortal | Boolean | false | 否 | 是否脱离当前页面层级渲染 |
| markerSide | String | `'before'` | 否 | 必填标记位置，可选值：`before` / `after` |
| clearable | Boolean | false | 否 | 是否显示清空按钮 |
| customStyle | String | `''` | 否 | 自定义根节点样式 |
| customClass | String | `''` | 否 | 自定义根节点样式类 |

### Methods

| 方法名称 | 说明 | 参数 |
|---------|------|------|
| open | 打开日历弹层 | - |
| close | 关闭日历弹层 | - |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| open | 打开弹层时触发 | - | - |
| cancel | 关闭或取消时触发 | - | - |
| change | 内部值变化时触发 | `({ value })` | 返回当前时间戳值或数组 |
| confirm | 确认成功时触发 | `({ value, type })` | 返回选中值与当前类型 |
| clear | 点击清空按钮时触发 | - | - |
| update:modelValue | 确认或清空时触发 | `(value)` | 用于同步当前值 |

### Slots

| 插槽名称 | 说明 |
|---------|------|
| default | 自定义触发区内容 |
| label | 自定义标题内容 |
| confirm-left | 确认区左侧扩展内容 |
| confirm-right | 确认区右侧扩展内容 |

### CalendarView 组合能力

`wd-calendar-view` 是底层日历视图组件，当前对外暴露：

| 方法名称 | 说明 |
|---------|------|
| scrollIntoView | 滚动到当前日期或选中日期所在区域 |

## 使用示例

### 示例 1：基础用法

```vue
<template>
  <wd-calendar label="单个日期选择" v-model="value" @confirm="handleConfirm" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref<number | null>(Date.now())

function handleConfirm({ value }: { value: number | number[] | null }) {
  console.log(value)
}
</script>
```

### 示例 2：范围与类型切换

```vue
<template>
  <wd-calendar label="日期范围选择" type="daterange" v-model="rangeValue" />
  <wd-calendar label="日周月切换" show-type-switch v-model="switchValue" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const rangeValue = ref<number[]>([])
const switchValue = ref<number>(Date.now())
</script>
```

### 示例 3：快捷选项与确认前校验

```vue
<template>
  <wd-calendar
    label="快捷选项"
    type="daterange"
    v-model="value"
    :shortcuts="shortcuts"
    :on-shortcuts-click="onShortcutsClick"
    :before-confirm="beforeConfirm"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref<number[]>([])
const shortcuts = [{ text: '近 7 天', id: 7 }]

function onShortcutsClick({ item }: { item: { id: number } }) {
  const end = Date.now()
  const start = end - item.id * 24 * 60 * 60 * 1000
  return [start, end]
}

function beforeConfirm({
  value,
  resolve
}: {
  value: number | number[] | null
  resolve: (pass: boolean) => void
}) {
  resolve(!!value)
}
</script>
```

## 注意事项

- 当前源码使用 **时间戳模型**，不是 `Date` 对象；旧文档若仍写 `Date / Date[]`，应以源码当前行为为准。
- 范围类型名称为 `daterange / datetimerange / weekrange / monthrange`，不是旧版 `range`。
- `showTypeSwitch` 只用于在日 / 周 / 月三类面板之间切换，不会切换到多选或日期时间模式。
- `withCell=false` 时不会渲染内置触发区，通常需通过 `ref` 调用 `open()` 打开组件。
- `close` 方法会回滚未确认的临时选择值，确认成功后才会通过 `update:modelValue` 对外同步。
