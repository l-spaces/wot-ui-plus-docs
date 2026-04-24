# Signature 签名

## 组件概况

Signature 签名组件提供手写签名功能，基于 Canvas 实现。支持自定义画笔颜色和宽度、历史记录（撤销/恢复）、压感模式（笔锋效果）、导出图片等功能。适用于合同签署、确认回执等需要手写签名的业务场景。

## 核心功能描述

- **画笔设置**：自定义画笔颜色和宽度
- **历史记录**：支持撤销和恢复操作
- **压感模式**：通过 `pressure` 启用笔锋效果，模拟真实书写
- **导出图片**：确认签名后导出为图片，支持 png/jpg 格式
- **画布设置**：自定义画布大小、背景色
- **禁用状态**：通过 `disabled` 禁用签名板
- **实例方法**：提供 init、clear、confirm、revoke、restore 方法

## 适用业务场景

- **合同签署**：在电子合同页面手写签名
- **确认回执**：在收货确认页面签名确认
- **审批签字**：在审批流程中手写签字

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| penColor | String | '#000' | 否 | 签名笔颜色 |
| lineWidth | Number | 3 | 否 | 签名笔宽度 |
| clearText | String | - | 否 | 清空按钮的文本 |
| revokeText | String | - | 否 | 撤回按钮的文本 |
| restoreText | String | - | 否 | 恢复按钮的文本 |
| confirmText | String | - | 否 | 确认按钮的文本 |
| undoText | String | '撤销' | 否 | 撤销按钮的文本 |
| redoText | String | '恢复' | 否 | 恢复按钮的文本 |
| fileType | String | 'png' | 否 | 导出图片的类型，可选值：png / jpg |
| quality | Number | 1 | 否 | 导出图片的质量，0-1 之间 |
| exportScale | Number | 1 | 否 | 导出图片的缩放比例 |
| disabled | Boolean | false | 否 | 是否禁用签名板 |
| height | Number / String | - | 否 | 画布的高度 |
| width | Number / String | - | 否 | 画布的宽度 |
| backgroundColor | String | - | 否 | 画板的背景色 |
| disableScroll | Boolean | true | 否 | 是否禁用画布滚动 |
| enableHistory | Boolean | false | 否 | 是否开启历史记录 |
| step | Number | 1 | 否 | 撤回和恢复的步长 |
| pressure | Boolean | false | 否 | 是否启用压感模式（笔锋） |
| minWidth | Number | 2 | 否 | 压感模式下笔画最小宽度 |
| maxWidth | Number | 6 | 否 | 压感模式下笔画最大宽度 |
| minSpeed | Number | 1.5 | 否 | 最小速度阈值，影响压感模式下的笔画宽度变化 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Methods

| 方法名称 | 参数 | 返回值 | 说明 |
|---------|------|--------|------|
| init | (forceUpdate?: boolean) | void | 初始化签名板 |
| clear | - | void | 清除签名 |
| confirm | - | void | 确认签名并生成图片 |
| revoke | - | void | 撤销上一步操作 |
| restore | - | void | 恢复上一步操作 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| confirm | 点击确认按钮时触发 | (result: SignatureResult) | result 包含 tempFilePath、success、width、height |
| clear | 点击清除按钮时触发 | - | - |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-signature @confirm="onConfirm" @clear="onClear" />
</template>

<script lang="ts" setup>
function onConfirm(result: any) {
  console.log('签名图片路径:', result.tempFilePath)
}
function onClear() {
  console.log('签名已清除')
}
</script>
```

### 示例2：自定义画笔与历史记录

```vue
<template>
  <wd-signature
    pen-color="#333"
    :line-width="4"
    enable-history
    :step="2"
    @confirm="onConfirm"
  />
</template>

<script lang="ts" setup>
function onConfirm(result: any) {
  console.log('签名图片:', result)
}
</script>
```

### 示例3：压感模式

```vue
<template>
  <wd-signature
    pressure
    :min-width="1"
    :max-width="8"
    :min-speed="1"
    background-color="#fff"
    @confirm="onConfirm"
  />
</template>

<script lang="ts" setup>
function onConfirm(result: any) {
  console.log('签名图片:', result)
}
</script>
```

## 注意事项

- 签名组件基于 Canvas 实现，需确保 Canvas 正确初始化
- `enableHistory` 开启后才能使用撤销和恢复功能
- 压感模式（`pressure`）通过速度模拟笔锋效果，非真实压感
- `exportScale` 大于 1 时导出更高分辨率的图片
- `quality` 仅对 jpg 格式有效
- 画布大小未设置时会自适应容器
