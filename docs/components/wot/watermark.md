# Watermark 水印

## 组件概况

Watermark 水印组件用于在页面上添加水印，支持文字水印和图片水印。可设置水印内容、颜色、大小、旋转角度、透明度、间距等属性，支持全屏水印和局部水印两种模式。

## 核心功能描述

- **文字水印**：通过 `content` 设置水印文字内容
- **图片水印**：通过 `image` 设置水印图片地址
- **全屏/局部**：通过 `fullScreen` 控制是否全屏水印
- **自定义样式**：支持颜色、大小、旋转角度、透明度、间距等
- **字体样式**：支持字体样式、粗细、字体系列（仅微信和 H5 支持）

## 适用业务场景

- **版权保护**：在页面添加版权水印防止截图盗用
- **内部文档**：在内部文档页面添加用户信息水印
- **数据安全**：在敏感数据页面添加安全标识水印

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| content | String | '' | 否 | 显示内容 |
| image | String | '' | 否 | 显示图片的地址，支持网络图片和 base64 |
| imageHeight | Number | 100 | 否 | 图片高度（px） |
| imageWidth | Number | 100 | 否 | 图片宽度（px） |
| gutterX | Number | 0 | 否 | X轴间距（px） |
| gutterY | Number | 0 | 否 | Y轴间距（px） |
| width | Number | 100 | 否 | canvas 画布宽度（px） |
| height | Number | 100 | 否 | canvas 画布高度（px） |
| fullScreen | Boolean | true | 否 | 是否为全屏水印 |
| color | String | '#8c8c8c' | 否 | 水印字体颜色 |
| size | Number | 14 | 否 | 水印字体大小（px） |
| fontStyle | String | 'normal' | 否 | 水印字体样式（仅微信和 H5 支持），可选值：normal / italic / oblique |
| fontWeight | Number / String | 'normal' | 否 | 水印字体的粗细（仅微信和 H5 支持） |
| fontFamily | String | 'PingFang SC' | 否 | 水印字体系列（仅微信和 H5 支持） |
| rotate | Number | -25 | 否 | 水印旋转角度 |
| zIndex | Number | 1100 | 否 | 自定义层级 |
| opacity | Number | 0.5 | 否 | 自定义透明度，取值 0~1 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

## 使用示例

### 示例1：文字水印

通过 `content` 设置水印文字。

```vue
<template>
  <wd-watermark content="wot-ui-plus" :opacity="0.5" />
  <view>
    <wd-cell-group border>
      <wd-cell title="标题文字" value="内容" />
      <wd-cell title="标题文字" value="内容" icon="setting" is-link />
    </wd-cell-group>
  </view>
</template>
```

### 示例2：图片水印

通过 `image` 设置水印图片，配合 `image-width` 和 `image-height` 控制图片尺寸。

```vue
<template>
  <wd-watermark
    image="https://wot-ui-plus.cn/logo.png"
    :image-width="38"
    :image-height="38"
    content="wot-ui-plus"
    :width="130"
    :height="140"
    :opacity="0.5"
  />
  <view>
    <wd-cell-group border>
      <wd-cell title="标题文字" value="内容" />
      <wd-cell title="标题文字" value="内容" icon="setting" is-link />
    </wd-cell-group>
  </view>
</template>
```

### 示例3：局部水印

设置 `full-screen` 为 false 使用局部水印，仅覆盖组件所在区域。

```vue
<template>
  <wd-watermark
    :opacity="0.8"
    image="https://wot-ui-plus.cn/logo.png"
    :image-width="38"
    :image-height="38"
    :full-screen="false"
  />
  <view>
    <wd-badge :modelValue="12">
      <wd-button type="info" size="small">评论</wd-button>
    </wd-badge>
    <wd-badge :modelValue="3" bg-color="pink">
      <wd-button type="info" size="small">回复</wd-button>
    </wd-badge>
  </view>
</template>
```

## 注意事项

- `fullScreen` 默认为 true，水印覆盖整个页面
- `content` 和 `image` 可以同时设置，同时显示文字和图片水印
- `fontStyle`、`fontWeight`、`fontFamily` 仅在微信小程序和 H5 端支持
- `opacity` 取值 0~1，值越小水印越淡
- `rotate` 默认 -25 度，为最常见的倾斜角度
