# Tour 新手引导

## 组件概述

Tour 新手引导组件用于页面功能的新手引导，支持多步骤引导、蒙版、自定义高亮区域、自定义内容和按钮等功能。适用于首次使用引导、功能更新提示、操作教学等场景。

## 核心功能描述

- **多步骤引导**：通过 `steps` 配置多个引导步骤
- **蒙版控制**：支持蒙版显示/隐藏、自定义颜色、点击蒙版继续
- **自定义高亮**：通过 `highlight` 插槽自定义高亮区域样式
- **自定义内容**：通过 `content` 插槽自定义引导内容
- **自定义按钮**：通过 `prev`、`next`、`skip`、`finish` 插槽自定义按钮
- **缺失元素处理**：通过 `missingStrategy` 处理目标元素不存在的情况

## 适用业务场景

- **首次使用引导**：新用户首次使用时的功能引导
- **功能更新提示**：版本更新后新功能提示
- **操作教学**：复杂操作的步骤引导

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | Boolean | false | 否 | 是否显示，支持 v-model 双向绑定 |
| steps | TourStep[] | [] | 否 | 引导步骤列表 |
| current | Number | 0 | 否 | 当前步骤索引，支持 v-model:current |
| mask | Boolean | true | 否 | 蒙版是否显示 |
| maskColor | String | - | 否 | 蒙版颜色（支持 rgba 格式） |
| offset | Number | 20 | 否 | 引导框与高亮元素之间的间距（px） |
| duration | Number | 300 | 否 | 动画持续时间（毫秒） |
| borderRadius | Number | 8 | 否 | 高亮区域的圆角大小 |
| padding | Number | 8 | 否 | 高亮区域的内边距 |
| prevText | String | - | 否 | 上一步按钮文字 |
| nextText | String | - | 否 | 下一步按钮文字 |
| skipText | String | - | 否 | 跳过按钮文字 |
| finishText | String | - | 否 | 完成按钮文字 |
| clickMaskNext | Boolean | false | 否 | 点击蒙版是否可以下一步 |
| customNav | Boolean | false | 否 | 是否自定义顶部导航栏 |
| showTourButtons | Boolean | true | 否 | 是否显示引导按钮 |
| missingStrategy | String | 'stop' | 否 | 缺失元素处理策略，可选值：skip / stop / hide |
| highlightStyle | Object | {} | 否 | 高亮区域样式 |
| zIndex | Number | - | 否 | 引导框的层级 |
| scope | any | - | 否 | 查询作用域，限定选择器范围 |
| bottomSafetyOffset | Number | 100 | 否 | 底部安全偏移量 |
| topSafetyOffset | Number | 0 | 否 | 顶部安全偏移量 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| change | 切换步骤时触发 | ({ current }) | 当前步骤索引 |
| prev | 上一步时触发 | ({ prevCurrent, current, total }) | 上一步和当前步骤信息 |
| next | 下一步时触发 | ({ prevCurrent, current, total }) | 上一步和当前步骤信息 |
| finish | 完成引导时触发 | ({ current, total }) | 完成时的步骤信息 |
| skip | 跳过引导时触发 | ({ current, total }) | 跳过时的步骤信息 |
| error | 错误时触发 | ({ message, element }) | 错误信息和目标元素 |

### Slots

| 插槽名称 | 作用域参数 | 使用场景 |
|---------|-----------|---------|
| highlight | { elementInfo } | 自定义高亮区域 |
| content | - | 自定义引导内容区域 |
| prev | - | 自定义上一步按钮 |
| next | - | 自定义下一步按钮 |
| skip | - | 自定义跳过按钮 |
| finish | - | 自定义完成按钮 |

## 使用示例

### 示例1：基础用法

通过 `steps` 配置引导步骤，`v-model` 控制显示。

```vue
<template>
  <view>
    <view id="step1">第一步内容</view>
    <view id="step2">第二步内容</view>
    <view id="step3">第三步内容</view>
  </view>
  <wd-button type="primary" @click="show = true">开始引导</wd-button>
  <wd-tour v-model="show" :steps="steps" :padding="10" @finish="onFinish" @skip="onSkip" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(false)
const steps = [
  { element: '#step1', content: '欢迎使用引导组件，这是第一步的说明' },
  { element: '#step2', content: '这是第二步，展示了另一个功能点' },
  { element: '#step3', content: '这是最后一步，完成引导流程' }
]

function onFinish() { console.log('引导完成') }
function onSkip() { console.log('引导跳过') }
</script>
```

### 示例2：点击蒙版继续与自定义蒙版

通过 `click-mask-next` 点击蒙版继续，`mask-color` 自定义蒙版颜色。

```vue
<template>
  <wd-button type="primary" @click="show1 = true">点击蒙版继续</wd-button>
  <wd-tour v-model="show1" :steps="steps" :click-mask-next="true" />

  <wd-button type="primary" @click="show2 = true">自定义蒙版</wd-button>
  <wd-tour v-model="show2" :steps="steps" mask-color="rgba(255, 0, 0, 0.6)" :offset="40" :border-radius="15" next-text="下一步" prev-text="上一步" skip-text="跳过" finish-text="完成" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const show1 = ref(false)
const show2 = ref(false)
const steps = [
  { element: '#step1', content: '第一步说明' },
  { element: '#step2', content: '第二步说明' }
]
</script>
```

### 示例3：自定义高亮区域与内容

通过 `highlight` 插槽自定义高亮区域，`content` 插槽自定义引导内容。

```vue
<template>
  <wd-button type="primary" @click="show = true">自定义高亮</wd-button>
  <wd-tour v-model="show" :steps="steps" :padding="10">
    <template #highlight="{ elementInfo }">
      <view :style="`position: fixed; border: 2px dashed #ff0000; border-radius: 8px; background: rgba(255,0,0,0.1); box-sizing: border-box; transition: all 0.3s; ${objToStyle(elementInfo)}`"></view>
    </template>
    <template #content>
      <view style="display: flex; align-items: center;">
        <wd-icon name="help-circle-filled" size="22px" />
        <text>自定义引导内容区域</text>
      </view>
    </template>
  </wd-tour>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { objToStyle } from '@/uni_modules/wot-ui-plus/components/common/util'

const show = ref(false)
const steps = [
  { element: '#step1', content: '自定义高亮区域示例' },
  { element: '#step2', content: '通过插槽实现完全自定义的高亮样式' }
]
</script>
```

## 注意事项

- `steps` 中 `element` 为 CSS 选择器，需确保目标元素存在
- `missingStrategy` 设置目标元素不存在时的处理策略：skip（跳过）、stop（停止）、hide（隐藏）
- `clickMaskNext` 为 true 时，点击蒙版会进入下一步
- `mask` 为 false 时不显示蒙版，仅高亮目标元素
- 可通过 `v-model:current` 控制当前步骤索引
