# 最佳实践建议

## 性能优化策略

### 1. 组件按需引入

wot-ui-plus 支持通过 easycom 实现组件自动按需引入，配置后只有实际使用的组件才会被打包：

```json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      "^wd-(.*)": "wot-ui-plus/components/wd-$1/wd-$1.vue"
    }
  }
}
```

:::warning 注意
如果不使用 easycom，而是手动全局注册所有组件，会导致打包体积增大。推荐始终使用 easycom 或手动按需引入。
:::

### 2. 避免不必要的渲染

1. 使用 `v-show` 代替 `v-if` 控制频繁切换的组件显示隐藏
2. 使用 `computed` 缓存计算结果，避免模板中重复计算
3. 使用 `shallowRef` 或 `shallowReactive` 处理大型数据对象，减少响应式开销
4. 对于长列表，避免在列表项中使用复杂的响应式计算

```vue
<template>
  <view>
    <!-- 频繁切换用 v-show -->
    <wd-popup v-model="showPopup" position="bottom">
      <view>弹窗内容</view>
    </wd-popup>

    <!-- 条件渲染用 v-if -->
    <wd-skeleton v-if="loading" />
    <view v-else>实际内容</view>
  </view>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue'

const showPopup = ref(false)
const loading = ref(true)

// 大型数据使用 shallowRef
const largeList = shallowRef<Array<Record<string, any>>>([])
</script>
```

### 3. 大型列表优化

对于数据量较大的列表场景，建议使用 `wd-waterfall` 瀑布流组件或分页加载，避免一次性渲染大量 DOM 节点。

#### 瀑布流布局

```vue
<template>
  <wd-waterfall :list="list" :columns="2">
    <template #item="{ item }">
      <view class="waterfall-item">
        <wd-img :src="item.image" width="100%" mode="widthFix" />
        <view class="title">{{ item.title }}</view>
      </view>
    </template>
  </wd-waterfall>
</template>
```

#### 分页加载

```vue
<template>
  <view>
    <view v-for="item in list" :key="item.id">
      <wd-cell :title="item.title" :label="item.desc" />
    </view>
    <wd-loadmore :state="loadState" @reload="onReload" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const list = ref<Array<{ id: number; title: string; desc: string }>>([])
const loadState = ref<'loading' | 'finished' | 'error'>('loading')
const page = ref(1)

const fetchData = async () => {
  loadState.value = 'loading'
  try {
    const res = await uni.request({
      url: '/api/list',
      data: { page: page.value, pageSize: 10 }
    })
    const data = (res.data as any[]) || []
    list.value = page.value === 1 ? data : [...list.value, ...data]
    loadState.value = data.length < 10 ? 'finished' : 'loading'
  } catch {
    loadState.value = 'error'
  }
}

const onReload = () => {
  page.value = 1
  fetchData()
}
</script>
```

### 4. 图片懒加载

使用 `wd-lazy-load` 组件实现图片懒加载，减少首屏加载时间：

```vue
<template>
  <view>
    <wd-lazy-load v-for="item in imageList" :key="item.id" :height="300">
      <wd-img :src="item.url" width="100%" height="300" mode="aspectFill" />
    </wd-lazy-load>
  </view>
</template>
```

## 样式规范指南

### 1. 命名规范

wot-ui-plus 的组件样式遵循 BEM 命名规范，命名空间为 `wd`：

- **Block（块）**：`wd-button`
- **Element（元素）**：`wd-button__content`
- **Modifier（修饰符）**：`wd-button--primary`

自定义类名建议使用 `kebab-case` 格式，避免与组件库类名冲突：

```scss
// 推荐
.my-button-wrapper { }
.login-form-container { }

// 不推荐（可能与组件库冲突）
.button { }
.form { }
```

### 2. 样式覆盖方法

#### 优先使用 CSS 变量

覆盖组件样式的首选方式是使用 CSS 变量，这样可以保持与主题系统的一致性：

```scss
:root {
  --wot-button-primary-bg-color: #2979ff;
  --wot-button-large-height: 48px;
}
```

#### 使用深度选择器

当 CSS 变量无法满足需求时，可以使用 `:deep()` 深度选择器覆盖组件内部样式：

```scss
/* 正确的样式覆盖方式 */
.my-button {
  :deep(.wd-button__content) {
    font-size: 16px;
    color: #2979ff;
  }
}
```

:::warning 注意
- 使用 `::v-deep` 或 `/deep/` 已被废弃，请使用 `:deep()` 代替
- 避免使用 `!important`，尽量通过选择器优先级覆盖
- 不要直接修改组件库的源码样式，这会导致升级困难
:::

#### 使用 ConfigProvider 动态修改

对于需要动态切换的场景，使用 `wd-config-provider` 的 `themeVars` 属性：

```vue
<template>
  <wd-config-provider :theme-vars="themeVars">
    <view>内容区域</view>
  </wd-config-provider>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const themeVars = reactive({
  buttonPrimaryBgColor: '#2979ff',
  buttonLargeHeight: '48px'
})
</script>
```

### 3. scoped 样式处理

推荐在组件中使用 `scoped` 属性避免样式污染，需要覆盖子组件样式时使用 `:deep()`：

```vue
<template>
  <view class="my-page">
    <wd-button type="primary">按钮</wd-button>
  </view>
</template>

<style scoped>
.my-page {
  padding: 16px;
}

.my-page :deep(.wd-button) {
  margin-bottom: 12px;
}
</style>
```

## 组件组合使用模式

### 1. 表单验证组合

`wd-form` + `wd-form-item` + `wd-input` 的标准表单验证模式：

```vue
<template>
  <wd-form :model="formData" :rules="rules" ref="formRef">
    <wd-form-item label="姓名" prop="name">
      <wd-input v-model="formData.name" placeholder="请输入姓名" clearable />
    </wd-form-item>
    <wd-form-item label="手机号" prop="phone">
      <wd-input v-model="formData.phone" placeholder="请输入手机号" type="number" maxlength="11" />
    </wd-form-item>
    <wd-form-item label="邮箱" prop="email">
      <wd-input v-model="formData.email" placeholder="请输入邮箱" />
    </wd-form-item>
    <view style="padding: 20px;">
      <wd-button type="primary" block @click="handleSubmit">提交</wd-button>
    </view>
  </wd-form>
  <wd-toast />
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useToast } from 'wot-ui-plus'
import type { FormInstance } from 'wot-ui-plus'

const toast = useToast()
const formRef = ref<FormInstance>()

const formData = reactive({
  name: '',
  phone: '',
  email: ''
})

const rules = {
  name: [{ required: true, message: '请输入姓名' }],
  phone: [
    { required: true, message: '请输入手机号' },
    { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' }
  ],
  email: [
    { required: true, message: '请输入邮箱' },
    { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: '邮箱格式不正确' }
  ]
}

const handleSubmit = async () => {
  try {
    const { valid, errors } = await formRef.value!.validate()
    if (valid) {
      toast.success('提交成功')
    }
  } catch (errors) {
    toast.error('请检查表单填写')
  }
}
</script>
```

### 2. 弹窗交互组合

`wd-action-sheet` + `wd-toast` 的操作确认模式：

```vue
<template>
  <view>
    <wd-cell title="删除数据" is-link @click="showActionSheet" />
    <wd-action-sheet v-model="showSheet" :actions="actions" @select="onSelect" />
    <wd-toast />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from 'wot-ui-plus'

const toast = useToast()
const showSheet = ref(false)

const actions = [
  { name: '删除', color: '#fa4350' },
  { name: '取消' }
]

const showActionSheet = () => {
  showSheet.value = true
}

const onSelect = ({ name }: { name: string }) => {
  if (name === '删除') {
    toast.success('删除成功')
  }
}
</script>
```

### 3. 列表 + 下拉刷新组合

`wd-drop-menu` + `wd-cell` + `wd-loadmore` 的列表筛选模式：

```vue
<template>
  <view>
    <wd-drop-menu>
      <wd-drop-menu-item v-model="filterStatus" :options="statusOptions" title="状态" />
      <wd-drop-menu-item v-model="filterSort" :options="sortOptions" title="排序" />
    </wd-drop-menu>

    <view v-for="item in filteredList" :key="item.id">
      <wd-cell :title="item.title" :label="item.status" is-link />
    </view>

    <wd-loadmore :state="loadState" />
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const filterStatus = ref(0)
const filterSort = ref(0)

const statusOptions = [
  { label: '全部', value: 0 },
  { label: '进行中', value: 1 },
  { label: '已完成', value: 2 }
]

const sortOptions = [
  { label: '默认排序', value: 0 },
  { label: '最新优先', value: 1 },
  { label: '最早优先', value: 2 }
]

const list = ref<Array<{ id: number; title: string; status: string }>>([])
const loadState = ref<'loading' | 'finished'>('finished')

const filteredList = computed(() => {
  return list.value
})
</script>
```

### 4. 通知 + 消息弹框组合

`wd-notify` + `wd-message-box` 的消息通知模式：

```vue
<template>
  <view>
    <wd-button @click="showNotify">显示通知</wd-button>
    <wd-button @click="showConfirm">确认操作</wd-button>
    <wd-notify />
    <wd-message-box />
  </view>
</template>

<script setup lang="ts">
import { useNotify, useMessage } from 'wot-ui-plus'

const { showNotify } = useNotify()
const message = useMessage()

const showNotify = () => {
  showNotify({
    type: 'success',
    message: '操作成功'
  })
}

const showConfirm = async () => {
  try {
    await message.confirm({
      title: '确认操作',
      msg: '确定要执行此操作吗？'
    })
    showNotify({ type: 'success', message: '操作成功' })
  } catch {
    // 用户取消
  }
}
</script>
```

## 兼容性处理方案

### 跨端兼容性

#### 1. 使用 uni-app 跨端 API

wot-ui-plus 基于 uni-app 构建，组件内部已处理了大部分跨端差异。在业务代码中，应优先使用 uni-app 提供的跨端 API：

```typescript
// 推荐：使用 uni-app API
uni.navigateTo({ url: '/pages/detail/index' })
uni.showToast({ title: '成功', icon: 'success' })

// 不推荐：使用平台特定 API
// window.location.href = '...'  // H5 专用
// wx.navigateTo(...)             // 微信小程序专用
```

#### 2. 条件编译处理平台差异

对于不同平台的特殊需求，使用 uni-app 的条件编译：

```vue
<template>
  <view>
    <!-- #ifdef H5 -->
    <wd-button @click="shareH5">H5 分享</wd-button>
    <!-- #endif -->

    <!-- #ifdef MP-WEIXIN -->
    <wd-button open-type="share">微信分享</wd-button>
    <!-- #endif -->

    <!-- #ifdef MP-ALIPAY -->
    <wd-button @click="shareAlipay">支付宝分享</wd-button>
    <!-- #endif -->
  </view>
</template>
```

#### 3. 样式兼容性

部分 CSS 属性在不同平台的支持程度不同，建议：

1. 使用 `rpx` 作为尺寸单位，实现不同屏幕的响应式适配
2. 避免使用小程序不支持的 CSS 属性（如 `filter`、`backdrop-filter` 等）
3. 使用 `wd-gap` 组件代替 `margin` 处理安全区域间距

```vue
<template>
  <view>
    <!-- 底部安全区域 -->
    <wd-gap safe-area-bottom />
  </view>
</template>
```

### 设备适配技巧

1. 使用 `rpx` 单位进行响应式布局，wot-ui-plus 组件内部已使用 rpx 适配
2. 使用 `wd-gap` 的 `safe-area-bottom` 属性处理底部安全区域
3. 使用 `wd-navbar` 的 `fixed` 属性创建固定导航栏，自动处理状态栏高度
4. 在不同设备上进行真机测试，确保显示效果一致
