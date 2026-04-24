# Popup 弹出层

## 组件概述

Popup 弹出层组件是多类弹窗组件的基础能力，支持从中间、上下左右五个方向弹出。组件内置遮罩、过渡动画、关闭按钮、安全区适配与 `rootPortal` 脱层渲染能力，是 `ActionSheet`、`Picker`、`Keyboard` 等组件的重要底层依赖。

## 核心功能描述

- **多方向弹出**：支持 `center / top / right / bottom / left`
- **过渡动画**：可自定义过渡名，也可按位置使用默认动画
- **遮罩控制**：支持是否显示遮罩、是否点击蒙层关闭
- **生命周期事件**：支持进入 / 离开前后多个过渡事件
- **层级控制**：支持 `zIndex` 和 `rootPortal`

## 适用业务场景

- **基础弹窗**：承载任意自定义弹层内容
- **侧边面板**：筛选、设置、导航等侧滑内容
- **嵌套弹窗**：结合 `rootPortal` 解决层级覆盖问题

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | Boolean | false | 否 | 是否显示弹层，支持 `v-model` |
| position | String | `'center'` | 否 | 弹出位置，可选值：`center` / `top` / `right` / `bottom` / `left` |
| transition | String | - | 否 | 自定义过渡动画名，参考 `wd-transition` |
| closable | Boolean | false | 否 | 是否显示关闭按钮 |
| closeOnClickModal | Boolean | true | 否 | 点击遮罩是否关闭 |
| duration | Number / Boolean | 300 | 否 | 动画时长，传 `false` 表示关闭动画 |
| modal | Boolean | true | 否 | 是否显示遮罩层 |
| modalStyle | String | `''` | 否 | 自定义遮罩样式 |
| zIndex | Number | 10 | 否 | 层级 |
| hideWhenClose | Boolean | true | 否 | 关闭时是否销毁显示状态（`display: none`） |
| safeAreaInsetBottom | Boolean | false | 否 | 是否适配底部安全区 |
| lazyRender | Boolean | true | 否 | 是否懒渲染内容 |
| lockScroll | Boolean | true | 否 | 是否锁定背景滚动 |
| rootPortal | Boolean | false | 否 | 是否脱离当前页面层级渲染 |
| customStyle | String | `''` | 否 | 自定义根节点样式 |
| customClass | String | `''` | 否 | 自定义根节点样式类 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| click-modal | 点击遮罩时触发 | - | - |
| close | 点击关闭按钮或点击蒙层触发关闭时触发 | - | - |
| update:modelValue | 显示状态变化时触发 | `(value: boolean)` | 用于同步显隐 |
| before-enter | 进入动画开始前触发 | - | - |
| enter | 进入动画开始时触发 | - | - |
| after-enter | 进入动画结束后触发 | - | - |
| before-leave | 离开动画开始前触发 | - | - |
| leave | 离开动画开始时触发 | - | - |
| after-leave | 离开动画结束后触发 | - | - |

### Slots

| 插槽名称 | 说明 |
|---------|------|
| default | 弹层内容 |

## 使用示例

### 示例 1：基础用法

```vue
<template>
  <wd-button @click="show = true">弹出层</wd-button>
  <wd-popup v-model="show" custom-style="border-radius: 16px;">
    <view style="padding: 24px;">弹出内容</view>
  </wd-popup>
</template>
```

### 示例 2：底部弹出与关闭按钮

```vue
<template>
  <wd-popup
    v-model="show"
    position="bottom"
    closable
    custom-style="height: 200px;"
    @close="handleClose"
  />
</template>

<script lang="ts" setup>
function handleClose() {
  console.log('popup closing')
}
</script>
```

### 示例 3：嵌套弹窗

```vue
<template>
  <wd-popup v-model="parentShow" position="center">
    <wd-button @click="childShow = true">打开子弹窗</wd-button>

    <wd-popup
      v-model="childShow"
      root-portal
      position="center"
      custom-style="padding: 20px; border-radius: 16px;"
    >
      <view>子弹窗内容</view>
    </wd-popup>
  </wd-popup>
</template>
```

## 注意事项

- 组件当前没有单独的 `open` 事件，进入动画相关时机请使用 `before-enter` / `enter` / `after-enter`。
- `close` 发生在关闭动作触发时，若要等待完全关闭应监听 `after-leave`。
- `rootPortal` 对嵌套弹窗和复杂定位场景尤其重要，可避免父层级裁剪或覆盖问题。
- 未显式传入 `transition` 时，`center` 默认使用 `zoom-in + fade`，其他方向按位置使用对应 `slide-*` 动画。
