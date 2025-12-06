# Transition 过渡动画
<demo-model url="/subPages/transition/Index"></demo-model>

## 组件概况

### 组件概述
Transition 是一个用于实现元素进入和离开过渡动画的组件，它提供了多种预设动画效果，并支持自定义动画类和持续时间，可用于增强用户界面的交互体验。

### 详细功能描述
- 支持多种预设动画类型，包括淡入淡出、滑动、缩放等
- 提供完整的动画生命周期事件，便于在不同阶段执行自定义逻辑
- 支持自定义动画持续时间和类名
- 支持懒渲染，触发展示时才渲染内容
- 支持动画结束后销毁子节点
- 支持阻止触摸滚动
- 支持同时使用多个动画类型

### 适用业务场景
- 模态框、弹窗的显示和隐藏动画
- 下拉菜单、侧边栏的滑入滑出效果
- 内容区域的淡入淡出切换
- 列表项的添加和删除动画
- 任何需要平滑过渡效果的元素显示/隐藏场景

## 完整API参考

### Props

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| show | boolean | false | 否 | 是否展示组件 |
| duration | number / boolean / Record<string, number> | 300 | 否 | 动画执行时间，支持统一设置或分别设置进入和离开时间 |
| lazyRender | boolean | false | 否 | 弹层内容懒渲染，触发展示时才渲染内容 |
| name | string / array | 'fade' | 否 | 动画类型，可选值：fade / fade-up / fade-down / fade-left / fade-right / slide-up / slide-down / slide-left / slide-right / zoom-in / zoom-out，支持同时使用多个动画 |
| destroy | boolean | true | 否 | 是否在动画结束时销毁子节点（display: none) |
| enterClass | string | '' | 否 | 进入过渡的开始状态类名 |
| enterActiveClass | string | '' | 否 | 进入过渡的激活状态类名 |
| enterToClass | string | '' | 否 | 进入过渡的结束状态类名 |
| leaveClass | string | '' | 否 | 离开过渡的开始状态类名 |
| leaveActiveClass | string | '' | 否 | 离开过渡的激活状态类名 |
| leaveToClass | string | '' | 否 | 离开过渡的结束状态类名 |
| disableTouchMove | boolean | false | 否 | 是否阻止触摸滚动 |
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |

### Events

| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| click | 点击组件时 | 无 |
| before-enter | 进入动画开始前 | 无 |
| enter | 进入动画开始时 | 无 |
| before-leave | 离开动画开始前 | 无 |
| leave | 离开动画开始时 | 无 |
| after-leave | 离开动画结束后 | 无 |
| after-enter | 进入动画结束后 | 无 |

### Methods

该组件没有对外暴露的方法。

### Slots

| 插槽名 | 作用域变量 | 使用说明 |
|--------|------------|----------|
| default | 无 | 放置需要添加过渡动画的内容 |

## 多场景使用示例代码

### 基础用法

```vue
<template>
  <view>
    <wd-button type="primary" @click="show = !show">切换显示</wd-button>
    <wd-transition :show="show">
      <view class="content">这是一个带有淡入淡出动画的内容</view>
    </wd-transition>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
</script>

<style scoped>
.content {
  width: 200px;
  height: 100px;
  background-color: #409eff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
  border-radius: 8px;
}
</style>
```

### 自定义动画类型

```vue
<template>
  <view>
    <wd-button type="primary" @click="showSlide = !showSlide">滑动动画</wd-button>
    <wd-button type="success" @click="showZoom = !showZoom">缩放动画</wd-button>
    
    <wd-transition :show="showSlide" name="slide-up">
      <view class="content slide-content">这是一个向上滑动的内容</view>
    </wd-transition>
    
    <wd-transition :show="showZoom" name="zoom-in">
      <view class="content zoom-content">这是一个放大进入的内容</view>
    </wd-transition>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showSlide = ref(false)
const showZoom = ref(false)
</script>

<style scoped>
.content {
  width: 200px;
  height: 100px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
  border-radius: 8px;
}

.slide-content {
  background-color: #67c23a;
}

.zoom-content {
  background-color: #e6a23c;
}
</style>
```

### 同时使用多个动画类型

```vue
<template>
  <view>
    <wd-button type="primary" @click="showMultiple = !showMultiple">多重动画</wd-button>
    <wd-transition :show="showMultiple" :name="['fade', 'zoom-in']">
      <view class="content">这是一个同时具有淡入和放大效果的内容</view>
    </wd-transition>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showMultiple = ref(false)
</script>

<style scoped>
.content {
  width: 200px;
  height: 100px;
  background-color: #f56c6c;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
  border-radius: 8px;
}
</style>
```

### 自定义动画持续时间

```vue
<template>
  <view>
    <wd-button type="primary" @click="showCustomDuration = !showCustomDuration">自定义动画时间</wd-button>
    <wd-transition 
      :show="showCustomDuration" 
      :duration="{ enter: 1000, leave: 500 }"
      name="slide-down"
    >
      <view class="content">这是一个进入动画1秒，离开动画0.5秒的内容</view>
    </wd-transition>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showCustomDuration = ref(false)
</script>

<style scoped>
.content {
  width: 200px;
  height: 100px;
  background-color: #909399;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
  border-radius: 8px;
}
</style>
```

### 使用生命周期事件

```vue
<template>
  <view>
    <wd-button type="primary" @click="showEvent = !showEvent">动画事件</wd-button>
    <wd-transition 
      :show="showEvent" 
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @after-enter="onAfterEnter"
      @before-leave="onBeforeLeave"
      @leave="onLeave"
      @after-leave="onAfterLeave"
    >
      <view class="content">这是一个带有事件监听的动画内容</view>
    </wd-transition>
    <view class="event-log" v-if="eventLog.length > 0">
      <text class="title">事件日志：</text>
      <text v-for="(log, index) in eventLog" :key="index" class="log-item">{{ log }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showEvent = ref(false)
const eventLog = ref<string[]>([])

const addLog = (event: string) => {
  eventLog.value.push(`${new Date().toLocaleTimeString()}: ${event}`)
  // 限制日志数量
  if (eventLog.value.length > 10) {
    eventLog.value.shift()
  }
}

const onBeforeEnter = () => {
  addLog('before-enter 事件触发')
}

const onEnter = () => {
  addLog('enter 事件触发')
}

const onAfterEnter = () => {
  addLog('after-enter 事件触发')
}

const onBeforeLeave = () => {
  addLog('before-leave 事件触发')
}

const onLeave = () => {
  addLog('leave 事件触发')
}

const onAfterLeave = () => {
  addLog('after-leave 事件触发')
}
</script>

<style scoped>
.content {
  width: 200px;
  height: 100px;
  background-color: #409eff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
  border-radius: 8px;
}

.event-log {
  margin: 20px auto;
  padding: 10px;
  width: 300px;
  background-color: #f5f7fa;
  border-radius: 8px;
  font-size: 14px;
}

.title {
  font-weight: bold;
  display: block;
  margin-bottom: 10px;
  color: #303133;
}

.log-item {
  display: block;
  margin-bottom: 5px;
  color: #606266;
}
</style>
```

## 样式定制指南

### 自定义动画类

```vue
<template>
  <view>
    <wd-button type="primary" @click="showCustomClass = !showCustomClass">自定义动画类</wd-button>
    <wd-transition 
      :show="showCustomClass"
      enter-class="custom-enter"
      enter-active-class="custom-enter-active"
      enter-to-class="custom-enter-to"
      leave-class="custom-leave"
      leave-active-class="custom-leave-active"
      leave-to-class="custom-leave-to"
    >
      <view class="content">这是一个使用自定义动画类的内容</view>
    </wd-transition>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showCustomClass = ref(false)
</script>

<style scoped>
.content {
  width: 200px;
  height: 100px;
  background-color: #409eff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
  border-radius: 8px;
}

/* 自定义进入动画 */
.custom-enter {
  opacity: 0;
  transform: scale(0.5) rotate(-180deg);
}

.custom-enter-active {
  transition: all 0.5s ease;
}

.custom-enter-to {
  opacity: 1;
  transform: scale(1) rotate(0deg);
}

/* 自定义离开动画 */
.custom-leave {
  opacity: 1;
  transform: scale(1) rotate(0deg);
}

.custom-leave-active {
  transition: all 0.5s ease;
}

.custom-leave-to {
  opacity: 0;
  transform: scale(0.5) rotate(180deg);
}
</style>
```

## 注意事项

1. **动画类型**：name属性支持多种预设动画类型，可通过数组形式同时使用多个动画效果。
2. **动画时间**：duration属性支持统一设置或分别设置进入和离开时间，单位为毫秒。
3. **懒渲染**：lazyRender为true时，组件在首次显示前不会渲染内容，可用于优化性能。
4. **销毁节点**：destroy为true时，组件在动画结束后会设置display: none，可用于节省DOM资源。
5. **触摸滚动**：disableTouchMove为true时，会阻止组件内的触摸滚动事件，适用于模态框等场景。
6. **事件监听**：可通过监听动画生命周期事件，在不同阶段执行自定义逻辑。
7. **自定义动画**：通过设置enterClass、enterActiveClass、enterToClass、leaveClass、leaveActiveClass、leaveToClass属性，可完全自定义动画效果。
8. **嵌套使用**：支持嵌套使用Transition组件，实现复杂的动画效果。