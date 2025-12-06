# Watermark 水印
<demo-model url="/subPages/watermark/Index"></demo-model>

## 组件概况

### 组件概述
Watermark 是一个用于添加水印效果的组件，支持文本水印和图片水印，可自定义水印的位置、大小、颜色、旋转角度等，适用于保护版权、标识来源等场景。

### 详细功能描述
- 支持文本水印和图片水印
- 可自定义水印的宽度和高度
- 支持设置水印的旋转角度
- 支持自定义水印的颜色、字体大小和样式
- 支持设置水印的透明度
- 支持全屏水印和局部水印
- 支持设置水印的层级
- 支持设置水印之间的间距
- 自适应不同屏幕尺寸
- 支持跨平台使用

### 适用业务场景
- 文档、图片等内容的版权保护
- 系统界面的品牌标识
- 敏感信息的来源追踪
- 任何需要添加水印效果的场景

## 完整API参考

### Props

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| content | string | '' | 否 | 水印显示内容 |
| image | string | '' | 否 | 显示图片的地址，支持网络图片和base64（钉钉小程序仅支持网络图片） |
| imageHeight | number | 100 | 否 | 图片高度，单位px |
| imageWidth | number | 100 | 否 | 图片宽度，单位px |
| gutterX | number | 0 | 否 | X轴间距，单位px |
| gutterY | number | 0 | 否 | Y轴间距，单位px |
| width | number | 100 | 否 | canvas画布宽度，单位px |
| height | number | 100 | 否 | canvas画布高度，单位px |
| fullScreen | boolean | true | 否 | 是否为全屏水印 |
| color | string | '#8c8c8c' | 否 | 水印字体颜色 |
| size | number | 14 | 否 | 水印字体大小，单位px |
| fontStyle | string | 'normal' | 否 | 水印字体样式（仅微信和h5支持），可能的值：normal、italic、oblique |
| fontWeight | number / string | 'normal' | 否 | 水印字体的粗细（仅微信和h5支持） |
| fontFamily | string | 'PingFang SC' | 否 | 水印字体系列（仅微信和h5支持） |
| rotate | number | -25 | 否 | 水印旋转角度，单位度 |
| zIndex | number | 1100 | 否 | 自定义层级 |
| opacity | number | 0.5 | 否 | 自定义透明度，取值 0~1 |
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |

### Events

该组件没有自定义事件。

### Methods

该组件没有对外暴露的方法。

### Slots

该组件没有插槽。

## 多场景使用示例代码

### 基础文本水印

```vue
<template>
  <view>
    <wd-watermark content="测试水印" />
    <view class="content">
      <text class="title">基础文本水印示例</text>
      <text class="description">这是一个使用基础文本水印的示例内容。</text>
    </view>
  </view>
</template>

<style scoped>
.content {
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  margin: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 18px;
  font-weight: bold;
  color: #303133;
  display: block;
  margin-bottom: 10px;
}

.description {
  font-size: 14px;
  color: #606266;
  line-height: 1.5;
}
</style>
```

### 自定义文本水印

```vue
<template>
  <view>
    <wd-watermark 
      content="自定义水印" 
      :rotate="-30"
      color="#409eff"
      :size="16"
      :width="120"
      :height="60"
      :gutterX="20"
      :gutterY="20"
      :opacity="0.3"
    />
    <view class="content">
      <text class="title">自定义文本水印示例</text>
      <text class="description">这是一个使用自定义样式文本水印的示例内容。</text>
    </view>
  </view>
</template>

<style scoped>
.content {
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  margin: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 18px;
  font-weight: bold;
  color: #303133;
  display: block;
  margin-bottom: 10px;
}

.description {
  font-size: 14px;
  color: #606266;
  line-height: 1.5;
}
</style>
```

### 图片水印

```vue
<template>
  <view>
    <wd-watermark 
      image="https://example.com/logo.png"
      :imageWidth="80"
      :imageHeight="80"
      :width="100"
      :height="100"
      :gutterX="30"
      :gutterY="30"
      :opacity="0.4"
    />
    <view class="content">
      <text class="title">图片水印示例</text>
      <text class="description">这是一个使用图片水印的示例内容。</text>
    </view>
  </view>
</template>

<style scoped>
.content {
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  margin: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 18px;
  font-weight: bold;
  color: #303133;
  display: block;
  margin-bottom: 10px;
}

.description {
  font-size: 14px;
  color: #606266;
  line-height: 1.5;
}
</style>
```

### 局部水印

```vue
<template>
  <view class="container">
    <view class="watermark-container">
      <wd-watermark 
        content="局部水印" 
        :fullScreen="false"
        custom-class="local-watermark"
      />
      <view class="content">
        <text class="title">局部水印示例</text>
        <text class="description">这是一个使用局部水印的示例内容。水印仅显示在该容器内。</text>
      </view>
    </view>
    <view class="no-watermark-content">
      <text class="title">无水印区域</text>
      <text class="description">这是一个没有水印的区域，用于对比局部水印效果。</text>
    </view>
  </view>
</template>

<style scoped>
.container {
  padding: 20px;
}

.watermark-container {
  position: relative;
  background-color: white;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.local-watermark {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.content {
  padding: 20px;
  position: relative;
  z-index: 2;
}

.no-watermark-content {
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 18px;
  font-weight: bold;
  color: #303133;
  display: block;
  margin-bottom: 10px;
}

.description {
  font-size: 14px;
  color: #606266;
  line-height: 1.5;
}
</style>
```

### 复杂布局水印

```vue
<template>
  <view>
    <wd-watermark 
      content="复杂布局水印" 
      color="#f56c6c"
      :rotate="-15"
      :size="12"
      :width="80"
      :height="40"
      :gutterX="10"
      :gutterY="10"
      :opacity="0.2"
    />
    <view class="complex-layout">
      <view class="header">
        <text class="header-title">复杂布局示例</text>
      </view>
      <view class="body">
        <view class="card" v-for="i in 3" :key="i">
          <text class="card-title">卡片 {{ i }}</text>
          <text class="card-content">这是卡片 {{ i }} 的内容，用于展示复杂布局下水印的效果。</text>
        </view>
      </view>
      <view class="footer">
        <text class="footer-text">页脚内容</text>
      </view>
    </view>
  </view>
</template>

<style scoped>
.complex-layout {
  background-color: white;
  border-radius: 8px;
  margin: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.header {
  background-color: #409eff;
  color: white;
  padding: 15px;
}

.header-title {
  font-size: 18px;
  font-weight: bold;
}

.body {
  padding: 20px;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.card {
  flex: 1;
  min-width: 200px;
  padding: 15px;
  background-color: #f5f7fa;
  border-radius: 8px;
  border: 1px solid #e4e7ed;
}

.card-title {
  font-size: 16px;
  font-weight: bold;
  color: #303133;
  display: block;
  margin-bottom: 10px;
}

.card-content {
  font-size: 14px;
  color: #606266;
  line-height: 1.5;
}

.footer {
  background-color: #f5f7fa;
  padding: 15px;
  text-align: center;
  border-top: 1px solid #e4e7ed;
}

.footer-text {
  font-size: 14px;
  color: #909399;
}
</style>
```

## 样式定制指南

### 自定义水印层级

```vue
<template>
  <view>
    <wd-watermark 
      content="层级水印" 
      :zIndex="1000"
      :opacity="0.5"
      color="#67c23a"
    />
    <view class="z-index-content">
      <text class="title">自定义层级水印示例</text>
      <text class="description">可以通过zIndex属性调整水印的层级，确保水印显示在正确的位置。</text>
    </view>
  </view>
</template>

<style scoped>
.z-index-content {
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  margin: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 18px;
  font-weight: bold;
  color: #303133;
  display: block;
  margin-bottom: 10px;
}

.description {
  font-size: 14px;
  color: #606266;
  line-height: 1.5;
}
</style>
```

### 自定义水印透明度

```vue
<template>
  <view>
    <wd-watermark 
      content="透明度水印" 
      :opacity="0.1"
      color="#909399"
      :size="20"
      :rotate="0"
    />
    <view class="opacity-content">
      <text class="title">自定义透明度水印示例</text>
      <text class="description">可以通过opacity属性调整水印的透明度，使水印既可见又不影响内容阅读。</text>
    </view>
  </view>
</template>

<style scoped>
.opacity-content {
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  margin: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 18px;
  font-weight: bold;
  color: #303133;
  display: block;
  margin-bottom: 10px;
}

.description {
  font-size: 14px;
  color: #606266;
  line-height: 1.5;
}
</style>
```

## 注意事项

1. **图片水印注意事项**：
   - 支持网络图片和base64格式
   - 钉钉小程序仅支持网络图片
   - 建议使用适当尺寸的图片，避免过大影响性能

2. **文本水印注意事项**：
   - 可自定义字体大小、颜色、旋转角度等
   - fontStyle、fontWeight和fontFamily属性仅微信和H5支持
   - 建议选择合适的字体大小和颜色，确保水印清晰可见又不影响内容阅读

3. **性能优化**：
   - 避免设置过小的间距，导致水印过于密集影响性能
   - 适当调整透明度，平衡水印可见性和内容可读性
   - 对于复杂布局，建议测试不同配置下水印的性能表现

4. **跨平台兼容性**：
   - 组件已做跨平台兼容处理
   - 不同平台可能存在细微差异，建议在目标平台上测试

5. **层级问题**：
   - 可通过zIndex属性调整水印层级
   - 全屏水印默认层级为1100
   - 局部水印需要注意容器的position属性，建议设置为relative或absolute

6. **局部水印使用**：
   - 设置fullScreen为false
   - 确保容器具有position属性
   - 水印组件需要作为容器的直接子元素

7. **动态修改**：
   - 支持动态修改水印的各种属性
   - 修改属性后会自动重新生成水印
   - 频繁修改可能影响性能，建议合理使用

8. **调试建议**：
   - 开发时可设置较高的透明度，便于调试
   - 测试时建议在不同设备和屏幕尺寸下验证效果
   - 可通过调整rotate属性改变水印的倾斜角度，适应不同设计需求