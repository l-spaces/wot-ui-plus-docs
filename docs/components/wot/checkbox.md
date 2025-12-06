# Checkbox 复选框

<demo-model url="/subPages/checkbox/Index"></demo-model>

## 组件概况

### 组件概述
Checkbox 复选框组件用于多选场景，支持多种形状样式和状态，可单独使用也可与 CheckboxGroup 组件结合使用，实现复杂的多选功能。

### 详细功能描述
- 支持三种形状：圆形（circle）、方形（square）、按钮（button）
- 支持半选中状态（indeterminate）
- 支持自定义选中颜色
- 支持禁用状态
- 支持不同大小设置（默认、large）
- 支持内联排列和单元格样式
- 支持与 CheckboxGroup 组件结合使用，实现组内多选
- 支持自定义 trueValue 和 falseValue
- 支持自定义样式和类名
- 支持最大宽度限制

### 适用业务场景
- 表单中的多选选项
- 列表项的多选功能
- 筛选条件的多选设置
- 任何需要用户选择多个选项的场景

## 完整API参考

### Props属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| modelValue | string/number/boolean | - | 是 | 复选框的值，必须提供 |
| shape | string | circle | 否 | 复选框形状，可选值：circle / square / button |
| checkedColor | string | - | 否 | 选中时的颜色 |
| disabled | boolean/null | null | 否 | 禁用状态，null表示继承父组件状态 |
| trueValue | string/number/boolean | true | 否 | 选中时的值，在checkbox-group中使用无效 |
| falseValue | string/number/boolean | false | 否 | 非选中时的值，在checkbox-group中使用无效 |
| indeterminate | boolean | false | 否 | 半选中状态 |
| size | string | - | 否 | 设置大小，可选值：large |
| maxWidth | string | - | 否 | 文字位置最大宽度 |
| customLabelClass | string | - | 否 | 自定义标签样式类 |
| customShapeClass | string | - | 否 | 自定义形状样式类 |
| customStyle | string | - | 否 | 自定义根节点样式 |
| customClass | string | - | 否 | 自定义根节点样式类 |

### Events事件

| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| change | 选中状态变化时 | value: 当前选中状态值 |
| update:modelValue | 选中状态变化时 | newVal: 新的选中值 |

### Methods方法

| 方法名 | 参数 | 返回值 | 功能说明 |
|--------|------|--------|----------|
| toggle | - | - | 切换当前选中状态 |

### Slots插槽

| 插槽名 | 作用域变量 | 使用说明 |
|--------|------------|----------|
| default | - | 复选框标签文本 |

## 多场景使用示例代码

### 1. 基础用法

```vue
<template>
  <view class="checkbox-demo">
    <wd-checkbox v-model="checked" @change="handleChange">
      同意协议
    </wd-checkbox>
    <view class="result">选中状态：{{ checked }}</view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { showToast } from '@/utils/toast'

// 基础复选框用法，双向绑定选中状态
const checked = ref(false)

// 处理选中状态变化
const handleChange = (event: any) => {
  showToast(`选中状态：${event.value}`)
}
</script>

<style scoped>
.checkbox-demo {
  padding: 20rpx;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.result {
  font-size: 28rpx;
  color: #666;
}
</style>
```

### 2. 多个复选框

```vue
<template>
  <view class="checkbox-demo">
    <view class="demo-title">选择爱好</view>
    <wd-checkbox v-model="hobbies.reading" @change="handleChange">阅读</wd-checkbox>
    <wd-checkbox v-model="hobbies.sports" @change="handleChange">运动</wd-checkbox>
    <wd-checkbox v-model="hobbies.music" @change="handleChange">音乐</wd-checkbox>
    <wd-checkbox v-model="hobbies.travel" @change="handleChange">旅行</wd-checkbox>
    <view class="result">选中的爱好：{{ selectedHobbies.join(', ') || '无' }}</view>
  </view>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

// 多个独立的复选框，用于选择爱好
const hobbies = ref({
  reading: false,
  sports: true,
  music: false,
  travel: true
})

// 计算选中的爱好
const selectedHobbies = computed(() => {
  return Object.entries(hobbies.value)
    .filter(([_, value]) => value)
    .map(([key]) => {
      const map: any = {
        reading: '阅读',
        sports: '运动',
        music: '音乐',
        travel: '旅行'
      }
      return map[key]
    })
})

// 处理选中状态变化
const handleChange = () => {
  console.log('选中的爱好:', selectedHobbies.value)
}
</script>

<style scoped>
.checkbox-demo {
  padding: 20rpx;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.demo-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
}

.result {
  font-size: 28rpx;
  color: #666;
  margin-top: 20rpx;
}
</style>
```

### 3. 不同形状和样式

```vue
<template>
  <view class="checkbox-demo">
    <view class="demo-section">
      <view class="section-title">不同形状</view>
      <wd-checkbox v-model="shapes.circle" shape="circle">圆形</wd-checkbox>
      <wd-checkbox v-model="shapes.square" shape="square">方形</wd-checkbox>
      <wd-checkbox v-model="shapes.button" shape="button">按钮</wd-checkbox>
    </view>
    
    <view class="demo-section">
      <view class="section-title">不同大小</view>
      <wd-checkbox v-model="sizes.normal">默认大小</wd-checkbox>
      <wd-checkbox v-model="sizes.large" size="large">大尺寸</wd-checkbox>
    </view>
    
    <view class="demo-section">
      <view class="section-title">自定义颜色</view>
      <wd-checkbox v-model="colors.red" checkedColor="#fa4350">红色</wd-checkbox>
      <wd-checkbox v-model="colors.green" checkedColor="#34d19d">绿色</wd-checkbox>
      <wd-checkbox v-model="colors.blue" checkedColor="#4D80F0">蓝色</wd-checkbox>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 不同形状的复选框
const shapes = ref({
  circle: true,
  square: false,
  button: true
})

// 不同大小的复选框
const sizes = ref({
  normal: true,
  large: false
})

// 自定义颜色的复选框
const colors = ref({
  red: true,
  green: false,
  blue: true
})
</script>

<style scoped>
.checkbox-demo {
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

### 4. 禁用状态和半选中状态

```vue
<template>
  <view class="checkbox-demo">
    <view class="demo-section">
      <view class="section-title">禁用状态</view>
      <wd-checkbox v-model="disabled.checked" disabled>已选中禁用</wd-checkbox>
      <wd-checkbox v-model="disabled.unchecked" disabled>未选中禁用</wd-checkbox>
    </view>
    
    <view class="demo-section">
      <view class="section-title">半选中状态</view>
      <wd-checkbox v-model="indeterminateValue" indeterminate @change="handleIndeterminateChange">
        半选中状态
      </wd-checkbox>
      <view class="result">实际值：{{ indeterminateValue }}</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { showToast } from '@/utils/toast'

// 禁用状态的复选框
const disabled = ref({
  checked: true,
  unchecked: false
})

// 半选中状态的复选框
const indeterminateValue = ref(false)

// 处理半选中状态变化
const handleIndeterminateChange = (event: any) => {
  showToast(`实际值：${event.value}`)
}
</script>

<style scoped>
.checkbox-demo {
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

.result {
  font-size: 28rpx;
  color: #666;
  margin-top: 10rpx;
}
</style>
```

### 5. 与checkbox-group结合使用

```vue
<template>
  <view class="checkbox-demo">
    <wd-checkbox-group 
      v-model="selectedFruits" 
      :max="3" 
      :min="1"
      @change="handleGroupChange"
    >
      <wd-checkbox modelValue="apple" shape="button">苹果</wd-checkbox>
      <wd-checkbox modelValue="banana" shape="button">香蕉</wd-checkbox>
      <wd-checkbox modelValue="orange" shape="button">橙子</wd-checkbox>
      <wd-checkbox modelValue="grape" shape="button">葡萄</wd-checkbox>
      <wd-checkbox modelValue="watermelon" shape="button">西瓜</wd-checkbox>
    </wd-checkbox-group>
    <view class="result">选中的水果：{{ selectedFruits.join(', ') }}</view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { showToast } from '@/utils/toast'

// 与checkbox-group结合使用，支持最大最小选择数量
const selectedFruits = ref(['apple', 'banana'])

// 处理组内选中状态变化
const handleGroupChange = (event: any) => {
  showToast(`选中的水果：${event.value.join(', ')}`)
}
</script>

<style scoped>
.checkbox-demo {
  padding: 20rpx;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.result {
  font-size: 28rpx;
  color: #666;
  margin-top: 20rpx;
}
</style>
```

## 样式定制指南

### 1. 使用customStyle自定义样式

```vue
<template>
  <wd-checkbox 
    v-model="checked" 
    customStyle="margin: 20rpx; padding: 10rpx;"
  >
    自定义样式
  </wd-checkbox>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checked = ref(true)
</script>
```

### 2. 使用customClass自定义类名

```vue
<template>
  <wd-checkbox 
    v-model="checked" 
    customClass="my-checkbox"
  >
    自定义类名
  </wd-checkbox>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checked = ref(true)
</script>

<style scoped>
/* 注意：需要使用 ::v-deep 或 /deep/ 穿透 scoped 样式 */
:deep(.my-checkbox) {
  margin: 20rpx;
  padding: 10rpx;
  background-color: #f5f7fa;
  border-radius: 8rpx;
}
</style>
```

### 3. 自定义形状和标签样式

```vue
<template>
  <wd-checkbox 
    v-model="checked" 
    customShapeClass="custom-shape"
    customLabelClass="custom-label"
  >
    自定义形状和标签
  </wd-checkbox>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checked = ref(true)
</script>

<style scoped>
/* 注意：需要使用 ::v-deep 或 /deep/ 穿透 scoped 样式 */
:deep(.custom-shape) {
  border-width: 2rpx;
  border-color: #4D80F0;
}

:deep(.custom-label) {
  font-weight: bold;
  color: #333;
  font-size: 30rpx;
}
</style>
```

## 注意事项

1. **modelValue必填**：modelValue属性是必填的，必须提供一个初始值。

2. **trueValue和falseValue**：在checkbox-group中使用时，trueValue和falseValue属性无效，组件会使用modelValue作为选中值。

3. **shape属性**：shape属性的可选值为circle、square、button，其他值会被忽略并显示警告。

4. **disabled属性**：disabled属性可以是boolean或null，null表示继承父组件的disabled状态，true表示禁用，false表示启用。

5. **indeterminate状态**：indeterminate状态只改变视觉效果，不影响实际的选中值，实际值仍由modelValue决定。

6. **在checkbox-group中使用**：当在checkbox-group中使用时，checkbox的许多属性（如disabled、shape、checkedColor等）会继承自checkbox-group组件。

7. **最大最小选择数量**：在checkbox-group中使用时，可以通过max和min属性限制最大和最小选择数量，超出限制时会自动禁用无法选择的选项。

8. **事件触发**：change事件在选中状态变化时触发，参数包含当前的选中值。

9. **toggle方法**：可以通过调用toggle方法手动切换checkbox的选中状态，禁用状态下调用无效。

10. **内联和单元格样式**：可以通过checkbox-group的inline和cell属性控制checkbox的排列方式。