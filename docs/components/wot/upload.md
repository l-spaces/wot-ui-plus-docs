# Upload 上传
<demo-model url="/subPages/upload/Index"></demo-model>

## 组件概况

### 组件概述
Upload 是一个用于文件上传的组件，支持图片、视频、文件等多种类型的上传，提供了丰富的配置选项和事件回调，可满足不同场景下的文件上传需求。

### 详细功能描述
- 支持多种文件类型上传：图片、视频、媒体、文件、全部类型
- 支持多选和单选上传
- 支持文件大小限制和格式过滤
- 支持上传进度显示
- 支持自动上传和手动触发上传
- 支持文件预览和删除
- 支持自定义上传按钮和预览样式
- 提供丰富的事件回调
- 支持跨平台使用

### 适用业务场景
- 表单中的文件上传
- 图片库、相册上传
- 视频上传和分享
- 文档管理系统
- 任何需要文件上传功能的场景

## 完整API参考

### Props

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| fileList | array | [] | 否 | 上传的文件列表，例如: [{name:'food.jpg',url:'https://xxx.cdn.com/xxx.jpg'}] |
| action | string | '' | 是 | 上传的地址 |
| header | object | {} | 否 | 设置上传的请求头部 |
| multiple | boolean | false | 否 | 是否支持多选文件 |
| disabled | boolean | false | 否 | 是否禁用 |
| limit | number | undefined | 否 | 最大允许上传个数 |
| showLimitNum | boolean | true | 否 | 限制上传个数的情况下，是否展示当前上传的个数 |
| maxSize | number | Number.MAX_VALUE | 否 | 文件大小限制，单位为byte |
| sourceType | array | ['album', 'camera'] | 否 | 选择图片的来源 |
| sizeType | array | ['original', 'compressed'] | 否 | 所选的图片的尺寸 |
| name | string | 'file' | 否 | HTTP请求中文件对应的key |
| formData | object | {} | 否 | HTTP请求中其他额外的formdata |
| onPreviewFail | function | - | 否 | 预览失败执行操作 |
| beforeUpload | function | - | 否 | 上传文件之前的钩子 |
| beforeChoose | function | - | 否 | 选择图片之前的钩子 |
| beforeRemove | function | - | 否 | 删除文件之前的钩子 |
| beforePreview | function | - | 否 | 图片预览前的钩子 |
| buildFormData | function | - | 否 | 构建上传formData的钩子 |
| loadingType | string | 'ring' | 否 | 加载中图标类型 |
| loadingColor | string | '#ffffff' | 否 | 加载中图标颜色 |
| accept | string | 'image' | 否 | 文件类型，可选值：'image' | 'video' | 'media' | 'all' | 'file' |
| statusKey | string | 'status' | 否 | file数据结构中，status对应的key |
| loadingSize | string | '24px' | 否 | 加载中图标尺寸 |
| compressed | boolean | true | 否 | 是否压缩视频，当accept为video时生效 |
| maxDuration | number | 60 | 否 | 拍摄视频最长拍摄时间，当accept为video | media时生效，单位秒 |
| camera | string | 'back' | 否 | 使用前置或者后置相机，当accept为video | media时生效，可选值为：back｜front |
| imageMode | string | 'aspectFit' | 否 | 预览图片的mode属性 |
| successStatus | number | 200 | 否 | 接口响应的成功状态（statusCode）值 |
| customEvokeClass | string | '' | 否 | 自定义上传按钮样式 |
| customPreviewClass | string | '' | 否 | 自定义预览图片列表样式 |
| autoUpload | boolean | true | 否 | 是否选择文件后自动上传 |
| reupload | boolean | false | 否 | 点击已上传时是否可以重新上传 |
| uploadMethod | function | - | 否 | 自定义上传文件的请求方法 |
| extension | array | undefined | 否 | 根据文件拓展名过滤，H5、微信小程序支持 |
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |

### Events

| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| fail | 上传失败时 | { error: 错误信息, file: 当前文件对象, formData: 表单数据 } |
| change | 文件列表变化时 | { fileList: 文件列表 } |
| success | 上传成功时 | { file: 当前文件对象, fileList: 文件列表, formData: 表单数据 } |
| progress | 上传进度变化时 | { response: 进度信息, file: 当前文件对象 } |
| oversize | 文件大小超过限制时 | { file: 文件对象 } |
| chooseerror | 选择文件失败时 | { error: 错误信息 } |
| remove | 删除文件时 | { file: 删除的文件对象 } |
| update:fileList | 文件列表变化时（受控模式） | 文件列表 |

### Methods

| 方法名 | 参数 | 返回值 | 功能说明 |
|--------|------|--------|----------|
| submit | 无 | 无 | 手动触发上传 |
| abort | task（可选） | 无 | 取消上传 |

### Slots

| 插槽名 | 作用域变量 | 使用说明 |
|--------|------------|----------|
| default | 无 | 自定义上传按钮 |
| preview-cover | file（当前文件对象）、index（索引） | 自定义预览覆盖层 |

## 多场景使用示例代码

### 基础用法

```vue
<template>
  <view>
    <wd-upload 
      action="https://api.example.com/upload" 
      v-model:fileList="fileList"
      @success="onSuccess"
      @fail="onFail"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const fileList = ref([])

const onSuccess = (res) => {
  console.log('上传成功', res)
}

const onFail = (res) => {
  console.log('上传失败', res)
}
</script>
```

### 多选上传

```vue
<template>
  <view>
    <wd-upload 
      action="https://api.example.com/upload" 
      v-model:fileList="multipleFileList"
      :multiple="true"
      :limit="5"
      @success="onMultipleSuccess"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const multipleFileList = ref([])

const onMultipleSuccess = (res) => {
  console.log('多选上传成功', res)
}
</script>
```

### 手动触发上传

```vue
<template>
  <view>
    <wd-upload 
      ref="uploadRef"
      action="https://api.example.com/upload" 
      v-model:fileList="manualFileList"
      :autoUpload="false"
    />
    <wd-button type="primary" @click="handleSubmit">手动上传</wd-button>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const manualFileList = ref([])
const uploadRef = ref(null)

const handleSubmit = () => {
  uploadRef.value?.submit()
}
</script>
```

### 自定义上传样式

```vue
<template>
  <view>
    <wd-upload 
      action="https://api.example.com/upload" 
      v-model:fileList="customStyleFileList"
      custom-evoke-class="custom-upload-btn"
    >
      <view class="custom-btn">
        <wd-icon name="plus" size="24" color="#409eff" />
        <text class="btn-text">点击上传</text>
      </view>
    </wd-upload>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const customStyleFileList = ref([])
</script>

<style scoped>
.custom-upload-btn {
  width: 120px;
  height: 120px;
  border: 2px dashed #d9d9d9;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fafafa;
}

.custom-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.btn-text {
  font-size: 14px;
  color: #606266;
}
</style>
```

### 上传视频

```vue
<template>
  <view>
    <wd-upload 
      action="https://api.example.com/upload" 
      v-model:fileList="videoFileList"
      accept="video"
      :maxDuration="30"
      :camera="'front'"
      @success="onVideoSuccess"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const videoFileList = ref([])

const onVideoSuccess = (res) => {
  console.log('视频上传成功', res)
}
</script>
```

## 样式定制指南

### 自定义上传按钮

```vue
<template>
  <view>
    <wd-upload 
      action="https://api.example.com/upload" 
      v-model:fileList="customBtnFileList"
      custom-evoke-class="my-upload-btn"
    >
      <wd-button type="primary" size="small">
        <wd-icon name="upload" size="16" />
        <text>选择文件</text>
      </wd-button>
    </wd-upload>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const customBtnFileList = ref([])
</script>

<style scoped>
.my-upload-btn {
  width: auto;
  height: auto;
  border: none;
  border-radius: 4px;
  background: none;
}
</style>
```

### 自定义预览样式

```vue
<template>
  <view>
    <wd-upload 
      action="https://api.example.com/upload" 
      v-model:fileList="customPreviewFileList"
      custom-preview-class="my-preview-item"
    >
      <template #preview-cover="{ file, index }">
        <view class="preview-cover">
          <text class="preview-index">{{ index + 1 }}</text>
        </view>
      </template>
    </wd-upload>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const customPreviewFileList = ref([])
</script>

<style scoped>
.my-preview-item {
  position: relative;
  margin: 8px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.preview-cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
}

.preview-index {
  font-weight: bold;
}
</style>
```

## 注意事项

1. **平台兼容性**：
   - 'media'和'file'类型仅微信小程序支持
   - 'all'类型仅微信和H5支持
   - 'extension'过滤仅H5和微信小程序支持

2. **文件类型支持**：
   - 不同平台对文件类型的支持有所差异，请根据实际需求选择合适的accept值
   - 建议在使用前测试目标平台的支持情况

3. **上传配置**：
   - 确保action属性设置正确的上传接口地址
   - 对于需要认证的接口，需正确配置header属性
   - 可通过formData属性传递额外的表单数据

4. **性能优化**：
   - 对于大图上传，建议开启compressed压缩
   - 合理设置maxSize限制，避免上传过大文件
   - 对于大量文件上传，建议限制一次性上传数量

5. **事件处理**：
   - 建议监听success和fail事件，处理上传结果
   - 可通过progress事件实现上传进度显示

6. **自定义上传**：
   - 可通过uploadMethod属性自定义上传逻辑
   - 支持返回Promise或UploadTask对象

7. **预览功能**：
   - 支持图片、视频、文件的预览
   - 不同平台的预览行为可能有所差异

8. **安全考虑**：
   - 建议在服务端对上传文件进行验证
   - 限制允许上传的文件类型和大小
   - 对上传文件进行安全扫描