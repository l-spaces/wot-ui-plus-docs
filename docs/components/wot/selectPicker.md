# SelectPicker 下拉选择器

## 组件概述

SelectPicker 下拉选择器用于从一组选项中选择一个或多个值，支持单选（radio）和多选（checkbox）两种模式。弹出面板以列表形式展示选项，支持搜索过滤、选中数量限制、自定义展示格式等功能。适用于选项较多、需要搜索或复选的场景。

## 核心功能描述

- **单选/多选**：通过 `type` 切换 radio（单选）和 checkbox（多选）模式
- **搜索过滤**：通过 `filterable` 启用搜索功能（仅支持本地搜索）
- **选中数量限制**：通过 `min` 和 `max` 限制多选时的选中数量
- **自定义格式**：通过 `displayFormat` 自定义选中值的展示文本
- **确认前校验**：通过 `beforeConfirm` 在确认前进行校验拦截
- **滚动定位**：通过 `scrollIntoView` 重新打开时自动滚动到选中项
- **确认按钮**：radio 模式下通过 `showConfirm` 控制是否显示确认按钮

## 适用业务场景

- **标签选择**：在表单中选择多个标签，配合搜索和数量限制
- **人员选择**：在审批流程中选择审批人，配合搜索过滤
- **单选列表**：在设置页面选择一个选项

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | String / Number / Boolean / Array | - | 是 | 选中项的值，checkbox 模式为数组 |
| columns | Array | [] | 否 | 选择器数据，一维数组 |
| type | String | 'checkbox' | 否 | 选择器类型，可选值：checkbox / radio |
| label | String | - | 否 | 选择器左侧文案 |
| labelWidth | String | '33%' | 否 | 左侧标题宽度 |
| disabled | Boolean | false | 否 | 是否禁用 |
| readonly | Boolean | false | 否 | 是否只读 |
| placeholder | String | - | 否 | 选择器占位符 |
| title | String | - | 否 | 弹出层标题 |
| alignRight | Boolean | false | 否 | 值靠右展示 |
| error | Boolean | false | 否 | 错误状态 |
| required | Boolean | false | 否 | 是否必填 |
| size | String | - | 否 | 尺寸 |
| center | Boolean | false | 否 | 是否垂直居中 |
| checkedColor | String | - | 否 | 选中的颜色 |
| min | Number | 0 | 否 | 最小选中数量，仅 checkbox 模式 |
| max | Number | 0 | 否 | 最大选中数量，0 为不限制，仅 checkbox 模式 |
| selectSize | String | - | 否 | 选项组尺寸 |
| loading | Boolean | false | 否 | 加载中状态 |
| loadingColor | String | '#4D80F0' | 否 | 加载颜色 |
| closeOnClickModal | Boolean | true | 否 | 点击蒙层是否关闭 |
| valueKey | String | 'value' | 否 | 选项值键名 |
| labelKey | String | 'label' | 否 | 选项文本键名 |
| confirmButtonText | String | - | 否 | 确认按钮文案 |
| displayFormat | Function | - | 否 | 自定义展示文案的格式化函数 |
| beforeConfirm | Function | - | 否 | 确认前校验函数 |
| zIndex | Number | 15 | 否 | 弹窗层级 |
| safeAreaInsetBottom | Boolean | true | 否 | 底部安全距离 |
| filterable | Boolean | false | 否 | 是否可搜索 |
| filterPlaceholder | String | - | 否 | 搜索框占位符 |
| ellipsis | Boolean | false | 否 | 文本溢出省略号 |
| scrollIntoView | Boolean | true | 否 | 重新打开是否滚动到选中项 |
| prop | String | - | 否 | 表单域 model 字段名 |
| rules | Array | [] | 否 | 表单验证规则 |
| showConfirm | Boolean | true | 否 | 是否显示确认按钮，仅 radio 模式 |
| clearable | Boolean | false | 否 | 是否显示清空按钮 |
| rootPortal | Boolean | false | 否 | 是否从页面中脱离 |
| markerSide | String | 'before' | 否 | 必填标记位置 |
| customContentClass | String | '' | 否 | 自定义内容样式类 |
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
| confirm | 点击确认按钮时触发 | ({ value, selectedItems }) | 选中值和选中项 |
| cancel | 点击取消按钮时触发 | - | - |
| change | 选项变化时触发 | ({ value }) | 选中值变化 |

## 使用示例

### 示例1：多选模式

```vue
<template>
  <wd-select-picker v-model="value" :columns="columns" label="选择标签" type="checkbox" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref([])
const columns = [
  { value: '1', label: '选项一' },
  { value: '2', label: '选项二' },
  { value: '3', label: '选项三' }
]
</script>
```

### 示例2：单选模式

```vue
<template>
  <wd-select-picker v-model="value" :columns="columns" label="选择类型" type="radio" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')
const columns = [
  { value: '1', label: '类型一' },
  { value: '2', label: '类型二' }
]
</script>
```

### 示例3：搜索与数量限制

```vue
<template>
  <wd-select-picker
    v-model="value"
    :columns="columns"
    label="选择标签"
    type="checkbox"
    filterable
    filter-placeholder="搜索标签"
    :max="3"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref([])
const columns = [
  { value: '1', label: '标签一' },
  { value: '2', label: '标签二' },
  { value: '3', label: '标签三' },
  { value: '4', label: '标签四' },
  { value: '5', label: '标签五' }
]
</script>
```

## 注意事项

- `filterable` 目前仅支持本地搜索，不支持远程搜索
- checkbox 模式下 `min` 和 `max` 用于限制选中数量
- radio 模式下 `showConfirm` 为 false 时，点击选项直接确认
- `displayFormat` 函数接收选中值和 columns 数据，返回展示字符串
