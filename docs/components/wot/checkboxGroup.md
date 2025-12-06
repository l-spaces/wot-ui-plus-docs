# CheckboxGroup 复选框组

<demo-model url="/subPages/checkboxGroup/Index"></demo-model>

## 组件概况

### 组件概述
CheckboxGroup 复选框组组件用于管理多个 Checkbox 组件，实现组内多选功能，支持设置最大和最小选中数量、不同形状样式和排列方式，是实现复杂多选功能的核心组件。

### 详细功能描述
- 管理组内 Checkbox 的选中状态
- 支持设置最大选中数量（max）
- 支持设置最小选中数量（min）
- 支持三种形状：圆形（circle）、方形（square）、按钮（button）
- 支持内联排列（inline）
- 支持单元格样式（cell）
- 支持禁用状态
- 支持自定义选中颜色
- 支持不同大小设置（默认、large）
- 提供选中状态变化事件

### 适用业务场景
- 表单中的多选选项组
- 筛选条件的多选设置
- 列表项的批量选择
- 任何需要限制选择数量的多选场景

## 完整API参考

### Props属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| modelValue | array | [] | 否 | 绑定值，数组类型，存储选中的复选框值 |
| cell | boolean | false | 否 | 是否为单元格样式 |
| shape | string | circle | 否 | 复选框形状，可选值：circle / square / button |
| checkedColor | string | - | 否 | 选中时的颜色 |
| disabled | boolean | false | 否 | 是否禁用整个组 |
| min | number | 0 | 否 | 最小选中数量 |
| max | number | 0 | 否 | 最大选中数量，0为无限数量 |
| inline | boolean | false | 否 | 是否内联排列 |
| size | string | - | 否 | 设置大小，可选值：large |
| customStyle | string | - | 否 | 自定义根节点样式 |
| customClass | string | - | 否 | 自定义根节点样式类 |

### Events事件

| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| change | 组内复选框选中状态变化时 | value: 当前选中的值数组 |
| update:modelValue | 组内复选框选中状态变化时 | newValue: 新的选中值数组 |

### Methods方法

该组件没有对外暴露的方法。

### Slots插槽

| 插槽名 | 作用域变量 | 使用说明 |
|--------|------------|----------|
| default | - | 放置 wd-checkbox 组件 |

## 多场景使用示例代码

### 1. 基础用法

```vue
<template>
  <wd-checkbox-group v-model="selectedValues" @change="handleChange">
    <wd-checkbox modelValue="option1">选项一</wd-checkbox>
    <wd-checkbox modelValue="option2">选项二</wd-checkbox>
    <wd-checkbox modelValue="option3">选项三</wd-checkbox>
    <wd-checkbox modelValue="option4">选项四</wd-checkbox>
  </wd-checkbox-group>
  <view class="result">选中的值：{{ selectedValues.join(', ') }}</view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { showToast } from '@/utils/toast'

// 基础复选框组用法，管理多个复选框的选中状态
const selectedValues = ref(['option1', 'option3'])

// 处理选中状态变化
const handleChange = (event: any) => {
  showToast(`选中的值：${event.value.join(', ')}`)
}
</script>

<style scoped>
.result {
  margin-top: 20rpx;
  font-size: 28rpx;
  color: #666;
}
</style>
```

### 2. 设置最大最小选择数量

```vue
<template>
  <wd-checkbox-group 
    v-model="selectedFruits" 
    :max="3" 
    :min="1"
    @change="handleChange"
  >
    <wd-checkbox modelValue="apple">苹果</wd-checkbox>
    <wd-checkbox modelValue="banana">香蕉</wd-checkbox>
    <wd-checkbox modelValue="orange">橙子</wd-checkbox>
    <wd-checkbox modelValue="grape">葡萄</wd-checkbox>
    <wd-checkbox modelValue="watermelon">西瓜</wd-checkbox>
  </wd-checkbox-group>
  <view class="result">
    选中的水果：{{ selectedFruits.join(', ') }}<br>
    提示：最多选3个，最少选1个
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { showToast } from '@/utils/toast'

// 设置最大最小选择数量，限制用户选择范围
const selectedFruits = ref(['apple', 'banana'])

// 处理选中状态变化
const handleChange = (event: any) => {
  showToast(`选中的水果：${event.value.join(', ')}`)
}
</script>

<style scoped>
.result {
  margin-top: 20rpx;
  font-size: 28rpx;
  color: #666;
  line-height: 44rpx;
}
</style>
```

### 3. 不同形状和排列方式

```vue
<template>
  <view class="checkbox-group-demo">
    <view class="demo-section">
      <view class="section-title">圆形形状</view>
      <wd-checkbox-group v-model="shapes.circle" shape="circle">
        <wd-checkbox modelValue="option1">选项一</wd-checkbox>
        <wd-checkbox modelValue="option2">选项二</wd-checkbox>
      </wd-checkbox-group>
    </view>
    
    <view class="demo-section">
      <view class="section-title">方形形状</view>
      <wd-checkbox-group v-model="shapes.square" shape="square">
        <wd-checkbox modelValue="option1">选项一</wd-checkbox>
        <wd-checkbox modelValue="option2">选项二</wd-checkbox>
      </wd-checkbox-group>
    </view>
    
    <view class="demo-section">
      <view class="section-title">按钮形状</view>
      <wd-checkbox-group v-model="shapes.button" shape="button">
        <wd-checkbox modelValue="option1">选项一</wd-checkbox>
        <wd-checkbox modelValue="option2">选项二</wd-checkbox>
        <wd-checkbox modelValue="option3">选项三</wd-checkbox>
      </wd-checkbox-group>
    </view>
    
    <view class="demo-section">
      <view class="section-title">内联排列</view>
      <wd-checkbox-group v-model="inlineValues" inline>
        <wd-checkbox modelValue="option1">选项一</wd-checkbox>
        <wd-checkbox modelValue="option2">选项二</wd-checkbox>
        <wd-checkbox modelValue="option3">选项三</wd-checkbox>
      </wd-checkbox-group>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 不同形状的复选框组
const shapes = ref({
  circle: ['option1'],
  square: ['option2'],
  button: ['option1', 'option3']
})

// 内联排列的复选框组
const inlineValues = ref(['option1', 'option3'])
</script>

<style scoped>
.checkbox-group-demo {
  padding: 20rpx;
  display: flex;
  flex-direction: column;
  gap: 40rpx;
}

.demo-section {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.section-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 10rpx;
}
</style>
```

### 4. 禁用状态和自定义颜色

```vue
<template>
  <view class="checkbox-group-demo">
    <view class="demo-section">
      <view class="section-title">禁用状态</view>
      <wd-checkbox-group v-model="disabledValues" disabled>
        <wd-checkbox modelValue="option1">选项一</wd-checkbox>
        <wd-checkbox modelValue="option2">选项二</wd-checkbox>
        <wd-checkbox modelValue="option3">选项三</wd-checkbox>
      </wd-checkbox-group>
    </view>
    
    <view class="demo-section">
      <view class="section-title">自定义颜色</view>
      <wd-checkbox-group 
        v-model="colorValues" 
        checkedColor="#34d19d" 
        shape="button"
      >
        <wd-checkbox modelValue="option1">选项一</wd-checkbox>
        <wd-checkbox modelValue="option2">选项二</wd-checkbox>
        <wd-checkbox modelValue="option3">选项三</wd-checkbox>
      </wd-checkbox-group>
    </view>
    
    <view class="demo-section">
      <view class="section-title">大尺寸</view>
      <wd-checkbox-group v-model="sizeValues" size="large">
        <wd-checkbox modelValue="option1">选项一</wd-checkbox>
        <wd-checkbox modelValue="option2">选项二</wd-checkbox>
      </wd-checkbox-group>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 禁用状态的复选框组
const disabledValues = ref(['option1'])

// 自定义颜色的复选框组
const colorValues = ref(['option1', 'option3'])

// 大尺寸的复选框组
const sizeValues = ref(['option2'])
</script>

<style scoped>
.checkbox-group-demo {
  padding: 20rpx;
  display: flex;
  flex-direction: column;
  gap: 40rpx;
}

.demo-section {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.section-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 10rpx;
}
</style>
```

### 5. 单元格样式和复杂数据

```vue
<template>
  <wd-checkbox-group 
    v-model="selectedItems" 
    cell 
    shape="square"
    @change="handleChange"
  >
    <wd-checkbox 
      v-for="item in items" 
      :key="item.id" 
      :modelValue="item.id"
    >
      <view class="cell-content">
        <view class="item-title">{{ item.name }}</view>
        <view class="item-desc">{{ item.description }}</view>
      </view>
    </wd-checkbox>
  </wd-checkbox-group>
  <view class="result">选中的项目：{{ selectedItemNames.join(', ') }}</view>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { showToast } from '@/utils/toast'

// 复杂数据的复选框组
const items = ref([
  { id: 'item1', name: '项目一', description: '这是项目一的详细描述' },
  { id: 'item2', name: '项目二', description: '这是项目二的详细描述' },
  { id: 'item3', name: '项目三', description: '这是项目三的详细描述' }
])

// 选中的项目ID数组
const selectedItems = ref(['item1'])

// 计算选中的项目名称
const selectedItemNames = computed(() => {
  return selectedItems.value.map(id => {
    const item = items.value.find(item => item.id === id)
    return item ? item.name : ''
  })
})

// 处理选中状态变化
const handleChange = (event: any) => {
  showToast(`选中了 ${event.value.length} 个项目`)
}
</script>

<style scoped>
.result {
  margin: 20rpx;
  font-size: 28rpx;
  color: #666;
}

.cell-content {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.item-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
}

.item-desc {
  font-size: 24rpx;
  color: #909399;
  line-height: 36rpx;
}
</style>
```

## 样式定制指南

### 1. 使用customStyle自定义样式

```vue
<template>
  <wd-checkbox-group 
    v-model="selectedValues" 
    customStyle="margin: 20rpx; padding: 10rpx; background-color: #f5f7fa; border-radius: 8rpx;"
  >
    <wd-checkbox modelValue="option1">选项一</wd-checkbox>
    <wd-checkbox modelValue="option2">选项二</wd-checkbox>
  </wd-checkbox-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const selectedValues = ref(['option1'])
</script>
```

### 2. 使用customClass自定义类名

```vue
<template>
  <wd-checkbox-group 
    v-model="selectedValues" 
    customClass="my-checkbox-group"
    shape="button"
  >
    <wd-checkbox modelValue="option1">选项一</wd-checkbox>
    <wd-checkbox modelValue="option2">选项二</wd-checkbox>
    <wd-checkbox modelValue="option3">选项三</wd-checkbox>
  </wd-checkbox-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const selectedValues = ref(['option1', 'option3'])
</script>

<style scoped>
/* 注意：需要使用 ::v-deep 或 /deep/ 穿透 scoped 样式 */
:deep(.my-checkbox-group) {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
  padding: 20rpx;
  background-color: #f0f2f5;
  border-radius: 12rpx;
}
</style>
```

## 注意事项

1. **modelValue格式**：modelValue必须是数组类型，存储选中的checkbox值，数组中不能包含重复的元素。

2. **最大最小数量限制**：
   - max为0表示无数量限制
   - 当选中数量达到max时，未选中的选项将被自动禁用
   - 当选中数量达到min时，已选中的选项将被自动禁用，无法取消选择
   - 如果初始modelValue的长度不符合max/min限制，会在控制台显示警告

3. **shape属性**：shape属性的可选值为circle、square、button，其他值会被忽略并显示警告。

4. **继承关系**：组内的checkbox会继承组的shape、disabled、checkedColor、size等属性，除非checkbox自身明确设置了这些属性。

5. **内联排列**：inline为true时，checkbox会水平排列，否则垂直排列。

6. **单元格样式**：cell为true时，checkbox会使用单元格样式，适合在列表中使用。

7. **事件触发**：change事件在组内任何checkbox的选中状态变化时触发，参数包含当前所有选中的值。

8. **性能优化**：当组内checkbox数量较多时，建议使用v-for渲染，并提供唯一的key值，以提高渲染性能。

9. **数据类型**：modelValue数组中的值类型应与checkbox的modelValue类型保持一致，建议使用字符串或数字类型。

10. **初始化检查**：组件会在初始化时检查modelValue的有效性，包括是否有重复值、是否符合max/min限制等，并在控制台显示相应的警告信息。