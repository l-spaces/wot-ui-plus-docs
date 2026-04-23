# LazyLoad 懒加载

## 组件概述

LazyLoad 懒加载组件用于图片的延迟加载，当图片进入可视区域时才真正加载。支持自定义占位图、错误图、加载阈值、过渡动画等功能。适用于长列表图片加载优化场景。

## 核心功能描述

- **懒加载**：图片进入可视区域前指定距离时才开始加载
- **自定义阈值**：通过 `threshold` 设置提前加载的距离
- **占位图**：通过 `loadingImg` 设置加载中占位图
- **错误图**：通过 `errorImg` 设置加载失败占位图
- **过渡动画**：通过 `isEffect` 和 `duration` 设置淡入效果
- **图片模式**：通过 `mode` 设置图片裁剪缩放模式
- **圆角**：通过 `round` 设置图片圆角

## 适用业务场景

- **长列表图片**：商品列表、图片瀑布流等大量图片场景
- **页面优化**：延迟加载非首屏图片，提升页面加载速度
- **图片画廊**：图片集合的按需加载

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| index | Number / String | '' | 否 | 图片索引标识 |
| image | String | '' | 否 | 要显示的图片路径 |
| mode | String | 'widthFix' | 否 | 图片裁剪模式，可选值：aspectFit / aspectFill / widthFix / top / bottom / center / scaleToFill |
| loadingImg | String | (内置占位图) | 否 | 占位图片路径 |
| errorImg | String | (内置错误图) | 否 | 加载失败的错误占位图 |
| threshold | Number / String | 100 | 否 | 图片进入可见区域前多少像素时开始加载，单位 rpx |
| duration | Number / String | 300 | 否 | 淡入淡出动画的过渡时间（ms） |
| effect | String | 'ease-in-out' | 否 | 过渡效果的速度曲线 |
| isEffect | Boolean | true | 否 | 是否使用过渡效果 |
| round | Number / String | 0 | 否 | 圆角值 |
| height | Number / String | '200' | 否 | 图片高度，单位 px |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| click | 点击图片时触发 | (index: Number / String) | 当前图片的 index |
| load | 真正的图片加载完成时触发 | (index: Number / String) | 当前图片的 index |
| error | 错误占位图加载完成时触发 | (index: Number / String) | 当前图片的 index |

## 使用示例

### 示例1：基础用法

通过 `image` 设置图片路径，`threshold` 设置加载阈值。

```vue
<template>
  <wd-lazy-load
    threshold="-450"
    round="10"
    image="https://gtd.alicdn.com/sns_logo/i1/TB124_3NXXXXXasXVXXSutbFXXX.jpg_240x240xz.jpg"
    :index="0"
  />
</template>
```

### 示例2：图片列表懒加载

在列表中使用懒加载，配合 `v-for` 循环渲染。

```vue
<template>
  <wd-row :gutter="12" wrap>
    <wd-col :span="12" v-for="(item, index) in list" :key="index">
      <view class="item">
        <wd-lazy-load
          threshold="-450"
          round="10"
          :image="item.src"
          :index="index"
          @click="onClick"
          @load="onLoad"
        />
      </view>
    </wd-col>
  </wd-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const list = ref([
  { src: 'https://gtd.alicdn.com/sns_logo/i1/TB124_3NXXXXXasXVXXSutbFXXX.jpg_240x240xz.jpg' },
  { src: 'https://gtd.alicdn.com/sns_logo/i7/TB1IWtgQFXXXXcmXFXXSutbFXXX.jpg_240x240xz.jpg' },
  { src: 'https://gtd.alicdn.com/sns_logo/i1/TB1_f_PLXXXXXbVXpXXSutbFXXX.jpg_240x240xz.jpg' },
  { src: 'https://gtd.alicdn.com/sns_logo/i6/TB1SIYrLXXXXXaAXpXXSutbFXXX.jpg_240x240xz.jpg' }
])

function onClick(index: number) {
  console.log('点击图片:', index)
}
function onLoad(index: number) {
  console.log('图片加载完成:', index)
}
</script>

<style lang="scss" scoped>
.item {
  margin-bottom: 20rpx;
  border-radius: 10rpx;
}
</style>
```

### 示例3：自定义高度与圆角

通过 `height` 设置图片高度，`round` 设置圆角。

```vue
<template>
  <wd-lazy-load
    height="150"
    round="12"
    mode="aspectFill"
    image="https://gtd.alicdn.com/sns_logo/i1/TB124_3NXXXXXasXVXXSutbFXXX.jpg_240x240xz.jpg"
    :index="0"
  />
</template>
```

## 注意事项

- `threshold` 负数表示图片超出屏幕底部多少距离后触发，正数表示图片顶部距离屏幕底部多少距离时触发
- `mode` 默认为 widthFix（宽度不变，高度自动变化），常用还有 aspectFill 和 aspectFit
- `isEffect` 为 true 时，图片加载完成会有淡入动画效果
- 加载失败的图片会自动显示 `errorImg` 占位图
