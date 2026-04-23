# CountDown 倒计时

## 组件概述

CountDown 倒计时组件用于倒计时场景，支持毫秒级精度、自定义格式、自动开始等功能。常用于限时秒杀、订单支付、验证码重发等场景。

## 核心功能描述

- **毫秒级精度**：`millisecond` 开启毫秒级渲染
- **自定义格式**：`format` 支持 DD/HH/mm/ss/SS 占位符
- **自动开始**：`autostart` 控制是否自动开始倒计时
- **方法控制**：`start`、`pause`、`reset` 三个方法手动控制
- **实时回调**：`change` 事件实时返回剩余时间数据

## 适用业务场景

- **限时秒杀**：展示活动剩余倒计时
- **订单支付**：展示支付剩余时间
- **验证码重发**：展示重新发送验证码的等待时间

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| time | Number | 0 | 是 | 倒计时时长，单位毫秒 |
| millisecond | Boolean | false | 否 | 是否开启毫秒级渲染 |
| autostart | Boolean | true | 否 | 是否自动开始 |
| format | String | 'HH:mm:ss' | 否 | 时间格式 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Methods

| 方法名称 | 参数 | 返回值 | 说明 |
|---------|------|--------|------|
| start | - | void | 开始倒计时 |
| pause | - | void | 暂停倒计时 |
| reset | - | void | 重置倒计时 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| change | 倒计时变化时触发 | ({ days, hours, minutes, seconds, milliseconds }) | 当前时间数据 |
| finish | 倒计时结束时触发 | - | - |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-count-down :time="3600000" />
</template>
```

设置1小时倒计时，默认格式 HH:mm:ss，自动开始。

### 示例2：自定义格式

```vue
<template>
  <wd-count-down :time="86400000" format="DD天HH时mm分ss秒" />
  <wd-count-down :time="3600000" millisecond format="HH:mm:ss:SS" />
</template>
```

自定义时间格式，支持 DD（天）、HH（时）、mm（分）、ss（秒）、SS（毫秒）占位符。

### 示例3：手动控制

```vue
<template>
  <wd-count-down ref="countDown" :time="60000" :autostart="false" @finish="onFinish" />
  <wd-button size="small" @click="start">开始</wd-button>
  <wd-button size="small" @click="pause">暂停</wd-button>
  <wd-button size="small" @click="reset">重置</wd-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const countDown = ref()

function start() {
  countDown.value?.start()
}
function pause() {
  countDown.value?.pause()
}
function reset() {
  countDown.value?.reset()
}
function onFinish() {
  console.log('倒计时结束')
}
</script>
```

`autostart` 设为 false 不自动开始，通过 `start`、`pause`、`reset` 方法手动控制倒计时。

## 注意事项

- `time` 单位为毫秒
- `format` 支持的占位符：DD（天）、HH（时）、mm（分）、ss（秒）、SS（毫秒）
- `millisecond` 开启后渲染频率更高，注意性能影响
- `reset` 方法会重置倒计时并停止，需要调用 `start` 重新开始
- `finish` 事件仅在倒计时自然结束时触发，手动暂停不会触发
