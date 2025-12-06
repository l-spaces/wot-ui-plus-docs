# InputNumber 数字输入框

<demo-model url="/subPages/inputNumber/Index"></demo-model>


## 组件概况

### 组件概述
InputNumber 是一个带有加减按钮的数字输入组件，用于精确控制数值输入。它支持步进值、最大最小值限制、精度控制、严格步进模式等功能，适用于需要精确数值输入的场景，如数量选择、价格输入、评分等。

### 核心功能
- 支持加减按钮控制数值
- 支持自定义步进值
- 支持最大最小值限制
- 支持数值精度控制
- 支持严格步进模式
- 支持禁用输入框或按钮
- 支持长按加减手势
- 支持自定义输入框宽度
- 支持允许为空
- 支持值变化前的拦截

### 适用业务场景
- 商品数量选择
- 价格输入
- 评分选择
- 年龄输入
- 身高体重输入
- 任何需要精确数值输入的场景

## 完整API参考

### Props
| 名称 | 类型 | 默认值 | 必填项 | 描述 |
| --- | --- | --- | --- | --- |
| modelValue | number / string | - | 是 | 绑定值 |
| min | number | 1 | 否 | 最小值 |
| max | number | Number.MAX_SAFE_INTEGER | 否 | 最大值 |
| step | number | 1 | 否 | 步进值 |
| stepStrictly | boolean | false | 否 | 是否严格按照步进值递增或递减 |
| precision | number / string | 0 | 否 | 数值精度 |
| disabled | boolean | false | 否 | 是否禁用 |
| disableInput | boolean | false | 否 | 是否禁用输入框 |
| disableMinus | boolean | false | 否 | 是否禁用减号按钮 |
| disablePlus | boolean | false | 否 | 是否禁用加号按钮 |
| withoutInput | boolean | false | 否 | 是否不显示输入框 |
| inputWidth | number / string | 36 | 否 | 输入框宽度 |
| allowNull | boolean | false | 否 | 是否允许为空 |
| placeholder | string | '' | 否 | 输入框占位符 |
| adjustPosition | boolean | true | 否 | 键盘弹起时，是否自动上推页面 |
| beforeChange | function | - | 否 | 输入值变化前的回调函数，返回 false 可阻止输入，支持返回 Promise |
| longPress | boolean | false | 否 | 是否开启长按加减手势 |
| immediateChange | boolean | true | 否 | 是否立即响应输入变化，false 时仅在失焦和按钮点击时更新 |
| updateOnInit | boolean | true | 否 | 是否在初始化时更新 v-model 为修正后的值 |
| inputType | string | 'digit' | 否 | 输入框类型，可选值：number / digit |
| customStyle | string | '' | 否 | 自定义样式，对象格式 |
| customClass | string | '' | 否 | 自定义类名 |

### Events
| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| change | 数值变化时触发 | value: { value: 输入框的当前值 } |
| focus | 输入框聚焦时触发 | detail: 事件对象 |
| blur | 输入框失焦时触发 | value: { value: 输入框的当前值 } |
| update:modelValue | 数值变化时触发 | value: 输入框的当前值 |

### Methods
InputNumber 组件不直接对外暴露方法。

### Slots
InputNumber 组件不包含插槽。

## 多场景使用示例代码

### 基础用法

```vue
<template>
  <wd-input-number v-model="value" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(1)
</script>
```

### 自定义范围和步进值

```vue
<template>
  <view class="input-number-group">
    <text>数量 (1-100, 步长 5)</text>
    <wd-input-number v-model="count" :min="1" :max="100" :step="5" />
  </view>
  
  <view class="input-number-group">
    <text>价格 (0-1000, 步长 0.5)</text>
    <wd-input-number v-model="price" :min="0" :max="1000" :step="0.5" :precision="2" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const count = ref(1)
const price = ref(0)
</script>

<style scoped>
.input-number-group {
  margin-bottom: 20px;
}

.input-number-group text {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #606266;
}
</style>
```

### 禁用状态

```vue
<template>
  <view class="input-number-group">
    <text>禁用状态</text>
    <wd-input-number v-model="value1" disabled />
  </view>
  
  <view class="input-number-group">
    <text>禁用减号按钮</text>
    <wd-input-number v-model="value2" disable-minus />
  </view>
  
  <view class="input-number-group">
    <text>禁用加号按钮</text>
    <wd-input-number v-model="value3" disable-plus />
  </view>
  
  <view class="input-number-group">
    <text>禁用输入框</text>
    <wd-input-number v-model="value4" disable-input />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref(1)
const value2 = ref(1)
const value3 = ref(5)
const value4 = ref(3)
</script>
```

### 严格步进模式

```vue
<template>
  <view class="input-number-group">
    <text>严格步进模式 (步长 2)</text>
    <wd-input-number v-model="value" :step="2" step-strictly />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(2)
</script>
```

### 不带输入框的模式

```vue
<template>
  <view class="input-number-group">
    <text>不带输入框的模式</text>
    <wd-input-number v-model="value" without-input />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(1)
</script>
```

### 允许为空

```vue
<template>
  <view class="input-number-group">
    <text>允许为空</text>
    <wd-input-number v-model="value" allow-null placeholder="请输入数值" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
```

### 长按加减手势

```vue
<template>
  <view class="input-number-group">
    <text>长按加减手势</text>
    <wd-input-number v-model="value" long-press />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(1)
</script>
```

### 值变化前拦截

```vue
<template>
  <view class="input-number-group">
    <text>值变化前拦截 (不能超过10)</text>
    <wd-input-number v-model="value" :before-change="handleBeforeChange" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(1)

const handleBeforeChange = (newValue: number) => {
  if (newValue > 10) {
    uni.showToast({
      title: '数值不能超过10',
      icon: 'none'
    })
    return false
  }
  return true
}
</script>
```

## 样式定制指南

### 使用 customStyle 自定义样式

```vue
<template>
  <wd-input-number 
    v-model="value" 
    :custom-style="{
      '--wd-input-number-action-color': '#1989fa',
      '--wd-input-number-input-color': '#333',
      '--wd-input-number-border-color': '#dcdfe6'
    }"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(1)
</script>
```

### 使用 customClass 自定义类名

```vue
<template>
  <wd-input-number 
    v-model="value" 
    custom-class="my-input-number"
  />
</template>

<style scoped>
.my-input-number {
  border: 1px solid #1989fa;
  border-radius: 4px;
  overflow: hidden;
}

.my-input-number .wd-input-number__action {
  background-color: #ecf5ff;
}

.my-input-number .wd-input-number__action-icon {
  color: #1989fa;
}
</style>
```

### 自定义输入框宽度

```vue
<template>
  <wd-input-number 
    v-model="value" 
    :input-width="80"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(1)
</script>
```

## 注意事项

1. **数值范围**：通过 min 和 max 属性可以限制输入值的范围，超出范围的输入会被自动修正。

2. **步进值**：step 属性用于设置每次点击加减按钮时数值的变化量，支持小数。

3. **精度控制**：precision 属性用于设置数值的小数位数，超出精度的数值会被自动四舍五入。

4. **严格步进模式**：stepStrictly 属性为 true 时，输入值必须是步进值的整数倍，否则会被自动修正。

5. **禁用状态**：可以通过 disabled、disableMinus、disablePlus 和 disableInput 属性分别控制整个组件、减号按钮、加号按钮和输入框的禁用状态。

6. **不带输入框模式**：withoutInput 属性为 true 时，只显示加减按钮，不显示输入框，适用于仅通过按钮控制数值的场景。

7. **长按手势**：longPress 属性为 true 时，长按加减按钮会持续增减数值，提升操作效率。

8. **允许为空**：allowNull 属性为 true 时，输入框可以为空，适用于可选的数值输入场景。

9. **值变化拦截**：beforeChange 属性可以用于在数值变化前进行拦截，返回 false 或 Promise.reject() 可阻止数值变化。

10. **输入类型**：inputType 属性支持 'number' 和 'digit' 两种类型，'digit' 类型只允许输入数字和小数点，'number' 类型支持负数。

11. **初始化更新**：updateOnInit 属性为 true 时，会在组件初始化时将 v-model 值修正为符合规则的值，如不在范围内的值会被修正到最近的边界值。

12. **立即响应**：immediateChange 属性为 true 时，输入框内容变化会立即更新 v-model，否则仅在失焦或点击按钮时更新。

13. **性能优化**：对于频繁变化的数值，建议合理设置 immediateChange 属性，避免过多的更新操作影响性能。

14. **平台兼容性**：在不同平台上，输入框的表现可能存在细微差异，建议在各平台进行测试，特别是关于键盘类型和输入限制的部分。