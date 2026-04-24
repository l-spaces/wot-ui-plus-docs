# IndexBar 索引栏

## 组件概况

IndexBar 索引栏组件用于在长列表中快速定位内容，由 `wd-index-bar` 和 `wd-index-anchor` 两个组件配合使用。组件会根据锚点自动生成右侧索引栏，并在启用 `sticky` 时支持当前锚点吸顶显示，适用于通讯录、城市选择等按索引分组的列表场景。

## 核心功能描述

- **自动生成索引**：根据 `wd-index-anchor` 的 `index` 自动生成右侧索引导航
- **快速定位**：支持点击和触摸滑动快速滚动到目标锚点
- **吸顶展示**：开启 `sticky` 后当前锚点可吸顶显示
- **锚点自定义**：支持通过默认插槽自定义锚点内容

## 适用业务场景

- **通讯录**：按首字母快速定位联系人
- **城市选择**：按索引分组展示城市列表
- **品牌列表**：适用于品牌、机构、学校等字母索引查找场景

## API

### IndexBar Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| sticky | Boolean | false | 否 | 当前索引锚点是否吸顶 |

### IndexAnchor Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| index | String / Number | - | 是 | 索引值，用于生成右侧索引项并标识当前锚点 |
| customStyle | String | `''` | 否 | 自定义锚点根节点样式 |
| customClass | String | `''` | 否 | 自定义锚点根节点样式类 |

### IndexBar Events

`wd-index-bar` 源码当前未对外抛出自定义事件。

### IndexBar Slots

| 插槽名称 | 说明 |
|---------|------|
| default | 默认插槽，用于放置 `wd-index-anchor` 和列表内容 |

### IndexAnchor Slots

| 插槽名称 | 说明 |
|---------|------|
| default | 自定义锚点展示内容，默认展示 `index` 文本 |

### IndexAnchor Methods

| 方法名称 | 说明 | 参数 |
|---------|------|------|
| top | 当前锚点距离页面顶部的位置，组件通过 `defineExpose` 暴露为响应式引用 | - |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-index-bar>
    <view v-for="group in cityList" :key="group.index">
      <wd-index-anchor :index="group.index" />
      <wd-cell
        v-for="city in group.data"
        :key="city"
        :title="city"
      />
    </view>
  </wd-index-bar>
</template>

<script lang="ts" setup>
const cityList = [
  { index: 'A', data: ['安庆', '鞍山'] },
  { index: 'B', data: ['北京', '保定'] },
  { index: 'C', data: ['成都', '重庆'] }
]
</script>
```

组件会根据每个 `wd-index-anchor` 的 `index` 自动生成右侧索引栏。

### 示例2：吸顶模式

```vue
<template>
  <wd-index-bar sticky>
    <view v-for="group in cityList" :key="group.index">
      <wd-index-anchor :index="group.index" />
      <wd-cell
        v-for="city in group.data"
        :key="city"
        :title="city"
      />
    </view>
  </wd-index-bar>
</template>
```

开启 `sticky` 后，滚动到当前分组时锚点会固定在列表顶部。

### 示例3：自定义锚点内容

```vue
<template>
  <wd-index-bar>
    <view v-for="group in cityList" :key="group.index">
      <wd-index-anchor :index="group.index">
        <view class="anchor-title">分组 {{ group.index }}</view>
      </wd-index-anchor>
      <wd-cell
        v-for="city in group.data"
        :key="city"
        :title="city"
      />
    </view>
  </wd-index-bar>
</template>
```

通过 `wd-index-anchor` 默认插槽可以自定义分组标题样式与内容。

## 注意事项

- `wd-index-anchor` 的 `index` 为必填属性，缺失时无法生成右侧索引项。
- `wd-index-bar` 源码当前不对外抛出 `change`、`select` 等自定义事件，若旧文档出现这些事件说明，应以源码当前行为为准。
- `customStyle` 和 `customClass` 仅在 `wd-index-anchor` 上提供，`wd-index-bar` 本身没有这两个 props。
- 右侧索引依赖锚点顺序与布局计算，动态修改数据后建议等待列表渲染完成再展示组件。
