# Resize 尺寸监听
<demo-model url="/subPages/resize/Index"></demo-model>

## 组件概况

### 组件概述
尺寸监听组件用于监听子元素的尺寸变化，并在尺寸变化时触发事件，通常用于动态高度的容器、自适应布局、响应式设计等场景。wd-resize 组件通过巧妙的设计，能够准确监听子元素的宽度和高度变化，并将变化后的尺寸信息通过事件传递给父组件。

### 详细功能描述
- 支持监听子元素的宽度和高度变化
- 支持触发 resize 事件，返回完整的尺寸信息
- 支持自定义容器样式类
- 支持自定义根节点样式和类名
- 支持跨平台使用

### 适用业务场景
- 动态高度的容器
- 自适应布局
- 响应式设计
- 富文本编辑器
- 动态表单
- 图片加载后的尺寸调整

## 完整API参考

### Props属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| customContainerClass | string | '' | 否 | 自定义容器样式类 |
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |

### Events事件

| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| resize | 子元素尺寸变化时 | { width: number, height: number, top: number, left: number, right: number, bottom: number } - 子元素的尺寸和位置信息 |

### Methods方法

该组件没有对外暴露的方法。

### Slots插槽

| 插槽名 | 作用域变量 | 使用说明 |
|--------|------------|----------|
| default | - | 需要监听尺寸变化的子元素 |

## 多场景使用示例代码

### 1. 基础用法

```vue
<template>
  <view class="resize-demo">
    <view class="demo-title">基础用法</view>
    <wd-button @click="addContent">添加内容</wd-button>
    <wd-button @click="removeContent">移除内容</wd-button>
    <wd-resize @resize="onResize">
      <view class="resize-content">
        <view v-for="(item, index) in content" :key="index" class="resize-item">
          内容项 {{ index + 1 }}
        </view>
      </view>
    </wd-resize>
    <view class="resize-info">当前尺寸：宽 {{ width }}px，高 {{ height }}px</view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const content = ref<number[]>([1, 2, 3])
const width = ref<number>(0)
const height = ref<number>(0)

const addContent = () => {
  content.value.push(content.value.length + 1)
}

const removeContent = () => {
  if (content.value.length > 0) {
    content.value.pop()
  }
}

const onResize = (params: { width: number, height: number, top: number, left: number, right: number, bottom: number }) => {
  width.value = params.width
  height.value = params.height
  console.log('尺寸变化', params)
}
</script>

<style scoped>
.resize-demo {
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

.resize-content {
  background-color: #f5f7fa;
  padding: 20px;
  border-radius: 8px;
}

.resize-item {
  height: 50px;
  background-color: #fff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.resize-item:last-child {
  margin-bottom: 0;
}

.resize-info {
  font-size: 16px;
  color: #666;
}
</style>
```

### 2. 图片加载后的尺寸调整

```vue
<template>
  <view class="resize-demo">
    <view class="demo-title">图片加载后的尺寸调整</view>
    <wd-resize @resize="onResize">
      <view class="image-container">
        <wd-img 
          v-for="(image, index) in images" 
          :key="index" 
          :src="image" 
          mode="widthFix"
          class="resize-image"
        />
      </view>
    </wd-resize>
    <view class="resize-info">图片容器尺寸：宽 {{ width }}px，高 {{ height }}px</view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const images = ref<string[]>([
  'https://picsum.photos/800/600?random=1',
  'https://picsum.photos/800/400?random=2',
  'https://picsum.photos/800/500?random=3'
])
const width = ref<number>(0)
const height = ref<number>(0)

const onResize = (params: { width: number, height: number }) => {
  width.value = params.width
  height.value = params.height
  console.log('图片容器尺寸变化', params)
}
</script>

<style scoped>
.image-container {
  background-color: #f5f7fa;
  padding: 20px;
  border-radius: 8px;
}

.resize-image {
  width: 100%;
  margin-bottom: 10px;
  border-radius: 4px;
}

.resize-image:last-child {
  margin-bottom: 0;
}
</style>
```

### 3. 动态表单

```vue
<template>
  <view class="resize-demo">
    <view class="demo-title">动态表单</view>
    <wd-button @click="addField">添加字段</wd-button>
    <wd-button @click="removeField">移除字段</wd-button>
    <wd-resize @resize="onResize">
      <view class="form-container">
        <wd-input 
          v-for="(field, index) in fields" 
          :key="index" 
          :placeholder="`请输入${field}`"
          class="form-item"
        />
      </view>
    </wd-resize>
    <view class="resize-info">表单尺寸：宽 {{ width }}px，高 {{ height }}px</view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const fields = ref<string[]>(['字段1', '字段2', '字段3'])
const width = ref<number>(0)
const height = ref<number>(0)

const addField = () => {
  fields.value.push(`字段${fields.value.length + 1}`)
}

const removeField = () => {
  if (fields.value.length > 0) {
    fields.value.pop()
  }
}

const onResize = (params: { width: number, height: number }) => {
  width.value = params.width
  height.value = params.height
  console.log('表单尺寸变化', params)
}
</script>

<style scoped>
.form-container {
  background-color: #f5f7fa;
  padding: 20px;
  border-radius: 8px;
}

.form-item {
  margin-bottom: 15px;
}

.form-item:last-child {
  margin-bottom: 0;
}
</style>
```

## 样式定制指南

### customStyle 用法
使用 customStyle 属性可以自定义 resize 组件的根节点样式。

```vue
<wd-resize 
  @resize="onResize"
  custom-style="margin: 20px; border: 1px solid #e4e7ed; border-radius: 8px;"
>
  <!-- 内容 -->
</wd-resize>
```

### customClass 用法
使用 customClass 属性可以为 resize 组件添加自定义样式类。

```vue
<wd-resize 
  @resize="onResize"
  custom-class="my-resize"
>
  <!-- 内容 -->
</wd-resize>

<style scoped>
:deep(.my-resize) {
  --wd-resize-bg-color: #f5f7fa;
  --wd-resize-border-color: #e4e7ed;
  --wd-resize-border-radius: 8px;
}
</style>
```

### customContainerClass 用法
使用 customContainerClass 属性可以自定义 resize 组件内部容器的样式类。

```vue
<wd-resize 
  @resize="onResize"
  custom-container-class="my-container"
>
  <!-- 内容 -->
</wd-resize>

<style scoped>
:deep(.my-container) {
  padding: 15px;
  background-color: #f0f9ff;
  border-radius: 8px;
}
</style>
```

## 注意事项

1. **工作原理**：wd-resize 组件通过在子元素中嵌入两个 scroll-view 来实现尺寸变化的检测。当子元素尺寸变化时，scroll-view 会触发滚动事件，组件通过监听滚动事件来获取新的尺寸信息。

2. **适用场景**：该组件适用于需要监听子元素尺寸变化的场景，特别是当子元素尺寸会动态变化时。

3. **性能考虑**：由于组件通过监听滚动事件来检测尺寸变化，可能会产生一定的性能开销。对于频繁变化的场景，建议谨慎使用或进行性能优化。

4. **布局注意事项**：为了确保组件能够准确监听尺寸变化，子元素应该能够自由扩展，不要被父容器的固定宽度或高度限制。

5. **跨平台兼容**：组件支持在 H5、小程序和 App 平台使用，但在不同平台上的表现可能略有差异。

6. **事件触发时机**：resize 事件会在子元素尺寸变化后触发，包含了子元素的完整尺寸和位置信息。

7. **初始尺寸**：组件会在挂载后立即获取子元素的初始尺寸，并触发一次 resize 事件。

8. **动态内容**：当子元素内容动态变化时，组件会自动检测并触发 resize 事件，无需手动调用方法。