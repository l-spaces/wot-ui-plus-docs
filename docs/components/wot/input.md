# Input 输入框

<demo-model url="/subPages/input/Index"></demo-model>


## 组件概况

### 组件概述
Input 是一个功能丰富的输入框组件，基于原生 input 组件封装，提供了多种输入类型、表单验证、前缀后缀图标、清空按钮、密码可见性切换等增强功能。它支持与 Form 组件配合使用，实现表单验证逻辑，同时提供了丰富的样式定制选项。

### 核心功能
- 支持多种输入类型（文本、数字、密码、身份证等）
- 支持表单验证集成
- 支持前缀和后缀图标/插槽
- 支持清空按钮
- 支持密码可见性切换
- 支持字数统计
- 支持只读和禁用状态
- 支持错误状态显示
- 支持自定义键盘类型
- 支持自定义样式

### 适用业务场景
- 登录注册表单
- 用户信息编辑
- 搜索框
- 密码输入
- 验证码输入
- 金额输入
- 带图标的输入框

## 完整API参考

### Props
| 名称 | 类型 | 默认值 | 必填项 | 描述 |
| --- | --- | --- | --- | --- |
| customInputClass | string | '' | 否 | 自定义输入框样式类 |
| customLabelClass | string | '' | 否 | 自定义标签样式类 |
| placeholder | string | - | 否 | 占位文本 |
| placeholderStyle | string | - | 否 | 原生属性，指定 placeholder 的样式，目前仅支持color,font-size和font-weight |
| placeholderClass | string | '' | 否 | 原生属性，指定 placeholder 的样式类 |
| cursorSpacing | number | 0 | 否 | 原生属性，指定光标与键盘的距离 |
| cursor | number | -1 | 否 | 原生属性，指定focus时的光标位置 |
| selectionStart | number | -1 | 否 | 原生属性，光标起始位置 |
| selectionEnd | number | -1 | 否 | 原生属性，光标结束位置 |
| adjustPosition | boolean | true | 否 | 原生属性，键盘弹起时，是否自动上推页面 |
| holdKeyboard | boolean | false | 否 | focus时，点击页面的时候不收起键盘 |
| confirmType | string | 'done' | 否 | 设置键盘右下角按钮的文字，可选值：done / go / next / search / send |
| confirmHold | boolean | false | 否 | 点击键盘右下角按钮时是否保持键盘不收起 |
| focus | boolean | false | 否 | 原生属性，获取焦点 |
| type | string | 'text' | 否 | 输入框类型，可选值：text / number / digit / idcard / safe-password / nickname / tel |
| maxlength | number | -1 | 否 | 原生属性，最大长度 |
| disabled | boolean | false | 否 | 原生属性，禁用 |
| alwaysEmbed | boolean | false | 否 | 微信小程序原生属性，强制 input 处于同层状态 |
| alignRight | boolean | false | 否 | 输入框的值靠右展示 |
| modelValue | number / string | '' | 否 | 绑定值 |
| showPassword | boolean | false | 否 | 显示为密码框 |
| clearable | boolean | false | 否 | 显示清空按钮 |
| readonly | boolean | false | 否 | 只读 |
| prefixIcon | string | - | 否 | 前置图标，可选值见 wd-icon 组件 |
| suffixIcon | string | - | 否 | 后置图标，可选值见 wd-icon 组件 |
| showWordLimit | boolean | false | 否 | 显示字数限制 |
| label | string | - | 否 | 设置左侧标题 |
| labelWidth | string | - | 否 | 设置左侧标题宽度 |
| size | string | - | 否 | 设置输入框大小，可选值：large |
| error | boolean | false | 否 | 设置输入框错误状态 |
| center | boolean | false | 否 | 当有label属性时，设置标题和输入框垂直居中 |
| noBorder | boolean | false | 否 | 非 cell 类型下是否隐藏下划线 |
| required | boolean | false | 否 | 是否必填 |
| prop | string | - | 否 | 表单域 model 字段名，在使用表单校验功能的情况下，该属性是必填的 |
| rules | array | [] | 否 | 表单验证规则，结合wd-form组件使用 |
| clearTrigger | string | 'always' | 否 | 显示清除图标的时机，可选值：focus / always |
| focusWhenClear | boolean | true | 否 | 是否在点击清除按钮时聚焦输入框 |
| ignoreCompositionEvent | boolean | true | 否 | 是否忽略组件内对文本合成系统事件的处理 |
| inputmode | string | 'text' | 否 | 输入模式提示，可选值：none / text / decimal / numeric / tel / search / email / url |
| markerSide | string | 'before' | 否 | 必填标记位置，可选值：before（标签前）、after（标签后） |
| inputBorder | string | 'underline' | 否 | 边框类型，可选值：border（边框）、underline（下划线）、none（无） |
| customStyle | string | '' | 否 | 自定义样式，对象格式 |
| customClass | string | '' | 否 | 自定义类名 |

### Events
| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| update:modelValue | 输入框值变化时触发 | value: 输入框的当前值 |
| clear | 点击清空按钮时触发 | - |
| blur | 输入框失焦时触发 | detail: { value: 输入框的当前值 } |
| focus | 输入框聚焦时触发 | detail: 事件对象 |
| input | 输入框值变化时触发 | detail: 事件对象 |
| keyboardheightchange | 键盘高度变化时触发 | detail: 事件对象 |
| confirm | 点击键盘确认按钮时触发 | detail: 事件对象 |
| clicksuffixicon | 点击后缀图标时触发 | - |
| clickprefixicon | 点击前缀图标时触发 | - |
| click | 点击输入框时触发 | event: 事件对象 |

### Methods
Input 组件不直接对外暴露方法。

### Slots
| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| prefix | - | 输入框前置内容，优先级高于 prefixIcon |
| suffix | - | 输入框后置内容，优先级高于 suffixIcon 和 clear 按钮 |
| label | - | 自定义标签内容，优先级高于 label 属性 |

## 多场景使用示例代码

### 基础用法

```vue
<template>
  <wd-input v-model="value" placeholder="请输入内容" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
```

### 不同类型输入框

```vue
<template>
  <view class="input-group">
    <text class="input-label">文本输入</text>
    <wd-input v-model="textValue" placeholder="请输入文本" />
  </view>
  
  <view class="input-group">
    <text class="input-label">数字输入</text>
    <wd-input v-model="numberValue" type="number" placeholder="请输入数字" />
  </view>
  
  <view class="input-group">
    <text class="input-label">密码输入</text>
    <wd-input v-model="passwordValue" type="password" placeholder="请输入密码" show-password />
  </view>
  
  <view class="input-group">
    <text class="input-label">身份证输入</text>
    <wd-input v-model="idcardValue" type="idcard" placeholder="请输入身份证号" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const textValue = ref('')
const numberValue = ref('')
const passwordValue = ref('')
const idcardValue = ref('')
</script>

<style scoped>
.input-group {
  margin-bottom: 20px;
}

.input-label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #606266;
}
</style>
```

### 带图标的输入框

```vue
<template>
  <view class="icon-input-group">
    <wd-input 
      v-model="searchValue" 
      placeholder="搜索" 
      prefix-icon="search"
      clearable
    />
  </view>
  
  <view class="icon-input-group">
    <wd-input 
      v-model="phoneValue" 
      placeholder="请输入手机号" 
      prefix-icon="phone"
    />
  </view>
  
  <view class="icon-input-group">
    <wd-input 
      v-model="emailValue" 
      placeholder="请输入邮箱" 
      prefix-icon="email"
      suffix-icon="check"
    />
  </view>
  
  <view class="icon-input-group">
    <wd-input 
      v-model="customValue" 
      placeholder="自定义前后置内容"
    >
      <template #prefix>
        <view class="custom-prefix">+86</view>
      </template>
      <template #suffix>
        <wd-icon name="close-circle" @click="clearCustomValue" />
      </template>
    </wd-input>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const searchValue = ref('')
const phoneValue = ref('')
const emailValue = ref('')
const customValue = ref('')

const clearCustomValue = () => {
  customValue.value = ''
}
</script>

<style scoped>
.icon-input-group {
  margin-bottom: 20px;
}

.custom-prefix {
  color: #909399;
  font-size: 14px;
  padding-right: 8px;
}
</style>
```

### 带标签的输入框

```vue
<template>
  <view class="label-input-group">
    <wd-input 
      v-model="nameValue" 
      label="姓名"
      placeholder="请输入姓名"
      :required="true"
    />
  </view>
  
  <view class="label-input-group">
    <wd-input 
      v-model="ageValue" 
      label="年龄"
      label-width="60px"
      type="number"
      placeholder="请输入年龄"
    />
  </view>
  
  <view class="label-input-group">
    <wd-input 
      v-model="addressValue" 
      label="地址"
      placeholder="请输入地址"
      center
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const nameValue = ref('')
const ageValue = ref('')
const addressValue = ref('')
</script>

<style scoped>
.label-input-group {
  margin-bottom: 20px;
}
</style>
```

### 表单验证

```vue
<template>
  <wd-form :model="formData" :rules="rules" ref="formRef">
    <view class="form-item">
      <wd-input 
        v-model="formData.username" 
        label="用户名"
        prop="username"
        placeholder="请输入用户名"
      />
    </view>
    
    <view class="form-item">
      <wd-input 
        v-model="formData.password" 
        label="密码"
        prop="password"
        type="password"
        placeholder="请输入密码"
        show-password
      />
    </view>
    
    <view class="form-item">
      <wd-input 
        v-model="formData.email" 
        label="邮箱"
        prop="email"
        placeholder="请输入邮箱"
        prefix-icon="email"
      />
    </view>
    
    <wd-button type="primary" @click="submitForm">提交</wd-button>
  </wd-form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const formRef = ref()

const formData = reactive({
  username: '',
  password: '',
  email: ''
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于 6 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ]
}

const submitForm = () => {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      console.log('表单验证通过', formData)
      // 提交表单
    } else {
      console.log('表单验证失败')
    }
  })
}
</script>

<style scoped>
.form-item {
  margin-bottom: 20px;
}
</style>
```

### 带字数统计的输入框

```vue
<template>
  <wd-input 
    v-model="textareaValue" 
    placeholder="请输入内容" 
    :maxlength="100"
    show-word-limit
    type="text"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const textareaValue = ref('')
</script>
```

## 样式定制指南

### 使用 customStyle 自定义样式

```vue
<template>
  <wd-input 
    v-model="value" 
    placeholder="自定义样式输入框"
    :custom-style="{
      backgroundColor: '#f5f7fa',
      borderRadius: '8px',
      border: '1px solid #e4e7ed'
    }"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
```

### 使用 customClass 自定义类名

```vue
<template>
  <wd-input 
    v-model="value" 
    placeholder="自定义类名输入框"
    custom-class="my-input"
  />
</template>

<style scoped>
.my-input {
  background-color: #fff2f0;
  border: 1px solid #ffccc7;
  border-radius: 4px;
}

.my-input .wd-input__inner {
  color: #ff4d4f;
}
</style>
```

### 自定义前缀和后缀样式

```vue
<template>
  <wd-input 
    v-model="value" 
    placeholder="自定义图标样式"
    prefix-icon="search"
    suffix-icon="close"
    custom-class="custom-icon-input"
  />
</template>

<style scoped>
.custom-icon-input .wd-input__icon {
  color: #1989fa;
  font-size: 20px;
}
</style>
```

## 注意事项

1. **输入类型**：type 属性支持多种输入类型，需根据实际需求选择合适的类型，以获得更好的输入体验和键盘适配。

2. **密码框**：showPassword 属性为 true 时，会显示密码可见性切换按钮，点击可切换密码的显示/隐藏状态。

3. **清空按钮**：clearable 属性为 true 时，输入框有内容且不为禁用/只读状态时会显示清空按钮。

4. **表单验证**：与 Form 组件配合使用时，需设置 prop 属性，并在 Form 组件中定义相应的验证规则。

5. **焦点管理**：focus 属性用于控制输入框的焦点状态，可通过 v-model 双向绑定来动态控制焦点。

6. **字数统计**：showWordLimit 属性为 true 时，会显示字数统计，需同时设置 maxlength 属性。

7. **前缀后缀优先级**：插槽的优先级高于图标属性，即如果同时设置了 prefixIcon 和 #prefix 插槽，会优先显示插槽内容。

8. **键盘配置**：confirmType 属性用于设置键盘右下角按钮的文字，confirmHold 属性用于控制点击后是否保持键盘不收起。

9. **性能优化**：对于大量输入框的场景，建议合理使用 v-model 的 lazy 修饰符，或在适当的时候才进行数据更新。

10. **平台兼容性**：在不同平台上，输入框的表现可能存在细微差异，建议在各平台进行测试，特别是关于键盘行为和输入模式的部分。