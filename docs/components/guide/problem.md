# 常见问题解决方案与错误排查指南

## 安装与配置问题

### 问题 1：sass 编译报错，`@import` 语法不支持

**错误信息**：
```
Error: @import is not supported
```

**原因**：sass 版本高于 1.75.0，高版本已废弃 `@import` 语法，改用 `@use` 和 `@forward`。

**解决方案**：在 `package.json` 中锁定 sass 版本为 `1.75.0`：

```json
{
  "devDependencies": {
    "sass": "1.75.0"
  }
}
```

然后删除 `node_modules` 和锁文件，重新安装依赖：

```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### 问题 2：组件无法自动引入

**现象**：模板中使用 `<wd-button>` 等组件，编译时提示组件未注册。

**原因**：未正确配置 easycom 规则，或 easycom 配置路径不正确。

**解决方案**：

1. 检查 `pages.json` 中是否添加了 easycom 配置：

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

2. 如果使用 uni_modules 方式，路径应为：

```json
"^wd-(.*)": "@/uni_modules/wot-ui-plus/components/wd-$1/wd-$1.vue"
```

3. 修改 `pages.json` 后需要重新启动开发服务器

### 问题 3：Volar 无法识别组件类型

**现象**：在 VSCode 中使用 `<wd-xxx>` 组件时，没有类型提示和自动补全。

**原因**：未在 `tsconfig.json` 中配置组件类型声明。

**解决方案**：在 `tsconfig.json` 中添加类型引用：

```json
{
  "compilerOptions": {
    "types": ["wot-ui-plus/global"]
  }
}
```

## 组件使用问题

### 问题 4：Toast / MessageBox / Notify 无法显示

**现象**：调用 `useToast().show()` 后页面没有弹出提示。

**原因**：使用函数式调用时，未在模板中放置对应的组件标签。

**解决方案**：确保在使用函数式 API 的页面模板中放置对应的组件：

```vue
<template>
  <view>
    <wd-button @click="showToast">点击</wd-button>
    <!-- 必须放置组件标签 -->
    <wd-toast />
    <wd-message-box />
    <wd-notify />
  </view>
</template>

<script setup lang="ts">
import { useToast, useMessage, useNotify } from 'wot-ui-plus'

const toast = useToast()
const message = useMessage()
const { showNotify } = useNotify()

const showToast = () => {
  toast.success('操作成功')
}
</script>
```

:::warning 注意
`<wd-toast />`、`<wd-message-box />`、`<wd-notify />` 必须与对应的 `useToast()`、`useMessage()`、`useNotify()` 在同一个页面组件中使用。如果使用了 `selector` 参数，组件标签上也必须设置相同的 `selector` 属性。
:::

### 问题 5：表单验证不生效

**现象**：调用 `formRef.validate()` 后验证未按预期执行。

**原因**：常见原因包括 `model` 对象未正确绑定、`prop` 属性与 `model` 字段不匹配、`rules` 格式不正确。

**解决方案**：

1. 确保 `wd-form` 的 `model` 属性绑定了响应式对象：

```vue
<wd-form :model="formData" :rules="rules" ref="formRef">
```

2. 确保 `wd-form-item` 的 `prop` 属性与 `model` 中的字段名一致：

```vue
<wd-form-item label="用户名" prop="username">
  <wd-input v-model="formData.username" />
</wd-form-item>
```

```typescript
const formData = reactive({
  username: ''  // prop="username" 必须与这个字段名一致
})

const rules = {
  username: [{ required: true, message: '请输入用户名' }]
}
```

3. `rules` 中的每条规则必须包含 `required` 和 `message` 字段：

```typescript
const rules = {
  username: [
    { required: true, message: '请输入用户名' }
  ],
  phone: [
    { required: true, message: '请输入手机号' },
    { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' }
  ]
}
```

### 问题 6：组件事件不触发

**现象**：绑定了事件处理函数，但点击或操作后事件未触发。

**原因**：

1. 事件名称拼写错误
2. 组件被 `disabled` 或 `loading` 状态阻止
3. 事件被父元素阻止冒泡

**解决方案**：

1. 检查事件名称是否正确，wot-ui-plus 组件事件使用 kebab-case 命名：

```vue
<!-- 正确 -->
<wd-button @click="handleClick">按钮</wd-button>
<wd-input @change="handleChange" @confirm="handleConfirm" />
<wd-tabs @change="handleTabChange" />

<!-- 错误 -->
<wd-button @onClick="handleClick">按钮</wd-button>
```

2. 检查组件是否处于禁用或加载状态：

```vue
<wd-button :disabled="true" @click="handleClick">禁用按钮</wd-button>
<!-- disabled 状态下 click 事件不会触发 -->

<wd-button :loading="true" @click="handleClick">加载中</wd-button>
<!-- loading 状态下 click 事件不会触发 -->
```

### 问题 7：组件 props 类型错误

**现象**：控制台提示 `Invalid prop: type check failed for prop 'xxx'`。

**原因**：传递的 prop 值类型与组件要求不一致。

**解决方案**：

1. 注意 `v-bind` 和直接赋值的区别：

```vue
<!-- 传递数字 -->
<wd-input :maxlength="11" />    <!-- 正确：数字 11 -->
<wd-input maxlength="11" />     <!-- 错误：字符串 "11" -->

<!-- 传递布尔值 -->
<wd-button :disabled="true" />  <!-- 正确：布尔值 true -->
<wd-button disabled="true" />   <!-- 错误：字符串 "true" -->
<wd-button disabled />          <!-- 正确：布尔值 true（简写） -->

<!-- 传递数组 -->
<wd-checkbox-group :value="['a']" />  <!-- 正确 -->
```

2. 使用 TypeScript 时，确保导入正确的类型定义：

```typescript
import type { ButtonProps, InputProps } from 'wot-ui-plus'
```

## 主题与样式问题

### 问题 8：主题定制不生效

**现象**：修改了 CSS 变量或 `themeVars`，但组件样式没有变化。

**原因**：

1. CSS 变量前缀错误
2. `themeVars` 属性名格式错误
3. 变量覆盖的优先级不够

**解决方案**：

1. 确保使用正确的 CSS 变量前缀 `--wot-`：

```scss
:root {
  /* 正确 */
  --wot-color-theme: #2979ff;
  --wot-button-primary-bg-color: #2979ff;

  /* 错误 */
  --wd-color-theme: #2979ff;      /* 前缀错误 */
  --color-theme: #2979ff;          /* 缺少前缀 */
}
```

2. `themeVars` 使用驼峰命名，不是 CSS 变量名：

```typescript
const themeVars = reactive({
  // 正确：驼峰命名
  colorTheme: '#2979ff',
  buttonPrimaryBgColor: '#2979ff',

  // 错误：CSS 变量名
  '--wot-color-theme': '#2979ff',
  'color-theme': '#2979ff'
})
```

3. 确保 `wd-config-provider` 正确包裹了需要定制主题的组件：

```vue
<template>
  <wd-config-provider :theme-vars="themeVars">
    <!-- 这里的组件会应用主题变量 -->
    <wd-button type="primary">按钮</wd-button>
  </wd-config-provider>
</template>
```

### 问题 9：暗黑模式不生效

**现象**：设置 `theme="dark"` 后，组件样式没有切换为暗黑模式。

**原因**：

1. 未使用 `wd-config-provider` 包裹页面内容
2. `theme` 属性值不正确
3. 自定义样式覆盖了暗黑模式样式

**解决方案**：

1. 确保在根组件中使用 `wd-config-provider`：

```vue
<template>
  <wd-config-provider :theme="theme">
    <router-view />
  </wd-config-provider>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const theme = ref<'light' | 'dark'>('dark')
</script>
```

2. `theme` 属性只接受 `'light'` 或 `'dark'` 两个值

3. 检查自定义样式是否使用了硬编码颜色值，覆盖了暗黑模式的变量

### 问题 10：scoped 样式无法覆盖组件内部样式

**现象**：在 `<style scoped>` 中修改组件样式不生效。

**原因**：`scoped` 属性会给选择器添加属性选择器，导致无法选中子组件内部的元素。

**解决方案**：使用 `:deep()` 深度选择器：

```vue
<style scoped>
/* 不生效 */
.wd-button__content {
  color: red;
}

/* 生效 */
:deep(.wd-button__content) {
  color: red;
}

/* 或在父元素下使用 */
.my-wrapper :deep(.wd-button__content) {
  color: red;
}
</style>
```

## 国际化问题

### 问题 11：国际化配置不生效

**现象**：调用 `Locale.use()` 切换语言后，组件文本没有变化。

**原因**：

1. 语言包未正确导入
2. `Locale.use()` 调用时机不对
3. 组件使用了硬编码文本而非国际化 key

**解决方案**：

1. 确保语言包存在并正确导入：

```typescript
import { Locale } from 'wot-ui-plus'

// 切换到英文（组件库已内置 en-US 语言包）
Locale.use('en-US')
```

2. `Locale.use()` 应在组件渲染前调用，建议在 `main.ts` 中设置：

```typescript
// main.ts
import { Locale } from 'wot-ui-plus'

Locale.use('en-US')

export function createApp() {
  const app = createSSRApp(App)
  return { app }
}
```

3. 如果需要添加自定义语言包，使用 `Locale.add()`：

```typescript
import { Locale } from 'wot-ui-plus'

Locale.add({
  'custom-lang': {
    picker: {
      cancel: 'Cancel',
      done: 'Confirm'
    }
  }
})

Locale.use('custom-lang')
```

## 跨端兼容问题

### 问题 12：H5 和小程序显示不一致

**现象**：同一组件在 H5 和小程序上显示效果不同。

**原因**：不同平台的渲染引擎存在差异，部分 CSS 属性支持程度不同。

**解决方案**：

1. 使用条件编译处理平台差异：

```vue
<template>
  <view>
    <!-- #ifdef H5 -->
    <view class="h5-only">H5 专用内容</view>
    <!-- #endif -->

    <!-- #ifdef MP-WEIXIN -->
    <view class="wechat-only">微信小程序专用内容</view>
    <!-- #endif -->
  </view>
</template>
```

2. 避免使用平台不支持的 CSS 属性，优先使用 `rpx` 单位

3. 在多个平台上进行真机测试

### 问题 13：小程序组件层级（z-index）问题

**现象**：弹窗、遮罩等组件被原生组件（如 input、map）遮挡。

**原因**：小程序中原生组件的层级最高，普通组件无法覆盖。

**解决方案**：

1. 使用 `cover-view` 和 `cover-image` 组件覆盖原生组件

2. 在需要覆盖原生组件时，使用 `wd-popup` 的 `custom-style` 设置更高的 z-index

3. 对于 input 组件，可以在获取焦点时隐藏原生组件，使用自定义键盘替代

## 构建与部署问题

### 问题 14：构建时出现错误

**现象**：执行 `pnpm build` 时编译失败。

**解决方案**：

1. 检查 Node.js 版本是否符合要求（≥ 14.0.0）

2. 清除缓存并重新安装依赖：

```bash
rm -rf node_modules
rm -rf dist
pnpm install
```

3. 检查是否有 TypeScript 类型错误：

```bash
pnpm type-check
```

4. 检查是否有 ESLint 错误：

```bash
pnpm lint
```

5. 确保所有依赖版本兼容，特别是 `sass` 版本必须为 `1.75.0`

### 问题 15：npm 方式安装后组件路径找不到

**错误信息**：
```
Cannot find module 'wot-ui-plus/components/wd-xxx/wd-xxx.vue'
```

**原因**：easycom 配置中的组件路径与实际安装路径不一致。

**解决方案**：

1. 检查 `node_modules/wot-ui-plus/components/` 目录结构

2. 确保 easycom 的 `custom` 规则路径正确：

```json
{
  "easycom": {
    "custom": {
      "^wd-(.*)": "wot-ui-plus/components/wd-$1/wd-$1.vue"
    }
  }
}
```

3. 如果使用 uni_modules 方式安装，路径应为：

```json
"^wd-(.*)": "@/uni_modules/wot-ui-plus/components/wd-$1/wd-$1.vue"
```

## 错误信息速查表

| 错误信息 | 可能原因 | 解决方案 |
| -------- | -------- | -------- |
| `@import is not supported` | sass 版本过高 | 锁定 sass 版本为 1.75.0 |
| `Cannot find module 'wot-ui-plus'` | 组件库未安装 | 执行 `pnpm add wot-ui-plus` |
| `Component is not defined` | 组件未注册 | 配置 easycom 或手动引入组件 |
| `Invalid prop: type check failed` | props 类型错误 | 使用 `v-bind` 传递非字符串值 |
| `Cannot read property of undefined` | ref 未正确绑定 | 检查 `ref` 绑定和组件挂载时机 |
| `sass 版本不兼容` | sass 版本过高或过低 | 使用 `sass@1.75.0` |
| `easycom 匹配失败` | 正则或路径错误 | 检查 easycom 配置的 `custom` 规则 |
| `Toast/Notify 不显示` | 缺少组件标签 | 在模板中放置 `<wd-toast />` 等 |

## 调试技巧及工具推荐

### 1. 调试技巧

1. **使用浏览器开发者工具**：在 H5 模式下，使用 Chrome DevTools 查看 DOM 结构、网络请求和控制台日志
2. **使用 Vue DevTools**：安装 Vue DevTools 浏览器扩展，查看组件树、props、事件和状态
3. **使用 `console.log`**：在关键位置打印变量值和执行流程
4. **使用 HBuilderX 调试**：通过 HBuilderX 内置调试器调试小程序和 APP
5. **简化代码排查**：将问题代码简化到最小可复现示例，逐步排查

### 2. 常用调试方法

#### 检查组件 props 传递

```vue
<template>
  <wd-button
    type="primary"
    :disabled="isDisabled"
    @click="handleClick"
  >
    按钮
  </wd-button>
</template>

<script setup lang="ts">
const isDisabled = ref(false)

const handleClick = (e: Event) => {
  console.log('按钮点击', e)
}
</script>
```

#### 检查表单验证

```typescript
const handleSubmit = async () => {
  try {
    const result = await formRef.value!.validate()
    console.log('验证结果', result)
  } catch (errors) {
    console.log('验证失败', errors)
  }
}
```

#### 检查主题变量

```typescript
// 在浏览器控制台中查看当前生效的 CSS 变量
const themeColor = getComputedStyle(document.documentElement).getPropertyValue('--wot-color-theme')
console.log('当前主题色:', themeColor)
```

### 3. 工具推荐

| 工具 | 用途 | 推荐指数 |
| ---- | ---- | -------- |
| Chrome DevTools | 调试 H5 应用 | ⭐⭐⭐⭐⭐ |
| Vue DevTools | 调试 Vue 组件状态 | ⭐⭐⭐⭐⭐ |
| HBuilderX 调试工具 | 调试小程序和 APP | ⭐⭐⭐⭐ |
| 微信开发者工具 | 调试微信小程序 | ⭐⭐⭐⭐ |
| ESLint | 代码质量检查 | ⭐⭐⭐⭐ |
| Prettier | 代码格式化 | ⭐⭐⭐⭐ |
| TypeScript | 类型检查 | ⭐⭐⭐⭐ |
