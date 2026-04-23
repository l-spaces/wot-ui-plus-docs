# Code 验证码

## 组件概述

Code 验证码组件用于发送验证码时的倒计时按钮，管理"获取验证码 → 倒计时 → 重新获取"的完整流程。支持自定义各阶段按钮文案、倒计时时长、跨页面保持倒计时等功能。

## 核心功能描述

- **倒计时管理**：自动管理获取、倒计时、结束三个阶段
- **自定义文案**：支持自定义开始、进行中、结束时的按钮文案
- **保持运行**：通过 `keepRunning` 在页面切换后保持倒计时
- **唯一标识**：通过 `uniqueKey` 区分页面中多个验证码组件

## 适用业务场景

- **登录验证码**：在登录页面发送短信验证码
- **注册验证码**：在注册页面发送邮箱验证码
- **重置密码**：在找回密码页面发送验证码

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| seconds | String / Number | 60 | 否 | 倒计时时长，单位秒 |
| startText | String | '获取验证码' | 否 | 开始时按钮文字 |
| changeText | String | 'X秒重新获取' | 否 | 倒计时进行中按钮文字，X 为剩余秒数 |
| endText | String | '重新获取' | 否 | 结束时按钮文字 |
| keepRunning | Boolean | false | 否 | 是否保持倒计时不中断（如页面切换） |
| uniqueKey | String | '' | 否 | 唯一标识 key，用于区分多个验证码组件 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| click | 点击按钮时触发 | - | 触发发送验证码逻辑 |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-code :seconds="60" @click="sendCode" />
</template>

<script lang="ts" setup>
function sendCode() {
  console.log('发送验证码')
}
</script>
```

### 示例2：自定义文案

```vue
<template>
  <wd-code
    :seconds="120"
    start-text="发送验证码"
    change-text="Xs后重发"
    end-text="重新发送"
    @click="sendCode"
  />
</template>

<script lang="ts" setup>
function sendCode() {
  console.log('发送验证码')
}
</script>
```

### 示例3：保持倒计时

```vue
<template>
  <wd-code :seconds="60" keep-running unique-key="login-code" @click="sendCode" />
</template>

<script lang="ts" setup>
function sendCode() {
  console.log('发送验证码')
}
</script>
```

## 注意事项

- `changeText` 中的 `X` 会被替换为剩余秒数
- `keepRunning` 为 true 时，即使页面切换倒计时也不会中断
- `uniqueKey` 用于在 localStorage 中存储倒计时状态，确保多个验证码组件互不干扰
