# Progress 进度条

## 组件概况

Progress 进度条组件用于展示操作进度，支持渐变色、状态标记、动画效果等功能。常用于文件上传、任务执行、表单填写等需要展示完成度的场景，通过直观的进度条让用户了解当前进展。

## 核心功能描述

- **进度展示**：通过 `percentage` 属性设置 0-100 的进度值，实时反映完成比例
- **颜色自定义**：`color` 支持字符串（纯色）、字符串数组（均分渐变）、对象数组（分段渐变，指定每段颜色和百分比）
- **状态标记**：`status` 属性支持 success / danger / warning 三种状态，状态激活时显示对应图标替代百分比文字
- **动画过渡**：`duration` 控制进度增加 1% 所需毫秒数，进度变化时自动播放过渡动画
- **文字控制**：`hideText` 可隐藏进度百分比文字，配合 status 显示状态图标

## 适用业务场景

- **文件上传进度**：展示文件上传的实时进度百分比，上传完成显示 success 状态
- **表单填写进度**：多步骤表单中展示当前填写完成度，引导用户完成全部字段
- **任务执行监控**：后台任务执行时展示进度，异常时显示 danger 状态，超时显示 warning 状态

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| percentage | Number | 0 | 否 | 进度数值，0-100 |
| hideText | Boolean | false | 否 | 是否隐藏进度文字 |
| color | String / Array | - | 否 | 进度条颜色，支持纯色字符串、字符串数组（均分渐变）、对象数组（分段渐变，每项含 color 和 percentage） |
| duration | Number | 30 | 否 | 进度增加1%所需毫秒数 |
| status | String | - | 否 | 状态，可选值：success / danger / warning |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-progress :percentage="50" />
</template>
```

展示50%的默认进度条，使用蓝色进度条和百分比文字。

### 示例2：状态与颜色

```vue
<template>
  <wd-progress :percentage="100" status="success" />
  <wd-progress :percentage="80" color="#07c160" />
  <wd-progress :percentage="30" status="danger" />
</template>
```

通过 `status` 设置进度条状态，状态激活时百分比文字替换为对应图标；通过 `color` 自定义进度条颜色。

### 示例3：渐变色与动态进度

```vue
<template>
  <wd-progress :percentage="percentage" :color="colors" :duration="10" />
  <wd-button size="small" @click="addProgress">增加进度</wd-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const percentage = ref(30)
const colors = [
  { color: '#4D80F0', percentage: 30 },
  { color: '#07c160', percentage: 60 },
  { color: '#ee0a24', percentage: 100 }
]

function addProgress() {
  percentage.value = Math.min(100, percentage.value + 10)
}
</script>
```

使用对象数组定义分段渐变色，每段指定颜色和结束百分比位置，`duration` 控制动画速度。

## 注意事项

- `percentage` 值必须在 0-100 之间，超出范围会在控制台报错
- `color` 传入对象数组时，每项必须包含 `color` 和 `percentage` 字段，且 `percentage` 必须为有效数字
- 进度前进和后退时动画方向不同，前进时逐段变色，后退时直接切换到目标颜色
- `status` 激活时，`hideText` 为 false 也会隐藏百分比文字，改为显示状态图标
