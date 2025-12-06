# navbarCapsule 导航栏胶囊组件

<demo-model url="/subPages/navbarCapsule/Index"></demo-model>

## 组件概况

### 组件概述
导航栏胶囊组件是一个简洁的导航栏胶囊按钮组件，包含返回按钮和返回主页按钮两个图标按钮，通常用于页面顶部导航栏的左侧，提供快速返回和返回主页的功能。组件支持自定义样式，可灵活适配不同的设计风格。

### 详细功能描述
- 包含返回按钮和返回主页按钮两个图标按钮
- 支持点击返回按钮触发返回事件
- 支持点击返回主页按钮触发返回主页事件
- 支持自定义样式和类名
- 与导航栏组件无缝集成
- 跨平台兼容

### 适用业务场景
- 页面顶部导航栏的左侧胶囊按钮
- 需要快速返回和返回主页功能的页面
- 与wd-navbar组件配合使用
- 任何需要导航功能的页面

## 完整API参考

### Props

| 名称 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| customStyle | string | - | 否 | 自定义样式 |
| customClass | string | - | 否 | 自定义类名 |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| back | 点击返回按钮时 | - |
| back-home | 点击返回主页按钮时 | - |

### Methods

无

### Slots

无

## 多场景使用示例

### 基础用法

```vue
<template>
  <view>
    <wd-navbar>
      <template #capsule>
        <wd-navbar-capsule @back="onBack" @back-home="onBackHome" />
      </template>
      <template #title>
        导航栏胶囊
      </template>
    </wd-navbar>
  </view>
</template>

<script lang="ts" setup>
const onBack = () => {
  console.log('点击了返回按钮')
  uni.navigateBack()
}

const onBackHome = () => {
  console.log('点击了返回主页按钮')
  uni.switchTab({ url: '/pages/index/index' })
}
</script>
```

### 与导航栏组件配合使用

```vue
<template>
  <view>
    <wd-navbar 
      title="与导航栏配合" 
      fixed 
      placeholder 
      safe-area-inset-top
    >
      <template #capsule>
        <wd-navbar-capsule 
          @back="onBack" 
          @back-home="onBackHome" 
          custom-class="my-capsule"
        />
      </template>
    </wd-navbar>
    <view class="content">
      <!-- 页面内容 -->
    </view>
  </view>
</template>

<script lang="ts" setup>
const onBack = () => {
  uni.navigateBack()
}

const onBackHome = () => {
  uni.switchTab({ url: '/pages/index/index' })
}
</script>

<style scoped>
.content {
  padding-top: 88rpx; /* 导航栏高度 */
}

.my-capsule {
  /* 自定义胶囊样式 */
  color: #1890FF;
}
</style>
```

### 自定义样式

```vue
<template>
  <view>
    <wd-navbar title="自定义样式">
      <template #capsule>
        <wd-navbar-capsule 
          @back="onBack" 
          @back-home="onBackHome"
          :custom-style="{
            color: '#52C41A',
            fontSize: '36rpx',
            gap: '10rpx'
          }"
        />
      </template>
    </wd-navbar>
  </view>
</template>

<script lang="ts" setup>
const onBack = () => {
  uni.navigateBack()
}

const onBackHome = () => {
  uni.switchTab({ url: '/pages/index/index' })
}
</script>
```

### 在自定义导航栏中使用

```vue
<template>
  <view>
    <view class="custom-navbar">
      <wd-navbar-capsule 
        @back="onBack" 
        @back-home="onBackHome"
      />
      <view class="custom-navbar__title">自定义导航栏</view>
      <view class="custom-navbar__right">
        <wd-icon name="search" />
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
const onBack = () => {
  uni.navigateBack()
}

const onBackHome = () => {
  uni.switchTab({ url: '/pages/index/index' })
}
</script>

<style scoped>
.custom-navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 88rpx;
  padding: 0 20rpx;
  background-color: #fff;
  border-bottom: 1rpx solid #f0f0f0;
}

.custom-navbar__title {
  font-size: 32rpx;
  font-weight: bold;
}

.custom-navbar__right {
  color: #666;
}
</style>
```

## 样式定制指南

### 自定义样式

通过 `customStyle` 属性可以自定义导航栏胶囊组件的样式：

```vue
<wd-navbar-capsule 
  :custom-style="{
    color: '#1890FF',
    fontSize: '36rpx',
    gap: '10rpx'
  }"
/>
```

### 自定义类名

通过 `customClass` 属性可以添加自定义类名，然后在样式文件中定义样式：

```vue
<wd-navbar-capsule custom-class="my-capsule" />
```

```scss
.my-capsule {
  /* 自定义胶囊组件样式 */
  color: #1890FF;
  
  .wd-navbar-capsule__icon {
    /* 自定义图标样式 */
    font-size: 36rpx;
    margin-right: 10rpx;
    
    &:last-child {
      margin-right: 0;
    }
  }
}
```

## 注意事项

1. 组件集成：
   - 导航栏胶囊组件通常与 `wd-navbar` 组件配合使用，通过 `capsule` 插槽插入到导航栏的左侧
   - 也可以单独使用，自定义导航栏布局

2. 事件处理：
   - `back` 事件在点击返回按钮时触发，通常用于执行页面返回操作
   - `back-home` 事件在点击返回主页按钮时触发，通常用于跳转到首页
   - 需在事件回调中自行实现具体的导航逻辑，如 `uni.navigateBack()` 或 `uni.switchTab()`

3. 样式定制：
   - 可通过 `customStyle` 属性直接设置内联样式
   - 可通过 `customClass` 属性添加自定义类名，然后在样式文件中定义更复杂的样式
   - 组件默认样式简洁，便于与各种设计风格适配

4. 图标样式：
   - 组件使用 `wd-icon` 组件实现图标，默认图标大小为 24px
   - 可通过自定义样式调整图标大小和颜色
   - 图标名称固定为 'left'（返回图标）和 'home'（主页图标）

5. 跨平台兼容：
   - 组件支持跨平台使用，包括 H5、小程序和 App
   - 在不同平台上，组件表现一致，无需额外适配

6. 最佳实践：
   - 与 `wd-navbar` 组件配合使用时，建议设置 `safeAreaInsetTop` 属性，以适配全面屏设备
   - 固定定位时，建议同时设置 `placeholder` 属性，以避免页面内容上移
   - 根据设计需求，合理调整胶囊按钮的颜色和大小，确保与整体设计风格一致