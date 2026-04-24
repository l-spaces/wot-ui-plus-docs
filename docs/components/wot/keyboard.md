# Keyboard 虚拟键盘

## 组件概况

Keyboard 虚拟键盘组件用于安全输入场景，支持默认数字键盘、自定义键盘和车牌键盘三种模式。组件基于 `wd-popup` 实现底部弹出，支持随机键位、额外按键、关闭按钮和车牌语言切换。

## 核心功能描述

- **三种模式**：`default / custom / car`
- **随机数字键位**：支持随机排列数字键
- **额外按键**：支持单个或多个扩展键
- **车牌模式**：支持省份 / 英文切换和自动切换语言
- **双向绑定**：同时支持 `v-model` 和 `v-model:visible`

## 适用业务场景

- **支付密码**：数字安全输入
- **金额录入**：自定义键盘加小数点或双零
- **车牌录入**：车牌号输入场景

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| visible | Boolean | false | 否 | 是否显示，支持 `v-model:visible` |
| modelValue | String | `''` | 否 | 当前输入值，支持 `v-model` |
| title | String | - | 否 | 标题 |
| mode | String | `'default'` | 否 | 键盘模式，可选值：`default` / `custom` / `car` |
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
| carLang | String | - | 否 | 车牌键盘语言，可选值：`zh` / `en` |
| autoSwitchLang | Boolean | false | 否 | 车牌键盘是否自动切换语言 |
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
| update:carLang | 车牌键盘语言切换时触发 | `(lang: 'zh' \| 'en')` | 当前语言 |

### Slots

| 插槽名称 | 说明 |
|---------|------|
| title | 自定义标题内容 |

## 使用示例

### 示例 1：基础用法

```vue
<template>
  <wd-keyboard v-model:visible="show" @input="handleInput" @delete="handleDelete" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(false)

function handleInput(key: string) {
  console.log(key)
}

function handleDelete() {
  console.log('delete')
}
</script>
```

### 示例 2：自定义模式

```vue
<template>
  <wd-keyboard
    v-model="value"
    v-model:visible="show"
    mode="custom"
    :extra-key="['00', '.']"
    close-text="完成"
  />
</template>
```

### 示例 3：车牌模式

```vue
<template>
  <wd-keyboard
    v-model="value"
    v-model:visible="show"
    mode="car"
    auto-switch-lang
  />
</template>
```

## 注意事项

- `modal` 并不直接决定“是否存在点击关闭区域”，真正控制点击外部关闭的是 `hideOnClickOutside`。
- 当 `hideOnClickOutside=false` 时，外部点击不会关闭键盘，且 `wd-popup` 的遮罩层也不会启用点击关闭逻辑。
- 车牌模式下，若传入了受控 `carLang`，语言切换会通过 `update:carLang` 通知外部，而不是在内部直接持久修改。
- `randomKeyOrder` 仅影响数字键顺序，不影响删除、关闭或额外按键。
