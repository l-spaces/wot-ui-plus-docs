# ColPicker 多列选择器

## 组件概述

ColPicker 多列选择器用于多级联动选择场景，如省市区选择、分类选择等。通过 `columnChange` 回调逐级加载下一列数据，支持自定义展示格式、确认前校验、自动补全数据等功能。与 Picker 的级联模式不同，ColPicker 专门为多级联动设计，交互更自然。

## 核心功能描述

- **多级联动**：通过 `columnChange` 回调逐级加载下一列数据
- **自动补全**：通过 `autoComplete` 自动触发 column-change 补全数据
- **自定义格式**：通过 `displayFormat` 自定义选中值的展示文本
- **确认前校验**：通过 `beforeConfirm` 在确认前进行校验拦截
- **提示文案**：通过 `tipKey` 在选项旁显示提示文案
- **底部条样式**：通过 `lineWidth` 和 `lineHeight` 自定义底部指示条样式

## 适用业务场景

- **省市区选择**：三级联动选择省市区
- **分类选择**：多级分类联动选择
- **组织架构选择**：公司-部门-岗位联动选择

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | Array | - | 是 | 选中项的值数组 |
| columns | Array | [] | 否 | 第一列数据 |
| label | String | - | 否 | 选择器左侧文案 |
| labelWidth | String | '33%' | 否 | 左侧标题宽度 |
| disabled | Boolean | false | 否 | 是否禁用 |
| readonly | Boolean | false | 否 | 是否只读 |
| placeholder | String | - | 否 | 选择器占位符 |
| title | String | - | 否 | 弹出层标题 |
| columnChange | Function | - | 否 | 列变化回调，接收 { selectedItem, index, rowIndex, resolve, finish } |
| displayFormat | Function | - | 否 | 自定义展示文案的格式化函数 |
| beforeConfirm | Function | - | 否 | 确认前校验函数 |
| alignRight | Boolean | false | 否 | 值靠右展示 |
| error | Boolean | false | 否 | 错误状态 |
| required | Boolean | false | 否 | 是否必填 |
| size | String | - | 否 | 尺寸，可选值：large |
| valueKey | String | 'value' | 否 | 选项值键名 |
| labelKey | String | 'label' | 否 | 选项文本键名 |
| tipKey | String | 'tip' | 否 | 选项提示文案键名 |
| loadingColor | String | '#4D80F0' | 否 | 加载颜色 |
| closeOnClickModal | Boolean | true | 否 | 点击蒙层是否关闭 |
| autoComplete | Boolean | false | 否 | 自动触发 column-change 补全数据 |
| zIndex | Number | 15 | 否 | 弹窗层级 |
| safeAreaInsetBottom | Boolean | true | 否 | 底部安全距离 |
| ellipsis | Boolean | false | 否 | 文本溢出省略号 |
| prop | String | - | 否 | 表单域 model 字段名 |
| rules | Array | [] | 否 | 表单验证规则 |
| lineWidth | Number / String | - | 否 | 底部条宽度 |
| lineHeight | Number / String | - | 否 | 底部条高度 |
| rootPortal | Boolean | false | 否 | 是否从页面中脱离 |
| clearable | Boolean | false | 否 | 是否显示清空按钮 |
| markerSide | String | 'before' | 否 | 必填标记位置 |
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

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| confirm | 点击确认按钮时触发 | ({ value, selectedItems }) | value 为选中值数组，selectedItems 为选中项对象数组 |
| cancel | 点击取消按钮时触发 | - | - |
| change | 选项变化时触发 | ({ value, selectedItems }) | 滚动选择时触发 |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-col-picker v-model="value" :columns="columns" label="选择地区" :column-change="onColumnChange" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref([])
const columns = [
  { label: '广东省', value: 'gd' },
  { label: '浙江省', value: 'zj' }
]

function onColumnChange({ selectedItem, index, resolve, finish }) {
  if (index === 0) {
    resolve(getCityList(selectedItem.value))
  } else if (index === 1) {
    resolve(getDistrictList(selectedItem.value))
  } else {
    finish()
  }
}
</script>
```

### 示例2：自动补全数据

```vue
<template>
  <wd-col-picker v-model="value" :columns="columns" label="选择地区" :column-change="onColumnChange" auto-complete />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref([])
const columns = [
  { label: '广东省', value: 'gd' },
  { label: '浙江省', value: 'zj' }
]

function onColumnChange({ selectedItem, index, resolve, finish }: any) {
  if (index === 0) {
    resolve([{ label: '广州市', value: 'gz' }, { label: '深圳市', value: 'sz' }])
  } else {
    finish()
  }
}
</script>
```

### 示例3：自定义展示格式

```vue
<template>
  <wd-col-picker
    v-model="value"
    :columns="columns"
    label="选择地区"
    :column-change="onColumnChange"
    :display-format="displayFormat"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref([])
const columns = []

function displayFormat(selectedItems) {
  return selectedItems.map(item => item.label).join(' / ')
}

function onColumnChange({ selectedItem, index, resolve, finish }) {
  resolve(getNextLevelData(selectedItem.value))
}
</script>
```

## 注意事项

- `columnChange` 回调中必须调用 `resolve(nextColumnData)` 加载下一列数据
- 最后一列数据加载完成后调用 `finish()` 结束选择
- `autoComplete` 开启后，当 columns 为空或长度不足时会自动触发 column-change
- `modelValue` 必须为数组类型，与列数对应
