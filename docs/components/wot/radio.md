# Radio 单选框

## 组件概述

Radio 单选框用于在一组选项中进行单选。由 `wd-radio` 和 `wd-radio-group` 两个组件配合使用，`wd-radio-group` 作为容器管理选中状态，`wd-radio` 作为单个选项。支持三种形状（勾选、圆点、按钮）、表单模式、同行展示、自定义选中颜色等功能。子组件的属性优先级高于父组件，可实现灵活的个性化配置。

## 核心功能描述

- **三种形状**：check（勾选）、dot（圆点）、button（按钮），默认为 check
- **表单模式**：通过 `cell` 属性启用单元格样式，适合表单页面
- **同行展示**：通过 `inline` 属性使多个单选框水平排列
- **自定义颜色**：通过 `checkedColor` 自定义选中颜色
- **尺寸控制**：支持 large 大尺寸
- **图标位置**：通过 `iconPlacement` 控制图标在左侧或右侧
- **属性继承**：子组件 wd-radio 的属性优先级高于父组件 wd-radio-group，未设置的属性自动继承父组件
- **禁用控制**：支持整体禁用和单项禁用

## 适用业务场景

- **支付方式选择**：在收银台页面使用按钮形状的单选框组选择支付方式
- **表单单选**：在信息填写页面使用表单模式的单选框组选择性别、类型等
- **筛选条件**：在筛选面板中使用同行展示的单选框组快速切换条件

## API

### RadioGroup Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | String / Number / Boolean | - | 否 | 选中项的值，支持 v-model 双向绑定 |
| shape | String | 'check' | 否 | 单选框形状，可选值：check / dot / button |
| checkedColor | String | - | 否 | 选中颜色，默认为 #4D80F0 |
| disabled | Boolean | false | 否 | 是否禁用所有单选框 |
| cell | Boolean | false | 否 | 是否启用表单模式 |
| size | String | '' | 否 | 设置大小，可选值：large |
| inline | Boolean | false | 否 | 是否同行展示 |
| iconPlacement | String | 'auto' | 否 | 图标位置，可选值：left / right / auto |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Radio Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| value | String / Number / Boolean | - | 是 | 单选框的值，选中时与 radio-group 的 modelValue 对应 |
| shape | String | - | 否 | 单选框形状，优先级高于 radio-group，可选值：check / dot / button |
| checkedColor | String | - | 否 | 选中颜色，优先级高于 radio-group |
| disabled | Boolean / null | null | 否 | 是否禁用，null 时继承 radio-group 的 disabled |
| cell | Boolean / null | null | 否 | 是否启用表单模式，null 时继承 radio-group 的 cell |
| size | String | - | 否 | 设置大小，优先级高于 radio-group，可选值：large |
| inline | Boolean / null | null | 否 | 是否同行展示，null 时继承 radio-group 的 inline |
| maxWidth | String | - | 否 | 文本最大宽度 |
| iconPlacement | String | - | 否 | 图标位置，优先级高于 radio-group，可选值：left / right / auto |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### RadioGroup Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| change | 选中项变化时触发 | ({ value: string \| number \| boolean }) | value 为当前选中项的值 |
| update:modelValue | 选中项变化时触发 | (value: string \| number \| boolean) | 用于 v-model 双向绑定 |

### Radio Slots

| 插槽名称 | 作用域参数 | 使用场景 |
|---------|-----------|---------|
| default | - | 单选框文本内容 |

## 使用示例

### 示例1：基础用法

使用 `wd-radio-group` 包裹 `wd-radio`，通过 `v-model` 绑定选中值。

```vue
<template>
  <wd-radio-group v-model="value" @change="handleChange">
    <wd-radio :value="1">单选框1</wd-radio>
    <wd-radio :value="2">单选框2</wd-radio>
  </wd-radio-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref<number>(1)

function handleChange(e: any) {
  console.log(e)
}
</script>
```

### 示例2：按钮形状与圆点形状

通过 `shape` 属性切换单选框形状，button 形状适合选项较少的场景，dot 形状一般不建议使用。

```vue
<template>
  <wd-radio-group shape="button" v-model="value1">
    <wd-radio :value="1">选项1</wd-radio>
    <wd-radio :value="2">选项2</wd-radio>
  </wd-radio-group>

  <wd-radio-group shape="dot" v-model="value2">
    <wd-radio :value="1">选项1</wd-radio>
    <wd-radio :value="2">选项2</wd-radio>
  </wd-radio-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref<number>(1)
const value2 = ref<number>(1)
</script>
```

### 示例3：表单模式

通过 `cell` 属性启用表单模式，使单选框组以单元格样式展示。

```vue
<template>
  <wd-radio-group cell v-model="value">
    <wd-radio :value="1">选项1</wd-radio>
    <wd-radio :value="2">选项2</wd-radio>
  </wd-radio-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref<number>(1)
</script>
```

表单模式下的按钮形状：

```vue
<template>
  <wd-radio-group v-model="value" cell shape="button">
    <wd-radio :value="1">选项一</wd-radio>
    <wd-radio :value="2">选项二</wd-radio>
    <wd-radio :value="3">选项三</wd-radio>
  </wd-radio-group>
</template>
```

### 示例4：同行展示与自定义颜色

通过 `inline` 属性实现同行展示，通过 `checkedColor` 自定义选中颜色。

```vue
<template>
  <wd-radio-group v-model="value1" inline>
    <wd-radio :value="1">单选框1</wd-radio>
    <wd-radio :value="2">单选框2</wd-radio>
  </wd-radio-group>

  <wd-radio-group v-model="value2" checked-color="#fa4350">
    <wd-radio :value="1">选项1</wd-radio>
    <wd-radio :value="2">选项2</wd-radio>
  </wd-radio-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref<number>(1)
const value2 = ref<number>(1)
</script>
```

## 注意事项

- `wd-radio` 必须在 `wd-radio-group` 中使用，单独使用时无法切换选中状态
- `wd-radio` 的 `value` 属性为必填项，用于标识当前选项
- 子组件 `wd-radio` 的属性优先级高于父组件 `wd-radio-group`，未设置的属性会自动继承父组件
- dot 形状容易与复选框混淆，一般情况不建议使用
- 表单模式（cell）下建议配合 `wd-radio-group` 的 cell 属性统一设置，而非单独设置每个 radio
