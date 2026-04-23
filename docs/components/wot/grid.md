# Grid 网格

## 组件概述

Grid 网格组件用于展示宫格布局，由 `wd-grid` 和 `wd-grid-item` 两个组件配合使用。支持自定义列数、正方形格子、边框、徽标、页面跳转等功能。常用于功能入口、分类导航、快捷操作等场景。

## 核心功能描述

- **自定义列数**：`column` 设置每行显示的格子数量
- **正方形格子**：`square` 将格子固定为正方形
- **边框显示**：`border` 开启格子边框
- **点击反馈**：`clickable` 开启点击态反馈效果
- **徽标支持**：GridItem 支持 `isDot`、`type`、`value`、`max`、`badgeProps` 等徽标属性
- **页面跳转**：`url` 和 `linkType` 支持点击后跳转页面
- **自定义样式**：`customText` 和 `customIcon` 分别自定义文字和图标样式

## 适用业务场景

- **功能入口**：首页展示常用功能图标入口，如扫一扫、付款、收款等
- **分类导航**：商品分类、服务分类等宫格导航
- **快捷操作**：设置页面、工具箱等快捷操作入口

## API

### Grid Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| clickable | Boolean | false | 否 | 是否开启点击反馈 |
| square | Boolean | false | 否 | 是否将格子固定为正方形 |
| column | Number | - | 否 | 列数 |
| border | Boolean | false | 否 | 是否显示边框 |
| bgColor | String | '' | 否 | 背景颜色 |
| gutter | Number | - | 否 | 格子之间的间距 |
| hoverClass | String | - | 否 | 自定义 hover 样式类 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### GridItem Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| icon | String | '' | 否 | 图标名称 |
| iconSize | String | '26px' | 否 | 图标大小 |
| text | String | - | 否 | 文字 |
| url | String | - | 否 | 跳转链接 |
| linkType | String | 'navigateTo' | 否 | 跳转方式，可选值：navigateTo / switchTab / reLaunch |
| isDot | Boolean | false | 否 | 是否显示红点 |
| type | String | - | 否 | 徽标类型，可选值：primary / success / warning / danger / info |
| value | String / Number | - | 否 | 徽标值 |
| max | Number | - | 否 | 徽标最大值 |
| badgeProps | Object | - | 否 | 徽标属性，透传给 Badge 组件 |
| customText | String | '' | 否 | 文字样式类 |
| customIcon | String | '' | 否 | 图标样式类 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### GridItem Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| click | 点击格子时触发 | - | - |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-grid :column="4" border>
    <wd-grid-item icon="home" text="首页" />
    <wd-grid-item icon="search" text="搜索" />
    <wd-grid-item icon="setting" text="设置" />
    <wd-grid-item icon="user" text="我的" />
  </wd-grid>
</template>
```

4列网格，带边框，每个格子显示图标和文字。

### 示例2：正方形与间距

```vue
<template>
  <wd-grid :column="3" square :gutter="10" clickable>
    <wd-grid-item icon="cart" text="购物车" />
    <wd-grid-item icon="star" text="收藏" />
    <wd-grid-item icon="clock" text="历史" />
  </wd-grid>
</template>
```

`square` 固定为正方形，`gutter` 设置格子间距，`clickable` 开启点击反馈。

### 示例3：徽标与页面跳转

```vue
<template>
  <wd-grid :column="4">
    <wd-grid-item icon="chat" text="消息" is-dot />
    <wd-grid-item icon="notification" text="通知" :value="5" type="danger" />
    <wd-grid-item icon="help" text="帮助" url="/pages/help/index" />
    <wd-grid-item icon="feedback" text="反馈" url="/pages/feedback/index" link-type="navigateTo" />
  </wd-grid>
</template>
```

`isDot` 显示红点，`value` 和 `type` 显示数字徽标，`url` 设置跳转链接。

## 注意事项

- `column` 不设置时自动根据子元素数量计算
- `square` 模式下格子高度等于宽度，内容过多可能溢出
- `gutter` 设置后边框效果可能受影响
- `url` 设置后点击格子会自动跳转，同时触发 `click` 事件
- `badgeProps` 可完整透传 Badge 组件的所有属性
