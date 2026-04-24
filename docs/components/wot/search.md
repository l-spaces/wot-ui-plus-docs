# Search 搜索框

## 组件概况

Search 搜索框组件用于搜索场景输入，支持清空、取消、自动聚焦、亮色模式和前后插槽。组件内部维护输入聚焦与占位层展示逻辑，对外通过 `change / search / clear / focus / blur / cancel` 等事件暴露搜索行为。

## 核心功能描述

- **搜索触发**：键盘确认时触发 `search`
- **清空与取消**：支持清空按钮和取消区文案
- **占位层交互**：支持居中占位和左对齐占位
- **聚焦控制**：支持 `focus` 与 `focusWhenClear`
- **插槽扩展**：支持 `prefix` 与 `suffix`

## 适用业务场景

- **商品搜索**：首页或列表页顶部搜索框
- **联系人搜索**：通讯录、地址本、城市选择
- **内容筛选**：带自定义右侧操作区的轻量搜索场景

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | String | `''` | 否 | 输入框内容，支持 `v-model` |
| clearabled | Boolean | true | 否 | 是否显示清除按钮 |
| placeholder | String | - | 否 | 占位文本 |
| cancelTxt | String | - | 否 | 右侧取消区文案 |
| light | Boolean | false | 否 | 是否使用亮色模式 |
| hideCancel | Boolean | false | 否 | 是否隐藏右侧取消区 |
| disabled | Boolean | false | 否 | 是否禁用 |
| maxlength | Number | -1 | 否 | 最大长度，`-1` 表示不限制 |
| placeholderLeft | Boolean | false | 否 | 占位文本是否居左 |
| focus | Boolean | false | 否 | 是否自动聚焦 |
| focusWhenClear | Boolean | false | 否 | 点击清空后是否重新聚焦 |
| placeholderStyle | String | - | 否 | 自定义 placeholder 样式 |
| placeholderClass | String | `''` | 否 | 自定义 placeholder 样式类 |
| customInputClass | String | `''` | 否 | 自定义输入框样式类 |
| customStyle | String | `''` | 否 | 自定义根节点样式 |
| customClass | String | `''` | 否 | 自定义根节点样式类 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| update:modelValue | 输入值变化时触发 | `(value: string)` | 当前输入值 |
| change | 输入值变化或清空时触发 | `({ value })` | 返回当前输入值 |
| search | 键盘确认搜索时触发 | `({ value })` | 返回当前搜索值 |
| clear | 点击清空按钮时触发 | - | - |
| focus | 聚焦时触发 | `({ value })` | 返回当前输入值 |
| blur | 失焦时触发 | `({ value })` | 返回当前输入值 |
| cancel | 点击取消区时触发 | `({ value })` | 返回当前输入值 |
| click | 组件禁用且被点击时触发 | - | - |

### Slots

| 插槽名称 | 作用域参数 | 使用场景 |
|---------|-----------|---------|
| prefix | - | 搜索框左侧内容 |
| suffix | - | 右侧取消区内容；未设置时使用默认取消区 |

## 使用示例

### 示例 1：基础用法

```vue
<template>
  <wd-search
    v-model="value"
    placeholder="请输入搜索内容"
    @search="handleSearch"
    @change="handleChange"
    @cancel="handleCancel"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')

function handleSearch({ value }: { value: string }) {
  console.log(value)
}

function handleChange({ value }: { value: string }) {
  console.log(value)
}

function handleCancel({ value }: { value: string }) {
  console.log(value)
}
</script>
```

### 示例 2：自定义右侧区域

```vue
<template>
  <wd-search v-model="value">
    <template #suffix>
      <wd-button size="small">筛选</wd-button>
    </template>
  </wd-search>
</template>
```

### 示例 3：清空后聚焦

```vue
<template>
  <wd-search v-model="value" focus-when-clear />
</template>
```

## 注意事项

- 组件当前没有 `input` 事件，对外同步输入变化请使用 `change`。
- `search`、`focus`、`blur`、`cancel` 返回的都是对象结构 `{ value }`，不是裸字符串。
- `click` 只会在 `disabled` 状态下点击组件时触发。
- `modal`、`readonly` 等并不是当前组件的 props，若旧文档中出现，应以源码实现为准。
