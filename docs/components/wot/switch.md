# Switch 开关
<demo-model url="/subPages/switch/Index"></demo-model>

## 组件概况

### 组件概述
Switch 是开关组件，用于实现开关切换功能。它支持自定义开关颜色、大小、激活值和非激活值，支持禁用状态和切换前回调，适用于各种需要开关切换的场景。

### 详细功能描述
- 支持开关状态的双向绑定
- 支持自定义激活值和非激活值
- 支持自定义激活颜色和非激活颜色
- 支持自定义圆点颜色
- 支持自定义开关大小
- 支持禁用状态
- 支持切换前回调函数
- 支持自定义样式和类名
- 跨平台兼容

### 适用业务场景
- 表单中的开关选择
- 设置页面中的开关选项
- 功能开关控制
- 状态切换
- 任何需要开关切换的场景

## 完整API参考

### Props属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| modelValue | boolean/string/number | false | 是 | 绑定值 |
| disabled | boolean | false | 否 | 是否禁用 |
| activeValue | boolean/string/number | true | 否 | 激活值 |
| inactiveValue | boolean/string/number | false | 否 | 非激活值 |
| activeColor | string | - | 否 | 激活颜色 |
| inactiveColor | string | - | 否 | 非激活颜色 |
| circleColor | string | - | 否 | 圆点颜色 |
| size | number/string | - | 否 | 开关大小 |
| beforeChange | function | - | 否 | 切换前的回调函数，返回false可以阻止切换 |
| customStyle | string | - | 否 | 自定义根节点样式 |
| customClass | string | - | 否 | 自定义根节点样式类 |

### Events事件

| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| change | 开关状态改变时 | { value: 新的开关值 } |
| update:modelValue | 开关状态改变时 | value: 新的开关值 |

### Methods方法

该组件没有对外暴露的方法。

### Slots插槽

该组件没有可用的插槽。

## 多场景使用示例代码

### 1. 基础用法

```vue
<template>
  <view class="switch-demo">
    <view class="demo-item">
      <text class="demo-label">基础开关</text>
      <wd-switch v-model="switchValue"></wd-switch>
    </view>
    <view class="demo-item">
      <text class="demo-label">当前值：{{ switchValue }}</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const switchValue = ref(false)
</script>

<style scoped>
.switch-demo {
  padding: 40rpx;
  background-color: #f5f5f5;
}

.demo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30rpx;
  background-color: #fff;
  padding: 20rpx;
  border-radius: 8rpx;
}

.demo-label {
  font-size: 28rpx;
  color: #303133;
}
</style>
```

### 2. 自定义颜色

```vue
<template>
  <view class="switch-demo">
    <view class="demo-item">
      <text class="demo-label">自定义激活颜色</text>
      <wd-switch v-model="switchValue" active-color="#4caf50"></wd-switch>
    </view>
    <view class="demo-item">
      <text class="demo-label">自定义非激活颜色</text>
      <wd-switch v-model="switchValue2" inactive-color="#ff9800"></wd-switch>
    </view>
    <view class="demo-item">
      <text class="demo-label">同时自定义两种颜色</text>
      <wd-switch 
        v-model="switchValue3" 
        active-color="#1989fa" 
        inactive-color="#606266"
      ></wd-switch>
    </view>
    <view class="demo-item">
      <text class="demo-label">自定义圆点颜色</text>
      <wd-switch 
        v-model="switchValue4" 
        circle-color="#fff"
        active-color="#ff6b6b"
        inactive-color="#e0e0e0"
      ></wd-switch>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const switchValue = ref(true)
const switchValue2 = ref(false)
const switchValue3 = ref(true)
const switchValue4 = ref(true)
</script>

<style scoped>
.switch-demo {
  padding: 40rpx;
  background-color: #f5f5f5;
}

.demo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30rpx;
  background-color: #fff;
  padding: 20rpx;
  border-radius: 8rpx;
}

.demo-label {
  font-size: 28rpx;
  color: #303133;
}
</style>
```

### 3. 自定义值

```vue
<template>
  <view class="switch-demo">
    <view class="demo-item">
      <text class="demo-label">自定义字符串值</text>
      <wd-switch 
        v-model="stringValue" 
        active-value="on" 
        inactive-value="off"
      ></wd-switch>
    </view>
    <view class="demo-item">
      <text class="demo-label">当前值：{{ stringValue }}</text>
    </view>
    
    <view class="demo-item">
      <text class="demo-label">自定义数字值</text>
      <wd-switch 
        v-model="numberValue" 
        active-value="1" 
        inactive-value="0"
      ></wd-switch>
    </view>
    <view class="demo-item">
      <text class="demo-label">当前值：{{ numberValue }}</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const stringValue = ref('on')
const numberValue = ref(1)
</script>

<style scoped>
.switch-demo {
  padding: 40rpx;
  background-color: #f5f5f5;
}

.demo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30rpx;
  background-color: #fff;
  padding: 20rpx;
  border-radius: 8rpx;
}

.demo-label {
  font-size: 28rpx;
  color: #303133;
}
</style>
```

### 4. 禁用状态

```vue
<template>
  <view class="switch-demo">
    <view class="demo-item">
      <text class="demo-label">禁用状态（关闭）</text>
      <wd-switch v-model="switchValue" disabled></wd-switch>
    </view>
    <view class="demo-item">
      <text class="demo-label">禁用状态（开启）</text>
      <wd-switch v-model="switchValue2" disabled></wd-switch>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const switchValue = ref(false)
const switchValue2 = ref(true)
</script>

<style scoped>
.switch-demo {
  padding: 40rpx;
  background-color: #f5f5f5;
}

.demo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30rpx;
  background-color: #fff;
  padding: 20rpx;
  border-radius: 8rpx;
}

.demo-label {
  font-size: 28rpx;
  color: #303133;
}
</style>
```

### 5. 切换前回调

```vue
<template>
  <view class="switch-demo">
    <view class="demo-item">
      <text class="demo-label">带确认提示的开关</text>
      <wd-switch v-model="switchValue" :before-change="beforeChange"></wd-switch>
    </view>
    <view class="demo-item">
      <text class="demo-label">当前值：{{ switchValue }}</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const switchValue = ref(false)

const beforeChange = ({ value, resolve }: any) => {
  // 模拟确认提示
  uni.showModal({
    title: '提示',
    content: `确定要${value ? '开启' : '关闭'}吗？`,
    success: (res) => {
      resolve(res.confirm)
    }
  })
}
</script>

<style scoped>
.switch-demo {
  padding: 40rpx;
  background-color: #f5f5f5;
}

.demo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30rpx;
  background-color: #fff;
  padding: 20rpx;
  border-radius: 8rpx;
}

.demo-label {
  font-size: 28rpx;
  color: #303133;
}
</style>
```

## 样式定制指南

### 1. 使用customStyle自定义样式

```vue
<template>
  <wd-switch 
    v-model="switchValue"
    customStyle="border-radius: 20rpx; padding: 4rpx;"
  ></wd-switch>
</template>
```

### 2. 使用customClass自定义类名

```vue
<template>
  <wd-switch 
    v-model="switchValue"
    customClass="my-switch"
  ></wd-switch>
</template>

<style scoped>
:deep(.my-switch) {
  border-radius: 20rpx;
  padding: 4rpx;
}

:deep(.my-switch.wd-switch.is-checked) {
  background-color: #4caf50;
  border-color: #4caf50;
}

:deep(.my-switch .wd-switch__circle) {
  background-color: #fff;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.2);
}
</style>
```

### 3. 自定义开关大小

```vue
<template>
  <view class="switch-size-demo">
    <wd-switch v-model="switchValue" size="40"></wd-switch>
    <wd-switch v-model="switchValue" size="50"></wd-switch>
    <wd-switch v-model="switchValue" size="60"></wd-switch>
    <wd-switch v-model="switchValue" size="70"></wd-switch>
  </view>
</template>

<style scoped>
.switch-size-demo {
  display: flex;
  gap: 40rpx;
  padding: 40rpx;
  background-color: #f5f5f5;
  align-items: center;
  justify-content: center;
}
</style>
```

## 注意事项

1. **双向绑定**：
   - 使用v-model指令实现开关状态的双向绑定
   - 可以自定义激活值和非激活值，支持boolean、string、number类型

2. **颜色自定义**：
   - activeColor：设置开关激活状态的颜色
   - inactiveColor：设置开关非激活状态的颜色
   - circleColor：设置开关圆点的颜色

3. **大小自定义**：
   - 通过size属性自定义开关大小，支持数字和字符串格式
   - 单位为px，无需手动添加

4. **禁用状态**：
   - 设置disabled属性为true可以禁用开关
   - 禁用状态下，开关不会响应点击事件

5. **切换前回调**：
   - 通过beforeChange属性设置切换前的回调函数
   - 回调函数接收一个对象，包含value（新值）和resolve（确认函数）
   - 调用resolve(true)允许切换，调用resolve(false)阻止切换

6. **样式注意**：
   - customStyle和customClass会应用到开关的根节点上
   - 可以通过穿透选择器修改内部样式

7. **初始化值**：
   - 组件会在挂载前检查初始值是否在activeValue和inactiveValue范围内
   - 如果不在范围内，会自动设置为inactiveValue

8. **跨平台兼容性**：
   - 组件在H5、App和小程序平台表现一致
   - 样式会自动适应不同平台的渲染差异

9. **性能优化**：
   - 开关组件本身性能较高，无需特殊优化
   - 避免在beforeChange回调中执行过于复杂的操作

10. **事件处理**：
    - change事件和update:modelValue事件都会在开关状态改变时触发
    - 可以根据需要选择使用其中一个或两个事件