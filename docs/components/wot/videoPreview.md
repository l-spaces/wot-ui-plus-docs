# VideoPreview 视频预览
<demo-model url="/subPages/videoPreview/Index"></demo-model>

## 组件概况

### 组件概述
VideoPreview 是一个用于视频预览的组件，它提供了一个全屏弹窗来播放视频，支持视频控制、封面显示和标题设置，适用于各种需要视频预览的场景。

### 详细功能描述
- 全屏弹窗视频播放
- 支持视频控制（播放/暂停、进度条、音量等）
- 支持自定义视频封面
- 支持设置视频标题
- 提供打开和关闭方法
- 支持自定义样式

### 适用业务场景
- 图片或视频列表中的视频预览
- 详情页中的视频放大查看
- 任何需要全屏播放视频的场景

## 完整API参考

### Props

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |

### Events

该组件没有自定义事件。

### Methods

| 方法名 | 参数 | 返回值 | 功能说明 |
|--------|------|--------|----------|
| open | video（视频对象，包含url、poster、title属性） | 无 | 打开视频预览弹窗 |
| close | 无 | 无 | 关闭视频预览弹窗 |

### Slots

该组件没有插槽。

## 多场景使用示例代码

### 基础用法

```vue
<template>
  <view>
    <wd-button type="primary" @click="openVideoPreview">预览视频</wd-button>
    <wd-video-preview ref="videoPreviewRef" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const videoPreviewRef = ref(null)

const openVideoPreview = () => {
  videoPreviewRef.value?.open({
    url: 'https://example.com/video.mp4',
    poster: 'https://example.com/poster.jpg',
    title: '示例视频'
  })
}
</script>
```

### 从列表中预览视频

```vue
<template>
  <view>
    <view class="video-list">
      <view 
        class="video-item" 
        v-for="(video, index) in videoList" 
        :key="index"
        @click="openVideo(video)"
      >
        <image :src="video.poster" class="video-poster" />
        <wd-icon name="play-circle" class="play-icon" />
        <text class="video-title">{{ video.title }}</text>
      </view>
    </view>
    <wd-video-preview ref="videoPreviewRef" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const videoPreviewRef = ref(null)

const videoList = ref([
  {
    url: 'https://example.com/video1.mp4',
    poster: 'https://example.com/poster1.jpg',
    title: '视频1'
  },
  {
    url: 'https://example.com/video2.mp4',
    poster: 'https://example.com/poster2.jpg',
    title: '视频2'
  },
  {
    url: 'https://example.com/video3.mp4',
    poster: 'https://example.com/poster3.jpg',
    title: '视频3'
  }
])

const openVideo = (video) => {
  videoPreviewRef.value?.open(video)
}
</script>

<style scoped>
.video-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
}

.video-item {
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  background-color: #f0f0f0;
}

.video-poster {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.play-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 48px;
  color: white;
}

.video-title {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 14px;
}
</style>
```

### 结合Upload组件使用

```vue
<template>
  <view>
    <wd-upload 
      action="https://api.example.com/upload" 
      v-model:fileList="fileList"
      accept="video"
      @success="onUploadSuccess"
    />
    <wd-video-preview ref="videoPreviewRef" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const videoPreviewRef = ref(null)
const fileList = ref([])

const onUploadSuccess = (res) => {
  console.log('上传成功', res)
}

// 预览已上传的视频
const previewUploadedVideo = (video) => {
  videoPreviewRef.value?.open({
    url: video.url,
    poster: video.thumb || '',
    title: video.name || '上传的视频'
  })
}
</script>
```

## 样式定制指南

### 自定义弹窗样式

```vue
<template>
  <view>
    <wd-button type="primary" @click="openCustomVideoPreview">自定义样式预览</wd-button>
    <wd-video-preview 
      ref="customVideoPreviewRef" 
      custom-class="custom-video-preview"
      custom-style="background-color: rgba(0, 0, 0, 0.8);"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const customVideoPreviewRef = ref(null)

const openCustomVideoPreview = () => {
  customVideoPreviewRef.value?.open({
    url: 'https://example.com/video.mp4',
    poster: 'https://example.com/poster.jpg',
    title: '自定义样式视频'
  })
}
</script>

<style scoped>
/* 自定义关闭按钮样式 */
.custom-video-preview {
  .wd-video-preview__close {
    top: 30px;
    right: 30px;
    font-size: 32px;
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    padding: 8px;
  }
}
</style>
```

## 注意事项

1. **视频格式支持**：不同平台对视频格式的支持有所差异，请确保使用各平台兼容的视频格式，如MP4。
2. **视频资源地址**：视频URL必须是完整的网络地址，确保可以直接访问。
3. **封面图片**：建议为视频设置合适的封面图片，提升用户体验。
4. **性能优化**：对于大体积视频，建议进行适当压缩，提高加载速度。
5. **自动播放**：根据浏览器和平台政策，视频默认不会自动播放，需要用户手动点击播放按钮。
6. **跨域问题**：确保视频资源支持跨域访问，否则可能无法正常播放。
7. **权限问题**：在移动设备上，播放视频可能需要获取相应的权限，如网络权限。