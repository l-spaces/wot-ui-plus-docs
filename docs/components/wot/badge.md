# Badge 徽章

<demo-model url="/subPages/badge/Index"></demo-model>

## 组件概况

### 组件概述
Badge 徽章组件用于在元素右上角显示徽标，支持数字、圆点等多种形式，常用于消息提示、未读数量显示、状态标记等场景。

### 详细功能描述
- 支持数字徽标和圆点徽标两种形式
- 支持自定义最大值，超过最大值显示 "{max}+"
- 支持自定义背景色和徽标类型（primary/success/warning/danger/info）
- 支持数值为0时是否显示徽标
- 支持自定义徽标的位置偏移
- 支持隐藏徽标
- 支持嵌套在各种元素内部使用

### 适用业务场景
- 消息中心的未读消息数量
- 购物车的商品数量
- 通知提醒标记
- 新功能上线标记
- 状态指示标记

## 完整API参考

### Props属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| modelValue | string/number | - | 否 | 显示值 |
| showZero | boolean | false | 否 | 当数值为 0 时，是否展示徽标 |
| bgColor | string | - | 否 | 自定义背景色 |
| max | number | - | 否 | 最大值，超过最大值会显示 '{max}+'，要求 value 是 Number 类型 |
| isDot | boolean | - | 否 | 是否为红色点状标注 |
| hidden | boolean | - | 否 | 是否隐藏 badge |
| type | string | - | 否 | badge类型，可选值：primary / success / warning / danger / info |
| top | string/number | - | 否 | 为正时，角标向下偏移对应的像素 |
| right | string/number | - | 否 | 为正时，角标向左偏移对应的像素 |
| customStyle | string | - | 否 | 自定义根节点样式 |
| customClass | string | - | 否 | 自定义根节点样式类 |

### Events事件

该组件没有定义任何事件。

### Methods方法

该组件没有对外暴露的方法。

### Slots插槽

| 插槽名 | 作用域变量 | 使用说明 |
|--------|------------|----------|
| default | - | 需要显示徽章的内容 |

## 多场景使用示例代码

### 1. 基础用法

```vue
<template>
  <view class="badge-demo">
    <!-- 数字徽章 -->
    <wd-badge modelValue="5">
      <wd-button type="primary" size="small">按钮</wd-button>
    </wd-badge>
    
    <!-- 圆点徽章 -->
    <wd-badge isDot>
      <wd-button type="success" size="small">按钮</wd-button>
    </wd-badge>
  </view>
</template>

<script lang="ts" setup>
// 基础徽章用法，展示数字徽章和圆点徽章
</script>

<style scoped>
.badge-demo {
  display: flex;
  gap: 20rpx;
  padding: 20rpx;
  align-items: center;
}
</style>
```

### 2. 最大值和零值显示

```vue
<template>
  <view class="badge-demo">
    <!-- 超过最大值显示 -->
    <wd-badge modelValue="99" max="99">
      <wd-button type="warning" size="small">按钮</wd-button>
    </wd-badge>
    
    <!-- 显示零值 -->
    <wd-badge modelValue="0" showZero>
      <wd-button type="danger" size="small">按钮</wd-button>
    </wd-badge>
    
    <!-- 隐藏零值 -->
    <wd-badge modelValue="0">
      <wd-button type="info" size="small">按钮</wd-button>
    </wd-badge>
  </view>
</template>

<script lang="ts" setup>
// 展示最大值和零值显示的不同效果
</script>

<style scoped>
.badge-demo {
  display: flex;
  gap: 20rpx;
  padding: 20rpx;
  align-items: center;
}
</style>
```

### 3. 不同类型和自定义颜色

```vue
<template>
  <view class="badge-demo">
    <!-- 不同类型的徽章 -->
    <wd-badge modelValue="1" type="primary">
      <wd-button size="small">primary</wd-button>
    </wd-badge>
    <wd-badge modelValue="2" type="success">
      <wd-button size="small">success</wd-button>
    </wd-badge>
    <wd-badge modelValue="3" type="warning">
      <wd-button size="small">warning</wd-button>
    </wd-badge>
    <wd-badge modelValue="4" type="danger">
      <wd-button size="small">danger</wd-button>
    </wd-badge>
    <wd-badge modelValue="5" type="info">
      <wd-button size="small">info</wd-button>
    </wd-badge>
    
    <!-- 自定义背景色 -->
    <wd-badge modelValue="6" bgColor="#666">
      <wd-button size="small">自定义颜色</wd-button>
    </wd-badge>
  </view>
</template>

<script lang="ts" setup>
// 展示不同类型的徽章和自定义背景色
</script>

<style scoped>
.badge-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
  padding: 20rpx;
  align-items: center;
}
</style>
```

### 4. 位置偏移和隐藏徽章

```vue
<template>
  <view class="badge-demo">
    <!-- 位置偏移 -->
    <wd-badge modelValue="1" top="10" right="10">
      <wd-button type="primary" size="small">偏移</wd-button>
    </wd-badge>
    
    <!-- 隐藏徽章 -->
    <wd-badge modelValue="2" hidden>
      <wd-button type="success" size="small">隐藏</wd-button>
    </wd-badge>
    
    <!-- 动态控制隐藏 -->
    <wd-badge modelValue="3" :hidden="isHidden">
      <wd-button type="warning" size="small" @click="isHidden = !isHidden">
        {{ isHidden ? '显示徽章' : '隐藏徽章' }}
      </wd-button>
    </wd-badge>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 动态控制徽章隐藏
const isHidden = ref(false)
</script>

<style scoped>
.badge-demo {
  display: flex;
  gap: 20rpx;
  padding: 20rpx;
  align-items: center;
}
</style>
```

### 5. 与其他组件结合使用

```vue
<template>
  <view class="badge-demo">
    <!-- 与头像结合 -->
    <wd-badge modelValue="3">
      <wd-avatar src="https://example.com/avatar.jpg" size="60" />
    </wd-badge>
    
    <!-- 与图标结合 -->
    <wd-badge isDot>
      <wd-icon name="message" size="40" />
    </wd-badge>
    
    <!-- 与文本结合 -->
    <wd-badge modelValue="99+">
      <view class="text-item">消息中心</view>
    </wd-badge>
  </view>
</template>

<script lang="ts" setup>
// 展示徽章与其他组件的结合使用
</script>

<style scoped>
.badge-demo {
  display: flex;
  gap: 40rpx;
  padding: 20rpx;
  align-items: center;
}

.text-item {
  font-size: 28rpx;
  color: #333;
}
</style>
```

## 样式定制指南

### 1. 使用customStyle自定义样式

```vue
<template>
  <wd-badge 
    modelValue="5" 
    customStyle="margin: 20rpx;"
  >
    <wd-button type="primary" size="small">自定义样式</wd-button>
  </wd-badge>
</template>
```

### 2. 使用customClass自定义类名

```vue
<template>
  <wd-badge 
    modelValue="5" 
    customClass="my-badge"
  >
    <wd-button type="primary" size="small">自定义类名</wd-button>
  </wd-badge>
</template>

<style scoped>
/* 注意：需要使用 ::v-deep 或 /deep/ 穿透 scoped 样式 */
:deep(.my-badge) {
  margin: 20rpx;
  padding: 10rpx;
  background-color: #f5f7fa;
  border-radius: 8rpx;
}
</style>
```

### 3. 覆盖徽章内部样式

```vue
<template>
  <wd-badge 
    modelValue="5" 
    customClass="custom-badge-content"
  >
    <wd-button type="primary" size="small">自定义徽章内容</wd-button>
  </wd-badge>
</template>

<style scoped>
/* 覆盖徽章内容样式 */
:deep(.custom-badge-content .wd-badge__content) {
  min-width: 36rpx;
  height: 36rpx;
  line-height: 36rpx;
  font-size: 20rpx;
  border-radius: 18rpx;
}
</style>
```

## 注意事项

1. **modelValue类型**：modelValue可以是数字或字符串，但当使用max属性时，modelValue必须是数字类型。

2. **最大值处理**：当modelValue大于max时，会显示"{max}+"，例如max=99，modelValue=100时显示"99+"。

3. **圆点徽章**：isDot为true时，徽章会显示为一个小圆点，不显示具体数值。

4. **零值显示**：默认情况下，当modelValue为0时不显示徽章，可通过showZero属性设置为true来显示。

5. **位置偏移**：top和right属性用于调整徽章的位置，正值表示向下/向左偏移，负值表示向上/向右偏移。

6. **类型优先级**：bgColor属性的优先级高于type属性，当同时设置时，会使用bgColor作为背景色。

7. **性能优化**：当徽章不需要显示时，建议使用hidden属性隐藏，而不是条件渲染，以提高性能。

8. **嵌套使用**：徽章组件可以嵌套在任何元素内部使用，但建议只嵌套单个元素，以确保徽章位置正确。

9. **自定义样式**：通过customStyle和customClass可以自定义徽章容器的样式，通过bgColor可以自定义徽章内容的背景色。

10. **响应式设计**：徽章大小会根据父元素的大小自动调整，建议在不同尺寸的元素上测试徽章显示效果。