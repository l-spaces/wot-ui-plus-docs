# Sidebar 侧边栏

## 组件概述

Sidebar 侧边栏组件用于展示纵向导航，由 `wd-sidebar` 和 `wd-sidebar-item` 两个组件配合使用。支持双向绑定、徽标提示、禁用状态、切换前拦截和图标插槽，适用于分类导航、设置页分组切换等场景。

## 核心功能描述

- **纵向导航切换**：通过 `v-model` 维护当前激活项
- **切换前拦截**：`beforeChange` 支持在切换前执行校验
- **徽标提示**：支持数字徽标、红点和 `badgeProps` 透传
- **禁用控制**：支持禁用单个侧边项
- **图标扩展**：`wd-sidebar-item` 支持通过图标插槽自定义图标区域

## 适用业务场景

- **分类导航**：商品分类、内容目录、帮助中心侧边导航
- **设置页面**：账号设置、系统设置等分组切换
- **运营后台**：左侧菜单或属性面板切换场景

## API

### Sidebar Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | Number / String | 0 | 否 | 当前激活项的值，支持 `v-model` 双向绑定 |
| beforeChange | Function | - | 否 | 切换前钩子，接收 `{ value, resolve }` |
| customStyle | String | `''` | 否 | 自定义根节点样式 |
| customClass | String | `''` | 否 | 自定义根节点样式类 |

### SidebarItem Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| label | String | - | 是 | 选项标题 |
| value | Number / String | - | 是 | 选项唯一标识 |
| badge | String / Number / null | null | 否 | 徽标显示值 |
| badgeProps | Object | - | 否 | 徽标属性，透传给 `wd-badge` |
| icon | String | - | 否 | 图标名称 |
| isDot | Boolean | - | 否 | 是否显示点状徽标 |
| max | Number | - | 否 | 徽标最大值 |
| disabled | Boolean | false | 否 | 是否禁用当前选项 |
| customStyle | String | `''` | 否 | 自定义根节点样式 |
| customClass | String | `''` | 否 | 自定义根节点样式类 |

### Sidebar Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| change | 选中项切换成功时触发 | `({ value, label })` | 返回当前选中项的值和标题 |
| update:modelValue | 选中项切换成功时触发 | `(value: number \| string)` | 用于同步当前激活值 |

### Sidebar Slots

| 插槽名称 | 说明 |
|---------|------|
| default | `wd-sidebar` 默认插槽，用于放置 `wd-sidebar-item` |

### SidebarItem Slots

| 插槽名称 | 说明 |
|---------|------|
| icon | 自定义图标区域内容 |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-sidebar v-model="active" @change="handleChange">
    <wd-sidebar-item label="标签一" :value="1" />
    <wd-sidebar-item label="标签二" :value="2" />
    <wd-sidebar-item label="标签三" :value="3" />
  </wd-sidebar>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(1)

function handleChange({ value, label }: { value: number; label: string }) {
  console.log(value, label)
}
</script>
```

组件通过 `v-model` 同步当前激活项，`change` 会同时返回 `value` 和 `label`。

### 示例2：徽标、禁用与图标插槽

```vue
<template>
  <wd-sidebar v-model="active">
    <wd-sidebar-item label="消息" :value="1" :badge="5" />
    <wd-sidebar-item label="通知" :value="2" is-dot>
      <template #icon>
        <wd-icon name="notification" />
      </template>
    </wd-sidebar-item>
    <wd-sidebar-item label="设置" :value="3" disabled />
  </wd-sidebar>
</template>
```

### 示例3：切换前拦截

```vue
<template>
  <wd-sidebar v-model="active" :before-change="beforeChange">
    <wd-sidebar-item label="标签一" :value="1" />
    <wd-sidebar-item label="标签二" :value="2" />
  </wd-sidebar>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(1)

function beforeChange({
  value,
  resolve
}: {
  value: number
  resolve: (pass: boolean) => void
}) {
  resolve(value !== 2)
}
</script>
```

`beforeChange` 需要显式调用 `resolve` 决定是否允许切换。

## 注意事项

- `wd-sidebar-item` 的 `label` 和 `value` 都是必填项。
- `change` 仅在切换成功后触发，且会返回 `{ value, label }`，不是只返回 `value`。
- `beforeChange` 不会自动继续流程，必须调用 `resolve(true)` 或 `resolve(false)`。
- 禁用项点击后不会触发切换，也不会更新 `modelValue`。
