# ActionSheet 动作面板

## 组件概述

ActionSheet 动作面板组件从底部弹出，提供一组操作选项供用户选择。支持描述信息、取消按钮、自定义面板内容等功能。适用于分享、操作选择等场景。

## 核心功能描述

- **选项列表**：通过 `actions` 属性设置选项列表
- **描述信息**：通过 `description` 设置面板描述
- **取消按钮**：通过 `cancelText` 设置取消按钮文案
- **自定义内容**：通过插槽自定义面板内容
- **选项状态**：支持禁用、加载、颜色等选项状态
- **安全区域**：支持底部安全距离适配

## 适用业务场景

- **分享操作**：选择分享到微信、朋友圈等
- **图片操作**：选择拍照或从相册选取
- **更多操作**：列表项的更多操作选项

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | Boolean | false | 否 | 是否显示，支持 v-model 双向绑定 |
| actions | Action[] | [] | 否 | 选项列表 |
| title | String | - | 否 | 面板标题 |
| description | String | - | 否 | 面板描述信息 |
| cancelText | String | - | 否 | 取消按钮文案 |
| closeOnClickAction | Boolean | true | 否 | 点击选项后是否关闭 |
| closeOnClickModal | Boolean | true | 否 | 点击蒙层是否关闭 |
| zIndex | Number | 15 | 否 | 层级 |
| safeAreaInsetBottom | Boolean | true | 否 | 底部安全距离 |
| duration | Number / Boolean | 300 | 否 | 动画时长 |
| lockScroll | Boolean | true | 否 | 是否锁定滚动 |
| rootPortal | Boolean | false | 否 | 是否从页面中脱离 |

### Action 类型定义

| 属性名称 | 类型 | 是否必填 | 说明 |
|---------|------|---------|------|
| name | String | 否 | 选项名称 |
| color | String | 否 | 选项颜色 |
| disabled | Boolean | 否 | 是否禁用 |
| loading | Boolean | 否 | 是否加载中 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| select | 点击选项时触发 | ({ index, action }) | index 为选项索引，action 为选项对象 |
| close | 面板关闭时触发 | - | - |
| cancel | 点击取消按钮时触发 | - | - |
| clickModal | 点击蒙层时触发 | - | - |

### Slots

| 插槽名称 | 作用域参数 | 使用场景 |
|---------|-----------|---------|
| default | - | 自定义面板内容 |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-button @click="show = true">显示动作面板</wd-button>
  <wd-action-sheet v-model="show" :actions="actions" @select="onSelect" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(false)
const actions = [
  { name: '选项一' },
  { name: '选项二' },
  { name: '选项三' }
]

function onSelect({ index, action }) {
  console.log('选择了:', action.name)
}
</script>
```

### 示例2：带描述与取消

```vue
<template>
  <wd-action-sheet
    v-model="show"
    title="选择操作"
    description="请选择以下操作"
    cancel-text="取消"
    :actions="actions"
    @select="onSelect"
    @cancel="onCancel"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(false)
const actions = [
  { name: '选项一' },
  { name: '选项二' },
  { name: '选项三' }
]

function onSelect({ action }: any) {
  console.log('选择了:', action.name)
}

function onCancel() {
  console.log('取消')
}
</script>
```

### 示例3：选项状态

```vue
<template>
  <wd-action-sheet v-model="show" :actions="actions" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(false)
const actions = [
  { name: '着色选项', color: '#ee0a24' },
  { name: '禁用选项', disabled: true },
  { name: '加载选项', loading: true }
]
</script>
```

### 示例4：自定义内容

```vue
<template>
  <wd-action-sheet v-model="show" title="自定义内容">
    <view class="custom-content">
      <wd-button block>按钮一</wd-button>
      <wd-button block type="error">按钮二</wd-button>
    </view>
  </wd-action-sheet>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(false)
</script>
```

## 注意事项

- `actions` 为空且未使用默认插槽时，面板内容为空
- `closeOnClickAction` 为 true 时，点击选项后自动关闭面板
- 禁用和加载状态的选项不可点击
