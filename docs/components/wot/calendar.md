# 日历组件（wd-calendar）

## 组件概述

wd-calendar 是一个基于 Vue 3 + TypeScript + UniApp 开发的日历组件，用于日期和时间的选择。它支持多种选择模式，包括单个日期、日期范围、时间选择等，提供了丰富的配置选项和灵活的定制能力。

### 功能描述
- 支持多种选择类型：date、dates、datetime、week、month、daterange、datetimerange、weekrange、monthrange
- 支持自定义日期范围限制
- 支持快捷选项配置
- 支持自定义格式化函数
- 支持范围选择时的最大日期范围限制
- 支持日期类型切换
- 支持清空功能
- 支持表单验证
- 支持多种样式定制

### 适用业务场景
- 表单中的日期输入字段
- 日期范围选择，如预订日期、活动时间等
- 时间选择，如会议时间、预约时间等
- 周/月选择，如报表统计周期、账单周期等
- 多日期选择，如日程安排、假期选择等

### 组件设计理念
wd-calendar 组件采用了模块化设计，将日历视图和选择逻辑分离，便于维护和扩展。组件使用了 Vue 3 的 Composition API 和 TypeScript，确保了类型安全和代码可维护性。组件设计考虑了跨平台兼容性和性能优化，提供了丰富的配置选项，允许开发者根据实际需求进行定制。

组件的核心实现基于 dayjs 库进行日期处理，确保了日期计算的准确性和一致性。组件支持多种交互方式，包括点击、滑动等，提供了良好的用户体验。

## 完整 API 参考

### Props

| 名称 | 类型 | 默认值 | 必填项 | 描述 |
| --- | --- | --- | --- | --- |
| modelValue | number / array / null | - | 是 | 选中值，为 13 位时间戳或时间戳数组 |
| type | string | 'date' | 否 | 日期类型，可选值：date / dates / datetime / week / month / daterange / datetimerange / weekrange / monthrange |
| minDate | number | 当前日期前12个月 | 否 | 最小日期，为 13 位时间戳 |
| maxDate | number | 当前日期后12个月 | 否 | 最大日期，为 13 位时间戳 |
| firstDayOfWeek | number | 0 | 否 | 周起始天，0 表示周日，1 表示周一 |
| formatter | function | - | 否 | 日期格式化函数 |
| maxRange | number | - | 否 | type 为范围选择时有效，最大日期范围 |
| rangePrompt | string | - | 否 | type 为范围选择时有效，选择超出最大日期范围时的错误提示文案 |
| allowSameDay | boolean | false | 否 | type 为范围选择时有效，是否允许选择同一天 |
| defaultTime | string / array | - | 否 | 选中日期所使用的当日内具体时刻 |
| timeFilter | function | - | 否 | type 为 'datetime' 或 'datetimerange' 时有效，用于过滤时间选择器的数据 |
| hideSecond | boolean | false | 否 | type 为 'datetime' 或 'datetimerange' 时有效，是否不展示秒修改 |
| label | string | - | 否 | 选择器左侧文案 |
| labelWidth | string | '33%' | 否 | 设置左侧标题宽度 |
| disabled | boolean | false | 否 | 禁用 |
| readonly | boolean | false | 否 | 只读 |
| placeholder | string | - | 否 | 选择器占位符 |
| title | string | - | 否 | 弹出层标题 |
| alignRight | boolean | false | 否 | 选择器的值靠右展示 |
| error | boolean | false | 否 | 是否为错误状态，错误状态时右侧内容为红色 |
| required | boolean | false | 否 | 是否必填 |
| size | string | - | 否 | 设置选择器大小，可选值：large |
| center | boolean | false | 否 | 是否垂直居中 |
| closeOnClickModal | boolean | true | 否 | 点击遮罩是否关闭 |
| zIndex | number | 15 | 否 | 弹框层级 |
| showConfirm | boolean | true | 否 | 是否显示确定按钮 |
| confirmText | string | - | 否 | 确定按钮文字 |
| displayFormat | function | - | 否 | 自定义展示文案的格式化函数，返回一个字符串 |
| innerDisplayFormat | function | - | 否 | 自定义范围选择类型的面板内部回显，返回一个字符串 |
| ellipsis | boolean | false | 否 | 是否超出隐藏 |
| showTypeSwitch | boolean | false | 否 | 是否显示类型切换功能 |
| shortcuts | array | [] | 否 | 快捷选项，为对象数组，其中对象的 text 必传 |
| onShortcutsClick | function | - | 否 | 快捷操作点击回调 |
| safeAreaInsetBottom | boolean | true | 否 | 弹出面板是否设置底部安全距离（iphone X 类型的机型） |
| beforeConfirm | function | - | 否 | 确定前校验函数，接收 { value, resolve } 参数，通过 resolve 继续执行，resolve 接收 1 个 boolean 参数 |
| prop | string | - | 否 | 表单域 model 字段名，在使用表单校验功能的情况下，该属性是必填的 |
| rules | array | [] | 否 | 表单验证规则，结合wd-form组件使用 |
| customViewClass | string | '' | 否 | 自定义视图类名 |
| customLabelClass | string | '' | 否 | label 外部自定义样式 |
| customValueClass | string | '' | 否 | value 外部自定义样式 |
| immediateChange | boolean | false | 否 | 是否在手指松开时立即触发picker-view的 change 事件。若不开启则会在滚动动画结束后触发 change 事件，1.2.25版本起提供，仅微信小程序和支付宝小程序支持 |
| withCell | boolean | true | 否 | 是否使用内置单元格，默认为 true，使用内置单元格 |
| rootPortal | boolean | false | 否 | 是否从页面中脱离出来，用于解决各种 fixed 失效问题 (H5: teleport, APP: renderjs, 小程序: root-portal) |
| markerSide | string | 'before' | 否 | 必填标记位置，可选值：before、after |
| clearable | boolean | false | 否 | 显示清空按钮 |
| customStyle | object | - | 否 | 自定义样式，用于覆盖组件默认样式 |
| customClass | string | - | 否 | 自定义类名，用于扩展组件样式 |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| update:modelValue | 选中值变化时 | value: number / number[] / null - 选中的日期值 |
| change | 选择器值变化时 | { value: number / number[] / null } - 包含选中值的对象 |
| confirm | 点击确定按钮时 | { value: number / number[] / null, type: string } - 包含选中值和类型的对象 |
| cancel | 点击取消按钮或遮罩层时 | - |
| open | 打开选择器时 | - |
| clear | 点击清空按钮时 | - |

### Methods

| 方法名 | 参数 | 返回值 | 功能说明 |
| --- | --- | --- | --- |
| open | - | void | 打开选择器 |
| close | - | void | 关闭选择器 |

### Slots

| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| default | - | 自定义选择器内容，仅在 withCell 为 true 时生效 |
| label | - | 自定义标签内容，仅在 withCell 为 true 时生效 |

## 多场景使用示例代码

### 基础用法

```vue
<template>
  <wd-calendar v-model="date" type="date" label="选择日期" placeholder="请选择日期" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const date = ref<number>(Date.now())
</script>
```

### 日期范围选择

```vue
<template>
  <wd-calendar
    v-model="dateRange"
    type="daterange"
    label="选择日期范围"
    placeholder="请选择日期范围"
    :max-range="7"
    range-prompt="日期范围不能超过7天"
    allow-same-day
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import dayjs from 'dayjs'

const dateRange = ref<number[]>([
  dayjs().startOf('day').valueOf(),
  dayjs().endOf('day').valueOf()
])
</script>
```

### 时间选择

```vue
<template>
  <wd-calendar
    v-model="datetime"
    type="datetime"
    label="选择时间"
    placeholder="请选择时间"
    hide-second
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const datetime = ref<number>(Date.now())
</script>
```

### 快捷选项

```vue
<template>
  <wd-calendar
    v-model="date"
    type="daterange"
    label="选择日期范围"
    placeholder="请选择日期范围"
    :shortcuts="shortcuts"
    :on-shortcuts-click="onShortcutsClick"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import dayjs from 'dayjs'

const date = ref<number[]>([])

const shortcuts = [
  { text: '今天' },
  { text: '昨天' },
  { text: '最近7天' },
  { text: '最近30天' }
]

const onShortcutsClick = ({ item, index }: { item: any; index: number }) => {
  const now = dayjs()
  switch (index) {
    case 0: // 今天
      return [now.startOf('day').valueOf(), now.endOf('day').valueOf()]
    case 1: // 昨天
      return [now.subtract(1, 'day').startOf('day').valueOf(), now.subtract(1, 'day').endOf('day').valueOf()]
    case 2: // 最近7天
      return [now.subtract(6, 'day').startOf('day').valueOf(), now.endOf('day').valueOf()]
    case 3: // 最近30天
      return [now.subtract(29, 'day').startOf('day').valueOf(), now.endOf('day').valueOf()]
    default:
      return []
  }
}
</script>
```

### 自定义格式化

```vue
<template>
  <wd-calendar
    v-model="date"
    type="date"
    label="选择日期"
    placeholder="请选择日期"
    :display-format="customDisplayFormat"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import dayjs from 'dayjs'

const date = ref<number>(Date.now())

const customDisplayFormat = (value: number | number[], type: string) => {
  if (type === 'date') {
    return dayjs(value as number).format('YYYY年MM月DD日')
  }
  return ''
}
</script>
```

## 样式定制指南

### customStyle 和 customClass

wd-calendar 组件支持通过 `customStyle` 和 `customClass` 进行样式定制。

```vue
<template>
  <wd-calendar
    v-model="date"
    type="date"
    label="选择日期"
    :custom-style="{ backgroundColor: '#f5f5f5', padding: '10rpx' }"
    custom-class="custom-calendar"
  />
</template>

<style scoped>
.custom-calendar {
  /* 自定义类名样式 */
  border-radius: 10rpx;
  margin-bottom: 20rpx;
}

/* 可以通过深度选择器修改组件内部样式 */
:deep(.wd-calendar__title) {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
}
</style>
```

### 自定义弹出层样式

可以通过修改 CSS 变量来定制弹出层的样式：

```vue
<template>
  <wd-calendar v-model="date" type="date" label="选择日期" />
</template>

<style>
/* 定制弹出层背景色 */
:root {
  --wd-calendar-bg-color: #f5f5f5;
  --wd-calendar-header-bg-color: #fff;
  --wd-calendar-title-color: #333;
  --wd-calendar-confirm-bg-color: #fff;
}
</style>
```

## 注意事项

1. **日期格式**：
   - 组件的 `modelValue` 属性接受 13 位时间戳或时间戳数组
   - 建议使用 dayjs 等日期库来处理日期，确保跨平台兼容性

2. **选择类型**：
   - 支持多种选择类型，包括单个日期、日期范围、时间选择等
   - 不同类型的选择会影响组件的显示和交互方式

3. **性能优化**：
   - 对于大量日期数据，建议合理设置 `minDate` 和 `maxDate`，减少渲染的数据量
   - 避免在 `formatter` 函数中执行复杂的计算或异步操作
   - 对于频繁变化的日期范围，建议使用 `computed` 属性来优化性能

4. **跨平台兼容性**：
   - 组件支持 H5、小程序和 App 平台
   - 部分功能（如 `root-portal`、`immediateChange`）可能在不同平台上表现不同，需要测试验证
   - 在小程序平台上，建议使用 `withCell` 属性来优化性能

5. **表单验证**：
   - 可以结合 `wd-form` 组件使用，通过 `prop` 和 `rules` 属性进行表单验证
   - 支持必填验证、自定义验证规则等

6. **快捷选项**：
   - 可以通过 `shortcuts` 属性配置快捷选项
   - 通过 `onShortcutsClick` 回调函数处理快捷选项的点击事件
   - 回调函数需要返回对应的日期值

7. **清空功能**：
   - 设置 `clearable` 属性为 `true` 可以显示清空按钮
   - 点击清空按钮会触发 `clear` 事件，并将 `modelValue` 设为 `null`

8. **样式定制**：
   - 可以通过 `customStyle` 和 `customClass` 属性进行样式定制
   - 可以通过修改 CSS 变量来定制弹出层的样式
   - 建议使用深度选择器 `:deep()` 来修改组件内部样式

## 组件架构与实现

wd-calendar 组件采用了 Vue 3 的 Composition API 和 TypeScript，主要包含以下部分：

1. **组件主体**：`wd-calendar.vue`，负责日历的整体布局和交互逻辑
2. **类型定义**：`types.ts`，包含组件的属性、事件和接口定义
3. **样式文件**：`index.scss`，包含组件的样式定义
4. **依赖组件**：
   - `wd-calendar-view`：日历视图组件，负责日期的渲染和选择
   - `wd-action-sheet`：弹出层组件，用于显示日历视图
   - `wd-cell`：单元格组件，用于显示选择器的标签和值
   - `wd-icon`：图标组件，用于显示箭头、关闭等图标
   - `wd-button`：按钮组件，用于确定和取消按钮
   - `wd-tabs`：标签页组件，用于切换日期类型

组件的核心实现原理：

1. **数据绑定**：通过 `modelValue` 属性实现双向绑定
2. **选择逻辑**：根据 `type` 属性决定显示哪种类型的日历视图
3. **弹出层**：使用 `wd-action-sheet` 组件实现弹出层效果
4. **日期处理**：使用 dayjs 库处理日期的格式化和计算
5. **事件处理**：通过 emit 触发各种事件，实现组件与外部的通信
6. **方法暴露**：通过 `defineExpose` 暴露 `open` 和 `close` 方法，允许外部控制组件

## 总结

wd-calendar 是一个功能强大、高度可定制的日历组件，支持多种日期和时间选择模式。它基于 Vue 3 + TypeScript + UniApp 开发，具有良好的跨平台兼容性和性能表现。组件提供了丰富的配置选项和灵活的定制能力，可以满足各种复杂的日期选择需求。

通过合理使用 wd-calendar 组件，可以提高表单开发效率，提升用户体验，确保日期数据的准确性和一致性。在使用过程中，建议根据实际需求调整组件的配置选项，以达到最佳的使用效果。