# SwipeAction 滑动操作
<demo-model url="/subPages/swipeAction/Index"></demo-model>

## 组件概况

### 组件概述
SwipeAction 是滑动操作组件，用于实现列表项的左滑和右滑显示操作按钮功能。它支持自定义左右操作区域，支持禁用滑动，支持滑动状态的双向绑定，适用于各种需要滑动操作的场景。

### 详细功能描述
- 支持左滑和右滑显示操作按钮
- 支持自定义左右操作区域的内容
- 支持禁用滑动操作
- 支持滑动状态的双向绑定
- 支持关闭前的钩子函数
- 自动关闭其他已打开的滑动项
- 支持自定义样式和类名
- 跨平台兼容

### 适用业务场景
- 列表项的滑动删除
- 列表项的滑动编辑
- 列表项的滑动分享
- 任何需要滑动操作的列表场景

## 完整API参考

### Props属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| modelValue | string | close | 否 | 滑动按钮的状态，可选值：left（左滑）、close（关闭状态）、right（右滑） |
| disabled | boolean | false | 否 | 是否禁用滑动操作 |
| beforeClose | function | - | 否 | 关闭滑动按钮前调用的钩子函数，参数：(reason, position) |
| customStyle | string | - | 否 | 自定义根节点样式 |
| customClass | string | - | 否 | 自定义根节点样式类 |

### Events事件

| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| click | 点击滑动操作按钮区域或内容区域 |  value: 点击位置，可选值：left、right、inside  |
| update:modelValue | 滑动状态改变时 | value: 新的滑动状态，可选值：left、close、right |

### Methods方法

| 方法名 | 参数 | 返回值 | 功能说明 |
|--------|------|--------|----------|
| close | - | - | 关闭滑动操作按钮 |

### Slots插槽

| 插槽名 | 作用域变量 | 使用说明 |
|--------|------------|----------|
| default | - | 列表项的主要内容 |
| left | - | 左滑显示的操作按钮区域 |
| right | - | 右滑显示的操作按钮区域 |

## 多场景使用示例代码

### 1. 基础用法

```vue
<template>
  <view class="swipe-action-demo">
    <wd-swipe-action v-model="swipeStatus">
      <!-- 列表项内容 -->
      <view class="list-item">
        <text>这是一个可滑动的列表项</text>
      </view>
      <!-- 右滑操作按钮 -->
      <template #right>
        <view class="action-button action-delete" @click.stop="handleDelete">
          <text>删除</text>
        </view>
      </template>
    </wd-swipe-action>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const swipeStatus = ref('close')

const handleDelete = () => {
  console.log('删除操作')
  // 关闭滑动操作
  swipeStatus.value = 'close'
}
</script>

<style scoped>
.swipe-action-demo {
  padding: 20rpx;
  background-color: #f5f5f5;
}

.list-item {
  height: 100rpx;
  line-height: 100rpx;
  padding: 0 20rpx;
  background-color: #fff;
  border-radius: 8rpx;
}

.action-button {
  height: 100rpx;
  line-height: 100rpx;
  padding: 0 30rpx;
  color: #fff;
  font-size: 28rpx;
}

.action-delete {
  background-color: #f44336;
}
</style>
```

### 2. 左右双向滑动

```vue
<template>
  <view class="swipe-action-demo">
    <wd-swipe-action v-model="swipeStatus">
      <!-- 列表项内容 -->
      <view class="list-item">
        <text>这是一个支持左右双向滑动的列表项</text>
      </view>
      <!-- 左滑操作按钮 -->
      <template #left>
        <view class="action-button action-favorite" @click.stop="handleFavorite">
          <text>收藏</text>
        </view>
      </template>
      <!-- 右滑操作按钮 -->
      <template #right>
        <view class="action-button action-edit" @click.stop="handleEdit">
          <text>编辑</text>
        </view>
        <view class="action-button action-delete" @click.stop="handleDelete">
          <text>删除</text>
        </view>
      </template>
    </wd-swipe-action>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const swipeStatus = ref('close')

const handleFavorite = () => {
  console.log('收藏操作')
  swipeStatus.value = 'close'
}

const handleEdit = () => {
  console.log('编辑操作')
  swipeStatus.value = 'close'
}

const handleDelete = () => {
  console.log('删除操作')
  swipeStatus.value = 'close'
}
</script>

<style scoped>
.swipe-action-demo {
  padding: 20rpx;
  background-color: #f5f5f5;
}

.list-item {
  height: 100rpx;
  line-height: 100rpx;
  padding: 0 20rpx;
  background-color: #fff;
  border-radius: 8rpx;
}

.action-button {
  height: 100rpx;
  line-height: 100rpx;
  padding: 0 30rpx;
  color: #fff;
  font-size: 28rpx;
}

.action-favorite {
  background-color: #ff9800;
}

.action-edit {
  background-color: #1989fa;
}

.action-delete {
  background-color: #f44336;
}
</style>
```

### 3. 列表中使用

```vue
<template>
  <view class="swipe-action-demo">
    <wd-swipe-action 
      v-for="(item, index) in list" 
      :key="item.id" 
      v-model="item.swipeStatus"
      :before-close="beforeClose"
    >
      <!-- 列表项内容 -->
      <view class="list-item">
        <text class="item-text">{{ item.text }}</text>
      </view>
      <!-- 右滑操作按钮 -->
      <template #right>
        <view class="action-button action-delete" @click.stop="handleDelete(index)">
          <text>删除</text>
        </view>
      </template>
    </wd-swipe-action>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 模拟列表数据
const list = ref([
  { id: 1, text: '列表项 1', swipeStatus: 'close' },
  { id: 2, text: '列表项 2', swipeStatus: 'close' },
  { id: 3, text: '列表项 3', swipeStatus: 'close' },
  { id: 4, text: '列表项 4', swipeStatus: 'close' },
  { id: 5, text: '列表项 5', swipeStatus: 'close' }
])

// 关闭前的钩子函数
const beforeClose = (reason: string, position: string) => {
  console.log('关闭前的钩子函数', reason, position)
  // 可以在这里添加确认提示等逻辑
}

// 删除操作
const handleDelete = (index: number) => {
  console.log('删除列表项', index)
  list.value.splice(index, 1)
}
</script>

<style scoped>
.swipe-action-demo {
  padding: 20rpx;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.list-item {
  height: 100rpx;
  line-height: 100rpx;
  padding: 0 20rpx;
  background-color: #fff;
  border-radius: 8rpx;
}

.item-text {
  font-size: 28rpx;
  color: #303133;
}

.action-button {
  height: 100rpx;
  line-height: 100rpx;
  padding: 0 30rpx;
  color: #fff;
  font-size: 28rpx;
}

.action-delete {
  background-color: #f44336;
}
</style>
```

### 4. 禁用滑动

```vue
<template>
  <view class="swipe-action-demo">
    <wd-swipe-action v-model="swipeStatus" disabled>
      <!-- 列表项内容 -->
      <view class="list-item">
        <text>这是一个禁用滑动的列表项</text>
      </view>
      <!-- 右滑操作按钮 -->
      <template #right>
        <view class="action-button action-delete" @click.stop="handleDelete">
          <text>删除</text>
        </view>
      </template>
    </wd-swipe-action>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const swipeStatus = ref('close')

const handleDelete = () => {
  console.log('删除操作')
  swipeStatus.value = 'close'
}
</script>

<style scoped>
.swipe-action-demo {
  padding: 20rpx;
  background-color: #f5f5f5;
}

.list-item {
  height: 100rpx;
  line-height: 100rpx;
  padding: 0 20rpx;
  background-color: #fff;
  border-radius: 8rpx;
  opacity: 0.7;
}

.action-button {
  height: 100rpx;
  line-height: 100rpx;
  padding: 0 30rpx;
  color: #fff;
  font-size: 28rpx;
}

.action-delete {
  background-color: #f44336;
}
</style>
```

### 5. 自定义样式

```vue
<template>
  <view class="swipe-action-demo">
    <wd-swipe-action 
      v-model="swipeStatus"
      customStyle="background-color: #f0f9ff; border-radius: 16rpx; overflow: hidden;"
      customClass="my-swipe-action"
    >
      <!-- 列表项内容 -->
      <view class="list-item">
        <text class="item-title">自定义样式列表项</text>
        <text class="item-desc">这是一个带有自定义样式的可滑动列表项</text>
      </view>
      <!-- 右滑操作按钮 -->
      <template #right>
        <view class="action-button action-primary" @click.stop="handlePrimary">
          <text>主要操作</text>
        </view>
        <view class="action-button action-secondary" @click.stop="handleSecondary">
          <text>次要操作</text>
        </view>
      </template>
    </wd-swipe-action>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const swipeStatus = ref('close')

const handlePrimary = () => {
  console.log('主要操作')
  swipeStatus.value = 'close'
}

const handleSecondary = () => {
  console.log('次要操作')
  swipeStatus.value = 'close'
}
</script>

<style scoped>
.swipe-action-demo {
  padding: 20rpx;
  background-color: #f5f5f5;
}

.list-item {
  padding: 20rpx;
}

.item-title {
  display: block;
  font-size: 32rpx;
  font-weight: bold;
  color: #303133;
  margin-bottom: 10rpx;
}

.item-desc {
  display: block;
  font-size: 24rpx;
  color: #606266;
}

.action-button {
  height: 140rpx;
  line-height: 140rpx;
  padding: 0 40rpx;
  color: #fff;
  font-size: 28rpx;
}

.action-primary {
  background-color: #4caf50;
}

.action-secondary {
  background-color: #ff9800;
}

:deep(.my-swipe-action) {
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
}
</style>
```

## 样式定制指南

### 1. 使用customStyle自定义样式

```vue
<template>
  <wd-swipe-action 
    v-model="swipeStatus"
    customStyle="background-color: #f0f9ff; border-radius: 16rpx; overflow: hidden;"
  >
    <!-- 内容 -->
  </wd-swipe-action>
</template>
```

### 2. 使用customClass自定义类名

```vue
<template>
  <wd-swipe-action 
    v-model="swipeStatus"
    customClass="my-swipe-action"
  >
    <!-- 内容 -->
  </wd-swipe-action>
</template>

<style scoped>
:deep(.my-swipe-action) {
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
  margin-bottom: 20rpx;
}

:deep(.my-swipe-action .wd-swipe-action__wrapper) {
  border-radius: 16rpx;
}
</style>
```

### 3. 自定义操作按钮样式

```vue
<template>
  <wd-swipe-action v-model="swipeStatus">
    <!-- 内容 -->
    <template #right>
      <view class="custom-action-button custom-action-primary">
        <text>主要操作</text>
      </view>
      <view class="custom-action-button custom-action-secondary">
        <text>次要操作</text>
      </view>
    </template>
  </wd-swipe-action>
</template>

<style scoped>
.custom-action-button {
  height: 100rpx;
  line-height: 100rpx;
  padding: 0 40rpx;
  color: #fff;
  font-size: 28rpx;
  border-radius: 0 8rpx 8rpx 0;
}

.custom-action-primary {
  background-color: #1989fa;
}

.custom-action-secondary {
  background-color: #606266;
}
</style>
```

## 注意事项

1. **滑动状态**：modelValue属性用于控制滑动状态，可选值为'left'（左滑）、'close'（关闭状态）、'right'（右滑）。

2. **操作按钮区域**：
   - 使用left插槽定义左滑显示的操作按钮
   - 使用right插槽定义右滑显示的操作按钮
   - 操作按钮区域的宽度由内容自动撑开，建议为每个操作按钮设置固定宽度

3. **事件处理**：
   - click事件会在点击操作按钮区域或内容区域时触发，参数中包含点击位置
   - update:modelValue事件会在滑动状态改变时触发

4. **关闭机制**：
   - 点击操作按钮或内容区域会自动关闭滑动操作
   - 滑动其他列表项会自动关闭当前打开的滑动项
   - 可以通过调用close方法手动关闭滑动操作

5. **beforeClose钩子**：
   - beforeClose钩子函数会在关闭滑动操作前调用
   - 可以在此函数中添加确认提示等逻辑
   - 参数reason表示关闭原因，可选值为'click'、'swipe'、'value'
   - 参数position表示关闭位置，可选值为'left'、'right'、'inside'

6. **禁用滑动**：
   - 设置disabled属性为true可以禁用滑动操作
   - 禁用状态下，滑动操作按钮不会显示

7. **样式注意**：
   - 建议为列表项内容设置固定高度，以确保滑动效果正常
   - 自定义样式时，注意不要影响滑动交互
   - 操作按钮区域的样式可以自由定制，但建议保持一致的视觉风格

8. **性能优化**：
   - 在长列表中使用时，建议使用虚拟列表优化性能
   - 避免在滑动过程中进行复杂的计算或渲染

9. **跨平台兼容性**：
   - 组件在H5、App和小程序平台表现一致
   - 在小程序平台，需要注意手势事件的兼容性

10. **嵌套限制**：
    - 不建议在滑动操作组件内部嵌套其他滑动操作组件
    - 不建议在滑动操作组件内部使用其他需要手势操作的组件