# StatusTip 状态提示
<demo-model url="/subPages/statusTip/Index"></demo-model>

## 组件概况

### 组件概述
状态提示组件用于在各种状态下向用户展示友好的提示信息，包括搜索结果为空、网络错误、内容为空等场景。该组件提供了多种内置图标和灵活的自定义选项，能够适应不同业务场景的需求。

### 详细功能描述
- 支持7种内置状态图标：search（搜索）、network（网络）、content（内容）、collect（收藏）、comment（评论）、halo（光环）、message（消息）
- 支持自定义图片URL
- 支持多种图片大小配置方式（字符串、数字或对象）
- 支持自定义提示文本
- 支持自定义图片裁剪模式
- 支持自定义图片路径前缀
- 支持图片插槽自定义
- 支持底部内容插槽自定义
- 支持自定义样式和类名

### 适用业务场景
- 搜索结果为空提示
- 网络错误状态提示
- 内容列表为空提示
- 收藏列表为空提示
- 评论列表为空提示
- 消息列表为空提示
- 任何需要展示状态提示的场景

## 完整API参考

### Props属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| image | string | network | 否 | 状态图片类型或URL，内置类型：search, network, content, collect, comment, halo, message |
| imageSize | string/number/object | '' | 否 | 图片大小，支持字符串、数字或对象格式 {width, height} |
| tip | string | '' | 否 | 提示文案 |
| imageMode | string | aspectFill | 否 | 图片裁剪、缩放的模式，同uni-app的image组件mode属性 |
| urlPrefix | string | ./../../static/images/ | 否 | 图片路径前缀，用于拼接内置图片URL |
| customStyle | string | - | 否 | 自定义根节点样式 |
| customClass | string | - | 否 | 自定义根节点样式类 |

### Events事件

该组件没有对外暴露的事件。

### Methods方法

该组件没有对外暴露的方法。

### Slots插槽

| 插槽名 | 作用域变量 | 使用说明 |
|--------|------------|----------|
| image | - | 自定义图片，用于替换默认图标 |
| bottom | - | 底部内容插槽，可用于添加操作按钮等 |
| default | - | 默认插槽，已废弃，建议使用bottom插槽 |

## 多场景使用示例代码

### 1. 基础用法

```vue
<template>
  <view class="status-tip-demo">
    <!-- 基础网络错误状态 -->
    <wd-status-tip image="network" tip="网络连接失败，请检查网络设置"></wd-status-tip>
  </view>
</template>

<script lang="ts" setup>
// 基础状态提示用法
</script>

<style scoped>
.status-tip-demo {
  padding: 40rpx;
}
</style>
```

### 2. 不同类型的状态提示

```vue
<template>
  <view class="status-tip-demo">
    <!-- 搜索结果为空 -->
    <wd-status-tip image="search" tip="未找到相关结果"></wd-status-tip>
    
    <!-- 内容为空 -->
    <wd-status-tip image="content" tip="暂无内容"></wd-status-tip>
    
    <!-- 收藏为空 -->
    <wd-status-tip image="collect" tip="暂无收藏内容"></wd-status-tip>
    
    <!-- 评论为空 -->
    <wd-status-tip image="comment" tip="暂无评论"></wd-status-tip>
    
    <!-- 消息为空 -->
    <wd-status-tip image="message" tip="暂无消息"></wd-status-tip>
  </view>
</template>

<script lang="ts" setup>
// 不同类型的状态提示
</script>

<style scoped>
.status-tip-demo {
  padding: 40rpx;
  display: flex;
  flex-direction: column;
  gap: 40rpx;
}
</style>
```

### 3. 自定义图片大小

```vue
<template>
  <view class="status-tip-demo">
    <!-- 数字格式 -->
    <wd-status-tip image="network" tip="数字格式图片大小" :image-size="120"></wd-status-tip>
    
    <!-- 字符串格式 -->
    <wd-status-tip image="network" tip="字符串格式图片大小" image-size="100rpx"></wd-status-tip>
    
    <!-- 对象格式 -->
    <wd-status-tip 
      image="network" 
      tip="对象格式图片大小" 
      :image-size="{ width: 150, height: 120 }"
    ></wd-status-tip>
  </view>
</template>

<script lang="ts" setup>
// 不同图片大小配置方式
</script>

<style scoped>
.status-tip-demo {
  padding: 40rpx;
  display: flex;
  flex-direction: column;
  gap: 40rpx;
}
</style>
```

### 4. 自定义图片URL

```vue
<template>
  <view class="status-tip-demo">
    <!-- 自定义图片URL -->
    <wd-status-tip 
      image="https://example.com/custom-image.png" 
      tip="自定义图片URL"
      :image-size="120"
    ></wd-status-tip>
  </view>
</template>

<script lang="ts" setup>
// 自定义图片URL示例
</script>

<style scoped>
.status-tip-demo {
  padding: 40rpx;
}
</style>
```

### 5. 带底部操作按钮的状态提示

```vue
<template>
  <view class="status-tip-demo">
    <!-- 带底部操作按钮 -->
    <wd-status-tip image="network" tip="网络连接失败">
      <template #bottom>
        <view class="status-tip__actions">
          <wd-button size="small" type="primary" @click="handleRetry">重新加载</wd-button>
          <wd-button size="small" @click="handleCancel">取消</wd-button>
        </view>
      </template>
    </wd-status-tip>
  </view>
</template>

<script lang="ts" setup>
// 带底部操作按钮的状态提示
const handleRetry = () => {
  console.log('重新加载')
}

const handleCancel = () => {
  console.log('取消')
}
</script>

<style scoped>
.status-tip-demo {
  padding: 40rpx;
}

.status-tip__actions {
  margin-top: 30rpx;
  display: flex;
  gap: 20rpx;
  justify-content: center;
}
</style>
```

## 样式定制指南

### 1. 使用customStyle自定义样式

```vue
<template>
  <wd-status-tip 
    image="network" 
    tip="自定义样式" 
    customStyle="background-color: #f0f9ff; padding: 40rpx; border-radius: 16rpx;"
  ></wd-status-tip>
</template>
```

### 2. 使用customClass自定义类名

```vue
<template>
  <wd-status-tip 
    image="network" 
    tip="自定义类名" 
    customClass="my-status-tip"
  ></wd-status-tip>
</template>

<script lang="ts" setup>
// 自定义类名示例
</script>

<style scoped>
:deep(.my-status-tip) {
  background-color: #f0f9ff;
  padding: 40rpx;
  border-radius: 16rpx;
}

:deep(.my-status-tip .wd-status-tip__text) {
  color: #1989fa;
  font-size: 28rpx;
  margin-top: 20rpx;
}
</style>
```

### 3. 自定义图片样式

```vue
<template>
  <wd-status-tip 
    image="network" 
    tip="自定义图片样式" 
    :image-size="120"
  ></wd-status-tip>
</template>
```

## 注意事项

1. **内置图片类型**：目前支持7种内置图片类型：search, network, content, collect, comment, halo, message，使用时需注意拼写正确。

2. **图片路径前缀**：默认使用本地路径"./../../static/images/"，建议在实际项目中将图片部署到服务器上，并通过urlPrefix属性配置正确的图片路径前缀。

3. **图片大小配置**：
   - 数字格式：直接设置宽度和高度，默认单位为px
   - 字符串格式：可带单位，如"100rpx"、"80px"
   - 对象格式：{width: 100, height: 80}，默认单位为px

4. **自定义图片**：当image属性值不是内置类型时，会被当作自定义图片URL处理。

5. **图片插槽优先级**：当使用image插槽时，会忽略image属性的设置。

6. **底部内容**：建议使用bottom插槽放置底部内容，default插槽已废弃。

7. **图片裁剪模式**：imageMode属性支持uni-app image组件的所有mode值，可根据需要选择合适的裁剪模式。

8. **跨平台兼容性**：该组件在各平台表现一致，无需特殊处理。

9. **性能优化**：对于频繁使用的状态提示，建议使用内置图片类型，减少网络请求。

10. **小程序打包注意**：使用内置图片时，会自动使用网络地址，避免小程序打包时统一打包导致包过大的问题。