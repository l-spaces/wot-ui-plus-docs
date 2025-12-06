# Form 表单组件

<demo-model url="/subPages/form/Index"></demo-model>


## 组件概况

### 组件概述
Form 组件是一个表单容器组件，用于管理表单数据、表单验证规则以及验证状态。它与 FormItem 组件配合使用，可以实现复杂的表单验证逻辑，支持多种错误提示方式和自定义验证规则。

### 详细功能描述
- 支持表单数据的双向绑定
- 支持多种表单验证规则（必填、正则表达式、自定义验证函数）
- 支持异步验证
- 支持多种错误提示方式（toast、message、none）
- 支持部分字段验证
- 支持重置表单验证状态
- 支持输入时自动重置验证信息
- 支持合并子组件的验证规则

### 适用业务场景
- 用户注册表单
- 登录表单
- 数据提交表单
- 配置表单
- 搜索表单

## 完整API参考

### Props
| 名称 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| model | object | - | 是 | 表单数据对象 |
| rules | object | {} | 否 | 表单验证规则，格式为 { prop: [规则1, 规则2] } |
| resetOnChange | boolean | true | 否 | 是否在输入时重置表单校验信息 |
| errorType | string | message | 否 | 错误提示类型，可选值为 toast、message、none |
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |

### Events
| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |

### Methods
| 方法名 | 参数 | 返回值 | 功能说明 |
| --- | --- | --- | --- |
| validate | prop?: string / array | Promise<{ valid: boolean, errors: ErrorMessage[] }> | 表单校验，支持校验指定字段或字段数组 |
| reset | - | - | 重置表单项的验证提示 |

### Slots
| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| default | - | 用于放置 wd-form-item 子组件 |

## 多场景使用示例代码

### 基础用法
```vue
<template>
  <view>
    <!-- 基础表单 -->
    <wd-form ref="formRef" v-model="form" :rules="rules">
      <wd-form-item label="用户名" prop="username">
        <wd-input v-model="form.username" placeholder="请输入用户名" />
      </wd-form-item>
      <wd-form-item label="密码" prop="password">
        <wd-input v-model="form.password" type="password" placeholder="请输入密码" />
      </wd-form-item>
      <wd-button type="primary" @click="handleSubmit">提交</wd-button>
    </wd-form>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formRef = ref()
const form = ref({
  username: '',
  password: ''
})

const rules = {
  username: [
    { required: true, message: '请输入用户名' }
  ],
  password: [
    { required: true, message: '请输入密码' },
    { pattern: /^.{6,20}$/, message: '密码长度应为6-20位' }
  ]
}

const handleSubmit = () => {
  formRef.value.validate().then(res => {
    if (res.valid) {
      console.log('表单验证通过', res)
    } else {
      console.log('表单验证失败', res.errors)
    }
  })
}
</script>
```

### 自定义验证规则
```vue
<template>
  <view>
    <!-- 自定义验证规则 -->
    <wd-form ref="formRef" v-model="form" :rules="rules">
      <wd-form-item label="邮箱" prop="email">
        <wd-input v-model="form.email" placeholder="请输入邮箱" />
      </wd-form-item>
      <wd-form-item label="验证码" prop="code">
        <wd-input v-model="form.code" placeholder="请输入验证码" />
        <wd-button slot="right" size="small" type="primary" @click="sendCode">发送验证码</wd-button>
      </wd-form-item>
      <wd-button type="primary" @click="handleSubmit">提交</wd-button>
    </wd-form>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formRef = ref()
const form = ref({
  email: '',
  code: ''
})

const rules = {
  email: [
    { required: true, message: '请输入邮箱' },
    { pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, message: '邮箱格式不正确' }
  ],
  code: [
    { required: true, message: '请输入验证码' },
    // 自定义验证函数
    {
      required: true,
      message: '验证码错误',
      validator: (value: string) => {
        // 模拟验证码验证
        return value === '123456'
      }
    }
  ]
}

const sendCode = () => {
  console.log('发送验证码')
}

const handleSubmit = () => {
  formRef.value.validate().then(res => {
    if (res.valid) {
      console.log('表单验证通过')
    }
  })
}
</script>
```

### 异步验证
```vue
<template>
  <view>
    <!-- 异步验证 -->
    <wd-form ref="formRef" v-model="form" :rules="rules">
      <wd-form-item label="用户名" prop="username">
        <wd-input v-model="form.username" placeholder="请输入用户名" />
      </wd-form-item>
      <wd-button type="primary" @click="handleSubmit">提交</wd-button>
    </wd-form>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formRef = ref()
const form = ref({
  username: ''
})

const rules = {
  username: [
    { required: true, message: '请输入用户名' },
    {
      required: true,
      message: '用户名已存在',
      validator: async (value: string) => {
        // 模拟异步验证，检查用户名是否已存在
        await new Promise(resolve => setTimeout(resolve, 500))
        const existsUsernames = ['admin', 'user123', 'test']
        if (existsUsernames.includes(value)) {
          return '用户名已存在'
        }
        return true
      }
    }
  ]
}

const handleSubmit = () => {
  formRef.value.validate().then(res => {
    if (res.valid) {
      console.log('表单验证通过')
    }
  })
}
</script>
```

### 部分字段验证
```vue
<template>
  <view>
    <!-- 部分字段验证 -->
    <wd-form ref="formRef" v-model="form" :rules="rules">
      <wd-form-item label="用户名" prop="username">
        <wd-input v-model="form.username" placeholder="请输入用户名" />
      </wd-form-item>
      <wd-form-item label="密码" prop="password">
        <wd-input v-model="form.password" type="password" placeholder="请输入密码" />
      </wd-form-item>
      <wd-form-item label="确认密码" prop="confirmPassword">
        <wd-input v-model="form.confirmPassword" type="password" placeholder="请确认密码" />
      </wd-form-item>
      <wd-button type="primary" @click="validateUsername">验证用户名</wd-button>
      <wd-button type="primary" @click="validatePasswords">验证密码</wd-button>
      <wd-button type="primary" @click="validateAll">验证全部</wd-button>
    </wd-form>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formRef = ref()
const form = ref({
  username: '',
  password: '',
  confirmPassword: ''
})

const rules = {
  username: [
    { required: true, message: '请输入用户名' }
  ],
  password: [
    { required: true, message: '请输入密码' },
    { pattern: /^.{6,20}$/, message: '密码长度应为6-20位' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码' },
    {
      required: true,
      message: '两次密码输入不一致',
      validator: (value: string) => {
        return value === form.value.password
      }
    }
  ]
}

// 验证单个字段
const validateUsername = () => {
  formRef.value.validate('username').then(res => {
    if (res.valid) {
      console.log('用户名验证通过')
    }
  })
}

// 验证多个字段
const validatePasswords = () => {
  formRef.value.validate(['password', 'confirmPassword']).then(res => {
    if (res.valid) {
      console.log('密码验证通过')
    }
  })
}

// 验证所有字段
const validateAll = () => {
  formRef.value.validate().then(res => {
    if (res.valid) {
      console.log('所有字段验证通过')
    }
  })
}
</script>
```

### 自定义错误提示方式
```vue
<template>
  <view>
    <!-- 自定义错误提示方式 -->
    <wd-form 
      ref="formRef" 
      v-model="form" 
      :rules="rules"
      error-type="toast"
    >
      <wd-form-item label="用户名" prop="username">
        <wd-input v-model="form.username" placeholder="请输入用户名" />
      </wd-form-item>
      <wd-form-item label="密码" prop="password">
        <wd-input v-model="form.password" type="password" placeholder="请输入密码" />
      </wd-form-item>
      <wd-button type="primary" @click="handleSubmit">提交</wd-button>
    </wd-form>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formRef = ref()
const form = ref({
  username: '',
  password: ''
})

const rules = {
  username: [
    { required: true, message: '请输入用户名' }
  ],
  password: [
    { required: true, message: '请输入密码' }
  ]
}

const handleSubmit = () => {
  formRef.value.validate().then(res => {
    if (res.valid) {
      console.log('表单验证通过')
    }
  })
}
</script>
```

## 样式定制指南

### customStyle 和 customClass
使用 `customStyle` 和 `customClass` 属性可以自定义组件的根节点样式：
```vue
<wd-form 
  custom-style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;"
  custom-class="custom-form"
/>

<style>
.custom-form {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}
</style>
```

## 注意事项

1. **父子关系**: Form 组件必须与 FormItem 组件配合使用，FormItem 必须作为 Form 的子组件使用。
2. **表单数据**: `model` 属性是表单数据对象，必须为响应式对象，通过 `v-model` 双向绑定。
3. **验证规则**: `rules` 属性是表单验证规则，格式为 { prop: [规则1, 规则2] }，每个规则必须包含 required 和 message 属性。
4. **验证方法**: `validate` 方法返回 Promise，resolve 的结果包含 valid（是否通过）和 errors（错误信息数组）。
5. **自定义验证**: 支持通过 validator 函数自定义验证逻辑，支持同步和异步验证。
6. **错误提示**: `errorType` 属性控制错误提示方式，可选值为 toast（弹窗提示）、message（表单项下方提示）、none（不提示）。
7. **重置验证**: `reset` 方法用于重置表单的验证状态，清除所有错误提示。
8. **输入重置**: `resetOnChange` 属性控制输入时是否自动重置验证信息，默认为 true。
9. **部分验证**: `validate` 方法支持传入字符串或数组，验证指定字段或字段数组。
10. **异步验证**: 自定义验证函数可以返回 Promise，实现异步验证逻辑。
