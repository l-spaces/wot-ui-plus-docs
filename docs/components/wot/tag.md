# Tag 标签
<demo-model url="/subPages/tag/Index"></demo-model>

## 组件概况

### 组件概述
标签组件是用于对信息进行分类或标记的常用UI元素，支持多种样式和交互方式。wd-tag组件提供了丰富的配置选项，包括不同类型、尺寸、颜色、可关闭等特性，适用于各种标签展示场景。

### 详细功能描述
- 支持5种标签类型：default、primary、success、warning、danger
- 支持左侧图标配置
- 支持图标插槽自定义
- 支持可关闭标签（只对圆角类型支持）
- 支持幽灵类型标签
- 支持新增标签（动态标签）
- 支持自定义文字颜色
- 支持自定义背景色和边框色
- 支持圆角类型标签
- 支持标记类型标签
- 支持点击事件
- 支持关闭事件
- 支持确认事件（动态标签）

### 适用业务场景
- 内容分类标签
- 状态标记
- 筛选条件标签
- 动态标签添加
- 标签云展示
- 任何需要分类或标记信息的场景

## 完整API参考

### Props属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| useIconSlot | boolean | false | 否 | 是否开启图标插槽 |
| type | 'default' / 'primary' / 'success' / 'warning' / 'danger' | default | 否 | 标签类型 |
| icon | string | '' | 否 | 左侧图标 |
| closable | boolean | false | 否 | 是否可关闭（只对圆角类型支持） |
| plain | boolean | false | 否 | 幽灵类型 |
| dynamic | boolean | false | 否 | 是否为新增标签 |
| color | string | '' | 否 | 文字颜色 |
| bgColor | string | '' | 否 | 背景色和边框色 |
| round | boolean | false | 否 | 圆角类型 |
| mark | boolean | false | 否 | 标记类型 |
| customStyle | string / object | - | 否 | 自定义样式 |
| customClass | string | - | 否 | 自定义类名 |

### Events事件

| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| click | 点击标签时触发 | event - 点击事件对象 |
| close | 关闭标签时触发 | event - 关闭事件对象 |
| confirm | 动态标签确认时触发 | { value: string } - 输入的标签值 |

### Methods方法

该组件没有对外暴露的方法。

### Slots插槽

| 插槽名 | 作用域变量 | 使用说明 |
|--------|------------|----------|
| default | - | 标签内容 |
| icon | - | 自定义图标 |
| add | - | 自定义动态标签的添加按钮 |

## 多场景使用示例代码

### 1. 基础用法
```vue
<template>
  <view class="tag-container">
    <wd-tag type="default">默认标签</wd-tag>
    <wd-tag type="primary">主要标签</wd-tag>
    <wd-tag type="success">成功标签</wd-tag>
    <wd-tag type="warning">警告标签</wd-tag>
    <wd-tag type="danger">危险标签</wd-tag>
  </view>
</template>

<script setup lang="ts">
// 基础标签用法
</script>

<style scoped>
.tag-container {
  display: flex;
  flex-wrap: wrap;
  gap: 12rpx;
  padding: 20rpx;
}
</style>
```

### 2. 带图标的标签
```vue
<template>
  <view class="tag-container">
    <wd-tag type="primary" icon="home">首页</wd-tag>
    <wd-tag type="success" icon="check">成功</wd-tag>
    <wd-tag type="warning" icon="warning">警告</wd-tag>
    <wd-tag type="danger" icon="close">错误</wd-tag>
    <wd-tag type="default" icon="info">信息</wd-tag>
    
    <!-- 自定义图标插槽 -->
    <wd-tag type="primary" use-icon-slot>
      <template #icon>
        <wd-icon name="star" color="#ffd700"></wd-icon>
      </template>
      自定义图标
    </wd-tag>
  </view>
</template>

<script setup lang="ts">
// 带图标的标签用法
</script>

<style scoped>
.tag-container {
  display: flex;
  flex-wrap: wrap;
  gap: 12rpx;
  padding: 20rpx;
}
</style>
```

### 3. 可关闭和圆角标签
```vue
<template>
  <view class="tag-container">
    <wd-tag 
      type="primary" 
      round 
      closable 
      v-for="(tag, index) in tags" 
      :key="index"
      @close="handleClose(index)"
    >
      {{ tag }}
    </wd-tag>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 可关闭标签列表
const tags = ref(['标签1', '标签2', '标签3', '标签4', '标签5'])

// 关闭标签事件
const handleClose = (index: number) => {
  tags.value.splice(index, 1)
}
</script>

<style scoped>
.tag-container {
  display: flex;
  flex-wrap: wrap;
  gap: 12rpx;
  padding: 20rpx;
}
</style>
```

### 4. 幽灵标签和标记标签
```vue
<template>
  <view class="tag-section">
    <text class="section-title">幽灵标签</text>
    <view class="tag-container">
      <wd-tag type="primary" plain>主要标签</wd-tag>
      <wd-tag type="success" plain>成功标签</wd-tag>
      <wd-tag type="warning" plain>警告标签</wd-tag>
      <wd-tag type="danger" plain>危险标签</wd-tag>
    </view>
  </view>
  
  <view class="tag-section">
    <text class="section-title">标记标签</text>
    <view class="tag-container">
      <wd-tag type="primary" mark>主要标记</wd-tag>
      <wd-tag type="success" mark>成功标记</wd-tag>
      <wd-tag type="warning" mark>警告标记</wd-tag>
      <wd-tag type="danger" mark>危险标记</wd-tag>
    </view>
  </view>
</template>

<script setup lang="ts">
// 幽灵标签和标记标签用法
</script>

<style scoped>
.tag-section {
  margin: 20rpx 0;
  padding: 0 20rpx;
}

.section-title {
  display: block;
  margin-bottom: 10rpx;
  font-size: 32rpx;
  font-weight: bold;
}

.tag-container {
  display: flex;
  flex-wrap: wrap;
  gap: 12rpx;
  padding: 10rpx 0;
}
</style>
```

### 5. 动态标签和自定义颜色
```vue
<template>
  <view class="tag-container">
    <wd-tag 
      type="primary" 
      round 
      closable 
      v-for="(tag, index) in dynamicTags" 
      :key="index"
      @close="handleClose(index)"
    >
      {{ tag }}
    </wd-tag>
    
    <!-- 动态添加标签 -->
    <wd-tag 
      type="primary" 
      dynamic 
      @confirm="handleConfirm"
    ></wd-tag>
    
    <!-- 自定义颜色标签 -->
    <wd-tag 
      round 
      color="#fff" 
      bg-color="#67c23a"
    >
      自定义颜色
    </wd-tag>
    <wd-tag 
      round 
      color="#fff" 
      bg-color="#e6a23c"
    >
      自定义颜色
    </wd-tag>
    <wd-tag 
      round 
      color="#fff" 
      bg-color="#f56c6c"
    >
      自定义颜色
    </wd-tag>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 动态标签列表
const dynamicTags = ref(['标签1', '标签2', '标签3'])

// 关闭标签事件
const handleClose = (index: number) => {
  dynamicTags.value.splice(index, 1)
}

// 添加标签事件
const handleConfirm = (event: { value: string }) => {
  if (event.value && !dynamicTags.value.includes(event.value)) {
    dynamicTags.value.push(event.value)
  }
}
</script>

<style scoped>
.tag-container {
  display: flex;
  flex-wrap: wrap;
  gap: 12rpx;
  padding: 20rpx;
}
</style>
```

## 样式定制指南

### customStyle 用法
```vue
<template>
  <wd-tag 
    type="primary" 
    :custom-style="{ 
      fontSize: '28rpx', 
      padding: '8rpx 20rpx', 
      borderRadius: '16rpx'
    }"
  >
    自定义样式标签
  </wd-tag>
</template>

<script setup lang="ts">
// 自定义样式标签
</script>
```

### customClass 用法
```vue
<template>
  <wd-tag type="primary" custom-class="my-tag">
    自定义类名标签
  </wd-tag>
</template>

<script setup lang="ts">
// 自定义类名标签
</script>

<style lang="scss">
.my-tag {
  font-size: 28rpx;
  padding: 8rpx 20rpx;
  border-radius: 16rpx;
  background-color: #409eff;
  color: #fff;
  
  &:active {
    background-color: #66b1ff;
  }
}
</style>
```

## 注意事项

1. 可关闭标签(closable)只对圆角类型(round)标签生效
2. 动态标签(dynamic)支持点击添加新标签，并通过confirm事件返回输入值
3. 自定义颜色(color和bgColor)会覆盖标签类型的默认颜色
4. 标记类型(mark)标签通常用于突出显示重要信息
5. 幽灵类型(plain)标签只有边框颜色，没有背景色
6. 图标插槽(icon)需要配合useIconSlot属性使用
7. 标签内容过长时，会自动省略多余内容
8. 标签组件支持通过点击事件(click)进行交互
9. 关闭事件(close)只在可关闭标签上触发
10. 确认事件(confirm)只在动态标签上触发
11. 建议在使用标签组件时，为不同类型的标签提供足够的间距
12. 标签组件支持通过customStyle和customClass进行深度定制
