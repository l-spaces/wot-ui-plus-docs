# Checkbox 复选框

## 组件概述

Checkbox 复选框用于在一组选项中进行多选。由 `wd-checkbox` 和 `wd-checkbox-group` 两个组件配合使用，`wd-checkbox-group` 作为容器管理选中状态，`wd-checkbox` 作为单个选项。支持三种形状（圆形、方形、按钮）、表单模式、同行展示、自定义选中颜色、半选状态等功能。可单独使用或组合使用，单独使用时通过 `trueValue` 和 `falseValue` 控制选中/未选中的值。

## 核心功能描述

- **三种形状**：circle（圆形）、square（方形）、button（按钮），默认为 circle
- **单独使用**：不依赖 checkbox-group，通过 v-model 和 trueValue/falseValue 控制
- **组合使用**：配合 checkbox-group 实现多选，通过 modelValue 数组管理选中项
- **表单模式**：通过 `cell` 属性启用单元格样式
- **同行展示**：通过 `inline` 属性使多个复选框水平排列
- **选中数量限制**：通过 `min` 和 `max` 控制最小和最大选中数量
- **半选状态**：通过 `indeterminate` 属性显示部分选中状态
- **自定义颜色**：通过 `checkedColor` 自定义选中颜色
- **toggle 方法**：通过 ref 调用 toggle 方法可程序化切换选中状态

## 适用业务场景

- **兴趣标签选择**：在用户注册页面使用按钮形状的复选框组选择多个兴趣标签
- **权限配置**：在后台管理系统中使用复选框组配置用户权限，配合 min/max 限制选择数量
- **协议确认**：在表单页面单独使用复选框确认用户协议，结合 Cell 组件实现点击整行切换

## API

### CheckboxGroup Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | Array | [] | 否 | 选中项的值数组，支持 v-model 双向绑定 |
| shape | String | 'circle' | 否 | 复选框形状，可选值：circle / square / button |
| checkedColor | String | - | 否 | 选中颜色 |
| disabled | Boolean | false | 否 | 是否禁用所有复选框 |
| min | Number | 0 | 否 | 最小选中数量 |
| max | Number | 0 | 否 | 最大选中数量，0 表示不限制 |
| cell | Boolean | false | 否 | 是否启用表单模式 |
| inline | Boolean | false | 否 | 是否同行展示 |
| size | String | - | 否 | 设置大小，可选值：large |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Checkbox Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | String / Number / Boolean | false | 是 | 复选框的值，在 checkbox-group 中为标识符；单独使用时为选中状态 |
| shape | String | - | 否 | 复选框形状，优先级高于 checkbox-group，可选值：circle / square / button |
| checkedColor | String | - | 否 | 选中颜色，优先级高于 checkbox-group |
| disabled | Boolean / null | null | 否 | 是否禁用，null 时继承 checkbox-group 的 disabled |
| trueValue | String / Number / Boolean | true | 否 | 选中时的值，单独使用时有效，需与 falseValue 一同使用 |
| falseValue | String / Number / Boolean | false | 否 | 未选中时的值，单独使用时有效，需与 trueValue 一同使用 |
| indeterminate | Boolean | false | 否 | 半选中状态 |
| size | String | - | 否 | 设置大小，优先级高于 checkbox-group，可选值：large |
| maxWidth | String | - | 否 | 文字位置最大宽度 |
| customLabelClass | String | '' | 否 | 自定义标签样式类 |
| customShapeClass | String | '' | 否 | 自定义形状样式类 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### CheckboxGroup Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| change | 选中项变化时触发 | ({ value: Array }) | value 为当前选中项的值数组 |
| update:modelValue | 选中项变化时触发 | (value: Array) | 用于 v-model 双向绑定 |

### Checkbox Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| change | 选中状态变化时触发 | ({ value: boolean \| string \| number }) | 单独使用时 value 为切换后的值；在组内使用时 value 为是否选中 |
| update:modelValue | 选中状态变化时触发 | (value: boolean \| string \| number) | 用于 v-model 双向绑定 |

### Checkbox Methods

| 方法名称 | 参数 | 返回值 | 说明 |
|---------|------|--------|------|
| toggle | - | void | 切换当前选中状态 |

### Checkbox Slots

| 插槽名称 | 作用域参数 | 使用场景 |
|---------|-----------|---------|
| default | - | 复选框文本内容 |

## 使用示例

### 示例1：基础用法

单独使用复选框，通过 `v-model` 绑定选中状态。

```vue
<template>
  <wd-checkbox v-model="checked">沃特</wd-checkbox>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checked = ref<boolean>(true)
</script>
```

### 示例2：复选框组

使用 `wd-checkbox-group` 包裹多个 `wd-checkbox`，通过 `v-model` 绑定选中项数组。

```vue
<template>
  <wd-checkbox-group v-model="value">
    <wd-checkbox :modelValue="1">沃特</wd-checkbox>
    <wd-checkbox :modelValue="2">商家后台</wd-checkbox>
  </wd-checkbox-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref<number[]>([])
</script>
```

修改形状为方形和按钮：

```vue
<template>
  <wd-checkbox v-model="checked1" shape="square">沃特</wd-checkbox>
  <wd-checkbox v-model="checked2" shape="button">沃特</wd-checkbox>
</template>
```

### 示例3：表单模式与按钮组

通过 `cell` 属性启用表单模式，配合 `shape="button"` 实现表单按钮组。

```vue
<template>
  <wd-checkbox-group v-model="value" cell>
    <wd-checkbox :modelValue="1">沃特</wd-checkbox>
    <wd-checkbox :modelValue="2">商家后台</wd-checkbox>
  </wd-checkbox-group>

  <wd-checkbox-group v-model="value2" cell shape="button">
    <wd-checkbox :modelValue="1" disabled>选项一</wd-checkbox>
    <wd-checkbox :modelValue="2">选项二</wd-checkbox>
    <wd-checkbox :modelValue="3">选项三</wd-checkbox>
  </wd-checkbox-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref<number[]>([1])
const value2 = ref<number[]>([1])
</script>
```

### 示例4：选中数量限制与自定义值

通过 `min` 和 `max` 限制选中数量，通过 `trueValue` 和 `falseValue` 自定义选中值。

```vue
<template>
  <wd-checkbox-group v-model="value" :min="1" :max="3" cell>
    <wd-checkbox :modelValue="1">京东</wd-checkbox>
    <wd-checkbox :modelValue="2">沃特</wd-checkbox>
    <wd-checkbox :modelValue="3">商家后台</wd-checkbox>
    <wd-checkbox :modelValue="4">营销中心</wd-checkbox>
  </wd-checkbox-group>

  <wd-checkbox v-model="value2" true-value="沃特" false-value="商家后台" @change="handleChange">复选框</wd-checkbox>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref<number[]>([1])
const value2 = ref<string>('沃特')

function handleChange(e: any) {
  console.log(e)
}
</script>
```

通过 ref 调用 toggle 方法结合 Cell 使用：

```vue
<template>
  <wd-cell-group border>
    <wd-checkbox-group v-model="value" size="large">
      <wd-cell title="点赞" center clickable @click="handleCheck1">
        <view @click.stop="noop">
          <wd-checkbox model-value="1" ref="checkBox1" custom-style="margin:0;"></wd-checkbox>
        </view>
      </wd-cell>
      <wd-cell title="投币" center clickable @click="handleCheck2">
        <view @click.stop="noop">
          <wd-checkbox model-value="2" ref="checkBox2" custom-style="margin:0;"></wd-checkbox>
        </view>
      </wd-cell>
    </wd-checkbox-group>
  </wd-cell-group>
</template>

<script lang="ts" setup>
import type { CheckboxInstance } from '@/uni_modules/wot-ui-plus/components/wd-checkbox/types'
import { ref } from 'vue'

const checkBox1 = ref<CheckboxInstance>()
const checkBox2 = ref<CheckboxInstance>()
const value = ref<string[]>([])

function handleCheck1() {
  checkBox1.value && checkBox1.value.toggle()
}
function handleCheck2() {
  checkBox2.value && checkBox2.value.toggle()
}
function noop() {}
</script>
```

## 注意事项

- 在 `wd-checkbox-group` 中使用时，`wd-checkbox` 的 `modelValue` 作为标识符，不可重复
- 单独使用时 `modelValue` 为必填项，且 `trueValue` 和 `falseValue` 需配合使用
- 当达到 `max` 限制时，未选中的复选框会自动禁用；当达到 `min` 限制时，已选中的复选框会自动禁用
- `wd-checkbox-group` 的 `modelValue` 数组中不允许包含重复元素
- 子组件的 `disabled` 属性优先级高于父组件，设为 `null` 时继承父组件，设为 `true/false` 时使用自身值
