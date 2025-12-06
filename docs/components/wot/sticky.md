# Sticky 吸顶
<demo-model url="/subPages/sticky/Index"></demo-model>

## 组件概况

### 组件概述
Sticky 是吸顶组件，用于实现元素在滚动到指定位置时固定在视口顶部的效果。它支持自定义吸顶距离和层级，可与 StickyBox 组件配合使用，实现多个吸顶元素的堆叠效果，适用于各种需要固定顶部的场景。

### 详细功能描述
- 支持自定义吸顶距离
- 支持自定义层级
- 自动监听元素大小变化，适应动态内容
- 支持与 StickyBox 组件配合使用，实现多个吸顶元素的堆叠效果
- 支持自定义样式和类名
- 跨平台兼容

### 适用业务场景
- 页面导航栏吸顶
- 表格头部吸顶
- 筛选条件吸顶
- 商品分类吸顶
- 阅读进度条吸顶
- 任何需要吸顶效果的场景

## 完整API参考

### Props属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| zIndex | number | 1 | 否 | 吸顶元素的层级 |
| offsetTop | number | 0 | 否 | 吸顶距离，单位为px |
| customStyle | string | - | 否 | 自定义根节点样式 |
| customClass | string | - | 否 | 自定义根节点样式类 |

### Events事件

该组件没有对外暴露的事件。

### Methods方法

| 方法名 | 参数 | 返回值 | 功能说明 |
|--------|------|--------|----------|
| setPosition | boxLeaved: boolean, position: string, top: number | - | 设置吸顶元素的位置，内部使用 |
| stickyState | - | object | 吸顶状态对象，包含position、boxLeaved、top、height、width、state属性 |
| offsetTop | - | number | 吸顶距离，内部使用 |

### Slots插槽

| 插槽名 | 作用域变量 | 使用说明 |
|--------|------------|----------|
| default | - | 用于放置需要吸顶的内容 |

## 多场景使用示例代码

### 1. 基础用法

```vue
<template>
  <view class="sticky-demo">
    <view class="sticky-content">
      <view v-for="item in 50" :key="item" class="sticky-item">
        <text>{{ item }}</text>
      </view>
      <wd-sticky offset-top="80">
        <view class="sticky-box">
          这是吸顶内容
        </view>
      </wd-sticky>
      <view v-for="item in 50" :key="item" class="sticky-item">
        <text>{{ item }}</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
// 基础吸顶用法
</script>

<style scoped>
.sticky-demo {
  padding: 20rpx;
}

.sticky-content {
  background-color: #f5f5f5;
  border-radius: 12rpx;
  padding: 20rpx;
}

.sticky-item {
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
  background-color: #fff;
  border-radius: 8rpx;
  margin-bottom: 20rpx;
}

.sticky-box {
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  background-color: #1989fa;
  color: #fff;
  border-radius: 8rpx;
  margin-bottom: 20rpx;
}
</style>
```

### 2. 自定义吸顶距离和层级

```vue
<template>
  <view class="sticky-demo">
    <view class="sticky-content">
      <view v-for="item in 30" :key="item" class="sticky-item">
        <text>{{ item }}</text>
      </view>
      <wd-sticky offset-top="120" :z-index="10">
        <view class="sticky-box">
          自定义吸顶距离和层级
        </view>
      </wd-sticky>
      <view v-for="item in 30" :key="item" class="sticky-item">
        <text>{{ item }}</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
// 自定义吸顶距离和层级
</script>

<style scoped>
.sticky-demo {
  padding: 20rpx;
}

.sticky-content {
  background-color: #f5f5f5;
  border-radius: 12rpx;
  padding: 20rpx;
}

.sticky-item {
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
  background-color: #fff;
  border-radius: 8rpx;
  margin-bottom: 20rpx;
}

.sticky-box {
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  background-color: #4caf50;
  color: #fff;
  border-radius: 8rpx;
  margin-bottom: 20rpx;
}
</style>
```

### 3. 多个吸顶元素

```vue
<template>
  <view class="sticky-demo">
    <wd-sticky-box>
      <view class="sticky-content">
        <view v-for="item in 20" :key="item" class="sticky-item">
          <text>{{ item }}</text>
        </view>
        <wd-sticky>
          <view class="sticky-box sticky-box-1">
            第一个吸顶元素
          </view>
        </wd-sticky>
        <view v-for="item in 20" :key="item" class="sticky-item">
          <text>{{ item }}</text>
        </view>
        <wd-sticky>
          <view class="sticky-box sticky-box-2">
            第二个吸顶元素
          </view>
        </wd-sticky>
        <view v-for="item in 40" :key="item" class="sticky-item">
          <text>{{ item }}</text>
        </view>
      </view>
    </wd-sticky-box>
  </view>
</template>

<script lang="ts" setup>
// 多个吸顶元素配合使用
</script>

<style scoped>
.sticky-demo {
  padding: 20rpx;
}

.sticky-content {
  background-color: #f5f5f5;
  border-radius: 12rpx;
  padding: 20rpx;
}

.sticky-item {
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
  background-color: #fff;
  border-radius: 8rpx;
  margin-bottom: 20rpx;
}

.sticky-box {
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  color: #fff;
  border-radius: 8rpx;
  margin-bottom: 20rpx;
}

.sticky-box-1 {
  background-color: #1989fa;
}

.sticky-box-2 {
  background-color: #4caf50;
}
</style>
```

### 4. 动态内容吸顶

```vue
<template>
  <view class="sticky-demo">
    <view class="sticky-content">
      <view v-for="item in 20" :key="item" class="sticky-item">
        <text>{{ item }}</text>
      </view>
      <wd-sticky>
        <view class="sticky-box" :style="{ height: boxHeight + 'rpx' }">
          <text>{{ dynamicText }}</text>
          <wd-button size="small" @click="changeHeight">改变高度</wd-button>
        </view>
      </wd-sticky>
      <view v-for="item in 40" :key="item" class="sticky-item">
        <text>{{ item }}</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const boxHeight = ref(80)
const dynamicText = ref('动态内容吸顶')

const changeHeight = () => {
  boxHeight.value = boxHeight.value === 80 ? 120 : 80
  dynamicText.value = `高度已改变为 ${boxHeight.value}rpx`
}
</script>

<style scoped>
.sticky-demo {
  padding: 20rpx;
}

.sticky-content {
  background-color: #f5f5f5;
  border-radius: 12rpx;
  padding: 20rpx;
}

.sticky-item {
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
  background-color: #fff;
  border-radius: 8rpx;
  margin-bottom: 20rpx;
}

.sticky-box {
  line-height: 80rpx;
  text-align: center;
  background-color: #ff9800;
  color: #fff;
  border-radius: 8rpx;
  margin-bottom: 20rpx;
  padding: 20rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10rpx;
}
</style>
```

### 5. 导航栏吸顶

```vue
<template>
  <view class="sticky-demo">
    <view class="sticky-content">
      <view class="page-header">
        <text class="page-title">页面标题</text>
      </view>
      <wd-sticky offset-top="0">
        <view class="nav-bar">
          <view 
            v-for="tab in tabs" 
            :key="tab" 
            class="nav-item" 
            :class="{ active: activeTab === tab }"
            @click="activeTab = tab"
          >
            <text>{{ tab }}</text>
          </view>
        </view>
      </wd-sticky>
      <view v-for="item in 60" :key="item" class="sticky-item">
        <text>{{ activeTab }} - {{ item }}</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const tabs = ['推荐', '热门', '最新', '关注']
const activeTab = ref(tabs[0])
</script>

<style scoped>
.sticky-demo {
  padding: 0;
}

.page-header {
  height: 200rpx;
  background-color: #1989fa;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-title {
  font-size: 36rpx;
  font-weight: bold;
}

.nav-bar {
  display: flex;
  background-color: #fff;
  border-bottom: 1rpx solid #ebedf0;
}

.nav-item {
  flex: 1;
  height: 88rpx;
  line-height: 88rpx;
  text-align: center;
  font-size: 28rpx;
  color: #606266;
  position: relative;
}

.nav-item.active {
  color: #1989fa;
}

.nav-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40rpx;
  height: 4rpx;
  background-color: #1989fa;
  border-radius: 2rpx;
}

.sticky-item {
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
  background-color: #f5f5f5;
  border-bottom: 1rpx solid #ebedf0;
}
</style>
```

## 样式定制指南

### 1. 使用customStyle自定义样式

```vue
<template>
  <view class="sticky-demo">
    <wd-sticky 
      customStyle="border-radius: 12rpx; box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);"
    >
      <view class="sticky-box">
        自定义样式吸顶
      </view>
    </wd-sticky>
  </view>
</template>
```

### 2. 使用customClass自定义类名

```vue
<template>
  <view class="sticky-demo">
    <wd-sticky customClass="my-sticky">
      <view class="sticky-box">
        自定义类名吸顶
      </view>
    </wd-sticky>
  </view>
</template>

<script lang="ts" setup>
// 自定义类名示例
</script>

<style scoped>
:deep(.my-sticky) {
  border-radius: 12rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
}

.sticky-box {
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  background-color: #1989fa;
  color: #fff;
}
</style>
```

## 注意事项

1. **吸顶距离**：offsetTop 属性用于设置吸顶元素距离顶部的距离，单位为 px，默认值为 0。

2. **层级设置**：zIndex 属性用于设置吸顶元素的层级，确保吸顶元素显示在其他元素之上。

3. **多个吸顶元素**：当需要实现多个吸顶元素时，建议使用 StickyBox 组件包裹，以实现正确的堆叠效果。

4. **动态内容**：组件会自动监听内容大小变化，适应动态调整的内容高度。

5. **性能优化**：组件内部使用了 IntersectionObserver API 监听元素位置变化，性能较高，但在大量使用时仍需注意性能影响。

6. **跨平台兼容性**：组件在 H5、App 和小程序平台表现一致，但在 H5 平台会自动计算导航栏高度。

7. **布局注意**：吸顶元素的父容器应避免使用 `overflow: hidden` 或 `position: relative` 等可能影响吸顶效果的样式。

8. **内容大小**：吸顶元素的内容大小应适中，避免过大的内容导致吸顶区域占用过多屏幕空间。

9. **样式继承**：customStyle 和 customClass 会应用到吸顶元素的根节点上，可以通过穿透选择器修改内部样式。

10. **初始化位置**：组件会在初始化时计算元素位置，确保初始状态正确。