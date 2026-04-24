# Img 图片

## 组件概况

Img 图片组件用于展示图片，支持多种填充模式、懒加载、圆形图片、图片预览等功能。基于原生 image 组件封装，提供更丰富的功能。

## 核心功能描述

- **多种填充模式**：scaleToFill、aspectFit、aspectFill 等
- **懒加载**：通过 `lazyLoad` 开启懒加载
- **圆形图片**：通过 `round` 显示圆形图片
- **图片预览**：通过 `enablePreview` 开启点击预览
- **自定义圆角**：通过 `radius` 自定义圆角大小
- **长按识别**：通过 `showMenuByLongpress` 开启长按识别小程序码

## 适用业务场景

- **商品图片**：展示商品主图，支持点击预览
- **用户头像**：展示用户上传的图片
- **内容配图**：文章或卡片中的配图展示

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| src | String | - | 否 | 图片链接 |
| previewSrc | String | - | 否 | 预览图片链接 |
| round | Boolean | false | 否 | 是否显示为圆形 |
| mode | String | 'scaleToFill' | 否 | 填充模式 |
| lazyLoad | Boolean | false | 否 | 是否懒加载 |
| width | String / Number | - | 否 | 宽度 |
| height | String / Number | - | 否 | 高度 |
| radius | String / Number | - | 否 | 圆角大小 |
| enablePreview | Boolean | false | 否 | 是否允许预览 |
| showMenuByLongpress | Boolean | false | 否 | 长按识别小程序码，仅微信小程序 |
| customImage | String | '' | 否 | 自定义图片样式类 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| click | 点击图片时触发 | - | - |
| load | 图片加载完成时触发 | - | - |
| error | 图片加载失败时触发 | - | - |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-img src="https://example.com/image.jpg" width="100" height="100" />
</template>
```

### 示例2：填充模式与圆形

```vue
<template>
  <wd-img src="https://example.com/image.jpg" width="100" height="100" mode="aspectFill" round />
</template>
```

### 示例3：图片预览

```vue
<template>
  <wd-img src="https://example.com/image.jpg" width="100" height="100" enable-preview />
</template>
```

## 注意事项

- `enablePreview` 开启后点击图片会全屏预览
- `previewSrc` 用于指定预览时使用的高清图片
- `round` 会将图片裁剪为圆形