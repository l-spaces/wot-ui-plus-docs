# Code 验证码倒计时

<demo-model url="/subPages/code/Index"></demo-model>

## 组件概况

### 组件概述
Code 验证码倒计时组件是一个用于管理验证码发送和倒计时功能的工具组件，提供了完整的倒计时管理机制，支持页面切换时保持倒计时状态，适用于各种需要发送验证码的场景。

### 详细功能描述
- 支持自定义倒计时时长、按钮文字内容
- 提供开始、结束、状态变化等事件回调
- 支持页面切换时保持倒计时状态不中断
- 支持多个验证码组件同时使用（通过uniqueKey区分）
- 提供start和reset方法手动控制倒计时
- 暴露canGetCode状态，便于外部控制按钮可用性
- 自动处理倒计时状态管理，防止重复触发

### 适用业务场景
- 手机验证码登录/注册
- 邮箱验证码验证
- 短信验证码找回密码
- 支付验证码验证
- 各种需要发送验证码的表单场景

## 完整API参考

### Props
| 名称 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| seconds | string \| number | 60 | 否 | 倒计时时长，单位秒 |
| startText | string | '获取验证码' | 否 | 开始时按钮文字 |
| changeText | string | 'X秒重新获取' | 否 | 倒计时进行中按钮文字，X为剩余秒数 |
| endText | string | '重新获取' | 否 | 结束时按钮文字 |
| keepRunning | boolean | false | 否 | 是否保持倒计时不中断（如页面切换） |
| uniqueKey | string | '' | 否 | 唯一标识key，用于区分多个验证码组件 |
| customStyle | object | - | 否 | 自定义样式，对象形式 |
| customClass | string | - | 否 | 自定义类名 |

### Events
| 名称 | 触发条件 | 参数说明 |
| --- | --- | --- |
| change | 倒计时状态变化时 | 当前显示的按钮文本 |
| start | 开始倒计时时 | 无 |
| end | 倒计时结束时 | 无 |

### Methods
| 名称 | 参数 | 返回值 | 功能说明 |
| --- | --- | --- | --- |
| start | - | - | 开始倒计时 |
| reset | - | - | 重置倒计时，可以让用户再次获取验证码 |

### Slots
该组件不包含任何插槽。

## 多场景使用示例代码

### 1. 基础用法
```vue
<template>
  <view class="demo-container">
    <wd-code ref="codeRef" @change="onCodeChange"></wd-code>
    <button @click="sendCode" :disabled="!canSend">
      {{ codeText }}
    </button>
  </view>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

const codeRef = ref()
const codeText = ref('获取验证码')
const canSend = ref(true)

// 验证码文本变化事件
const onCodeChange = (text: string) => {
  codeText.value = text
  canSend.value = text === '获取验证码' || text === '重新获取'
}

// 发送验证码
const sendCode = () => {
  // 调用验证码组件的start方法开始倒计时
  codeRef.value.start()
  
  // 这里可以添加发送验证码的请求逻辑
  console.log('发送验证码')
}
</script>

<style scoped>
.demo-container {
  padding: 20px;
}

button {
  padding: 10px 20px;
  background-color: #4d80f0;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
}

button:disabled {
  background-color: #c0c4cc;
}
</style>
```

### 2. 自定义倒计时时长和文字
```vue
<template>
  <view class="demo-container">
    <wd-code 
      ref="codeRef" 
      :seconds="120" 
      start-text="发送验证码" 
      change-text="剩余X秒" 
      end-text="再次发送" 
      @change="onCodeChange"
    ></wd-code>
    <button @click="sendCode" :disabled="!canSend">
      {{ codeText }}
    </button>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const codeRef = ref()
const codeText = ref('发送验证码')
const canSend = ref(true)

const onCodeChange = (text: string) => {
  codeText.value = text
  canSend.value = text === '发送验证码' || text === '再次发送'
}

const sendCode = () => {
  codeRef.value.start()
  console.log('发送验证码')
}
</script>

<style scoped>
.demo-container {
  padding: 20px;
}

button {
  padding: 10px 20px;
  background-color: #4d80f0;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
}

button:disabled {
  background-color: #c0c4cc;
}
</style>
```

### 3. 页面切换保持倒计时
```vue
<template>
  <view class="demo-container">
    <wd-code 
      ref="codeRef" 
      :keep-running="true" 
      unique-key="login-code" 
      @change="onCodeChange"
    ></wd-code>
    <button @click="sendCode" :disabled="!canSend">
      {{ codeText }}
    </button>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const codeRef = ref()
const codeText = ref('获取验证码')
const canSend = ref(true)

const onCodeChange = (text: string) => {
  codeText.value = text
  canSend.value = text === '获取验证码' || text === '重新获取'
}

const sendCode = () => {
  codeRef.value.start()
  console.log('发送验证码')
}
</script>

<style scoped>
.demo-container {
  padding: 20px;
}

button {
  padding: 10px 20px;
  background-color: #4d80f0;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
}

button:disabled {
  background-color: #c0c4cc;
}
</style>
```

### 4. 手动重置倒计时
```vue
<template>
  <view class="demo-container">
    <wd-code ref="codeRef" @change="onCodeChange"></wd-code>
    <button @click="sendCode" :disabled="!canSend">
      {{ codeText }}
    </button>
    <button @click="resetCode" style="margin-left: 10px;">
      重置
    </button>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const codeRef = ref()
const codeText = ref('获取验证码')
const canSend = ref(true)

const onCodeChange = (text: string) => {
  codeText.value = text
  canSend.value = text === '获取验证码' || text === '重新获取'
}

const sendCode = () => {
  codeRef.value.start()
  console.log('发送验证码')
}

// 手动重置倒计时
const resetCode = () => {
  codeRef.value.reset()
  console.log('重置倒计时')
}
</script>

<style scoped>
.demo-container {
  padding: 20px;
  display: flex;
  align-items: center;
}

button {
  padding: 10px 20px;
  background-color: #4d80f0;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
}

button:disabled {
  background-color: #c0c4cc;
}
</style>
```

### 5. 表单中使用验证码
```vue
<template>
  <view class="demo-container">
    <view class="form-item">
      <text class="label">手机号</text>
      <input 
        v-model="phone" 
        class="input" 
        placeholder="请输入手机号" 
        type="number"
      />
    </view>
    
    <view class="form-item">
      <text class="label">验证码</text>
      <view class="code-input-container">
        <input 
          v-model="code" 
          class="code-input" 
          placeholder="请输入验证码" 
          type="number"
        />
        <wd-code 
          ref="codeRef" 
          @change="onCodeChange"
        ></wd-code>
        <button 
          class="code-btn" 
          @click="sendCode" 
          :disabled="!canSend || !isPhoneValid"
        >
          {{ codeText }}
        </button>
      </view>
    </view>
    
    <button 
      class="submit-btn" 
      @click="submitForm" 
      :disabled="!isFormValid"
    >
      提交
    </button>
  </view>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

const codeRef = ref()
const phone = ref('')
const code = ref('')
const codeText = ref('获取验证码')
const canSend = ref(true)

// 手机号验证
const isPhoneValid = computed(() => {
  return /^1[3-9]\d{9}$/.test(phone.value)
})

// 表单验证
const isFormValid = computed(() => {
  return isPhoneValid.value && code.value.length === 6
})

const onCodeChange = (text: string) => {
  codeText.value = text
  canSend.value = text === '获取验证码' || text === '重新获取'
}

const sendCode = () => {
  if (isPhoneValid.value) {
    codeRef.value.start()
    console.log('发送验证码到:', phone.value)
  }
}

const submitForm = () => {
  console.log('提交表单:', { phone: phone.value, code: code.value })
}
</script>

<style scoped>
.demo-container {
  padding: 20px;
}

.form-item {
  margin-bottom: 20px;
}

.label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #606266;
}

.input, .code-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}

.code-input-container {
  display: flex;
  align-items: center;
}

.code-input {
  flex: 1;
  margin-right: 10px;
}

.code-btn {
  padding: 10px;
  background-color: #4d80f0;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  min-width: 100px;
}

.code-btn:disabled {
  background-color: #c0c4cc;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background-color: #4d80f0;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  margin-top: 20px;
}

.submit-btn:disabled {
  background-color: #c0c4cc;
}
</style>
```

## 样式定制指南

### customStyle 自定义样式
通过 `customStyle` 属性可以直接设置组件的内联样式，用于调整组件的位置、边距等。

```vue
<wd-code 
  ref="codeRef" 
  :custom-style="{ marginLeft: '10px' }"
  @change="onCodeChange"
></wd-code>
```

### customClass 自定义类名
通过 `customClass` 属性可以为组件添加自定义类名，结合外部样式表进行更复杂的样式定制。

```vue
<wd-code 
  ref="codeRef" 
  custom-class="my-code"
  @change="onCodeChange"
></wd-code>
```

```scss
.my-code {
  // 自定义验证码组件样式
  margin: 0 10px;
}
```

## 注意事项

### 常见问题解决方案
1. **多个验证码组件冲突**：
   - 为每个验证码组件设置不同的 `uniqueKey` 属性
   - 确保每个组件的 ref 名称唯一

2. **页面切换后倒计时重置**：
   - 设置 `keepRunning` 属性为 `true`
   - 确保 `uniqueKey` 属性唯一且不为空

3. **倒计时不准确**：
   - 避免在组件渲染时进行大量计算
   - 确保设备时间准确
   - 避免频繁切换页面

### 性能优化建议
- 不需要倒计时功能时，避免创建组件实例
- 多个验证码组件同时使用时，注意控制数量
- 页面卸载时，组件会自动清理定时器，无需手动处理

### 使用限制条件
- 组件依赖定时器，在某些低功耗模式下可能会有延迟
- `keepRunning` 功能依赖本地存储，需要确保应用有存储权限
- 倒计时时长建议设置在合理范围内（10-120秒）
