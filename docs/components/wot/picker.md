# Picker 选择器

## 组件概述

Picker 选择器组件用于从一组数据中选择一项或多项，由 `wd-picker` 和 `wd-picker-view` 两个组件配合使用。`wd-picker` 负责弹出式交互和表单承载，`wd-picker-view` 负责滚轮选择视图。组件支持单列、多列、级联联动、自定义展示文案和确认前校验。

## 核心功能描述

- **单列 / 多列选择**：支持一维与二维 `columns`
- **级联联动**：通过 `columnChange` 动态改写列数据
- **确认前拦截**：通过 `beforeConfirm` 在确认前异步校验
- **清空与加载**：支持清空按钮和内部 / 外部加载状态
- **自定义触发区**：支持默认插槽和标题插槽

## 适用业务场景

- **地址选择**：省市区三级联动
- **规格选择**：学历、行业、时间段等多列组合选择
- **表单录入**：结合 `wd-form` 进行字段校验

## API

### Picker Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | String / Number / Array | `''` | 否 | 当前选中值，多列场景为数组 |
| columns | Array | `[]` | 否 | 选择器数据，一维数组为单列，二维数组为多列 |
| label | String | - | 否 | 左侧标题 |
| placeholder | String | - | 否 | 占位文案 |
| disabled | Boolean | false | 否 | 是否禁用 |
| readonly | Boolean | false | 否 | 是否只读 |
| loading | Boolean | false | 否 | 外部加载状态 |
| loadingColor | String | `'#4D80F0'` | 否 | 加载颜色 |
| title | String | - | 否 | 弹层标题 |
| cancelButtonText | String | - | 否 | 取消按钮文案 |
| confirmButtonText | String | - | 否 | 确认按钮文案 |
| required | Boolean | false | 否 | 是否必填 |
| size | String | - | 否 | 尺寸 |
| labelWidth | String | `'33%'` | 否 | 左侧标题宽度 |
| error | Boolean | false | 否 | 是否为错误状态 |
| alignRight | Boolean | false | 否 | 值是否右对齐 |
| beforeConfirm | Function | - | 否 | 确认前校验，接收 `(value, resolve, picker)` |
| closeOnClickModal | Boolean | true | 否 | 点击蒙层是否关闭 |
| safeAreaInsetBottom | Boolean | true | 否 | 是否适配底部安全区 |
| ellipsis | Boolean | false | 否 | 文本是否超出省略 |
| columnsHeight | Number | 217 | 否 | 选项总高度 |
| valueKey | String | `'value'` | 否 | 选项值字段名 |
| labelKey | String | `'label'` | 否 | 选项文案字段名 |
| columnChange | Function | - | 否 | 列联动回调，接收 `(pickerView, selects, index, resolve)` |
| displayFormat | Function | - | 否 | 自定义展示文案函数 |
| zIndex | Number | 15 | 否 | 弹层层级 |
| prop | String | - | 否 | 表单字段名 |
| rules | Array | `[]` | 否 | 表单校验规则 |
| immediateChange | Boolean | false | 否 | 是否在手指松开时立即触发 `picker-view` 变更 |
| rootPortal | Boolean | false | 否 | 是否脱离当前页面层级渲染 |
| clearable | Boolean | false | 否 | 是否显示清空按钮 |
| markerSide | String | `'before'` | 否 | 必填标记位置，可选值：`before` / `after` |
| customLabelClass | String | `''` | 否 | 自定义标题样式类 |
| customValueClass | String | `''` | 否 | 自定义值样式类 |
| customViewClass | String | `''` | 否 | 自定义 `wd-picker-view` 样式类 |
| customStyle | String | `''` | 否 | 自定义根节点样式 |
| customClass | String | `''` | 否 | 自定义根节点样式类 |

### Picker Methods

| 方法名称 | 说明 | 参数 |
|---------|------|------|
| open | 打开选择器弹层 | - |
| close | 关闭选择器弹层 | - |
| setLoading | 设置内部加载状态 | `(loading: boolean)` |

### Picker Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| open | 点击触发区打开弹层时触发 | - | - |
| cancel | 取消或关闭弹层时触发 | - | - |
| confirm | 点击确认按钮并确认成功时触发 | `({ value, selectedItems })` | 返回选中值与选中项 |
| clear | 点击清空按钮时触发 | - | - |
| update:modelValue | 值确认或清空时触发 | `(value)` | 用于同步选中值 |

### Picker Slots

| 插槽名称 | 说明 |
|---------|------|
| default | 自定义触发区内容 |
| label | 自定义标题内容 |

### PickerView 组合能力

`wd-picker-view` 为 `wd-picker` 的底层滚轮视图，当前源码暴露以下方法，供 `columnChange` 或 `ref` 场景使用：

| 方法名称 | 说明 |
|---------|------|
| getSelects | 获取当前选中项对象 |
| getValues | 获取当前选中值 |
| setColumnData | 动态设置某一列数据 |
| getColumnsData | 获取当前全部列数据 |
| getColumnData | 获取指定列数据 |
| getColumnIndex | 获取指定列当前选中下标 |
| getLabels | 获取当前选中文案数组 |
| getSelectedIndex | 获取所有列当前选中下标 |
| resetColumns | 重置列数据 |

## 使用示例

### 示例 1：基础用法

```vue
<template>
  <wd-picker label="单列选项" v-model="value" :columns="columns" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')
const columns = ['北京', '上海', '广州', '深圳']
</script>
```

### 示例 2：多列与级联

```vue
<template>
  <wd-picker
    label="多级联动"
    v-model="value"
    :columns="columns"
    :column-change="handleColumnChange"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { PickerViewColumnChange } from '@/uni_modules/wot-ui-plus/components/wd-picker-view/types'

const district = {
  0: [{ label: '广东省', value: '440000' }],
  440000: [{ label: '广州市', value: '440100' }]
}

const value = ref(['440000', '440100'])
const columns = ref([district[0], district['440000']])

const handleColumnChange: PickerViewColumnChange = (pickerView, selects, columnIndex, resolve) => {
  const item = (selects as Record<string, any>[])[columnIndex]
  if (columnIndex === 0) {
    pickerView.setColumnData(1, district[item.value] || [])
  }
  resolve()
}
</script>
```

### 示例 3：确认前校验与清空

```vue
<template>
  <wd-picker
    clearable
    label="选择项"
    v-model="value"
    :columns="columns"
    :before-confirm="beforeConfirm"
    @clear="handleClear"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')
const columns = ['选项一', '选项二', '选项三']

function beforeConfirm(
  value: string | number | boolean | string[] | number[] | boolean[],
  resolve: (pass: boolean) => void,
  picker: { setLoading: (loading: boolean) => void }
) {
  picker.setLoading(true)
  setTimeout(() => {
    picker.setLoading(false)
    resolve(value !== '选项二')
  }, 500)
}

function handleClear() {
  console.log('picker cleared')
}
</script>
```

## 注意事项

- `wd-picker` 本身当前不对外抛出 `change` 事件，滚轮变化事件发生在内部 `wd-picker-view`。
- `beforeConfirm` 的第三个参数是当前组件暴露对象，可直接调用 `setLoading`。
- 级联场景下，`columnChange` 需要显式调用 `resolve()` 才能完成后续更新。
- 多列模式下 `modelValue` 应与列数对应，通常使用数组。
- 旧示例中的 `use-default-slot`、`use-label-slot` 仅是兼容性遗留字段，当前可直接使用插槽，无需配置。
