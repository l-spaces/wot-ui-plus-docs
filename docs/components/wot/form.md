# Form 表单

## 组件概述

Form 表单组件由 `wd-form` 和 `wd-form-item` 两个组件配合使用，用于数据收集、校验和提交。`wd-form` 作为表单容器管理校验逻辑，`wd-form-item` 作为表单项展示标签和错误信息。支持必填校验、正则校验、函数校验和异步校验，错误提示支持 toast、行内消息和不提示三种方式。

## 核心功能描述

- **多种校验方式**：支持 required（必填）、pattern（正则）、validator（函数/异步函数）三种校验规则
- **错误提示方式**：支持 toast（轻提示）、message（行内消息）、none（不提示）三种方式
- **自动重置**：输入变化时自动重置校验信息（可通过 `resetOnChange` 关闭）
- **指定字段校验**：validate 方法支持传入字段名或字段名数组，只校验指定字段
- **表单项组件**：`wd-form-item` 基于 `wd-cell` 封装，自动展示标签、必填标记和错误信息
- **规则合并**：支持在 form 和 form-item 上分别定义校验规则，自动合并

## 适用业务场景

- **登录注册表单**：收集用户名、密码等信息，配合必填和格式校验
- **信息填写表单**：收集用户详细信息，使用行内消息提示校验错误
- **复杂表单**：使用异步校验验证用户名是否已存在等场景

## API

### Form Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| model | Object | - | 是 | 表单数据对象 |
| rules | Object | {} | 否 | 表单验证规则，键为字段名，值为规则数组 |
| resetOnChange | Boolean | true | 否 | 是否在输入时重置表单校验信息 |
| errorType | String | 'message' | 否 | 错误提示类型，可选值：toast / message / none |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Form Methods

| 方法名称 | 参数 | 返回值 | 说明 |
|---------|------|--------|------|
| validate | (prop?: string \| string[]) | Promise<{ valid: boolean; errors: ErrorMessage[] }> | 表单校验，可传入指定字段名或字段名数组 |
| reset | - | void | 重置表单项的验证提示 |

### FormItem Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| prop | String | - | 是 | 表单域模型字段名，对应 model 中的键名 |
| rules | Array | [] | 否 | 表单域校验规则，与 form 的 rules 合并 |
| required | Boolean | false | 否 | 是否显示必填标记 |
| label | String | - | 否 | 标签文本 |
| labelWidth | String | '100px' | 否 | 标签宽度 |
| center | Boolean | false | 否 | 是否居中对齐 |
| isLink | Boolean | false | 否 | 是否显示为链接 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### FormItemRule 类型定义

| 属性名称 | 类型 | 是否必填 | 说明 |
|---------|------|---------|------|
| required | Boolean | 是 | 是否必填 |
| message | String | 是 | 校验失败时的提示信息 |
| pattern | RegExp | 否 | 正则表达式校验 |
| validator | Function | 否 | 自定义校验函数，返回 boolean / Promise\<string\> / Promise\<boolean\> |

### FormItem Slots

| 插槽名称 | 作用域参数 | 使用场景 |
|---------|-----------|---------|
| default | - | 表单项内容，通常放置输入组件 |

## 使用示例

### 示例1：基础表单

使用 `wd-form` 包裹表单项，通过 `model` 绑定数据，通过 `validate` 方法触发校验。

```vue
<template>
  <wd-form ref="form" :model="model">
    <wd-cell-group border>
      <wd-input
        label="用户名"
        label-width="100px"
        prop="username"
        clearable
        v-model="model.username"
        placeholder="请输入用户名"
        :rules="[{ required: true, message: '请输入用户名' }]"
      />
      <wd-input
        label="密码"
        label-width="100px"
        prop="password"
        show-password
        clearable
        v-model="model.password"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请输入密码' }]"
      />
    </wd-cell-group>
    <view class="footer">
      <wd-button type="primary" size="large" @click="handleSubmit" block>提交</wd-button>
    </view>
  </wd-form>
</template>

<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-ui-plus'
import type { FormInstance } from '@/uni_modules/wot-ui-plus/components/wd-form/types'
import { reactive, ref } from 'vue'

const { success } = useToast()
const form = ref<FormInstance>()

const model = reactive({
  username: '',
  password: ''
})

function handleSubmit() {
  form.value!.validate().then(({ valid }) => {
    if (valid) {
      success({ msg: '提交成功' })
    }
  })
}
</script>
```

### 示例2：校验规则

支持正则校验、函数校验和异步校验三种方式。

```vue
<template>
  <wd-form ref="form" :model="model">
    <wd-cell-group border>
      <wd-input
        label="正则校验"
        label-width="100px"
        prop="value1"
        clearable
        v-model="model.value1"
        placeholder="请输入6位数字"
        :rules="[{ required: false, pattern: /\d{6}/, message: '请输入6位数字' }]"
      />
      <wd-input
        label="函数校验"
        label-width="100px"
        prop="value2"
        clearable
        v-model="model.value2"
        placeholder="请输入手机号"
        :rules="[{
          required: false,
          validator: (val) => /1\d{10}/.test(val),
          message: '请输入正确的手机号'
        }]"
      />
      <wd-input
        label="异步校验"
        label-width="100px"
        prop="value3"
        clearable
        v-model="model.value3"
        placeholder="请输入1234"
        :rules="[{ required: false, validator: asyncValidator, message: '请输入1234' }]"
      />
    </wd-cell-group>
    <view class="footer">
      <wd-button type="primary" size="large" @click="handleSubmit" block>提交</wd-button>
    </view>
  </wd-form>
</template>

<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-ui-plus'
import type { FormInstance } from '@/uni_modules/wot-ui-plus/components/wd-form/types'
import { reactive, ref } from 'vue'

const { success, loading, close } = useToast()
const form = ref<FormInstance>()

const model = reactive({
  value1: '',
  value2: '',
  value3: ''
})

const asyncValidator = (val: string) =>
  new Promise((resolve) => {
    loading('验证中')
    setTimeout(() => {
      close()
      resolve(val === '1234')
    }, 1000)
  })

function handleSubmit() {
  form.value!.validate().then(({ valid }) => {
    if (valid) {
      success({ msg: '提交成功' })
    }
  })
}
</script>
```

### 示例3：使用 form-item 自定义布局

使用 `wd-form-item` 包裹自定义内容，实现更灵活的表单布局。

```vue
<template>
  <wd-form ref="form" :model="model" :rules="rules">
    <wd-form-item label="用户名" prop="username" required>
      <wd-input v-model="model.username" placeholder="请输入用户名" no-border />
    </wd-form-item>
    <wd-form-item label="性别" prop="gender" required>
      <wd-radio-group v-model="model.gender" inline>
        <wd-radio :value="1">男</wd-radio>
        <wd-radio :value="2">女</wd-radio>
      </wd-radio-group>
    </wd-form-item>
  </wd-form>
</template>

<script lang="ts" setup>
import type { FormInstance } from '@/uni_modules/wot-ui-plus/components/wd-form/types'
import { reactive, ref } from 'vue'

const form = ref<FormInstance>()

const model = reactive({
  username: '',
  gender: null
})

const rules = {
  username: [{ required: true, message: '请输入用户名' }],
  gender: [{ required: true, message: '请选择性别' }]
}
</script>
```

### 示例4：校验提示方式

通过 `errorType` 属性控制校验错误的提示方式。

```vue
<template>
  <wd-form ref="form" :model="model" error-type="toast">
    <wd-cell-group border>
      <wd-input
        label="姓名"
        prop="name"
        v-model="model.name"
        placeholder="请输入姓名"
        :rules="[{ required: true, message: '请输入姓名' }]"
      />
    </wd-cell-group>
  </wd-form>
</template>

<script lang="ts" setup>
import type { FormInstance } from '@/uni_modules/wot-ui-plus/components/wd-form/types'
import { reactive, ref } from 'vue'

const form = ref<FormInstance>()

const model = reactive({
  name: ''
})
</script>
```

## 注意事项

- `wd-form` 的 `model` 属性为必填项，校验时通过 model 获取字段值
- `wd-form-item` 的 `prop` 属性必须与 `model` 中的键名对应
- 校验规则可以在 `wd-form` 的 `rules` 和 `wd-form-item` 的 `rules` 上分别定义，会自动合并
- `validator` 函数返回 `true` 表示校验通过，返回 `false` 或字符串表示校验失败（字符串会替换 message 作为错误提示）
- `validator` 支持返回 Promise，可实现异步校验（如请求后端验证）
- 当 `errorType` 为 `toast` 时，只显示第一个校验错误
- 当 `errorType` 为 `message` 时，所有校验错误以行内消息形式展示
- `resetOnChange` 默认为 true，输入变化时会自动清除校验提示
