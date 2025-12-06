# ImgCropper 图片裁剪

<demo-model url="/subPages/imgCropper/Index"></demo-model>


## 组件概况

### 组件概述
ImgCropper 是一个功能强大的图片裁剪组件，支持图片缩放、旋转、移动等操作，可用于头像裁剪、图片编辑等场景。它提供了直观的裁剪界面和丰富的配置选项，支持自定义裁剪框比例、导出图片质量等。

### 核心功能
- 支持图片缩放、旋转、移动
- 支持自定义裁剪框宽高比
- 支持多种导出图片格式
- 支持导出图片质量设置
- 支持导出图片缩放比例
- 支持禁用旋转功能
- 支持自定义按钮文案

### 适用业务场景
- 用户头像裁剪
- 商品图片编辑
- 图片上传前裁剪
- 证件照裁剪
- 自定义比例图片裁剪

## 完整API参考

### Props
| 名称 | 类型 | 默认值 | 必填项 | 描述 |
| --- | --- | --- | --- | --- |
| modelValue | boolean | false | 否 | 打开图片裁剪组件 |
| cancelButtonText | string | - | 否 | 取消按钮文案 |
| confirmButtonText | string | - | 否 | 确认按钮文案 |
| disabledRotate | boolean | false | 否 | 是否禁用旋转 |
| fileType | string | 'png' | 否 | 目标文件的类型，可选值：png / jpg / jpeg |
| quality | number | 1 | 否 | 生成的图片质量，范围：0-1 |
| exportScale | number | 2 | 否 | 设置导出图片尺寸缩放比例 |
| imgSrc | string | '' | 否 | 图片源路径 |
| imgWidth | number / string | '' | 否 | 图片宽度 |
| imgHeight | number / string | '' | 否 | 图片高度 |
| maxScale | number | 3 | 否 | 最大缩放倍数 |
| aspectRatio | string | '1:1' | 否 | 裁剪框宽高比，格式为 width:height |
| customStyle | string | '' | 否 | 自定义样式，对象格式 |
| customClass | string | '' | 否 | 自定义类名 |

### Events
| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| imgloaded | 图片加载完成时触发 | res: 图片信息 |
| imgloaderror | 图片加载失败时触发 | err: 错误信息 |
| cancel | 取消裁剪时触发 | - |
| confirm | 完成裁剪时触发 | result: { tempFilePath: 裁剪后的图片临时路径, width: 图片宽度, height: 图片高度 } |
| update:modelValue | 组件显示/隐藏状态变化时触发 | visible: 组件是否可见 |

### Methods
| 方法名 | 参数 | 返回值 | 功能说明 |
| --- | --- | --- | --- |
| revertIsAnimation | animation: boolean | void | 逆转是否使用动画 |
| resetImg | - | void | 初始化图片的大小和角度以及距离 |
| setRoate | angle: number | void | 控制旋转角度 |

### Slots
ImgCropper 组件不包含插槽。

## 多场景使用示例代码

### 基础用法

```vue
<template>
  <view>
    <wd-button @click="showCropper = true">打开裁剪</wd-button>
    <wd-img-cropper 
      v-model="showCropper" 
      :img-src="imageSrc"
      @confirm="handleConfirm"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showCropper = ref(false)
const imageSrc = 'https://example.com/image.jpg'

const handleConfirm = (result: any) => {
  console.log('裁剪结果:', result)
  // result.tempFilePath 为裁剪后的图片临时路径
}
</script>
```

### 自定义裁剪比例

```vue
<template>
  <view>
    <wd-button @click="showCropper = true">打开裁剪</wd-button>
    <wd-img-cropper 
      v-model="showCropper" 
      :img-src="imageSrc"
      aspect-ratio="4:3"
      @confirm="handleConfirm"
    />
  </view>
</template>
```

### 头像裁剪（1:1比例）

```vue
<template>
  <view>
    <wd-button @click="showCropper = true">更换头像</wd-button>
    <wd-img-cropper 
      v-model="showCropper" 
      :img-src="imageSrc"
      aspect-ratio="1:1"
      :quality="0.9"
      :export-scale="3"
      :disabled-rotate="false"
      cancel-button-text="取消"
      confirm-button-text="确定"
      @confirm="handleAvatarConfirm"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showCropper = ref(false)
const imageSrc = 'https://example.com/avatar.jpg'

const handleAvatarConfirm = (result: any) => {
  console.log('头像裁剪结果:', result)
  // 上传裁剪后的头像
  // uploadAvatar(result.tempFilePath)
}
</script>
```

### 禁用旋转功能

```vue
<template>
  <view>
    <wd-button @click="showCropper = true">打开裁剪</wd-button>
    <wd-img-cropper 
      v-model="showCropper" 
      :img-src="imageSrc"
      :disabled-rotate="true"
      aspect-ratio="3:2"
      @confirm="handleConfirm"
    />
  </view>
</template>
```

### 自定义导出配置

```vue
<template>
  <view>
    <wd-button @click="showCropper = true">打开裁剪</wd-button>
    <wd-img-cropper 
      v-model="showCropper" 
      :img-src="imageSrc"
      file-type="jpg"
      :quality="0.8"
      :export-scale="2"
      aspect-ratio="16:9"
      @confirm="handleConfirm"
    />
  </view>
</template>
```

## 样式定制指南

### 使用 customStyle 自定义样式

```vue
<template>
  <wd-img-cropper 
    v-model="showCropper" 
    :img-src="imageSrc"
    :custom-style="{
      '--wd-img-cropper-background': 'rgba(0, 0, 0, 0.85)',
      '--wd-img-cropper-action-color': '#1989fa'
    }"
    @confirm="handleConfirm"
  />
</template>
```

### 使用 customClass 自定义类名

```vue
<template>
  <wd-img-cropper 
    v-model="showCropper" 
    :img-src="imageSrc"
    custom-class="my-cropper"
    @confirm="handleConfirm"
  />
</template>

<style scoped>
.my-cropper {
  /* 自定义样式 */
}
</style>
```

## 注意事项

1. **组件触发**：通过 v-model 控制组件的显示和隐藏，设置 modelValue 为 true 打开裁剪组件。

2. **图片源路径**：imgSrc 属性支持本地图片路径和网络图片路径，但网络图片需要确保能正常访问。

3. **裁剪框比例**：aspectRatio 属性用于设置裁剪框的宽高比，格式为 "width:height"，如 "1:1"、"4:3"、"16:9" 等。

4. **导出图片配置**：
   - fileType：支持 png、jpg、jpeg 格式，默认为 png
   - quality：图片质量，范围 0-1，值越大质量越高
   - exportScale：导出图片的缩放比例，值越大导出图片尺寸越大

5. **旋转功能**：disabledRotate 属性为 true 时，将禁用图片旋转功能。

6. **最大缩放**：maxScale 属性用于限制图片的最大缩放倍数，防止过度缩放导致图片模糊。

7. **事件处理**：
   - imgloaded：图片加载完成后触发，可用于初始化操作
   - imgloaderror：图片加载失败时触发，可用于错误处理
   - cancel：用户点击取消按钮时触发
   - confirm：用户点击确认按钮完成裁剪时触发，返回裁剪结果

8. **性能优化**：
   - 避免使用过大的原始图片，建议先压缩后再进行裁剪
   - 根据实际需求设置合适的 exportScale，避免导出过大的图片
   - 合理设置 quality，平衡图片质量和文件大小

9. **平台兼容性**：
   - 该组件基于 Canvas 实现，需要确保运行环境支持 Canvas
   - 在不同平台上，Canvas 的实现可能存在差异，建议在各平台进行测试

10. **组件方法**：
    - 通过 ref 可以调用组件的方法，如 setRoate、resetImg 等
    - 调用方法前需确保组件已正确加载和初始化