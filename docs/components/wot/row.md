# Row 行

## 组件概况

Row 行组件与 Col 列组件配合使用，用于栅格布局。基于 24 栏栅格系统，支持设置列间距和自动换行。常用于页面布局、表单排列、卡片网格等场景，通过灵活的 span 和 offset 组合实现各种布局需求。

## 核心功能描述

- **24栏栅格**：基于 24 等分系统，`span` 控制列宽度占比
- **列间距**：`gutter` 设置列元素之间的间距，单位 px
- **偏移距离**：`offset` 设置列元素的左侧偏移量
- **自动换行**：`wrap` 开启后超出 24 栏的列自动换行
- **父子联动**：Row 通过 provide 向 Col 注入 gutter 值，自动计算列的左右 padding

## 适用业务场景

- **页面布局**：左右分栏、三栏布局等页面整体结构
- **表单排列**：表单中多个字段按栅格比例排列
- **卡片网格**：多卡片等宽或按比例排列展示

## API

### Row Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| gutter | Number | 0 | 否 | 列元素之间的间距，单位 px |
| wrap | Boolean | false | 否 | 是否自动换行 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Col Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| span | Number | 24 | 否 | 列元素宽度，24 等分 |
| offset | Number | 0 | 否 | 列元素偏移距离 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-row>
    <wd-col :span="24">span-24</wd-col>
  </wd-row>
  <wd-row :gutter="20">
    <wd-col :span="12">span-12</wd-col>
    <wd-col :span="12">span-12</wd-col>
  </wd-row>
</template>
```

默认不设间距，`gutter` 设置列间距为 20px，两列各占一半宽度。

### 示例2：偏移与混合布局

```vue
<template>
  <wd-row :gutter="20">
    <wd-col :span="8">span-8</wd-col>
    <wd-col :span="8" :offset="8">offset-8 span-8</wd-col>
  </wd-row>
  <wd-row :gutter="20">
    <wd-col :span="6">span-6</wd-col>
    <wd-col :span="6">span-6</wd-col>
    <wd-col :span="6">span-6</wd-col>
    <wd-col :span="6">span-6</wd-col>
  </wd-row>
</template>
```

`offset` 设置列的左侧偏移量，实现非对称布局。

### 示例3：自动换行

```vue
<template>
  <wd-row :gutter="10" wrap>
    <wd-col :span="12">span-12</wd-col>
    <wd-col :span="12">span-12</wd-col>
    <wd-col :span="8">span-8</wd-col>
    <wd-col :span="8">span-8</wd-col>
    <wd-col :span="8">span-8</wd-col>
  </wd-row>
</template>
```

`wrap` 开启后，当一行中列的总 span 超过 24 时自动换行到下一行。

## 注意事项

- 栅格系统为 24 等分，`span` 值范围为 0-24
- `gutter` 通过给列添加左右 padding 实现间距，列内容区域需自行处理溢出
- `offset` 占据栅格空间，与 span 共享 24 栏配额
- `wrap` 为 false 时，超出 24 栏的列会被压缩而非换行
