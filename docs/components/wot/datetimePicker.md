# DatetimePicker 日期时间选择器

<demo-model url="/subPages/datetimePicker/Index"></demo-model>


## 组件概况

### 组件概述
DatetimePicker 是一个结合了输入框和弹出层的日期时间选择器组件，支持多种选择类型（日期、年月、时间、日期时间、年份），可自定义格式、范围和样式，常用于表单中的日期时间选择场景。

### 详细功能描述
- 支持多种选择类型：日期（date）、年月（year-month）、时间（time）、日期时间（datetime）、年份（year）
- 支持范围选择（开始时间和结束时间）
- 支持自定义日期范围（最小日期和最大日期）
- 支持自定义时间范围（最小/最大小时、分钟、秒）
- 支持显示秒选择
- 支持自定义格式化选项文案和显示文案
- 支持自定义过滤选项
- 支持加载状态
- 支持自定义弹出层标题和按钮文案
- 支持只读和禁用状态
- 支持必填标记
- 支持自定义大小和布局
- 支持表单验证
- 支持清空功能
- 支持区域选择的标签切换
- 支持底部安全距离适配
- 支持弹出层层级设置

### 适用业务场景
- 表单中的日期时间选择
- 预约系统的时间选择
- 生日选择器
- 事件日历的日期选择
- 数据筛选的时间范围选择
- 活动报名的截止时间选择
- 酒店和机票预订的日期范围选择

## 完整API参考

### Props
| 名称 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| modelValue | string / number / array | - | 是 | 选中项，当 type 为 time 时，类型为字符串；当需要范围选择时，类型为数组；否则为时间戳 |
| label | string | - | 否 | 选择器左侧文案 |
| placeholder | string | - | 否 | 选择器占位符 |
| disabled | boolean | false | 否 | 是否禁用 |
| readonly | boolean | false | 否 | 是否只读 |
| loading | boolean | false | 否 | 加载中状态 |
| loadingColor | string | #4D80F0 | 否 | 加载的颜色，只能使用十六进制的色值写法，且不能使用缩写 |
| title | string | - | 否 | 弹出层标题 |
| cancelButtonText | string | - | 否 | 取消按钮文案 |
| confirmButtonText | string | - | 否 | 确认按钮文案 |
| required | boolean | false | 否 | 是否必填 |
| size | string | - | 否 | 设置选择器大小，可选值：large |
| labelWidth | string | 33% | 否 | 设置左侧标题宽度 |
| error | boolean | false | 否 | 是否为错误状态，错误状态时右侧内容为红色 |
| alignRight | boolean | false | 否 | 选择器的值靠右展示 |
| closeOnClickModal | boolean | true | 否 | 点击遮罩是否关闭 |
| safeAreaInsetBottom | boolean | true | 否 | 弹出面板是否设置底部安全距离 |
| ellipsis | boolean | false | 否 | 是否超出隐藏 |
| columnsHeight | number | 217 | 否 | picker内部滚筒高度 |
| valueKey | string | value | 否 | 选项的key |
| labelKey | string | label | 否 | 选项的label |
| type | string | datetime | 否 | 选择器类型，可选值：date / year-month / time / datetime / year |
| minDate | number | 当前年份-10年的1月1日 | 否 | 最小日期（时间戳） |
| maxDate | number | 当前年份+10年的12月31日 | 否 | 最大日期（时间戳） |
| minHour | number | 0 | 否 | 最小小时，time类型时生效 |
| maxHour | number | 23 | 否 | 最大小时，time类型时生效 |
| minMinute | number | 0 | 否 | 最小分钟，time类型时生效 |
| maxMinute | number | 59 | 否 | 最大分钟，time类型时生效 |
| useSecond | boolean | false | 否 | 是否启用秒选择，仅在 time 和 datetime 类型下生效 |
| minSecond | number | 0 | 否 | 最小秒数，仅在 time 和 datetime 类型下生效 |
| maxSecond | number | 59 | 否 | 最大秒数，仅在 time 和 datetime 类型下生效 |
| filter | function | - | 否 | 自定义过滤选项的函数，返回列的选项数组 |
| formatter | function | - | 否 | 自定义弹出层选项文案的格式化函数，返回一个字符串 |
| displayFormat | function | - | 否 | 自定义展示文案的格式化函数，返回一个字符串 |
| beforeConfirm | function | - | 否 | 确定前校验函数，接收 (value, resolve, picker) 参数，通过 resolve 继续执行 picker |
| displayFormatTabLabel | function | - | 否 | 在区域选择模式下，自定义展示tab标签文案的格式化函数，返回一个字符串 |
| defaultValue | string / number / array | - | 否 | 默认日期，打开面板时面板自动选到默认日期 |
| zIndex | number | 15 | 否 | 弹窗层级 |
| prop | string | - | 否 | 表单域 model 字段名，在使用表单校验功能的情况下必填 |
| rules | array | [] | 否 | 表单验证规则，结合wd-form组件使用 |
| customCellClass | string | '' | 否 | picker cell 外部自定义样式类 |
| customViewClass | string | '' | 否 | pickerView 外部自定义样式类 |
| customLabelClass | string | '' | 否 | label 外部自定义样式类 |
| customValueClass | string | '' | 否 | value 外部自定义样式类 |
| immediateChange | boolean | false | 否 | 是否在手指松开时立即触发picker-view的 change 事件 |
| rootPortal | boolean | false | 否 | 是否从页面中脱离出来，用于解决各种 fixed 失效问题 |
| clearable | boolean | false | 否 | 显示清空按钮 |
| markerSide | string | before | 否 | 必填标记位置，可选值：before、after |
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |

### Events
| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| change | 选中值变化时触发 | { value: string/number/array } - 选中的值 |
| open | 打开弹出层时触发 | - |
| toggle | 区域选择切换标签时触发 | value: string/number - 当前标签对应的值 |
| cancel | 取消选择时触发 | - |
| confirm | 确认选择时触发 | { value: string/number/array } - 选中的值 |
| clear | 清空选中值时触发 | - |
| update:modelValue | 选中值变化时触发 | value: string/number/array - 选中的值 |

### Methods
| 方法名 | 参数 | 返回值 | 功能说明 |
| --- | --- | --- | --- |
| open | - | - | 打开弹出层 |
| close | - | - | 关闭弹出层 |
| setLoading | loading: boolean | - | 设置加载状态 |

### Slots
| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| default | - | 自定义选择器的右侧内容 |
| label | - | 自定义选择器的左侧标签内容 |

## 多场景使用示例代码

### 基础用法
```vue
<template>
  <view>
    <!-- 基础日期时间选择器 -->
    <wd-datetime-picker v-model="datetime" label="选择日期时间" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const datetime = ref<number>(Date.now())
</script>
```

### 时间类型选择器
```vue
<template>
  <view>
    <!-- 时间类型选择器 -->
    <wd-datetime-picker 
      v-model="time" 
      type="time" 
      use-second
      label="选择时间"
      placeholder="请选择时间"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const time = ref<string>("12:30:45")
</script>
```

### 范围选择
```vue
<template>
  <view>
    <!-- 范围选择 -->
    <wd-datetime-picker 
      v-model="dateRange" 
      type="date"
      label="选择日期范围"
      placeholder="请选择日期"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'

const dateRange = ref<number[]>([
  dayjs().subtract(7, 'day').valueOf(),
  Date.now()
])
</script>
```

### 自定义格式和样式
```vue
<template>
  <view>
    <!-- 自定义格式和样式 -->
    <wd-datetime-picker 
      v-model="datetime"
      label="选择日期时间"
      type="datetime"
      :formatter="formatter"
      :display-format="displayFormat"
      title="自定义格式选择"
      cancel-button-text="取消"
      confirm-button-text="确定"
      size="large"
      label-width="40%"
      custom-class="custom-picker"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const datetime = ref<number>(Date.now())

// 自定义弹出层选项文案格式
const formatter = (type: string, value: string) => {
  if (type === 'year') {
    return `${value}年`
  }
  if (type === 'month') {
    return `${value}月`
  }
  if (type === 'date') {
    return `${value}日`
  }
  if (type === 'hour') {
    return `${value}时`
  }
  if (type === 'minute') {
    return `${value}分`
  }
  if (type === 'second') {
    return `${value}秒`
  }
  return value
}

// 自定义显示文案格式
const displayFormat = (items: any[]) => {
  if (items.length === 0) return ''
  return `${items[0].label} ${items[1].label} ${items[2].label} ${items[3].label}:${items[4].label}`
}
</script>

<style scoped>
.custom-picker {
  margin: 10px 0;
}
</style>
```

### 带表单验证
```vue
<template>
  <view>
    <wd-form @submit="onSubmit" ref="formRef">
      <!-- 带表单验证的日期选择器 -->
      <wd-datetime-picker 
        v-model="birthday"
        type="date"
        label="出生日期"
        placeholder="请选择出生日期"
        prop="birthday"
        :rules="[{ required: true, message: '请选择出生日期', trigger: 'change' }]"
      />
      <wd-button type="primary" @click="onSubmit" block>提交</wd-button>
    </wd-form>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formRef = ref()
const birthday = ref<number>(0)

const onSubmit = () => {
  formRef.value.validate().then(res => {
    console.log('表单验证通过：', res)
  }).catch(err => {
    console.log('表单验证失败：', err)
  })
}
</script>
```

### 自定义日期范围
```vue
<template>
  <view>
    <!-- 自定义日期范围 -->
    <wd-datetime-picker 
      v-model="datetime"
      type="datetime"
      label="选择日期时间"
      :min-date="minDate"
      :max-date="maxDate"
    />
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import dayjs from 'dayjs'

const datetime = ref<number>(Date.now())
const minDate = computed(() => dayjs().subtract(1, 'year').valueOf())
const maxDate = computed(() => dayjs().add(1, 'year').valueOf())
</script>
```

## 样式定制指南

### customStyle 和 customClass
使用 `customStyle` 和 `customClass` 属性可以自定义组件的根节点样式：
```vue
<wd-datetime-picker 
  custom-style="margin: 10px 0; border: 1px solid #eee;"
  custom-class="custom-picker"
/>

<style>
.custom-picker {
  border-radius: 8px;
  padding: 5px;
}
</style>
```

### 子组件样式定制
可以通过以下属性自定义组件内部元素的样式：
- `customCellClass`: 自定义单元格样式
- `customViewClass`: 自定义选择器视图样式
- `customLabelClass`: 自定义标签样式
- `customValueClass`: 自定义值样式

```vue
<wd-datetime-picker 
  custom-label-class="custom-label"
  custom-value-class="custom-value"
/>

<style scoped>
.custom-label {
  font-weight: bold;
  color: #333;
}

.custom-value {
  color: #1989fa;
}
</style>
```

## 注意事项

1. **数据类型**: 当 `type` 为 `time` 时，`modelValue` 应为字符串格式；当需要范围选择时，`modelValue` 应为数组格式；其他类型时应为时间戳。
2. **范围选择**: 当 `modelValue` 为数组时，组件自动切换为范围选择模式，显示开始时间和结束时间两个标签页。
3. **格式化函数**: `formatter` 用于格式化弹出层选项文案，`displayFormat` 用于格式化显示文案，`displayFormatTabLabel` 用于格式化范围选择的标签文案。
4. **表单验证**: 结合 `wd-form` 组件使用时，需要设置 `prop` 和 `rules` 属性才能进行表单验证。
5. **加载状态**: `loading` 属性控制加载状态，`setLoading` 方法用于动态设置加载状态。
6. **清空功能**: `clearable` 属性控制是否显示清空按钮，点击清空按钮会触发 `clear` 事件。
7. **底部安全距离**: `safeAreaInsetBottom` 属性控制是否为 iPhone X 等机型添加底部安全距离。
8. **弹出层层级**: `zIndex` 属性控制弹出层的层级，默认值为15。
9. **立即触发**: `immediateChange` 属性控制是否在手指松开时立即触发 `change` 事件，仅微信小程序和支付宝小程序支持。
10. **表单集成**: 组件可以直接集成到 `wd-form` 组件中，支持表单验证和重置功能。
