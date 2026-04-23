# Segmented 分段器

## 组件概述

Segmented 分段器组件用于在多个选项中进行切换，支持按钮模式和分段模式、圆角样式、自定义主题色、禁用选项、自定义标签渲染等功能。适用于页面内容切换、筛选条件选择等场景。

## 核心功能描述

- **两种模式**：button（按钮形式）和 box（分段模式）
- **圆角样式**：通过 `shape` 设置 square 和 round
- **自定义主题**：通过 `activeColor` 设置激活颜色
- **禁用选项**：选项对象中设置 `disabled: true`
- **自定义标签**：通过 `label` 插槽自定义选项渲染
- **振动反馈**：通过 `vibrateShort` 开启切换振动

## 适用业务场景

- **内容切换**：页面内容区域切换
- **筛选条件**：状态筛选、类型筛选
- **模式切换**：列表/卡片视图切换

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| options | Array | [] | 否 | 选项数组，支持字符串数组或对象数组 |
| value | String / Number | 0 | 否 | 选中项索引，支持 v-model:value |
| activeColor | String | '#3c9cff' | 否 | 激活时的颜色 |
| inactiveColor | String | '#303133' | 否 | 未激活的颜色 |
| mode | String | 'button' | 否 | 模式，可选值：button / box |
| fontSize | String / Number | 12 | 否 | 字体大小 |
| bold | Boolean | true | 否 | 激活选项的字体是否加粗 |
| bgColor | String | '#eeeeef' | 否 | 组件背景颜色（mode 为 button 时有效） |
| keyName | String | 'name' | 否 | 从选项对象中读取的键名 |
| shape | String | 'square' | 否 | 选项形状，可选值：square / round |
| height | String / Number | 35 | 否 | 选项高度 |
| barColor | String | '' | 否 | 选项边框颜色（mode 为 button 时有效） |
| disabled | Boolean | false | 否 | 是否禁用选项 |
| disabledBgColor | String | '#c0c4cc' | 否 | 禁用选项的背景颜色 |
| disabledColor | String | '#c0c4cc' | 否 | 禁用选项的字体颜色 |
| vibrateShort | Boolean | false | 否 | 切换选项时是否振动 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| change | 选项切换时触发 | (index: number, item: any) | 选中项索引和选项数据 |

### Slots

| 插槽名称 | 作用域参数 | 使用场景 |
|---------|-----------|---------|
| label | { option } | 自定义渲染分段器标签 |

## 使用示例

### 示例1：基础用法

通过 `options` 传入选项数组，`mode` 设置模式。

```vue
<template>
  <wd-segmented :options="list" mode="box" v-model="current" @change="onChange" />
  <wd-segmented :options="list" mode="button" v-model="current" @change="onChange" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const current = ref(0)
const list = ['未付款', '待评价', '已付款']

function onChange(index: number) {
  console.log('选中:', index)
}
</script>
```

### 示例2：圆角模式与主题色

通过 `shape` 设置圆角样式，`active-color` 设置主题色。

```vue
<template>
  <wd-segmented :options="list" mode="box" shape="round" v-model="current" />
  <wd-segmented :options="list" mode="button" shape="round" bar-color="#3c9cff" active-color="#fff" v-model="current" />
  <wd-segmented :options="list" mode="box" v-model="current" active-color="#f56c6c" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const current = ref(0)
const list = ['未付款', '待评价', '已付款']
</script>
```

### 示例3：禁用选项与自定义标签

选项对象中设置 `disabled: true` 禁用，`label` 插槽自定义渲染。

```vue
<template>
  <wd-segmented :options="list" mode="button" v-model="current" />

  <wd-segmented :options="customList" v-model="current2" height="80px" @change="onChange">
    <template #label="{ option }">
      <view style="padding: 4px; text-align: center;">
        <image style="border-radius: 50%; width: 32px; height: 32px;" :src="option.avatar" />
        <view>{{ option.value }}</view>
      </view>
    </template>
  </wd-segmented>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const current = ref(0)
const current2 = ref(0)
const list = [
  { name: '未付款', disabled: true },
  { name: '待评价' },
  { name: '已付款' }
]
const customList = [
  { value: '张三', avatar: '../../static/img/a1.png' },
  { value: '李四', avatar: '../../static/img/a2.png' },
  { value: '王五', disabled: true, avatar: '../../static/img/a3.png' }
]

function onChange(index: number) {
  console.log('选中:', index)
}
</script>
```

## 注意事项

- `options` 支持字符串数组和对象数组，对象数组默认读取 `name` 字段，可通过 `keyName` 修改
- `mode` 为 button 时 `bgColor` 和 `barColor` 有效
- `shape` 为 round 时选项为圆角样式
- 禁用选项需在选项对象中设置 `disabled: true`
