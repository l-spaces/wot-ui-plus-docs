# CountTo 数字动画

<demo-model url="/subPages/countTo/Index"></demo-model>

## 组件概况

### 组件概述
CountTo 数字动画组件是一个用于数字从起始值平滑过渡到目标值的动画组件，支持自定义动画时长、小数位数、格式以及前缀后缀等，适用于各种需要数字动画效果的场景。

### 详细功能描述
- 支持从起始值到结束值的平滑动画过渡
- 可自定义动画时长
- 支持自定义小数位数
- 支持自定义数字格式（千位分隔符、小数点）
- 支持前缀和后缀
- 支持自动开始和手动控制
- 支持缓动效果
- 提供多种主题类型
- 支持自定义样式

### 适用业务场景
- 数据统计展示
- 数字增长动画
- 倒计时数字变化
- 价格变动展示
- 加载进度展示
- 各种需要数字动画效果的场景

## 完整API参考

### Props
| 名称 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| fontSize | number | 16 | 否 | 字体大小 |
| color | string | '' | 否 | 文本颜色 |
| type | string | 'default' | 否 | 主题类型，可选值：'default' / 'primary' / 'error' / 'warning' / 'success' |
| startVal | number | 0 | 否 | 起始值 |
| endVal | number | 2024 | 否 | 最终值 |
| duration | number | 3000 | 否 | 从起始值到结束值数字变动的时间，单位毫秒 |
| autoStart | boolean | true | 否 | 是否自动开始 |
| decimals | number | 0 | 否 | 保留的小数位数，大于等于0 |
| decimal | string | '.' | 否 | 小数点符号 |
| separator | string | ',' | 否 | 千位分隔符 |
| prefix | string | '' | 否 | 前缀 |
| suffix | string | '' | 否 | 后缀 |
| useEasing | boolean | true | 否 | 是否使用缓动效果 |
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |

### Events
| 名称 | 触发条件 | 参数说明 |
| --- | --- | --- |
| mounted | 组件挂载时 | 无 |
| finish | 数字动画结束时 | 无 |

### Methods
| 名称 | 参数 | 返回值 | 功能说明 |
| --- | --- | --- | --- |
| start | - | - | 开始数字动画 |
| pause | - | - | 暂停数字动画 |
| reset | - | - | 重置数字动画，若 autoStart 为 true，重置后会自动开始 |

### Slots
| 名称 | 作用域变量 | 说明 |
| --- | --- | --- |
| default | - | 自定义数字内容 |
| prefix | - | 自定义前缀内容 |
| suffix | - | 自定义后缀内容 |

## 多场景使用示例代码

### 1. 基础用法
```vue
<template>
  <view class="demo-container">
    <text class="title">基础数字动画</text>
    <wd-count-to :start-val="0" :end-val="100"></wd-count-to>
  </view>
</template>

<script lang="ts" setup>
</script>

<style scoped>
.demo-container {
  padding: 20px;
}

.title {
  display: block;
  margin-bottom: 10px;
  font-size: 16px;
  color: #303133;
}
</style>
```

### 2. 自定义时长和小数位数
```vue
<template>
  <view class="demo-container">
    <text class="title">自定义时长和小数位数</text>
    <wd-count-to 
      :start-val="0" 
      :end-val="100" 
      :duration="5000" 
      :decimals="2"
      suffix="%"
      custom-class="count-to-custom"
    ></wd-count-to>
  </view>
</template>

<script lang="ts" setup>
</script>

<style scoped>
.demo-container {
  padding: 20px;
}

.title {
  display: block;
  margin-bottom: 10px;
  font-size: 16px;
  color: #303133;
}

.count-to-custom {
  font-size: 24px;
  color: #4d80f0;
}
</style>
```

### 3. 手动控制
```vue
<template>
  <view class="demo-container">
    <text class="title">手动控制数字动画</text>
    <wd-count-to 
      ref="countToRef" 
      :start-val="0" 
      :end-val="1000" 
      :auto-start="false"
      custom-class="count-to-manual"
    ></wd-count-to>
    
    <view class="control-buttons">
      <button @click="handleStart">开始</button>
      <button @click="handlePause">暂停</button>
      <button @click="handleReset">重置</button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const countToRef = ref()

// 开始动画
const handleStart = () => {
  countToRef.value.start()
}

// 暂停动画
const handlePause = () => {
  countToRef.value.pause()
}

// 重置动画
const handleReset = () => {
  countToRef.value.reset()
}
</script>

<style scoped>
.demo-container {
  padding: 20px;
}

.title {
  display: block;
  margin-bottom: 10px;
  font-size: 16px;
  color: #303133;
}

.count-to-manual {
  font-size: 20px;
  color: #67C23A;
  margin-bottom: 20px;
  display: block;
}

.control-buttons {
  display: flex;
  gap: 10px;
}

button {
  padding: 8px 16px;
  background-color: #4d80f0;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
}
</style>
```

### 4. 自定义格式和前缀后缀
```vue
<template>
  <view class="demo-container">
    <text class="title">自定义格式和前缀后缀</text>
    
    <!-- 价格格式 -->
    <wd-count-to 
      :start-val="0" 
      :end-val="12345.67" 
      :decimals="2" 
      prefix="¥" 
      custom-class="count-to-price"
    ></wd-count-to>
    
    <!-- 大数字格式 -->
    <wd-count-to 
      :start-val="0" 
      :end-val="1000000" 
      suffix=" 次" 
      custom-class="count-to-large"
    ></wd-count-to>
    
    <!-- 自定义千位分隔符 -->
    <wd-count-to 
      :start-val="0" 
      :end-val="5000000" 
      separator=" " 
      suffix=" 元" 
      custom-class="count-to-separator"
    ></wd-count-to>
  </view>
</template>

<script lang="ts" setup>
</script>

<style scoped>
.demo-container {
  padding: 20px;
}

.title {
  display: block;
  margin-bottom: 20px;
  font-size: 16px;
  color: #303133;
}

.count-to-price,
.count-to-large,
.count-to-separator {
  display: block;
  margin-bottom: 15px;
  font-size: 20px;
  color: #F56C6C;
}
</style>
```

### 5. 主题类型和自定义样式
```vue
<template>
  <view class="demo-container">
    <text class="title">主题类型和自定义样式</text>
    
    <!-- 不同主题类型 -->
    <wd-count-to :end-val="100" type="primary" custom-class="count-to-type"></wd-count-to>
    <wd-count-to :end-val="100" type="success" custom-class="count-to-type"></wd-count-to>
    <wd-count-to :end-val="100" type="warning" custom-class="count-to-type"></wd-count-to>
    <wd-count-to :end-val="100" type="error" custom-class="count-to-type"></wd-count-to>
    
    <!-- 自定义颜色和大小 -->
    <wd-count-to 
      :end-val="2024" 
      :font-size="30" 
      color="#909399" 
      suffix=" 年"
      custom-class="count-to-custom-style"
    ></wd-count-to>
    
    <!-- 自定义前缀和后缀插槽 -->
    <wd-count-to :start-val="0" :end-val="50" :duration="2000">
      <template #prefix>
        <wd-icon name="star" custom-class="custom-prefix"></wd-icon>
      </template>
      <template #suffix>
        <wd-icon name="star" custom-class="custom-suffix"></wd-icon>
      </template>
    </wd-count-to>
  </view>
</template>

<script lang="ts" setup>
</script>

<style scoped>
.demo-container {
  padding: 20px;
}

.title {
  display: block;
  margin-bottom: 20px;
  font-size: 16px;
  color: #303133;
}

.count-to-type {
  margin-right: 20px;
  font-size: 18px;
}

.count-to-custom-style {
  margin-top: 20px;
  font-weight: bold;
}

.custom-prefix,
.custom-suffix {
  color: #E6A23C;
  font-size: 20px;
  margin: 0 5px;
}
</style>
```

## 样式定制指南

### customStyle 和 customClass
通过 `customStyle` 和 `customClass` 属性可以自定义 CountTo 组件本身的样式。

```vue
<wd-count-to 
  :end-val="100" 
  custom-class="my-count-to"
  :custom-style="{ fontSize: '24px', color: '#67C23A' }"
></wd-count-to>
```

### 主题类型
通过 `type` 属性可以设置不同的主题类型。

```vue
<wd-count-to :end-val="100" type="primary"></wd-count-to>
<wd-count-to :end-val="100" type="success"></wd-count-to>
<wd-count-to :end-val="100" type="warning"></wd-count-to>
<wd-count-to :end-val="100" type="error"></wd-count-to>
```

### fontSize 和 color
通过 `fontSize` 和 `color` 属性可以自定义数字的字体大小和颜色。

```vue
<wd-count-to 
  :end-val="100" 
  :font-size="30" 
  color="#4d80f0"
></wd-count-to>
```

### 自定义前缀和后缀
通过 `prefix` 和 `suffix` 属性或插槽可以自定义数字的前缀和后缀。

```vue
<!-- 使用属性 -->
<wd-count-to :end-val="100" prefix="¥" suffix="元"></wd-count-to>

<!-- 使用插槽 -->
<wd-count-to :end-val="100">
  <template #prefix>
    <!-- 自定义前缀 -->
  </template>
  <template #suffix>
    <!-- 自定义后缀 -->
  </template>
</wd-count-to>
```

## 注意事项

### 常见问题解决方案
1. **动画不自动开始**：
   - 检查 `autoStart` 属性是否为 `true`
   - 确认组件是否已正确挂载

2. **小数位数不生效**：
   - 确保 `decimals` 属性设置正确
   - 检查是否为非负整数

3. **格式不生效**：
   - 确保 `separator` 和 `decimal` 属性设置正确
   - 检查是否包含不支持的字符

4. **方法调用无效**：
   - 确保组件引用正确获取
   - 检查方法名称是否正确
   - 确认组件是否已挂载

5. **动画不准确**：
   - 避免频繁重置动画
   - 确保设备性能良好
   - 考虑降低动画时长

### 性能优化建议
- 避免在短时间内频繁创建和销毁组件
- 减少组件上的复杂样式和动画
- 对于大量数字动画，考虑分批加载
- 避免在动画过程中修改组件属性

### 使用限制条件
- `decimals` 属性必须为非负整数
- 动画时长不宜过长，建议在 1-5 秒之间
- 过大的数字可能导致动画效果不明显
- 页面切换时可能导致动画中断
