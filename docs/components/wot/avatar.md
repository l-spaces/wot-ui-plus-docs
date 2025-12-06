# Avatar 头像

<demo-model url="/subPages/avatar/Index"></demo-model>

## 组件概况

### 组件概述
头像组件用于展示用户或实体的形象，支持多种形式（图片、文字、图标）和样式，适用于用户信息展示、评论列表、联系人列表等场景。

### 详细功能描述
- 支持三种头像形式：图片头像、文字头像、图标头像
- 支持两种形状：圆形（circle）和方形（square）
- 支持自定义尺寸、背景色、文字颜色等样式
- 支持随机背景色功能
- 支持小程序open-data获取用户头像（微信、QQ、百度小程序）
- 支持性别图标显示（男/女）
- 支持等级图标显示
- 支持图片加载失败处理
- 支持点击事件

### 适用业务场景
- 用户信息展示
- 评论列表中的用户头像
- 联系人列表
- 团队成员展示
- 任何需要展示实体形象的场景

## 完整API参考

### Props属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| src | string | - | 否 | 头像图片路径(不能为相对路径) |
| shape | string | circle | 否 | 头像形状，可选值：circle(圆形) / square(方形) |
| size | string/number | 40 | 否 | 头像尺寸 |
| mode | string | scaleToFill | 否 | 裁剪模式，参考uni-app image组件的mode属性 |
| text | string | - | 否 | 显示的文字 |
| bgColor | string | #c0c4cc | 否 | 背景色 |
| color | string | #ffffff | 否 | 文字颜色 |
| fontSize | string/number | 18 | 否 | 文字大小 |
| icon | string | - | 否 | 显示的图标 |
| mpAvatar | boolean | false | 否 | 显示小程序头像，只对百度，微信，QQ小程序有效 |
| randomBgColor | boolean | false | 否 | 是否使用随机背景色 |
| defaultUrl | string | - | 否 | 加载失败的默认头像(组件有内置默认图片) |
| colorIndex | number | undefined | 否 | 随机背景色索引，取值0-19之间 |
| name | string | - | 否 | 组件标识符 |
| sexIcon | string | - | 否 | 右上角性别角标，可选值：male(男) / female(女) |
| sexBgColor | string | - | 否 | 右上角性别图标的背景颜色 |
| showLevel | boolean | false | 否 | 是否显示等级图标 |
| levelBgColor | string | - | 否 | 右下角等级图标背景颜色 |
| customStyle | string | - | 否 | 自定义根节点样式 |
| customClass | string | - | 否 | 自定义根节点样式类 |

### Events事件

| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| click | 头像被点击时 | name: 组件标识符, event: 原生点击事件 |

### Methods方法

该组件没有对外暴露的方法。

### Slots插槽

| 插槽名 | 作用域变量 | 使用说明 |
|--------|------------|----------|
| default | - | 自定义头像内容，默认显示图片/文字/图标 |

## 多场景使用示例代码

### 1. 基础用法

```vue
<template>
  <view class="avatar-demo">
    <!-- 图片头像 -->
    <wd-avatar src="https://example.com/avatar.jpg" />
    
    <!-- 文字头像 -->
    <wd-avatar text="张三" />
    
    <!-- 图标头像 -->
    <wd-avatar icon="user" />
  </view>
</template>

<script lang="ts" setup>
// 基础头像用法，展示不同形式的头像
</script>

<style scoped>
.avatar-demo {
  display: flex;
  gap: 20rpx;
  padding: 20rpx;
}
</style>
```

### 2. 不同形状和尺寸

```vue
<template>
  <view class="avatar-demo">
    <!-- 圆形头像 -->
    <wd-avatar src="https://example.com/avatar.jpg" shape="circle" size="60" />
    
    <!-- 方形头像 -->
    <wd-avatar src="https://example.com/avatar.jpg" shape="square" size="80" />
    
    <!-- 小尺寸头像 -->
    <wd-avatar text="张" size="30" />
    
    <!-- 大尺寸头像 -->
    <wd-avatar text="李" size="100" />
  </view>
</template>

<script lang="ts" setup>
// 展示不同形状和尺寸的头像
</script>

<style scoped>
.avatar-demo {
  display: flex;
  gap: 20rpx;
  padding: 20rpx;
}
</style>
```

### 3. 自定义样式和随机背景色

```vue
<template>
  <view class="avatar-demo">
    <!-- 自定义背景色和文字颜色 -->
    <wd-avatar text="赵" bgColor="#4D80F0" color="#fff" />
    
    <!-- 随机背景色 -->
    <wd-avatar text="钱" randomBgColor />
    
    <!-- 指定随机背景色索引 -->
    <wd-avatar text="孙" randomBgColor colorIndex="5" />
    
    <!-- 自定义字体大小 -->
    <wd-avatar text="周" fontSize="24" size="60" />
  </view>
</template>

<script lang="ts" setup>
// 展示自定义样式和随机背景色的头像
</script>

<style scoped>
.avatar-demo {
  display: flex;
  gap: 20rpx;
  padding: 20rpx;
}
</style>
```

### 4. 带有性别和等级图标

```vue
<template>
  <view class="avatar-demo">
    <!-- 男性头像 -->
    <wd-avatar src="https://example.com/male.jpg" sexIcon="male" />
    
    <!-- 女性头像 -->
    <wd-avatar src="https://example.com/female.jpg" sexIcon="female" />
    
    <!-- 带有等级图标 -->
    <wd-avatar src="https://example.com/vip.jpg" showLevel />
    
    <!-- 自定义性别图标背景色 -->
    <wd-avatar src="https://example.com/avatar.jpg" sexIcon="male" sexBgColor="#ff6b6b" />
  </view>
</template>

<script lang="ts" setup>
// 展示带有性别和等级图标的头像
</script>

<style scoped>
.avatar-demo {
  display: flex;
  gap: 20rpx;
  padding: 20rpx;
}
</style>
```

### 5. 小程序头像和点击事件

```vue
<template>
  <view class="avatar-demo">
    <!-- 小程序头像（仅微信、QQ、百度小程序有效） -->
    <wd-avatar mpAvatar size="80" />
    
    <!-- 带点击事件的头像 -->
    <wd-avatar 
      src="https://example.com/avatar.jpg" 
      name="user-1" 
      @click="handleAvatarClick"
      size="60"
    />
  </view>
</template>

<script lang="ts" setup>
import { showToast } from '@/utils/toast'

// 处理头像点击事件
const handleAvatarClick = (name: string, event: any) => {
  showToast(`点击了头像：${name}`)
  console.log('头像点击事件:', event)
}
</script>

<style scoped>
.avatar-demo {
  display: flex;
  gap: 20rpx;
  padding: 20rpx;
}
</style>
```

## 样式定制指南

### 1. 使用customStyle自定义样式

```vue
<template>
  <wd-avatar 
    text="自定义" 
    customStyle="border: 2px solid #4D80F0; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);"
    size="60"
  />
</template>
```

### 2. 使用customClass自定义类名

```vue
<template>
  <wd-avatar 
    src="https://example.com/avatar.jpg" 
    customClass="my-avatar"
    size="60"
  />
</template>

<style scoped>
/* 注意：需要使用 ::v-deep 或 /deep/ 穿透 scoped 样式 */
:deep(.my-avatar) {
  border: 3px solid #34d19d;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(52, 209, 157, 0.3);
}
</style>
```

### 3. 覆盖组件内部样式

```vue
<template>
  <wd-avatar 
    text="样式" 
    customClass="custom-style-avatar"
    size="80"
  />
</template>

<style scoped>
/* 覆盖文字样式 */
:deep(.custom-style-avatar .wd-text) {
  font-weight: bold;
  text-transform: uppercase;
}
</style>
```

## 注意事项

1. **图片路径**：src属性必须使用绝对路径或网络路径，不能使用相对路径。

2. **小程序头像**：mpAvatar属性仅对微信、QQ、百度小程序有效，其他平台会忽略此属性。

3. **随机背景色**：randomBgColor为true时，组件会从内置的20种颜色中随机选择一种作为背景色，可通过colorIndex属性指定具体颜色索引（0-19）。

4. **图片加载失败**：当图片加载失败时，组件会使用defaultUrl指定的图片或内置的base64占位图。

5. **尺寸单位**：size属性接受数字或字符串，数字会自动转换为rpx单位，字符串需自行指定单位（如"60px"）。

6. **形状优先级**：shape属性定义头像的整体形状，图片内部也会应用相同的形状样式。

7. **性能优化**：避免使用过大的图片作为头像，建议使用适当尺寸的图片，以提高加载速度和性能。

8. **性别和等级图标**：sexIcon和showLevel属性可以同时使用，分别显示在头像的右上角和右下角。

9. **兼容性**：在不同平台上，头像的显示效果可能略有差异，建议在主要目标平台上进行测试。

10. **点击事件**：点击事件会返回组件的name属性和原生点击事件对象，便于识别和处理不同头像的点击操作。