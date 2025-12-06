# Swiper 轮播
<demo-model url="/subPages/swiper/Index"></demo-model>

## 组件概况

### 组件概述
Swiper 是轮播组件，用于实现图片、视频等内容的轮播展示。它支持自动播放、循环播放、自定义指示器、垂直轮播等功能，支持图片和视频混合轮播，适用于各种需要轮播展示的场景。

### 详细功能描述
- 支持图片和视频轮播
- 支持自动播放和手动切换
- 支持循环播放
- 支持水平和垂直两种方向
- 支持自定义指示器样式和位置
- 支持前后边距设置
- 支持同时显示多个轮播项
- 支持视频自动播放和静音播放
- 支持自定义样式和类名
- 支持自定义内容插槽
- 跨平台兼容

### 适用业务场景
- 首页轮播图
- 商品详情页轮播图
- 视频轮播展示
- 图片画廊
- 广告轮播
- 任何需要轮播展示的场景

## 完整API参考

### Props属性

| 名称                      | 类型           | 默认值     | 必填 | 描述                                                                                               |
| ------------------------- | -------------- | ---------- | ---- | -------------------------------------------------------------------------------------------------- |
| autoplay                  | boolean        | true       | 否   | 是否自动播放轮播图                                                                                 |
| current                   | number         | 0          | 否   | 当前轮播在哪一项（下标）                                                                           |
| direction                 | string         | horizontal | 否   | 轮播滑动方向，可选值：horizontal（水平）、vertical（垂直）                                         |
| displayMultipleItems      | number         | 1          | 否   | 同时显示的滑块数量                                                                                 |
| duration                  | number         | 300        | 否   | 滑动动画时长，单位为毫秒                                                                           |
| easingFunction            | string         | default    | 否   | 指定 swiper 切换缓动动画类型，可选值：default、linear、easeInCubic、easeOutCubic、easeInOutCubic   |
| height                    | number/string  | 192        | 否   | 轮播的高度                                                                                         |
| interval                  | number         | 5000       | 否   | 轮播间隔时间，单位为毫秒                                                                           |
| list                      | array          | []         | 否   | 轮播项列表，可以是字符串数组或对象数组                                                             |
| loop                      | boolean        | true       | 否   | 是否循环播放轮播图                                                                                 |
| videoLoop                 | boolean        | true       | 否   | 视频是否循环播放                                                                                   |
| muted                     | boolean        | true       | 否   | 视频是否静音播放                                                                                   |
| nextMargin                | number/string  | 0          | 否   | 后边距                                                                                             |
| indicatorPosition         | string         | bottom     | 否   | 页码信息展示位置，可选值：left、top-left、top、top-right、bottom-left、bottom、bottom-right、right |
| previousMargin            | number/string  | 0          | 否   | 前边距                                                                                             |
| snapToEdge                | boolean        | false      | 否   | 是否应用边距到第一个、最后一个元素                                                                 |
| indicator                 | boolean/object | true       | 否   | 指示器全部配置，可以是布尔值或指示器配置对象                                                       |
| imageMode                 | string         | aspectFill | 否   | 图片裁剪、缩放的模式                                                                               |
| valueKey                  | string         | value      | 否   | 选项对象中，value 对应的 key                                                                       |
| textKey                   | string         | text       | 否   | 选项对象中，标题 text 对应的 key                                                                   |
| autoplayVideo             | boolean        | true       | 否   | 视频是否自动播放                                                                                   |
| stopPreviousVideo         | boolean        | true       | 否   | 切换轮播项时是否停止上一个视频的播放                                                               |
| stopAutoplayWhenVideoPlay | boolean        | false      | 否   | 视频播放时是否停止自动轮播                                                                         |
| adjustHeight              | string         | highest    | 否   | 自动以指定滑块的高度为整个容器的高度，仅支付宝小程序支持，可选值：first、current、highest、none    |
| adjustVerticalHeight      | boolean        | false      | 否   | vertical 为 true 时强制使 adjust-height 生效，仅支付宝小程序支持                                   |
| customIndicatorClass      | string         | -          | 否   | 自定义指示器类名                                                                                   |
| customImageClass          | string         | -          | 否   | 自定义图片类名                                                                                     |
| customPrevImageClass      | string         | -          | 否   | 自定义上一个图片类名                                                                               |
| customNextImageClass      | string         | -          | 否   | 自定义下一个图片类名                                                                               |
| customItemClass           | string         | -          | 否   | 自定义swiper子项类名                                                                               |
| customPrevClass           | string         | -          | 否   | 自定义上一个子项类名                                                                               |
| customNextClass           | string         | -          | 否   | 自定义下一个子项类名                                                                               |
| customTextClass           | string         | -          | 否   | 自定义文字标题类名                                                                                 |
| customTextStyle           | string         | -          | 否   | 自定义文字标题样式                                                                                 |
| customStyle               | string         | -          | 否   | 自定义根节点样式                                                                                   |
| customClass               | string         | -          | 否   | 自定义根节点样式类                                                                                 |

### Events事件

| 事件名          | 触发条件             | 参数说明                                                                   |
| --------------- | -------------------- | -------------------------------------------------------------------------- |
| click           | 点击轮播项时         | `{ index: 点击的滑块下标, item: 点击的滑块内容 }`                            |
| change          | 轮播项切换时         | `{ current: 当前轮播项索引, source: 切换方式（autoplay、touch、navigate） }` |
| animationfinish | 轮播项切换动画结束时 | `{ current: 当前轮播项索引, source: 切换方式（autoplay、touch、navigate） }` |
| update:current  | 轮播项索引变化时     | value: 新的轮播项索引                                                      |

### Methods方法

该组件没有对外暴露的方法。

### Slots插槽

| 插槽名    | 作用域变量         | 使用说明                                                  |
| --------- | ------------------ | --------------------------------------------------------- |
| default   | `{ item, index }`    | 自定义轮播项内容，item 为当前轮播项数据，index 为当前索引 |
| indicator | `{ current, total }` | 自定义指示器，current 为当前索引，total 为总数量          |

## 多场景使用示例代码

### 1. 基础用法

```vue
<template>
  <view class="swiper-demo">
    <wd-swiper :list="imageList" height="300"></wd-swiper>
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

<style scoped>
.swiper-demo {
  padding: 20rpx;
  background-color: #f5f5f5;
}
</style>
```

### 2. 图片和视频混合轮播

```vue
<template>
  <view class="swiper-demo">
    <wd-swiper :list="mixedList" height="400"></wd-swiper>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const mixedList = ref([
  { value: 'https://example.com/image1.jpg', type: 'image' },
  { 
    value: 'https://example.com/video1.mp4', 
    type: 'video',
    poster: 'https://example.com/poster1.jpg'
  },
  { value: 'https://example.com/image2.jpg', type: 'image' }
])
</script>

<style scoped>
.swiper-demo {
  padding: 20rpx;
  background-color: #f5f5f5;
}
</style>
```

### 3. 垂直轮播

```vue
<template>
  <view class="swiper-demo">
    <wd-swiper 
      :list="verticalList" 
      direction="vertical" 
      height="200" 
      :indicator-position="'right'"
      :display-multiple-items="2"
    ></wd-swiper>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const verticalList = ref([
  { value: 'https://example.com/image1.jpg', text: '轮播项 1' },
  { value: 'https://example.com/image2.jpg', text: '轮播项 2' },
  { value: 'https://example.com/image3.jpg', text: '轮播项 3' },
  { value: 'https://example.com/image4.jpg', text: '轮播项 4' }
])
</script>

<style scoped>
.swiper-demo {
  padding: 20rpx;
  background-color: #f5f5f5;
}
</style>
```

### 4. 自定义指示器

```vue
<template>
  <view class="swiper-demo">
    <wd-swiper :list="imageList" height="300">
      <template #indicator="{ current, total }">
        <view class="custom-indicator">
          <text class="indicator-text">{{ current + 1 }} / {{ total }}</text>
        </view>
      </template>
    </wd-swiper>
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

<style scoped>
.swiper-demo {
  padding: 20rpx;
  background-color: #f5f5f5;
}

.custom-indicator {
  position: absolute;
  bottom: 20rpx;
  right: 20rpx;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  padding: 10rpx 20rpx;
  border-radius: 20rpx;
  font-size: 24rpx;
}
</style>
```

### 5. 自定义轮播项内容

```vue
<template>
  <view class="swiper-demo">
    <wd-swiper :list="customList" height="300">
      <template #default="{ item, index }">
        <view class="custom-swiper-item">
          <image :src="item.image" mode="aspectFill" class="custom-image"></image>
          <view class="custom-content">
            <text class="custom-title">{{ item.title }}</text>
            <text class="custom-desc">{{ item.desc }}</text>
            <wd-button size="small" type="primary" @click="handleButtonClick(index)">查看详情</wd-button>
          </view>
        </view>
      </template>
    </wd-swiper>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const customList = ref([
  {
    image: 'https://example.com/image1.jpg',
    title: '轮播项 1',
    desc: '这是第一个自定义轮播项'
  },
  {
    image: 'https://example.com/image2.jpg',
    title: '轮播项 2',
    desc: '这是第二个自定义轮播项'
  },
  {
    image: 'https://example.com/image3.jpg',
    title: '轮播项 3',
    desc: '这是第三个自定义轮播项'
  }
])

const handleButtonClick = (index: number) => {
  console.log('点击了第', index + 1, '个轮播项的按钮')
}
</script>

<style scoped>
.swiper-demo {
  padding: 20rpx;
  background-color: #f5f5f5;
}

.custom-swiper-item {
  position: relative;
  height: 300rpx;
  overflow: hidden;
  border-radius: 12rpx;
}

.custom-image {
  width: 100%;
  height: 100%;
}

.custom-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 30rpx;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  color: #fff;
}

.custom-title {
  display: block;
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
}

.custom-desc {
  display: block;
  font-size: 24rpx;
  margin-bottom: 20rpx;
  opacity: 0.9;
}
</style>
```

## 样式定制指南

### 1. 使用customStyle自定义样式

```vue
<template>
  <wd-swiper 
    :list="imageList" 
    height="300"
    customStyle="border-radius: 16rpx; overflow: hidden; box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);"
  ></wd-swiper>
</template>
```

### 2. 使用customClass自定义类名

```vue
<template>
  <wd-swiper 
    :list="imageList" 
    height="300"
    customClass="my-swiper"
  ></wd-swiper>
</template>

<style scoped>
:deep(.my-swiper) {
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
}
</style>
```

### 3. 自定义指示器样式

```vue
<template>
  <wd-swiper 
    :list="imageList" 
    height="300"
    :indicator="{ type: 'dots', showControls: true }"
    customIndicatorClass="my-indicator"
  ></wd-swiper>
</template>

<style scoped>
:deep(.my-indicator .wd-swiper-nav__dots-item) {
  width: 16rpx;
  height: 16rpx;
  margin: 0 8rpx;
}

:deep(.my-indicator .wd-swiper-nav__dots-item.active) {
  background-color: #1989fa;
  width: 32rpx;
  border-radius: 8rpx;
}
</style>
```

### 4. 自定义轮播项样式

```vue
<template>
  <wd-swiper 
    :list="imageList" 
    height="300"
    customItemClass="my-swiper-item"
  ></wd-swiper>
</template>

<style scoped>
:deep(.my-swiper-item) {
  border-radius: 16rpx;
  overflow: hidden;
}

:deep(.my-swiper-item image) {
  border-radius: 16rpx;
}
</style>
```

## 注意事项

1. **轮播数据格式**：
   - 可以是字符串数组，直接存放图片或视频URL
   - 也可以是对象数组，每个对象包含value（URL）、type（类型）、poster（视频封面）等属性

2. **视频轮播**：
   - 视频默认静音播放，可以通过muted属性控制
   - 视频默认自动播放，可以通过autoplayVideo属性控制
   - 切换轮播项时会自动停止上一个视频，可以通过stopPreviousVideo属性控制

3. **自动播放**：
   - 默认自动播放，可以通过autoplay属性关闭
   - 视频播放时可以设置停止自动轮播，通过stopAutoplayWhenVideoPlay属性控制

4. **高度设置**：
   - 建议显式设置height属性，确保轮播组件正常显示
   - height属性支持数字和字符串格式，默认单位为px

5. **指示器配置**：
   - indicator属性可以是布尔值，控制指示器显示与否
   - 也可以是对象，配置指示器类型、位置等
   - 支持自定义指示器，通过indicator插槽实现

6. **性能优化**：
   - 避免轮播项过多，建议控制在5-10个以内
   - 图片和视频URL建议使用CDN加速
   - 视频建议使用适当的压缩格式和分辨率

7. **跨平台兼容性**：
   - 组件在H5、App和小程序平台表现一致
   - 在微信小程序平台，组件内部使用scroll-view包裹，以解决某些机型的滑动问题

8. **事件处理**：
   - change事件在轮播项切换时触发
   - animationfinish事件在轮播动画结束时触发
   - 可以根据需要选择使用

9. **自定义内容**：
   - 通过default插槽可以完全自定义轮播项内容
   - 可以在插槽中使用任意组件和样式

10. **指示器位置**：
    - 可以通过indicatorPosition属性设置指示器位置
    - 支持8种位置：left、top-left、top、top-right、bottom-left、bottom、bottom-right、right