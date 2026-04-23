# Picker 选择器

## 组件概述

Picker 选择器组件提供从一组数据中选择一项或多项的能力，由 `wd-picker` 和 `wd-picker-view` 两个组件配合使用。`wd-picker` 是弹出式选择器，点击后弹出底部面板进行选择；`wd-picker-view` 是平铺式选择器视图，直接在页面中展示滚动选择区域。支持单列、多列和级联选择，可自定义展示格式和确认前校验。

## 核心功能描述

- **单列选择**：传入一维数组作为 columns
- **多列选择**：传入二维数组作为 columns
- **级联选择**：通过 `columnChange` 回调动态更新关联列数据
- **自定义格式**：通过 `displayFormat` 自定义选中值的展示文本
- **确认前校验**：通过 `beforeConfirm` 在确认前进行校验拦截
- **加载状态**：通过 `loading` 显示加载中状态
- **表单校验**：通过 `prop` 和 `rules` 配合 `wd-form` 实现校验
- **清除功能**：通过 `clearable` 显示清除按钮

## 适用业务场景

- **城市选择**：使用级联选择器选择省市区
- **分类选择**：在表单中选择商品分类、行业类型等
- **多列选择**：选择日期、时间等多维度数据

## API

### Picker Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | String / Number / Array | '' | 否 | 选中项的值，多列时为数组 |
| columns | Array | [] | 否 | 选择器数据，一维数组为单列，二维数组为多列 |
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
| valueKey | String | 'value' | 否 | 选项值对应的键名 |
| labelKey | String | 'label' | 否 | 选项文本对应的键名 |
| columnChange | Function | - | 否 | 列变化回调，用于级联选择 |
| displayFormat | Function | - | 否 | 自定义展示文案的格式化函数 |
| beforeConfirm | Function | - | 否 | 确认前校验函数 |
| zIndex | Number | 15 | 否 | 弹窗层级 |
| prop | String | - | 否 | 表单域 model 字段名 |
| rules | Array | [] | 否 | 表单验证规则 |
| immediateChange | Boolean | false | 否 | 手指松开时立即触发 change 事件 |
| rootPortal | Boolean | false | 否 | 是否从页面中脱离 |
| clearable | Boolean | false | 否 | 是否显示清空按钮 |
| markerSide | String | 'before' | 否 | 必填标记位置，可选值：before / after |
| customLabelClass | String | '' | 否 | 自定义标签样式类 |
| customValueClass | String | '' | 否 | 自定义值样式类 |
| customViewClass | String | '' | 否 | 自定义 pickerView 样式类 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Picker Methods

| 方法名称 | 参数 | 返回值 | 说明 |
|---------|------|--------|------|
| open | - | void | 打开选择器弹框 |
| close | - | void | 关闭选择器弹框 |
| setLoading | (loading: boolean) | void | 设置加载状态 |

### Picker Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| confirm | 点击确认按钮时触发 | ({ value, selectedItems }) | value 为选中值，selectedItems 为选中项对象 |
| cancel | 点击取消按钮时触发 | - | - |
| change | 选项变化时触发 | ({ value, selectedItems }) | 滚动选择时触发 |

### Picker Slots

| 插槽名称 | 作用域参数 | 使用场景 |
|---------|-----------|---------|
| default | - | 自定义触发元素 |
| label | - | 自定义标签内容 |

## 使用示例

### 示例1：基础用法

传入一维数组作为 columns，通过 `v-model` 绑定选中值。

```vue
<template>
  <wd-picker v-model="value" :columns="columns" label="选择城市" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')
const columns = ['北京', '上海', '广州', '深圳']
</script>
```

### 示例2：多列选择

传入二维数组作为 columns。

```vue
<template>
  <wd-picker v-model="value" :columns="columns" label="选择时间" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref([])
const columns = [
  ['上午', '下午'],
  ['1点', '2点', '3点', '4点', '5点']
]
</script>
```

### 示例3：级联选择

通过 `columnChange` 回调动态更新关联列数据。

```vue
<template>
  <wd-picker v-model="value" :columns="columns" label="选择地区" :column-change="onColumnChange" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref([])
const columns = ref([
  { label: '广东省', value: 'gd' },
  { label: '浙江省', value: 'zj' }
])

function onColumnChange(pickerView, selectedItems, columnIndex, resolve) {
  if (columnIndex === 0) {
    const province = selectedItems.value
    pickerView.setColumnData(1, getCityList(province.value))
  }
  resolve()
}
</script>
```

### 示例4：自定义展示与确认前校验

通过 `displayFormat` 自定义展示文本，通过 `beforeConfirm` 确认前校验。

```vue
<template>
  <wd-picker
    v-model="value"
    :columns="columns"
    label="选择城市"
    :display-format="displayFormat"
    :before-confirm="beforeConfirm"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')
const columns = ['北京', '上海', '广州', '深圳']

function displayFormat(item, { valueKey, labelKey }) {
  return item[labelKey] || item
}

function beforeConfirm(value, resolve) {
  if (!value) {
    resolve(false)
  } else {
    resolve(true)
  }
}
</script>
```

## 注意事项

- columns 数据支持字符串数组和对象数组，对象数组需包含 `valueKey` 和 `labelKey` 对应的键
- 多列选择时 `modelValue` 应为数组类型
- `columnChange` 回调中需调用 `resolve()` 表示异步数据加载完成
- `beforeConfirm` 回调需调用 `resolve(true)` 允许确认或 `resolve(false)` 阻止确认
- `immediateChange` 仅在微信小程序和支付宝小程序中支持
