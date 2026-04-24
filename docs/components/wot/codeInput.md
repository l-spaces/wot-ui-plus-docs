# CodeInput 验证码输入框

## 组件概况

CodeInput 验证码输入框组件用于输入短信或邮箱验证码，以格子形式展示每个字符。支持盒子模式和底部横线模式，可自定义格子数量、间距、样式等。常与 Code 验证码组件配合使用。

## 核心功能描述

- **两种模式**：box（盒子模式）、line（底部横线模式）
- **圆点填充**：通过 `dot` 用圆点替代输入内容，增强安全性
- **自动聚焦**：通过 `focus` 自动获取焦点
- **自定义样式**：支持自定义大小、间距、颜色、边框等
- **隐藏原生键盘**：通过 `disabledKeyboard` 隐藏原生键盘，配合自定义键盘使用
- **禁止点号**：通过 `disabledDot` 禁止输入 "." 符号

## 适用业务场景

- **短信验证码**：在登录/注册页面输入4-6位短信验证码
- **邮箱验证码**：在邮箱验证页面输入验证码
- **支付密码**：配合自定义键盘输入支付密码

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | String / Number | '' | 否 | 预置值，支持 v-model 双向绑定 |
| type | String | 'number' | 否 | 输入框类型 |
| maxlength | Number | 6 | 否 | 最大输入长度 |
| dot | Boolean | false | 否 | 是否用圆点填充 |
| mode | String | 'box' | 否 | 显示模式，可选值：box / line |
| hairline | Boolean | false | 否 | 是否细边框 |
| space | String / Number | 10 | 否 | 字符间的距离 |
| focus | Boolean | false | 否 | 是否自动获取焦点 |
| bold | Boolean | false | 否 | 字体是否加粗 |
| color | String | '#606266' | 否 | 字体颜色 |
| fontSize | String / Number | 18 | 否 | 字体大小 |
| size | String / Number | 35 | 否 | 输入框的大小 |
| disabledKeyboard | Boolean | false | 否 | 是否隐藏原生键盘 |
| borderColor | String | '#e4e7ed' | 否 | 边框和线条颜色 |
| disabledDot | Boolean | true | 否 | 是否禁止输入 "." 符号 |
| bgColor | String | '' | 否 | 背景颜色 |
| round | String / Number | 4 | 否 | 圆角值 |
| confirmType | String | 'done' | 否 | 键盘右下角按钮文字 |
| confirmHold | Boolean | false | 否 | 点击键盘右下角按钮时是否保持键盘不收起 |
| adjustPosition | Boolean | true | 否 | 键盘弹起时是否自动上推页面 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| update:modelValue | 值变化时触发 | (value: string) | 当前输入值 |
| change | 值变化时触发 | (value: string) | 当前输入值 |
| finish | 输入完成时触发 | (value: string) | 最终输入值 |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-code-input v-model="value" :maxlength="6" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')
</script>
```

### 示例2：底部横线模式与圆点填充

```vue
<template>
  <wd-code-input v-model="value" :maxlength="4" mode="line" dot />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')
</script>
```

### 示例3：配合自定义键盘

```vue
<template>
  <wd-code-input v-model="value" :maxlength="6" disabled-keyboard @finish="onFinish" />
  <wd-number-keyboard v-model="value" v-model:visible="showKeyboard" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')
const showKeyboard = ref(true)

function onFinish(value: string) {
  console.log('输入完成:', value)
}
</script>
```

## 注意事项

- 输入完成（达到 maxlength）时会触发 `finish` 事件
- `disabledKeyboard` 为 true 时隐藏原生键盘，需配合自定义键盘使用
- `dot` 模式下输入内容以圆点显示，适合密码输入场景
- `disabledDot` 默认为 true，禁止输入 "." 符号，避免验证码中包含点号
