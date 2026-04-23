# Circle 圆形进度

## 组件概述

Circle 圆形进度组件用于以圆形方式展示进度，支持渐变色、自定义大小、动画速度、端点形状等。常用于磁盘用量、运动目标、任务完成度等场景，通过环形进度直观呈现数据占比。

## 核心功能描述

- **圆形进度展示**：基于 Canvas 绘制环形进度条，通过 `modelValue` 设置 0-100 的进度值
- **渐变色支持**：`color` 支持纯色字符串或对象格式定义线性渐变色（如 `{ '0%': '#4D80F0', '100%': '#07c160' }`）
- **样式定制**：支持自定义圆环直径（`size`）、进度条宽度（`strokeWidth`）、轨道颜色（`layerColor`）、填充颜色（`fill`）
- **动画效果**：`speed` 属性控制动画速率（单位 rate/s），进度变化时平滑过渡
- **方向控制**：`clockwise` 控制顺时针或逆时针绘制
- **端点形状**：`strokeLinecap` 支持 butt / round / square 三种端点样式
- **自定义内容**：通过 `text` 属性或默认插槽自定义圆环中心内容
- **多端适配**：微信小程序使用 Canvas 2D 接口，支付宝小程序自动处理像素比适配

## 适用业务场景

- **磁盘/存储用量**：展示手机或云存储的已用空间占比
- **运动健康数据**：展示步数、卡路里等运动目标的完成度
- **任务完成度仪表盘**：在管理后台展示项目或任务的完成百分比

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | Number | 0 | 否 | 当前进度，0-100 |
| size | Number | 100 | 否 | 圆环直径，单位 px |
| color | String / Object | '#4d80f0' | 否 | 进度条颜色，对象格式定义渐变色 |
| layerColor | String | '#EBEEF5' | 否 | 轨道颜色 |
| fill | String | - | 否 | 填充颜色 |
| speed | Number | 50 | 否 | 动画速度，单位 rate/s |
| text | String | - | 否 | 文字 |
| strokeWidth | Number | 10 | 否 | 进度条宽度，单位 px |
| strokeLinecap | String | 'round' | 否 | 端点形状，可选值：butt / round / square |
| clockwise | Boolean | true | 否 | 是否顺时针 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Slots

| 插槽名称 | 作用域参数 | 使用场景 |
|---------|-----------|---------|
| default | - | 自定义圆环中心内容，当未设置 text 时生效 |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-circle :model-value="50" text="50%" />
</template>
```

展示50%的圆形进度条，中心显示百分比文字。

### 示例2：样式定制

```vue
<template>
  <wd-circle :model-value="75" :size="120" :stroke-width="8" color="#07c160" layer-color="#e8e8e8" stroke-linecap="round" />
  <wd-circle :model-value="30" :size="80" :stroke-width="6" :clockwise="false" />
</template>
```

自定义圆环大小、进度条宽度、颜色、轨道颜色和端点形状，第二个示例使用逆时针方向。

### 示例3：渐变色与自定义内容

```vue
<template>
  <wd-circle :model-value="percentage" :color="gradientColor" :speed="100" :size="150">
    <view class="custom-content">
      <text class="custom-value">{{ percentage }}%</text>
      <text class="custom-label">完成率</text>
    </view>
  </wd-circle>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const percentage = ref(75)
const gradientColor = {
  '0%': '#4D80F0',
  '100%': '#07c160'
}
</script>
```

使用对象格式定义渐变色，通过默认插槽自定义圆环中心内容，`speed` 控制动画速率。

## 注意事项

- 组件基于 Canvas 绘制，微信小程序使用 Canvas 2D 接口，其他平台使用旧版 Canvas API
- `speed` 值为 0 或大于 1000 时，进度变化无动画效果，直接跳转到目标值
- 进度值为 0 时，会在起始位置渲染一个小圆点而非进度弧线
- 支付宝小程序会自动乘以像素比（pixelRatio）以适配高清屏
- `color` 传入对象时，键为百分比位置（如 `'0%'`、`'100%'`），值为对应颜色
- 组件尺寸变化时会有 50ms 延迟重绘，避免频繁变更 `size` 属性
