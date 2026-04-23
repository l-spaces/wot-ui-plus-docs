# IndexBar 索引栏

## 组件概述

IndexBar 索引栏组件用于快速定位列表项，由 `wd-index-bar` 和 `wd-index-anchor` 两个组件配合使用。右侧显示字母索引，点击或滑动索引可快速跳转到对应位置。支持索引吸顶功能。适用于通讯录、城市选择等场景。

## 核心功能描述

- **字母索引**：右侧显示字母索引列表
- **快速定位**：点击或滑动索引快速跳转
- **索引吸顶**：通过 `sticky` 使当前索引锚点吸顶
- **滑动选择**：支持在索引上滑动选择

## 适用业务场景

- **通讯录**：联系人列表按首字母索引
- **城市选择**：城市列表按首字母索引
- **商品分类**：商品按首字母索引快速查找

## API

### IndexBar Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| sticky | Boolean | false | 否 | 索引是否吸顶 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### IndexAnchor Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| index | String / Number | - | 是 | 索引字符 |

### IndexBar Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| change | 当前索引变化时触发 | ({ index }) | 当前激活的索引值 |
| select | 点击索引时触发 | ({ index }) | 被点击的索引值 |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-index-bar>
    <wd-index-anchor index="A" />
    <wd-cell title="安庆" />
    <wd-cell title="鞍山" />
    <wd-index-anchor index="B" />
    <wd-cell title="北京" />
    <wd-cell title="保定" />
    <wd-index-anchor index="C" />
    <wd-cell title="成都" />
    <wd-cell title="重庆" />
  </wd-index-bar>
</template>
```

### 示例2：吸顶模式

```vue
<template>
  <wd-index-bar sticky>
    <wd-index-anchor index="A" />
    <wd-cell title="安庆" />
    <wd-index-anchor index="B" />
    <wd-cell title="北京" />
  </wd-index-bar>
</template>
```
### 示例3：自定义索引项

```vue
<template>
  <wd-index-bar>
    <wd-index-anchor index="A">分组A</wd-index-anchor>
    <wd-cell title="文本1" />
    <wd-index-anchor index="B">分组B</wd-index-anchor>
    <wd-cell title="文本2" />
  </wd-index-bar>
</template>
```

通过 wd-index-anchor 设置索引锚点，点击右侧索引导航可快速定位。
## 注意事项

- `wd-index-anchor` 的 `index` 属性为必填项
- 索引栏右侧会自动根据 anchor 的 index 生成索引列表
- `sticky` 模式下当前索引锚点会吸顶显示