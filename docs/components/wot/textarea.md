# Textarea 文本域

## 组件概况

Textarea 文本域组件用于多行文本输入，支持自动高度、字数统计、清空按钮、前置图标、表单校验等能力。既可以独立使用，也可以与 `wd-form`、`wd-cell-group` 配合构建表单场景。

## 核心功能描述

- **自动高度**：通过 `autoHeight` 让文本域高度随内容变化。
- **字数统计**：通过 `showWordLimit` 和 `maxlength` 展示字数限制。
- **清空能力**：通过 `clearable` 和 `clearTrigger` 控制清空按钮显示时机。
- **表单集成**：可通过 `prop`、`rules` 与 `wd-form` 联动校验。
- **Cell 模式**：设置 `label` 后自动使用表单项样式。
- **前置内容**：支持 `prefixIcon` 或 `prefix` 插槽。
- **必填标记**：通过 `required` 与 `markerSide` 控制必填星号。

## 适用业务场景

- **评价输入**：订单评价、意见反馈等多行文本场景。
- **备注填写**：表单中的补充说明、备注信息。
- **地址或说明录入**：需要较长文本输入和字数限制的业务场景。

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | String / Number | `''` | 否 | 当前输入值，支持 `v-model`。 |
| placeholder | String | - | 否 | 占位文本。未传时使用组件内置占位文案。 |
| placeholderStyle | String | - | 否 | 占位文本样式。 |
| placeholderClass | String | `''` | 否 | 占位文本样式类。 |
| disabled | Boolean | false | 否 | 是否禁用。 |
| readonly | Boolean | false | 否 | 是否只读。 |
| maxlength | Number | -1 | 否 | 最大输入长度，`-1` 表示不限制。 |
| clearable | Boolean | false | 否 | 是否显示清空按钮。 |
| clearTrigger | String | `'always'` | 否 | 清空按钮显示时机，可选值：`focus`、`always`。 |
| focusWhenClear | Boolean | true | 否 | 点击清空后是否重新聚焦。 |
| showWordLimit | Boolean | false | 否 | 是否显示字数统计。 |
| prefixIcon | String | - | 否 | 前置图标名称。 |
| label | String | - | 否 | 左侧标题。 |
| labelWidth | String | `''` | 否 | 左侧标题宽度。 |
| size | String | - | 否 | 组件尺寸，可选值：`large`。 |
| error | Boolean | false | 否 | 是否使用错误样式。 |
| center | Boolean | false | 否 | 设置 `label` 后标题与输入区是否垂直居中。 |
| noBorder | Boolean | false | 否 | 非 Cell 模式下是否隐藏下边框。 |
| required | Boolean | false | 否 | 是否显示必填标记。 |
| markerSide | String | `'before'` | 否 | 必填标记位置，可选值：`before`、`after`。 |
| prop | String | `''` | 否 | 表单字段名，与 `wd-form` 联动时使用。 |
| rules | Array | `[]` | 否 | 表单校验规则。 |
| autoHeight | Boolean | false | 否 | 是否自动增高。 |
| autoFocus | Boolean | false | 否 | 是否自动聚焦。 |
| focus | Boolean | false | 否 | 是否获取焦点。 |
| fixed | Boolean | false | 否 | 是否处于 `position: fixed` 区域。 |
| cursorSpacing | Number | 0 | 否 | 光标与键盘距离。 |
| cursor | Number | -1 | 否 | 聚焦时光标位置。 |
| showConfirmBar | Boolean | true | 否 | 是否显示键盘顶部完成栏。 |
| selectionStart | Number | -1 | 否 | 选区开始位置。 |
| selectionEnd | Number | -1 | 否 | 选区结束位置。 |
| adjustPosition | Boolean | true | 否 | 键盘弹起时是否自动上推页面。 |
| disableDefaultPadding | Boolean | false | 否 | 是否去除 iOS 默认内边距。 |
| holdKeyboard | Boolean | false | 否 | 聚焦时点击页面是否保持键盘不收起。 |
| confirmType | String | `'done'` | 否 | 键盘右下角按钮文案，可选值：`send`、`search`、`next`、`go`、`done`。 |
| confirmHold | Boolean | false | 否 | 点击确认按钮后是否保持键盘。 |
| ignoreCompositionEvent | Boolean | true | 否 | 是否忽略输入法组合事件。 |
| inputmode | String | `'text'` | 否 | 输入模式提示，可选值：`none`、`text`、`decimal`、`numeric`、`tel`、`search`、`email`、`url`、`password`。 |
| enableNative | Boolean | true | 否 | 支付宝小程序下是否启用原生输入。 |
| customTextareaClass | String | `''` | 否 | 自定义 textarea 样式类。 |
| customTextareaContainerClass | String | `''` | 否 | 自定义 textarea 容器样式类。 |
| customLabelClass | String | `''` | 否 | 自定义标题样式类。 |
| customStyle | String | `''` | 否 | 自定义根节点样式。 |
| customClass | String | `''` | 否 | 自定义根节点样式类。 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调说明 |
|---------|---------|---------|---------|
| update:modelValue | 输入值变化时触发 | `(value: string)` | 当前输入值。 |
| input | 输入时触发 | `(detail: any)` | 原生 `input` 事件详情。 |
| focus | 聚焦时触发 | `(detail: any)` | 原生 `focus` 事件详情。 |
| blur | 失焦时触发 | `({ value: string, cursor: number \| null })` | 当前值和光标位置。 |
| clear | 点击清空按钮时触发 | - | - |
| confirm | 点击键盘确认按钮时触发 | `(detail: any)` | 原生 `confirm` 事件详情。 |
| linechange | 行数变化时触发 | `(detail: any)` | 行数变化详情。 |
| keyboardheightchange | 键盘高度变化时触发 | `(detail: any)` | 键盘高度变化详情。 |
| clickprefixicon | 点击前置图标时触发 | - | - |

### Slots

| 插槽名称 | 作用域参数 | 使用场景 |
|---------|-----------|---------|
| prefix | - | 自定义前置内容，优先级高于 `prefixIcon`。 |
| label | - | 自定义标题内容，优先级高于 `label` 属性。 |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-textarea v-model="value" placeholder="请填写评价" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')
</script>
```

### 示例2：清空按钮与字数限制

```vue
<template>
  <wd-textarea v-model="value1" :maxlength="120" clearable show-word-limit />
  <wd-textarea v-model="value2" clear-trigger="focus" :maxlength="120" clearable show-word-limit />
  <wd-textarea v-model="value3" :focus-when-clear="false" :maxlength="120" clearable show-word-limit />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
</script>
```

### 示例3：自动高度与 Cell 模式

```vue
<template>
  <wd-textarea v-model="value1" auto-height clearable />

  <wd-cell-group border>
    <wd-textarea label="高度自适应" auto-height clearable v-model="value2" placeholder="请输入..." prefix-icon="location" />
    <wd-textarea label="清空按钮" clearable v-model="value3" placeholder="请输入..." required />
    <wd-textarea label="必填星号在右" clearable v-model="value4" placeholder="请输入..." required marker-side="after" />
  </wd-cell-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
const value4 = ref('')
</script>
```

### 示例4：只读、禁用与前置插槽

```vue
<template>
  <wd-textarea v-model="readonlyValue" readonly clearable />
  <wd-textarea v-model="disabledValue" disabled clearable />

  <wd-textarea v-model="slotValue" label="备注">
    <template #prefix>
      <wd-icon name="location" />
    </template>
  </wd-textarea>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const readonlyValue = ref('只读内容')
const disabledValue = ref('禁用内容')
const slotValue = ref('')
</script>
```

## 注意事项

- 组件没有对外抛出 `click` 事件，点击交互应基于已有输入相关事件处理。
- 设置 `label` 后组件会自动切换为 Cell 风格布局。
- `showWordLimit` 配合 `maxlength` 使用时，会基于当前输入值显示字数统计。
- 只读模式下组件会覆盖遮罩层，防止拉起键盘。
- 组件初始化时会将格式化后的值同步一次到 `update:modelValue`。
- 在 `position: fixed` 区域中使用时，应将 `fixed` 设为 `true`。
