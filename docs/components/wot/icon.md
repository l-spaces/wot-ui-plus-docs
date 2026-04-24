# Icon 图标

## 组件概况

Icon 图标组件用于展示图标，支持内置图标库和自定义图标。可通过 `classPrefix` 使用第三方图标库（如 iconfont），支持自定义颜色、大小、圆角背景等。

## 核心功能描述

- **内置图标**：提供丰富的内置图标库
- **自定义图标**：通过 `classPrefix` 使用第三方图标库
- **图片图标**：name 属性支持传入图片链接
- **圆角背景**：通过 `round` 添加圆角背景
- **加粗**：通过 `bold` 加粗图标

## 适用业务场景

- **按钮图标**：按钮中的图标
- **列表图标**：列表项的图标
- **导航图标**：导航栏中的图标

<wot-icon name="home" />

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| name | String | - | 是 | 图标名称或图片链接 |
| round | Boolean | false | 否 | 是否显示圆角背景 |
| bold | Boolean | false | 否 | 是否加粗 |
| color | String | - | 否 | 图标颜色 |
| size | String / Number | - | 否 | 图标大小 |
| classPrefix | String | 'wd-icon' | 否 | 类名前缀，用于自定义图标 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-icon name="add" />
  <wd-icon name="setting" />
  <wd-icon name="search" />
</template>
```

### 示例2：自定义颜色与大小

```vue
<template>
  <wd-icon name="add" color="#4D80F0" size="24px" />
  <wd-icon name="close" color="#ee0a24" size="20px" />
</template>
```

### 示例3：图片图标与圆角背景

```vue
<template>
  <wd-icon name="https://example.com/icon.png" size="30px" />
  <wd-icon name="add" round size="30px" />
</template>
```

## 注意事项

- `name` 传入图片链接时，图标会以图片形式展示
- `classPrefix` 用于使用第三方图标库，需确保图标字体已加载
