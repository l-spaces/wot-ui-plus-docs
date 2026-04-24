# SwipeAction 滑动操作

## 组件概况

SwipeAction 滑动操作组件用于列表项的左滑/右滑操作，支持自定义操作按钮、关闭前钩子、自动收起等功能。常用于消息列表的删除/标记、订单列表的取消/支付等场景，通过滑动露出操作按钮。

## 核心功能描述

- **双向滑动**：支持左侧和右侧滑动操作区域，通过 `left` 和 `right` 插槽自定义内容
- **状态控制**：`modelValue` 支持 v-model 双向绑定，可选值 left / close / right
- **关闭前钩子**：`beforeClose` 在关闭前调用，可用于确认提示等场景
- **互斥管理**：同一页面多个 SwipeAction 展开时自动收起其他项
- **禁用状态**：`disabled` 禁用滑动操作

## 适用业务场景

- **消息列表**：左滑标记已读/删除，右滑收藏/置顶
- **订单管理**：滑动显示取消订单、去支付、查看详情等操作
- **购物车**：滑动显示删除、移入收藏等操作

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | String | 'close' | 否 | 滑动状态，可选值：left / close / right，支持 v-model |
| disabled | Boolean | false | 否 | 是否禁用滑动操作 |
| beforeClose | Function | - | 否 | 关闭前同步回调函数，参数为 `(reason, position)` |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| click | 点击操作区域或内容区域时触发 | ({ value: 'left' \| 'right' \| 'inside' }) | 当前点击位置 |
| update:modelValue | 滑动状态变化时触发 | ('left' \| 'close' \| 'right') | 当前滑动状态 |

### Methods

| 方法名称 | 参数 | 返回值 | 说明 |
|---------|------|--------|------|
| close | - | void | 主动关闭当前滑动状态 |

### Slots

| 插槽名称 | 作用域参数 | 使用场景 |
|---------|-----------|---------|
| default | - | 主内容区域 |
| left | - | 左侧操作区域 |
| right | - | 右侧操作区域 |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-swipe-action>
    <wd-cell title="滑动操作" value="左滑查看更多" />
    <template #right>
      <wd-button type="error" size="small" custom-class="swipe-btn">删除</wd-button>
    </template>
  </wd-swipe-action>
</template>
```

右滑露出删除按钮，通过 `right` 插槽自定义右侧操作区域。

### 示例2：双向滑动

```vue
<template>
  <wd-swipe-action>
    <wd-cell title="消息通知" value="您有3条新消息" />
    <template #left>
      <wd-button type="primary" size="small" custom-class="swipe-btn">标记已读</wd-button>
    </template>
    <template #right>
      <wd-button type="error" size="small" custom-class="swipe-btn">删除</wd-button>
    </template>
  </wd-swipe-action>
</template>
```

左滑显示标记已读，右滑显示删除，通过 `left` 和 `right` 插槽分别定义两侧操作。

### 示例3：状态控制与关闭前钩子

```vue
<template>
  <wd-swipe-action v-model="status" :before-close="beforeClose">
    <wd-cell title="订单号: 202401010001" value="待支付" />
    <template #right>
      <wd-button type="warning" size="small" custom-class="swipe-btn">取消</wd-button>
      <wd-button type="primary" size="small" custom-class="swipe-btn">支付</wd-button>
    </template>
  </wd-swipe-action>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const status = ref('close')

function beforeClose(reason, position) {
  console.log('关闭原因:', reason, '关闭位置:', position)
}
</script>
```

`v-model` 控制滑动状态，`beforeClose` 可用于记录关闭原因或补充提示信息。

## 注意事项

- `modelValue` 可选值为 left / close / right，非数字类型
- 同一页面多个 SwipeAction 组件展开时会自动收起其他已展开的项
- `beforeClose` 的 `reason` 参数为触发关闭的原因（click / swipe / value），`position` 为关闭位置（left / right / close / inside）
- 滑动操作按钮的宽度需要自行通过样式控制
- 禁用状态下滑动和点击操作均不生效
- 组件源码当前未提供 `open` 事件，对外状态变化应以 `update:modelValue` 和 `click` 为准
- 当前源码中的 `beforeClose` 不会等待 Promise 结果来阻断关闭流程
