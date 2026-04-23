# Navbar 导航栏

## 组件概述

Navbar 导航栏组件用于页面顶部导航，支持标题、左右文案、返回箭头、固定顶部等功能。适用于页面顶部导航栏场景。

## 核心功能描述

- **标题展示**：通过 `title` 设置导航栏标题
- **左右文案**：通过 `leftText` 和 `rightText` 设置左右按钮文案
- **返回箭头**：通过 `leftArrow` 显示左侧返回箭头
- **固定顶部**：通过 `fixed` 固定在页面顶部
- **安全区域**：通过 `safeAreaInsetTop` 适配顶部安全区域
- **禁用按钮**：通过 `leftDisabled` 和 `rightDisabled` 禁用左右按钮

## 适用业务场景

- **页面导航**：页面顶部导航栏
- **详情页**：带返回按钮的详情页导航
- **设置页**：带左右操作的导航栏

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| title | String | - | 否 | 标题文字 |
| leftText | String | - | 否 | 左侧文案 |
| rightText | String | - | 否 | 右侧文案 |
| leftArrow | Boolean | false | 否 | 是否显示左侧箭头 |
| bordered | Boolean | true | 否 | 是否显示下边框 |
| fixed | Boolean | false | 否 | 是否固定到顶部 |
| placeholder | Boolean | false | 否 | 固定到顶部时是否生成等高占位元素 |
| zIndex | Number | 500 | 否 | 导航栏层级 |
| safeAreaInsetTop | Boolean | false | 否 | 是否开启顶部安全区适配 |
| leftDisabled | Boolean | false | 否 | 是否禁用左侧按钮 |
| rightDisabled | Boolean | false | 否 | 是否禁用右侧按钮 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| clickLeft | 点击左侧区域时触发 | - | - |
| clickRight | 点击右侧区域时触发 | - | - |

### Slots

| 插槽名称 | 作用域参数 | 使用场景 |
|---------|-----------|---------|
| title | - | 自定义标题内容 |
| left | - | 自定义左侧内容 |
| right | - | 自定义右侧内容 |
| capsule | - | 自定义胶囊区域 |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-navbar title="标题" />
</template>
```

### 示例2：带返回箭头

```vue
<template>
  <wd-navbar title="详情" left-arrow left-text="返回" @click-left="goBack" />
</template>

<script lang="ts" setup>
function goBack() {
  uni.navigateBack()
}
</script>
```

### 示例3：固定顶部与安全区

```vue
<template>
  <wd-navbar title="首页" fixed placeholder safe-area-inset-top />
</template>
```

### 示例4：自定义内容

```vue
<template>
  <wd-navbar>
    <template #title>
      <wd-search v-model="value" placeholder="搜索" />
    </template>
    <template #right>
      <wd-icon name="setting" />
    </template>
  </wd-navbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')
</script>
```

## 注意事项

- `fixed` 为 true 时建议同时设置 `placeholder` 为 true
- `safeAreaInsetTop` 用于适配刘海屏等场景
- 禁用按钮时透明度降低且不可点击
