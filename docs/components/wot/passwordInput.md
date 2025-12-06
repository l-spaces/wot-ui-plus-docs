# PasswordInput 密码输入框

<demo-model url="/subPages/passwordInput/Index"></demo-model>


## 组件概况

### 组件概述
密码输入框组件是一种特殊的输入框，用于输入密码等敏感信息，通常用于登录页、注册页、支付页等需要输入密码的场景。wd-password-input 组件提供了安全的密码输入方式，支持密码掩码、自定义长度、间距调整、错误提示等功能。

### 详细功能描述
- 支持密码双向绑定
- 支持密码掩码显示
- 支持自定义密码长度
- 支持自定义格子间距
- 支持聚焦状态显示光标
- 支持下方文字提示
- 支持错误提示
- 支持自定义样式和类名
- 支持触摸聚焦事件

### 适用业务场景
- 登录页密码输入
- 注册页密码设置
- 支付页密码验证
- 身份验证密码输入
- 任何需要安全输入密码的场景

## 完整API参考

### Props属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| modelValue | string | '' | 否 | 绑定的值 |
| mask | boolean | true | 否 | 是否隐藏密码内容 |
| info | string | '' | 否 | 输入框下方文字提示 |
| errorInfo | string | '' | 否 | 输入框下方错误提示 |
| gutter | number / string | 0 | 否 | 输入框格子之间的间距，如 20px 2em，默认单位为 px |
| length | number | 6 | 否 | 密码最大长度 |
| focused | boolean | true | 否 | 是否已聚焦，聚焦时会显示光标 |
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |

### Events事件

| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| focus | 触摸输入框时 | event: 原生触摸事件 |

### Methods方法

该组件没有对外暴露的方法。

### Slots插槽

该组件没有定义插槽。

## 多场景使用示例代码

### 1. 基础用法

```vue
<template>
  <view class="password-input-demo">
    <wd-password-input 
      v-model="password" 
      @focus="onFocus"
    />
    <view class="password-info">输入的密码：{{ password }}</view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const password = ref('')

const onFocus = (event: Event) => {
  console.log('密码输入框聚焦', event)
}
</script>

<style scoped>
.password-input-demo {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.password-info {
  font-size: 16px;
  color: #666;
}
</style>
```

### 2. 自定义长度和间距

```vue
<template>
  <view class="password-input-demo">
    <wd-password-input 
      v-model="password" 
      :length="8" 
      :gutter="10"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const password = ref('')
</script>
```

### 3. 无掩码模式

```vue
<template>
  <view class="password-input-demo">
    <wd-password-input 
      v-model="password" 
      :mask="false"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const password = ref('')
</script>
```

### 4. 带提示信息

```vue
<template>
  <view class="password-input-demo">
    <wd-password-input 
      v-model="password" 
      info="请输入6位数字密码"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const password = ref('')
</script>
```

### 5. 带错误提示

```vue
<template>
  <view class="password-input-demo">
    <wd-password-input 
      v-model="password" 
      error-info="密码输入错误，请重新输入"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const password = ref('123')
</script>
```

## 样式定制指南

### customStyle 用法
使用 customStyle 属性可以自定义密码输入框的内联样式，例如修改高度、宽度、背景色等。

```vue
<wd-password-input 
  v-model="password" 
  custom-style="height: 60px; width: 300px; background-color: #f5f7fa;"
/>
```

### customClass 用法
使用 customClass 属性可以为密码输入框添加自定义样式类，便于在外部 CSS 中进行样式定制。

```vue
<wd-password-input 
  v-model="password" 
  custom-class="my-password-input"
/>

<style scoped>
:deep(.my-password-input) {
  --wd-password-input-height: 50px;
  --wd-password-input-item-height: 50px;
  --wd-password-input-item-width: 50px;
  --wd-password-input-border-color: #409eff;
  --wd-password-input-cursor-color: #409eff;
}
</style>
```

## 注意事项

1. **密码长度限制**：通过 length 属性设置密码的最大长度，输入超过该长度的字符会被自动截断。

2. **双向绑定**：组件支持使用 v-model 双向绑定密码值，也可以使用 :model-value 和 @update:model-value 手动绑定。

3. **mask 属性**：当 mask 为 true 时，密码会显示为掩码（通常是圆点）；当 mask 为 false 时，密码会显示为明文。

4. **focused 属性**：当 focused 为 true 且输入框获得焦点时，会显示光标；当 focused 为 false 时，不会显示光标。

5. **gutter 属性**：gutter 属性用于设置输入框格子之间的间距，可以是数字或字符串，默认单位为 px。

6. **info 和 errorInfo 属性**：info 用于显示正常提示信息，errorInfo 用于显示错误提示信息。当 errorInfo 存在时，会优先显示 errorInfo。

7. **触摸聚焦**：点击输入框时，会触发 focus 事件，可以在该事件中处理键盘弹出等逻辑。

8. **样式定制**：可以通过 CSS 变量修改密码输入框的样式，包括高度、宽度、边框颜色、光标颜色等。

9. **兼容性**：组件在不同平台上的表现可能略有差异，特别是在光标显示和键盘弹出方面。建议在多平台测试后再使用。

10. **安全考虑**：密码输入框组件本身不会对密码进行加密处理，建议在提交密码前对密码进行加密或哈希处理。