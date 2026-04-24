# NumberKeyboard 数字键盘

## 组件概况

NumberKeyboard 数字键盘组件用于纯数字输入场景，是 `Keyboard` 的简化版本。组件支持默认模式和自定义模式，支持随机数字键位、额外按键、关闭按钮和显示状态双向绑定。

## 核心功能描述

- **两种模式**：`default / custom`
- **随机数字键位**：支持随机排列数字键
- **额外按键**：支持单个或多个扩展键
- **显隐控制**：支持 `v-model:visible`
- **值同步**：支持 `v-model`

## 适用业务场景

- **金额输入**：数字与小数点录入
- **验证码输入**：短信验证码、支付验证码
- **数量输入**：纯数字数量或编号输入

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| visible | Boolean | false | 否 | 是否显示，支持 `v-model:visible` |
| modelValue | String | `''` | 否 | 当前输入值，支持 `v-model` |
| title | String | - | 否 | 标题 |
| mode | String | `'default'` | 否 | 键盘模式，可选值：`default` / `custom` |
| zIndex | Number | 100 | 否 | 层级 |
| maxlength | Number | `Infinity` | 否 | 最大长度 |
| showDeleteKey | Boolean | true | 否 | 是否显示删除键 |
| randomKeyOrder | Boolean | false | 否 | 是否随机打乱数字键顺序 |
| closeText | String | - | 否 | 关闭按钮文案 |
| deleteText | String | - | 否 | 删除键文案 |
| closeButtonLoading | Boolean | false | 否 | 关闭按钮是否显示加载状态 |
| modal | Boolean | false | 否 | 是否显示可见蒙层 |
| hideOnClickOutside | Boolean | true | 否 | 点击外部是否关闭键盘 |
| lockScroll | Boolean | true | 否 | 是否锁定滚动 |
| safeAreaInsetBottom | Boolean | true | 否 | 是否适配底部安全区 |
| extraKey | String / Array | - | 否 | 额外按键 |
| rootPortal | Boolean | false | 否 | 是否脱离当前页面层级渲染 |
| customStyle | String | `''` | 否 | 自定义根节点样式 |
| customClass | String | `''` | 否 | 自定义根节点样式类 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| input | 点击普通键或额外键时触发 | `(key: string)` | 当前输入的键值 |
| delete | 点击删除键时触发 | - | - |
| close | 点击关闭按钮或点击外部关闭时触发 | - | - |
| update:modelValue | 输入值变化时触发 | `(value: string)` | 当前值 |
| update:visible | 显示状态变化时触发 | `(visible: boolean)` | 是否显示 |

### Slots

| 插槽名称 | 说明 |
|---------|------|
| title | 自定义标题内容 |

## 使用示例

### 示例 1：基础用法

```vue
<template>
  <wd-number-keyboard v-model:visible="show" @input="handleInput" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(false)

function handleInput(key: string) {
  console.log(key)
}
</script>
```

### 示例 2：自定义模式

```vue
<template>
  <wd-number-keyboard
    v-model="value"
    v-model:visible="show"
    mode="custom"
    :extra-key="['00', '.']"
    close-text="完成"
  />
</template>
```

### 示例 3：随机键位

```vue
<template>
  <wd-number-keyboard v-model:visible="show" random-key-order />
</template>
```

## 注意事项

- 组件当前只支持 `default` 和 `custom` 两种模式，不支持车牌模式。
- `modal` 与 `hideOnClickOutside` 的关系与 `Keyboard` 一致：是否点击外部关闭取决于 `hideOnClickOutside`。
- 当额外键文本为空字符串且类型为 `extra` 时，会直接执行关闭逻辑。
