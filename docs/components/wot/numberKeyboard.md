# NumberKeyboard 数字键盘

## 组件概述

NumberKeyboard 数字键盘组件提供纯数字输入的虚拟键盘，支持默认模式和自定义模式。与 Keyboard 组件相比，NumberKeyboard 专注于数字输入场景，界面更简洁。

## 核心功能描述

- **两种模式**：default（默认数字键盘）、custom（自定义键盘，支持额外按键）
- **随机按键**：通过 `randomKeyOrder` 随机排列按键顺序
- **自定义按键**：通过 `extraKey` 添加额外按键
- **删除键**：通过 `showDeleteKey` 控制是否显示删除键

## 适用业务场景

- **金额输入**：在支付页面输入金额
- **验证码输入**：配合验证码组件输入数字验证码
- **数量输入**：在购物车页面输入商品数量

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| visible | Boolean | false | 否 | 是否可见，支持 v-model:visible |
| modelValue | String | '' | 否 | 绑定的值 |
| title | String | - | 否 | 标题 |
| mode | String | 'default' | 否 | 键盘模式，可选值：default / custom |
| zIndex | Number | 100 | 否 | 层级 |
| maxlength | Number | Infinity | 否 | 最大长度 |
| showDeleteKey | Boolean | true | 否 | 是否显示删除键 |
| randomKeyOrder | Boolean | false | 否 | 是否随机键盘按键顺序 |
| closeText | String | - | 否 | 确认按钮文本 |
| deleteText | String | - | 否 | 删除按钮文本 |
| closeButtonLoading | Boolean | false | 否 | 关闭按钮是否显示加载状态 |
| modal | Boolean | false | 否 | 是否显示蒙层 |
| hideOnClickOutside | Boolean | true | 否 | 是否在点击外部时收起键盘 |
| lockScroll | Boolean | true | 否 | 是否锁定滚动 |
| safeAreaInsetBottom | Boolean | true | 否 | 是否在底部安全区域内 |
| extraKey | String / Array | - | 否 | 额外按键 |
| rootPortal | Boolean | false | 否 | 是否从页面中脱离 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| input | 按键输入时触发 | (key: string) | 按键文本 |
| delete | 点击删除键时触发 | - | - |
| close | 键盘关闭时触发 | - | - |
| update:modelValue | 值变化时触发 | (value: string) | 当前值 |
| update:visible | 可见性变化时触发 | (visible: boolean) | 是否可见 |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-number-keyboard v-model="value" v-model:visible="show" title="数字键盘" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')
const show = ref(false)
</script>
```

### 示例2：自定义模式

```vue
<template>
  <wd-number-keyboard v-model="value" v-model:visible="show" mode="custom" extra-key="." />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')
const show = ref(false)
</script>
```

### 示例3：随机按键

```vue
<template>
  <wd-number-keyboard v-model="value" v-model:visible="show" random-key-order />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')
const show = ref(false)
</script>
```

## 注意事项

- 与 Keyboard 组件不同，NumberKeyboard 不支持车牌模式
- `extraKey` 在 custom 模式下生效，支持字符串或数组
- `randomKeyOrder` 仅对数字键有效
