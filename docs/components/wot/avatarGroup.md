# AvatarGroup 头像组

<demo-model url="/subPages/avatarGroup/Index"></demo-model>

## 组件概况

### 组件概述
AvatarGroup 头像组组件用于展示多个头像，支持最大显示数量限制，超出部分可显示"+N"提示，并支持点击查看更多功能，适用于团队成员展示、评论列表、联系人列表等场景。

### 详细功能描述
- 支持展示多个头像，支持数组和对象数组格式
- 支持最大显示数量限制
- 支持超出数量时显示"+N"提示
- 支持自定义头像大小和形状
- 支持自定义头像裁剪模式
- 支持自定义头像之间的遮挡比例
- 支持点击查看更多事件
- 支持额外显示的值

### 适用业务场景
- 团队成员头像展示
- 评论列表中的用户头像
- 联系人列表
- 社交应用中的好友头像
- 任何需要展示多个头像的场景

## 完整API参考

### Props属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| urls | array | [] | 否 | 头像图片组，支持字符串数组和对象数组 |
| maxCount | string/number | 5 | 否 | 最多展示的头像数量 |
| shape | string | circle | 否 | 头像形状，可选值：circle（圆形）/ square（方形） |
| mode | string | scaleToFill | 否 | 图片裁剪模式，参考uni-app image组件的mode属性 |
| showMore | boolean | true | 否 | 超出maxCount时是否显示查看更多的提示 |
| size | string/number | 40 | 否 | 头像大小 |
| keyName | string | - | 否 | 指定从数组的对象元素中读取哪个属性作为图片地址 |
| gap | string/number | 0.5 | 否 | 头像之间的遮挡比例，取值范围0-1 |
| extraValue | number/string | 0 | 否 | 需额外显示的值，会加到"+N"中 |
| customStyle | string | - | 否 | 自定义根节点样式 |
| customClass | string | - | 否 | 自定义根节点样式类 |

### Events事件

| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| showMore | 点击"+N"查看更多时 | - |

### Methods方法

该组件没有对外暴露的方法。

### Slots插槽

该组件没有定义任何插槽。

## 多场景使用示例代码

### 1. 基础用法

```vue
<template>
  <view class="avatar-group-demo">
    <wd-avatar-group :urls="avatarUrls" />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 基础头像组用法
const avatarUrls = ref([
  'https://example.com/avatar1.jpg',
  'https://example.com/avatar2.jpg',
  'https://example.com/avatar3.jpg',
  'https://example.com/avatar4.jpg',
  'https://example.com/avatar5.jpg',
  'https://example.com/avatar6.jpg'
])
</script>

<style scoped>
.avatar-group-demo {
  padding: 20rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200rpx;
}
</style>
```

### 2. 对象数组和自定义属性

```vue
<template>
  <view class="avatar-group-demo">
    <wd-avatar-group 
      :urls="userList" 
      key-name="avatar" 
      max-count="4" 
      shape="square" 
      size="60"
      @show-more="handleShowMore"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { showToast } from '@/utils/toast'

// 对象数组格式的头像组
const userList = ref([
  { id: 1, name: '张三', avatar: 'https://example.com/avatar1.jpg' },
  { id: 2, name: '李四', avatar: 'https://example.com/avatar2.jpg' },
  { id: 3, name: '王五', avatar: 'https://example.com/avatar3.jpg' },
  { id: 4, name: '赵六', avatar: 'https://example.com/avatar4.jpg' },
  { id: 5, name: '孙七', avatar: 'https://example.com/avatar5.jpg' }
])

// 处理查看更多事件
const handleShowMore = () => {
  showToast('查看更多头像')
}
</script>

<style scoped>
.avatar-group-demo {
  padding: 20rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200rpx;
}
</style>
```

### 3. 自定义大小和遮挡比例

```vue
<template>
  <view class="avatar-group-demo">
    <wd-avatar-group 
      :urls="avatarUrls" 
      size="80" 
      gap="0.3" 
      max-count="3"
    />
    <wd-avatar-group 
      :urls="avatarUrls" 
      size="60" 
      gap="0.7" 
      max-count="3"
      style="margin-top: 40rpx;"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 自定义大小和遮挡比例
const avatarUrls = ref([
  'https://example.com/avatar1.jpg',
  'https://example.com/avatar2.jpg',
  'https://example.com/avatar3.jpg',
  'https://example.com/avatar4.jpg'
])
</script>

<style scoped>
.avatar-group-demo {
  padding: 20rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300rpx;
}
</style>
```

### 4. 不显示查看更多和额外值

```vue
<template>
  <view class="avatar-group-demo">
    <wd-avatar-group 
      :urls="avatarUrls" 
      show-more="false" 
      max-count="3"
    />
    <wd-avatar-group 
      :urls="avatarUrls" 
      extra-value="5" 
      max-count="2"
      style="margin-top: 40rpx;"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 不显示查看更多和额外值
const avatarUrls = ref([
  'https://example.com/avatar1.jpg',
  'https://example.com/avatar2.jpg',
  'https://example.com/avatar3.jpg',
  'https://example.com/avatar4.jpg'
])
</script>

<style scoped>
.avatar-group-demo {
  padding: 20rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300rpx;
}
</style>
```

### 5. 与其他组件结合使用

```vue
<template>
  <wd-card title="团队成员">
    <view class="card-content">
      <wd-avatar-group 
        :urls="teamMembers" 
        size="60" 
        max-count="5"
        @show-more="handleShowMore"
      />
      <view class="member-count">共 {{ teamMembers.length }} 位成员</view>
    </view>
  </wd-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { showToast } from '@/utils/toast'

// 与card组件结合使用
const teamMembers = ref([
  'https://example.com/avatar1.jpg',
  'https://example.com/avatar2.jpg',
  'https://example.com/avatar3.jpg',
  'https://example.com/avatar4.jpg',
  'https://example.com/avatar5.jpg',
  'https://example.com/avatar6.jpg',
  'https://example.com/avatar7.jpg'
])

// 处理查看更多事件
const handleShowMore = () => {
  showToast('查看完整团队成员列表')
}
</script>

<style scoped>
.card-content {
  padding: 20rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20rpx;
}

.member-count {
  font-size: 28rpx;
  color: #666;
}
</style>
```

## 样式定制指南

### 1. 使用customStyle自定义样式

```vue
<template>
  <wd-avatar-group 
    :urls="avatarUrls" 
    customStyle="margin: 20rpx;"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const avatarUrls = ref([
  'https://example.com/avatar1.jpg',
  'https://example.com/avatar2.jpg'
])
</script>
```

### 2. 使用customClass自定义类名

```vue
<template>
  <wd-avatar-group 
    :urls="avatarUrls" 
    customClass="my-avatar-group"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const avatarUrls = ref([
  'https://example.com/avatar1.jpg',
  'https://example.com/avatar2.jpg'
])
</script>

<style scoped>
/* 注意：需要使用 ::v-deep 或 /deep/ 穿透 scoped 样式 */
:deep(.my-avatar-group) {
  background-color: #f5f7fa;
  padding: 20rpx;
  border-radius: 8rpx;
}
</style>
```

## 注意事项

1. **urls格式**：
   - 支持字符串数组：`['url1', 'url2']`
   - 支持对象数组：`[{ avatar: 'url1' }, { avatar: 'url2' }]`
   - 使用对象数组时，需通过keyName属性指定头像字段名

2. **gap属性**：
   - 取值范围为0-1
   - 0表示头像之间没有重叠
   - 1表示头像完全重叠
   - 默认为0.5，即重叠一半

3. **maxCount**：
   - 超出maxCount的头像会被隐藏
   - 显示"+N"提示，N为超出的数量

4. **extraValue**：
   - 会加到"+N"中，例如：extraValue=5，超出数量为3，则显示"+8"

5. **showMore**：
   - 为false时，超出maxCount的头像会被隐藏，不显示"+N"提示
   - 为true时，显示"+N"提示，并支持点击事件

6. **shape和size**：
   - shape支持circle（圆形）和square（方形）
   - size为头像的尺寸，单位为rpx

7. **图片裁剪模式**：
   - mode属性参考uni-app image组件的mode属性
   - 默认值为scaleToFill

8. **性能优化**：
   - 避免一次性展示过多头像，建议使用maxCount限制显示数量
   - 图片URL应使用适当尺寸的图片，避免过大图片影响性能