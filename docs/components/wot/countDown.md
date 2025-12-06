# CountDown 倒计时

<demo-model url="/subPages/countDown/Index"></demo-model>

## 组件概况

### 组件概述
CountDown 倒计时组件是一个功能丰富的倒计时计时器，支持毫秒级精度、自定义时间格式、自动开始/暂停/重置等功能，适用于各种需要倒计时功能的场景。

### 详细功能描述
- 支持毫秒级精度倒计时
- 支持自定义时间格式
- 提供自动开始、暂停、重置等控制方法
- 支持自定义内容插槽
- 提供倒计时变化和结束事件
- 支持动态更新倒计时时长
- 轻量级实现，性能优化

### 适用业务场景
- 活动倒计时
- 限时抢购
- 验证码倒计时
- 考试剩余时间
- 订单支付倒计时
- 各种需要倒计时功能的场景

## 完整API参考

### Props
| 名称 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| time | number | - | 是 | 倒计时时长，单位毫秒 |
| millisecond | boolean | false | 否 | 是否开启毫秒级精度 |
| format | string | 'HH:mm:ss' | 否 | 格式化时间，支持 DD: HH: mm: ss: SSS 格式 |
| autoStart | boolean | true | 否 | 是否自动开始倒计时 |
| customStyle | object | - | 否 | 自定义样式，对象形式 |
| customClass | string | '' | 否 | 自定义类名 |

### Events
| 名称 | 触发条件 | 参数说明 |
| --- | --- | --- |
| change | 倒计时变化时 | 当前时间对象，包含 days, hours, minutes, seconds, milliseconds |
| finish | 倒计时结束时 | 无 |

### Methods
| 名称 | 参数 | 返回值 | 功能说明 |
| --- | --- | --- | --- |
| start | - | - | 开始倒计时 |
| pause | - | - | 暂停倒计时 |
| reset | - | - | 重设倒计时，若 autoStart 为 true，重设后会自动开始倒计时 |

### Slots
| 名称 | 作用域变量 | 说明 |
| --- | --- | --- |
| default | current | 自定义倒计时内容，current 为当前时间对象，包含 days, hours, minutes, seconds, milliseconds |

## 多场景使用示例代码

### 1. 基础用法
```vue
<template>
  <view class="demo-container">
    <text class="title">基础倒计时</text>
    <wd-count-down :time="30000"></wd-count-down>
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

### 2. 自定义格式
```vue
<template>
  <view class="demo-container">
    <text class="title">自定义格式倒计时</text>
    <wd-count-down :time="3600000" format="mm:ss"></wd-count-down>
    <wd-count-down :time="86400000" format="DD天 HH时 mm分 ss秒"></wd-count-down>
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

.demo-container :deep(.wd-count-down) {
  display: block;
  margin-bottom: 10px;
  font-size: 18px;
  color: #4d80f0;
}
</style>
```

### 3. 毫秒级精度
```vue
<template>
  <view class="demo-container">
    <text class="title">毫秒级倒计时</text>
    <wd-count-down 
      :time="30000" 
      millisecond 
      format="ss:SSS"
      custom-class="millisecond-countdown"
    ></wd-count-down>
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

.millisecond-countdown {
  font-size: 24px;
  font-weight: bold;
  color: #F56C6C;
}
</style>
```

### 4. 手动控制
```vue
<template>
  <view class="demo-container">
    <text class="title">手动控制倒计时</text>
    <wd-count-down 
      ref="countDownRef" 
      :time="60000" 
      :autoStart="false"
      custom-class="manual-countdown"
    ></wd-count-down>
    
    <view class="control-buttons">
      <button @click="handleStart">开始</button>
      <button @click="handlePause">暂停</button>
      <button @click="handleReset">重置</button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const countDownRef = ref()

// 开始倒计时
const handleStart = () => {
  countDownRef.value.start()
}

// 暂停倒计时
const handlePause = () => {
  countDownRef.value.pause()
}

// 重置倒计时
const handleReset = () => {
  countDownRef.value.reset()
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

.manual-countdown {
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

### 5. 自定义样式
```vue
<template>
  <view class="demo-container">
    <text class="title">自定义样式倒计时</text>
    
    <!-- 使用插槽自定义样式 -->
    <wd-count-down :time="30000" millisecond>
      <template #default="{ current }">
        <view class="custom-countdown">
          <text class="time-item">{{ current.days }}</text>
          <text class="time-separator">天</text>
          <text class="time-item">{{ padZero(current.hours) }}</text>
          <text class="time-separator">:</text>
          <text class="time-item">{{ padZero(current.minutes) }}</text>
          <text class="time-separator">:</text>
          <text class="time-item">{{ padZero(current.seconds) }}</text>
          <text class="time-separator">.</text>
          <text class="time-item time-item--millisecond">{{ padZero(current.milliseconds, 3).slice(0, 2) }}</text>
        </view>
      </template>
    </wd-count-down>
  </view>
</template>

<script lang="ts" setup>

// 补零函数
const padZero = (num: number, length: number = 2): string => {
  return num.toString().padStart(length, '0')
}
</script>

<style scoped>
.demo-container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  margin-bottom: 20px;
  font-size: 16px;
  color: #303133;
}

.custom-countdown {
  display: flex;
  align-items: center;
}

.time-item {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: #4d80f0;
  color: white;
  font-size: 20px;
  font-weight: bold;
  border-radius: 4px;
}

.time-item--millisecond {
  width: 30px;
  height: 30px;
  font-size: 14px;
}

.time-separator {
  margin: 0 5px;
  font-size: 20px;
  font-weight: bold;
  color: #303133;
}
</style>
```

## 样式定制指南

### customStyle 自定义样式
通过 `customStyle` 属性可以直接设置倒计时组件的内联样式。

```vue
<wd-count-down 
  :time="30000" 
  :custom-style="{ fontSize: '24px', color: '#F56C6C', fontWeight: 'bold' }"
></wd-count-down>
```

### customClass 自定义类名
通过 `customClass` 属性可以为倒计时组件添加自定义类名，结合外部样式表进行更复杂的样式定制。

```vue
<wd-count-down 
  :time="30000" 
  custom-class="my-countdown"
></wd-count-down>
```

```scss
.my-countdown {
  // 自定义倒计时样式
  font-size: 20px;
  color: #67C23A;
  font-weight: bold;
  
  // 添加动画效果
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}
```

### 自定义内容样式
通过 `default` 插槽可以完全自定义倒计时的内容和样式。

```vue
<wd-count-down :time="30000">
  <template #default="{ current }">
    <view class="custom-content">
      <!-- 自定义内容 -->
    </view>
  </template>
</wd-count-down>
```

## 注意事项

### 常见问题解决方案
1. **倒计时不准确**：
   - 确保设备时间准确
   - 避免频繁切换页面
   - 考虑使用服务器时间校准

2. **组件不自动开始**：
   - 检查 `autoStart` 属性是否为 `true`
   - 确认 `time` 属性是否正确传递

3. **格式不生效**：
   - 确保 `format` 属性格式正确
   - 检查是否包含不支持的格式字符
   - 支持的格式：DD: HH: mm: ss: SSS

4. **毫秒级精度不生效**：
   - 确保 `millisecond` 属性设置为 `true`
   - 检查 `format` 属性是否包含 SSS 格式

5. **方法调用无效**：
   - 确保组件引用正确获取
   - 检查方法名称是否正确
   - 确认组件是否已挂载

### 性能优化建议
- 避免在倒计时组件中放置复杂内容
- 减少 `change` 事件回调中的复杂计算
- 对于长时间倒计时，考虑降低更新频率
- 不需要时及时销毁组件

### 使用限制条件
- 倒计时时长必须为正数
- 毫秒级精度可能影响性能
- 频繁调用 reset 方法可能导致倒计时不准确
- 页面切换时可能导致倒计时暂停
