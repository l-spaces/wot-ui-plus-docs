# RadioGroup 单选框组
<demo-model url="/subPages/radioGroup/Index"></demo-model>

## 组件概况

### 组件概述
RadioGroup 组件用于管理一组单选框，实现完整的单选功能，通常用于表单、设置页、调查问卷等场景。wd-radio-group 组件提供了灵活的配置选项，支持统一设置单选框的形状、大小、颜色、禁用状态等功能，与 wd-radio 组件配合使用，实现完整的单选功能。

### 详细功能描述
- 支持双向绑定选中值
- 支持统一设置单选框形状
- 支持统一设置选中颜色
- 支持统一设置禁用状态
- 支持单元格模式
- 支持不同大小
- 支持内联布局
- 支持自定义图标位置
- 支持自定义样式和类名
- 支持 change 事件

### 适用业务场景
- 表单中的单选字段组
- 设置页面的选项选择组
- 调查问卷中的单选题组
- 用户偏好设置组
- 数据筛选选项组

## 完整API参考

### Props属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| modelValue | string / number / boolean | - | 否 | 会自动选中value对应的单选框 |
| shape | string | 'check' | 否 | 单选框形状，可选值：dot / button / check |
| checkedColor | string | - | 否 | 选中的颜色，默认为 #4D80F0 |
| disabled | boolean | false | 否 | 是否禁用所有单选框 |
| cell | boolean | false | 否 | 表单模式，所有单选框使用单元格样式 |
| size | string | '' | 否 | 设置所有单选框大小，可选值：large / medium / small |
| inline | boolean | false | 否 | 所有单选框同行展示 |
| iconPlacement | string | 'auto' | 否 | 图标位置，可选值：left / right / auto |
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |

### Events事件

| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| change | 选中值改变时 | { value: any } - 选中值 |
| update:modelValue | 选中值改变时 | value: any - 选中值 |

### Methods方法

该组件没有对外暴露的方法。

### Slots插槽

| 插槽名 | 作用域变量 | 使用说明 |
|--------|------------|----------|
| default | - | 包含的 wd-radio 组件 |

## 多场景使用示例代码

### 1. 基础用法

```vue
<template>
  <view class="radio-group-demo">
    <view class="demo-title">基础用法</view>
    <wd-radio-group v-model="checkedValue" @change="onChange">
      <wd-radio value="1">选项1</wd-radio>
      <wd-radio value="2">选项2</wd-radio>
      <wd-radio value="3">选项3</wd-radio>
    </wd-radio-group>
    <view class="radio-group-info">选中值：{{ checkedValue }}</view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checkedValue = ref('1')

const onChange = (params: { value: any }) => {
  console.log('选择结果', params)
}
</script>

<style scoped>
.radio-group-demo {
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

.radio-group-info {
  font-size: 16px;
  color: #666;
}
</style>
```

### 2. 不同形状

```vue
<template>
  <view class="radio-group-demo">
    <view class="demo-title">不同形状</view>
    <view class="demo-subtitle">dot 形状</view>
    <wd-radio-group v-model="checkedValue1" shape="dot">
      <wd-radio value="1">选项1</wd-radio>
      <wd-radio value="2">选项2</wd-radio>
    </wd-radio-group>
    <view class="demo-subtitle">check 形状（默认）</view>
    <wd-radio-group v-model="checkedValue2" shape="check">
      <wd-radio value="1">选项1</wd-radio>
      <wd-radio value="2">选项2</wd-radio>
    </wd-radio-group>
    <view class="demo-subtitle">button 形状</view>
    <wd-radio-group v-model="checkedValue3" shape="button">
      <wd-radio value="1">选项1</wd-radio>
      <wd-radio value="2">选项2</wd-radio>
    </wd-radio-group>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checkedValue1 = ref('1')
const checkedValue2 = ref('1')
const checkedValue3 = ref('1')
</script>

<style scoped>
.demo-subtitle {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
  margin-top: 20px;
}
</style>
```

### 3. 内联布局

```vue
<template>
  <view class="radio-group-demo">
    <view class="demo-title">内联布局</view>
    <wd-radio-group v-model="checkedValue" inline>
      <wd-radio value="1">选项1</wd-radio>
      <wd-radio value="2">选项2</wd-radio>
      <wd-radio value="3">选项3</wd-radio>
    </wd-radio-group>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checkedValue = ref('1')
</script>
```

### 4. 单元格模式

```vue
<template>
  <view class="radio-group-demo">
    <view class="demo-title">单元格模式</view>
    <wd-radio-group v-model="checkedValue" cell>
      <wd-radio value="1">选项1</wd-radio>
      <wd-radio value="2">选项2</wd-radio>
      <wd-radio value="3">选项3</wd-radio>
    </wd-radio-group>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checkedValue = ref('1')
</script>
```

### 5. 自定义颜色

```vue
<template>
  <view class="radio-group-demo">
    <view class="demo-title">自定义颜色</view>
    <wd-radio-group v-model="checkedValue" checked-color="#FF4D4F">
      <wd-radio value="1">选项1</wd-radio>
      <wd-radio value="2">选项2</wd-radio>
      <wd-radio value="3">选项3</wd-radio>
    </wd-radio-group>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checkedValue = ref('1')
</script>
```

## 样式定制指南

### customStyle 用法
使用 customStyle 属性可以自定义 radio-group 的内联样式，例如修改边距、背景色等。

```vue
<wd-radio-group 
  v-model="checkedValue"
  custom-style="margin: 20px; padding: 10px; background-color: #f5f7fa; border-radius: 8px;"
>
  <wd-radio value="1">选项1</wd-radio>
  <wd-radio value="2">选项2</wd-radio>
</wd-radio-group>
```

### customClass 用法
使用 customClass 属性可以为 radio-group 添加自定义样式类，便于在外部 CSS 中进行样式定制。

```vue
<wd-radio-group 
  v-model="checkedValue"
  custom-class="my-radio-group"
>
  <wd-radio value="1">选项1</wd-radio>
  <wd-radio value="2">选项2</wd-radio>
</wd-radio-group>

<style scoped>
:deep(.my-radio-group) {
  --wd-radio-checked-color: #4D80F0;
  --wd-radio-unchecked-color: #C0C4CC;
  --wd-radio-disabled-color: #C0C4CC;
  --wd-radio-label-color: #303133;
  --wd-radio-disabled-label-color: #C0C4CC;
  --wd-radio-border-color: #DCDFE6;
}
</style>
```

## 注意事项

1. **modelValue 属性**：modelValue 用于绑定选中值，必须与 radio 组件的 value 属性类型一致。

2. **shape 属性**：shape 决定了所有子 radio 组件的形状，支持 dot（圆点）、button（按钮）、check（勾选）三种形状。

3. **与 radio 组件配合使用**：wd-radio-group 组件必须包含 wd-radio 组件，才能实现完整的单选功能。

4. **统一设置子组件属性**：radio-group 的 shape、checkedColor、disabled、cell、size、inline、iconPlacement 等属性会统一应用到所有子 radio 组件上，除非子组件单独设置了这些属性。

5. **disabled 属性**：disabled 用于禁用所有子 radio 组件，禁用后无法点击选择。

6. **cell 属性**：cell 用于设置所有子 radio 组件为单元格模式，适用于列表中的单选选项。

7. **inline 属性**：inline 用于设置所有子 radio 组件为内联布局，多个单选框会在同一行显示。

8. **iconPlacement 属性**：iconPlacement 用于设置所有子 radio 组件的图标位置，支持 left、right、auto 三种位置。

9. **change 事件**：当选中值改变时，会触发 change 事件，返回选中的值。

10. **性能优化**：对于大量 radio 组件的场景，建议使用 v-for 循环渲染，并为每个 radio 组件设置唯一的 key 值。

11. **兼容性**：组件在不同平台上的表现可能略有差异，特别是在样式方面。

12. **表单验证**：可以与 wd-form 组件配合使用，实现表单验证功能。