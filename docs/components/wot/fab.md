# Fab 悬浮按钮组件

<demo-model url="/subPages/fab/Index"></demo-model>


## 组件概况

### 组件概述
Fab（Floating Action Button）组件是一个悬浮在页面之上的操作按钮，支持多种位置、大小和样式，可展开为菜单，也支持拖拽功能。常用于触发页面的主要操作，如添加、创建、分享等。

### 详细功能描述
- 支持 8 种不同的定位位置（左上、右上、左下、右下、左中、右中、上中、下中）
- 支持 6 种不同的按钮类型（primary、success、info、warning、error、default）
- 支持自定义按钮大小和图标
- 支持可展开菜单，提供 4 种菜单弹出方向（上、下、左、右）
- 支持拖拽功能，拖拽结束后可自动吸附到屏幕两侧
- 支持自定义图标（激活和非激活状态）
- 支持禁用状态
- 支持自定义层级和样式
- 支持通过方法控制菜单的展开和收起
- 支持自定义触发器插槽

### 适用业务场景
- 页面主要操作按钮，如添加新内容
- 快速操作菜单，提供多个常用功能入口
- 需要悬浮显示的操作按钮，不随页面滚动而移动
- 需要支持拖拽调整位置的场景
- 表单页面的提交按钮
- 列表页面的筛选或排序按钮

## 完整API参考

### Props
| 名称 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| active | boolean | false | 否 | 是否激活（展开状态） |
| type | string | primary | 否 | 类型，可选值为 default primary info success warning error |
| size | number | 50 | 否 | 悬浮按钮大小，单位为像素 |
| position | string | right-bottom | 否 | 悬浮按钮位置，可选值为 left-top right-top left-bottom right-bottom left-center right-center top-center bottom-center |
| direction | string | top | 否 | 悬浮按钮菜单弹出方向，可选值为 top bottom left right |
| disabled | boolean | false | 否 | 是否禁用 |
| inactiveIcon | string | add | 否 | 悬浮按钮未展开时的图标 |
| activeIcon | string | close | 否 | 悬浮按钮展开时的图标 |
| zIndex | number | 99 | 否 | 自定义悬浮按钮层级 |
| draggable | boolean | false | 否 | 是否可拖动 |
| gap | object | {} | 否 | 自定义悬浮按钮菜单与按钮之间的间距，单位为像素 |
| expandable | boolean | true | 否 | 用于控制点击时是否展开菜单 |
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |

### Events
| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| click | 当按钮不可展开且点击时触发 | - |
| update:active | 当按钮展开状态变化时触发 | active: boolean - 当前展开状态 |

### Methods
| 方法名 | 参数 | 返回值 | 功能说明 |
| --- | --- | --- | --- |
| open | - | - | 打开FAB菜单（展开） |
| close | - | - | 关闭FAB菜单（收起） |

### Slots
| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| default | - | 展开菜单的内容插槽，用于放置子菜单按钮 |
| trigger | - | 自定义触发器插槽，用于完全自定义FAB按钮的外观 |

## 多场景使用示例代码

### 基础用法
```vue
<template>
  <view>
    <!-- 基础悬浮按钮 -->
    <wd-fab @click="handleClick" />
  </view>
</template>

<script setup lang="ts">
const handleClick = () => {
  console.log('点击了悬浮按钮')
}
</script>
```

### 可展开菜单
```vue
<template>
  <view>
    <!-- 可展开菜单的悬浮按钮 -->
    <wd-fab>
      <wd-button size="small" type="info" round custom-class="fab-menu-item">
        <wd-icon name="edit" />
      </wd-button>
      <wd-button size="small" type="success" round custom-class="fab-menu-item">
        <wd-icon name="share" />
      </wd-button>
      <wd-button size="small" type="warning" round custom-class="fab-menu-item">
        <wd-icon name="delete" />
      </wd-button>
    </wd-fab>
  </view>
</template>

<style scoped>
.fab-menu-item {
  margin: 10px 0;
  --wot-button-height: 40px;
  --wot-button-width: 40px;
}
</style>
```

### 自定义位置和样式
```vue
<template>
  <view>
    <!-- 自定义位置和样式的悬浮按钮 -->
    <wd-fab 
      position="left-bottom" 
      type="success" 
      size="60" 
      inactive-icon="plus"
      active-icon="close"
      direction="right"
    >
      <wd-button size="small" type="primary" round custom-class="fab-menu-item">
        <wd-icon name="camera" />
      </wd-button>
      <wd-button size="small" type="warning" round custom-class="fab-menu-item">
        <wd-icon name="image" />
      </wd-button>
    </wd-fab>
  </view>
</template>

<style scoped>
.fab-menu-item {
  margin: 10px 0;
  --wot-button-height: 45px;
  --wot-button-width: 45px;
}
</style>
```

### 可拖拽的悬浮按钮
```vue
<template>
  <view>
    <!-- 可拖拽的悬浮按钮 -->
    <wd-fab 
      draggable="true" 
      position="right-center"
      type="warning"
      inactive-icon="settings"
    >
      <wd-button size="small" type="default" round custom-class="fab-menu-item">
        <wd-icon name="sound" />
      </wd-button>
      <wd-button size="small" type="info" round custom-class="fab-menu-item">
        <wd-icon name="theme" />
      </wd-button>
      <wd-button size="small" type="error" round custom-class="fab-menu-item">
        <wd-icon name="clear" />
      </wd-button>
    </wd-fab>
  </view>
</template>

<style scoped>
.fab-menu-item {
  margin: 10px 0;
  --wot-button-height: 40px;
  --wot-button-width: 40px;
}
</style>
```

### 自定义触发器
```vue
<template>
  <view>
    <!-- 自定义触发器的悬浮按钮 -->
    <wd-fab>
      <!-- 自定义触发器插槽 -->
      <template #trigger>
        <view class="custom-trigger" @click="handleTriggerClick">
          <wd-icon name="heart" color="#fff" size="24" />
        </view>
      </template>
      <!-- 菜单内容 -->
      <wd-button size="small" type="primary" round custom-class="fab-menu-item">
        <wd-icon name="like" />
      </wd-button>
      <wd-button size="small" type="success" round custom-class="fab-menu-item">
        <wd-icon name="star" />
      </wd-button>
    </wd-fab>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isActive = ref(false)

const handleTriggerClick = () => {
  isActive.value = !isActive.value
}
</script>

<style scoped>
.custom-trigger {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #fa2c19;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(250, 44, 25, 0.3);
}

.fab-menu-item {
  margin: 10px 0;
  --wot-button-height: 40px;
  --wot-button-width: 40px;
}
</style>
```

## 样式定制指南

### customStyle 用法
使用 `customStyle` 属性可以直接为悬浮按钮添加内联样式：
```vue
<wd-fab custom-style="box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);" />
```

### customClass 用法
通过 `customClass` 属性可以为组件添加自定义CSS类：
```vue
<wd-fab custom-class="my-fab" />

<style>
.my-fab {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  border: 2px solid #fff;
}
</style>
```

### 菜单按钮样式定制
可以通过为菜单按钮添加自定义类来定制其样式：
```vue
<wd-fab>
  <wd-button size="small" type="info" round custom-class="custom-menu-item">
    <wd-icon name="edit" />
  </wd-button>
</wd-fab>

<style scoped>
.custom-menu-item {
  margin: 12px 0;
  --wot-button-height: 45px;
  --wot-button-width: 45px;
  --wot-button-border-radius: 50%;
}
</style>
```

### 主题变量
组件支持以下CSS变量进行样式定制：
- `--wot-fab-trigger-width`: 触发器宽度
- `--wot-fab-trigger-height`: 触发器高度
- `--wot-fab-icon-fs`: 图标字体大小

## 注意事项

1. **拖拽功能**: 当 `draggable` 为 `true` 时，用户可以拖动FAB按钮，拖拽结束后会自动吸附到屏幕两侧。
2. **菜单方向**: `direction` 属性控制菜单的弹出方向，仅在 `expandable` 为 `true` 时生效。
3. **图标设置**: `inactiveIcon` 和 `activeIcon` 分别控制非激活和激活状态下的图标，仅在使用默认触发器时生效。
4. **自定义触发器**: 当使用 `trigger` 插槽时，需要自己实现点击事件来控制菜单的展开和收起。
5. **层级管理**: `zIndex` 属性控制FAB的层级，默认值为99，确保它能显示在其他内容之上。
6. **位置初始化**: 组件会在挂载时根据 `position` 属性初始化位置，后续修改 `position` 属性也会重新定位。
7. **多个FAB**: 当页面中存在多个FAB组件时，展开一个会自动关闭其他FAB组件。
8. **禁用状态**: 当 `disabled` 为 `true` 时，FAB按钮不可点击，也不可展开菜单。
9. **样式隔离**: 组件使用 `styleIsolation: 'shared'`，确保自定义样式能正常生效。
10. **性能优化**: 组件使用 `virtualHost: true`，减少DOM层级，提升性能。
