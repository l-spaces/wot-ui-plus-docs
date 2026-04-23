# Card 卡片

## 组件概述

Card 卡片组件用于展示信息卡片，提供标题区域、内容区域和底部区域三个分区，支持矩形卡片类型、自定义标题、丰富的插槽等功能。通过插槽可灵活自定义各区域内容，适用于商品展示、订单信息、服务通知等多种业务场景。

## 核心功能描述

- **三区域布局**：卡片分为标题区域（title）、内容区域（default）和底部区域（footer），各区域独立控制
- **矩形卡片**：`type` 设为 `rectangle` 启用矩形卡片样式，视觉上更紧凑
- **自定义标题**：通过 `title` 属性设置标题文字，或通过 `title` 插槽自定义标题内容
- **自定义样式类**：`customTitleClass`、`customContentClass`、`customFooterClass` 分别自定义三个区域的样式
- **底部区域**：通过 `footer` 插槽添加操作按钮等内容，不使用插槽时底部区域不显示

## 适用业务场景

- **商品卡片**：展示商品封面图、标题、价格、标签等信息，底部放置查看详情按钮
- **订单信息**：展示订单商品、数量、金额等信息，底部放置操作按钮
- **服务通知**：展示服务到期提醒、续费提示等信息，底部放置评价或使用按钮

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| type | String | - | 否 | 卡片类型，可选值：rectangle |
| title | String | - | 否 | 卡片标题 |
| customTitleClass | String | '' | 否 | 标题区域自定义样式类名 |
| customContentClass | String | '' | 否 | 内容区域自定义样式类名 |
| customFooterClass | String | '' | 否 | 底部区域自定义样式类名 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Slots

| 插槽名称 | 作用域参数 | 使用场景 |
|---------|-----------|---------|
| default | - | 卡片内容区域 |
| title | - | 自定义标题内容，优先级高于 title 属性 |
| footer | - | 底部操作区域，如放置按钮组 |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-card title="《静夜思》">
    床前明月光，疑是地上霜。举头望明月，低头思故乡。
    <template #footer>
      <wd-button size="small" plain>查看详情</wd-button>
    </template>
  </wd-card>
</template>
```

通过 `title` 设置卡片标题，默认插槽放置内容，`footer` 插槽放置操作按钮。

### 示例2：矩形卡片与商品信息

```vue
<template>
  <wd-card title="新订单" type="rectangle">
    <view style="display: flex; align-items: center;">
      <image src="/static/product.jpg" style="width: 70px; height: 70px; border-radius: 4px; margin-right: 12px" />
      <view>
        <view>蜜滋兰新西兰进口多花种蜂蜜</view>
        <view>数量：1件</view>
        <view>金额：29.08</view>
      </view>
    </view>
    <template #footer>
      <wd-button size="small" plain>查看详情</wd-button>
    </template>
  </wd-card>
</template>
```

`type="rectangle"` 启用矩形卡片样式，适合展示商品订单等紧凑信息。

### 示例3：自定义标题与多按钮

```vue
<template>
  <wd-card type="rectangle">
    <template #title>
      <view style="display: flex; justify-content: space-between; align-items: center;">
        <view>2025-10-01服务到期</view>
        <view style="color: rgba(0,0,0,0.25); font-size: 12px;">
          <wd-icon name="attention" size="14px" />
          您可以去电脑上使用该服务
        </view>
      </view>
    </template>
    <view style="display: flex; align-items: center;">
      <image src="/static/service.jpg" style="width: 40px; height: 40px; border-radius: 4px; margin-right: 12px" />
      <view>
        <view style="font-size: 16px;">智云好客CRM短信</view>
        <view style="color: rgba(0,0,0,0.25); font-size: 12px;">高级版 - 快速吸粉</view>
      </view>
    </view>
    <template #footer>
      <view>
        <wd-button size="small" plain custom-style="margin-right: 8px">评价</wd-button>
        <wd-button size="small">立即使用</wd-button>
      </view>
    </template>
  </wd-card>
</template>
```

通过 `title` 插槽自定义标题区域，支持图标、多行文字等复杂布局；`footer` 插槽放置多个操作按钮。

## 注意事项

- `title` 插槽优先级高于 `title` 属性，同时设置时使用插槽内容
- `footer` 插槽不使用时底部区域不会渲染，卡片仅展示标题和内容
- `type="rectangle"` 矩形卡片与默认卡片在边框和圆角样式上有差异
- `customTitleClass`、`customContentClass`、`customFooterClass` 可分别控制三个区域的样式
- 不设置 `title` 属性且不使用 `title` 插槽时，标题区域不会渲染
