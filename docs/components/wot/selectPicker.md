# SelectPicker 下拉选择器

## 组件概况

SelectPicker 下拉选择器用于从平面选项列表中进行单选或多选。组件内部基于 `wd-action-sheet`、`wd-checkbox-group`、`wd-radio-group` 组合实现，支持搜索过滤、确认前校验、自动确认和清空能力，适合标签选择、人员选择和列表型配置场景。

## 核心功能描述

- **单选 / 多选**：通过 `type` 在 `radio` 与 `checkbox` 间切换
- **搜索过滤**：支持本地搜索和高亮展示
- **自动确认**：`radio` 模式下可关闭确认按钮，实现点选即确认
- **确认前校验**：通过 `beforeConfirm` 控制是否允许提交
- **滚动定位**：重新打开时可自动滚动到已选项
- **清空能力**：支持清空按钮和 `clear` 事件

## 适用业务场景

- **标签选择**：标签、多选条件、多维筛选
- **人员 / 部门选择**：可搜索的单选或多选列表
- **设置类选择**：在较长选项列表中快速选择一个值

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | String / Number / Boolean / Array | - | 是 | 当前选中值；`checkbox` 模式下为数组 |
| columns | Array | `[]` | 否 | 选项列表，一维对象数组 |
| type | String | `'checkbox'` | 否 | 选择器类型，可选值：`checkbox` / `radio` |
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
| checkedColor | String | - | 否 | 选中颜色 |
| min | Number | 0 | 否 | 最小选中数量，仅 `checkbox` 模式有效 |
| max | Number | 0 | 否 | 最大选中数量，`0` 表示不限制，仅 `checkbox` 模式有效 |
| selectSize | String | - | 否 | 内部单选 / 多选组件尺寸 |
| loading | Boolean | false | 否 | 是否显示加载状态 |
| loadingColor | String | `'#4D80F0'` | 否 | 加载颜色 |
| closeOnClickModal | Boolean | true | 否 | 点击蒙层是否关闭 |
| valueKey | String | `'value'` | 否 | 选项值字段名 |
| labelKey | String | `'label'` | 否 | 选项文案字段名 |
| confirmButtonText | String | - | 否 | 确认按钮文案 |
| displayFormat | Function | - | 否 | 自定义展示文案函数 |
| beforeConfirm | Function | - | 否 | 确认前校验函数，接收 `(value, resolve)` |
| zIndex | Number | 15 | 否 | 弹层层级 |
| safeAreaInsetBottom | Boolean | true | 否 | 是否适配底部安全区 |
| filterable | Boolean | false | 否 | 是否开启本地搜索 |
| filterPlaceholder | String | - | 否 | 搜索框占位文案 |
| ellipsis | Boolean | false | 否 | 文本是否超出省略 |
| scrollIntoView | Boolean | true | 否 | 弹层打开后是否滚动到已选项 |
| prop | String | - | 否 | 表单字段名 |
| rules | Array | `[]` | 否 | 表单校验规则 |
| showConfirm | Boolean | true | 否 | 是否显示确认按钮；`radio` 模式下可关闭实现自动确认 |
| clearable | Boolean | false | 否 | 是否显示清空按钮 |
| rootPortal | Boolean | false | 否 | 是否脱离当前页面层级渲染 |
| markerSide | String | `'before'` | 否 | 必填标记位置，可选值：`before` / `after` |
| customContentClass | String | `''` | 否 | 自定义内容区样式类 |
| customLabelClass | String | `''` | 否 | 自定义标题样式类 |
| customValueClass | String | `''` | 否 | 自定义值样式类 |
| customStyle | String | `''` | 否 | 自定义根节点样式 |
| customClass | String | `''` | 否 | 自定义根节点样式类 |

### Methods

| 方法名称 | 说明 | 参数 |
|---------|------|------|
| open | 打开弹层 | - |
| close | 关闭弹层 | - |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| open | 打开弹层时触发 | - | - |
| close | 确认成功或关闭弹层时触发 | - | - |
| cancel | 取消关闭时触发 | - | - |
| change | 单 / 多选值变更时触发 | `({ value })` | 返回当前选中值 |
| confirm | 点击确认按钮或自动确认成功时触发 | `({ value, selectedItems })` | 返回选中值与选中项 |
| clear | 点击清空按钮时触发 | - | - |
| update:modelValue | 确认或清空时触发 | `(value)` | 用于同步选中值 |

### Slots

| 插槽名称 | 说明 |
|---------|------|
| default | 自定义触发区内容 |
| label | 自定义标题内容 |

## 使用示例

### 示例 1：多选模式

```vue
<template>
  <wd-select-picker
    label="选择标签"
    v-model="value"
    :columns="columns"
    type="checkbox"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(['1'])
const columns = [
  { value: '1', label: '选项一' },
  { value: '2', label: '选项二' },
  { value: '3', label: '选项三' }
]
</script>
```

### 示例 2：单选自动确认

```vue
<template>
  <wd-select-picker
    label="自动完成"
    type="radio"
    :show-confirm="false"
    v-model="value"
    :columns="columns"
    @confirm="handleConfirm"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('1')
const columns = [
  { value: '1', label: '类型一' },
  { value: '2', label: '类型二' }
]

function handleConfirm({ value }: { value: string }) {
  console.log(value)
}
</script>
```

### 示例 3：搜索与确认前校验

```vue
<template>
  <wd-select-picker
    label="可搜索"
    filterable
    v-model="value"
    :columns="columns"
    :before-confirm="beforeConfirm"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref<string[]>([])
const columns = [
  { value: '1', label: '标签一' },
  { value: '2', label: '标签二' },
  { value: '3', label: '标签三' }
]

function beforeConfirm(
  value: string | number | boolean | (string | number | boolean)[],
  resolve: (pass: boolean) => void
) {
  resolve((value as string[]).length < 3)
}
</script>
```

## 注意事项

- `checkbox` 模式下 `modelValue` 应为数组；`radio` 模式下应为单个值。
- `close` 与 `cancel` 不是同一语义：取消关闭会同时触发 `cancel` 和 `close`，确认成功只触发 `close`。
- `showConfirm=false` 仅对 `radio` 模式有意义，点击选项后会直接走确认流程。
- 搜索仅支持本地过滤，且高亮展示会临时改写展示文案结构。
- 旧文档若写成“确认按钮只在单选模式下生效”是不准确的，当前源码中 `checkbox` 始终展示确认按钮。
