# 表单组件（wd-form）

## 组件概述

wd-form 是一个基于 Vue 3 + TypeScript + UniApp 开发的表单组件，用于统一管理表单数据、验证规则和错误信息。它与 wd-form-item 组件配合使用，提供了完整的表单解决方案，包括表单数据绑定、验证规则定义、错误提示展示等功能。

### 功能描述
- 表单数据双向绑定
- 支持自定义验证规则
- 支持多种错误提示方式（toast、message、none）
- 支持单个或多个字段的验证
- 支持输入时自动重置验证信息
- 提供表单验证和重置方法

### 适用业务场景
- 用户注册表单
- 登录表单
- 个人信息编辑表单
- 数据提交表单
- 各种需要表单验证的场景

### 组件设计理念
wd-form 组件采用了 Vue 3 的 Composition API 和 TypeScript，确保了类型安全和代码可维护性。组件使用了依赖注入机制，将表单数据和验证规则传递给子组件 wd-form-item，实现了父子组件之间的通信。组件设计考虑了灵活性和可扩展性，允许开发者根据实际需求自定义验证规则和错误提示方式。

## 完整 API 参考

### Props

| 名称 | 类型 | 默认值 | 必填项 | 描述 |
| --- | --- | --- | --- | --- |
| model | object | - | 是 | 表单数据对象 |
| rules | object | {} | 否 | 表单验证规则，格式为 { [key: string]: FormItemRule[] } |
| resetOnChange | boolean | true | 否 | 是否在输入时重置表单校验信息 |
| errorType | string | 'message' | 否 | 错误提示类型，可选值：toast（弹出提示）、message（行内提示）、none（不显示提示） |
| customStyle | object | - | 否 | 自定义样式，用于覆盖组件默认样式 |
| customClass | string | - | 否 | 自定义类名，用于扩展组件样式 |

### Events

该组件没有定义任何事件。

### Methods

| 方法名 | 参数 | 返回值 | 功能说明 |
| --- | --- | --- | --- |
| validate | prop?: string \| string[] | Promise<{ valid: boolean; errors: ErrorMessage[] }> | 表单校验，可选参数 prop 指定校验字段或字段数组 |
| reset | - | void | 重置表单项的验证提示 |

### Slots

| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| default | - | 表单内容区域，用于放置 wd-form-item 组件 |

## 多场景使用示例代码

### 基础用法

```vue
<template>
  <wd-form ref="formRef" v-model="form" :rules="rules">
    <wd-form-item prop="username" label="用户名" :rules="[{ required: true, message: '请输入用户名' }]">
      <wd-input v-model="form.username" placeholder="请输入用户名" />
    </wd-form-item>
    <wd-form-item prop="password" label="密码" :rules="[{ required: true, message: '请输入密码' }]">
      <wd-input v-model="form.password" type="password" placeholder="请输入密码" />
    </wd-form-item>
    <view class="form-actions">
      <wd-button type="primary" @click="submitForm">提交</wd-button>
      <wd-button @click="resetForm">重置</wd-button>
    </view>
  </wd-form>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import type { FormInstance } from '@/uni_modules/wot-ui-plus/components/wd-form/types'

const formRef = ref<FormInstance>()
const form = reactive({
  username: '',
  password: ''
})
const rules = {
  username: [{ required: true, message: '请输入用户名' }],
  password: [{ required: true, message: '请输入密码' }]
}

// 提交表单
const submitForm = async () => {
  const { valid, errors } = await formRef.value?.validate()
  if (valid) {
    uni.showToast({
      title: '表单验证通过',
      icon: 'success'
    })
    // 提交表单数据
  } else {
    console.log('表单验证失败', errors)
  }
}

// 重置表单
const resetForm = () => {
  form.username = ''
  form.password = ''
  formRef.value?.reset()
}
</script>

<style scoped>
.form-actions {
  display: flex;
  gap: 20rpx;
  padding: 20rpx;
  justify-content: center;
}
</style>
```

### 自定义验证规则

```vue
<template>
  <wd-form ref="formRef" v-model="form" :rules="rules">
    <wd-form-item prop="email" label="邮箱" :rules="emailRules">
      <wd-input v-model="form.email" placeholder="请输入邮箱" />
    </wd-form-item>
    <wd-form-item prop="phone" label="手机号">
      <wd-input v-model="form.phone" placeholder="请输入手机号" />
    </wd-form-item>
    <view class="form-actions">
      <wd-button type="primary" @click="submitForm">提交</wd-button>
    </view>
  </wd-form>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import type { FormInstance } from '@/uni_modules/wot-ui-plus/components/wd-form/types'

const formRef = ref<FormInstance>()
const form = reactive({
  email: '',
  phone: ''
})

// 邮箱验证规则
const emailRules = [
  { required: true, message: '请输入邮箱' },
  { 
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
    message: '请输入正确的邮箱格式' 
  }
]

const rules = {
  phone: [
    { required: true, message: '请输入手机号' },
    { 
      validator: (value: string) => {
        return /^1[3-9]\d{9}$/.test(value) || '请输入正确的手机号格式'
      } 
    }
  ]
}

// 提交表单
const submitForm = async () => {
  const { valid, errors } = await formRef.value?.validate()
  if (valid) {
    uni.showToast({
      title: '表单验证通过',
      icon: 'success'
    })
  } else {
    console.log('表单验证失败', errors)
  }
}
</script>
```

### 自定义错误提示方式

```vue
<template>
  <wd-form ref="formRef" v-model="form" :rules="rules" error-type="toast">
    <wd-form-item prop="username" label="用户名">
      <wd-input v-model="form.username" placeholder="请输入用户名" />
    </wd-form-item>
    <wd-form-item prop="password" label="密码">
      <wd-input v-model="form.password" type="password" placeholder="请输入密码" />
    </wd-form-item>
    <view class="form-actions">
      <wd-button type="primary" @click="submitForm">提交</wd-button>
    </view>
  </wd-form>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import type { FormInstance } from '@/uni_modules/wot-ui-plus/components/wd-form/types'

const formRef = ref<FormInstance>()
const form = reactive({
  username: '',
  password: ''
})
const rules = {
  username: [{ required: true, message: '请输入用户名' }],
  password: [{ required: true, message: '请输入密码' }]
}

// 提交表单
const submitForm = async () => {
  const { valid, errors } = await formRef.value?.validate()
  if (valid) {
    uni.showToast({
      title: '表单验证通过',
      icon: 'success'
    })
  }
}
</script>
```

### 验证单个字段

```vue
<template>
  <wd-form ref="formRef" v-model="form" :rules="rules">
    <wd-form-item prop="username" label="用户名">
      <wd-input v-model="form.username" placeholder="请输入用户名" />
    </wd-form-item>
    <wd-form-item prop="password" label="密码">
      <wd-input v-model="form.password" type="password" placeholder="请输入密码" />
    </wd-form-item>
    <view class="form-actions">
      <wd-button type="primary" @click="validateUsername">验证用户名</wd-button>
      <wd-button type="primary" @click="validateAll">验证所有</wd-button>
    </view>
  </wd-form>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import type { FormInstance } from '@/uni_modules/wot-ui-plus/components/wd-form/types'

const formRef = ref<FormInstance>()
const form = reactive({
  username: '',
  password: ''
})
const rules = {
  username: [{ required: true, message: '请输入用户名' }],
  password: [{ required: true, message: '请输入密码' }]
}

// 验证单个字段
const validateUsername = async () => {
  const { valid, errors } = await formRef.value?.validate('username')
  if (valid) {
    uni.showToast({
      title: '用户名验证通过',
      icon: 'success'
    })
  }
}

// 验证所有字段
const validateAll = async () => {
  const { valid, errors } = await formRef.value?.validate()
  if (valid) {
    uni.showToast({
      title: '表单验证通过',
      icon: 'success'
    })
  }
}
</script>
```

## 样式定制指南

### customStyle 和 customClass

wd-form 组件支持通过 `customStyle` 和 `customClass` 进行样式定制。

```vue
<template>
  <wd-form 
    v-model="form" 
    :rules="rules"
    :custom-style="{ backgroundColor: '#f5f5f5', padding: '20rpx' }"
    custom-class="custom-form"
  >
    <!-- 表单内容 -->
  </wd-form>
</template>

<style scoped>
.custom-form {
  /* 自定义类名样式 */
  border-radius: 10rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}
</style>
```

## 注意事项

1. **表单数据绑定**：
   - `model` 属性必须是一个对象，用于存储表单数据
   - 建议使用 `reactive` 或 `ref` 创建响应式对象

2. **验证规则定义**：
   - 验证规则可以在 `wd-form` 组件的 `rules` 属性中定义，也可以在 `wd-form-item` 组件的 `rules` 属性中定义
   - 当两者都定义时，会合并验证规则
   - 验证规则支持 `required`、`message`、`pattern` 和 `validator` 等属性

3. **验证方法调用**：
   - 使用 `ref` 获取表单实例，然后调用 `validate` 方法进行验证
   - `validate` 方法返回一个 Promise，可以使用 `async/await` 处理
   - 可以通过参数指定验证单个或多个字段

4. **错误提示方式**：
   - 支持三种错误提示方式：`toast`、`message` 和 `none`
   - `toast` 方式会弹出提示框，显示第一个错误信息
   - `message` 方式会在表单字段下方显示错误信息
   - `none` 方式不显示错误信息，只返回验证结果

5. **性能优化建议**：
   - 对于复杂表单，建议合理拆分表单字段，避免一次性验证过多字段
   - 对于频繁变化的字段，可以考虑关闭 `resetOnChange` 属性，减少不必要的验证信息重置
   - 合理使用 `validator` 函数，避免在验证函数中执行复杂的计算或异步操作

6. **使用限制**：
   - `wd-form` 组件必须包含 `wd-form-item` 组件才能正常工作
   - `wd-form-item` 组件的 `prop` 属性必须与 `model` 对象的属性名一致
   - 组件依赖于 UniApp 环境，无法在纯 Vue 项目中直接使用

7. **事件处理**：
   - 组件没有定义任何事件，所有交互都通过方法调用和属性绑定实现

## 组件架构与实现

wd-form 组件采用了 Vue 3 的 Composition API 和 TypeScript，主要包含以下部分：

1. **组件主体**：`wd-form.vue`，负责表单的整体管理和验证逻辑
2. **类型定义**：`types.ts`，包含组件的属性、事件和接口定义
3. **依赖注入**：使用 Vue 3 的 `provide/inject` 机制，将表单数据和验证规则传递给子组件

组件的核心实现原理：

1. **数据绑定**：通过 `model` 属性实现表单数据的双向绑定
2. **验证规则**：支持在 `wd-form` 和 `wd-form-item` 组件中定义验证规则
3. **依赖注入**：使用 `provide` 提供表单上下文，`inject` 获取表单上下文
4. **表单验证**：实现了 `validate` 方法，支持单个或多个字段的验证
5. **错误提示**：支持多种错误提示方式，包括 toast、message 和 none

## 总结

wd-form 是一个功能强大、高度可定制的表单组件，与 wd-form-item 组件配合使用，提供了完整的表单解决方案。该组件支持表单数据绑定、自定义验证规则、多种错误提示方式等功能，适用于各种需要表单验证的场景。

通过合理使用 wd-form 组件，可以提高表单开发效率，确保表单数据的准确性和完整性，提升用户体验。在使用过程中，建议根据实际需求调整组件的配置选项，以达到最佳的使用效果。