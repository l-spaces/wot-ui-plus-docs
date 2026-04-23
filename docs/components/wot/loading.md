# Loading 加载

## 组件概述

Loading 加载组件用于页面或区块的加载状态展示，支持圆环、菊花、旋转三种加载图标类型。可自定义颜色、大小，支持自定义图标。

## 核心功能描述

- **三种图标**：ring（圆环）、outline（菊花）、circle（旋转）
- **自定义颜色**：通过 `color` 设置加载图标颜色
- **自定义大小**：通过 `size` 设置加载图标大小
- **自定义图标**：通过 `iconClass` 使用自定义图标
- **竖向排列**：通过 `vertical` 使文字和图标竖向排列

## 适用业务场景

- **页面加载**：在页面加载时显示加载动画
- **按钮加载**：在按钮中显示加载状态
- **区块加载**：在数据加载区域显示加载提示

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| type | String | 'outline' | 否 | 加载图标类型，可选值：ring / outline / circle |
| color | String | - | 否 | 加载图标颜色 |
| size | String | '30px' | 否 | 加载图标大小 |
| iconClass | String | '' | 否 | 自定义图标样式类 |
| vertical | Boolean | false | 否 | 是否竖向排列 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Slots

| 插槽名称 | 作用域参数 | 使用场景 |
|---------|-----------|---------|
| default | - | 加载文案 |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-loading />
</template>
```

### 示例2：不同类型

```vue
<template>
  <wd-loading type="ring" />
  <wd-loading type="outline" />
  <wd-loading type="circle" />
</template>
```

### 示例3：自定义颜色与大小

```vue
<template>
  <wd-loading color="#4D80F0" />
  <wd-loading size="40px" />
  <wd-loading color="#fa4350" size="20px" />
</template>
```

### 示例4：带文字

```vue
<template>
  <wd-loading>加载中...</wd-loading>
  <wd-loading vertical>加载中...</wd-loading>
</template>
```

## 注意事项

- `ring` 类型使用 SVG 绘制圆环动画
- `outline` 类型使用 CSS 绘制菊花动画
- `circle` 类型使用 CSS 绘制旋转动画
- `iconClass` 优先级高于内置图标类型
