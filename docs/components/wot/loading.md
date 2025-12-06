# Loading 加载指示器

<demo-model url="/subPages/loading/Index"></demo-model>

## 组件概况

### 组件概述
加载指示器组件是一个轻量级的加载状态指示器，提供了两种视觉样式，支持自定义颜色和大小，用于表示异步操作正在进行中。

### 详细功能描述
- 支持两种加载指示器类型：环形（ring）和轮廓（outline）
- 支持自定义指示器颜色
- 支持自定义指示器大小
- 纯CSS实现，性能高效
- 跨平台兼容

### 适用业务场景
- 网络请求加载状态
- 表单提交处理中
- 页面初始化加载
- 数据刷新时的过渡状态
- 任何需要表示异步操作正在进行的场景

## 完整API参考

### Props

| 名称 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| type | 'outline' \| 'ring' | 'ring' | 否 | 加载指示器类型 |
| color | string | '#4D80F0' | 否 | 加载指示器颜色 |
| size | number \| string | '' | 否 | 加载指示器大小，单位rpx |
| customStyle | string | - | 否 | 自定义样式 |
| customClass | string | - | 否 | 自定义类名 |

### Events

无

### Methods

无

### Slots

无

## 多场景使用示例

### 基础用法

```vue
<template>
  <view>
    <wd-loading />
  </view>
</template>
```

### 不同类型

```vue
<template>
  <view class="demo-container">
    <view class="demo-item">
      <text>ring</text>
      <wd-loading type="ring" />
    </view>
    <view class="demo-item">
      <text>outline</text>
      <wd-loading type="outline" />
    </view>
  </view>
</template>

<style scoped>
.demo-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
}

.demo-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.demo-item text {
  margin-bottom: 10px;
}
</style>
```

### 自定义颜色

```vue
<template>
  <view class="demo-container">
    <wd-loading color="#52C41A" />
    <wd-loading color="#FAAD14" />
    <wd-loading color="#F5222D" />
    <wd-loading color="#1890FF" />
  </view>
</template>

<style scoped>
.demo-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
}
</style>
```

### 自定义大小

```vue
<template>
  <view class="demo-container">
    <wd-loading :size="20" />
    <wd-loading :size="40" />
    <wd-loading :size="60" />
    <wd-loading :size="80" />
  </view>
</template>

<style scoped>
.demo-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
}
</style>
```

### 结合文本使用

```vue
<template>
  <view class="loading-with-text">
    <wd-loading />
    <text class="loading-text">加载中...</text>
  </view>
</template>

<style scoped>
.loading-with-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.loading-text {
  margin-top: 10px;
  font-size: 14px;
  color: #666;
}
</style>
```

## 样式定制指南

### 自定义样式

通过 `customStyle` 属性可以自定义加载指示器的样式：

```vue
<wd-loading 
  :custom-style="{ margin: '10px', transform: 'rotate(180deg)' }"
/>
```

### 自定义类名

通过 `customClass` 属性可以添加自定义类名，然后在样式文件中定义样式：

```vue
<wd-loading custom-class="my-loading" />
```

```scss
.my-loading {
  /* 自定义样式 */
  margin: 10px;
  animation-duration: 1s;
}
```

## 注意事项

1. 类型选择：
   - `ring` 类型：环形加载指示器，适合作为主要加载状态
   - `outline` 类型：轮廓加载指示器，视觉效果较轻，适合辅助加载状态

2. 颜色选择：
   - 建议使用与主题色一致的颜色
   - 确保颜色在不同背景下都有良好的可见性
   - 可根据不同状态使用不同颜色（如成功、警告、错误状态）

3. 大小适配：
   - 建议根据使用场景选择合适的大小
   - 小尺寸（20-40rpx）适合内联使用，如按钮内加载状态
   - 大尺寸（60-100rpx）适合页面级加载状态

4. 性能优化：
   - 加载指示器采用纯CSS实现，性能高效
   - 避免在同一页面同时显示过多加载指示器
   - 异步操作完成后及时隐藏加载指示器

5. 可访问性考虑：
   - 对于重要的加载状态，建议同时提供文本提示
   - 确保加载指示器的颜色对比度符合可访问性标准
   - 对于屏幕阅读器用户，可添加适当的ARIA属性