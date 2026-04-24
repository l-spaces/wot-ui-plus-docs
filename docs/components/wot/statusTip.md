# StatusTip 状态提示

## 组件概况

StatusTip 状态提示组件用于页面空状态、网络错误、搜索无结果等场景的提示展示。提供预设的插图和文案，也支持自定义插图。支持点击操作按钮触发重试等操作。

## 核心功能描述

- **预设类型**：提供 network（网络错误）、content（内容为空）、search（搜索无结果）、collect（收藏为空）、comment（评论为空）、order（订单为空）等预设类型
- **自定义插图**：通过 `image` 属性自定义插图
- **自定义文案**：通过 `tip` 属性自定义提示文案
- **操作按钮**：通过插槽添加操作按钮

## 适用业务场景

- **网络错误**：网络异常时显示错误提示和重试按钮
- **数据为空**：列表无数据时显示空状态提示
- **搜索无结果**：搜索结果为空时显示提示

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| image | String | - | 否 | 自定义插图 URL 或预设类型，预设类型：network / content / search / collect / comment / halo / message |
| tip | String | - | 否 | 提示文案 |
| imageSize | String / Number / Object | - | 否 | 插图尺寸 |
| imageMode | String | 'aspectFill' | 否 | 插图裁剪模式 |
| urlPrefix | String | - | 否 | 插图 URL 前缀 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Slots

| 插槽名称 | 作用域参数 | 使用场景 |
|---------|-----------|---------|
| image | - | 自定义插图 |
| bottom | - | 底部操作区域，如重试按钮 |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-status-tip type="content" tip="暂无内容" />
</template>
```

### 示例2：不同预设类型

```vue
<template>
  <wd-status-tip type="network" tip="网络异常" />
  <wd-status-tip type="search" tip="搜索无结果" />
  <wd-status-tip type="collect" tip="暂无收藏" />
</template>
```

### 示例3：带操作按钮

```vue
<template>
  <wd-status-tip type="network" tip="网络异常，请检查网络设置">
    <wd-button size="small" @click="retry">重新加载</wd-button>
  </wd-status-tip>
</template>

<script lang="ts" setup>
function retry() {
  console.log('重新加载')
}
</script>
```

### 示例4：自定义插图

```vue
<template>
  <wd-status-tip image="https://example.com/empty.png" tip="暂无数据" />
</template>
```

## 注意事项

- `image` 属性优先级高于 `type`，设置 image 后 type 的预设插图不生效
- 预设插图使用 SVG 绘制，无需额外图片资源
- 默认插槽用于放置操作按钮
