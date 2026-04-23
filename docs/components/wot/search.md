# Search 搜索框

## 组件概述

Search 搜索框组件用于搜索场景的输入，支持清除按钮、取消按钮、亮色模式、自动聚焦等功能。提供搜索、取消、清除、聚焦、失焦等完整的事件回调。

## 核心功能描述

- **清除按钮**：默认显示清除按钮，输入内容后可一键清空
- **取消按钮**：右侧显示取消文本，点击触发取消事件
- **亮色模式**：通过 `light` 切换为白色背景的亮色搜索框
- **自动聚焦**：通过 `focus` 自动获取焦点
- **占位文本**：支持自定义占位文本和样式
- **隐藏取消**：通过 `hideCancel` 隐藏右侧取消文本

## 适用业务场景

- **商品搜索**：在商城首页搜索商品
- **内容搜索**：在列表页搜索筛选内容
- **通讯录搜索**：在通讯录页面搜索联系人

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | String | '' | 否 | 输入框内容，支持 v-model 双向绑定 |
| clearabled | Boolean | true | 否 | 是否显示清除按钮 |
| placeholder | String | - | 否 | 搜索框占位文本 |
| cancelTxt | String | - | 否 | 搜索框右侧文本 |
| light | Boolean | false | 否 | 是否使用亮色（白色）模式 |
| hideCancel | Boolean | false | 否 | 是否隐藏右侧文本 |
| disabled | Boolean | false | 否 | 是否禁用搜索框 |
| maxlength | Number | -1 | 否 | 最大输入长度，-1 表示不限制 |
| placeholderLeft | Boolean | false | 否 | placeholder 是否居左 |
| focus | Boolean | false | 否 | 是否自动聚焦 |
| focusWhenClear | Boolean | false | 否 | 点击清除按钮时是否聚焦输入框 |
| placeholderStyle | String | - | 否 | 指定 placeholder 的样式 |
| placeholderClass | String | '' | 否 | 指定 placeholder 的样式类 |
| customInputClass | String | '' | 否 | 自定义输入框样式类 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| update:modelValue | 值变化时触发 | (value: string) | 当前输入值 |
| search | 点击搜索按钮或回车时触发 | (value: string) | 当前搜索值 |
| cancel | 点击取消按钮时触发 | - | - |
| clear | 点击清除按钮时触发 | - | - |
| focus | 聚焦时触发 | (event: Event) | 原生事件 |
| blur | 失焦时触发 | (event: Event) | 原生事件 |
| input | 输入时触发 | (value: string) | 当前输入值 |

### Slots

| 插槽名称 | 作用域参数 | 使用场景 |
|---------|-----------|---------|
| suffix | - | 输入框右侧自定义内容 |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-search v-model="value" placeholder="请输入搜索内容" @search="onSearch" @cancel="onCancel" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')

function onSearch(value: string) {
  console.log('搜索:', value)
}
function onCancel() {
  console.log('取消')
}
</script>
```

### 示例2：亮色模式

```vue
<template>
  <wd-search v-model="value" light placeholder="搜索" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')
</script>
```

### 示例3：自定义取消文本

```vue
<template>
  <wd-search v-model="value" cancel-txt="搜索" placeholder="请输入关键词" @cancel="onSearch" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')

function onSearch() {
  console.log('搜索:', value.value)
}
</script>
```

## 注意事项

- `clearabled` 属性名拼写为 clearabled（非 clearable），这是组件库的历史命名
- `focusWhenClear` 默认为 false，点击清除按钮后不会自动聚焦
- `light` 模式适用于浅色背景页面
- 右侧取消文本可通过 `cancelTxt` 自定义，点击时触发 `cancel` 事件
