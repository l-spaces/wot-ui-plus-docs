# LoadingPage 页面加载

<demo-model url="/subPages/loadingPage/Index"></demo-model>

## 组件概况

### 组件概述
页面加载组件是一个全屏级别的加载状态指示器，用于表示整个页面或主要内容区域正在加载中。它提供了自定义加载图标、文本和样式的能力，支持全屏覆盖显示。

### 详细功能描述
- 全屏覆盖的加载状态显示
- 支持自定义加载图标或使用内置加载动画
- 支持自定义加载文本
- 支持两种内置加载动画类型
- 支持自定义背景颜色、文本颜色和字体大小
- 支持自定义加载图标大小和颜色
- 支持设置加载层级
- 提供过渡动画效果

### 适用业务场景
- 页面初始化加载状态
- 页面内容刷新时的过渡状态
- 复杂数据加载过程
- 网络请求耗时较长的场景
- 需要阻止用户交互的加载状态

## 完整API参考

### Props

| 名称 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| text | string | '加载中' | 否 | 加载提示文本 |
| image | string | '' | 否 | 自定义加载图标URL，优先级高于内置加载动画 |
| type | 'outline' \| 'ring' | 'ring' | 否 | 内置加载动画类型 |
| loading | boolean | false | 否 | 是否显示加载动画 |
| bgColor | string | '#ffffff' | 否 | 背景颜色 |
| color | string | '#C8C8C8' | 否 | 文本颜色 |
| fontSize | number \| string | 19 | 否 | 文本字体大小，单位rpx |
| iconSize | number \| string | 28 | 否 | 自定义加载图标大小，单位rpx |
| loadingColor | string | '#C8C8C8' | 否 | 内置加载动画颜色 |
| zIndex | number \| string | 10 | 否 | 加载动画层级 |
| customStyle | string | - | 否 | 自定义样式 |
| customClass | string | - | 否 | 自定义类名 |

### Events

无

### Methods

无

### Slots

| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| default | - | 自定义加载提示内容，替代默认文本 |

## 多场景使用示例

### 基础用法

```vue
<template>
  <view>
    <wd-loading-page :loading="loading" />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const loading = ref(true)
</script>
```

### 自定义提示文本

```vue
<template>
  <view>
    <wd-loading-page :loading="loading" text="数据加载中，请稍候..." />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const loading = ref(true)
</script>
```

### 自定义样式

```vue
<template>
  <view>
    <wd-loading-page 
      :loading="loading" 
      text="加载中"
      bg-color="#f5f5f5"
      color="#666"
      font-size="20"
      loading-color="#1890FF"
      type="outline"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const loading = ref(true)
</script>
```

### 使用自定义图标

```vue
<template>
  <view>
    <wd-loading-page 
      :loading="loading" 
      text="加载中"
      image="https://example.com/loading.png"
      :icon-size="40"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const loading = ref(true)
</script>
```

### 自定义插槽内容

```vue
<template>
  <view>
    <wd-loading-page :loading="loading">
      <view class="custom-content">
        <text class="custom-text">正在加载数据</text>
        <text class="custom-subtext">请稍候...</text>
      </view>
    </wd-loading-page>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const loading = ref(true)
</script>

<style scoped>
.custom-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.custom-text {
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
}

.custom-subtext {
  font-size: 16px;
  color: #999;
}
</style>
```

## 样式定制指南

### 自定义样式

通过 `customStyle` 属性可以自定义页面加载组件的样式：

```vue
<wd-loading-page 
  :loading="loading" 
  :custom-style="{ borderRadius: '10px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }"
/>
```

### 自定义类名

通过 `customClass` 属性可以添加自定义类名，然后在样式文件中定义样式：

```vue
<wd-loading-page 
  :loading="loading" 
  custom-class="my-loading-page"
/>
```

```scss
.my-loading-page {
  /* 自定义样式 */
  backdrop-filter: blur(5px);
  
  .wd-loading-page__warpper {
    /* 自定义加载内容容器样式 */
    padding: 20px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 10px;
  }
}
```

## 注意事项

1. 显示控制：
   - 通过 `loading` 属性控制组件的显示和隐藏
   - 组件显示时会覆盖整个页面，阻止用户交互

2. 加载动画选择：
   - 内置两种加载动画类型：`outline`（圆形）和 `ring`（半圆形）
   - 当设置了 `image` 属性时，会优先使用自定义图标，忽略内置动画

3. 样式定制：
   - 可通过 `bgColor` 属性设置背景颜色，支持透明色
   - 可通过 `color` 和 `fontSize` 属性自定义文本样式
   - 内置加载动画颜色可通过 `loadingColor` 属性设置

4. 层级控制：
   - 默认层级为10，可通过 `zIndex` 属性调整
   - 确保层级设置合理，避免被其他元素遮挡

5. 性能考虑：
   - 页面加载完成后及时将 `loading` 设置为 `false` 以隐藏组件
   - 避免长时间显示加载页面，影响用户体验

6. 适用场景：
   - 适合页面级别的加载状态
   - 对于局部加载状态，建议使用 `wd-loading` 组件
   - 结合路由守卫或生命周期钩子使用，实现页面加载状态的自动控制