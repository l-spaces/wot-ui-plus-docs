# noticeBar 通知栏组件

<demo-model url="/subPages/noticeBar/Index"></demo-model>

## 组件概况

### 组件概述
通知栏组件是一个用于展示重要通知信息的组件，支持横向滚动和纵向滚动两种模式，提供了多种预设类型样式，可自定义图标、颜色、背景色等。组件支持点击关闭、自动滚动和手动控制，适用于各种需要展示通知信息的场景。

### 详细功能描述
- 支持横向滚动和纵向滚动两种滚动方向
- 支持多种类型样式：warning（警告）、info（信息）、danger（危险）
- 可自定义通知文本，支持字符串和字符串数组
- 支持设置滚动延迟和滚动速度
- 支持点击关闭通知
- 支持自定义左侧图标和右侧内容
- 支持自动换行显示
- 支持自定义颜色和背景色
- 提供重置动画方法
- 支持点击事件
- 跨平台兼容

### 适用业务场景
- 系统通知展示
- 活动公告展示
- 重要信息提示
- 状态变更通知
- 促销信息展示
- 任何需要展示通知信息的场景

## 完整API参考

### Props

| 名称 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| text | string \| string[] | '' | 否 | 设置通知栏文案，支持字符串或字符串数组 |
| type | 'warning' \| 'info' \| 'danger' \| '' | 'warning' | 否 | 设置通知栏类型 |
| scrollable | boolean | true | 否 | 是否可滚动 |
| delay | number | 1 | 否 | 滚动延迟时间（秒） |
| speed | number | 50 | 否 | 滚动速度（px/s） |
| closable | boolean | false | 否 | 是否可关闭 |
| wrapable | boolean | false | 否 | 是否换行显示 |
| prefix | string | - | 否 | 设置左侧图标，使用 icon 章节中的图标名 |
| color | string | - | 否 | 文字、图标颜色 |
| backgroundColor | string | - | 否 | 背景颜色 |
| direction | 'horizontal' \| 'vertical' | 'horizontal' | 否 | 滚动方向 |
| customStyle | string | - | 否 | 自定义样式 |
| customClass | string | - | 否 | 自定义类名 |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| close | 点击关闭按钮时 | - |
| next | 纵向滚动切换到下一条时 | 当前索引值 |
| click | 点击通知栏内容时 | 点击的文本内容和索引值 |

### Methods

| 方法名 | 参数 | 返回值 | 功能说明 |
| --- | --- | --- | --- |
| reset | - | void | 重置通知栏动画，重新开始滚动 |

### Slots

| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| prefix | - | 自定义左侧图标，优先级高于prefix属性 |
| suffix | - | 自定义右侧内容，优先级高于closable属性 |
| default | - | 自定义通知内容，优先级高于text属性 |

## 多场景使用示例

### 基础用法

```vue
<template>
  <view>
    <wd-notice-bar text="这是一条通知信息" />
  </view>
</template>
```

### 不同类型的通知栏

```vue
<template>
  <view>
    <wd-notice-bar text="这是一条警告通知" type="warning" />
    <wd-notice-bar text="这是一条信息通知" type="info" />
    <wd-notice-bar text="这是一条危险通知" type="danger" />
  </view>
</template>
```

### 带关闭按钮的通知栏

```vue
<template>
  <view>
    <wd-notice-bar 
      text="这是一条可关闭的通知" 
      closable 
      @close="onClose"
    />
  </view>
</template>

<script lang="ts" setup>
const onClose = () => {
  console.log('通知栏已关闭')
}
</script>
```

### 纵向滚动的通知栏

```vue
<template>
  <view>
    <wd-notice-bar 
      :text="noticeList" 
      direction="vertical"
      scrollable
      delay="2"
      @next="onNext"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const noticeList = ref([
  '第一条通知信息',
  '第二条通知信息',
  '第三条通知信息'
])

const onNext = (index: number) => {
  console.log('当前显示的通知索引：', index)
}
</script>
```

### 自定义样式的通知栏

```vue
<template>
  <view>
    <wd-notice-bar 
      text="这是一条自定义样式的通知" 
      prefix="notice"
      color="#1890FF"
      background-color="#E6F7FF"
      :custom-style="{ padding: '10rpx 20rpx' }"
      @click="onClick"
    />
  </view>
</template>

<script lang="ts" setup>
const onClick = (data: { index: number; text: string }) => {
  console.log('点击了通知栏：', data)
}
</script>
```

### 使用插槽自定义内容

```vue
<template>
  <view>
    <wd-notice-bar>
      <template #prefix>
        <wd-icon name="warning" color="#FAAD14" />
      </template>
      <template #default>
        <text>这是一条使用插槽自定义内容的通知</text>
      </template>
      <template #suffix>
        <wd-button type="text" size="small" @click="onClickButton">查看详情</wd-button>
      </template>
    </wd-notice-bar>
  </view>
</template>

<script lang="ts" setup>
const onClickButton = () => {
  console.log('点击了查看详情按钮')
}
</script>
```

### 不换行的通知栏

```vue
<template>
  <view>
    <wd-notice-bar 
      text="这是一条不换行的通知信息，当内容过长时会自动滚动显示" 
      :scrollable="true" 
      :wrapable="false"
    />
  </view>
</template>
```

### 使用ref控制通知栏

```vue
<template>
  <view>
    <wd-notice-bar 
      ref="noticeBarRef" 
      text="这是一条可重置的通知" 
      direction="vertical"
      :text="noticeList"
    />
    <wd-button @click="resetNoticeBar">重置通知栏</wd-button>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { NoticeBarInstance } from '@/uni_modules/wot-ui-plus/components/wd-notice-bar/types'

const noticeBarRef = ref<NoticeBarInstance | null>(null)
const noticeList = ref([
  '第一条通知信息',
  '第二条通知信息',
  '第三条通知信息'
])

const resetNoticeBar = () => {
  noticeBarRef.value?.reset()
}
</script>
```

## 样式定制指南

### 自定义样式

通过 `customStyle` 属性可以自定义通知栏的样式：

```vue
<wd-notice-bar 
  text="自定义样式的通知栏" 
  :custom-style="{
    padding: '10rpx 20rpx',
    borderRadius: '4rpx',
    fontSize: '26rpx'
  }"
/>
```

### 自定义类名

通过 `customClass` 属性可以添加自定义类名，然后在样式文件中定义样式：

```vue
<wd-notice-bar 
  text="自定义类名的通知栏" 
  custom-class="my-notice-bar"
/>
```

```scss
.my-notice-bar {
  /* 自定义通知栏容器样式 */
  padding: 10rpx 20rpx;
  border-radius: 4rpx;
  font-size: 26rpx;
  
  .wd-notice-bar__content {
    /* 自定义内容样式 */
    line-height: 40rpx;
  }
  
  .wd-notice-bar__prefix {
    /* 自定义前缀图标样式 */
    margin-right: 10rpx;
  }
  
  .wd-notice-bar__suffix {
    /* 自定义后缀样式 */
    margin-left: 10rpx;
  }
}
```

## 注意事项

1. 滚动方向选择：
   - `horizontal`：横向滚动，适用于单行文本内容较长的场景
   - `vertical`：纵向滚动，适用于多条通知信息轮流展示的场景
   - 当 `direction` 为 `vertical` 时，`text` 属性支持传入字符串数组

2. 滚动控制：
   - `scrollable`：控制是否滚动，默认为 `true`
   - `delay`：滚动延迟时间，单位为秒，默认为 1 秒
   - `speed`：滚动速度，单位为 px/s，默认为 50 px/s
   - 当 `wrapable` 为 `true` 时，`scrollable` 会被忽略，文本会自动换行显示

3. 内容显示：
   - 当 `text` 为字符串且内容过长时，可通过 `scrollable` 控制是否滚动
   - 当 `wrapable` 为 `true` 时，文本会自动换行显示，不支持滚动
   - 当 `direction` 为 `vertical` 且 `text` 为数组时，会轮流展示每条文本

4. 事件处理：
   - `close` 事件在点击关闭按钮时触发
   - `next` 事件在纵向滚动切换到下一条时触发，返回当前索引值
   - `click` 事件在点击通知内容时触发，返回当前索引和文本内容

5. 样式定制：
   - 可通过 `type` 属性快速设置预设样式
   - 可通过 `color` 和 `backgroundColor` 属性自定义颜色和背景色
   - 可通过 `prefix` 属性设置左侧图标，或通过 `prefix` 插槽自定义左侧内容
   - 可通过 `suffix` 插槽自定义右侧内容

6. 性能优化：
   - 对于多条通知信息，建议使用纵向滚动模式，减少DOM节点数量
   - 当通知内容较多时，可考虑使用分页或滚动加载
   - 避免在通知栏中放置过于复杂的内容，影响滚动性能

7. 最佳实践：
   - 根据通知的重要程度选择合适的 `type` 属性
   - 通知文本应简洁明了，避免过长
   - 对于重要通知，可添加关闭按钮，允许用户关闭
   - 结合实际场景选择合适的滚动方向和滚动速度