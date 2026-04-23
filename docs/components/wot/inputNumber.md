# InputNumber 数字输入框

## 组件概述

InputNumber 数字输入框组件用于数字的输入和调整，由减号按钮、输入框和加号按钮三部分组成。支持步进设置、精度控制、严格步进模式、最小最大值限制、长按加减、异步变更拦截等功能。可隐藏输入框仅保留加减按钮，适用于购物车数量调整、参数配置等场景。

## 核心功能描述

- **步进控制**：通过 `step` 设置步进值，支持小数步进
- **精度控制**：通过 `precision` 设置小数精度
- **严格步进**：通过 `stepStrictly` 强制值为步进的倍数
- **范围限制**：通过 `min` 和 `max` 限制数值范围
- **禁用控制**：支持整体禁用、单独禁用输入框/减号/加号
- **无输入框模式**：通过 `withoutInput` 隐藏输入框
- **允许空值**：通过 `allowNull` 允许输入框为空
- **长按加减**：通过 `longPress` 开启长按快速加减
- **异步变更**：通过 `beforeChange` 拦截值变更，支持异步校验
- **立即/延迟更新**：通过 `immediateChange` 控制输入时是否立即更新
- **初始化修正**：通过 `updateOnInit` 控制是否自动修正初始值

## 适用业务场景

- **购物车数量**：在购物车页面调整商品数量，配合 min/max 限制
- **参数配置**：在设置页面调整数值参数，配合精度和步进控制
- **人数选择**：在预订页面选择人数，配合严格步进和范围限制

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | Number / String | - | 是 | 绑定值，支持 v-model 双向绑定 |
| min | Number | 1 | 否 | 最小值 |
| max | Number | Number.MAX_SAFE_INTEGER | 否 | 最大值 |
| step | Number | 1 | 否 | 步进值 |
| stepStrictly | Boolean | false | 否 | 是否严格按照步进值递增或递减 |
| precision | Number / String | 0 | 否 | 数值精度，小数位数 |
| disabled | Boolean | false | 否 | 是否整体禁用 |
| disableInput | Boolean | false | 否 | 是否禁用输入框 |
| disableMinus | Boolean | false | 否 | 是否禁用减号按钮 |
| disablePlus | Boolean | false | 否 | 是否禁用加号按钮 |
| withoutInput | Boolean | false | 否 | 是否不显示输入框 |
| inputWidth | Number / String | 36 | 否 | 输入框宽度 |
| allowNull | Boolean | false | 否 | 是否允许为空 |
| placeholder | String | '' | 否 | 输入框占位符 |
| adjustPosition | Boolean | true | 否 | 键盘弹起时是否自动上推页面 |
| beforeChange | Function | - | 否 | 值变化前的回调函数，返回 false 可阻止变化，支持返回 Promise |
| longPress | Boolean | false | 否 | 是否开启长按加减手势 |
| immediateChange | Boolean | true | 否 | 是否立即响应输入变化，false 时仅在失焦和按钮点击时更新 |
| updateOnInit | Boolean | true | 否 | 是否在初始化时自动修正 v-model 值 |
| inputType | String | 'digit' | 否 | 输入框类型，可选值：number / digit |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| change | 数值变化时触发 | ({ value: number \| string }) | value 为当前值 |
| update:modelValue | 数值变化时触发 | (value: number \| string) | 用于 v-model 双向绑定 |
| focus | 输入框聚焦时触发 | (detail: Object) | 原生 focus 事件详情 |
| blur | 输入框失焦时触发 | ({ value: string \| number }) | value 为当前输入值 |

## 使用示例

### 示例1：基础用法

通过 `v-model` 双向绑定数值，默认步进为 1。

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

### 示例2：步长与范围限制

通过 `step` 设置步进值，通过 `min` 和 `max` 限制范围。

```vue
<template>
  <wd-input-number v-model="value1" :step="2" />
  <wd-input-number v-model="value2" :min="3" :max="10" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref<number>(1)
const value2 = ref<number>(1)
</script>
```

### 示例3：精度与严格步进

通过 `precision` 设置小数精度，通过 `stepStrictly` 强制值为步进的倍数。

```vue
<template>
  <wd-input-number v-model="value1" :precision="1" :step="0.1" />
  <wd-input-number v-model="value2" step-strictly :step="2" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref<string>('1.2')
const value2 = ref<number>(1)
</script>
```

### 示例4：无输入框与异步变更

通过 `withoutInput` 隐藏输入框，通过 `beforeChange` 实现异步变更拦截。

```vue
<template>
  <view class="flex">
    <view>数量：{{ value1 }}</view>
    <wd-input-number v-model="value1" without-input />
  </view>

  <wd-input-number v-model="value2" :before-change="beforeChange" />
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

允许空值和长按加减：

```vue
<template>
  <wd-input-number v-model="value1" allow-null placeholder="不限" input-width="70px" />
  <wd-input-number v-model="value2" long-press />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref<string>('')
const value2 = ref<number>(1)
</script>
```

## 注意事项

- 默认最小值为 1，如需从 0 开始需显式设置 `min="0"`
- `stepStrictly` 模式下，输入的值会被自动修正为最接近的步进倍数
- `allowNull` 为 false 时，清空输入框后失焦会自动修正为最小值
- `immediateChange` 为 false 时，输入框输入不会立即触发 change 事件，仅在失焦或按钮点击时更新
- `beforeChange` 返回 false 或 Promise\<false\> 可阻止值变更
- 长按加减会在 600ms 后开始，之后每 250ms 触发一次
- `updateOnInit` 为 true 时，初始化会自动修正 v-model 值（如超出范围或不符合步进）
