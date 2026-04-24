# Swiper 轮播图

## 组件概况

Swiper 轮播图组件用于图片或内容的轮播展示，支持自动播放、循环、指示器、视频轮播、卡片样式、垂直方向、自定义指示器等功能。适用于首页 Banner、商品展示、广告轮播等场景。

## 核心功能描述

- **自动播放**：通过 `autoplay` 和 `interval` 控制自动轮播
- **循环播放**：通过 `loop` 控制是否循环
- **多种指示器**：支持 dots、dots-bar、fraction 三种指示器样式
- **视频轮播**：支持视频和图片混合轮播
- **卡片样式**：通过 `previousMargin` 和 `nextMargin` 实现卡片效果
- **垂直方向**：通过 `direction` 设置垂直轮播
- **自定义指示器**：通过 `indicator` 插槽自定义指示器
- **多滑块展示**：通过 `displayMultipleItems` 同时展示多个滑块

## 适用业务场景

- **首页 Banner**：商品推荐、活动广告轮播
- **商品展示**：商品图片轮播查看
- **内容展示**：新闻资讯、图片画廊轮播

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| list | Array | [] | 否 | 图片列表，支持字符串数组或对象数组 |
| autoplay | Boolean | true | 否 | 是否自动播放 |
| current | Number | 0 | 否 | 当前轮播项索引，支持 v-model:current |
| loop | Boolean | true | 否 | 是否循环播放 |
| interval | Number | 5000 | 否 | 轮播间隔时间（毫秒） |
| duration | Number | 300 | 否 | 滑动动画时长（毫秒） |
| direction | String | 'horizontal' | 否 | 轮播滑动方向，可选值：horizontal / vertical |
| indicator | Boolean / Object | true | 否 | 指示器配置，支持 type(dots/dots-bar/fraction) 和 showControls |
| indicatorPosition | String | 'bottom' | 否 | 指示器位置，可选值：left / top-left / top / top-right / bottom-left / bottom / bottom-right / right |
| height | Number / String | '192' | 否 | 轮播高度 |
| displayMultipleItems | Number | 1 | 否 | 同时显示的滑块数量 |
| previousMargin | Number / String | '0' | 否 | 前边距 |
| nextMargin | Number / String | '0' | 否 | 后边距 |
| imageMode | String | 'aspectFill' | 否 | 图片裁剪缩放模式 |
| valueKey | String | 'value' | 否 | 选项对象中 value 对应的 key |
| textKey | String | 'text' | 否 | 选项对象中标题 text 对应的 key |
| autoplayVideo | Boolean | true | 否 | 视频是否自动播放 |
| stopPreviousVideo | Boolean | true | 否 | 切换轮播项时是否停止上一个视频 |
| stopAutoplayWhenVideoPlay | Boolean | false | 否 | 视频播放时是否停止自动轮播 |
| videoLoop | Boolean | true | 否 | 视频是否循环播放 |
| muted | Boolean | true | 否 | 视频是否静音播放 |
| easingFunction | String | 'default' | 否 | 切换缓动动画类型 |
| customIndicatorClass | String | '' | 否 | 自定义指示器类名 |
| customImageClass | String | '' | 否 | 自定义图片类名 |
| customItemClass | String | '' | 否 | 自定义 swiper 子项类名 |
| snapToEdge | Boolean | false | 否 | 是否应用边距到第一个、最后一个元素 |
| adjustHeight | String | 'highest' | 否 | 自动以指定滑块的高度为容器高度，可选值：first / current / highest / none |
| adjustVerticalHeight | Boolean | false | 否 | vertical 为 true 时强制使 adjustHeight 生效 |
| customPrevImageClass | String | '' | 否 | 自定义上一个图片类名 |
| customNextImageClass | String | '' | 否 | 自定义下一个图片类名 |
| customPrevClass | String | '' | 否 | 自定义上一个子项类名 |
| customNextClass | String | '' | 否 | 自定义下一个子项类名 |
| customTextClass | String | '' | 否 | 自定义文字标题类名 |
| customTextStyle | String | '' | 否 | 自定义文字标题样式 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| click | 点击滑块时触发 | ({ index, item }) | 当前索引和项数据 |
| change | 轮播滑块切换时触发 | ({ current, source }) | 当前索引和触发来源 |
| animationfinish | 滑块动画结束时触发 | ({ current, source }) | 当前索引和触发来源 |
| update:current | 轮播项索引变化时触发 | `(current)` | 用于 v-model:current 双向绑定 |

### Slots

| 插槽名称 | 作用域参数 | 使用场景 |
|---------|-----------|---------|
| default | { item, index } | 自定义轮播项内容 |
| indicator | { current, total } | 自定义指示器内容 |

## 使用示例

### 示例1：基础用法

通过 `list` 传入图片列表，`indicator` 设置指示器类型。

```vue
<template>
  <wd-swiper
    :list="swiperList"
    autoplay
    v-model:current="current"
    :indicator="{ type: 'dots' }"
    @click="handleClick"
    @change="onChange"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const current = ref(0)
const swiperList = ref([
  'https://wot-ui-plus.cn/assets/redpanda.jpg',
  'https://wot-ui-plus.cn/assets/capybara.jpg',
  'https://wot-ui-plus.cn/assets/panda.jpg'
])

function handleClick(e: any) { console.log(e) }
function onChange(e: any) { console.log(e) }
</script>
```

### 示例2：卡片样式与多滑块

通过 `previous-margin` 和 `next-margin` 实现卡片效果，`display-multiple-items` 同时展示多个滑块。

```vue
<template>
  <wd-swiper
    autoplay
    :list="swiperList"
    previous-margin="24px"
    next-margin="24px"
    :indicator="{ type: 'dots' }"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const swiperList = ref([
  'https://wot-ui-plus.cn/assets/redpanda.jpg',
  'https://wot-ui-plus.cn/assets/capybara.jpg',
  'https://wot-ui-plus.cn/assets/panda.jpg',
  'https://wot-ui-plus.cn/assets/moon.jpg'
])
</script>
```

### 示例3：自定义指示器

通过 `indicator` 插槽自定义指示器内容。

```vue
<template>
  <wd-swiper
    :list="swiperList"
    autoplay
    direction="vertical"
    indicator-position="right"
  >
    <template #indicator="{ current, total }">
      <view style="position: absolute; bottom: 24rpx; right: 24rpx; padding: 0 12rpx; height: 48rpx; line-height: 48rpx; border-radius: 45%; background: rgba(0,0,0,0.6); color: #fff; font-size: 24rpx;">
        {{ current + 1 }}/{{ total }}
      </view>
    </template>
  </wd-swiper>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const swiperList = ref([
  'https://wot-ui-plus.cn/assets/redpanda.jpg',
  'https://wot-ui-plus.cn/assets/capybara.jpg',
  'https://wot-ui-plus.cn/assets/panda.jpg'
])
</script>
```

## 注意事项

- `list` 支持字符串数组（图片 URL）和对象数组（需配合 `valueKey` 和 `textKey`）
- `indicator` 传入对象可配置 type 和 showControls，type 可选 dots、dots-bar、fraction
- `loop` 为 false 时不循环播放，到达首尾会停止
- 视频轮播仅在微信小程序、H5 和钉钉小程序端支持
- `previousMargin` 和 `nextMargin` 用于实现卡片样式，需配合自定义图片样式
