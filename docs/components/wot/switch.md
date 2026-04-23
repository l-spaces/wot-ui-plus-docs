# Switch 开关

## 组件概述

Switch 开关组件用于在两种状态之间切换，支持自定义激活/非激活值、自定义颜色、尺寸调整和异步变更拦截。适用于设置页面的开关选项、表单中的布尔值选择等场景。

## 核心功能描述

- **自定义值**：通过 `activeValue` 和 `inactiveValue` 自定义激活和非激活的值
- **自定义颜色**：通过 `activeColor` 和 `inactiveColor` 自定义激活和非激活的颜色
- **圆点颜色**：通过 `circleColor` 自定义开关圆点的颜色
- **尺寸调整**：通过 `size` 调整开关大小
- **异步变更**：通过 `beforeChange` 拦截状态变更，支持异步校验
- **禁用状态**：通过 `disabled` 禁用开关
- **自动修正**：初始化时如果值不匹配 activeValue 或 inactiveValue，自动修正为 inactiveValue

## 适用业务场景

- **设置开关**：在设置页面控制通知、推送等功能的开关
- **表单布尔值**：在表单中使用开关替代复选框表示是否同意等
- **状态切换**：在列表项中使用开关控制启用/禁用状态

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | Boolean / String / Number | false | 是 | 绑定值，支持 v-model 双向绑定 |
| disabled | Boolean | false | 否 | 是否禁用 |
| activeValue | Boolean / String / Number | true | 否 | 激活时的值 |
| inactiveValue | Boolean / String / Number | false | 否 | 非激活时的值 |
| activeColor | String | - | 否 | 激活颜色 |
| inactiveColor | String | - | 否 | 非激活颜色 |
| circleColor | String | - | 否 | 圆点颜色 |
| size | Number / String | - | 否 | 开关大小 |
| beforeChange | Function | - | 否 | 状态变更前的回调函数，接收 { value, resolve } 参数，调用 resolve(true) 允许变更，resolve(false) 阻止变更 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| change | 开关状态变化时触发 | ({ value: boolean \| string \| number }) | value 为切换后的值 |
| update:modelValue | 开关状态变化时触发 | (value: boolean \| string \| number) | 用于 v-model 双向绑定 |

## 使用示例

### 示例1：基础用法

通过 `v-model` 双向绑定开关状态。

```vue
<template>
  <wd-switch v-model="value" @change="handleChange" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref<boolean>(false)

function handleChange({ value }: { value: boolean }) {
  console.log(value)
}
</script>
```

### 示例2：自定义颜色与大小

通过 `activeColor` 和 `inactiveColor` 自定义颜色，通过 `size` 调整大小。

```vue
<template>
  <wd-switch v-model="value1" active-color="#34d19d" inactive-color="#eee" />
  <wd-switch v-model="value2" size="24px" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref<boolean>(true)
const value2 = ref<boolean>(true)
</script>
```

### 示例3：自定义激活值

通过 `activeValue` 和 `inactiveValue` 自定义激活和非激活的值。

```vue
<template>
  <wd-switch v-model="value" active-value="on" inactive-value="off" @change="handleChange" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref<string>('on')

function handleChange({ value }: { value: string }) {
  console.log(value)
}
</script>
```

### 示例4：异步变更

通过 `beforeChange` 实现异步变更拦截，如需确认后才能切换。

```vue
<template>
  <wd-switch v-model="value" :before-change="beforeChange" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref<boolean>(false)

function beforeChange({ value, resolve }: { value: boolean; resolve: (pass: boolean) => void }) {
  setTimeout(() => {
    resolve(true)
  }, 500)
}
</script>
```

## 注意事项

- `modelValue` 必须与 `activeValue` 或 `inactiveValue` 之一匹配，否则初始化时会自动修正为 `inactiveValue`
- `beforeChange` 回调必须调用 `resolve` 方法，否则开关不会切换
- 设置了 `activeColor` 或 `inactiveColor` 时，圆点的 box-shadow 会被移除以保持视觉一致性
- `size` 属性支持数字（自动加 px）和字符串格式
