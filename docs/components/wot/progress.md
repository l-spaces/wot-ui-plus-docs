# Progress 进度条

<demo-model url="/subPages/progress/Index"></demo-model>

## 组件概况

### 组件概述
进度条组件用于展示任务的完成进度，通常用于文件上传、下载、表单提交、数据加载等场景。wd-progress 组件提供了灵活的配置选项，支持自定义颜色、进度值、动画时长、状态等功能。

### 详细功能描述
- 支持自定义进度值（0-100）
- 支持隐藏进度文字
- 支持自定义进度条颜色，可使用字符串、数组或对象数组
- 支持自定义动画时长
- 支持多种状态：success、danger、warning
- 支持状态图标显示
- 支持自定义样式和类名

### 适用业务场景
- 文件上传/下载进度展示
- 表单提交进度展示
- 数据加载进度展示
- 任务完成进度展示
- 考试答题进度展示
- 游戏关卡进度展示

## 完整API参考

### Props属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| percentage | number | 0 | 否 | 进度数值，最大值100 |
| hideText | boolean | false | 否 | 是否隐藏进度条上的文字 |
| color | string / array | - | 否 | 进度条颜色，可以是字符串、字符串数组或对象数组 |
| duration | number | 30 | 否 | 进度增加1%所需毫秒数 |
| status | string | - | 否 | 进度条状态，可选值：success / danger / warning |
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |

### Events事件

该组件没有定义事件。

### Methods方法

该组件没有对外暴露的方法。

### Slots插槽

该组件没有定义插槽。

## 多场景使用示例代码

### 1. 基础用法

```vue
<template>
  <view class="progress-demo">
    <view class="demo-title">基础用法</view>
    <wd-progress :percentage="50" />
  </view>
</template>

<script lang="ts" setup>
// 无需导入，直接使用
</script>

<style scoped>
.progress-demo {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.demo-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}
</style>
```

### 2. 动态进度

```vue
<template>
  <view class="progress-demo">
    <view class="demo-title">动态进度</view>
    <wd-progress :percentage="percentage" />
    <wd-button @click="increase" size="small">增加进度</wd-button>
    <wd-button @click="reset" size="small" type="warning">重置</wd-button>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const percentage = ref(0)

const increase = () => {
  if (percentage.value < 100) {
    percentage.value += 10
  }
}

const reset = () => {
  percentage.value = 0
}
</script>
```

### 3. 自定义颜色

```vue
<template>
  <view class="progress-demo">
    <view class="demo-title">自定义颜色</view>
    <wd-progress :percentage="60" color="#4D80F0" />
    <view class="demo-subtitle">渐变色（数组形式）</view>
    <wd-progress :percentage="70" :color="['#4D80F0', '#FF4D4F']" />
    <view class="demo-subtitle">分段变色（对象数组形式）</view>
    <wd-progress 
      :percentage="80" 
      :color="[
        { color: '#FF4D4F', percentage: 30 },
        { color: '#FCCA00', percentage: 70 },
        { color: '#00C48C', percentage: 100 }
      ]" 
    />
  </view>
</template>

<script lang="ts" setup>
// 无需导入，直接使用
</script>

<style scoped>
.progress-demo {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.demo-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.demo-subtitle {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}
</style>
```

### 4. 带状态

```vue
<template>
  <view class="progress-demo">
    <view class="demo-title">带状态</view>
    <view class="demo-subtitle">成功状态</view>
    <wd-progress :percentage="100" status="success" hide-text />
    <view class="demo-subtitle">警告状态</view>
    <wd-progress :percentage="70" status="warning" hide-text />
    <view class="demo-subtitle">危险状态</view>
    <wd-progress :percentage="30" status="danger" hide-text />
  </view>
</template>

<script lang="ts" setup>
// 无需导入，直接使用
</script>
```

### 5. 隐藏文字

```vue
<template>
  <view class="progress-demo">
    <view class="demo-title">隐藏文字</view>
    <wd-progress :percentage="50" hide-text />
  </view>
</template>

<script lang="ts" setup>
// 无需导入，直接使用
</script>
```

## 样式定制指南

### customStyle 用法
使用 customStyle 属性可以自定义进度条的内联样式，例如修改高度、宽度、边框半径等。

```vue
<wd-progress 
  :percentage="50" 
  custom-style="height: 10px; border-radius: 5px;"
/>
```

### customClass 用法
使用 customClass 属性可以为进度条添加自定义样式类，便于在外部 CSS 中进行样式定制。

```vue
<wd-progress 
  :percentage="50" 
  custom-class="my-progress"
/>

<style scoped>
:deep(.my-progress) {
  --wd-progress-bar-background: #f5f7fa;
  --wd-progress-inner-background: #4D80F0;
  --wd-progress-text-color: #606266;
  --wd-progress-text-font-size: 14px;
  --wd-progress-bar-height: 8px;
  --wd-progress-border-radius: 4px;
}
</style>
```

## 注意事项

1. **percentage 属性**：percentage 的值必须在 0 到 100 之间，超出范围会被自动限制。

2. **color 属性**：color 支持三种形式：
   - 字符串形式：如 '#4D80F0'，表示整个进度条使用同一种颜色
   - 字符串数组形式：如 ['#4D80F0', '#FF4D4F']，表示进度条使用渐变色
   - 对象数组形式：如 [{ color: '#FF4D4F', percentage: 30 }, { color: '#00C48C', percentage: 100 }]，表示进度条在不同百分比段显示不同颜色

3. **duration 属性**：duration 表示进度增加 1% 所需的毫秒数，值越大，进度条动画越慢。

4. **status 属性**：status 用于设置进度条的状态，支持 success、danger、warning 三种状态。当设置了 status 且 hideText 为 true 时，会显示相应的状态图标。

5. **hideText 属性**：hideText 用于控制是否显示进度文字，当 hideText 为 true 时，不显示进度文字。

6. **性能优化**：对于频繁更新的进度条，建议适当增大 duration 的值，减少动画次数，提高性能。

7. **兼容性**：组件在不同平台上的表现可能略有差异，特别是在动画效果方面。

8. **样式定制**：可以通过 CSS 变量修改进度条的样式，包括背景色、进度色、文字颜色、高度、边框半径等。