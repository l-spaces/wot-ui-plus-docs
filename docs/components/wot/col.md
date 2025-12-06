# Col 栅格列

<demo-model url="/subPages/col/Index"></demo-model>

## 组件概况

### 组件概述
Col 栅格列组件是栅格系统的列元素，与 Row 组件配合使用，用于创建灵活的响应式布局。它提供了基于24栅格的宽度分配和偏移功能，支持自定义间距和样式。

### 详细功能描述
- 基于24栅格系统，支持1-24的宽度分配
- 支持列偏移功能，可调整列的位置
- 自动继承父级 Row 组件的间距设置
- 支持自定义样式和类名
- 提供响应式布局支持
- 轻量级实现，性能优化

### 适用业务场景
- 网站首页响应式布局
- 表单布局设计
- 卡片网格展示
- 商品列表布局
- 后台管理系统布局
- 各种需要灵活布局的场景

## 完整API参考

### Props
| 名称 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| span | number | 24 | 否 | 列元素宽度，基于24栅格系统，取值范围0-24 |
| offset | number | 0 | 否 | 列元素偏移距离，基于24栅格系统，取值范围0-24 |
| customStyle | object | - | 否 | 自定义样式，对象形式 |
| customClass | string | - | 否 | 自定义类名 |

### Events
该组件不触发任何自定义事件。

### Methods
该组件没有对外暴露的方法。

### Slots
| 名称 | 作用域变量 | 说明 |
| --- | --- | --- |
| default | - | 列内容插槽，用于放置列内的元素 |

## 多场景使用示例代码

### 1. 基础用法
```vue
<template>
  <view class="demo-container">
    <wd-row>
      <wd-col span="12">
        <view class="demo-item">12</view>
      </wd-col>
      <wd-col span="12">
        <view class="demo-item">12</view>
      </wd-col>
    </wd-row>
  </view>
</template>

<script lang="ts" setup>
</script>

<style scoped>
.demo-container {
  padding: 20px;
}

.demo-item {
  padding: 20px;
  background-color: #4d80f0;
  color: white;
  text-align: center;
  border-radius: 4px;
}
</style>
```

### 2. 自定义宽度分配
```vue
<template>
  <view class="demo-container">
    <wd-row>
      <wd-col span="8">
        <view class="demo-item">8</view>
      </wd-col>
      <wd-col span="8">
        <view class="demo-item">8</view>
      </wd-col>
      <wd-col span="8">
        <view class="demo-item">8</view>
      </wd-col>
    </wd-row>
    
    <wd-row style="margin-top: 10px;">
      <wd-col span="6">
        <view class="demo-item">6</view>
      </wd-col>
      <wd-col span="12">
        <view class="demo-item">12</view>
      </wd-col>
      <wd-col span="6">
        <view class="demo-item">6</view>
      </wd-col>
    </wd-row>
  </view>
</template>

<script lang="ts" setup>
</script>

<style scoped>
.demo-container {
  padding: 20px;
}

.demo-item {
  padding: 20px;
  background-color: #4d80f0;
  color: white;
  text-align: center;
  border-radius: 4px;
}
</style>
```

### 3. 列偏移
```vue
<template>
  <view class="demo-container">
    <wd-row>
      <wd-col span="8">
        <view class="demo-item">8</view>
      </wd-col>
      <wd-col span="8" offset="8">
        <view class="demo-item">8 offset 8</view>
      </wd-col>
    </wd-row>
    
    <wd-row style="margin-top: 10px;">
      <wd-col span="6" offset="6">
        <view class="demo-item">6 offset 6</view>
      </wd-col>
      <wd-col span="6" offset="6">
        <view class="demo-item">6 offset 6</view>
      </wd-col>
    </wd-row>
  </view>
</template>

<script lang="ts" setup>
</script>

<style scoped>
.demo-container {
  padding: 20px;
}

.demo-item {
  padding: 20px;
  background-color: #4d80f0;
  color: white;
  text-align: center;
  border-radius: 4px;
}
</style>
```

### 4. 带间距的栅格
```vue
<template>
  <view class="demo-container">
    <wd-row gutter="20">
      <wd-col span="8">
        <view class="demo-item">8</view>
      </wd-col>
      <wd-col span="8">
        <view class="demo-item">8</view>
      </wd-col>
      <wd-col span="8">
        <view class="demo-item">8</view>
      </wd-col>
    </wd-row>
  </view>
</template>

<script lang="ts" setup>
</script>

<style scoped>
.demo-container {
  padding: 20px;
}

.demo-item {
  padding: 20px;
  background-color: #4d80f0;
  color: white;
  text-align: center;
  border-radius: 4px;
}
</style>
```

### 5. 复杂布局组合
```vue
<template>
  <view class="demo-container">
    <wd-row gutter="10">
      <wd-col span="24">
        <view class="demo-item">头部</view>
      </wd-col>
      
      <wd-col span="16">
        <view class="demo-item" style="height: 200px;">主要内容</view>
      </wd-col>
      
      <wd-col span="8">
        <wd-row gutter="10">
          <wd-col span="24">
            <view class="demo-item">侧边栏1</view>
          </wd-col>
          <wd-col span="24">
            <view class="demo-item">侧边栏2</view>
          </wd-col>
          <wd-col span="24">
            <view class="demo-item">侧边栏3</view>
          </wd-col>
        </wd-row>
      </wd-col>
      
      <wd-col span="24">
        <view class="demo-item">底部</view>
      </wd-col>
    </wd-row>
  </view>
</template>

<script lang="ts" setup>
</script>

<style scoped>
.demo-container {
  padding: 20px;
}

.demo-item {
  padding: 20px;
  background-color: #4d80f0;
  color: white;
  text-align: center;
  border-radius: 4px;
  margin-bottom: 10px;
}
</style>
```

## 样式定制指南

### customStyle 自定义样式
通过 `customStyle` 属性可以直接设置列元素的内联样式，用于调整列的边距、高度等。

```vue
<wd-col 
  span="8" 
  :custom-style="{ height: '100px', backgroundColor: '#f0f2f5' }"
>
  <view class="demo-item">自定义样式</view>
</wd-col>
```

### customClass 自定义类名
通过 `customClass` 属性可以为列元素添加自定义类名，结合外部样式表进行更复杂的样式定制。

```vue
<wd-col 
  span="8" 
  custom-class="my-col"
>
  <view class="demo-item">自定义类名</view>
</wd-col>
```

```scss
.my-col {
  // 自定义列样式
  height: 120px;
  
  .demo-item {
    // 自定义列内容样式
    background-color: #67C23A;
    border-radius: 8px;
  }
}
```

## 注意事项

### 常见问题解决方案
1. **列宽总和超过24**：
   - 栅格系统基于24列，当列宽总和超过24时，会自动换行
   - 建议合理分配列宽，确保每行总和为24或其倍数

2. **偏移量计算错误**：
   - 偏移量基于24列计算，偏移量+列宽总和不应超过24
   - 如需要更大的偏移，可考虑使用空列

3. **间距不生效**：
   - 间距设置在 Row 组件的 gutter 属性上，而非 Col 组件
   - 确保 Row 组件正确设置了 gutter 属性

4. **嵌套栅格样式问题**：
   - 嵌套栅格时，内层 Row 组件会继承外层 Row 的 gutter 属性
   - 如需不同间距，可在内层 Row 组件重新设置 gutter 属性

### 性能优化建议
- 避免过度嵌套栅格组件，建议嵌套层级不超过3层
- 对于固定布局，可考虑使用更简单的 flex 布局
- 避免在栅格组件上使用复杂的动态样式，影响性能

### 使用限制条件
- 栅格系统基于24列，不支持自定义列数
- 列宽和偏移量必须为整数，取值范围0-24
- 间距（gutter）只能通过 Row 组件设置，Col 组件无法单独设置
- 嵌套栅格时，内层 Col 的宽度基于父级 Col 的宽度计算
