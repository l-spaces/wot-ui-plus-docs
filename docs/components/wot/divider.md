# Divider 分割线

## 组件概述

Divider 分割线组件用于分隔内容区域，支持水平/垂直方向、虚线样式、自定义颜色、内容位置等功能。

## 核心功能描述

- **水平/垂直**：支持水平和垂直分割线
- **虚线样式**：通过 `dashed` 显示虚线
- **内容位置**：left、center、right 三种内容位置
- **细线**：通过 `hairline` 显示 0.5px 细线
- **自定义颜色**：通过 `color` 自定义颜色

## 适用业务场景

- **内容分隔**：在页面不同区块之间添加分割线
- **列表分组**：在列表中分隔不同分组
- **表单分区**：在长表单中分隔不同填写区域

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| color | String | - | 否 | 自定义颜色 |
| contentPosition | String | 'center' | 否 | 内容位置，可选值：left / center / right |
| dashed | Boolean | false | 否 | 是否显示虚线 |
| vertical | Boolean | false | 否 | 是否垂直分割线 |
| hairline | Boolean | true | 否 | 是否显示 0.5px 细线 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Slots

| 插槽名称 | 作用域参数 | 使用场景 |
|---------|-----------|---------|
| default | - | 分割线中间的内容 |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-divider />
</template>
```

### 示例2：带内容与位置

```vue
<template>
  <wd-divider content-position="left">左侧</wd-divider>
  <wd-divider content-position="center">居中</wd-divider>
  <wd-divider content-position="right">右侧</wd-divider>
</template>
```

### 示例3：虚线与垂直

```vue
<template>
  <wd-divider dashed />
  <view style="display: flex;">
    <text>文本一</text>
    <wd-divider vertical />
    <text>文本二</text>
  </view>
</template>
```

## 注意事项

- 垂直分割线需要配合 flex 布局使用
- `hairline` 使用 0.5px 实现，部分设备可能不支持