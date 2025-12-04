# 功能与扩展

##  组件二次封装

###  封装原则

1. 保持 API 兼容性
2. 增加必要的扩展功能
3. 保持代码简洁
4. 提供完整的类型定义

###  封装示例

```vue
<template>
  <wd-button 
    :type="type" 
    :size="size" 
    :disabled="disabled" 
    @click="handleClick"
    :loading="loading"
  >
    <template #icon v-if="icon">
      <wd-icon :name="icon" />
    </template>
    <slot>{{ text }}</slot>
  </wd-button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import WdButton from '@/uni_modules/wot-ui-plus/components/wd-button/wd-button.vue'
import WdIcon from '@/uni_modules/wot-ui-plus/components/wd-icon/wd-icon.vue'

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
  emit('click', event)
}
</script>
```

###  组件库与其他常用库的结合使用

#### 1 与 Pinia 结合

```typescript
// store/user.ts
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null
  }),
  actions: {
    async login(username: string, password: string) {
      // 登录逻辑
      this.userInfo = { username }
    }
  }
})
```

```vue
<template>
  <wd-form @submit="onSubmit">
    <wd-form-item label="用户名" prop="username">
      <wd-input v-model="form.username" placeholder="请输入用户名" />
    </wd-form-item>
    <wd-form-item label="密码" prop="password">
      <wd-input v-model="form.password" type="password" placeholder="请输入密码" />
    </wd-form-item>
    <wd-form-item>
      <wd-button type="primary" native-type="submit" :loading="loading">登录</wd-button>
    </wd-form-item>
  </wd-form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
const loading = ref(false)
const form = reactive({
  username: '',
  password: ''
})

const onSubmit = async () => {
  loading.value = true
  try {
    await userStore.login(form.username, form.password)
    // 登录成功处理
  } catch (error) {
    // 登录失败处理
  } finally {
    loading.value = false
  }
}
</script>
```

#### 2 与 Vuex 结合

```typescript
// store/index.ts
import { createStore } from 'vuex'

export default createStore({
  state: {
    userInfo: null
  },
  mutations: {
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    async login({ commit }, { username, password }) {
      // 登录逻辑
      commit('SET_USER_INFO', { username })
    }
  }
})
```

```vue
<template>
  <wd-form @submit="onSubmit">
    <!-- 表单内容 -->
  </wd-form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const loading = ref(false)
const form = reactive({
  username: '',
  password: ''
})

const onSubmit = async () => {
  loading.value = true
  try {
    await store.dispatch('login', form)
    // 登录成功处理
  } catch (error) {
    // 登录失败处理
  } finally {
    loading.value = false
  }
}
</script>
```

#### 3 与路由库结合

```vue
<template>
  <wd-tabs v-model:active="activeTab" @change="handleTabChange">
    <wd-tab title="首页" name="home" />
    <wd-tab title="分类" name="category" />
    <wd-tab title="购物车" name="cart" />
    <wd-tab title="我的" name="user" />
  </wd-tabs>
  <router-view />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import WdTabs from '@/uni_modules/wot-ui-plus/components/wd-tabs/wd-tabs.vue'
import WdTab from '@/uni_modules/wot-ui-plus/components/wd-tab/wd-tab.vue'

const route = useRoute()
const router = useRouter()
const activeTab = ref(route.name as string)

// 监听路由变化，更新 tab
watch(() => route.name, (newName) => {
  activeTab.value = newName as string
})

// 监听 tab 变化，跳转路由
const handleTabChange = (name: string) => {
  router.push({ name })
}
</script>
```
