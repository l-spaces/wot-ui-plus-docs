# Circle 圆形进度条

<demo-model url="/subPages/circle/Index"></demo-model>

## 组件概况

### 组件概述
Circle 圆形进度条是一个用于展示进度或百分比数据的可视化组件，通过 Canvas 技术实现流畅的动画效果，支持多种样式定制和交互方式。

### 详细功能描述
- 支持自定义圆环直径、进度条宽度和颜色
- 支持渐变色进度条配置
- 提供顺时针/逆时针两种动画方向
- 支持三种进度条端点形状（butt/round/square）
- 内置平滑动画效果，可调节动画速度
- 支持自定义文字内容或使用插槽插入复杂内容
- 响应式设计，适配不同尺寸需求

### 适用业务场景
- 任务完成进度展示
- 资源加载状态指示
- 评分或等级可视化
- 数据统计仪表盘
- 倒计时进度显示
- 健康数据指标展示

## 完整API参考

### Props
| 名称 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| modelValue | number | 0 | 否 | 当前进度，取值范围0-100 |
| size | number | 100 | 否 | 圆环直径，默认单位为 px |
| color | string \| object | '#4d80f0' | 否 | 进度条颜色，传入对象格式可以定义渐变色 |
| layerColor | string | '#EBEEF5' | 否 | 轨道颜色 |
| fill | string | - | 否 | 填充颜色 |
| speed | number | 50 | 否 | 动画速度（单位为 rate/s） |
| text | string | - | 否 | 文字 |
| strokeWidth | number | 10 | 否 | 进度条宽度，单位px |
| strokeLinecap | string | 'round' | 否 | 进度条端点的形状，可选值为 "butt" \| "round" \| "square" |
| clockwise | boolean | true | 否 | 是否顺时针增加 |
| customStyle | object | - | 否 | 自定义样式，对象形式 |
| customClass | string | - | 否 | 自定义类名 |

### Events
该组件不触发任何自定义事件。

### Methods
该组件没有对外暴露的方法。

### Slots
| 名称 | 作用域变量 | 说明 |
| --- | --- | --- |
| default | - | 自定义提示内容，当text属性为空时显示 |

## 多场景使用示例代码

### 1. 基础用法
```vue
<template>
  <view class="demo-container">
    <!-- 基础圆形进度条 -->
    <wd-circle :model-value="30"></wd-circle>
  </view>
</template>

<script lang="ts" setup>
</script>

<style scoped>
.demo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
</style>
```

### 2. 自定义样式
```vue
<template>
  <view class="demo-container">
    <!-- 自定义尺寸、颜色和线宽 -->
    <wd-circle 
      :model-value="60" 
      :size="150" 
      color="#67C23A" 
      :stroke-width="20"
    ></wd-circle>
  </view>
</template>

<script lang="ts" setup>
</script>

<style scoped>
.demo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
</style>
```

### 3. 渐变色进度条
```vue
<template>
  <view class="demo-container">
    <!-- 渐变色进度条 -->
    <wd-circle 
      :model-value="75" 
      :color="gradientColor"
    ></wd-circle>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 定义渐变色
const gradientColor = ref({
  0: '#FF6B6B',
  50: '#4ECDC4',
  100: '#45B7D1'
})
</script>

<style scoped>
.demo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
</style>
```

### 4. 自定义文字内容
```vue
<template>
  <view class="demo-container">
    <!-- 使用text属性自定义文字 -->
    <wd-circle 
      :model-value="80" 
      text="80%"
    ></wd-circle>
  </view>
</template>

<script lang="ts" setup>
</script>

<style scoped>
.demo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
</style>
```

### 5. 使用插槽自定义内容
```vue
<template>
  <view class="demo-container">
    <!-- 使用插槽插入复杂内容 -->
    <wd-circle :model-value="90">
      <view class="custom-content">
        <text class="percent">90%</text>
        <text class="label">完成率</text>
      </view>
    </wd-circle>
  </view>
</template>

<script lang="ts" setup>
</script>

<style scoped>
.demo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.custom-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.percent {
  font-size: 24px;
  font-weight: bold;
  color: #4d80f0;
}

.label {
  font-size: 14px;
  color: #606266;
  margin-top: 4px;
}
</style>
```

## 样式定制指南

### customStyle 自定义样式
通过 `customStyle` 属性可以直接设置组件的内联样式，用于调整组件的位置、边距等。

```vue
<wd-circle 
  :model-value="50" 
  :custom-style="{ margin: '20px', padding: '10px' }"
></wd-circle>
```

### customClass 自定义类名
通过 `customClass` 属性可以为组件添加自定义类名，结合外部样式表进行更复杂的样式定制。

```vue
<wd-circle 
  :model-value="50" 
  custom-class="my-circle"
></wd-circle>
```

```scss
.my-circle {
  // 自定义类样式
  margin: 20px;
  
  .wd-circle__text {
    // 自定义文字样式
    font-size: 16px;
    color: #67C23A;
  }
}
```

## 注意事项

### 常见问题解决方案
1. **Canvas 在某些平台显示异常**：
   - 确保 Canvas 组件的 ID 唯一
   - 检查是否正确设置了宽高属性
   - 对于微信小程序，需使用 2D Canvas 上下文

2. **动画效果不流畅**：
   - 适当降低动画速度（speed 属性）
   - 减少 Canvas 尺寸
   - 避免在组件渲染时进行大量计算

3. **渐变色不生效**：
   - 确保 color 属性传入的是正确格式的对象
   - 渐变色对象的键值应为数字类型的百分比

### 性能优化建议
- 避免频繁修改组件的 size 属性，这会导致 Canvas 重新渲染
- 对于静态进度展示，可将 speed 设置为 0 以关闭动画
- 多个 Circle 组件同时使用时，注意控制总数量，避免性能问题

### 使用限制条件
- 组件依赖 Canvas API，不支持纯文本渲染环境
- 进度值范围限制在 0-100 之间，超出范围会被自动截断
- 渐变色仅支持线性渐变，不支持径向渐变
- 文字内容过多时可能会超出组件边界，需自行控制文字大小
