# Overlay 遮罩层组件

<demo-model url="/subPages/overlay/Index"></demo-model>

## 组件概况

### 组件概述
遮罩层是一种覆盖在页面内容之上的半透明或不透明层，用于阻止用户与下层内容交互，通常用于模态框、弹窗、加载状态等场景。wd-overlay 组件提供了灵活的配置选项，支持自定义动画、层级、滚动锁定等功能。

### 详细功能描述
- 支持显示/隐藏状态控制
- 支持自定义动画时长
- 支持锁定/解锁页面滚动
- 支持自定义层级（z-index）
- 支持自定义样式和类名
- 支持点击事件回调
- 集成了过渡动画效果

### 适用业务场景
- 模态框、弹窗等组件的背景遮罩
- 加载状态的全屏遮罩
- 引导页的遮罩层
- 防止用户重复操作的遮罩

## 完整API参考

### Props属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| show | boolean | false | 否 | 是否展示遮罩层 |
| duration | object / number / boolean | 300 | 否 | 动画时长，单位毫秒 |
| lockScroll | boolean | true | 否 | 是否锁定滚动 |
| zIndex | number | 10 | 否 | 层级 |
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |

### Events事件

| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| click | 点击遮罩层时 | - |

### Methods方法

该组件没有对外暴露的方法。

### Slots插槽

| 插槽名 | 作用域变量 | 使用说明 |
|--------|------------|----------|
| default | - | 遮罩层内容 |

## 多场景使用示例代码

### 1. 基础用法

```vue
<template>
  <view class="overlay-demo">
    <wd-button @click="showOverlay = true">显示遮罩层</wd-button>
    <wd-overlay :show="showOverlay" @click="showOverlay = false">
      <view class="overlay-content">
        <text>这是遮罩层内容</text>
        <wd-button @click="showOverlay = false">关闭遮罩层</wd-button>
      </view>
    </wd-overlay>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const showOverlay = ref(false)
</script>

<style scoped>
.overlay-demo {
  padding: 20px;
}

.overlay-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: white;
}
</style>
```

### 2. 自定义动画时长

```vue
<template>
  <view class="overlay-demo">
    <wd-button @click="showOverlay = true">显示遮罩层（慢动画）</wd-button>
    <wd-overlay :show="showOverlay" :duration="1000" @click="showOverlay = false">
      <view class="overlay-content">
        <text>这是带有慢动画的遮罩层</text>
        <wd-button @click="showOverlay = false">关闭遮罩层</wd-button>
      </view>
    </wd-overlay>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const showOverlay = ref(false)
</script>
```

### 3. 不锁定滚动

```vue
<template>
  <view class="overlay-demo">
    <wd-button @click="showOverlay = true">显示遮罩层（不锁定滚动）</wd-button>
    <scroll-view scroll-y="true" style="height: 500px; border: 1px solid #eee; padding: 20px;">
      <view v-for="i in 20" :key="i" style="height: 100px; margin-bottom: 10px; background-color: #f5f5f5; display: flex; align-items: center; justify-content: center;">
        内容 {{ i }}
      </view>
    </scroll-view>
    <wd-overlay :show="showOverlay" :lock-scroll="false" @click="showOverlay = false">
      <view class="overlay-content">
        <text>这是不锁定滚动的遮罩层</text>
        <wd-button @click="showOverlay = false">关闭遮罩层</wd-button>
      </view>
    </wd-overlay>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const showOverlay = ref(false)
</script>
```

### 4. 自定义层级和样式

```vue
<template>
  <view class="overlay-demo">
    <wd-button @click="showOverlay = true">显示自定义遮罩层</wd-button>
    <wd-overlay 
      :show="showOverlay" 
      :z-index="100" 
      custom-style="background-color: rgba(0, 0, 0, 0.3);" 
      @click="showOverlay = false"
    >
      <view class="overlay-content">
        <text>这是自定义样式的遮罩层</text>
        <wd-button @click="showOverlay = false">关闭遮罩层</wd-button>
      </view>
    </wd-overlay>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const showOverlay = ref(false)
</script>
```

## 样式定制指南

### customStyle 用法
使用 customStyle 属性可以自定义遮罩层的内联样式，例如修改背景颜色、透明度、动画等。

```vue
<wd-overlay 
  :show="showOverlay" 
  custom-style="background-color: rgba(255, 0, 0, 0.5); animation-duration: 0.5s;"
>
  <!-- 内容 -->
</wd-overlay>
```

### customClass 用法
使用 customClass 属性可以为遮罩层添加自定义样式类，便于在外部 CSS 中进行样式定制。

```vue
<wd-overlay 
  :show="showOverlay" 
  custom-class="my-overlay"
>
  <!-- 内容 -->
</wd-overlay>

<style scoped>
:deep(.my-overlay) {
  background-color: rgba(0, 255, 0, 0.3);
  backdrop-filter: blur(5px);
}
</style>
```

## 注意事项

1. **滚动锁定**：在 H5 平台上，lockScroll 属性会阻止页面滚动，这是通过监听 touchmove 事件实现的。在小程序平台上，滚动锁定由底层框架处理。

2. **层级管理**：如果页面中存在多个遮罩层，需要通过 zIndex 属性合理设置它们的层级关系，避免遮罩层覆盖顺序错误。

3. **性能优化**：对于频繁显示/隐藏的遮罩层，建议使用 v-if 而不是 v-show 来控制显示，以避免不必要的渲染开销。

4. **动画性能**：自定义动画时长时，建议不要设置过长的动画时间，以免影响用户体验。

5. **点击事件**：遮罩层的 click 事件会在点击遮罩层本身时触发，不包括遮罩层内的内容区域。如果需要在点击内容区域时不关闭遮罩层，需要在内容区域阻止事件冒泡。

6. **兼容性**：遮罩层组件在不同平台上的表现可能略有差异，特别是在滚动锁定和动画效果方面。建议在多平台测试后再使用。