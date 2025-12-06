# CellGroup 单元格组

<demo-model url="/subPages/cellGroup/Index"></demo-model>

## 组件概况

### 组件概述
CellGroup 单元格组组件用于将多个单元格（Cell）组织在一起，形成一个逻辑分组。它提供了分组标题、右侧内容展示以及边框线控制等功能，使界面结构更加清晰有序。

### 详细功能描述
- 支持设置分组标题，可通过属性或插槽自定义
- 支持设置分组右侧内容，可通过属性或插槽自定义
- 支持显示/隐藏边框线
- 内部自动管理子单元格的样式和间距
- 支持自定义样式和类名
- 提供灵活的插槽机制，方便扩展和定制

### 适用业务场景
- 表单分组展示，如个人信息、账户设置等
- 列表分组展示，如联系人分组、商品分类等
- 配置项分组展示，如系统设置、应用配置等
- 任何需要将相关单元格组织在一起的场景

## 完整API参考

### Props属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| title | string | - | 否 | 分组标题 |
| value | string | - | 否 | 分组右侧内容 |
| useSlot | boolean | false | 否 | 分组启用插槽 |
| border | boolean | false | 否 | 是否展示边框线 |
| customStyle | string | - | 否 | 自定义根节点样式 |
| customClass | string | - | 否 | 自定义根节点样式类 |

### Events事件

该组件没有定义任何事件。

### Methods方法

该组件没有对外暴露的方法。

### Slots插槽

| 插槽名 | 作用域变量 | 使用说明 |
|--------|------------|----------|
| default | - | 放置单元格内容，通常是 wd-cell 组件 |
| title | - | 自定义分组标题 |
| value | - | 自定义分组右侧内容 |

## 多场景使用示例代码

### 1. 基础用法

```vue
<template>
  <view class="cell-group-demo">
    <wd-cell-group title="基础用法">
      <wd-cell title="单元格1" value="内容1" />
      <wd-cell title="单元格2" value="内容2" />
      <wd-cell title="单元格3" value="内容3" />
    </wd-cell-group>
  </view>
</template>

<script lang="ts" setup>
// 基础的单元格组用法
</script>

<style scoped>
.cell-group-demo {
  padding: 20rpx;
}
</style>
```

### 2. 带边框的单元格组

```vue
<template>
  <view class="cell-group-demo">
    <wd-cell-group title="带边框的单元格组" border>
      <wd-cell title="单元格1" value="内容1" />
      <wd-cell title="单元格2" value="内容2" />
      <wd-cell title="单元格3" value="内容3" />
    </wd-cell-group>
  </view>
</template>

<script lang="ts" setup>
// 带边框的单元格组
</script>

<style scoped>
.cell-group-demo {
  padding: 20rpx;
}
</style>
```

### 3. 带右侧内容的单元格组

```vue
<template>
  <view class="cell-group-demo">
    <wd-cell-group title="带右侧内容" value="更多" border>
      <wd-cell title="单元格1" value="内容1" />
      <wd-cell title="单元格2" value="内容2" />
      <wd-cell title="单元格3" value="内容3" />
    </wd-cell-group>
  </view>
</template>

<script lang="ts" setup>
// 带右侧内容的单元格组
</script>

<style scoped>
.cell-group-demo {
  padding: 20rpx;
}
</style>
```

### 4. 使用插槽自定义标题和右侧内容

```vue
<template>
  <view class="cell-group-demo">
    <wd-cell-group use-slot border>
      <template #title>
        <view class="custom-title">
          <wd-icon name="setting" size="28" color="#4D80F0" />
          <text class="title-text">自定义标题</text>
        </view>
      </template>
      <template #value>
        <view class="custom-value">
          <wd-text color="#4D80F0" size="24">查看详情</wd-text>
          <wd-icon name="arrow-right" size="24" color="#c8c9cc" />
        </view>
      </template>
      <wd-cell title="单元格1" value="内容1" />
      <wd-cell title="单元格2" value="内容2" />
      <wd-cell title="单元格3" value="内容3" />
    </wd-cell-group>
  </view>
</template>

<script lang="ts" setup>
// 使用插槽自定义标题和右侧内容
</script>

<style scoped>
.cell-group-demo {
  padding: 20rpx;
}

.custom-title {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.title-text {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
}

.custom-value {
  display: flex;
  align-items: center;
  gap: 8rpx;
}
</style>
```

### 5. 自定义样式的单元格组

```vue
<template>
  <view class="cell-group-demo">
    <wd-cell-group 
      title="自定义样式" 
      border 
      customClass="custom-cell-group" 
      customStyle="background-color: #f5f7fa; padding: 10rpx; border-radius: 12rpx;"
    >
      <wd-cell title="单元格1" value="内容1" />
      <wd-cell title="单元格2" value="内容2" />
      <wd-cell title="单元格3" value="内容3" />
    </wd-cell-group>
  </view>
</template>

<script lang="ts" setup>
// 自定义样式的单元格组
</script>

<style scoped>
.cell-group-demo {
  padding: 20rpx;
}

/* 自定义单元格组样式 */
:deep(.custom-cell-group) {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

:deep(.custom-cell-group .wd-cell-group__title) {
  padding: 16rpx 20rpx;
  background-color: rgba(77, 128, 240, 0.1);
  border-radius: 8rpx;
  margin-bottom: 10rpx;
}
</style>
```

## 样式定制指南

### 1. 使用customStyle自定义样式

```vue
<template>
  <wd-cell-group 
    title="自定义样式" 
    border 
    customStyle="background-color: #fffbe6; border: 1px solid #ffeaa7; border-radius: 8rpx;"
  >
    <wd-cell title="单元格1" value="内容1" />
    <wd-cell title="单元格2" value="内容2" />
  </wd-cell-group>
</template>

<script lang="ts" setup>
// 使用customStyle自定义样式
</script>
```

### 2. 使用customClass自定义类名

```vue
<template>
  <wd-cell-group 
    title="自定义类名" 
    border 
    customClass="my-cell-group"
  >
    <wd-cell title="单元格1" value="内容1" />
    <wd-cell title="单元格2" value="内容2" />
  </wd-cell-group>
</template>

<script lang="ts" setup>
// 使用customClass自定义类名
</script>

<style scoped>
/* 注意：需要使用 ::v-deep 或 /deep/ 穿透 scoped 样式 */
:deep(.my-cell-group) {
  background-color: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 8rpx;
  padding: 10rpx;
}

:deep(.my-cell-group .wd-cell-group__title) {
  color: #0284c7;
  font-weight: bold;
}
</style>
```

### 3. 自定义标题样式

```vue
<template>
  <wd-cell-group 
    title="自定义标题" 
    border 
    customClass="custom-title-group"
  >
    <wd-cell title="单元格1" value="内容1" />
    <wd-cell title="单元格2" value="内容2" />
  </wd-cell-group>
</template>

<script lang="ts" setup>
// 自定义标题样式
</script>

<style scoped>
:deep(.custom-title-group .wd-cell-group__title) {
  font-size: 32rpx;
  color: #f59e0b;
  padding: 20rpx;
  background-color: #fffbeb;
  border-bottom: 2px solid #f59e0b;
}
</style>
```

## 注意事项

1. **子组件关系**：wd-cell-group 组件通常作为 wd-cell 组件的父容器使用，用于组织和管理多个相关的单元格

2. **边框控制**：通过 border 属性可以控制是否显示单元格组的边框线，默认为 false

3. **标题和内容**：可以通过 title 和 value 属性设置分组的标题和右侧内容，也可以通过对应的插槽进行自定义

4. **useSlot 属性**：当使用插槽自定义标题或右侧内容时，需要将 useSlot 属性设置为 true

5. **样式隔离**：组件使用了 styleIsolation: 'shared'，允许外部样式影响组件内部

6. **嵌套使用**：不建议嵌套使用 wd-cell-group 组件，可能会导致样式冲突和布局问题

7. **虚拟主机**：组件设置了 virtualHost: true，会将组件渲染为虚拟节点，不产生额外的 DOM 元素

8. **全局样式**：组件设置了 addGlobalClass: true，允许使用全局样式类

9. **性能优化**：对于大量单元格的场景，建议使用分页或虚拟滚动等方式优化性能

10. **样式定制**：可以通过 customStyle 和 customClass 属性自定义组件样式，也可以使用插槽自定义内容

11. **主题适配**：组件支持主题定制，可以通过覆盖 SCSS 变量或使用自定义样式来适配不同的主题

12. **跨端兼容**：组件在 iOS、Android、H5 和主流小程序平台上都能正常工作，无需特殊处理

13. **类型安全**：组件使用 TypeScript 开发，提供了完整的类型定义，使用时可以获得良好的类型提示