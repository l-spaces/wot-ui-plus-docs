# PickerView 选择器视图

## 组件概况

PickerView 选择器视图组件是 Picker 的平铺版本，直接在页面中展示滚动选择区域，不包含弹出层和工具栏。通常作为 `wd-picker` 的内部组件使用，也可以单独使用在自定义布局中。支持单列、多列和级联选择，提供丰富的实例方法用于操作列数据。

## 核心功能描述

- **平铺展示**：直接在页面中展示滚动选择区域
- **单列/多列**：支持一维和二维数组作为 columns
- **级联选择**：通过 `columnChange` 回调动态更新关联列
- **实例方法**：提供 getSelects、getValues、setColumnData 等方法操作列数据
- **加载状态**：通过 `loading` 显示加载中状态
- **自定义高度**：通过 `columnsHeight` 和 `itemHeight` 自定义高度

## 适用业务场景

- **自定义选择器**：在自定义弹窗或面板中嵌入选择器视图
- **嵌入式选择**：在页面中直接展示选择区域，无需弹出
- **级联数据**：配合 `columnChange` 实现省市区等级联选择

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | String / Number / Boolean / Array | '' | 是 | 选中项的值，多列时为数组 |
| columns | Array | [] | 否 | 选择器数据，一维或二维数组 |
| loading | Boolean | false | 否 | 加载状态 |
| loadingColor | String | '#4D80F0' | 否 | 加载颜色 |
| columnsHeight | Number | 217 | 否 | 选项总高度 |
| itemHeight | Number | 35 | 否 | 单个选项高度 |
| valueKey | String | 'value' | 否 | 选项值对应的键名 |
| labelKey | String | 'label' | 否 | 选项文本对应的键名 |
| immediateChange | Boolean | false | 否 | 手指松开时立即触发 change 事件 |
| columnChange | Function | - | 否 | 列变化回调，用于级联选择 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Methods

| 方法名称 | 参数 | 返回值 | 说明 |
|---------|------|--------|------|
| getSelects | - | Record\<string, any\> / Record\<string, any\>[] | 获取选中项对象 |
| getValues | - | string / string[] | 获取选中值 |
| setColumnData | (columnIndex, data, rowIndex?) | void | 设置指定列的数据 |
| getColumnsData | - | Record\<string, string\>[][] | 获取所有列数据 |
| getColumnData | (columnIndex) | Record\<string, string\>[] | 获取指定列数据 |
| getColumnIndex | (columnIndex) | number | 获取指定列当前选中索引 |
| getLabels | - | string[] | 获取所有列选中项的标签 |
| getSelectedIndex | - | number[] | 获取所有列选中索引 |
| resetColumns | (columns) | void | 重置列数据 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| change | 选项变化时触发 | ({ value, selectedItems }) | 选中值和选中项对象 |
| pickstart | 滚动开始时触发 | - | - |
| pickend | 滚动结束时触发 | - | - |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-picker-view v-model="value" :columns="columns" @change="handleChange" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')
const columns = ['选项1', '选项2', '选项3']

function handleChange({ value, selectedItems }) {
  console.log(value, selectedItems)
}
</script>
```

### 示例2：多列选择

```vue
<template>
  <wd-picker-view v-model="value" :columns="columns" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref([])
const columns = [
  ['上午', '下午'],
  ['1点', '2点', '3点']
]
</script>
```

### 示例3：级联选择

```vue
<template>
  <wd-picker-view v-model="value" :columns="columns" :column-change="onColumnChange" />
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
    pickerView.setColumnData(1, getCityList(selectedItems.value))
  }
  resolve()
}
</script>
```

## 注意事项

- PickerView 不包含弹出层和确认/取消按钮，通常作为自定义选择器的内部组件
- `columnChange` 回调中需调用 `resolve()` 表示异步数据加载完成
- 使用 `setColumnData` 方法可以在级联场景中动态更新列数据
