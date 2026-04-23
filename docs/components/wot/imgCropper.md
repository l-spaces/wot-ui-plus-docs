# ImgCropper 图片裁剪

## 组件概述

ImgCropper 图片裁剪组件用于图片的裁剪操作，支持自定义裁剪比例、旋转、缩放、导出质量等功能。通过弹出层展示裁剪界面，适用于头像上传、图片编辑等场景。

## 核心功能描述

- **自定义裁剪比例**：通过 `aspectRatio` 设置裁剪框宽高比
- **旋转控制**：通过 `disabledRotate` 禁用旋转，`setRoate` 方法控制旋转角度
- **缩放控制**：通过 `maxScale` 设置最大缩放比例
- **导出配置**：通过 `fileType`、`quality`、`exportScale` 配置导出图片
- **重置**：通过 `resetImg` 方法重置图片大小和角度

## 适用业务场景

- **头像上传**：裁剪头像图片
- **图片编辑**：裁剪和旋转图片
- **证件照**：按指定比例裁剪证件照

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | Boolean | false | 否 | 是否显示，支持 v-model 双向绑定 |
| imgSrc | String | '' | 否 | 图片源路径 |
| cancelButtonText | String | - | 否 | 取消按钮文案 |
| confirmButtonText | String | - | 否 | 确认按钮文案 |
| disabledRotate | Boolean | false | 否 | 是否禁用旋转 |
| fileType | String | 'png' | 否 | 目标文件的类型 |
| quality | Number | 1 | 否 | 生成的图片质量 |
| exportScale | Number | 2 | 否 | 设置导出图片尺寸 |
| imgWidth | Number / String | '' | 否 | 图片宽 |
| imgHeight | Number / String | '' | 否 | 图片高 |
| maxScale | Number | 3 | 否 | 最大缩放 |
| aspectRatio | String | '1:1' | 否 | 裁剪框宽高比，格式为 width:height |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| confirm | 确认裁剪时触发 | ({ tempFilePath, width, height }) | 裁剪后的临时文件路径和尺寸 |
| cancel | 取消裁剪时触发 | - | - |
| imgloaded | 图片加载完成时触发 | (res) | 加载结果 |
| imgloaderror | 图片加载失败时触发 | (err) | 错误信息 |

### Methods

| 方法名称 | 参数 | 返回值 | 说明 |
|---------|------|--------|------|
| revertIsAnimation | (animation: boolean) | void | 逆转是否使用动画 |
| setRoate | (angle: number) | void | 控制旋转角度 |
| resetImg | - | void | 初始化图片的大小和角度以及距离 |

## 使用示例

### 示例1：基础用法

选择图片后打开裁剪组件，确认裁剪获取结果。

```vue
<template>
  <wd-img-cropper v-model="show" :img-src="src" @confirm="handleConfirm" @cancel="handleCancel" />
  <view v-if="!imgSrc" class="upload-area" @click="upload">
    <wd-icon name="camera-filled" size="60px" color="#fff" />
  </view>
  <wd-img v-if="imgSrc" round width="200px" height="200px" :src="imgSrc" mode="aspectFit" @click="upload" />
  <view>点击上传头像</view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const src = ref('')
const imgSrc = ref('')
const show = ref(false)

function upload() {
  uni.chooseImage({
    count: 1,
    success: (res) => {
      src.value = res.tempFilePaths[0]
      show.value = true
    }
  })
}

function handleConfirm(event: any) {
  imgSrc.value = event.tempFilePath
}

function handleCancel() {
  console.log('取消裁剪')
}
</script>

<style lang="scss" scoped>
.upload-area {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.04);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
```

### 示例2：自定义裁剪比例

通过 `aspect-ratio` 设置不同的裁剪比例。

```vue
<template>
  <wd-img-cropper v-model="show" :img-src="src" aspect-ratio="3:2" @confirm="handleConfirm" @cancel="handleCancel" />
  <wd-button @click="upload">3:2 比例裁剪</wd-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const src = ref('')
const show = ref(false)

function upload() {
  uni.chooseImage({
    count: 1,
    success: (res) => {
      src.value = res.tempFilePaths[0]
      show.value = true
    }
  })
}

function handleConfirm(event: any) {
  console.log('裁剪结果:', event.tempFilePath)
}

function handleCancel() {
  console.log('取消裁剪')
}
</script>
```

### 示例3：裁剪后上传

裁剪确认后将图片上传到服务器。

```vue
<template>
  <wd-img-cropper v-model="show" :img-src="src" @confirm="handleConfirmUpload" @cancel="handleCancel" />
  <view v-if="!imgSrc" class="upload-area" @click="upload">
    <wd-icon name="camera-filled" size="60px" color="#fff" />
  </view>
  <wd-img v-if="imgSrc" round width="200px" height="200px" :src="imgSrc" mode="aspectFit" @click="upload" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const src = ref('')
const imgSrc = ref('')
const show = ref(false)

function upload() {
  uni.chooseImage({
    count: 1,
    success: (res) => {
      src.value = res.tempFilePaths[0]
      show.value = true
    }
  })
}

async function handleConfirmUpload(event: any) {
  const { tempFilePath } = event
  uni.uploadFile({
    url: 'https://your-upload-api.com/upload',
    filePath: tempFilePath,
    name: 'file',
    success: () => {
      imgSrc.value = tempFilePath
      uni.showToast({ title: '上传成功', icon: 'success' })
    },
    fail: () => {
      uni.showToast({ title: '上传失败', icon: 'error' })
    }
  })
}

function handleCancel() {
  console.log('取消裁剪')
}
</script>
```

## 注意事项

- `imgSrc` 需要在打开裁剪组件前设置图片路径
- `aspectRatio` 格式为 `width:height`，如 `1:1`、`3:2`、`16:9`
- `quality` 取值 0~1，值越大图片质量越高但文件越大
- `exportScale` 设置导出图片的缩放倍数
- 可通过 ref 调用 `resetImg` 方法重置裁剪状态
