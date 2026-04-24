# Upload 上传

## 组件概况

Upload 上传组件用于选择并上传图片、视频或文件，支持多选、大小限制、数量限制、自定义上传方法等功能。提供完整的上传流程管理，包括选择文件、上传进度、预览、删除等。支持图片预览、视频选择、文件选择等多种文件类型。

## 核心功能描述

- **多种文件类型**：支持 image、video、media、all、file 五种类型
- **多选文件**：通过 `multiple` 支持多选
- **数量限制**：通过 `limit` 限制最大上传数量
- **大小限制**：通过 `maxSize` 限制文件大小
- **自定义上传**：通过 `uploadMethod` 自定义上传方法
- **自动上传**：通过 `autoUpload` 控制是否选择后自动上传
- **钩子函数**：提供 beforeChoose、beforeUpload、beforeRemove、beforePreview 等钩子
- **构建表单数据**：通过 `buildFormData` 自定义上传表单数据
- **重新上传**：通过 `reupload` 允许点击已上传文件重新上传
- **文件过滤**：通过 `extension` 根据文件扩展名过滤

## 适用业务场景

- **头像上传**：在个人中心上传头像图片
- **图片上传**：在表单中上传多张图片，如商品图片、证件照片
- **文件上传**：在审批流程中上传附件文件

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| fileList | Array | [] | 否 | 上传的文件列表 |
| action | String | '' | 否 | 上传的地址 |
| header | Object | {} | 否 | 上传的请求头部 |
| multiple | Boolean | false | 否 | 是否支持多选文件 |
| disabled | Boolean | false | 否 | 是否禁用 |
| limit | Number | - | 否 | 最大允许上传个数 |
| showLimitNum | Boolean | true | 否 | 限制上传个数时是否展示当前上传个数 |
| maxSize | Number | Number.MAX_VALUE | 否 | 文件大小限制，单位 byte |
| sourceType | Array | ['album', 'camera'] | 否 | 选择图片的来源 |
| sizeType | Array | ['original', 'compressed'] | 否 | 所选图片的尺寸 |
| name | String | 'file' | 否 | 文件对应的 key |
| formData | Object | {} | 否 | 上传额外的 formdata |
| accept | String | 'image' | 否 | 文件类型，可选值：image / video / media / all / file |
| statusKey | String | 'status' | 否 | file 数据结构中 status 对应的 key |
| loadingType | String | 'ring' | 否 | 加载中图标类型 |
| loadingColor | String | '#ffffff' | 否 | 加载中图标颜色 |
| loadingSize | String | '24px' | 否 | 加载中图标尺寸 |
| compressed | Boolean | true | 否 | 是否压缩视频 |
| maxDuration | Number | 60 | 否 | 拍摄视频最长拍摄时间，单位秒 |
| camera | String | 'back' | 否 | 使用前置或后置相机，可选值：back / front |
| imageMode | String | 'aspectFit' | 否 | 预览图片的 mode 属性 |
| successStatus | Number | 200 | 否 | 接口响应的成功状态码 |
| autoUpload | Boolean | true | 否 | 是否选择文件后自动上传 |
| reupload | Boolean | false | 否 | 点击已上传时是否可以重新上传 |
| uploadMethod | Function | - | 否 | 自定义上传文件的请求方法 |
| extension | Array | - | 否 | 根据文件扩展名过滤 |
| onPreviewFail | Function | - | 否 | 预览失败执行操作 |
| beforeUpload | Function | - | 否 | 上传文件之前的钩子 |
| beforeChoose | Function | - | 否 | 选择图片之前的钩子 |
| beforeRemove | Function | - | 否 | 删除文件之前的钩子 |
| beforePreview | Function | - | 否 | 图片预览前的钩子 |
| buildFormData | Function | - | 否 | 构建上传 formData 的钩子 |
| customEvokeClass | String | '' | 否 | 自定义上传按钮样式类 |
| customPreviewClass | String | '' | 否 | 自定义预览图片列表样式类 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Methods

| 方法名称 | 参数 | 返回值 | 说明 |
|---------|------|--------|------|
| submit | - | void | 手动触发上传 |
| abort | (task?: UploadTask) | void | 取消上传 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| success | 文件上传成功时触发 | ({ file, fileList, formData }) | 上传成功的文件信息 |
| fail | 文件上传失败时触发 | ({ error, file, formData }) | 错误信息和文件信息 |
| progress | 文件上传进度变化时触发 | ({ response, file }) | 上传进度信息 |
| oversize | 文件大小超出限制时触发 | ({ file }) | 超出大小的文件信息 |
| change | 文件列表变化时触发 | ({ fileList }) | 当前文件列表 |
| remove | 删除文件时触发 | ({ file }) | 被删除的文件信息 |
| chooseerror | 选择文件出错时触发 | (error) | 错误信息 |
| update:fileList | 文件列表变化时触发 | `(fileList: UploadFileItem[])` | 用于 v-model:fileList 双向绑定 |

### UploadFileItem 类型定义

| 属性名称 | 类型 | 说明 |
|---------|------|------|
| uid | Number | 文件唯一标识 |
| url | String | 文件地址 |
| name | String | 文件名称（仅 H5） |
| status | String | 上传状态：pending / loading / success / fail |
| size | Number | 文件大小 |
| thumb | String | 缩略图地址 |
| percent | Number | 上传进度 |
| response | String / Object | 后端返回内容 |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-upload action="https://example.com/upload" :file-list="fileList" @success="onSuccess" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const fileList = ref([])

function onSuccess({ file, fileList }) {
  console.log('上传成功', file)
}
</script>
```

### 示例2：多选与数量限制

```vue
<template>
  <wd-upload
    action="https://example.com/upload"
    :file-list="fileList"
    multiple
    :limit="3"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const fileList = ref([])
</script>
```

### 示例3：自定义上传方法

```vue
<template>
  <wd-upload :file-list="fileList" :upload-method="customUpload" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const fileList = ref([])

function customUpload(uploadFile, formData, options) {
  const { action, header, name, fileName, statusCode, onSuccess, onError, onProgress } = options
  
  const task = uni.uploadFile({
    url: action,
    header,
    name,
    fileName,
    formData,
    filePath: uploadFile.url,
    success(res) {
      if (res.statusCode === statusCode) {
        onSuccess(res, uploadFile, formData)
      } else {
        onError(res, uploadFile, formData)
      }
    },
    fail(error) {
      onError(error, uploadFile, formData)
    }
  })
  
  task.onProgressUpdate((res) => {
    onProgress(res, uploadFile)
  })
  
  return task
}
</script>
```

### 示例4：视频上传与大小限制

```vue
<template>
  <wd-upload
    action="https://example.com/upload"
    :file-list="fileList"
    accept="video"
    :max-size="50 * 1024 * 1024"
    @oversize="onOversize"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useToast } from '@/uni_modules/wot-ui-plus'

const { show } = useToast()
const fileList = ref([])

function onOversize() {
  show({ msg: '文件大小不能超过 50 MB' })
}
</script>
```

## 注意事项

- `accept` 为 media 和 file 时仅微信小程序支持，all 仅微信和 H5 支持
- `autoUpload` 为 false 时需手动调用 `submit` 方法触发上传
- `beforeUpload`、`beforeChoose`、`beforeRemove`、`beforePreview` 钩子需调用 `resolve(true)` 继续，`resolve(false)` 阻止
- `buildFormData` 钩子可用于动态修改上传表单数据
- `uploadMethod` 返回 UploadTask 可支持取消上传
- `extension` 过滤仅在 H5 和微信小程序部分模式下支持
