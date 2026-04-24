# Collapse 折叠面板

## 组件概况

Collapse 折叠面板组件用于内容折叠展开，由 `wd-collapse` 和 `wd-collapse-item` 两个组件配合使用。支持手风琴模式、多选模式、查看更多模式、展开前钩子等功能。常用于 FAQ 列表、商品参数展示、长文本收起等场景。

## 核心功能描述

- **多选模式**：默认模式，`modelValue` 为数组，可同时展开多个面板
- **手风琴模式**：`accordion` 开启后只能展开一个面板，`modelValue` 为字符串
- **查看更多模式**：`viewmore` 开启后切换为"查看更多/收起"模式，`lineNum` 控制收起时显示行数
- **展开前钩子**：`beforeExpend` 可在展开前执行异步校验，返回 false 阻止展开
- **全部切换**：`toggleAll` 方法可批量切换所有面板状态，支持跳过禁用项
- **自定义标题**：通过 `title` 插槽自定义面板标题，作用域参数含 `expanded`、`disabled`、`isFirst`
- **禁用状态**：`disabled` 禁用后面板不可点击展开
- **动画效果**：展开收起带有 0.3s 的 height 过渡动画

## 适用业务场景

- **FAQ 列表**：常见问题以折叠面板形式展示，点击展开查看答案
- **商品参数与详情**：商品详情页中折叠展示规格参数、售后说明等信息
- **长文本查看更多**：超过指定行数的文本默认收起，点击"查看更多"展开全部

## API

### Collapse Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | String / Array / Boolean | - | 否 | 展开项的 name，手风琴模式为字符串，多选模式为数组，查看更多模式为布尔值 |
| accordion | Boolean | false | 否 | 是否手风琴模式 |
| viewmore | Boolean | false | 否 | 是否查看更多模式 |
| useMoreSlot | Boolean | false | 否 | 是否使用查看更多自定义插槽 |
| customMoreSlotClass | String | '' | 否 | 查看更多插槽外部自定义样式类名 |
| lineNum | Number | 2 | 否 | 查看更多模式收起时的显示行数 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### CollapseItem Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| name | String | - | 是 | 唯一标识符 |
| title | String | '' | 否 | 标题 |
| disabled | Boolean | false | 否 | 是否禁用 |
| customBodyClass | String | '' | 否 | 自定义折叠栏内容容器样式类名 |
| customBodyStyle | String | '' | 否 | 自定义折叠栏内容容器样式 |
| beforeExpend | Function | - | 否 | 展开前回调函数，返回 false 阻止展开，支持 Promise |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Collapse Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| change | 展开项变化时触发 | ({ value }) | 当前展开项 |
| update:modelValue | 展开项变化时触发 | `(value)` | 用于 v-model 双向绑定 |

### Collapse Methods

| 方法名称 | 参数 | 返回值 | 说明 |
|---------|------|--------|------|
| toggleAll | (options?: boolean \| { expanded?: boolean, skipDisabled?: boolean }) | void | 切换所有面板，手风琴模式下无效 |

### CollapseItem Methods

| 方法名称 | 参数 | 返回值 | 说明 |
|---------|------|--------|------|
| getExpanded | - | boolean | 获取当前面板展开状态 |
| updateExpand | - | Promise<void> | 更新展开状态 |

### CollapseItem Slots

| 插槽名称 | 作用域参数 | 使用场景 |
|---------|-----------|---------|
| default | - | 面板内容 |
| title | { expanded, disabled, isFirst } | 自定义标题 |

### Collapse Slots（查看更多模式）

| 插槽名称 | 作用域参数 | 使用场景 |
|---------|-----------|---------|
| default | - | 查看更多的内容区域 |
| more | - | 自定义查看更多/收起按钮 |

## 使用示例

### 示例1：基础用法与手风琴模式

```vue
<template>
  <wd-collapse v-model="active">
    <wd-collapse-item title="标题一" name="1">内容一</wd-collapse-item>
    <wd-collapse-item title="标题二" name="2">内容二</wd-collapse-item>
    <wd-collapse-item title="标题三" name="3">内容三</wd-collapse-item>
  </wd-collapse>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(['1'])
</script>
```

默认多选模式，`modelValue` 为数组，可同时展开多个面板。

### 示例2：自定义标题与禁用

```vue
<template>
  <wd-collapse v-model="active" accordion>
    <wd-collapse-item name="1">
      <template #title="{ expanded }">
        <view class="custom-title">
          <text>自定义标题</text>
          <text>{{ expanded ? '已展开' : '已收起' }}</text>
        </view>
      </template>
      内容一
    </wd-collapse-item>
    <wd-collapse-item title="禁用面板" name="2" disabled>内容二</wd-collapse-item>
  </wd-collapse>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref('1')
</script>
```

手风琴模式下 `modelValue` 为字符串，通过 `title` 插槽自定义标题内容，`disabled` 禁用面板。

### 示例3：查看更多与全部切换

```vue
<template>
  <wd-collapse v-model="expanded" viewmore :line-num="3">
    这是一段很长的文本内容，超过3行时会自动收起，点击查看更多可以展开全部内容。支持自定义行数、自定义查看更多按钮等功能。
  </wd-collapse>

  <wd-collapse v-model="active">
    <wd-collapse-item title="面板一" name="1">内容一</wd-collapse-item>
    <wd-collapse-item title="面板二" name="2">内容二</wd-collapse-item>
    <wd-collapse-item title="面板三" name="3">内容三</wd-collapse-item>
  </wd-collapse>
  <wd-button size="small" @click="toggleAll">全部切换</wd-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const expanded = ref(false)
const active = ref([])

function toggleAll() {
  const collapse = getCurrentInstance()?.proxy?.$refs?.collapse
  collapse?.toggleAll()
}
</script>
```

`viewmore` 模式下 `modelValue` 为布尔值，控制展开/收起；`toggleAll` 方法可批量操作所有面板。

## 注意事项

- 手风琴模式下 `modelValue` 必须为字符串，多选模式必须为数组，否则控制台报错
- `name` 属性为必填项，用于标识面板
- `toggleAll` 方法在手风琴模式下无效
- `beforeExpend` 钩子仅在展开时触发，收起时不触发
- `lineNum` 必须大于 0，否则控制台报错
- 查看更多模式与普通折叠面板模式互斥，不可混用
- 不建议嵌套使用折叠面板，可能导致动画异常
