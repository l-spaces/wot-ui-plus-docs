# 数字输入框组件（wd-input-number）

## 组件概述

数字输入框组件是一个用于精确输入数值的UI组件，提供了便捷的加减按钮操作和直接输入功能。它支持自定义数值范围、步进值、精度，以及各种状态控制，适用于需要精确数值输入的场景，如商品数量选择、价格调整、评分设置等。

### 功能描述
- 支持通过加减按钮调整数值
- 支持直接输入数值
- 支持自定义数值范围（最小值、最大值）
- 支持自定义步进值和精度
- 支持严格步进模式
- 支持禁用状态和部分功能禁用
- 支持隐藏输入框，仅显示加减按钮
- 支持长按加减手势
- 支持输入前验证
- 支持空值处理

### 适用业务场景
- 商品数量选择
- 价格调整
- 评分设置
- 年龄、身高、体重等数值输入
- 各种需要精确数值控制的表单场景
- 步进器交互场景

### 组件设计理念
数字输入框组件采用了模块化设计，将输入框和加减按钮分离，便于维护和扩展。组件支持多种交互方式，包括点击加减按钮、长按加减按钮和直接输入，提供了良好的用户体验。

组件设计考虑了灵活性和易用性，提供了丰富的配置选项，允许开发者根据实际需求进行定制。组件使用了Vue 3的Composition API和TypeScript，确保了类型安全和代码可维护性。

组件的核心实现基于输入验证和数值格式化，确保了输入数值的准确性和一致性。组件支持输入前验证，可以通过回调函数控制是否允许数值变化。

## 完整 API 参考

### Props

| 名称 | 类型 | 默认值 | 必填项 | 描述 |
| --- | --- | --- | --- | --- |
| modelValue | number / string | - | 是 | 绑定值，数值或字符串类型 |
| min | number | 1 | 否 | 最小值 |
| max | number | Number.MAX_SAFE_INTEGER | 否 | 最大值 |
| step | number | 1 | 否 | 步进值 |
| stepStrictly | boolean | false | 否 | 是否严格按照步进值递增或递减 |
| precision | number / string | 0 | 否 | 数值精度 |
| disabled | boolean | false | 否 | 是否禁用组件 |
| disableInput | boolean | false | 否 | 是否禁用输入框 |
| disableMinus | boolean | false | 否 | 是否禁用减号按钮 |
| disablePlus | boolean | false | 否 | 是否禁用加号按钮 |
| withoutInput | boolean | false | 否 | 是否不显示输入框 |
| inputWidth | number / string | 36 | 否 | 输入框宽度，单位rpx |
| allowNull | boolean | false | 否 | 是否允许为空 |
| placeholder | string | '' | 否 | 输入框占位符 |
| adjustPosition | boolean | true | 否 | 键盘弹起时，是否自动上推页面 |
| beforeChange | function | - | 否 | 输入值变化前的回调函数，返回 `false` 可阻止输入，支持返回 `Promise` |
| longPress | boolean | false | 否 | 是否开启长按加减手势 |
| immediateChange | boolean | true | 否 | 是否立即响应输入变化，false 时仅在失焦和按钮点击时更新 |
| updateOnInit | boolean | true | 否 | 是否在初始化时更新 v-model 为修正后的值 |
| inputType | string | 'digit' | 否 | 输入框类型，可选值：number（数字输入）、digit（整数输入） |
| customStyle | object | - | 否 | 自定义样式，用于覆盖组件默认样式 |
| customClass | string | - | 否 | 自定义类名，用于扩展组件样式 |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| update:modelValue | 数值变化时 | value: number / string - 新的数值 |
| change | 数值变化时 | { value: number / string } - 包含新数值的对象 |
| focus | 输入框获得焦点时 | event.detail - 事件详情 |
| blur | 输入框失去焦点时 | { value: string / number } - 包含当前值的对象 |

### Methods

该组件没有对外暴露的方法。

### Slots

该组件没有定义任何插槽。

## 多场景使用示例代码

### 基础用法

```vue
<template>
  <wd-input-number v-model="value" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(1)
</script>
```

### 自定义数值范围和步进值

```vue
<template>
  <wd-input-number 
    v-model="value" 
    :min="0" 
    :max="100" 
    :step="5" 
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(0)
</script>
```

### 带小数精度的数值输入

```vue
<template>
  <wd-input-number 
    v-model="value" 
    :min="0" 
    :max="10" 
    :step="0.1" 
    :precision="1" 
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(0)
</script>
```

### 禁用状态和部分功能禁用

```vue
<template>
  <view class="demo">
    <!-- 完全禁用 -->
    <wd-input-number v-model="value1" :disabled="true" />
    
    <!-- 禁用减号按钮 -->
    <wd-input-number v-model="value2" :disable-minus="true" />
    
    <!-- 禁用加号按钮 -->
    <wd-input-number v-model="value3" :disable-plus="true" />
    
    <!-- 禁用输入框，仅允许按钮操作 -->
    <wd-input-number v-model="value4" :disable-input="true" />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref(5)
const value2 = ref(1)
const value3 = ref(5)
const value4 = ref(3)
</script>

<style scoped>
.demo {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  padding: 20rpx;
}
</style>
```

### 隐藏输入框，仅显示加减按钮

```vue
<template>
  <wd-input-number 
    v-model="value" 
    :without-input="true" 
    :min="1" 
    :max="10" 
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(1)
</script>
```

### 开启长按加减手势

```vue
<template>
  <wd-input-number 
    v-model="value" 
    :long-press="true" 
    :min="1" 
    :max="100" 
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(1)
</script>
```

### 输入前验证

```vue
<template>
  <wd-input-number 
    v-model="value" 
    :before-change="beforeChange" 
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(1)

const beforeChange = (newValue: number | string) => {
  // 示例：不允许输入5
  if (newValue === 5) {
    uni.showToast({
      title: '不允许输入5',
      icon: 'none'
    })
    return false
  }
  return true
}
</script>
```

## 样式定制指南

### customStyle 和 customClass

wd-input-number 组件支持通过 `customStyle` 和 `customClass` 进行样式定制。

```vue
<template>
  <wd-input-number 
    v-model="value" 
    :custom-style="{ fontSize: '16px', color: '#ff6b35' }"
    custom-class="my-input-number"
  />
</template>

<style scoped>
.my-input-number {
  /* 自定义类名样式 */
  border: 1rpx solid #e4e7ed;
  border-radius: 8rpx;
}

/* 可以通过深度选择器修改组件内部样式 */
:deep(.wd-input-number__input) {
  /* 修改输入框样式 */
  font-size: 16px;
}

:deep(.wd-input-number__action) {
  /* 修改加减按钮样式 */
  color: #ff6b35;
}
</style>
```

### 自定义输入框宽度

```vue
<template>
  <wd-input-number 
    v-model="value" 
    :input-width="100" 
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(1)
</script>
```

## 注意事项

1. **数值格式化**：
   - 组件会根据设置的精度自动格式化显示数值，例如设置precision为2时，数值1会显示为1.00
   - 格式化仅影响显示，实际绑定的值仍为原始数值

2. **输入验证**：
   - 组件会自动处理输入值，确保其在指定的范围内，并符合步进值和精度要求
   - 可以通过beforeChange回调函数进行自定义验证

3. **空值处理**：
   - 当设置allowNull为true时，组件允许输入空值
   - 否则，组件会自动填充最小值

4. **长按手势**：
   - 开启longPress属性后，按住加减按钮会持续调整数值
   - 长按触发时间为600ms，持续调整间隔为250ms

5. **步进模式**：
   - 普通步进模式下，输入值会被修正到最近的步进值
   - 严格步进模式下，输入值必须是步进值的整数倍

6. **性能优化**：
   - 对于频繁的数值变化，建议合理设置immediateChange属性，避免不必要的更新
   - 关闭longPress属性可以减少事件监听器，提高性能

7. **跨平台兼容性**：
   - 组件支持H5、小程序和App平台
   - 在小程序平台上，inputType属性的表现可能略有差异，需要测试验证
   - adjustPosition属性仅在App平台上生效

8. **使用限制**：
   - 组件的modelValue属性必须是数值或字符串类型
   - 组件不支持负数步进值
   - 组件的precision属性必须是非负整数

9. **事件处理**：
   - 建议使用v-model双向绑定来处理输入值，而不是直接监听input事件
   - blur事件会返回当前输入框的值，而不是格式化后的值

10. **初始化处理**：
    - updateOnInit属性控制组件初始化时是否修正modelValue
    - 设置为false时，组件会保持原始值，但仍会进行显示格式化

## 组件架构与实现

wd-input-number 组件采用了 Vue 3 的 Composition API 和 TypeScript，主要包含以下部分：

1. **组件主体**：`wd-input-number.vue`，负责数字输入框的整体布局和交互逻辑
2. **类型定义**：`types.ts`，包含组件的属性、事件和接口定义
3. **样式文件**：`index.scss`，包含组件的样式定义
4. **依赖组件**：`wd-icon`，用于显示加减按钮的图标

组件的核心实现原理：

1. **数值处理**：包含数值格式化、步进计算、边界限制等逻辑
2. **输入验证**：处理用户输入，确保输入值符合规则
3. **事件处理**：处理加减按钮点击、输入框输入、焦点变化等事件
4. **长按手势**：实现长按加减功能
5. **输入前验证**：支持自定义验证逻辑

组件的核心方法包括：
- `toNumber`：将输入值转换为数字
- `normalizeValue`：标准化数值，应用步进、边界和精度规则
- `formatValue`：格式化数值用于显示
- `updateValue`：更新值并触发事件
- `handleClick`：处理加减按钮点击
- `handleInput`：处理输入框输入

## 总结

wd-input-number 是一个功能强大、高度可定制的数字输入框组件，适用于各种需要精确数值输入的场景。它提供了丰富的配置选项，支持多种交互方式，包括点击加减按钮、长按加减按钮和直接输入。

组件使用了 Vue 3 的 Composition API 和 TypeScript，确保了类型安全和代码可维护性。组件设计考虑了跨平台兼容性和性能优化，提供了良好的用户体验。

通过合理使用 wd-input-number 组件，可以提高用户输入体验，确保输入数值的准确性和一致性，适用于商品数量选择、价格调整、评分设置等多种场景。