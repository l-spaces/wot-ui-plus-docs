# FormItem 表单项组件

<demo-model url="/subPages/formItem/Index"></demo-model>

## 组件概况

### 组件概述
FormItem 是表单组件（Form）的子组件，用于包裹单个表单项，负责表单项的标签展示、验证状态管理和错误信息显示。它与 Form 组件配合使用，实现完整的表单验证功能。

### 详细功能描述
- 支持自定义表单项标签和宽度
- 支持必填标记显示
- 支持居中对齐样式
- 支持链接样式显示
- 支持自定义验证规则
- 自动获取并显示 Form 组件的验证错误信息
- 支持边框显示配置
- 基于 Cell 组件实现，继承 Cell 组件的特性

### 适用业务场景
- 表单中的单个输入项
- 包含标签和输入控件的表单元素
- 需要验证的表单项
- 各类表单控件的容器，如输入框、选择器、开关等

## 完整API参考

### Props
| 名称 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| prop | string | - | 是 | 表单域模型字段名，与 Form 组件的 model 对应 |
| rules | array | [] | 否 | 表单域校验规则，格式为 [规则1, 规则2] |
| required | boolean | false | 否 | 是否必填，显示必填标记 |
| center | boolean | false | 否 | 是否居中对齐 |
| label | string | - | 否 | 标签文本 |
| labelWidth | string | 100px | 否 | 标签宽度 |
| isLink | boolean | false | 否 | 是否显示为链接样式 |
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |

### Events
| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |

### Methods
| 方法名 | 参数 | 返回值 | 功能说明 |
| --- | --- | --- | --- |

### Slots
| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| default | - | 用于放置表单控件，如输入框、选择器等 |

## 多场景使用示例代码

### 基础用法
```vue
<template>
  <view>
    <!-- 基础表单项 -->
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

### 自定义标签宽度和必填标记
```vue
<template>
  <view>
    <wd-form ref="formRef" v-model="form" :rules="rules">
      <!-- 自定义标签宽度和必填标记 -->
      <wd-form-item 
        label="用户名" 
        prop="username"
        label-width="80px"
        required
      >
        <wd-input v-model="form.username" placeholder="请输入用户名" />
      </wd-form-item>
      <wd-form-item 
        label="邮箱" 
        prop="email"
        label-width="80px"
        required
      >
        <wd-input v-model="form.email" placeholder="请输入邮箱" />
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
  email: ''
})

const rules = {
  username: [
    { required: true, message: '请输入用户名' }
  ],
  email: [
    { required: true, message: '请输入邮箱' },
    { pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, message: '邮箱格式不正确' }
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

### 居中对齐和链接样式
```vue
<template>
  <view>
    <wd-form ref="formRef" v-model="form" :rules="rules">
      <!-- 居中对齐 -->
      <wd-form-item 
        label="姓名" 
        prop="name"
        center
      >
        <wd-input v-model="form.name" placeholder="请输入姓名" />
      </wd-form-item>
      <!-- 链接样式 -->
      <wd-form-item 
        label="更多选项" 
        is-link
      >
        <view class="more-options">点击查看更多</view>
      </wd-form-item>
      <wd-button type="primary" @click="handleSubmit">提交</wd-button>
    </wd-form>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formRef = ref()
const form = ref({
  name: ''
})

const rules = {
  name: [
    { required: true, message: '请输入姓名' }
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

<style scoped>
.more-options {
  color: #1989fa;
}
</style>
```

### 自定义验证规则
```vue
<template>
  <view>
    <wd-form ref="formRef" v-model="form">
      <!-- 自定义验证规则 -->
      <wd-form-item 
        label="密码" 
        prop="password"
        :rules="passwordRules"
      >
        <wd-input v-model="form.password" type="password" placeholder="请输入密码" />
      </wd-form-item>
      <wd-form-item 
        label="确认密码" 
        prop="confirmPassword"
        :rules="confirmPasswordRules"
      >
        <wd-input v-model="form.confirmPassword" type="password" placeholder="请确认密码" />
      </wd-form-item>
      <wd-button type="primary" @click="handleSubmit">提交</wd-button>
    </wd-form>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formRef = ref()
const form = ref({
  password: '',
  confirmPassword: ''
})

// 密码验证规则
const passwordRules = [
  { required: true, message: '请输入密码' },
  { pattern: /^.{6,20}$/, message: '密码长度应为6-20位' }
]

// 确认密码验证规则
const confirmPasswordRules = [
  { required: true, message: '请确认密码' },
  {
    required: true,
    message: '两次密码输入不一致',
    validator: (value: string) => {
      return value === form.value.password
    }
  }
]

const handleSubmit = () => {
  formRef.value.validate().then(res => {
    if (res.valid) {
      console.log('表单验证通过')
    }
  })
}
</script>
```

### 各种表单控件
```vue
<template>
  <view>
    <wd-form ref="formRef" v-model="form" :rules="rules">
      <!-- 输入框 -->
      <wd-form-item label="姓名" prop="name">
        <wd-input v-model="form.name" placeholder="请输入姓名" />
      </wd-form-item>
      
      <!-- 开关 -->
      <wd-form-item label="是否同意" prop="agree">
        <wd-switch v-model="form.agree" />
      </wd-form-item>
      
      <!-- 选择器 -->
      <wd-form-item label="性别" prop="gender">
        <wd-picker 
          v-model="form.gender" 
          :columns="genderOptions"
          placeholder="请选择性别"
        />
      </wd-form-item>
      
      <!-- 日期选择器 -->
      <wd-form-item label="生日" prop="birthday">
        <wd-datetime-picker 
          v-model="form.birthday" 
          type="date"
          placeholder="请选择生日"
        />
      </wd-form-item>
      
      <!-- 滑块 -->
      <wd-form-item label="年龄" prop="age">
        <wd-slider v-model="form.age" :min="0" :max="100" />
      </wd-form-item>
      
      <wd-button type="primary" @click="handleSubmit">提交</wd-button>
    </wd-form>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formRef = ref()
const form = ref({
  name: '',
  agree: false,
  gender: '',
  birthday: '',
  age: 18
})

const genderOptions = ['男', '女', '保密']

const rules = {
  name: [
    { required: true, message: '请输入姓名' }
  ],
  agree: [
    {
      required: true,
      message: '请同意协议',
      validator: (value: boolean) => {
        return value
      }
    }
  ],
  gender: [
    { required: true, message: '请选择性别' }
  ],
  birthday: [
    { required: true, message: '请选择生日' }
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
<wd-form-item 
  label="用户名" 
  prop="username"
  custom-style="margin: 10px 0;"
  custom-class="custom-form-item"
>
  <wd-input v-model="form.username" placeholder="请输入用户名" />
</wd-form-item>

<style>
.custom-form-item {
  border-radius: 8px;
  background-color: #f8f9fa;
  padding: 10px;
}
</style>
```

### 错误信息样式
可以通过自定义 CSS 类修改错误信息的样式：
```vue
<wd-form-item 
  label="用户名" 
  prop="username"
>
  <wd-input v-model="form.username" placeholder="请输入用户名" />
</wd-form-item>

<style>
.wd-form-item__error-message {
  color: #fa2c19;
  font-size: 12px;
  margin-top: 4px;
}
</style>
```

## 注意事项

1. **父子关系**: FormItem 必须作为 Form 的子组件使用，不能单独使用。
2. **prop 属性**: `prop` 属性是表单项的唯一标识，必须与 Form 组件的 `model` 对象中的字段名对应。
3. **验证规则**: 可以通过 Form 组件的 `rules` 属性统一配置验证规则，也可以通过 FormItem 的 `rules` 属性单独配置。
4. **必填标记**: `required` 属性控制是否显示必填标记，不影响实际的验证逻辑，验证逻辑由 `rules` 中的 `required` 控制。
5. **标签宽度**: `labelWidth` 属性控制标签的宽度，可以根据实际需要调整。
6. **居中对齐**: `center` 属性控制表单项是否居中对齐，适用于特殊的布局需求。
7. **链接样式**: `isLink` 属性控制表单项是否显示为链接样式，通常用于点击跳转到其他页面的场景。
8. **错误信息**: 错误信息由 Form 组件的 `validate` 方法触发后，通过 `errorMessages` 传递给对应的 FormItem 显示。
9. **边框显示**: 边框显示由 Form 组件的 `border` 属性控制，默认情况下，从第二个表单项开始显示上边框。
10. **继承特性**: FormItem 基于 Cell 组件实现，继承了 Cell 组件的大部分特性和样式。
