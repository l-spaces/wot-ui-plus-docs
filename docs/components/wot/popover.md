# Popover 弹出层

<demo-model url="/subPages/popover/Index"></demo-model>

## 组件概况

### 组件概述
Popover 组件是一种弹出式组件，用于在目标元素附近显示相关内容，通常用于菜单、提示、说明、操作选项等场景。wd-popover 组件提供了灵活的配置选项，支持多种放置位置、普通模式和菜单模式、自定义内容、显示/隐藏控制等功能。

### 详细功能描述
- 支持多种放置位置：top、top-start、top-end、bottom、bottom-start、bottom-end、left、left-start、left-end、right、right-start、right-end
- 支持普通模式和菜单模式两种显示模式
- 支持自定义内容，可通过 content 属性或 slot#content 传入
- 支持显示/隐藏箭头
- 支持偏移量设置
- 支持禁用状态
- 支持显示关闭按钮
- 支持双向绑定显示状态
- 支持手动控制显示/隐藏
- 支持自定义样式和类名
- 支持点击外部关闭

### 适用业务场景
- 下拉菜单
- 操作选项
- 提示框
- 说明文字
- 上下文菜单
- 工具提示

## 完整API参考

### Props属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| customArrow | string | '' | 否 | 自定义箭头样式类 |
| customPop | string | '' | 否 | 自定义弹出框样式类 |
| visibleArrow | boolean | true | 否 | 是否显示 popover 箭头 |
| content | string / array | - | 否 | 显示的内容，也可以通过 slot#content 传入 |
| placement | string | 'bottom' | 否 | 指定 popover 的放置位置：top / top-start / top-end / bottom / bottom-start / bottom-end / left / left-start / left-end / right / right-start / right-end |
| offset | number | 0 | 否 | 偏移量 |
| useContentSlot | boolean | false | 否 | 是否使用内容插槽 |
| disabled | boolean | false | 否 | 是否禁用 popover |
| showClose | boolean | false | 否 | 是否显示关闭按钮 |
| modelValue | boolean | false | 否 | 控制 popover 的显示状态 |
| mode | string | 'normal' | 否 | 当前显示的模式，决定内容的展现形式，可选值：normal（普通模式）/ menu（菜单模式） |
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |

### Events事件

| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| update:modelValue | 显示状态改变时 | value: boolean - 显示状态 |
| menuclick | 菜单模式下点击菜单项时 | { item: any, index: number } - 点击的菜单项和索引 |
| change | 显示状态改变时 | { show: boolean } - 显示状态 |
| open | 打开时 | - |
| close | 关闭时 | - |

### Methods方法

| 方法名 | 参数 | 返回值 | 功能说明 |
|--------|------|--------|----------|
| open | - | - | 打开popover |
| close | - | - | 关闭popover |

### Slots插槽

| 插槽名 | 作用域变量 | 使用说明 |
|--------|------------|----------|
| default | - | 触发元素内容 |
| content | - | 自定义弹出内容 |

## 多场景使用示例代码

### 1. 基础用法

```vue
<template>
  <view class="popover-demo">
    <wd-popover 
      v-model="showPopover" 
      content="这是一个简单的popover"
    >
      <wd-button>点击显示Popover</wd-button>
    </wd-popover>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const showPopover = ref(false)
</script>

<style scoped>
.popover-demo {
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}
</style>
```

### 2. 菜单模式

```vue
<template>
  <view class="popover-demo">
    <wd-popover 
      v-model="showPopover" 
      mode="menu"
      :content="menuItems"
      @menuclick="onMenuClick"
    >
      <wd-button>点击显示菜单</wd-button>
    </wd-popover>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const showPopover = ref(false)
const menuItems = [
  { content: '菜单项1', iconClass: 'search' },
  { content: '菜单项2', iconClass: 'star' },
  { content: '菜单项3', iconClass: 'settings' }
]

const onMenuClick = (params: { item: any, index: number }) => {
  console.log('点击菜单项', params)
  showPopover.value = false
}
</script>
```

### 3. 自定义位置

```vue
<template>
  <view class="popover-demo">
    <wd-popover 
      v-model="showPopover" 
      content="顶部弹出"
      placement="top"
    >
      <wd-button>顶部弹出</wd-button>
    </wd-popover>
    <wd-popover 
      v-model="showPopover2" 
      content="左侧弹出"
      placement="left"
    >
      <wd-button>左侧弹出</wd-button>
    </wd-popover>
    <wd-popover 
      v-model="showPopover3" 
      content="右侧弹出"
      placement="right"
    >
      <wd-button>右侧弹出</wd-button>
    </wd-popover>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const showPopover = ref(false)
const showPopover2 = ref(false)
const showPopover3 = ref(false)
</script>

<style scoped>
.popover-demo {
  padding: 20px;
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  height: 200px;
}
</style>
```

### 4. 自定义内容

```vue
<template>
  <view class="popover-demo">
    <wd-popover 
      v-model="showPopover" 
      use-content-slot
    >
      <wd-button>自定义内容</wd-button>
      <template #content>
        <view class="custom-content">
          <view class="custom-title">自定义标题</view>
          <view class="custom-text">这是自定义的Popover内容，可以包含任意结构</view>
          <wd-button size="small" @click="showPopover = false">关闭</wd-button>
        </view>
      </template>
    </wd-popover>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const showPopover = ref(false)
</script>

<style scoped>
.popover-demo {
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.custom-content {
  padding: 15px;
  min-width: 200px;
}

.custom-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.custom-text {
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
  line-height: 1.5;
}
</style>
```

### 5. 手动控制

```vue
<template>
  <view class="popover-demo">
    <wd-popover 
      ref="popoverRef"
      content="手动控制显示/隐藏"
    >
      <wd-button>点击显示</wd-button>
    </wd-popover>
    <wd-button @click="show">手动显示</wd-button>
    <wd-button @click="hide">手动隐藏</wd-button>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const popoverRef = ref<any>(null)

const show = () => {
  popoverRef.value?.open()
}

const hide = () => {
  popoverRef.value?.close()
}
</script>

<style scoped>
.popover-demo {
  padding: 20px;
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  height: 200px;
}
</style>
```

## 样式定制指南

### customStyle 用法
使用 customStyle 属性可以自定义 Popover 根节点的内联样式。

```vue
<wd-popover 
  v-model="showPopover" 
  content="自定义样式"
  custom-style="margin-top: 20px;"
>
  <wd-button>自定义样式</wd-button>
</wd-popover>
```

### customClass 用法
使用 customClass 属性可以为 Popover 根节点添加自定义样式类。

```vue
<wd-popover 
  v-model="showPopover" 
  content="自定义类名"
  custom-class="my-popover"
>
  <wd-button>自定义类名</wd-button>
</wd-popover>

<style scoped>
:deep(.my-popover) {
  --wd-popover-bg-color: #4D80F0;
  --wd-popover-color: #fff;
  --wd-popover-border-radius: 8px;
}
</style>
```

### 自定义箭头样式

```vue
<wd-popover 
  v-model="showPopover" 
  content="自定义箭头"
  custom-arrow="my-arrow"
>
  <wd-button>自定义箭头</wd-button>
</wd-popover>

<style scoped>
:deep(.my-arrow) {
  background-color: #4D80F0;
  width: 10px;
  height: 10px;
}
</style>
```

### 自定义弹出框样式

```vue
<wd-popover 
  v-model="showPopover" 
  content="自定义弹出框"
  custom-pop="my-pop"
>
  <wd-button>自定义弹出框</wd-button>
</wd-popover>

<style scoped>
:deep(.my-pop) {
  background-color: #f0f9ff;
  border: 1px solid #4D80F0;
  box-shadow: 0 4px 12px rgba(77, 128, 240, 0.2);
}
</style>
```

## 注意事项

1. **content 属性类型**：在 normal 模式下，content 属性必须是字符串类型；在 menu 模式下，content 属性必须是数组类型。

2. **placement 属性值**：placement 属性支持 12 种位置，包括 top、top-start、top-end、bottom、bottom-start、bottom-end、left、left-start、left-end、right、right-start、right-end。

3. **useContentSlot 属性**：当 useContentSlot 为 true 时，会使用 slot#content 自定义内容，忽略 content 属性。

4. **disabled 属性**：当 disabled 为 true 时，点击触发元素不会显示 Popover。

5. **showClose 属性**：当 showClose 为 true 时，会在 Popover 右上角显示关闭按钮，点击关闭按钮会关闭 Popover。

6. **手动控制**：可以通过 ref 获取 Popover 实例，然后调用 open() 和 close() 方法手动控制显示/隐藏。

7. **点击外部关闭**：点击 Popover 外部区域会自动关闭 Popover。

8. **性能优化**：避免频繁切换 Popover 的显示状态，这可能会导致性能问题。

9. **样式定制**：可以通过 CSS 变量修改 Popover 的样式，包括背景色、文字颜色、边框半径等。

10. **兼容性**：组件在不同平台上的表现可能略有差异，特别是在定位和动画方面。