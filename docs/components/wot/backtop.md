# Backtop 回到顶部

<demo-model url="/subPages/backtop/Index"></demo-model>

## 组件概况

### 组件概述
Backtop 回到顶部组件是一个用于快速返回页面顶部的功能组件，通常在页面滚动到一定距离后显示，点击后可平滑滚动到页面顶部。

### 详细功能描述
- 支持自定义显示触发距离
- 支持自定义返回顶部的滚动时间
- 支持自定义位置（距离底部和右侧的距离）
- 支持两种形状：圆形和方形
- 支持自定义图标样式
- 支持自定义层级
- 支持自定义内容（通过插槽）
- 支持淡入淡出动画

### 适用业务场景
- 长页面的快速返回顶部功能
- 列表页面的回到顶部
- 任何需要快速返回顶部的场景

## 完整API参考

### Props属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| scrollTop | number | - | 是 | 页面滚动距离，用于控制回到顶部按钮的显示与隐藏 |
| top | number | 300 | 否 | 距离顶部多少距离时显示回到顶部按钮 |
| duration | number | 100 | 否 | 返回顶部滚动时间（毫秒） |
| zIndex | number | 10 | 否 | 层级 |
| iconStyle | string | - | 否 | 图标样式 |
| shape | string | circle | 否 | 形状，可选值：circle（圆形）/ square（方形） |
| bottom | number | 100 | 否 | 距离屏幕底部距离 |
| right | number | 20 | 否 | 距离屏幕右边距离 |
| customStyle | string | - | 否 | 自定义根节点样式 |
| customClass | string | - | 否 | 自定义根节点样式类 |

### Events事件

该组件没有定义任何事件。

### Methods方法

该组件没有对外暴露的方法。

### Slots插槽

| 插槽名 | 作用域变量 | 使用说明 |
|--------|------------|----------|
| default | - | 自定义回到顶部按钮内容 |

## 多场景使用示例代码

### 1. 基础用法

```vue
<template>
  <view class="backtop-demo">
    <view class="scroll-content" @scroll="handleScroll">
      <view class="long-content" v-for="i in 50" :key="i">
        这是第 {{ i }} 行内容
      </view>
    </view>
    <wd-backtop :scroll-top="scrollTop" />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 基础回到顶部用法
const scrollTop = ref(0)

// 处理滚动事件
const handleScroll = (e: any) => {
  scrollTop.value = e.detail.scrollTop
}
</script>

<style scoped>
.backtop-demo {
  height: 100vh;
  position: relative;
}

.scroll-content {
  height: 100%;
  overflow-y: auto;
}

.long-content {
  padding: 20rpx;
  border-bottom: 1rpx solid #ebedf0;
}
</style>
```

### 2. 自定义位置和样式

```vue
<template>
  <view class="backtop-demo">
    <view class="scroll-content" @scroll="handleScroll">
      <view class="long-content" v-for="i in 50" :key="i">
        这是第 {{ i }} 行内容
      </view>
    </view>
    <wd-backtop 
      :scroll-top="scrollTop" 
      :bottom="50" 
      :right="50" 
      :z-index="100"
      :duration="300"
      shape="square"
      icon-style="color: #4D80F0; font-size: 40rpx;"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 自定义位置和样式的回到顶部
const scrollTop = ref(0)

// 处理滚动事件
const handleScroll = (e: any) => {
  scrollTop.value = e.detail.scrollTop
}
</script>

<style scoped>
.backtop-demo {
  height: 100vh;
  position: relative;
}

.scroll-content {
  height: 100%;
  overflow-y: auto;
}

.long-content {
  padding: 20rpx;
  border-bottom: 1rpx solid #ebedf0;
}
</style>
```

### 3. 自定义触发距离

```vue
<template>
  <view class="backtop-demo">
    <view class="scroll-content" @scroll="handleScroll">
      <view class="long-content" v-for="i in 50" :key="i">
        这是第 {{ i }} 行内容
      </view>
    </view>
    <wd-backtop 
      :scroll-top="scrollTop" 
      :top="100"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 自定义触发距离的回到顶部
const scrollTop = ref(0)

// 处理滚动事件
const handleScroll = (e: any) => {
  scrollTop.value = e.detail.scrollTop
}
</script>

<style scoped>
.backtop-demo {
  height: 100vh;
  position: relative;
}

.scroll-content {
  height: 100%;
  overflow-y: auto;
}

.long-content {
  padding: 20rpx;
  border-bottom: 1rpx solid #ebedf0;
}
</style>
```

### 4. 自定义内容

```vue
<template>
  <view class="backtop-demo">
    <view class="scroll-content" @scroll="handleScroll">
      <view class="long-content" v-for="i in 50" :key="i">
        这是第 {{ i }} 行内容
      </view>
    </view>
    <wd-backtop :scroll-top="scrollTop" customClass="custom-backtop">
      <view class="backtop-content">
        <wd-icon name="arrow-up" size="32" color="#fff" />
        <wd-text color="#fff" size="20">顶部</wd-text>
      </view>
    </wd-backtop>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 自定义内容的回到顶部
const scrollTop = ref(0)

// 处理滚动事件
const handleScroll = (e: any) => {
  scrollTop.value = e.detail.scrollTop
}
</script>

<style scoped>
.backtop-demo {
  height: 100vh;
  position: relative;
}

.scroll-content {
  height: 100%;
  overflow-y: auto;
}

.long-content {
  padding: 20rpx;
  border-bottom: 1rpx solid #ebedf0;
}

/* 自定义回到顶部样式 */
:deep(.custom-backtop) {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80rpx;
  height: 80rpx;
  background-color: #4D80F0;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(77, 128, 240, 0.3);
}

.backtop-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rpx;
}
</style>
```

### 5. 结合页面滚动事件

```vue
<template>
  <view class="backtop-demo">
    <view class="demo-title">结合页面滚动事件</view>
    <view class="scroll-content" @scroll="handleScroll">
      <view class="long-content" v-for="i in 50" :key="i">
        这是第 {{ i }} 行内容
      </view>
    </view>
    <wd-backtop :scroll-top="scrollTop" />
    <view class="scroll-info">滚动距离：{{ scrollTop }}px</view>
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 结合页面滚动事件的回到顶部
const scrollTop = ref(0)

// 处理滚动事件
const handleScroll = (e: any) => {
  scrollTop.value = e.detail.scrollTop
}

// 页面滚动事件（如果使用页面级滚动）
onMounted(() => {
  uni.pageScrollTo({
    scrollTop: 0,
    duration: 0
  })
})
</script>

<style scoped>
.backtop-demo {
  height: 100vh;
  position: relative;
}

.demo-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  padding: 20rpx;
  background-color: #f5f7fa;
}

.scroll-content {
  height: calc(100% - 120rpx);
  overflow-y: auto;
}

.long-content {
  padding: 20rpx;
  border-bottom: 1rpx solid #ebedf0;
}

.scroll-info {
  padding: 20rpx;
  background-color: #f5f7fa;
  font-size: 28rpx;
  color: #666;
  text-align: center;
}
</style>
```

## 样式定制指南

### 1. 使用customStyle自定义样式

```vue
<template>
  <wd-backtop 
    :scroll-top="scrollTop" 
    customStyle="background-color: #34d19d; border-radius: 50%; width: 80rpx; height: 80rpx;"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const scrollTop = ref(0)
</script>
```

### 2. 使用customClass自定义类名

```vue
<template>
  <wd-backtop 
    :scroll-top="scrollTop" 
    customClass="my-backtop"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const scrollTop = ref(0)
</script>

<style scoped>
/* 注意：需要使用 ::v-deep 或 /deep/ 穿透 scoped 样式 */
:deep(.my-backtop) {
  background-color: #fa4350;
  border-radius: 50%;
  width: 80rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(250, 67, 80, 0.3);
}

:deep(.my-backtop .wd-backtop__backicon) {
  color: #fff;
  font-size: 40rpx;
}
</style>
```

### 3. 自定义图标样式

```vue
<template>
  <wd-backtop 
    :scroll-top="scrollTop" 
    icon-style="color: #f0883a; font-size: 48rpx;"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const scrollTop = ref(0)
</script>
```

## 注意事项

1. **scrollTop属性**：该属性是必填项，需要外部传入页面的滚动距离，用于控制回到顶部按钮的显示与隐藏

2. **触发距离**：top属性用于设置页面滚动到多少距离时显示回到顶部按钮，默认300px

3. **滚动时间**：duration属性用于设置点击回到顶部后，页面滚动到顶部的时间，默认100ms

4. **位置调整**：可以通过bottom和right属性调整回到顶部按钮的位置，单位为px

5. **形状选择**：支持circle（圆形）和square（方形）两种形状，默认为圆形

6. **自定义内容**：可以通过default插槽自定义回到顶部按钮的内容，例如添加文字、自定义图标等

7. **层级设置**：zIndex属性用于设置回到顶部按钮的层级，确保在其他元素之上显示

8. **动画效果**：组件内置了淡入淡出动画，当scrollTop超过top值时显示，否则隐藏

9. **性能优化**：建议使用节流或防抖处理scroll事件，避免频繁更新scrollTop值，影响性能

10. **页面级滚动**：如果使用的是页面级滚动而不是组件内滚动，需要监听页面的onPageScroll事件来更新scrollTop值