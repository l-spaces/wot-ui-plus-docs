# navbar 导航栏组件

<demo-model url="/subPages/navbar/Index"></demo-model>

## 组件概况

### 组件概述
导航栏组件是一个用于页面顶部的导航栏，支持自定义标题、左侧和右侧内容，提供了固定定位、安全区域适配、底部边框控制等功能，可通过插槽自定义导航栏内容，适用于各种页面的顶部导航场景。

### 详细功能描述
- 支持自定义标题、左侧文字和右侧文字
- 支持显示左侧箭头
- 可控制是否显示底部边框
- 支持固定到顶部
- 固定时支持生成等高占位元素
- 支持顶部安全区域适配
- 支持禁用左侧和右侧按钮
- 提供了丰富的插槽，支持自定义导航栏内容
- 支持自定义样式和类名

### 适用业务场景
- 页面顶部导航
- 带返回按钮的页面
- 带右侧操作按钮的页面
- 需要自定义导航栏内容的页面
- 全面屏设备的安全区域适配

## 完整API参考

### Props

| 名称 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| title | string | - | 否 | 标题文字 |
| leftText | string | - | 否 | 左侧文案 |
| rightText | string | - | 否 | 右侧文案 |
| leftArrow | boolean | false | 否 | 是否显示左侧箭头 |
| bordered | boolean | true | 否 | 是否显示下边框 |
| fixed | boolean | false | 否 | 是否固定到顶部 |
| placeholder | boolean | false | 否 | 固定在顶部时，是否在标签位置生成一个等高的占位元素 |
| zIndex | number | 500 | 否 | 导航栏 z-index |
| safeAreaInsetTop | boolean | false | 否 | 是否开启顶部安全区适配 |
| leftDisabled | boolean | false | 否 | 是否禁用左侧按钮，禁用时透明度降低，且无法点击 |
| rightDisabled | boolean | false | 否 | 是否禁用右侧按钮，禁用时透明度降低，且无法点击 |
| customStyle | string | - | 否 | 自定义样式 |
| customClass | string | - | 否 | 自定义类名 |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| click-left | 点击左侧区域时 | - |
| click-right | 点击右侧区域时 | - |

### Methods

无

### Slots

| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| title | - | 自定义标题内容 |
| left | - | 自定义左侧内容，优先级高于leftText和leftArrow |
| right | - | 自定义右侧内容，优先级高于rightText |
| capsule | - | 自定义胶囊按钮内容 |

## 多场景使用示例

### 基础用法

```vue
<template>
  <view>
    <wd-navbar title="导航栏" />
  </view>
</template>
```

### 带返回按钮

```vue
<template>
  <view>
    <wd-navbar 
      title="带返回按钮" 
      left-arrow 
      left-text="返回" 
      @click-left="onClickLeft"
    />
  </view>
</template>

<script lang="ts" setup>
const onClickLeft = () => {
  console.log('点击了左侧返回按钮')
  // 执行返回操作
  uni.navigateBack()
}
</script>
```

### 带右侧按钮

```vue
<template>
  <view>
    <wd-navbar 
      title="带右侧按钮" 
      right-text="按钮" 
      @click-right="onClickRight"
    />
  </view>
</template>

<script lang="ts" setup>
const onClickRight = () => {
  console.log('点击了右侧按钮')
}
</script>
```

### 固定到顶部

```vue
<template>
  <view>
    <wd-navbar 
      title="固定到顶部" 
      fixed 
      placeholder 
      safe-area-inset-top
    />
    <view class="content">
      <!-- 页面内容 -->
    </view>
  </view>
</template>

<style scoped>
.content {
  padding-top: 88rpx; /* 导航栏高度 */
}
</style>
```

### 自定义内容

```vue
<template>
  <view>
    <wd-navbar>
      <template #left>
        <wd-button type="text" @click="onClickLeft">
          <wd-icon name="left" />
          <text>返回</text>
        </wd-button>
      </template>
      <template #title>
        <view class="custom-title">
          <wd-icon name="home" />
          <text>自定义标题</text>
        </view>
      </template>
      <template #right>
        <wd-button type="text" @click="onClickRight">
          <wd-icon name="search" />
        </wd-button>
      </template>
    </wd-navbar>
  </view>
</template>

<script lang="ts" setup>
const onClickLeft = () => {
  console.log('点击了左侧自定义按钮')
}

const onClickRight = () => {
  console.log('点击了右侧自定义按钮')
}
</script>

<style scoped>
.custom-title {
  display: flex;
  align-items: center;
  gap: 10rpx;
}
</style>
```

### 禁用状态

```vue
<template>
  <view>
    <wd-navbar 
      title="禁用状态" 
      left-arrow 
      left-text="返回" 
      right-text="按钮"
      left-disabled 
      right-disabled
    />
  </view>
</template>
```

## 样式定制指南

### 自定义样式

通过 `customStyle` 属性可以自定义导航栏的样式：

```vue
<wd-navbar 
  title="自定义样式" 
  :custom-style="{ backgroundColor: '#1890FF', color: '#fff', height: '88rpx' }"
/>
```

### 自定义类名

通过 `customClass` 属性可以添加自定义类名，然后在样式文件中定义样式：

```vue
<wd-navbar 
  title="自定义类名" 
  custom-class="my-navbar"
/>
```

```scss
.my-navbar {
  /* 自定义导航栏容器样式 */
  background-color: #1890FF;
  color: #fff;
  height: 88rpx;
  
  .wd-navbar__title {
    /* 自定义标题样式 */
    font-size: 36rpx;
    font-weight: bold;
  }
  
  .wd-navbar__left {
    /* 自定义左侧区域样式 */
    color: #fff;
  }
  
  .wd-navbar__right {
    /* 自定义右侧区域样式 */
    color: #fff;
  }
}
```

## 注意事项

1. 固定定位：
   - 当设置 `fixed` 为 `true` 时，导航栏会固定在顶部
   - 建议同时设置 `placeholder` 为 `true`，以在导航栏位置生成一个等高的占位元素，避免页面内容上移
   - 固定定位时，可通过 `zIndex` 属性调整层级

2. 安全区域适配：
   - 在全面屏设备上，建议开启 `safeAreaInsetTop` 属性，以适配顶部安全区域
   - 开启后，导航栏会自动添加顶部安全区域高度的内边距

3. 插槽使用：
   - 当使用 `left` 插槽时，会覆盖 `leftText` 和 `leftArrow` 属性
   - 当使用 `right` 插槽时，会覆盖 `rightText` 属性
   - 当使用 `title` 插槽时，会覆盖 `title` 属性
   - `capsule` 插槽用于自定义胶囊按钮，优先级高于默认的左侧内容

4. 事件处理：
   - `click-left` 事件在点击左侧区域时触发，包括左侧文字、左侧箭头和自定义的左侧插槽内容
   - `click-right` 事件在点击右侧区域时触发，包括右侧文字和自定义的右侧插槽内容
   - 当设置了 `leftDisabled` 或 `rightDisabled` 为 `true` 时，对应的点击事件不会触发

5. 样式定制：
   - 可通过 `customStyle` 和 `customClass` 属性自定义导航栏样式
   - 导航栏默认高度为 88rpx，可根据需要调整
   - 自定义颜色时，建议同时修改标题、左侧和右侧内容的颜色，保持视觉一致性

6. 兼容性：
   - 组件支持跨平台使用
   - 在不同平台上，导航栏的默认样式可能会有所差异，建议根据需要进行定制

7. 层级管理：
   - 默认层级为 500，可通过 `zIndex` 属性调整
   - 确保层级设置合理，避免被其他元素遮挡