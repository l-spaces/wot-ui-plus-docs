# Input 输入框

## 组件概况

Input 输入框组件用于文本录入，支持原生 `input` 能力、清空按钮、密码可见、字数统计、图标和表单校验。组件既可作为独立输入框使用，也可通过 `label` 进入带标题的表单单元格模式。

## 核心功能描述

- **多种输入类型**：支持 `text / number / digit / idcard / safe-password / nickname / tel`
- **清空与密码切换**：支持清空按钮和密码显隐切换
- **字数统计**：支持剩余 / 已输字数展示
- **前后内容扩展**：支持图标和插槽
- **表单校验**：可与 `wd-form` 配合使用
- **边框形态**：支持 `border / underline / none`

## 适用业务场景

- **登录注册**：用户名、密码、手机号输入
- **搜索录入**：前置搜索图标、后置操作图标
- **表单填写**：与 `wd-form` 搭配的复杂信息录入

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | String / Number | `''` | 否 | 当前输入值，支持 `v-model` |
| placeholder | String | - | 否 | 占位文本 |
| placeholderStyle | String | - | 否 | 自定义 placeholder 样式 |
| placeholderClass | String | `''` | 否 | 自定义 placeholder 样式类 |
| cursorSpacing | Number | 0 | 否 | 光标与键盘距离 |
| cursor | Number | -1 | 否 | 聚焦时光标位置 |
| selectionStart | Number | -1 | 否 | 光标起始位置 |
| selectionEnd | Number | -1 | 否 | 光标结束位置 |
| adjustPosition | Boolean | true | 否 | 键盘弹起时是否自动上推页面 |
| holdKeyboard | Boolean | false | 否 | 点击页面时是否保持键盘不收起 |
| confirmType | String | `'done'` | 否 | 键盘右下角按钮类型 |
| confirmHold | Boolean | false | 否 | 点击确认键时是否保持键盘不收起 |
| focus | Boolean | false | 否 | 是否聚焦 |
| type | String | `'text'` | 否 | 输入类型 |
| maxlength | Number | -1 | 否 | 最大长度 |
| disabled | Boolean | false | 否 | 是否禁用 |
| alwaysEmbed | Boolean | false | 否 | 是否强制同层状态 |
| alignRight | Boolean | false | 否 | 输入值是否右对齐 |
| showPassword | Boolean | false | 否 | 是否显示密码切换按钮 |
| clearable | Boolean | false | 否 | 是否显示清空按钮 |
| readonly | Boolean | false | 否 | 是否只读 |
| prefixIcon | String | - | 否 | 前置图标 |
| suffixIcon | String | - | 否 | 后置图标 |
| showWordLimit | Boolean | false | 否 | 是否显示字数统计 |
| label | String | - | 否 | 左侧标题 |
| labelWidth | String | `''` | 否 | 左侧标题宽度 |
| size | String | - | 否 | 尺寸，可选值：`large` |
| error | Boolean | false | 否 | 是否为错误状态 |
| center | Boolean | false | 否 | 有标题时是否垂直居中 |
| noBorder | Boolean | false | 否 | 是否隐藏边框 |
| required | Boolean | false | 否 | 是否必填 |
| prop | String | - | 否 | 表单字段名 |
| rules | Array | `[]` | 否 | 表单校验规则 |
| clearTrigger | String | `'always'` | 否 | 清空按钮显示时机，可选值：`focus` / `always` |
| focusWhenClear | Boolean | true | 否 | 点击清空后是否重新聚焦 |
| ignoreCompositionEvent | Boolean | true | 否 | 是否忽略文本合成事件 |
| inputmode | String | `'text'` | 否 | 输入模式提示 |
| markerSide | String | `'before'` | 否 | 必填标记位置，可选值：`before` / `after` |
| inputBorder | String | `'underline'` | 否 | 边框类型，可选值：`border` / `underline` / `none` |
| customInputClass | String | `''` | 否 | 自定义输入框样式类 |
| customLabelClass | String | `''` | 否 | 自定义标题样式类 |
| customStyle | String | `''` | 否 | 自定义根节点样式 |
| customClass | String | `''` | 否 | 自定义根节点样式类 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| update:modelValue | 输入值变化或清空时触发 | `(value: string \| number)` | 当前值 |
| input | 原生输入时触发 | `(detail)` | 原生输入事件详情 |
| focus | 聚焦时触发 | `(detail)` | 原生聚焦事件详情 |
| blur | 失焦时触发 | `({ value })` | 当前输入值 |
| clear | 点击清空按钮时触发 | - | - |
| confirm | 点击键盘确认键时触发 | `(detail)` | 原生确认事件详情 |
| keyboardheightchange | 键盘高度变化时触发 | `(detail)` | 原生键盘高度事件详情 |
| clicksuffixicon | 点击后置图标时触发 | - | - |
| clickprefixicon | 点击前置图标时触发 | - | - |
| click | 点击组件根节点时触发 | `(event)` | 原生点击事件 |

### Slots

| 插槽名称 | 说明 |
|---------|------|
| default | 输入框下方附加内容 |
| prefix | 自定义前置内容 |
| suffix | 自定义后置内容 |
| label | 自定义标题内容 |

## 使用示例

### 示例 1：基础用法

```vue
<template>
  <wd-input v-model="value" label="用户名" placeholder="请输入用户名" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')
</script>
```

### 示例 2：清空与密码切换

```vue
<template>
  <wd-input
    v-model="password"
    label="密码"
    clearable
    show-password
    placeholder="请输入密码"
  />
</template>
```

### 示例 3：插槽与字数统计

```vue
<template>
  <wd-input
    v-model="value"
    label="备注"
    :maxlength="20"
    show-word-limit
    clearable
  >
    <template #suffix>
      <wd-button size="small">发送</wd-button>
    </template>
  </wd-input>
</template>
```

## 注意事项

- 组件当前没有 `change` 事件，输入变化请使用 `update:modelValue` 或 `input`。
- `blur` 返回的是对象结构 `{ value }`，其余原生事件多返回原始 `detail`。
- 设置 `label` 后会进入带标题的单元格样式，不设置时为纯输入框模式。
- `readonly` 状态下组件会覆盖只读遮罩，避免触发系统键盘。
