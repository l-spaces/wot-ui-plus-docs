# Toast 消息提示

## 组件概况

Toast 消息提示组件用于展示短时、轻量的反馈信息，既支持直接渲染 `wd-toast` 组件，也支持通过 `useToast()` 在业务逻辑中进行函数式调用。它适合提示成功、失败、警告、加载中等状态，强调短停留、低打扰和快速反馈。

## 核心功能描述

- **函数式调用**：通过 `useToast()` 获取实例方法，在任意业务逻辑中触发提示
- **预设状态方法**：内置 `success`、`error`、`warning`、`info`、`loading` 快捷方法
- **布局与位置可控**：支持横向、纵向布局以及四种展示位置
- **图标能力丰富**：支持状态图标、自定义图标类和类名前缀
- **自动关闭与手动关闭**：支持持续时间控制，也可显式调用关闭
- **遮罩控制**：可通过 `cover` 阻止点击穿透，适合加载等待场景

## 适用业务场景

- **操作结果提示**：表单提交、保存、删除后快速反馈执行结果
- **异步加载反馈**：接口请求、文件上传、支付校验等过程中的等待提示
- **低干扰状态提醒**：不需要弹窗确认但需要告知用户的短消息反馈

## API

### useToast 返回方法

| 方法名称 | 参数 | 返回值 | 说明 |
|---------|------|--------|------|
| show | (options: string \| ToastOptions) | void | 显示普通 Toast，可直接传字符串 |
| success | (options: string \| ToastOptions) | void | 显示成功提示 |
| error | (options: string \| ToastOptions) | void | 显示失败提示 |
| warning | (options: string \| ToastOptions) | void | 显示警告提示 |
| info | (options: string \| ToastOptions) | void | 显示普通信息提示 |
| loading | (options: string \| ToastOptions) | void | 显示加载提示 |
| close | - | void | 关闭当前 Toast |

### ToastOptions

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| msg | String | - | 否 | 提示内容 |
| duration | Number | 2000 | 否 | 展示时长，单位 ms，0 表示不自动关闭 |
| direction | String | 'horizontal' | 否 | 内容排列方向，可选值：horizontal / vertical |
| iconName | String | - | 否 | 图标类型，可选值：success / error / warning / loading / info |
| iconSize | Number | - | 否 | 图标大小 |
| loadingType | String | 'outline' | 否 | 加载图标类型 |
| loadingColor | String | '#4D80F0' | 否 | 加载图标颜色 |
| loadingSize | Number | - | 否 | 加载图标大小 |
| iconColor | String | - | 否 | 图标颜色 |
| position | String | 'middle-top' | 否 | 展示位置，可选值：top / middle-top / middle / bottom |
| show | Boolean | false | 否 | 组件内部展示状态，通常由 `useToast()` 接管 |
| zIndex | Number | 100 | 否 | 层级 |
| cover | Boolean | false | 否 | 是否显示遮罩层 |
| iconClass | String | - | 否 | 自定义图标样式类 |
| classPrefix | String | 'wd-icon' | 否 | 自定义图标类名前缀 |
| opened | Function | - | 否 | 完全展示后的回调 |
| closed | Function | - | 否 | 完全关闭后的回调 |

### wd-toast Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| selector | String | '' | 否 | 多实例场景下的唯一标识，需与 `useToast(selector)` 对应 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-button @click="showToast">显示提示</wd-button>
</template>

<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-ui-plus'

const { show } = useToast()

function showToast() {
  show({ msg: '提示信息' })
}
</script>
```

### 示例2：不同状态

```vue
<template>
  <wd-button @click="showSuccess">成功提示</wd-button>
  <wd-button @click="showError">失败提示</wd-button>
  <wd-button @click="showWarning">警告提示</wd-button>
</template>

<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-ui-plus'

const { success, error, warning } = useToast()

function showSuccess() {
  success({ msg: '操作成功' })
}
function showError() {
  error({ msg: '操作失败' })
}
function showWarning() {
  warning({ msg: '请先完善必填项' })
}
</script>
```

### 示例3：加载提示

加载提示默认不会自动关闭，适合在异步请求结束后主动收口。

```vue
<template>
  <wd-button @click="showLoading">加载提示</wd-button>
</template>

<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-ui-plus'

const { loading, close } = useToast()

function showLoading() {
  loading({ msg: '加载中...' })
  setTimeout(() => close(), 1500)
}
</script>
```

## 注意事项

- `loading()` 默认会设置 `duration: 0` 且开启 `cover`，通常需要业务代码手动调用 `close()`
- 同一 `selector` 重复调用时会清除前一次定时器并重新计时
- 若需要多实例并存，组件侧和 `useToast(selector)` 侧必须使用相同的 `selector`
