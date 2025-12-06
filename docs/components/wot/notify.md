# notify 通知提示组件

<demo-model url="/subPages/notify/Index"></demo-model>

## 组件概况

### 组件概述
通知提示组件是一个轻量级的通知组件，用于在页面顶部或底部显示简短的通知信息，支持多种类型和自定义样式。组件支持通过组合式API或组件方式使用，提供了灵活的配置选项，适用于各种需要显示通知的场景。

### 详细功能描述
- 支持四种通知类型：primary（主要）、success（成功）、danger（危险）、warning（警告）
- 支持两种显示位置：top（顶部）、bottom（底部）
- 可自定义通知文本、颜色、背景色等
- 支持设置显示时长，自动关闭
- 支持点击事件和关闭事件
- 支持通过组合式API或组件方式使用
- 支持设置通知层级
- 支持安全区域适配
- 支持从页面中脱离，解决fixed失效问题
- 支持全局配置默认选项

### 适用业务场景
- 操作结果提示
- 错误信息提示
- 成功信息提示
- 警告信息提示
- 系统通知
- 任何需要显示简短通知的场景

## 完整API参考

### Props

| 名称 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| visible | boolean | false | 否 | 通知是否可见 |
| type | 'primary' \| 'success' \| 'danger' \| 'warning' | 'danger' | 否 | 通知类型 |
| message | string | '' | 否 | 通知文案，支持通过\n换行 |
| position | 'top' \| 'bottom' | 'top' | 否 | 通知显示位置 |
| duration | number | 3000 | 否 | 显示时长（ms），值为 0 时，通知不会自动消失 |
| color | string | '' | 否 | 通知文本颜色 |
| background | string | '' | 否 | 通知背景颜色 |
| zIndex | number | 99 | 否 | 通知层级 |
| safeHeight | number | - | 否 | 顶部安全高度 |
| rootPortal | boolean | false | 否 | 是否从页面中脱离出来，用于解决各种 fixed 失效问题 |
| selector | string | '' | 否 | 指定唯一标识，用于多实例管理 |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| click | 点击通知时 | event: MouseEvent |
| closed | 通知关闭时 | - |
| opened | 通知打开时 | - |
| update:visible | 通知显示状态变化时 | visible: boolean |

### Methods (组合式API)

| 方法名 | 参数 | 返回值 | 功能说明 |
| --- | --- | --- | --- |
| showNotify | options: NotifyProps \| string | void | 显示通知，支持直接传入字符串作为通知文案 |
| closeNotify | - | void | 关闭通知 |
| setNotifyDefaultOptions | options: NotifyProps | void | 设置全局默认配置 |
| resetNotifyDefaultOptions | - | void | 重置全局默认配置 |

### NotifyProps 类型定义

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| type | 'primary' \| 'success' \| 'danger' \| 'warning' | 通知类型 |
| message | string | 通知文案 |
| color | string | 通知文本颜色 |
| background | string | 通知背景颜色 |
| duration | number | 显示时长（ms） |
| position | 'top' \| 'bottom' | 显示位置 |
| zIndex | number | 通知层级 |
| safeHeight | number | 顶部安全高度 |
| rootPortal | boolean | 是否从页面中脱离 |
| onClick | (event: MouseEvent) => void | 点击通知时的回调 |
| onClosed | () => void | 通知关闭时的回调 |
| onOpened | () => void | 通知打开时的回调 |

## 多场景使用示例

### 基础用法（组合式API）

```vue
<template>
  <view>
    <wd-button @click="showNotify">显示通知</wd-button>
    <wd-notify />
  </view>
</template>

<script lang="ts" setup>
import { useNotify } from '@/uni_modules/wot-ui-plus/components/wd-notify'

const { showNotify } = useNotify()

const showNotify = () => {
  showNotify('这是一条通知信息')
}
</script>
```

### 不同类型的通知

```vue
<template>
  <view>
    <wd-button @click="showPrimary">主要通知</wd-button>
    <wd-button @click="showSuccess">成功通知</wd-button>
    <wd-button @click="showDanger">危险通知</wd-button>
    <wd-button @click="showWarning">警告通知</wd-button>
    <wd-notify />
  </view>
</template>

<script lang="ts" setup>
import { useNotify } from '@/uni_modules/wot-ui-plus/components/wd-notify'

const { showNotify } = useNotify()

const showPrimary = () => {
  showNotify({ type: 'primary', message: '这是一条主要通知' })
}

const showSuccess = () => {
  showNotify({ type: 'success', message: '这是一条成功通知' })
}

const showDanger = () => {
  showNotify({ type: 'danger', message: '这是一条危险通知' })
}

const showWarning = () => {
  showNotify({ type: 'warning', message: '这是一条警告通知' })
}
</script>
```

### 自定义位置和时长

```vue
<template>
  <view>
    <wd-button @click="showTop">顶部通知</wd-button>
    <wd-button @click="showBottom">底部通知</wd-button>
    <wd-button @click="showLongTime">长时间通知</wd-button>
    <wd-notify />
  </view>
</template>

<script lang="ts" setup>
import { useNotify } from '@/uni_modules/wot-ui-plus/components/wd-notify'

const { showNotify } = useNotify()

const showTop = () => {
  showNotify({ position: 'top', message: '这是一条顶部通知' })
}

const showBottom = () => {
  showNotify({ position: 'bottom', message: '这是一条底部通知' })
}

const showLongTime = () => {
  showNotify({ duration: 5000, message: '这是一条显示5秒的通知' })
}
</script>
```

### 自定义样式

```vue
<template>
  <view>
    <wd-button @click="showCustomStyle">自定义样式通知</wd-button>
    <wd-notify />
  </view>
</template>

<script lang="ts" setup>
import { useNotify } from '@/uni_modules/wot-ui-plus/components/wd-notify'

const { showNotify } = useNotify()

const showCustomStyle = () => {
  showNotify({
    message: '这是一条自定义样式的通知',
    color: '#ffffff',
    background: '#1890FF',
    zIndex: 1000
  })
}
</script>
```

### 带事件回调的通知

```vue
<template>
  <view>
    <wd-button @click="showWithEvents">带事件回调的通知</wd-button>
    <wd-notify />
  </view>
</template>

<script lang="ts" setup>
import { useNotify } from '@/uni_modules/wot-ui-plus/components/wd-notify'

const { showNotify } = useNotify()

const showWithEvents = () => {
  showNotify({
    message: '这是一条带事件回调的通知',
    onClick: (event) => {
      console.log('点击了通知', event)
    },
    onOpened: () => {
      console.log('通知已打开')
    },
    onClosed: () => {
      console.log('通知已关闭')
    }
  })
}
</script>
```

### 全局配置默认选项

```vue
<template>
  <view>
    <wd-button @click="showWithDefault">使用默认配置的通知</wd-button>
    <wd-button @click="resetDefault">重置默认配置</wd-button>
    <wd-notify />
  </view>
</template>

<script lang="ts" setup>
import { useNotify, setNotifyDefaultOptions, resetNotifyDefaultOptions } from '@/uni_modules/wot-ui-plus/components/wd-notify'

const { showNotify } = useNotify()

// 设置全局默认配置
setNotifyDefaultOptions({
  type: 'success',
  duration: 4000,
  position: 'bottom',
  zIndex: 1000
})

const showWithDefault = () => {
  showNotify('使用默认配置的通知')
}

const resetDefault = () => {
  resetNotifyDefaultOptions()
  showNotify('已重置默认配置')
}
</script>
```

### 组件方式使用

```vue
<template>
  <view>
    <wd-button @click="visible = true">显示通知</wd-button>
    <wd-notify 
      v-model:visible="visible" 
      type="success" 
      message="这是一条组件方式使用的通知" 
      duration="3000"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const visible = ref(false)
</script>
```

## 样式定制指南

### 自定义样式

通过组件的 props 可以自定义通知的样式：

```vue
<wd-notify 
  v-model:visible="visible" 
  message="自定义样式通知" 
  color="#ffffff" 
  background="#1890FF"
  :z-index="1000"
/>
```

### 全局主题变量

可以通过修改全局主题变量来定制通知组件的默认样式：

| 变量名 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| notifyPadding | string | 12px 16px | 通知内边距 |
| notifyFontSize | string | 14px | 通知字体大小 |
| notifyTextColor | string | #ffffff | 通知文本颜色 |
| notifyLineHeight | number \| string | 1.5 | 通知行高 |
| notifyDangerBackground | string | #ff4d4f | 危险类型通知背景色 |
| notifyPrimaryBackground | string | #1890ff | 主要类型通知背景色 |
| notifySuccessBackground | string | #52c41a | 成功类型通知背景色 |
| notifyWarningBackground | string | #faad14 | 警告类型通知背景色 |

## 注意事项

1. 使用方式选择：
   - 组合式API方式：适合在JavaScript/TypeScript代码中调用，使用更灵活
   - 组件方式：适合在模板中直接使用，更符合Vue组件的使用习惯
   - 推荐使用组合式API方式，特别是在需要频繁调用通知的场景

2. 显示时长：
   - 默认显示时长为3000ms，可通过`duration`属性调整
   - 当`duration`为0时，通知不会自动关闭，需手动调用`closeNotify`方法关闭
   - 注意控制通知显示时长，过长会影响用户体验，过短可能导致用户来不及阅读

3. 位置选择：
   - 支持`top`和`bottom`两种位置
   - 顶部通知适合重要信息，底部通知适合次要信息
   - 在移动端，建议使用顶部通知，避免被底部导航栏遮挡

4. 安全区域适配：
   - 在全面屏设备上，建议设置`safeHeight`属性，以适配顶部安全区域
   - 或开启`rootPortal`属性，解决fixed定位失效问题

5. 事件处理：
   - `click`事件在点击通知时触发，可用于添加点击交互
   - `onOpened`事件在通知打开动画结束时触发
   - `onClosed`事件在通知关闭动画结束时触发
   - 可通过这些事件实现更复杂的交互逻辑

6. 性能优化：
   - 避免短时间内频繁显示通知，影响用户体验
   - 通知内容应简洁明了，避免过长的文本
   - 对于不重要的通知，可适当缩短显示时长

7. 全局配置：
   - 可通过`setNotifyDefaultOptions`方法设置全局默认配置，减少重复代码
   - 可通过`resetNotifyDefaultOptions`方法重置全局默认配置
   - 全局配置会影响所有使用`useNotify`的通知组件

8. 层级管理：
   - 默认层级为99，可通过`zIndex`属性调整
   - 确保层级设置合理，避免被其他元素遮挡
   - 当页面中有多个弹窗组件时，注意调整不同组件的层级关系