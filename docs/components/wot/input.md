# Input 输入框

## 组件概述

Input 输入框组件用于接收用户文本输入，支持多种输入类型、密码显示切换、清除按钮、字数统计、前后置图标、表单校验等功能。可独立使用或配合 `wd-form` 实现表单校验。支持 label 模式（带标题的单元格样式）和纯输入框模式，提供丰富的样式定制能力。

## 核心功能描述

- **多种输入类型**：支持 text、number、digit、idcard、safe-password、nickname、tel
- **密码输入**：通过 `showPassword` 显示密码切换按钮
- **清除功能**：通过 `clearable` 显示清除按钮，支持 `clearTrigger` 控制显示时机
- **字数统计**：通过 `showWordLimit` 和 `maxlength` 显示字数统计
- **前后置图标**：通过 `prefixIcon` 和 `suffixIcon` 设置图标，也支持插槽自定义
- **表单校验**：通过 `prop` 和 `rules` 配合 `wd-form` 实现校验
- **边框样式**：支持 border（边框）、underline（下划线）、none（无边框）三种样式
- **必填标记**：通过 `required` 显示必填星号，支持 `markerSide` 控制位置
- **只读模式**：通过 `readonly` 设置只读
- **聚焦控制**：通过 `focus` 和 `focusWhenClear` 控制聚焦行为

## 适用业务场景

- **登录表单**：输入用户名和密码，配合密码显示和清除功能
- **搜索输入**：配合前置搜索图标和清除按钮
- **信息填写**：在表单页面中输入各类信息，配合校验和字数限制

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | String / Number | '' | 否 | 输入框的值，支持 v-model 双向绑定 |
| type | String | 'text' | 否 | 输入类型，可选值：text / number / digit / idcard / safe-password / nickname / tel |
| placeholder | String | - | 否 | 占位文本 |
| placeholderStyle | String | - | 否 | 指定 placeholder 的样式 |
| placeholderClass | String | '' | 否 | 指定 placeholder 的样式类 |
| disabled | Boolean | false | 否 | 是否禁用 |
| readonly | Boolean | false | 否 | 是否只读 |
| maxlength | Number | -1 | 否 | 最大输入长度，-1 表示不限制 |
| clearable | Boolean | false | 否 | 是否显示清除按钮 |
| clearTrigger | String | 'always' | 否 | 显示清除按钮的时机，可选值：focus / always |
| focusWhenClear | Boolean | true | 否 | 点击清除按钮时是否聚焦输入框 |
| showPassword | Boolean | false | 否 | 是否显示密码切换按钮 |
| showWordLimit | Boolean | false | 否 | 是否显示字数统计，需同时设置 maxlength |
| prefixIcon | String | - | 否 | 前置图标，Icon 组件的图标类名 |
| suffixIcon | String | - | 否 | 后置图标，Icon 组件的图标类名 |
| label | String | - | 否 | 左侧标题 |
| labelWidth | String | '' | 否 | 左侧标题宽度 |
| size | String | - | 否 | 输入框大小，可选值：large |
| error | Boolean | false | 否 | 是否显示错误状态 |
| center | Boolean | false | 否 | 有 label 时标题和输入框是否垂直居中 |
| noBorder | Boolean | false | 否 | 是否隐藏边框 |
| inputBorder | String | 'underline' | 否 | 边框类型，可选值：border / underline / none |
| required | Boolean | false | 否 | 是否显示必填标记 |
| markerSide | String | 'before' | 否 | 必填标记位置，可选值：before / after |
| prop | String | - | 否 | 表单域 model 字段名，配合 wd-form 使用 |
| rules | Array | [] | 否 | 表单验证规则 |
| focus | Boolean | false | 否 | 是否获取焦点 |
| confirmType | String | 'done' | 否 | 键盘右下角按钮文字，可选值：send / search / next / go / done |
| confirmHold | Boolean | false | 否 | 点击键盘右下角按钮时是否保持键盘不收起 |
| cursor | Number | -1 | 否 | focus 时的光标位置 |
| cursorSpacing | Number | 0 | 否 | 光标与键盘的距离 |
| selectionStart | Number | -1 | 否 | 光标起始位置 |
| selectionEnd | Number | -1 | 否 | 光标结束位置 |
| adjustPosition | Boolean | true | 否 | 键盘弹起时是否自动上推页面 |
| holdKeyboard | Boolean | false | 否 | focus 时点击页面是否不收起键盘 |
| alwaysEmbed | Boolean | false | 否 | 强制 input 处于同层状态（仅 iOS） |
| ignoreCompositionEvent | Boolean | true | 否 | 是否忽略文本合成系统事件 |
| inputmode | String | 'text' | 否 | 输入模式提示，可选值：none / text / decimal / numeric / tel / search / email / url |
| alignRight | Boolean | false | 否 | 输入框内容是否靠右展示 |
| customInputClass | String | '' | 否 | 自定义输入框样式类 |
| customLabelClass | String | '' | 否 | 自定义标签样式类 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| update:modelValue | 输入值变化时 | (value: string \| number) | 当前输入值 |
| input | 输入时触发 | (detail: Object) | 原生 input 事件详情 |
| focus | 聚焦时触发 | (detail: Object) | 原生 focus 事件详情 |
| blur | 失焦时触发 | ({ value: string }) | value 为当前输入值 |
| clear | 点击清除按钮时触发 | - | - |
| confirm | 点击键盘右下角按钮时触发 | (detail: Object) | 原生 confirm 事件详情 |
| keyboardheightchange | 键盘高度变化时触发 | (detail: Object) | 键盘高度信息 |
| clicksuffixicon | 点击后置图标时触发 | - | - |
| clickprefixicon | 点击前置图标时触发 | - | - |
| click | 点击输入框时触发 | (event: MouseEvent) | 原生点击事件 |

### Slots

| 插槽名称 | 作用域参数 | 使用场景 |
|---------|-----------|---------|
| default | - | 输入框下方自定义内容 |
| prefix | - | 前置内容，优先于 prefixIcon |
| suffix | - | 后置内容，优先于 suffixIcon |
| label | - | 自定义标签内容，优先于 label 属性 |

## 使用示例

### 示例1：基础用法

通过 `v-model` 双向绑定输入值，通过 `label` 设置标题。

```vue
<template>
  <wd-input v-model="value" label="用户名" placeholder="请输入用户名" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')
</script>
```

### 示例2：密码输入与清除

通过 `showPassword` 显示密码切换按钮，通过 `clearable` 显示清除按钮。

```vue
<template>
  <wd-input
    v-model="password"
    label="密码"
    show-password
    clearable
    placeholder="请输入密码"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const password = ref('')
</script>
```

### 示例3：字数统计与图标

通过 `showWordLimit` 和 `maxlength` 显示字数统计，通过 `prefixIcon` 和 `suffixIcon` 设置图标。

```vue
<template>
  <wd-input
    v-model="value"
    label="备注"
    maxlength="50"
    show-word-limit
    placeholder="请输入备注"
  />

  <wd-input
    v-model="search"
    prefix-icon="search"
    suffix-icon="setting"
    placeholder="搜索"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')
const search = ref('')
</script>
```

### 示例4：表单校验

配合 `wd-form` 实现输入校验，通过 `prop` 和 `rules` 设置校验规则。

```vue
<template>
  <wd-form ref="form" :model="model">
    <wd-cell-group border>
      <wd-input
        label="姓名"
        label-width="100px"
        prop="name"
        clearable
        v-model="model.name"
        placeholder="请输入姓名"
        :rules="[{ required: true, message: '请输入姓名' }]"
      />
      <wd-input
        label="手机号"
        label-width="100px"
        prop="phone"
        clearable
        v-model="model.phone"
        placeholder="请输入手机号"
        :rules="[{ required: true, pattern: /1\d{10}/, message: '请输入正确的手机号' }]"
      />
    </wd-cell-group>
    <view class="footer">
      <wd-button type="primary" size="large" @click="handleSubmit" block>提交</wd-button>
    </view>
  </wd-form>
</template>

<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-ui-plus'
import type { FormInstance } from '@/uni_modules/wot-ui-plus/components/wd-form/types'
import { reactive, ref } from 'vue'

const { success } = useToast()
const form = ref<FormInstance>()

const model = reactive({
  name: '',
  phone: ''
})

function handleSubmit() {
  form.value!.validate().then(({ valid }) => {
    if (valid) {
      success({ msg: '提交成功' })
    }
  })
}
</script>
```

## 注意事项

- 当设置 `label` 属性时，输入框自动变为单元格样式（带标题和边框）
- 不设置 `label` 时为纯输入框模式，可通过 `inputBorder` 控制边框样式
- `clearTrigger` 为 `focus` 时，仅在输入框聚焦且不为空时显示清除按钮
- `focusWhenClear` 默认为 true，点击清除按钮后会自动聚焦输入框
- `maxlength` 在支付宝小程序中默认值可能不同，建议显式设置
- 只读模式下会覆盖一层遮罩防止键盘弹出
- `inputmode` 属性仅在符合条件的高版本 webview 中有效
