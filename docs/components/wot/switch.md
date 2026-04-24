# Switch 开关

## 组件概况

Switch 开关组件用于在两种状态之间切换，支持自定义激活值、颜色、尺寸和变更前拦截，适用于设置项开关、布尔值选择等场景。

## 核心功能描述

- **自定义开关值**：通过 `activeValue` 和 `inactiveValue` 定义选中与未选中值。
- **颜色定制**：通过 `activeColor`、`inactiveColor`、`circleColor` 自定义样式。
- **尺寸调整**：通过 `size` 调整组件整体尺寸。
- **变更拦截**：通过 `beforeChange` 在切换前接管确认流程。
- **禁用控制**：通过 `disabled` 禁用交互。
- **初始值修正**：当初始值既不等于 `activeValue` 也不等于 `inactiveValue` 时，会自动修正为 `inactiveValue`。

## 适用业务场景

- **设置页开关**：控制通知、开屏推荐、实验特性等状态。
- **表单布尔值输入**：替代复选框表示是否启用某项功能。
- **列表状态切换**：在列表中快速切换启用/停用状态。

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | Boolean / String / Number | false | 是 | 当前值，支持 `v-model`。 |
| disabled | Boolean | false | 否 | 是否禁用。 |
| activeValue | Boolean / String / Number | true | 否 | 选中时的值。 |
| inactiveValue | Boolean / String / Number | false | 否 | 未选中时的值。 |
| activeColor | String | - | 否 | 选中背景色。 |
| inactiveColor | String | - | 否 | 未选中背景色。 |
| circleColor | String | - | 否 | 圆点颜色。 |
| size | Number / String | - | 否 | 组件尺寸。 |
| beforeChange | `({ value, resolve }) => void` | - | 否 | 切换前钩子。调用 `resolve(true)` 继续切换，调用 `resolve(false)` 取消。 |
| customStyle | String | `''` | 否 | 自定义根节点样式。 |
| customClass | String | `''` | 否 | 自定义根节点样式类。 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调说明 |
|---------|---------|---------|---------|
| change | 状态变化时触发 | `({ value: boolean \| string \| number })` | 当前切换后的值。 |
| update:modelValue | 状态变化时触发 | `(value: boolean \| string \| number)` | 用于 `v-model` 双向绑定。 |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-switch v-model="value" @change="handleChange" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(true)

function handleChange({ value }: { value: boolean }) {
  console.log(value)
}
</script>
```

### 示例2：自定义值、颜色与尺寸

```vue
<template>
  <wd-switch v-model="value1" active-value="你好" inactive-value="世界" />
  <wd-switch v-model="value2" circle-color="#333333" active-color="#13ce66" inactive-color="#f00" />
  <wd-switch v-model="value3" :size="24" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref('世界')
const value2 = ref(true)
const value3 = ref(true)
</script>
```

### 示例3：变更前确认

```vue
<template>
  <wd-switch v-model="value" :before-change="beforeChange" />
</template>

<script lang="ts" setup>
import { useMessage } from '@/uni_modules/wot-ui-plus'
import type { SwitchBeforeChange } from '@/uni_modules/wot-ui-plus/components/wd-switch/types'
import { ref } from 'vue'

const message = useMessage()
const value = ref(false)

const beforeChange: SwitchBeforeChange = ({ resolve }) => {
  message
    .confirm('是否切换开关')
    .then(() => resolve(true))
    .catch(() => resolve(false))
}
</script>
```

## 注意事项

- `beforeChange` 是 `resolve` 回调风格，不是返回 `boolean` 或 `Promise<boolean>` 的写法。
- `modelValue` 若与 `activeValue`、`inactiveValue` 都不匹配，组件会在挂载时自动修正为 `inactiveValue`，并触发 `update:modelValue` 与 `change`。
- 当设置了 `activeColor` 或 `inactiveColor` 后，圆点的阴影会被移除以保持视觉一致。
- `size` 支持数字和带单位的字符串，数字会按像素处理。
