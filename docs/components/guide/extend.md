# 功能与扩展

## 组件二次封装

### 封装原则

1. **保持 API 兼容性**：封装后的组件应保持与原始组件相同的 props、events 和 slots 接口，避免破坏现有用法
2. **增加必要的扩展功能**：在兼容原有 API 的基础上，添加业务所需的扩展功能
3. **保持代码简洁**：封装逻辑应尽量精简，避免过度封装导致维护困难
4. **提供完整的类型定义**：为封装后的组件提供 TypeScript 类型支持，确保开发体验
5. **合理使用 `v-bind` 和 `v-on`**：通过 `$attrs` 透传属性和事件，减少手动传递

### 封装示例

#### 基础封装：带默认值的按钮

将 `wd-button` 封装为业务组件，预设默认类型和尺寸：

```vue
<template>
  <wd-button
    v-bind="$attrs"
    :type="type"
    :size="size"
    :disabled="disabled"
    :loading="loading"
    @click="handleClick"
  >
    <template #icon v-if="icon">
      <wd-icon :name="icon" />
    </template>
    <slot>{{ text }}</slot>
  </wd-button>
</template>

<script setup lang="ts">
defineOptions({
  name: 'AppButton',
  inheritAttrs: false
})

const props = defineProps({
  type: {
    type: String,
    default: 'primary'
  },
  size: {
    type: String,
    default: 'medium'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  text: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['click'])

const handleClick = (event: Event) => {
  if (props.disabled || props.loading) return
  emit('click', event)
}
</script>
```

:::tip 提示
使用 `inheritAttrs: false` 配合 `v-bind="$attrs"` 可以将父组件传递的非 prop 属性（如 `class`、`style`）透传到 `wd-button` 上，避免属性丢失。
:::

#### 高级封装：带防抖的搜索框

将 `wd-search` 封装为带防抖功能的搜索组件：

```vue
<template>
  <wd-search
    v-model="keyword"
    v-bind="$attrs"
    :placeholder="placeholder"
    @search="handleSearch"
    @clear="handleClear"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

defineOptions({
  name: 'DebounceSearch',
  inheritAttrs: false
})

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '请输入搜索关键词'
  },
  debounceTime: {
    type: Number,
    default: 300
  }
})

const emit = defineEmits(['update:modelValue', 'search', 'clear'])

const keyword = ref(props.modelValue)
let timer: ReturnType<typeof setTimeout> | null = null

watch(() => props.modelValue, (val) => {
  keyword.value = val
})

watch(keyword, (val) => {
  emit('update:modelValue', val)
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
    emit('search', val)
  }, props.debounceTime)
})

const handleSearch = (val: string) => {
  // 防抖已由 watch 处理，此处不再触发
}

const handleClear = () => {
  if (timer) clearTimeout(timer)
  emit('clear')
}
</script>
```

#### 表单封装：登录表单

将 `wd-form`、`wd-form-item`、`wd-input` 组合封装为登录表单：

```vue
<template>
  <wd-form :model="formData" :rules="rules" ref="formRef">
    <wd-form-item label="用户名" prop="username">
      <wd-input
        v-model="formData.username"
        placeholder="请输入用户名"
        clearable
        prefix-icon="user"
      />
    </wd-form-item>
    <wd-form-item label="密码" prop="password">
      <wd-input
        v-model="formData.password"
        placeholder="请输入密码"
        show-password
        prefix-icon="lock"
      />
    </wd-form-item>
    <view style="margin-top: 20px;">
      <wd-button type="primary" block :loading="loading" @click="handleSubmit">
        登录
      </wd-button>
    </view>
  </wd-form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance } from 'wot-ui-plus'

const emit = defineEmits(['submit'])

const formRef = ref<FormInstance>()
const loading = ref(false)

const formData = reactive({
  username: '',
  password: ''
})

const rules = {
  username: [
    { required: true, message: '请输入用户名' }
  ],
  password: [
    { required: true, message: '请输入密码' },
    {
      pattern: /^.{6,}$/,
      message: '密码长度不能少于6位'
    }
  ]
}

const handleSubmit = async () => {
  try {
    const { valid } = await formRef.value!.validate()
    if (valid) {
      loading.value = true
      emit('submit', { ...formData })
    }
  } catch {
    // 验证失败
  } finally {
    loading.value = false
  }
}
</script>
```

## 组件库与常用库的结合使用

### 1. 与 Pinia 结合

Pinia 是 Vue 3 推荐的状态管理库，与 wot-ui-plus 组件配合使用非常自然。

**定义 Store：**

```typescript
// store/user.ts
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null as Record<string, any> | null,
    token: ''
  }),
  actions: {
    async login(username: string, password: string) {
      // 登录逻辑
      this.token = 'mock-token'
      this.userInfo = { username }
    },
    logout() {
      this.token = ''
      this.userInfo = null
    }
  }
})
```

**在组件中使用：**

```vue
<template>
  <wd-form :model="formData" :rules="rules" ref="formRef">
    <wd-form-item label="用户名" prop="username">
      <wd-input v-model="formData.username" placeholder="请输入用户名" clearable />
    </wd-form-item>
    <wd-form-item label="密码" prop="password">
      <wd-input v-model="formData.password" placeholder="请输入密码" show-password />
    </wd-form-item>
    <view style="margin-top: 20px;">
      <wd-button type="primary" block :loading="loading" @click="onSubmit">
        登录
      </wd-button>
    </view>
  </wd-form>
  <wd-toast />
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useUserStore } from '@/store/user'
import { useToast } from 'wot-ui-plus'
import type { FormInstance } from 'wot-ui-plus'

const userStore = useUserStore()
const toast = useToast()
const formRef = ref<FormInstance>()
const loading = ref(false)

const formData = reactive({
  username: '',
  password: ''
})

const rules = {
  username: [{ required: true, message: '请输入用户名' }],
  password: [{ required: true, message: '请输入密码' }]
}

const onSubmit = async () => {
  try {
    const { valid } = await formRef.value!.validate()
    if (!valid) return

    loading.value = true
    await userStore.login(formData.username, formData.password)
    toast.success('登录成功')
  } catch (error) {
    toast.error('登录失败')
  } finally {
    loading.value = false
  }
}
</script>
```

### 2. 与 uni-app 路由结合

uni-app 使用自己的路由系统（`uni.navigateTo`、`uni.switchTab` 等），不使用 vue-router。可以结合 `wd-tabs`、`wd-tabbar` 等导航组件实现页面导航。

#### TabBar 页面导航

```vue
<template>
  <wd-tabbar v-model="active" @change="handleTabChange">
    <wd-tabbar-item title="首页" icon="home" />
    <wd-tabbar-item title="分类" icon="category" />
    <wd-tabbar-item title="购物车" icon="cart" />
    <wd-tabbar-item title="我的" icon="user" />
  </wd-tabbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(0)

const tabPages = ['/pages/home/index', '/pages/category/index', '/pages/cart/index', '/pages/user/index']

const handleTabChange = ({ value }: { value: number }) => {
  uni.switchTab({
    url: tabPages[value]
  })
}
</script>
```

#### 非TabBar页面导航

```vue
<template>
  <wd-cell-group>
    <wd-cell title="用户信息" is-link @click="navigateTo('/pages/user/info')" />
    <wd-cell title="设置" is-link @click="navigateTo('/pages/setting/index')" />
    <wd-cell title="关于" is-link @click="navigateTo('/pages/about/index')" />
  </wd-cell-group>
</template>

<script setup lang="ts">
const navigateTo = (url: string) => {
  uni.navigateTo({ url })
}
</script>
```

### 3. 与请求库结合

结合 `wd-loadmore` 和请求库实现分页加载：

```vue
<template>
  <view>
    <view v-for="item in list" :key="item.id" class="list-item">
      <wd-cell :title="item.title" :label="item.desc" />
    </view>
    <wd-loadmore :state="loadState" @reload="onReload" />
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

type LoadState = 'loading' | 'finished' | 'error'

const list = ref<Array<{ id: number; title: string; desc: string }>>([])
const loadState = ref<LoadState>('loading')
const page = ref(1)
const pageSize = 10

const fetchData = async () => {
  loadState.value = 'loading'
  try {
    const res = await uni.request({
      url: '/api/list',
      data: { page: page.value, pageSize }
    })
    const data = res.data as any[]
    if (data.length < pageSize) {
      loadState.value = 'finished'
    } else {
      loadState.value = 'loading'
    }
    if (page.value === 1) {
      list.value = data
    } else {
      list.value.push(...data)
    }
  } catch {
    loadState.value = 'error'
  }
}

const onReload = () => {
  page.value = 1
  fetchData()
}

const loadMore = () => {
  if (loadState.value === 'finished') return
  page.value++
  fetchData()
}

onMounted(() => {
  fetchData()
})
</script>
```

### 4. 与国际化模块结合

wot-ui-plus 内置了国际化支持，可以在应用初始化时根据用户偏好设置语言：

```typescript
// main.ts
import { createSSRApp } from 'vue'
import App from './App.vue'
import { Locale } from 'wot-ui-plus'
import enUS from 'wot-ui-plus/locale/lang/en-US'

// 根据系统语言设置
const systemLang = uni.getSystemInfoSync().language || 'zh-CN'
if (systemLang.startsWith('en')) {
  Locale.use('en-US')
}

export function createApp() {
  const app = createSSRApp(App)
  return { app }
}
```

## 自定义指令扩展

### 防抖点击指令

为 `wd-button` 等组件添加防抖点击功能：

```typescript
// directives/debounce.ts
import type { Directive } from 'vue'

export const vDebounce: Directive = {
  mounted(el, binding) {
    const delay = binding.arg ? parseInt(binding.arg) : 300
    const handler = binding.value
    let timer: ReturnType<typeof setTimeout> | null = null

    el.addEventListener('click', () => {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        handler()
      }, delay)
    })
  }
}
```

```vue
<template>
  <wd-button v-debounce:500="handleSave">保存</wd-button>
</template>

<script setup lang="ts">
import { vDebounce } from '@/directives/debounce'

const handleSave = () => {
  console.log('保存操作')
}
</script>
```

## 工具函数扩展

wot-ui-plus 导出了 `CommonUtil` 和 `clickOut` 等工具，可以在业务代码中直接使用：

```typescript
import { CommonUtil, clickOut } from 'wot-ui-plus'

// 使用通用工具函数
const { deepMerge, isString, isNumber } = CommonUtil

const merged = deepMerge({ a: 1 }, { b: 2 })
// 结果: { a: 1, b: 2 }

// 使用点击外部检测
clickOut.bind(el, () => {
  console.log('点击了元素外部')
})
```
