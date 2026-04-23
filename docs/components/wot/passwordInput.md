# PasswordInput 密码输入框

## 组件概述

PasswordInput 密码输入框组件以格子形式展示密码输入，每个字符占一个格子，默认以圆点遮盖内容。常与 NumberKeyboard 数字键盘配合使用，适用于支付密码、安全验证等场景。

## 核心功能描述

- **密码遮盖**：通过 `mask` 控制是否隐藏密码内容
- **格子间距**：通过 `gutter` 设置格子之间的间距
- **长度控制**：通过 `length` 设置密码长度
- **提示信息**：通过 `info` 和 `errorInfo` 显示提示和错误信息
- **聚焦状态**：通过 `focused` 控制是否显示光标

## 适用业务场景

- **支付密码**：在支付确认页面输入支付密码
- **安全验证**：在敏感操作前验证身份密码

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | String | '' | 否 | 绑定的值，支持 v-model 双向绑定 |
| mask | Boolean | true | 否 | 是否隐藏密码内容 |
| info | String | '' | 否 | 输入框下方文字提示 |
| errorInfo | String | '' | 否 | 输入框下方错误提示 |
| gutter | Number / String | 0 | 否 | 输入框格子之间的间距，默认单位 px |
| length | Number | 6 | 否 | 密码最大长度 |
| focused | Boolean | true | 否 | 是否已聚焦，聚焦时会显示光标 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| update:modelValue | 值变化时触发 | (value: string) | 当前输入值 |
| focus | 点击输入框时触发 | - | 用于控制键盘显示 |

## 使用示例

### 示例1：基础用法

配合 NumberKeyboard 使用。

```vue
<template>
  <wd-password-input v-model="value" :focused="showKeyboard" @focus="showKeyboard = true" />
  <wd-number-keyboard v-model="value" v-model:visible="showKeyboard" :maxlength="6" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')
const showKeyboard = ref(false)
</script>
```

### 示例2：自定义长度与间距

```vue
<template>
  <wd-password-input v-model="value" :length="4" :gutter="10" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')
</script>
```

### 示例3：显示密码与错误提示

```vue
<template>
  <wd-password-input v-model="value" :mask="false" error-info="密码错误，请重新输入" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')
</script>
```

## 注意事项

- 通常与 `wd-number-keyboard` 配合使用，点击密码输入框时显示键盘
- `mask` 为 false 时直接显示输入内容
- `errorInfo` 不为空时会以红色显示，优先级高于 `info`
- `focused` 控制光标显示，需与键盘的 visible 状态同步
