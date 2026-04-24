# Grid 网格

## 组件概述

Grid 网格组件用于展示宫格布局，由 `wd-grid` 和 `wd-grid-item` 两个组件配合使用。支持自定义列数、正方形格子、边框、徽标、页面跳转与插槽扩展等能力，常用于功能入口、分类导航、快捷操作等场景。

## 核心功能描述

- **自定义列数**：通过 `column` 控制每行展示的格子数量
- **正方形格子**：通过 `square` 让格子保持等宽等高
- **点击反馈**：`clickable` 开启统一点击态反馈
- **页面跳转**：`url` 和 `linkType` 支持点击后自动跳转页面
- **徽标扩展**：支持红点、数字徽标与 `badgeProps` 透传
- **插槽定制**：支持整体内容插槽、图标插槽和文字插槽

## 适用业务场景

- **功能入口**：首页常用能力入口，如扫一扫、订单、消息中心
- **分类导航**：商品分类、服务分类、频道导航等宫格布局
- **快捷操作**：设置页、工具页、个人中心的快捷操作区域

## API

### Grid Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| clickable | Boolean | false | 否 | 是否开启格子点击反馈 |
| square | Boolean | false | 否 | 是否将格子固定为正方形 |
| column | Number | - | 否 | 每行显示的格子数量 |
| border | Boolean | false | 否 | 是否显示边框 |
| bgColor | String | `''` | 否 | 格子内容区域背景色 |
| gutter | Number | - | 否 | 格子之间的间距，默认单位为 `px` |
| hoverClass | String | - | 否 | 自定义内容区域 `hover-class` |
| customStyle | String | `''` | 否 | 自定义根节点样式 |
| customClass | String | `''` | 否 | 自定义根节点样式类 |

### GridItem Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| customText | String | `''` | 否 | 文字区域样式类 |
| customIcon | String | `''` | 否 | 图标区域样式类 |
| icon | String | `''` | 否 | 图标名称，参考 `wd-icon` |
| iconSize | String | `'26px'` | 否 | 图标大小 |
| text | String | - | 否 | 文字内容 |
| url | String | - | 否 | 点击后跳转的页面地址 |
| linkType | String | `'navigateTo'` | 否 | 页面跳转方式，可选值：`navigateTo` / `switchTab` / `reLaunch` / `redirectTo` |
| isDot | Boolean | false | 否 | 是否显示图标右上角小红点 |
| type | String | - | 否 | 徽标类型，可选值：`primary` / `success` / `warning` / `danger` / `info` |
| value | String / Number | - | 否 | 徽标内容 |
| max | Number | - | 否 | 徽标最大值，超过后显示 `{max}+` |
| badgeProps | Object | - | 否 | 徽标属性，透传给 `wd-badge` |
| customStyle | String | `''` | 否 | 自定义根节点样式 |
| customClass | String | `''` | 否 | 自定义根节点样式类 |

### GridItem Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| itemclick | 点击格子且父级 `wd-grid` 开启 `clickable` 时触发 | - | - |

### Grid Slots

| 插槽名称 | 说明 |
|---------|------|
| default | `wd-grid` 默认插槽，用于放置 `wd-grid-item` |

### GridItem Slots

| 插槽名称 | 说明 |
|---------|------|
| default | 自定义整个格子内容，会覆盖默认的图标和文字结构 |
| icon | 自定义图标区域内容 |
| text | 自定义文字区域内容 |

### GridItem Methods

| 方法名称 | 说明 | 参数 |
|---------|------|------|
| setiIemClass | 设置格子边框相关样式类 | `(classes: string)` |
| init | 重新计算格子尺寸与布局 | - |

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

4 列网格配合边框展示，适合做基础入口布局。

### 示例2：插槽定制

```vue
<template>
  <wd-grid :column="3" clickable>
    <wd-grid-item>
      <image class="poster" src="https://example.com/poster.png" mode="aspectFill" />
    </wd-grid-item>
    <wd-grid-item text="相册">
      <template #icon>
        <wd-icon name="picture" size="32px" />
      </template>
    </wd-grid-item>
    <wd-grid-item icon="edit">
      <template #text>
        <view class="custom-text">自定义文案</view>
      </template>
    </wd-grid-item>
  </wd-grid>
</template>
```

通过默认插槽、`icon` 插槽和 `text` 插槽可以分别定制整块内容、图标区域和文字区域。

### 示例3：页面跳转与点击事件

```vue
<template>
  <wd-grid clickable>
    <wd-grid-item
      icon="edit"
      text="重定向"
      url="/pages/button/Index"
      link-type="redirectTo"
      @itemclick="handleItemClick"
    />
    <wd-grid-item
      icon="add"
      text="页面跳转"
      url="/pages/button/Index"
      link-type="navigateTo"
      @itemclick="handleItemClick"
    />
  </wd-grid>
</template>

<script lang="ts" setup>
function handleItemClick() {
  console.log('grid item clicked')
}
</script>
```

开启 `clickable` 后，格子点击既会触发 `itemclick`，也会在配置了 `url` 时执行对应的页面跳转。

## 注意事项

- `itemclick` 只有在父组件 `wd-grid` 开启 `clickable` 时才会触发。
- `wd-grid-item` 的 `default` 插槽会覆盖默认图标和文字结构，需要自行处理内容布局。
- `linkType` 以源码当前实现为准，支持 `redirectTo`，文档或旧示例中若未列出该值，以源码行为为准。
- `square` 与 `gutter` 同时使用时，组件会重新计算内容区域尺寸，建议在内容较复杂时实际预览布局效果。
- `badgeProps` 会与 `isDot`、`value`、`max`、`type` 合并，重复字段以后者实际传入结果为准。
