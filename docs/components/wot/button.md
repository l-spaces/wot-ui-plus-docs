# Button 按钮

<demo-model url="/subPages/button/Index"></demo-model>

## 组件概况

### 组件概述
按钮是最常用的交互元素之一，用于触发操作或提交表单。wd-button 组件提供了丰富的样式和功能，支持多种类型、尺寸和状态，适用于各种场景。

### 详细功能描述
- 支持多种按钮类型：primary、success、info、warning、error、default、text、icon
- 支持三种尺寸：small、medium、large
- 支持幽灵按钮、圆角按钮、块状按钮等样式变体
- 支持加载状态和禁用状态
- 支持图标按钮
- 支持小程序开放能力（如getUserInfo、contact等）
- 支持自定义样式和类名

### 适用业务场景
- 表单提交按钮
- 操作触发按钮
- 导航按钮
- 小程序开放能力调用
- 加载状态展示

## 完整API参考

### Props属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| plain | boolean | false | 否 | 幽灵按钮 |
| round | boolean | true | 否 | 圆角按钮 |
| disabled | boolean | false | 否 | 禁用按钮 |
| hairline | boolean | false | 否 | 是否细边框 |
| block | boolean | false | 否 | 块状按钮 |
| type | string | primary | 否 | 按钮类型，可选值：primary / success / info / warning / error / text / icon |
| size | string | medium | 否 | 按钮尺寸，可选值：small / medium / large |
| icon | string | - | 否 | 图标类名 |
| classPrefix | string | wd-icon | 否 | 类名前缀，用于使用自定义图标 |
| loading | boolean | false | 否 | 加载中按钮 |
| loadingColor | string | - | 否 | 加载图标颜色 |
| openType | string | - | 否 | 开放能力，支持多种小程序开放能力 |
| hoverStopPropagation | boolean | - | 否 | 指定是否阻止本节点的祖先节点出现点击态 |
| lang | string | - | 否 | 指定返回用户信息的语言，可选值：zh_CN / zh_TW / en |
| sessionFrom | string | - | 否 | 会话来源，open-type="contact"时有效 |
| sendMessageTitle | string | - | 否 | 会话内消息卡片标题，open-type="contact"时有效 |
| sendMessagePath | string | - | 否 | 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效 |
| sendMessageImg | string | - | 否 | 会话内消息卡片图片，open-type="contact"时有效 |
| appParameter | string | - | 否 | 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效 |
| showMessageCard | boolean | - | 否 | 是否显示会话内消息卡片，open-type="contact"时有效 |
| buttonId | string | - | 否 | 按钮的唯一标识，可用于设置隐私同意授权按钮的id |
| scope | string | - | 否 | 支付宝小程序，当 open-type 为 getAuthorize 时有效，可选值：'phoneNumber' | 'userInfo' |
| customStyle | string | - | 否 | 自定义根节点样式 |
| customClass | string | - | 否 | 自定义根节点样式类 |

### Events事件

| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| click | 按钮被点击，且非禁用和非加载状态 | event: 原生点击事件 |
| getuserinfo | 用户点击授权按钮，获取用户信息 | detail: 用户信息对象 |
| contact | 点击客服按钮，进入客服会话 | detail: 客服会话相关信息 |
| getphonenumber | 点击获取手机号按钮 | detail: 手机号相关信息 |
| getrealtimephonenumber | 点击获取实时手机号按钮 | detail: 实时手机号相关信息 |
| error | 发生错误时 | detail: 错误信息 |
| launchapp | 打开APP成功时 | detail: APP相关信息 |
| opensetting | 打开设置页面成功时 | detail: 设置页面相关信息 |
| chooseavatar | 选择头像成功时 | detail: 头像相关信息 |
| agreeprivacyauthorization | 用户同意隐私授权时 | detail: 隐私授权相关信息 |

### Methods方法

该组件没有对外暴露的方法。

### Slots插槽

| 插槽名 | 作用域变量 | 使用说明 |
|--------|------------|----------|
| default | - | 按钮文本内容 |

## 多场景使用示例代码

### 1. 基础用法

```vue
<template>
  <view class="button-demo">
    <!-- 基础按钮 -->
    <wd-button>默认按钮</wd-button>
    <!-- 不同类型按钮 -->
    <wd-button type="primary">主要按钮</wd-button>
    <wd-button type="success">成功按钮</wd-button>
    <wd-button type="warning">警告按钮</wd-button>
    <wd-button type="error">错误按钮</wd-button>
  </view>
</template>

<script lang="ts" setup>
// 基础按钮用法，展示不同类型的按钮
</script>

<style scoped>
.button-demo {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  padding: 20rpx;
}
</style>
```

### 2. 不同尺寸和样式

```vue
<template>
  <view class="button-demo">
    <!-- 不同尺寸 -->
    <wd-button size="small">小尺寸</wd-button>
    <wd-button size="medium">中尺寸</wd-button>
    <wd-button size="large">大尺寸</wd-button>
    
    <!-- 样式变体 -->
    <wd-button plain>幽灵按钮</wd-button>
    <wd-button round="false">直角按钮</wd-button>
    <wd-button block>块状按钮</wd-button>
    <wd-button plain hairline>细边框按钮</wd-button>
  </view>
</template>

<script lang="ts" setup>
// 展示不同尺寸和样式变体的按钮
</script>

<style scoped>
.button-demo {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  padding: 20rpx;
}
</style>
```

### 3. 加载状态和禁用状态

```vue
<template>
  <view class="button-demo">
    <!-- 加载状态 -->
    <wd-button loading>加载中</wd-button>
    <!-- 自定义加载颜色 -->
    <wd-button loading loadingColor="#fb0000ff" type="primary">加载中</wd-button>
    <!-- 禁用状态 -->
    <wd-button disabled>禁用按钮</wd-button>
    <wd-button disabled type="primary">禁用主要按钮</wd-button>
  </view>
</template>

<script lang="ts" setup>
// 展示按钮的加载状态和禁用状态
</script>

<style scoped>
.button-demo {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  padding: 20rpx;
}
</style>
```

### 4. 图标按钮

```vue
<template>
  <view class="button-demo">
    <!-- 带图标的按钮 -->
    <wd-button icon="search">搜索</wd-button>
    <!-- 纯图标按钮 -->
    <wd-button type="icon" icon="search"></wd-button>
    <!-- 不同位置的图标 -->
    <wd-button type="primary" icon="add">添加</wd-button>
  </view>
</template>

<script lang="ts" setup>
// 展示带图标和纯图标的按钮
</script>

<style scoped>
.button-demo {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  padding: 20rpx;
}
</style>
```

### 5. 小程序开放能力

```vue
<template>
  <view class="button-demo">
    <!-- 获取用户信息 -->
    <wd-button openType="getUserInfo" @getuserinfo="handleGetUserInfo">获取用户信息</wd-button>
    <!-- 联系客服 -->
    <wd-button openType="contact" @contact="handleContact">联系客服</wd-button>
    <!-- 打开设置 -->
    <wd-button openType="openSetting" @opensetting="handleOpenSetting">打开设置</wd-button>
  </view>
</template>

<script lang="ts" setup>
import { showToast } from '@/utils/toast'

// 处理获取用户信息事件
const handleGetUserInfo = (detail: any) => {
  showToast('获取用户信息成功')
  console.log('用户信息:', detail)
}

// 处理联系客服事件
const handleContact = (detail: any) => {
  console.log('联系客服:', detail)
}

// 处理打开设置事件
const handleOpenSetting = (detail: any) => {
  console.log('打开设置:', detail)
}
</script>

<style scoped>
.button-demo {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  padding: 20rpx;
}
</style>
```

## 样式定制指南

### 1. 使用customStyle自定义样式

```vue
<template>
  <wd-button 
    customStyle="background-color: #666; color: #fff; border-radius: 10rpx; padding: 15rpx 30rpx;"
  >
    自定义样式按钮
  </wd-button>
</template>
```

### 2. 使用customClass自定义类名

```vue
<template>
  <wd-button customClass="my-button">自定义类名按钮</wd-button>
</template>

<style scoped>
/* 注意：需要使用 ::v-deep 或 /deep/ 穿透 scoped 样式 */
:deep(.my-button) {
  background-color: #666;
  color: #fff;
  border-radius: 10rpx;
  padding: 15rpx 30rpx;
}
</style>
```

### 3. 覆盖组件内部样式

```vue
<template>
  <wd-button type="primary" customClass="custom-primary-button">自定义主要按钮</wd-button>
</template>

<style scoped>
/* 覆盖按钮内部的文本样式 */
:deep(.custom-primary-button .wd-button__text) {
  font-weight: bold;
  text-transform: uppercase;
}
</style>
```

## 注意事项

1. **禁用状态下的事件**：禁用状态的按钮不会触发click事件，也不会响应触摸反馈。

2. **加载状态下的事件**：加载状态的按钮不会触发click事件，避免重复提交。

3. **开放能力的使用**：不同的openType需要在小程序后台配置相应的权限，否则可能无法正常使用。

4. **自定义样式的优先级**：customStyle的优先级高于组件内部样式，customClass可以通过穿透选择器覆盖组件内部样式。

5. **图标按钮的尺寸**：纯图标按钮（type="icon"）的尺寸由size属性控制，建议使用合适的尺寸以保证视觉效果。

6. **性能优化**：避免在按钮中使用过于复杂的内容，如大量文本或复杂组件，以免影响渲染性能。

7. **跨平台兼容性**：不同平台对按钮的默认样式可能有差异，建议使用自定义样式保证跨平台一致性。

8. **无障碍访问**：为按钮添加合适的aria-label属性，提高无障碍访问性。