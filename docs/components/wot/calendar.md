# Calendar 日历选择器

<demo-model url="/subPages/calendar/Index"></demo-model>

## 组件概况

### 组件概述
Calendar 日历选择器组件是一个功能强大的日期时间选择器，支持多种选择模式，包括单个日期、日期范围、时间日期、周、月等，可用于表单输入、日期筛选等多种场景。

### 详细功能描述
- 支持9种选择类型：date（日期）、dates（多日期）、datetime（日期时间）、week（周）、month（月）、daterange（日期范围）、datetimerange（日期时间范围）、weekrange（周范围）、monthrange（月范围）
- 支持最小/最大日期限制
- 支持周起始天设置
- 支持自定义日期格式化
- 支持范围选择的最大范围限制
- 支持快捷选项
- 支持时间过滤
- 支持隐藏秒选择
- 支持底部安全距离适配
- 支持懒渲染
- 支持从页面中脱离（解决fixed失效问题）
- 支持表单验证
- 支持清空功能
- 支持必填标记

### 适用业务场景
- 表单中的日期选择
- 订单日期选择
- 日期范围筛选（如报表查询）
- 周/月选择
- 任何需要日期时间选择的场景

## 完整API参考

### Props属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| modelValue | number/array/null | - | 是 | 选中值，为13位时间戳或时间戳数组 |
| type | string | date | 否 | 日期类型，可选值：date / dates / datetime / week / month / daterange / datetimerange / weekrange / monthrange |
| minDate | number | 当前日期前12个月 | 否 | 最小日期，为13位时间戳 |
| maxDate | number | 当前日期后12个月 | 否 | 最大日期，为13位时间戳 |
| firstDayOfWeek | number | 0 | 否 | 周起始天（0-周日，1-周一，以此类推） |
| formatter | function | - | 否 | 日期格式化函数 |
| maxRange | number | - | 否 | type为范围选择时有效，最大日期范围 |
| rangePrompt | string | - | 否 | type为范围选择时有效，选择超出最大日期范围时的错误提示文案 |
| allowSameDay | boolean | false | 否 | type为范围选择时有效，是否允许选择同一天 |
| defaultTime | string/array | - | 否 | 选中日期所使用的当日内具体时刻 |
| timeFilter | function | - | 否 | type为datetime或datetimerange时有效，用于过滤时间选择器的数据 |
| hideSecond | boolean | false | 否 | type为datetime或datetimerange时有效，是否不展示秒修改 |
| label | string | - | 否 | 选择器左侧文案 |
| labelWidth | string | 33% | 否 | 设置左侧标题宽度 |
| disabled | boolean | false | 否 | 是否禁用 |
| readonly | boolean | false | 否 | 是否只读 |
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
| shortcuts | array | [] | 否 | 快捷选项，为对象数组，其中对象的text必传 |
| onShortcutsClick | function | - | 否 | 快捷操作点击回调 |
| safeAreaInsetBottom | boolean | true | 否 | 弹出面板是否设置底部安全距离（iphone X类型的机型） |
| beforeConfirm | function | - | 否 | 确定前校验函数，接收{ value, resolve }参数，通过resolve继续执行 |
| prop | string | - | 否 | 表单域model字段名，在使用表单校验功能的情况下，该属性是必填的 |
| rules | array | [] | 否 | 表单验证规则，结合wd-form组件使用 |
| immediateChange | boolean | false | 否 | 是否在手指松开时立即触发change事件（仅微信/支付宝小程序支持） |
| withCell | boolean | true | 否 | 是否使用内置单元格 |
| rootPortal | boolean | false | 否 | 是否从页面中脱离出来，解决fixed失效问题 |
| markerSide | string | before | 否 | 必填标记位置，可选值：before（标签前）、after（标签后） |
| clearable | boolean | false | 否 | 是否显示清空按钮 |
| customStyle | string | - | 否 | 自定义根节点样式 |
| customClass | string | - | 否 | 自定义根节点样式类 |
| customLabelClass | string | - | 否 | 自定义标签样式类 |
| customValueClass | string | - | 否 | 自定义值样式类 |

### Events事件

| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| cancel | 点击取消按钮或遮罩层关闭时 | - |
| change | 选中值变化时 | value: 选中的日期值 |
| update:modelValue | 选中值变化并确认后 | newValue: 新的选中值 |
| confirm | 点击确定按钮时 | value: 选中的日期值, type: 当前选择类型 |
| open | 打开选择器时 | - |
| clear | 点击清空按钮时 | - |

### Methods方法

| 方法名 | 参数 | 返回值 | 功能说明 |
|--------|------|--------|----------|
| open | - | - | 打开时间选择器弹窗 |
| close | - | - | 关闭时间选择器弹窗 |

### Slots插槽

| 插槽名 | 作用域变量 | 使用说明 |
|--------|------------|----------|
| default | - | 自定义选择器内容，仅当withCell为false时有效 |
| label | - | 自定义左侧标签内容 |

## 多场景使用示例代码

### 1. 基础用法

```vue
<template>
  <view class="calendar-demo">
    <wd-calendar 
      v-model="date" 
      label="选择日期" 
      placeholder="请选择日期"
      @change="handleChange"
    />
    <view class="result">选中的日期：{{ formatDate(date) }}</view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { showToast } from '@/utils/toast'

// 基础日历选择器用法
const date = ref<number | null>(null)

// 格式化日期
const formatDate = (timestamp: number | null) => {
  if (!timestamp) return ''
  const date = new Date(timestamp)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

// 处理选择事件
const handleChange = (event: any) => {
  showToast(`选择了：${formatDate(event.value)}`)
}
</script>

<style scoped>
.calendar-demo {
  padding: 20rpx;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.result {
  font-size: 28rpx;
  color: #666;
  margin-top: 20rpx;
}
</style>
```

### 2. 不同类型选择

```vue
<template>
  <view class="calendar-demo">
    <wd-calendar 
      v-model="singleDate" 
      type="date" 
      label="单个日期" 
    />
    <wd-calendar 
      v-model="dateRange" 
      type="daterange" 
      label="日期范围" 
    />
    <wd-calendar 
      v-model="dateTime" 
      type="datetime" 
      label="日期时间" 
    />
    <wd-calendar 
      v-model="week" 
      type="week" 
      label="周选择" 
    />
    <wd-calendar 
      v-model="month" 
      type="month" 
      label="月选择" 
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 不同类型的日历选择器
const singleDate = ref<number | null>(null)
const dateRange = ref<number[]>([])
const dateTime = ref<number | null>(null)
const week = ref<number | null>(null)
const month = ref<number | null>(null)
</script>

<style scoped>
.calendar-demo {
  padding: 20rpx;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}
</style>
```

### 3. 带快捷选项

```vue
<template>
  <view class="calendar-demo">
    <wd-calendar 
      v-model="date" 
      label="带快捷选项" 
      :shortcuts="shortcuts"
      :on-shortcuts-click="handleShortcutsClick"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import dayjs from '@/utils/dayjs'

// 带快捷选项的日历选择器
const date = ref<number | null>(null)

// 快捷选项
const shortcuts = ref([
  { text: '今天' },
  { text: '昨天' },
  { text: '近7天' },
  { text: '近30天' }
])

// 处理快捷选项点击
const handleShortcutsClick = (event: any) => {
  const { index } = event
  const now = dayjs()
  let result: number | number[] = 0
  
  switch (index) {
    case 0: // 今天
      result = now.valueOf()
      break
    case 1: // 昨天
      result = now.subtract(1, 'day').valueOf()
      break
    case 2: // 近7天
      result = [now.subtract(6, 'day').valueOf(), now.valueOf()]
      break
    case 3: // 近30天
      result = [now.subtract(29, 'day').valueOf(), now.valueOf()]
      break
  }
  
  return result
}
</script>

<style scoped>
.calendar-demo {
  padding: 20rpx;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}
</style>
```

### 4. 自定义格式化和限制

```vue
<template>
  <view class="calendar-demo">
    <wd-calendar 
      v-model="date" 
      label="自定义格式化和限制" 
      :min-date="minDate" 
      :max-date="maxDate"
      :formatter="formatter"
      :display-format="displayFormat"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import dayjs from '@/utils/dayjs'

// 自定义格式化和限制的日历选择器
const date = ref<number | null>(null)

// 最小日期（今天）
const minDate = ref(dayjs().startOf('day').valueOf())

// 最大日期（今天后30天）
const maxDate = ref(dayjs().add(30, 'day').endOf('day').valueOf())

// 日期格式化函数
const formatter = (day: any) => {
  const date = dayjs(day.date)
  const today = dayjs().startOf('day')
  const tomorrow = dayjs().add(1, 'day').startOf('day')
  
  if (date.isSame(today, 'day')) {
    day.text = '今天'
  } else if (date.isSame(tomorrow, 'day')) {
    day.text = '明天'
  }
  
  return day
}

// 自定义显示格式化
const displayFormat = (value: number | number[], type: string) => {
  if (!value) return ''
  return dayjs(value).format('YYYY年MM月DD日')
}
</script>

<style scoped>
.calendar-demo {
  padding: 20rpx;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}
</style>
```

### 5. 表单验证和清空功能

```vue
<template>
  <view class="calendar-demo">
    <wd-form :model="form" :rules="rules" ref="formRef">
      <wd-calendar 
        v-model="form.date" 
        label="必填日期" 
        prop="date"
        clearable
        required
        error-message="请选择日期"
      />
      <view style="margin-top: 40rpx;">
        <wd-button type="primary" @click="handleSubmit">提交表单</wd-button>
      </view>
    </wd-form>
  </view>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { showToast } from '@/utils/toast'

// 表单验证和清空功能
const formRef = ref<any>(null)
const form = reactive({
  date: null as number | null
})

// 表单验证规则
const rules = {
  date: [
    { required: true, message: '请选择日期', trigger: 'change' }
  ]
}

// 处理表单提交
const handleSubmit = async () => {
  const result = await formRef.value.validate()
  if (result.valid) {
    showToast('表单验证通过')
    console.log('表单数据:', form)
  }
}
</script>

<style scoped>
.calendar-demo {
  padding: 20rpx;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}
</style>
```

## 样式定制指南

### 1. 使用customStyle自定义样式

```vue
<template>
  <wd-calendar 
    v-model="date" 
    label="自定义样式" 
    customStyle="margin: 20rpx;"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const date = ref<number | null>(null)
</script>
```

### 2. 使用customClass自定义类名

```vue
<template>
  <wd-calendar 
    v-model="date" 
    label="自定义类名" 
    customClass="my-calendar"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const date = ref<number | null>(null)
</script>

<style scoped>
/* 注意：需要使用 ::v-deep 或 /deep/ 穿透 scoped 样式 */
:deep(.my-calendar) {
  background-color: #f5f7fa;
  border-radius: 8rpx;
  overflow: hidden;
}

:deep(.my-calendar .wd-calendar__cell) {
  padding: 15rpx 20rpx;
}
</style>
```

### 3. 自定义标签和值样式

```vue
<template>
  <wd-calendar 
    v-model="date" 
    label="自定义标签和值样式" 
    customLabelClass="custom-label"
    customValueClass="custom-value"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const date = ref<number | null>(null)
</script>

<style scoped>
/* 注意：需要使用 ::v-deep 或 /deep/ 穿透 scoped 样式 */
:deep(.custom-label) {
  font-weight: bold;
  color: #4D80F0;
}

:deep(.custom-value) {
  color: #34d19d;
  font-size: 32rpx;
}
</style>
```

## 注意事项

1. **modelValue类型**：根据type属性的不同，modelValue的类型也不同：
   - 单值类型（date、datetime、week、month）：number | null
   - 多值类型（dates）：number[]
   - 范围类型（daterange、datetimerange、weekrange、monthrange）：number[]

2. **时间戳格式**：所有日期值均使用13位时间戳格式

3. **minDate和maxDate**：
   - 默认为当前日期前后12个月
   - 可以通过这两个属性限制可选日期范围

4. **formatter函数**：用于自定义日期显示，接收day对象，返回修改后的day对象

5. **displayFormat**：用于自定义选择器显示的文本格式

6. **showConfirm**：
   - 默认为true，显示确定按钮
   - 为false时，选择后自动关闭并触发confirm事件

7. **safeAreaInsetBottom**：在iPhone X等全面屏机型上，为true时会自动添加底部安全距离

8. **rootPortal**：当页面中存在fixed定位元素时，可能会出现层级问题，设置rootPortal为true可以解决此问题

9. **clearable**：设置为true时，会显示清空按钮，点击可清空已选值

10. **withCell**：
    - 默认为true，使用内置单元格样式
    - 为false时，可以通过default插槽自定义选择器内容

11. **表单验证**：结合wd-form使用时，需要设置prop属性和rules规则

12. **快捷选项**：
    - shortcuts为快捷选项数组，每个选项需包含text属性
    - onShortcutsClick为快捷选项点击回调，需返回对应的时间戳或时间戳数组