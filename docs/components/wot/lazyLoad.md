# LazyLoad 懒加载

<demo-model url="/subPages/lazyLoad/Index"></demo-model>


## 组件概况

### 组件概述
懒加载组件是一个用于图片延迟加载的高性能组件，能够在图片进入可视区域时才开始加载，有效提高页面初始加载速度和性能表现。

### 详细功能描述
- 支持图片延迟加载，只有当图片进入可视区域时才开始加载
- 提供默认占位图和错误图，可自定义替换
- 支持多种图片裁剪模式
- 支持淡入淡出过渡动画
- 支持自定义图片加载阈值
- 支持图片点击事件
- 支持加载成功和失败回调

### 适用业务场景
- 长列表图片展示场景
- 图片墙和瀑布流布局
- 电商商品列表
- 新闻资讯列表
- 任何包含大量图片的页面

## 完整API参考

### Props

| 名称 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| index | number \| string | '' | 否 | 图片索引，用于事件回调中区分不同图片 |
| image | string | '' | 否 | 要显示的图片URL |
| mode | 'aspectFit' \| 'aspectFill' \| 'widthFix' \| 'top' \| 'bottom' \| 'center' \| 'scaleToFill' | 'widthFix' | 否 | 图片裁剪模式 |
| loadingImg | string | base64编码的默认占位图 | 否 | 占位图片路径 |
| errorImg | string | base64编码的默认错误图 | 否 | 加载失败的错误占位图 |
| threshold | number \| string | 100 | 否 | 图片进入可见区域前多少像素时开始加载图片，单位rpx |
| duration | number \| string | 300 | 否 | 淡入淡出动画的过渡时间，单位ms |
| effect | string | 'ease-in-out' | 否 | 过渡效果的速度曲线 |
| isEffect | boolean | true | 否 | 是否使用过渡效果 |
| round | number \| string | 0 | 否 | 图片圆角值，单位rpx |
| height | number \| string | '200' | 否 | 图片高度，单位rpx |
| customStyle | string | - | 否 | 自定义样式 |
| customClass | string | - | 否 | 自定义类名 |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| click | 点击图片时 | 图片索引 |
| load | 图片加载成功时 | 图片索引 |
| error | 图片加载失败时 | 图片索引 |

### Methods

无

### Slots

无

## 多场景使用示例

### 基础用法

```vue
<template>
  <view>
    <wd-lazy-load 
      v-for="(item, index) in imageList" 
      :key="index" 
      :image="item" 
      :index="index"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const imageList = ref([
  'https://example.com/image1.jpg',
  'https://example.com/image2.jpg',
  'https://example.com/image3.jpg'
])
</script>
```

### 自定义占位图和错误图

```vue
<template>
  <view>
    <wd-lazy-load 
      :image="imageUrl" 
      :loading-img="loadingImg" 
      :error-img="errorImg"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const imageUrl = ref('https://example.com/image.jpg')
const loadingImg = ref('https://example.com/loading.jpg')
const errorImg = ref('https://example.com/error.jpg')
</script>
```

### 不同裁剪模式

```vue
<template>
  <view class="demo-container">
    <view class="demo-item">
      <text>aspectFit</text>
      <wd-lazy-load :image="imageUrl" mode="aspectFit" />
    </view>
    <view class="demo-item">
      <text>aspectFill</text>
      <wd-lazy-load :image="imageUrl" mode="aspectFill" />
    </view>
    <view class="demo-item">
      <text>scaleToFill</text>
      <wd-lazy-load :image="imageUrl" mode="scaleToFill" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const imageUrl = ref('https://example.com/image.jpg')
</script>

<style scoped>
.demo-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.demo-item {
  width: 30%;
}

.demo-item text {
  display: block;
  margin-bottom: 10px;
  text-align: center;
}
</style>
```

### 带过渡动画

```vue
<template>
  <view>
    <wd-lazy-load 
      :image="imageUrl" 
      :is-effect="true" 
      :duration="500"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const imageUrl = ref('https://example.com/image.jpg')
</script>
```

### 网格布局中的使用

```vue
<template>
  <view class="grid-container">
    <wd-lazy-load 
      v-for="(item, index) in imageList" 
      :key="index" 
      :image="item" 
      :index="index"
      mode="aspectFill"
      :height="150"
      :round="8"
      @click="handleImageClick"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const imageList = ref([
  'https://example.com/image1.jpg',
  'https://example.com/image2.jpg',
  'https://example.com/image3.jpg',
  'https://example.com/image4.jpg',
  'https://example.com/image5.jpg',
  'https://example.com/image6.jpg'
])

const handleImageClick = (index: number) => {
  console.log('点击了图片', index)
}
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 10px;
}
</style>
```

## 样式定制指南

### 自定义样式

通过 `customStyle` 属性可以自定义懒加载组件的样式：

```vue
<wd-lazy-load 
  :image="imageUrl" 
  :custom-style="{ borderRadius: '10px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }"
/>
```

### 自定义类名

通过 `customClass` 属性可以添加自定义类名，然后在样式文件中定义样式：

```vue
<wd-lazy-load 
  :image="imageUrl" 
  custom-class="my-lazy-image"
/>
```

```scss
.my-lazy-image {
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
}
```

## 注意事项

1. 图片加载时机：
   - 默认情况下，图片进入可视区域前100rpx时开始加载
   - 可通过 `threshold` 属性调整加载阈值，值越大图片加载越早
   - 负数表示图片超出屏幕底部多少距离后才开始加载

2. 裁剪模式选择：
   - `aspectFit`：保持纵横比，确保图片完全显示
   - `aspectFill`：保持纵横比，填充整个容器，可能裁剪部分图片
   - `widthFix`：宽度不变，高度自动变化，保持原图宽高比
   - `scaleToFill`：不保持纵横比，拉伸填满整个容器

3. 过渡动画效果：
   - 默认开启淡入淡出动画，可通过 `isEffect` 属性关闭
   - 动画持续时间可通过 `duration` 属性调整
   - 动画曲线可通过 `effect` 属性自定义

4. 性能优化建议：
   - 为图片设置固定宽高，避免布局抖动
   - 合理设置 `threshold` 值，平衡加载时机和性能
   - 对于大量图片的场景，建议结合分页加载使用
   - 确保图片资源经过优化，使用适当的压缩格式和尺寸

5. 占位图和错误图：
   - 默认提供base64编码的占位图和错误图，减少网络请求
   - 可根据设计需求自定义替换占位图和错误图
   - 建议使用体积较小的图片作为占位图

6. 事件处理：
   - `click` 事件会返回图片索引，便于区分不同图片
   - `load` 事件在图片加载成功时触发，可用于统计加载成功率
   - `error` 事件在图片加载失败时触发，可用于错误处理和上报