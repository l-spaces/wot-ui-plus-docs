# SwiperNav 轮播指示器
<demo-model url="/subPages/swiperNav/Index"></demo-model>

## 组件概况

### 组件概述
SwiperNav 是轮播指示器组件，用于配合 Swiper 组件使用，提供轮播图的导航功能。它支持多种指示器样式（点状、点条状、分式），支持水平和垂直方向，支持自定义位置和样式，适用于各种轮播图的导航场景。

### 详细功能描述
- 支持三种指示器类型：点状（dots）、点条状（dots-bar）、分式（fraction）
- 支持水平和垂直两种方向
- 支持自定义指示器位置
- 支持显示两侧控制按钮
- 支持自定义样式和类名
- 支持根据轮播项数量自动显示或隐藏
- 跨平台兼容

### 适用业务场景
- 轮播图导航指示器
- 滑块导航指示器
- 任何需要导航指示器的场景

## 完整API参考

### Props属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| current | number | 0 | 否 | 当前轮播在哪一项（下标） |
| direction | string | horizontal | 否 | 轮播滑动方向，可选值：horizontal（水平）、vertical（垂直） |
| minShowNum | number | 2 | 否 | 小于这个数字不会显示导航器 |
| indicatorPosition | string | bottom | 否 | 指示器位置，可选值：left、top-left、top、top-right、bottom-left、bottom、bottom-right、right |
| showControls | boolean | false | 否 | 是否显示两侧的控制按钮 |
| total | number | 0 | 否 | 总共的项数 |
| type | string | dots | 否 | 指示器类型，可选值：dots（点状）、dots-bar（点条状）、fraction（分式） |
| customStyle | string | - | 否 | 自定义根节点样式 |
| customClass | string | - | 否 | 自定义根节点样式类 |

### Events事件

| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| change | 点击控制按钮时 | `{ dir: 点击方向（prev、next）, source: 切换方式（nav） }` |

### Methods方法

该组件没有对外暴露的方法。

### Slots插槽

该组件没有可用的插槽。

## 多场景使用示例代码

### 1. 基础用法

```vue
<template>
  <view class="swiper-nav-demo">
    <wd-swiper-nav :current="current" :total="total"></wd-swiper-nav>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const current = ref(0)
const total = ref(5)
</script>

<style scoped>
.swiper-nav-demo {
  padding: 40rpx;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200rpx;
}
</style>
```

### 2. 不同类型的指示器

```vue
<template>
  <view class="swiper-nav-demo">
    <view class="demo-item">
      <text class="demo-title">点状指示器</text>
      <wd-swiper-nav :current="current" :total="total" type="dots"></wd-swiper-nav>
    </view>
    
    <view class="demo-item">
      <text class="demo-title">点条状指示器</text>
      <wd-swiper-nav :current="current" :total="total" type="dots-bar"></wd-swiper-nav>
    </view>
    
    <view class="demo-item">
      <text class="demo-title">分式指示器</text>
      <wd-swiper-nav :current="current" :total="total" type="fraction"></wd-swiper-nav>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const current = ref(1)
const total = ref(5)
</script>

<style scoped>
.swiper-nav-demo {
  padding: 40rpx;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  gap: 40rpx;
}

.demo-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20rpx;
}

.demo-title {
  font-size: 28rpx;
  color: #606266;
}
</style>
```

### 3. 显示控制按钮

```vue
<template>
  <view class="swiper-nav-demo">
    <wd-swiper-nav 
      :current="current" 
      :total="total" 
      show-controls
      :indicator-position="'top'"
    ></wd-swiper-nav>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const current = ref(2)
const total = ref(5)
</script>

<style scoped>
.swiper-nav-demo {
  padding: 40rpx;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200rpx;
  position: relative;
}
</style>
```

### 4. 垂直方向指示器

```vue
<template>
  <view class="swiper-nav-demo">
    <wd-swiper-nav 
      :current="current" 
      :total="total" 
      direction="vertical"
      :indicator-position="'right'"
    ></wd-swiper-nav>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const current = ref(1)
const total = ref(5)
</script>

<style scoped>
.swiper-nav-demo {
  padding: 40rpx;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300rpx;
  position: relative;
}
</style>
```

### 5. 自定义样式

```vue
<template>
  <view class="swiper-nav-demo">
    <wd-swiper-nav 
      :current="current" 
      :total="total" 
      type="dots"
      customStyle="background-color: rgba(0, 0, 0, 0.3); padding: 10rpx; border-radius: 20rpx;"
      customClass="my-swiper-nav"
    ></wd-swiper-nav>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const current = ref(0)
const total = ref(5)
</script>

<style scoped>
.swiper-nav-demo {
  padding: 40rpx;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200rpx;
}

:deep(.my-swiper-nav .wd-swiper-nav__item--dots) {
  width: 20rpx;
  height: 20rpx;
  margin: 0 10rpx;
  border-radius: 50%;
}

:deep(.my-swiper-nav .wd-swiper-nav__item--dots.is-active) {
  background-color: #1989fa;
  width: 40rpx;
  border-radius: 10rpx;
}
</style>
```

## 样式定制指南

### 1. 使用customStyle自定义样式

```vue
<template>
  <wd-swiper-nav 
    :current="current" 
    :total="total"
    customStyle="background-color: rgba(0, 0, 0, 0.5); padding: 15rpx; border-radius: 25rpx;"
  ></wd-swiper-nav>
</template>
```

### 2. 使用customClass自定义类名

```vue
<template>
  <wd-swiper-nav 
    :current="current" 
    :total="total"
    customClass="my-swiper-nav"
  ></wd-swiper-nav>
</template>

<style scoped>
:deep(.my-swiper-nav) {
  background-color: rgba(0, 0, 0, 0.5);
  padding: 15rpx;
  border-radius: 25rpx;
}

:deep(.my-swiper-nav .wd-swiper-nav__item--dots) {
  width: 20rpx;
  height: 20rpx;
  margin: 0 10rpx;
  background-color: rgba(255, 255, 255, 0.5);
}

:deep(.my-swiper-nav .wd-swiper-nav__item--dots.is-active) {
  background-color: #fff;
  width: 40rpx;
  border-radius: 10rpx;
}
</style>
```

### 3. 自定义分式指示器样式

```vue
<template>
  <wd-swiper-nav 
    :current="current" 
    :total="total"
    type="fraction"
    customClass="fraction-nav"
  ></wd-swiper-nav>
</template>

<style scoped>
:deep(.fraction-nav) {
  font-size: 32rpx;
  font-weight: bold;
  color: #1989fa;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10rpx 20rpx;
  border-radius: 20rpx;
}
</style>
```

### 4. 自定义控制按钮样式

```vue
<template>
  <wd-swiper-nav 
    :current="current" 
    :total="total"
    show-controls
    customClass="controls-nav"
  ></wd-swiper-nav>
</template>

<style scoped>
:deep(.controls-nav .wd-swiper-nav__btn--prev),
:deep(.controls-nav .wd-swiper-nav__btn--next) {
  width: 60rpx;
  height: 60rpx;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
}

:deep(.controls-nav .wd-swiper-nav__btn--prev::before),
:deep(.controls-nav .wd-swiper-nav__btn--next::before) {
  color: #fff;
  font-size: 32rpx;
}
</style>
```

## 注意事项

1. **指示器类型**：
   - dots：点状指示器，默认类型
   - dots-bar：点条状指示器，适合水平方向
   - fraction：分式指示器，显示当前页码/总页码

2. **显示条件**：
   - 当total属性值小于minShowNum属性值时，指示器不会显示
   - 建议根据实际需求调整minShowNum属性

3. **控制按钮**：
   - 通过showControls属性控制是否显示两侧控制按钮
   - 点击控制按钮会触发change事件，需要父组件处理切换逻辑

4. **位置设置**：
   - indicatorPosition属性用于设置指示器位置
   - 支持8种位置：left、top-left、top、top-right、bottom-left、bottom、bottom-right、right

5. **方向设置**：
   - direction属性用于设置指示器方向
   - horizontal：水平方向，默认值
   - vertical：垂直方向

6. **样式定制**：
   - 可以通过customStyle和customClass属性自定义样式
   - 可以通过穿透选择器修改内部样式

7. **跨平台兼容性**：
   - 组件在H5、App和小程序平台表现一致
   - 控制按钮的样式在不同平台可能有细微差异

8. **性能优化**：
   - 当total属性值较大时，建议使用fraction类型，避免渲染过多DOM元素
   - 动态更新total属性时，组件会自动重新渲染

9. **与Swiper组件配合使用**：
   - SwiperNav组件通常与Swiper组件配合使用
   - Swiper组件内部会自动调用SwiperNav组件，无需手动调用
   - 也可以单独使用SwiperNav组件，用于其他需要导航指示器的场景

10. **事件处理**：
    - change事件会在点击控制按钮时触发
    - 事件参数包含dir（方向）和source（切换方式）
    - 需要父组件处理事件，实现实际的切换逻辑