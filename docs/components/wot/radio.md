# Radio 单选框

## 组件概况

Radio 单选框组件用于单选场景，由 `wd-radio-group` 和 `wd-radio` 组合使用。组件支持勾选、圆点、按钮三种形态，支持单元格模式、同行布局和图标位置调整，适用于支付方式、筛选条件和表单单选项。

## 核心功能描述

- **三种形态**：支持 `check / dot / button`
- **组内单选**：通过 `wd-radio-group` 统一维护当前选中值
- **展示方式控制**：支持 `inline`、`cell` 和 `iconPlacement`
- **父子继承**：子项未显式配置时继承组配置

## 适用业务场景

- **支付方式**：按钮态单选
- **选项切换**：同行排列的筛选条件
- **表单录入**：列表式单选项

## API

### RadioGroup Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | String / Number / Boolean | - | 否 | 当前选中值，支持 `v-model` |
| shape | String | `'check'` | 否 | 形态，可选值：`check` / `dot` / `button` |
| checkedColor | String | - | 否 | 选中颜色 |
| disabled | Boolean | false | 否 | 是否整体禁用 |
| cell | Boolean | false | 否 | 是否启用单元格模式 |
| size | String | `''` | 否 | 尺寸 |
| inline | Boolean | false | 否 | 是否同行展示 |
| iconPlacement | String | `'auto'` | 否 | 图标位置，可选值：`left` / `right` / `auto` |
| customStyle | String | `''` | 否 | 自定义根节点样式 |
| customClass | String | `''` | 否 | 自定义根节点样式类 |

### Radio Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| value | String / Number / Boolean | - | 是 | 当前选项的唯一值 |
| shape | String | - | 否 | 形态，优先级高于组 |
| checkedColor | String | - | 否 | 选中颜色，优先级高于组 |
| disabled | Boolean / null | null | 否 | 是否禁用；`null` 时继承组配置 |
| cell | Boolean / null | null | 否 | 是否单元格模式；`null` 时继承组配置 |
| size | String | - | 否 | 尺寸，优先级高于组 |
| inline | Boolean / null | null | 否 | 是否同行展示；`null` 时继承组配置 |
| maxWidth | String | - | 否 | 文本最大宽度 |
| iconPlacement | String | - | 否 | 图标位置，优先级高于组 |
| customStyle | String | `''` | 否 | 自定义根节点样式 |
| customClass | String | `''` | 否 | 自定义根节点样式类 |

### RadioGroup Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| change | 当前选中项变化时触发 | `({ value })` | 返回当前选中值 |
| update:modelValue | 当前选中项变化时触发 | `(value: string \| number \| boolean)` | 用于同步选中值 |

### Radio Slots

| 插槽名称 | 说明 |
|---------|------|
| default | 单选框文本内容 |

## 使用示例

### 示例 1：基础用法

```vue
<template>
  <wd-radio-group v-model="value" @change="handleChange">
    <wd-radio :value="1">单选框 1</wd-radio>
    <wd-radio :value="2">单选框 2</wd-radio>
  </wd-radio-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref<number>(1)

function handleChange({ value }: { value: number }) {
  console.log(value)
}
</script>
```

### 示例 2：按钮形态与单元格模式

```vue
<template>
  <wd-radio-group v-model="value1" shape="button">
    <wd-radio :value="1">选项 1</wd-radio>
    <wd-radio :value="2">选项 2</wd-radio>
  </wd-radio-group>

  <wd-radio-group v-model="value2" cell>
    <wd-radio :value="1">选项 1</wd-radio>
    <wd-radio :value="2">选项 2</wd-radio>
  </wd-radio-group>
</template>
```

### 示例 3：同行展示与图标位置

```vue
<template>
  <wd-radio-group v-model="value" inline shape="dot" icon-placement="right">
    <wd-radio :value="1">单选框 1</wd-radio>
    <wd-radio :value="2">单选框 2</wd-radio>
  </wd-radio-group>
</template>
```

## 注意事项

- `wd-radio` 当前必须与 `wd-radio-group` 搭配使用，子组件本身不直接抛出更新事件。
- 组件的单选值由 `wd-radio-group` 统一通过 `update:modelValue` 与 `change` 对外同步。
- `wd-radio` 的 `value` 是必填项。
- `dot` 与 `button` 只是展示形态变化，不影响选中值模型。
