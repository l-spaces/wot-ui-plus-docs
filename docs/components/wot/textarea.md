# Textarea 文本域

## 组件概述

Textarea 文本域组件用于多行文本输入，支持自动高度、字数统计、清除按钮、前后置图标、表单校验等功能。可独立使用或配合 `wd-form` 实现表单校验。与 Input 组件类似，支持 label 模式和纯文本域模式，提供丰富的样式定制能力。

## 核心功能描述

- **自动高度**：通过 `autoHeight` 属性使文本域高度随内容自动调整
- **字数统计**：通过 `showWordLimit` 和 `maxlength` 显示字数统计
- **清除功能**：通过 `clearable` 显示清除按钮，支持 `clearTrigger` 控制显示时机
- **前后置图标**：通过 `prefixIcon` 设置前置图标，也支持插槽自定义
- **表单校验**：通过 `prop` 和 `rules` 配合 `wd-form` 实现校验
- **必填标记**：通过 `required` 显示必填星号，支持 `markerSide` 控制位置
- **只读模式**：通过 `readonly` 设置只读
- **聚焦控制**：通过 `focus` 和 `focusWhenClear` 控制聚焦行为
- **行变化监听**：通过 `linechange` 事件监听文本域行数变化

## 适用业务场景

- **评价输入**：在订单评价页面输入多行评价文本，配合字数统计
- **备注填写**：在表单页面填写备注信息，配合自动高度和清除功能
- **地址输入**：在收货地址页面输入详细地址，配合校验和必填标记

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | String / Number | '' | 否 | 文本域的值，支持 v-model 双向绑定 |
| placeholder | String | - | 否 | 占位文本 |
| placeholderStyle | String | - | 否 | 指定 placeholder 的样式 |
| placeholderClass | String | '' | 否 | 指定 placeholder 的样式类 |
| disabled | Boolean | false | 否 | 是否禁用 |
| readonly | Boolean | false | 否 | 是否只读 |
| maxlength | Number | -1 | 否 | 最大输入长度，-1 表示不限制 |
| clearable | Boolean | false | 否 | 是否显示清除按钮 |
| clearTrigger | String | 'always' | 否 | 显示清除按钮的时机，可选值：focus / always |
| focusWhenClear | Boolean | true | 否 | 点击清除按钮时是否聚焦文本域 |
| showWordLimit | Boolean | false | 否 | 是否显示字数统计，需同时设置 maxlength |
| prefixIcon | String | - | 否 | 前置图标，Icon 组件的图标类名 |
| label | String | - | 否 | 左侧标题 |
| labelWidth | String | '' | 否 | 左侧标题宽度 |
| size | String | - | 否 | 文本域大小，可选值：large |
| error | Boolean | false | 否 | 是否显示错误状态 |
| center | Boolean | false | 否 | 有 label 时标题和文本域是否垂直居中 |
| noBorder | Boolean | false | 否 | 是否隐藏边框 |
| required | Boolean | false | 否 | 是否显示必填标记 |
| markerSide | String | 'before' | 否 | 必填标记位置，可选值：before / after |
| prop | String | '' | 否 | 表单域 model 字段名，配合 wd-form 使用 |
| rules | Array | [] | 否 | 表单验证规则 |
| autoHeight | Boolean | false | 否 | 是否自动增高 |
| autoFocus | Boolean | false | 否 | 是否自动聚焦 |
| focus | Boolean | false | 否 | 是否获取焦点 |
| fixed | Boolean | false | 否 | 是否在 position:fixed 区域内，需设置为 true |
| cursorSpacing | Number | 0 | 否 | 光标与键盘的距离 |
| cursor | Number | -1 | 否 | focus 时的光标位置 |
| showConfirmBar | Boolean | true | 否 | 是否显示键盘上方完成按钮栏 |
| selectionStart | Number | -1 | 否 | 光标起始位置 |
| selectionEnd | Number | -1 | 否 | 光标结束位置 |
| adjustPosition | Boolean | true | 否 | 键盘弹起时是否自动上推页面 |
| disableDefaultPadding | Boolean | false | 否 | 是否去掉 iOS 下的默认内边距 |
| holdKeyboard | Boolean | false | 否 | focus 时点击页面是否不收起键盘 |
| confirmType | String | 'done' | 否 | 键盘右下角按钮文字，可选值：send / search / next / go / done |
| confirmHold | Boolean | false | 否 | 点击键盘右下角按钮时是否保持键盘不收起 |
| ignoreCompositionEvent | Boolean | true | 否 | 是否忽略文本合成系统事件 |
| inputmode | String | 'text' | 否 | 输入模式提示，可选值：none / text / decimal / numeric / tel / search / email / url |
| enableNative | Boolean | true | 否 | 支付宝小程序是否启用原生输入，设为 false 可避免键盘弹出后内容上移 |
| customTextareaClass | String | '' | 否 | 自定义文本域样式类 |
| customTextareaContainerClass | String | '' | 否 | 自定义文本域容器样式类 |
| customLabelClass | String | '' | 否 | 自定义标签样式类 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| update:modelValue | 输入值变化时 | (value: string) | 当前输入值 |
| input | 输入时触发 | (detail: Object) | 原生 input 事件详情 |
| focus | 聚焦时触发 | (detail: Object) | 原生 focus 事件详情 |
| blur | 失焦时触发 | ({ value: string, cursor: number \| null }) | value 为当前输入值，cursor 为光标位置 |
| clear | 点击清除按钮时触发 | - | - |
| confirm | 点击键盘右下角按钮时触发 | (detail: Object) | 原生 confirm 事件详情 |
| linechange | 文本域行数变化时触发 | (detail: Object) | 行变化信息 |
| keyboardheightchange | 键盘高度变化时触发 | (detail: Object) | 键盘高度信息 |
| clickprefixicon | 点击前置图标时触发 | - | - |
| click | 点击文本域时触发 | (event: MouseEvent) | 原生点击事件 |

### Slots

| 插槽名称 | 作用域参数 | 使用场景 |
|---------|-----------|---------|
| prefix | - | 前置内容，优先于 prefixIcon |
| label | - | 自定义标签内容，优先于 label 属性 |

## 使用示例

### 示例1：基础用法

通过 `v-model` 双向绑定文本域值。

```vue
<template>
  <wd-textarea v-model="value" placeholder="请填写评价" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')
</script>
```

### 示例2：字数统计与清除

通过 `showWordLimit` 和 `maxlength` 显示字数统计，通过 `clearable` 显示清除按钮。

```vue
<template>
  <wd-textarea v-model="value" :maxlength="120" clearable show-word-limit />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')
</script>
```

聚焦时才显示清除按钮：

```vue
<template>
  <wd-textarea clear-trigger="focus" v-model="value" :maxlength="120" clearable show-word-limit />
</template>
```

### 示例3：自动高度与 cell 模式

通过 `autoHeight` 使文本域高度随内容自动调整，通过 `label` 启用 cell 模式。

```vue
<template>
  <wd-textarea v-model="value" auto-height clearable />
</template>
```

cell 模式：

```vue
<template>
  <wd-cell-group border>
    <wd-textarea label="高度自适应" auto-height clearable v-model="value1" placeholder="请输入..." prefix-icon="location" />
    <wd-textarea label="字数限制" :maxlength="240" clearable show-word-limit v-model="value2" placeholder="请输入..." required />
  </wd-cell-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')
</script>
```

### 示例4：只读与禁用

通过 `readonly` 设置只读，通过 `disabled` 设置禁用。

```vue
<template>
  <wd-textarea v-model="readonlyValue" readonly clearable />
  <wd-textarea v-model="disabledValue" disabled clearable />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const readonlyValue = ref('只读内容')
const disabledValue = ref('禁用内容')
</script>
```

## 注意事项

- 字数统计使用 `Array.from` 处理多码元字符（如 emoji），确保字符计数正确
- 当设置 `label` 属性时，文本域自动变为单元格样式
- `autoHeight` 生效时，通过 style 设置高度无效
- 在 `position:fixed` 区域内使用时，需设置 `fixed` 为 true
- 支付宝小程序中设置 `enableNative` 为 false 可避免键盘弹出后内容上移
- 只读模式下会覆盖一层遮罩防止键盘弹出
