# Notify 通知

## 组件概况

Notify 通知组件用于在页面顶部或底部展示系统级通知消息，适合网络状态提醒、全局告警、运营公告等需要更高可见度的场景。组件以函数式调用为主，通过 `useNotify()` 统一控制显示与关闭。

## 核心功能描述

- **函数式调用**：通过 `useNotify()` 在任意业务逻辑中触发通知
- **四种通知类型**：支持 `primary`、`success`、`danger`、`warning`
- **位置与颜色可配**：支持顶部、底部展示以及前景色、背景色自定义
- **自动关闭**：通过 `duration` 控制自动消失时机
- **根节点脱离文档流**：支持 `rootPortal`，适合 fixed 场景复杂页面

## 适用业务场景

- **网络状态提醒**：网络断开、服务异常时在页面顶端显示高优先级提示
- **系统公告**：全局配置更新、活动通知、维护公告等统一消息
- **页面级操作反馈**：在列表页或详情页顶部集中提示关键状态变化

## API

### useNotify 返回方法

| 方法名称 | 参数 | 返回值 | 说明 |
|---------|------|--------|------|
| showNotify | (options: string \| NotifyProps) | void | 显示通知 |
| closeNotify | - | void | 关闭通知 |

### Notify Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| type | String | 'danger' | 否 | 通知类型，可选值：primary / success / danger / warning |
| color | String | '' | 否 | 文字颜色 |
| zIndex | Number | 99 | 否 | 层级 |
| visible | Boolean | false | 否 | 是否显示，通常由 `useNotify()` 接管 |
| message | String / Number | '' | 否 | 通知内容 |
| selector | String | '' | 否 | 多实例场景下的唯一标识 |
| duration | Number | 3000 | 否 | 展示时长，单位 ms，0 表示不自动关闭 |
| position | String | 'top' | 否 | 展示位置，可选值：top / bottom |
| safeHeight | Number | - | 否 | 顶部安全区域高度 |
| background | String | '' | 否 | 背景颜色 |
| rootPortal | Boolean | false | 否 | 是否脱离页面文档流渲染 |
| onClick | Function | - | 否 | 点击通知时的回调 |
| onClosed | Function | - | 否 | 完全关闭后的回调 |
| onOpened | Function | - | 否 | 完全展示后的回调 |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-button @click="showNotifyMessage">显示通知</wd-button>
</template>

<script lang="ts" setup>
import { useNotify } from '@/uni_modules/wot-ui-plus'

const { showNotify } = useNotify()

function showNotifyMessage() {
  showNotify({ message: '通知内容' })
}
</script>
```

### 示例2：不同状态

```vue
<template>
  <wd-button @click="showSuccess">成功通知</wd-button>
  <wd-button @click="showWarning">警告通知</wd-button>
  <wd-button @click="showDanger">危险通知</wd-button>
</template>

<script lang="ts" setup>
import { useNotify } from '@/uni_modules/wot-ui-plus'

const { showNotify } = useNotify()

function showSuccess() {
  showNotify({ message: '操作成功', type: 'success' })
}
function showWarning() {
  showNotify({ message: '请注意当前网络状态', type: 'warning' })
}
function showDanger() {
  showNotify({ message: '操作失败', type: 'danger' })
}
</script>
```

### 示例3：自定义位置与样式

```vue
<template>
  <wd-button @click="showCustom">自定义通知</wd-button>
</template>

<script lang="ts" setup>
import { useNotify } from '@/uni_modules/wot-ui-plus'

const { showNotify } = useNotify()

function showCustom() {
  showNotify({
    message: '自定义颜色',
    color: '#fff',
    background: '#07c160',
    position: 'bottom'
  })
}
</script>
```

## 注意事项

- `useNotify()` 当前返回的是 `showNotify`、`closeNotify`，不是状态快捷方法
- 默认类型为 `danger`，如需其他类型请显式设置 `type`
- 多实例场景下应保证 `selector` 唯一
- 当前源码未提供 `customStyle`、`customClass` 通用根样式属性，文档以实际组件能力为准
