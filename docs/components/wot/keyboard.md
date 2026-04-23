# Keyboard 虚拟键盘

## 组件概述

Keyboard 虚拟键盘组件提供安全的数据输入方式，避免系统键盘可能存在的安全隐患。支持默认数字键盘、自定义键盘和车牌键盘三种模式，可随机排列按键顺序增强安全性。

## 核心功能描述

- **三种模式**：default（默认数字键盘）、custom（自定义键盘，支持额外按键）、car（车牌键盘）
- **随机按键**：通过 `randomKeyOrder` 随机排列按键顺序
- **车牌键盘**：支持中英文切换，自动切换语言模式
- **自定义按键**：通过 `extraKey` 添加额外按键
- **删除键**：通过 `showDeleteKey` 控制是否显示删除键
- **蒙层控制**：通过 `modal` 和 `hideOnClickOutside` 控制蒙层行为

## 适用业务场景

- **支付密码**：在支付页面使用虚拟键盘输入密码
- **车牌输入**：在停车场页面使用车牌键盘输入车牌号
- **安全输入**：在需要避免键盘记录的场景中使用虚拟键盘

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| visible | Boolean | false | 否 | 是否可见，支持 v-model:visible |
| modelValue | String | '' | 否 | 绑定的值 |
| title | String | - | 否 | 标题 |
| mode | String | 'default' | 否 | 键盘模式，可选值：default / custom / car |
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
| carLang | String | - | 否 | 车牌键盘语言模式，可选值：zh / en |
| autoSwitchLang | Boolean | false | 否 | 是否自动切换车牌键盘语言 |
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
| update:carLang | 车牌语言变化时触发 | (lang: string) | 当前语言 |

### Slots

| 插槽名称 | 作用域参数 | 使用场景 |
|---------|-----------|---------|
| title | - | 自定义标题内容 |

## 使用示例

### 示例1：默认数字键盘

```vue
<template>
  <wd-keyboard v-model="value" v-model:visible="show" title="安全键盘" @input="onInput" @delete="onDelete" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')
const show = ref(false)

function onInput(key: string) {
  console.log('输入:', key)
}
function onDelete() {
  console.log('删除')
}
</script>
```

### 示例2：自定义键盘

```vue
<template>
  <wd-keyboard v-model="value" v-model:visible="show" mode="custom" extra-key="." />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')
const show = ref(false)
</script>
```

### 示例3：车牌键盘

```vue
<template>
  <wd-keyboard v-model="value" v-model:visible="show" mode="car" car-lang="zh" auto-switch-lang />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')
const show = ref(false)
</script>
```

## 注意事项

- 车牌键盘模式下 `carLang` 支持 zh（中文省份简称）和 en（英文字母）两种模式
- `randomKeyOrder` 仅对数字键有效，不影响功能键
- `extraKey` 在 custom 模式下生效，支持字符串或数组（最多两个额外按键）
- `modal` 为 false 时蒙层透明但仍可点击关闭
