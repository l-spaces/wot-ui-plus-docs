# Radio 单选框

<demo-model url="/subPages/radio/Index"></demo-model>

## 组件概况

### 组件概述
单选框组件用于在一组选项中选择一个选项，通常用于表单、设置页、调查问卷等场景。wd-radio 组件提供了灵活的配置选项，支持多种形状、大小、颜色、禁用状态等功能，通常与 wd-radio-group 组件配合使用。

### 详细功能描述
- 支持多种形状：dot（圆点）、button（按钮）、check（勾选）
- 支持自定义选中颜色
- 支持禁用状态
- 支持单元格模式
- 支持不同大小
- 支持内联布局
- 支持自定义最大宽度
- 支持自定义图标位置
- 支持自定义样式和类名
- 与 radio-group 组件配合使用，实现完整的单选功能

### 适用业务场景
- 表单中的单选字段
- 设置页面的选项选择
- 调查问卷中的单选题
- 用户偏好设置
- 数据筛选选项

## 完整API参考

### Props属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| value | string / number / boolean | - | 是 | 选中时的值 |
| shape | string | - | 否 | 单选框的形状，可选值：dot / button / check |
| checkedColor | string | - | 否 | 选中的颜色 |
| disabled | boolean / null | null | 否 | 禁用状态，null 表示继承父组件的 disabled 属性 |
| cell | boolean / null | null | 否 | 是否为单元格模式，null 表示继承父组件的 cell 属性 |
| size | string | - | 否 | 大小，可选值：large / medium / small |
| inline | boolean / null | null | 否 | 是否为内联布局，null 表示继承父组件的 inline 属性 |
| maxWidth | string | - | 否 | 最大宽度 |
| iconPlacement | string | - | 否 | 图标位置，可选值：left / right / auto |
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |

### Events事件

该组件没有定义事件，事件由 radio-group 组件统一管理。

### Methods方法

该组件没有对外暴露的方法。

### Slots插槽

| 插槽名 | 作用域变量 | 使用说明 |
|--------|------------|----------|
| default | - | 单选框标签内容 |

## 多场景使用示例代码

### 1. 基础用法

```vue
<template>
  <view class="radio-demo">
    <view class="demo-title">基础用法</view>
    <wd-radio-group v-model="checkedValue">
      <wd-radio value="1">选项1</wd-radio>
      <wd-radio value="2">选项2</wd-radio>
      <wd-radio value="3">选项3</wd-radio>
    </wd-radio-group>
    <view class="radio-info">选中值：{{ checkedValue }}</view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checkedValue = ref('1')
</script>

<style scoped>
.radio-demo {
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

.radio-info {
  font-size: 16px;
  color: #666;
}
</style>
```

### 2. 不同形状

```vue
<template>
  <view class="radio-demo">
    <view class="demo-title">不同形状</view>
    <view class="demo-subtitle">dot 形状（默认）</view>
    <wd-radio-group v-model="checkedValue1">
      <wd-radio value="1" shape="dot">选项1</wd-radio>
      <wd-radio value="2" shape="dot">选项2</wd-radio>
    </wd-radio-group>
    <view class="demo-subtitle">check 形状</view>
    <wd-radio-group v-model="checkedValue2">
      <wd-radio value="1" shape="check">选项1</wd-radio>
      <wd-radio value="2" shape="check">选项2</wd-radio>
    </wd-radio-group>
    <view class="demo-subtitle">button 形状</view>
    <wd-radio-group v-model="checkedValue3">
      <wd-radio value="1" shape="button">选项1</wd-radio>
      <wd-radio value="2" shape="button">选项2</wd-radio>
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

### 3. 不同大小

```vue
<template>
  <view class="radio-demo">
    <view class="demo-title">不同大小</view>
    <wd-radio-group v-model="checkedValue">
      <wd-radio value="1" size="large">大尺寸</wd-radio>
      <wd-radio value="2" size="medium">中尺寸</wd-radio>
      <wd-radio value="3" size="small">小尺寸</wd-radio>
    </wd-radio-group>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checkedValue = ref('1')
</script>
```

### 4. 禁用状态

```vue
<template>
  <view class="radio-demo">
    <view class="demo-title">禁用状态</view>
    <wd-radio-group v-model="checkedValue">
      <wd-radio value="1">可选选项</wd-radio>
      <wd-radio value="2" disabled>禁用选项</wd-radio>
      <wd-radio value="3" disabled>禁用选项</wd-radio>
    </wd-radio-group>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checkedValue = ref('1')
</script>
```

### 5. 按钮样式

```vue
<template>
  <view class="radio-demo">
    <view class="demo-title">按钮样式</view>
    <wd-radio-group v-model="checkedValue" shape="button">
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
使用 customStyle 属性可以自定义单选框的内联样式，例如修改边距、字体大小等。

```vue
<wd-radio 
  value="1" 
  custom-style="margin-bottom: 15px; font-size: 16px;"
>
  自定义样式
</wd-radio>
```

### customClass 用法
使用 customClass 属性可以为单选框添加自定义样式类，便于在外部 CSS 中进行样式定制。

```vue
<wd-radio 
  value="1" 
  custom-class="my-radio"
>
  自定义类名
</wd-radio>

<style scoped>
:deep(.my-radio) {
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

1. **value 属性**：value 是必填属性，表示选中时的值，必须与 radio-group 的 v-model 值类型一致。

2. **shape 属性**：shape 决定了单选框的形状，支持 dot（圆点）、button（按钮）、check（勾选）三种形状。

3. **与 radio-group 配合使用**：wd-radio 组件通常需要与 wd-radio-group 组件配合使用，实现完整的单选功能。radio-group 组件负责管理选中状态和触发事件。

4. **继承父组件属性**：当 disabled、cell、inline 等属性为 null 时，会继承父组件 radio-group 的对应属性。

5. **disabled 属性**：disabled 用于禁用单选框，禁用后无法点击选择。

6. **cell 属性**：cell 用于设置单选框为单元格模式，适用于列表中的单选选项。

7. **inline 属性**：inline 用于设置单选框为内联布局，多个单选框会在同一行显示。

8. **checkedColor 属性**：checkedColor 用于自定义选中时的颜色。

9. **size 属性**：size 用于设置单选框的大小，支持 large、medium、small 三种大小。

10. **iconPlacement 属性**：iconPlacement 用于设置图标的位置，支持 left、right、auto 三种位置。

11. **性能优化**：对于大量单选框的场景，建议使用 v-for 循环渲染，并为每个单选框设置唯一的 key 值。

12. **兼容性**：组件在不同平台上的表现可能略有差异，特别是在样式方面。

13. **表单验证**：可以与 wd-form 组件配合使用，实现表单验证功能。