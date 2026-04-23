# Fab 悬浮按钮

## 组件概述

Fab 悬浮按钮组件用于页面角落的快捷操作按钮，支持展开子菜单、自定义位置、图标、拖拽等功能。通常固定在页面右下角，点击可展开一组快捷操作按钮。

## 核心功能描述

- **四种位置**：left-top、right-top、left-bottom、right-bottom
- **展开子菜单**：通过默认插槽添加展开后的操作按钮
- **自定义图标**：通过 `icon` 和 `inactiveIcon` 分别设置展开和收起时的图标
- **可拖拽**：通过 `draggable` 开启拖拽移动
- **互斥管理**：同一页面多个 Fab 展开时自动收起其他 Fab
- **自定义触发器**：通过 trigger 插槽自定义触发按钮

## 适用业务场景

- **快捷操作**：在列表页面提供新增、筛选等快捷操作入口
- **多操作入口**：在首页提供扫码、拍照、发布等多个操作
- **浮动导航**：在长页面提供快捷导航按钮

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| type | String | 'primary' | 否 | 按钮类型，可选值：primary / success / info / warning / error |
| position | String | 'right-bottom' | 否 | 位置，可选值：left-top / right-top / left-bottom / right-bottom |
| icon | String | 'add' | 否 | 展开时的图标 |
| inactiveIcon | String | 'add' | 否 | 收起时的图标 |
| active | Boolean | false | 否 | 是否展开，支持 v-model:active |
| disabled | Boolean | false | 否 | 是否禁用 |
| draggable | Boolean | false | 否 | 是否可拖拽 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| click | 点击按钮时触发 | - | - |

### Slots

| 插槽名称 | 作用域参数 | 使用场景 |
|---------|-----------|---------|
| default | - | 展开后的操作按钮区域 |
| trigger | - | 自定义触发按钮 |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-fab icon="add" position="right-bottom" />
</template>
```

### 示例2：展开子菜单

```vue
<template>
  <wd-fab v-model:active="active" icon="add" position="right-bottom">
    <wd-button type="error" round custom-class="wd-fab__action" @click="handleScan">
      <wd-icon name="scan" />
    </wd-button>
    <wd-button type="info" round custom-class="wd-fab__action" @click="handleEdit">
      <wd-icon name="edit" />
    </wd-button>
  </wd-fab>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(false)

function handleScan() {
  console.log('扫码')
}
function handleEdit() {
  console.log('编辑')
}
</script>
```

### 示例3：可拖拽与自定义位置

```vue
<template>
  <wd-fab icon="add" position="left-bottom" draggable />
</template>
```

## 注意事项

- 同一页面多个 Fab 组件展开时会自动收起其他已展开的 Fab
- `draggable` 开启后可通过拖拽移动按钮位置
- 子菜单按钮需要添加 `wd-fab__action` 样式类以获得正确的动画效果
