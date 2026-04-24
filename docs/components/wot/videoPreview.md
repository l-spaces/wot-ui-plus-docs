# VideoPreview 视频预览

## 组件概况

VideoPreview 视频预览组件用于视频的全屏预览播放，支持自定义标题、封面图等功能。通过 ref 调用 `open` 方法打开预览，`close` 方法关闭预览。通常与 Upload 组件配合使用。

## 核心功能描述

- **全屏预览**：弹出层全屏播放视频
- **自定义标题**：通过 `open` 方法传入标题
- **封面图**：通过 `open` 方法传入封面图
- **手动控制**：通过 `open` 和 `close` 方法控制显隐

## 适用业务场景

- **视频上传预览**：上传后预览视频内容
- **视频播放**：点击视频缩略图全屏播放
- **视频列表**：列表中点击视频预览播放

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Methods

| 方法名称 | 参数 | 返回值 | 说明 |
|---------|------|--------|------|
| open | (video: PreviewVideo) | void | 打开视频预览，PreviewVideo 包含 url、poster?、title? |
| close | - | void | 关闭视频预览 |

## 使用示例

### 示例1：基础用法

通过 ref 调用 `open` 方法打开视频预览。

```vue
<template>
  <wd-video-preview ref="videoPreview" />
  <wd-button @click="openVideo">预览视频</wd-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { VideoPreviewInstance } from '@/uni_modules/wot-ui-plus/components/wd-video-preview/types'

const videoPreview = ref<VideoPreviewInstance>()

function openVideo() {
  videoPreview.value?.open({
    url: 'https://unpkg.com/wot-ui-plus-assets@1.0.3/VID_115503.mp4'
  })
}
</script>
```

### 示例2：带封面和标题

通过 `open` 方法传入 `poster` 和 `title` 参数。

```vue
<template>
  <wd-video-preview ref="videoPreview" />
  <wd-button @click="openVideo">预览视频</wd-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { VideoPreviewInstance } from '@/uni_modules/wot-ui-plus/components/wd-video-preview/types'

const videoPreview = ref<VideoPreviewInstance>()

function openVideo() {
  videoPreview.value?.open({
    url: 'https://unpkg.com/wot-ui-plus-assets@1.0.3/VID_115503.mp4',
    poster: 'https://wot-ui-plus.cn/assets/redpanda.jpg',
    title: '示例视频'
  })
}
</script>
```

### 示例3：手动关闭

通过 `close` 方法手动关闭视频预览。

```vue
<template>
  <wd-video-preview ref="videoPreview" />
  <wd-button @click="openVideo">打开视频</wd-button>
  <wd-button @click="closeVideo">关闭视频</wd-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { VideoPreviewInstance } from '@/uni_modules/wot-ui-plus/components/wd-video-preview/types'

const videoPreview = ref<VideoPreviewInstance>()

function openVideo() {
  videoPreview.value?.open({
    url: 'https://unpkg.com/wot-ui-plus-assets@1.0.3/VID_115503.mp4'
  })
}

function closeVideo() {
  videoPreview.value?.close()
}
</script>
```

## 注意事项

- VideoPreview 组件通常与 Upload 组件配合使用，内嵌在 Upload 中
- `open` 方法的参数 `url` 为必填，`poster` 和 `title` 为可选
- 视频预览为全屏弹出层模式
- 需通过 ref 获取组件实例后调用方法
