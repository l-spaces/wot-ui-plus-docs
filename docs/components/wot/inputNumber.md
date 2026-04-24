# InputNumber 数字输入框

## 组件概况

InputNumber 数字输入框组件用于数字的输入和调整，由减号按钮、输入框和加号按钮三部分组成。支持步进设置、精度控制、严格步进模式、最小最大值限制、长按加减、异步变更拦截等能力，适用于购物车数量调整、参数配置等场景。

## 核心功能描述

- **步进控制**：通过 `step` 设置步进值，支持小数步进。
- **精度控制**：通过 `precision` 设置小数位数。
- **严格步进**：通过 `stepStrictly` 强制值按步进倍数修正。
- **范围限制**：通过 `min` 和 `max` 限制输入范围。
- **输入与按钮禁用**：支持整体禁用、单独禁用输入框、减号按钮、加号按钮。
- **无输入框模式**：通过 `withoutInput` 隐藏中间输入框，仅保留加减按钮。
- **空值支持**：通过 `allowNull` 允许组件值为空字符串。
- **输入提交策略**：通过 `immediateChange` 控制输入时是否立即同步到 `v-model`。
- **初始化修正**：通过 `updateOnInit` 控制是否在初始化时自动修正并同步非法初始值。
- **变更拦截**：通过 `beforeChange` 在变更前进行同步或异步校验。

## 适用业务场景

- **购物车数量调整**：在购物车页面调整商品数量，并配合 `min` / `max` 控制范围。
- **参数配置**：在设置页调整数值参数，并配合精度和步进约束。
- **人数或份数选择**：在预订、点餐等场景中快速调整数量。

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | Number / String | - | 是 | 绑定值，支持 `v-model`。 |
| min | Number | 1 | 否 | 最小值。 |
| max | Number | `Number.MAX_SAFE_INTEGER` | 否 | 最大值。 |
| step | Number | 1 | 否 | 步进值。 |
| stepStrictly | Boolean | false | 否 | 是否按步进倍数严格修正。 |
| precision | Number / String | 0 | 否 | 小数精度。 |
| disabled | Boolean | false | 否 | 是否整体禁用。 |
| disableInput | Boolean | false | 否 | 是否禁用输入框。 |
| disableMinus | Boolean | false | 否 | 是否禁用减号按钮。 |
| disablePlus | Boolean | false | 否 | 是否禁用加号按钮。 |
| withoutInput | Boolean | false | 否 | 是否隐藏输入框。 |
| inputWidth | Number / String | 36 | 否 | 输入框宽度。 |
| allowNull | Boolean | false | 否 | 是否允许空值。 |
| placeholder | String | `''` | 否 | 输入框占位文本。 |
| adjustPosition | Boolean | true | 否 | 键盘弹起时是否自动上推页面。 |
| beforeChange | `(value: number \| string) => boolean \| Promise<boolean>` | - | 否 | 值变更前的拦截函数。返回 `false` 或 `Promise<false>` 时阻止更新。 |
| longPress | Boolean | false | 否 | 是否开启长按加减。 |
| immediateChange | Boolean | true | 否 | 是否在输入过程中立即同步变更。 |
| updateOnInit | Boolean | true | 否 | 是否在初始化时自动修正非法初始值并同步到外部。 |
| inputType | String | `'digit'` | 否 | 输入框类型，可选值：`number`、`digit`。 |
| customStyle | String | `''` | 否 | 自定义根节点样式。 |
| customClass | String | `''` | 否 | 自定义根节点样式类。 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调说明 |
|---------|---------|---------|---------|
| change | 值变更时触发 | `({ value: number \| string })` | 当前组件值。 |
| update:modelValue | 值变更时触发 | `(value: number \| string)` | 用于 `v-model` 双向绑定。 |
| focus | 输入框聚焦时触发 | `(detail: any)` | 原生 `focus` 事件详情。 |
| blur | 输入框失焦时触发 | `({ value: string \| number })` | 当前输入框值。 |

## 使用示例

### 示例1：基础用法

通过 `v-model` 绑定数值。

```vue
<template>
  <wd-input-number v-model="value" @change="handleChange" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref<number>(1)

function handleChange({ value }: { value: number | string }) {
  console.log(value)
}
</script>
```

### 示例2：步进、范围与精度

```vue
<template>
  <wd-input-number v-model="value1" :step="2" />
  <wd-input-number v-model="value2" :min="3" :max="10" />
  <wd-input-number v-model="value3" :precision="1" :step="0.1" />
  <wd-input-number v-model="value4" step-strictly :step="2" :min="3" :max="15" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref<number>(1)
const value2 = ref<number>(3)
const value3 = ref<string>('1.2')
const value4 = ref<number>(4)
</script>
```

### 示例3：无输入框、空值与非立即更新

```vue
<template>
  <view class="row">
    <text>数量：{{ count }}</text>
    <wd-input-number v-model="count" without-input />
  </view>

  <wd-input-number v-model="nullableValue" allow-null placeholder="不限" input-width="70px" />
  <wd-input-number v-model="lazyValue" :immediate-change="false" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const count = ref<number>(1)
const nullableValue = ref<string>('')
const lazyValue = ref<number>(1)
</script>
```

### 示例4：异步拦截与长按加减

```vue
<template>
  <wd-input-number v-model="value1" :before-change="beforeChange" />
  <wd-input-number v-model="value2" long-press />
</template>

<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-ui-plus'
import type { InputNumberBeforeChange } from '@/uni_modules/wot-ui-plus/components/wd-input-number/types'
import { ref } from 'vue'

const { loading, close } = useToast()

const value1 = ref<number>(1)
const value2 = ref<number>(1)

const beforeChange: InputNumberBeforeChange = (value) => {
  loading({ msg: '正在更新到 ' + value })
  return new Promise((resolve) => {
    setTimeout(() => {
      close()
      resolve(true)
    }, 500)
  })
}
</script>
```

## 注意事项

- 默认最小值为 `1`，如需从 `0` 开始必须显式设置 `min="0"`。
- `beforeChange` 使用返回值控制是否继续更新，不是 `resolve` 回调风格。
- `stepStrictly` 开启后，组件会按步进倍数和边界规则自动修正输入值。
- `allowNull` 为 `false` 时，输入框可以短暂清空，但失焦后会被修正为合法值。
- `immediateChange` 为 `false` 时，仅在失焦或点击加减按钮后才会同步 `v-model` 和触发 `change`。
- `updateOnInit` 为 `true` 时，初始化阶段可能主动触发一次 `update:modelValue`，用于修正非法初始值。
- 长按加减会在按下约 `600ms` 后开始重复触发，之后按约 `250ms` 的间隔持续执行。
