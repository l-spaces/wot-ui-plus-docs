# SliderButton 滑动验证按钮

## 组件概况

SliderButton 滑动验证按钮组件用于滑动验证操作，通过拖动滑块到指定位置完成验证。支持自定义样式、自动重置、禁用状态等功能。常用于登录验证、操作确认等场景。

## 核心功能描述

- **滑动验证**：通过拖动滑块到终点完成验证
- **自定义样式**：支持自定义背景色、滑道颜色、文字颜色等
- **自动重置**：通过 `autoReset` 设置验证成功后是否自动重置
- **禁用状态**：通过 `disabled` 禁用滑动操作
- **滑动阈值**：通过 `threshold` 设置滑动成功的像素阈值
- **圆角控制**：支持自定义按钮和轨道圆角

## 适用业务场景

- **登录验证**：滑动验证码替代传统验证码
- **操作确认**：重要操作前的二次确认
- **安全校验**：人机验证场景

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| text | String | '滑动解锁' | 否 | 按钮文字 |
| width | String / Number | '' | 否 | 按钮宽度 |
| round | String / Number | 100 | 否 | 圆角大小 |
| height | String / Number | 45 | 否 | 按钮高度 |
| bgColor | String | '#e0e0e0' | 否 | 背景颜色 |
| railColor | String | '#4d80f0' | 否 | 滑道背景颜色 |
| railIndex | String / Number | '' | 否 | 滑道层级 |
| railRadius | String / Number | 100 | 否 | 轨道圆角 |
| textColor | String | '#c2c2c2' | 否 | 文字颜色 |
| fontSize | String / Number | 16 | 否 | 文字大小 |
| textBold | Boolean | false | 否 | 文字是否加粗 |
| activeTextColor | String | '#ffffff' | 否 | 激活状态文字颜色 |
| disabled | Boolean | false | 否 | 是否禁用 |
| successText | String | '验证成功' | 否 | 成功状态文字 |
| autoReset | Boolean | false | 否 | 是否自动重置 |
| resetDelay | Number | 300 | 否 | 重置延迟时间（毫秒） |
| threshold | String / Number | '' | 否 | 滑动成功阈值（像素值） |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| change | 滑动进度变化时触发 | (percent: number) | 0-1 之间的百分比 |
| success | 滑动验证成功时触发 | - | - |
| reset | 滑块重置时触发 | - | - |

### Methods

| 方法名称 | 参数 | 返回值 | 说明 |
|---------|------|--------|------|
| init | - | void | 初始化组件（重新获取容器尺寸） |
| reset | - | void | 重置组件状态（滑块归位） |
| handleSuccess | - | void | 手动触发成功状态 |

### Slots

| 插槽名称 | 作用域参数 | 使用场景 |
|---------|-----------|---------|
| default | - | 自定义内容区域，替换默认文本显示 |
| thumb | - | 自定义滑块区域，替换默认滑块图标 |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-slider-button text="滑动解锁" @success="onSuccess" @reset="onReset" />
</template>

<script lang="ts" setup>
function onSuccess() {
  uni.showToast({ title: '验证成功！', icon: 'success' })
}

function onReset() {
  console.log('滑动按钮已重置')
}
</script>
```

### 示例2：自定义样式与自动重置

通过 `bg-color`、`rail-color` 等属性自定义样式，`auto-reset` 开启验证成功后自动重置。

```vue
<template>
  <wd-slider-button
    text="开始出发"
    success-text="开始出发"
    bg-color="rgb(230, 27, 47)"
    rail-color="rgba(230, 27, 47, 0.85)"
    :height="45"
    text-color="#ffffff"
    :text-bold="true"
    auto-reset
    @success="onSuccess"
  />
</template>

<script lang="ts" setup>
function onSuccess() {
  console.log('验证成功')
}
</script>
```

### 示例3：禁用状态

通过 `disabled` 禁用滑动操作。

```vue
<template>
  <wd-slider-button text="已禁用" :width="300" :height="50" disabled />
</template>
```

## 注意事项

- `threshold` 设置滑动成功的像素阈值，不设置时需滑到最右端
- `autoReset` 开启后，验证成功会延迟 `resetDelay` 毫秒后自动重置
- `disabled` 为 true 时滑块不可拖动
- 可通过 ref 调用 `reset` 方法手动重置滑块
