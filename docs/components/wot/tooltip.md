# Tooltip 提示
<demo-model url="/subPages/tooltip/Index"></demo-model>

## 组件概况

### 组件概述
Tooltip 是一种轻量级的信息提示组件，用于在用户交互时展示额外信息。它通常以气泡形式出现在目标元素附近，提供简洁明了的上下文帮助或说明。

### 详细功能描述
- 支持多种定位方式（12种不同位置）
- 可自定义箭头显示与样式
- 支持文本内容和自定义插槽内容
- 支持通过v-model控制显隐状态
- 提供open/close方法手动控制
- 支持点击触发切换
- 支持关闭按钮
- 支持出现位置偏移量
- 支持样式自定义

### 适用业务场景
- 表单字段的辅助说明
- 操作按钮的功能提示
- 数据项的详细信息展示
- 复杂交互控件的使用指南
- 图标或缩写的解释说明

## 完整API参考

### Props

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| content | `string / Array<Record<string, any>>` | - | 否 | 显示的内容，也可以通过`slot#content`传入 |
| placement | string | 'bottom' | 否 | Tooltip的出现位置，可选值：top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end |
| visibleArrow | boolean | true | 否 | 是否显示Tooltip箭头 |
| offset | `number / Array<number> / Record<'x' \| 'y', number>` | 0 | 否 | 出现位置的偏移量 |
| useContentSlot | boolean | false | 否 | 是否使用slot来传入content内容 |
| disabled | boolean | false | 否 | Tooltip是否可用 |
| showClose | boolean | false | 否 | 是否显示Tooltip内部的关闭按钮 |
| modelValue | boolean | false | 否 | Tooltip的状态是否可见，通过v-model绑定 |
| customArrow | string | '' | 否 | 自定义箭头内容 |
| customPop | string | '' | 否 | 自定义弹出内容 |
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |

### Events

| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| update:modelValue | Tooltip状态变化时 | 新的状态值（boolean） |
| change | Tooltip状态变化时 | 包含show属性的对象，如：{ show: true } |
| open | Tooltip打开时 | 无 |
| close | Tooltip关闭时 | 无 |

### Methods

| 方法名 | 参数 | 返回值 | 功能说明 |
|--------|------|--------|----------|
| open | 无 | 无 | 打开Tooltip |
| close | 无 | 无 | 关闭Tooltip |

### Slots

| 插槽名 | 作用域变量 | 使用说明 |
|--------|------------|----------|
| default | 无 | 触发Tooltip显示的目标元素 |
| content | 无 | 自定义Tooltip的内容 |

## 多场景使用示例代码

### 基础用法

```vue
<template>
  <wd-tooltip content="这是一个提示信息">
    <wd-button type="primary">悬停我</wd-button>
  </wd-tooltip>
</template>
```

### 自定义位置

```vue
<template>
  <view class="tooltip-demo">
    <wd-tooltip content="顶部提示" placement="top">
      <wd-button type="primary">顶部</wd-button>
    </wd-tooltip>
    <wd-tooltip content="左侧提示" placement="left">
      <wd-button type="primary">左侧</wd-button>
    </wd-tooltip>
    <wd-tooltip content="右侧提示" placement="right">
      <wd-button type="primary">右侧</wd-button>
    </wd-tooltip>
    <wd-tooltip content="底部提示" placement="bottom">
      <wd-button type="primary">底部</wd-button>
    </wd-tooltip>
  </view>
</template>

<style scoped>
.tooltip-demo {
  display: flex;
  justify-content: space-around;
  padding: 20px;
}
</style>
```

### 使用插槽自定义内容

```vue
<template>
  <wd-tooltip use-content-slot placement="top">
    <wd-button type="primary">自定义内容</wd-button>
    <template #content>
      <view class="custom-content">
        <text class="title">自定义标题</text>
        <text class="desc">这是一段自定义的提示内容，可以包含多行文本和样式。</text>
      </view>
    </template>
  </wd-tooltip>
</template>

<style scoped>
.custom-content {
  padding: 10px;
}

.title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 5px;
}

.desc {
  font-size: 14px;
  color: #666;
  line-height: 1.4;
}
</style>
```

### 手动控制显隐

```vue
<template>
  <view class="tooltip-demo">
    <wd-tooltip ref="tooltipRef" content="手动控制的提示">
      <wd-button type="primary">目标元素</wd-button>
    </wd-tooltip>
    <wd-button type="success" @click="openTooltip">打开</wd-button>
    <wd-button type="danger" @click="closeTooltip">关闭</wd-button>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tooltipRef = ref(null)

const openTooltip = () => {
  tooltipRef.value?.open()
}

const closeTooltip = () => {
  tooltipRef.value?.close()
}
</script>

<style scoped>
.tooltip-demo {
  display: flex;
  gap: 10px;
  padding: 20px;
  align-items: center;
}
</style>
```

### 带有关闭按钮

```vue
<template>
  <wd-tooltip content="可关闭的提示" show-close placement="right">
    <wd-button type="primary">带关闭按钮</wd-button>
  </wd-tooltip>
</template>
```

## 样式定制指南

### 自定义样式

```vue
<template>
  <wd-tooltip 
    content="自定义样式提示" 
    custom-class="my-tooltip" 
    custom-style="max-width: 200px;"
  >
    <wd-button type="primary">自定义样式</wd-button>
  </wd-tooltip>
</template>

<style scoped>
.my-tooltip {
  /* 自定义Tooltip容器样式 */
  .wd-tooltip__container {
    background-color: #409eff;
    color: white;
    border-radius: 8px;
    padding: 10px;
  }
  
  /* 自定义箭头样式 */
  .wd-tooltip__arrow {
    border-left-color: #409eff;
    border-right-color: #409eff;
  }
}
</style>
```

## 注意事项

1. **内容限制**：Tooltip内容不宜过长，建议控制在100字以内，过长内容可能影响显示效果。
2. **性能优化**：避免在大量元素上同时使用Tooltip，可能影响页面性能。
3. **位置自适应**：当Tooltip在屏幕边缘时，组件会自动调整位置以确保完全显示。
4. **事件冒泡**：Tooltip内部的点击事件会被阻止冒泡，避免影响外部元素。
5. **兼容性**：在某些小程序平台上，Tooltip的定位可能需要额外调整。
6. **内容更新**：当动态更新content属性时，Tooltip会自动重新计算位置。
7. **嵌套使用**：不建议嵌套使用Tooltip，可能导致定位错误。
8. **关闭按钮**：showClose属性仅在Tooltip显示时生效，关闭按钮点击后会触发close事件。