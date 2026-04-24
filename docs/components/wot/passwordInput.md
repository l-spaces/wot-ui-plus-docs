# PasswordInput 密码输入框

## 组件概况

PasswordInput 密码输入框组件以格子形式展示密码输入状态，每个字符占一个格子，默认以圆点遮盖内容。它通常与 `wd-number-keyboard` 搭配使用，适用于支付密码、安全校验等场景。

## 核心功能描述

- **密码遮盖**：通过 `mask` 控制是否隐藏输入内容。
- **格子间距**：通过 `gutter` 调整每个输入格子的间隔。
- **长度控制**：通过 `length` 控制展示的密码位数。
- **提示信息**：通过 `info`、`errorInfo` 显示普通提示与错误提示。
- **焦点光标**：通过 `focused` 控制是否显示当前输入位置的光标。

## 适用业务场景

- **支付密码输入**：与数字键盘配合完成支付密码录入。
- **安全校验**：用于验证码、PIN 码、二次验证密码等场景。

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | String | `''` | 否 | 当前展示的密码值。 |
| mask | Boolean | true | 否 | 是否以圆点遮盖内容。 |
| info | String | `''` | 否 | 普通提示文案。 |
| errorInfo | String | `''` | 否 | 错误提示文案，优先级高于 `info`。 |
| gutter | Number / String | 0 | 否 | 格子之间的间距，默认单位为 `px`。 |
| length | Number | 6 | 否 | 密码位数。 |
| focused | Boolean | true | 否 | 是否处于聚焦状态，聚焦时显示光标。 |
| customStyle | String | `''` | 否 | 自定义根节点样式。 |
| customClass | String | `''` | 否 | 自定义根节点样式类。 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调说明 |
|---------|---------|---------|---------|
| focus | 点击组件时触发 | `(event: Event)` | 用于配合外部键盘控制显示。 |

## 使用示例

### 示例1：基础用法

通常与 `wd-number-keyboard` 配合使用，由键盘更新实际密码值。

```vue
<template>
  <wd-password-input v-model="value" :focused="visible" @focus="visible = true" />
  <wd-number-keyboard v-model="value" v-model:visible="visible" :maxlength="6" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('123')
const visible = ref(true)
</script>
```

### 示例2：自定义长度与间距

```vue
<template>
  <wd-password-input v-model="value1" :length="4" :focused="visible1" @focus="visible1 = true" />
  <wd-number-keyboard v-model="value1" v-model:visible="visible1" :maxlength="4" />

  <wd-password-input v-model="value2" :gutter="10" :focused="visible2" @focus="visible2 = true" />
  <wd-number-keyboard v-model="value2" v-model:visible="visible2" :maxlength="6" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref('123')
const value2 = ref('123')
const visible1 = ref(false)
const visible2 = ref(false)
</script>
```

### 示例3：明文展示与错误提示

```vue
<template>
  <wd-password-input v-model="value1" :mask="false" :focused="visible1" @focus="visible1 = true" />
  <wd-number-keyboard v-model="value1" v-model:visible="visible1" :maxlength="6" />

  <wd-password-input
    v-model="value2"
    info="密码为 6 位数字"
    :error-info="errorInfo"
    :focused="visible2"
    @focus="visible2 = true"
  />
  <wd-number-keyboard v-model="value2" v-model:visible="visible2" :maxlength="6" />
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

const value1 = ref('123')
const value2 = ref('123')
const visible1 = ref(false)
const visible2 = ref(false)
const errorInfo = ref('')

watch(value2, (newValue) => {
  errorInfo.value = newValue.length === 6 && newValue !== '123456' ? '密码错误' : ''
})
</script>
```

## 注意事项

- 组件本身只负责展示输入状态，不负责产生输入值，通常需要配合 `wd-number-keyboard` 使用。
- 组件不会主动触发 `update:modelValue`，密码值应由外部键盘或业务逻辑更新。
- `errorInfo` 不为空时会覆盖 `info` 显示。
- `focused` 只控制光标展示状态，不会主动拉起键盘。
