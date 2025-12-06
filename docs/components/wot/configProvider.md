# ConfigProvider 配置提供者

<demo-model url="/subPages/configProvider/Index"></demo-model>

## 组件概况

### 组件概述
ConfigProvider 配置提供者组件是一个用于全局主题配置和样式管理的组件，通过 CSS 变量实现主题的动态切换和自定义，支持浅色和深色两种主题模式，可覆盖组件库的默认样式。

### 详细功能描述
- 支持浅色/深色主题切换
- 支持自定义主题变量
- 通过 CSS 变量实现样式传递
- 全局生效，影响所有子组件
- 支持自定义类名和样式
- 与 Vue 3 的 provide/inject 机制兼容

### 适用业务场景
- 应用主题切换功能
- 自定义组件库样式
- 品牌化定制
- 深色模式支持
- 全局样式统一管理

## 完整API参考

### Props
| 名称 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| theme | string | 'light' | 否 | 主题风格，可选值为 'light' 或 'dark' |
| themeVars | object | {} | 否 | 自定义主题变量，用于覆盖默认样式 |
| customStyle | object | - | 否 | 自定义样式，对象形式 |
| customClass | string | '' | 否 | 自定义类名 |

### Events
该组件不触发任何自定义事件。

### Methods
该组件没有对外暴露的方法。

### Slots
| 名称 | 作用域变量 | 说明 |
| --- | --- | --- |
| default | - | 包含需要应用主题的子组件 |

## 多场景使用示例代码

### 1. 基础用法
```vue
<template>
  <wd-config-provider theme="light">
    <!-- 应用主题的组件 -->
    <wd-button type="primary">按钮</wd-button>
  </wd-config-provider>
</template>

<script lang="ts" setup>
</script>
```

### 2. 深色主题
```vue
<template>
  <wd-config-provider theme="dark">
    <!-- 应用深色主题的组件 -->
    <view class="dark-container">
      <wd-button type="primary">深色主题按钮</wd-button>
      <wd-card title="深色主题卡片">
        <view>这是深色主题下的卡片内容</view>
      </wd-card>
    </view>
  </wd-config-provider>
</template>

<script lang="ts" setup>
</script>

<style scoped>
.dark-container {
  padding: 20px;
}

.dark-container :deep(.wd-card) {
  margin-top: 20px;
}
</style>
```

### 3. 自定义主题变量
```vue
<template>
  <wd-config-provider :themeVars="customTheme">
    <!-- 应用自定义主题的组件 -->
    <wd-button type="primary">自定义主题按钮</wd-button>
    <wd-button type="success">成功按钮</wd-button>
  </wd-config-provider>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 自定义主题变量
const customTheme = ref({
  colorTheme: '#67C23A', // 自定义主题色为绿色
  colorSuccess: '#F56C6C', // 自定义成功色为红色
  buttonPrimaryBgColor: '#E6A23C', // 自定义主按钮背景色
  buttonPrimaryColor: '#FFFFFF' // 自定义主按钮文字颜色
})
</script>
```

### 4. 主题切换
```vue
<template>
  <view class="theme-switch-container">
    <wd-switch v-model="isDark" @change="handleThemeChange">
      {{ isDark ? '深色模式' : '浅色模式' }}
    </wd-switch>
    
    <!-- 根据切换状态应用不同主题 -->
    <wd-config-provider :theme="isDark ? 'dark' : 'light'">
      <view class="theme-content">
        <wd-button type="primary">主题切换按钮</wd-button>
        <wd-card title="主题切换卡片">
          <view>当前主题：{{ isDark ? '深色' : '浅色' }}</view>
          <view>可以通过开关切换主题</view>
        </wd-card>
      </view>
    </wd-config-provider>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const isDark = ref(false)

// 主题切换事件
const handleThemeChange = () => {
  console.log('主题切换为：', isDark.value ? '深色' : '浅色')
}
</script>

<style scoped>
.theme-switch-container {
  padding: 20px;
}

.theme-content {
  margin-top: 20px;
}

.theme-content :deep(.wd-card) {
  margin-top: 20px;
}
</style>
```

### 5. 品牌化定制
```vue
<template>
  <wd-config-provider :themeVars="brandTheme">
    <!-- 品牌化定制的组件 -->
    <view class="brand-container">
      <view class="brand-title">品牌化定制示例</view>
      
      <wd-button type="primary" size="large">品牌主按钮</wd-button>
      <wd-button type="success" size="large">品牌成功按钮</wd-button>
      <wd-button type="warning" size="large">品牌警告按钮</wd-button>
      
      <wd-card title="品牌卡片">
        <view>这是应用了品牌色的卡片</view>
        <view>品牌主色：#FF5722</view>
        <view>品牌辅助色：#4CAF50</view>
      </wd-card>
      
      <wd-input placeholder="品牌化输入框" />
    </view>
  </wd-config-provider>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 品牌化主题变量
const brandTheme = ref({
  // 品牌主色
  colorTheme: '#FF5722',
  
  // 品牌辅助色
  colorSuccess: '#4CAF50',
  colorWarning: '#FFC107',
  colorDanger: '#F44336',
  colorInfo: '#2196F3',
  
  // 按钮样式
  buttonPrimaryBgColor: '#FF5722',
  buttonPrimaryColor: '#FFFFFF',
  buttonSuccessBgColor: '#4CAF50',
  buttonSuccessColor: '#FFFFFF',
  buttonWarningBgColor: '#FFC107',
  buttonWarningColor: '#FFFFFF',
  
  // 输入框样式
  inputBorderColor: '#FF5722',
  inputNotEmptyBorderColor: '#FF5722',
  
  // 卡片样式
  cardTitleColor: '#FF5722',
  cardContentBorderColor: '#FF5722'
})
</script>

<style scoped>
.brand-container {
  padding: 20px;
}

.brand-title {
  font-size: 20px;
  font-weight: bold;
  color: #FF5722;
  margin-bottom: 20px;
  text-align: center;
}

.brand-container :deep(.wd-button) {
  margin-right: 10px;
  margin-bottom: 10px;
}

.brand-container :deep(.wd-card) {
  margin-top: 20px;
}

.brand-container :deep(.wd-input) {
  margin-top: 20px;
}
</style>
```

## 样式定制指南

### 主题变量说明
ConfigProvider 通过 CSS 变量实现主题定制，以下是一些常用的主题变量：

| 变量名 | 描述 |
| --- | --- |
| colorTheme | 主题色 |
| colorSuccess | 成功色 |
| colorWarning | 警告色 |
| colorDanger | 危险色 |
| colorInfo | 信息色 |
| colorBorder | 边框色 |
| colorBg | 背景色 |
| fontGray1 | 字体灰色1 |
| fontGray2 | 字体灰色2 |
| fontGray3 | 字体灰色3 |

### 自定义主题变量
通过 `themeVars` 属性可以自定义主题变量，覆盖组件库的默认样式。

```vue
<wd-config-provider :themeVars="{
  colorTheme: '#67C23A',
  colorSuccess: '#F56C6C'
}">
  <!-- 组件内容 -->
</wd-config-provider>
```

### customStyle 和 customClass
通过 `customStyle` 和 `customClass` 属性可以自定义 ConfigProvider 组件本身的样式。

```vue
<wd-config-provider 
  custom-class="my-config-provider"
  :custom-style="{ padding: '20px', backgroundColor: '#f5f7fa' }"
>
  <!-- 组件内容 -->
</wd-config-provider>
```

### 主题切换实现
通过动态改变 `theme` 属性可以实现主题切换。

```vue
<wd-config-provider :theme="isDark ? 'dark' : 'light'">
  <!-- 组件内容 -->
</wd-config-provider>
```

## 注意事项

### 常见问题解决方案
1. **主题不生效**：
   - 确保 ConfigProvider 包裹了需要应用主题的组件
   - 检查主题变量名称是否正确
   - 确认 CSS 变量是否被正确应用

2. **样式覆盖问题**：
   - 使用 `!important` 强制覆盖（谨慎使用）
   - 确保选择器优先级足够高
   - 检查 CSS 变量是否被其他样式覆盖

3. **主题切换闪烁**：
   - 考虑使用过渡动画
   - 确保主题切换逻辑高效
   - 避免在切换时重新渲染大量组件

4. **深色模式兼容性**：
   - 检查所有组件是否支持深色模式
   - 测试在不同设备上的显示效果
   - 考虑添加自定义深色模式样式

### 性能优化建议
- 避免频繁切换主题
- 尽量使用组件库提供的主题变量，而非自定义大量样式
- 对于静态主题，考虑在应用初始化时设置，而非动态改变
- 减少主题变量的数量，只覆盖需要的样式

### 使用限制条件
- ConfigProvider 必须包裹在需要应用主题的组件外层
- 主题变量的覆盖是全局的，会影响所有子组件
- 自定义主题变量时，需要确保变量名称与组件库使用的变量名称一致
- 深色模式可能不支持所有组件，需要测试验证
