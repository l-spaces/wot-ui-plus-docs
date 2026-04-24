# MessageBox 消息框

## 组件概况

MessageBox 消息框组件用于确认类操作和输入类操作，适合删除确认、重要操作提示、原因填写等场景。组件通过函数式调用 `useMessage()` 使用，支持 `alert`、`confirm`、`prompt` 三种模式，并返回 Promise 以便业务代码统一处理结果。

## 核心功能描述

- **三种模式**：`alert`、`confirm`、`prompt` 分别覆盖提示、确认和输入场景
- **函数式调用**：通过 `useMessage()` 获取实例方法并返回 Promise
- **输入校验能力**：支持输入类型、占位文案、初始值、正则和函数校验
- **确认前拦截**：支持 `beforeConfirm` 在提交前执行额外校验或异步判断
- **按钮扩展**：支持确认按钮和取消按钮的额外 Props 配置
- **层级与渲染控制**：支持 `zIndex` 和 `lazyRender`

## 适用业务场景

- **删除确认**：删除数据前弹出确认框，避免误操作
- **重要操作提示**：发布、提交、结算等动作前二次确认
- **输入确认**：需要用户填写原因、备注或验证码后再继续执行

## API

### useMessage 返回方法

| 方法名称 | 参数 | 返回值 | 说明 |
|---------|------|--------|------|
| show | (options: string \| MessageOptions) | Promise\<MessageResult\> | 直接显示消息框 |
| alert | (options: string \| MessageOptions) | Promise\<MessageResult\> | 显示提示框 |
| confirm | (options: string \| MessageOptions) | Promise\<MessageResult\> | 显示确认框 |
| prompt | (options: string \| MessageOptions) | Promise\<MessageResult\> | 显示输入框消息框 |
| close | - | void | 关闭消息框 |

### MessageOptions

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| title | String | '' | 否 | 标题 |
| showCancelButton | Boolean | false | 否 | 是否显示取消按钮 |
| closeOnClickModal | Boolean | true | 否 | 点击遮罩层时是否关闭 |
| confirmButtonText | String | - | 否 | 确认按钮文案 |
| cancelButtonText | String | - | 否 | 取消按钮文案 |
| msg | String | '' | 否 | 消息内容 |
| type | String | 'alert' | 否 | 消息框类型，可选值：alert / confirm / prompt |
| inputType | String | 'text' | 否 | `prompt` 模式下的输入框类型 |
| inputSize | String | - | 否 | 输入框尺寸 |
| inputValue | String / Number | '' | 否 | 输入框初始值 |
| inputPlaceholder | String | - | 否 | 输入框占位文本 |
| inputPattern | RegExp | - | 否 | 输入框校验正则 |
| inputValidate | Function | - | 否 | 输入框校验函数 |
| inputError | String | '' | 否 | 输入框校验失败提示 |
| showErr | Boolean | false | 否 | 是否显示校验错误信息 |
| zIndex | Number | 99 | 否 | 弹层层级 |
| lazyRender | Boolean | true | 否 | 是否在显示时再渲染内容 |
| beforeConfirm | Function | - | 否 | 确认前拦截函数 |
| cancelButtonProps | Partial<ButtonProps> | - | 否 | 取消按钮额外配置 |
| confirmButtonProps | Partial<ButtonProps> | - | 否 | 确认按钮额外配置 |

### wd-message-box Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| selector | String | '' | 否 | 多实例场景下的唯一标识，需与 `useMessage(selector)` 配合使用 |
| rootPortal | Boolean | false | 否 | 是否脱离页面文档流渲染 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

## 使用示例

### 示例1：提示框

```vue
<template>
  <wd-button @click="showAlert">显示提示</wd-button>
</template>

<script lang="ts" setup>
import { useMessage } from '@/uni_modules/wot-ui-plus'

const { alert } = useMessage()

async function showAlert() {
  await alert({ title: '提示', msg: '操作成功' })
  console.log('已确认')
}
</script>
```

### 示例2：确认框

```vue
<template>
  <wd-button @click="showConfirm">删除确认</wd-button>
</template>

<script lang="ts" setup>
import { useMessage } from '@/uni_modules/wot-ui-plus'

const { confirm } = useMessage()

async function showConfirm() {
  try {
    await confirm({ title: '确认删除', msg: '删除后不可恢复，是否继续？' })
    console.log('确认删除')
  } catch {
    console.log('取消删除')
  }
}
</script>
```

### 示例3：输入框模式

```vue
<template>
  <wd-button @click="showInput">输入原因</wd-button>
</template>

<script lang="ts" setup>
import { useMessage } from '@/uni_modules/wot-ui-plus'

const { prompt } = useMessage()

async function showInput() {
  try {
    const result = await prompt({
      title: '拒绝原因',
      msg: '请输入拒绝原因',
      inputPlaceholder: '请输入原因',
      inputError: '请输入至少 2 个字',
      inputValidate: (value) => String(value).trim().length >= 2
    })
    console.log('输入内容:', result.value)
  } catch {
    console.log('取消')
  }
}
</script>
```

## 注意事项

- 当前对外导出的方法名为 `useMessage()`，不是 `useMessageBox()`
- `confirm` 和 `prompt` 在取消或点击蒙层关闭时会触发 Promise reject
- `prompt` 模式下，确认后可通过 `result.value` 获取输入内容
- `beforeConfirm` 适合接入异步校验、二次确认或提交前预检逻辑
