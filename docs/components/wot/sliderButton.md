# Slider Button 滑块解锁按钮
<demo-model url="/subPages/sliderButton/Index"></demo-model>

## 组件概况

### 组件概述
Slider Button组件是一个滑动解锁组件，用于验证用户操作，防止机器人恶意操作。它提供了丰富的自定义选项，包括样式、文字、自动重置等功能，适用于各种需要用户交互验证的场景。

### 详细功能描述
- 支持滑动解锁功能，验证用户操作
- 支持自定义按钮文字、宽度、高度、颜色等样式
- 支持成功状态和自动重置功能
- 支持事件回调（滑动过程、滑动成功、重置）
- 支持自定义阈值，控制解锁难度
- 支持禁用状态
- 支持自定义滑块内容
- 支持自定义按钮文字
- 支持多端适配

### 适用业务场景
- 登录页面的滑动验证
- 表单提交前的验证
- 防止机器人恶意操作的验证
- 内容访问前的验证
- 资源下载前的验证

## 完整API参考

### Props
| 参数 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| text | string | '滑动解锁' | 否 | 按钮文字 |
| width | string / number | '' | 否 | 按钮宽度 |
| round | string / number | 100 | 否 | 圆角 |
| height | string / number | 45 | 否 | 按钮高度 |
| bgColor | string | '#e0e0e0' | 否 | 背景颜色 |
| railColor | string | '#4d80f0' | 否 | 滑道背景颜色 |
| railIndex | string / number | '' | 否 | 滑道层级 |
| railRadius | string / number | 100 | 否 | 轨道圆角 |
| textColor | string | '#c2c2c2' | 否 | 文字颜色 |
| fontSize | string / number | 16 | 否 | 文字大小 |
| textBold | boolean | false | 否 | 文字是否加粗 |
| activeTextColor | string | '#ffffff' | 否 | 激活文字颜色 |
| disabled | boolean | false | 否 | 是否禁用 |
| successText | string | '验证成功' | 否 | 成功文字 |
| autoReset | boolean | false | 否 | 是否自动重置 |
| resetDelay | number | 300 | 否 | 重置延迟时间（毫秒） |
| threshold | string / number | '' | 否 | 阈值 |
| customClass | string | - | 否 | 自定义类名 |
| customStyle | object | - | 否 | 自定义样式，对象形式 |

### Events
| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| change | 滑动过程中触发 | percent: number 当前进度百分比（0-1） |
| success | 滑动成功时触发 | 无 |
| reset | 重置时触发 | 无 |

### Methods
| 方法名 | 参数 | 返回值 | 功能说明 |
|--------|------|--------|----------|
| init | 无 | void | 初始化组件 |
| reset | 无 | void | 重置组件状态 |
| handleSuccess | 无 | void | 手动触发成功状态 |

### Slots
| 插槽名 | 作用域变量 | 说明 |
|--------|------------|------|
| thumb | - | 自定义滑块内容，默认显示双箭头图标 |
| default | - | 自定义按钮文字，默认显示滑动解锁文字 |

## 多场景使用示例

### 基础用法
```vue
<template>
  <view>
    <wd-slider-button @success="handleSuccess"></wd-slider-button>
  </view>
</template>

<script setup lang="ts">
const handleSuccess = () => {
  console.log('滑动验证成功')
  // 执行验证成功后的逻辑
}
</script>
```

### 自定义样式
```vue
<template>
  <view>
    <wd-slider-button 
      text="滑动解锁"
      success-text="解锁成功"
      :height="50"
      :width="300"
      bg-color="#f0f0f0"
      rail-color="#409eff"
      text-color="#606266"
      active-text-color="#ffffff"
      @success="handleSuccess"
    ></wd-slider-button>
  </view>
</template>

<script setup lang="ts">
const handleSuccess = () => {
  console.log('滑动验证成功')
}
</script>
```

### 自动重置
```vue
<template>
  <view>
    <wd-slider-button 
      auto-reset 
      :reset-delay="1000"
      @success="handleSuccess"
      @reset="handleReset"
    ></wd-slider-button>
  </view>
</template>

<script setup lang="ts">
const handleSuccess = () => {
  console.log('滑动验证成功')
}

const handleReset = () => {
  console.log('滑动验证已重置')
}
</script>
```

### 禁用状态
```vue
<template>
  <view>
    <wd-slider-button 
      disabled 
      text="已禁用"
    ></wd-slider-button>
  </view>
</template>
```

### 自定义阈值
```vue
<template>
  <view>
    <wd-slider-button 
      :threshold="200"
      @change="handleChange"
      @success="handleSuccess"
    ></wd-slider-button>
  </view>
</template>

<script setup lang="ts">
const handleChange = (percent: number) => {
  console.log('当前进度:', (percent * 100).toFixed(0) + '%')
}

const handleSuccess = () => {
  console.log('滑动验证成功')
}
</script>
```

### 自定义滑块
```vue
<template>
  <view>
    <wd-slider-button @success="handleSuccess">
      <template #thumb>
        <view class="custom-thumb">
          <wd-icon name="arrow-right" color="#409eff" size="30"></wd-icon>
        </view>
      </template>
    </wd-slider-button>
  </view>
</template>

<script setup lang="ts">
const handleSuccess = () => {
  console.log('滑动验证成功')
}
</script>

<style scoped>
.custom-thumb {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>
```

### 自定义按钮文字
```vue
<template>
  <view>
    <wd-slider-button @success="handleSuccess">
      <template #default>
        <view class="custom-text">
          <wd-icon name="lock" color="#c2c2c2" size="16"></wd-icon>
          <text style="margin-left: 5px;">滑动解锁</text>
        </view>
      </template>
    </wd-slider-button>
  </view>
</template>

<script setup lang="ts">
const handleSuccess = () => {
  console.log('滑动验证成功')
}
</script>

<style scoped>
.custom-text {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
```

## 样式定制指南

### 自定义类名
通过`customClass`属性可以为Slider Button组件添加自定义类名，用于覆盖默认样式。

```vue
<wd-slider-button custom-class="my-slider-button">
  <!-- 内容 -->
</wd-slider-button>

<style>
.my-slider-button {
  /* 自定义样式 */
  margin: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
```

### 自定义样式对象
通过`customStyle`属性可以直接设置组件的内联样式。

```vue
<wd-slider-button :custom-style="{ margin: '20px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }">
  <!-- 内容 -->
</wd-slider-button>
```

### 自定义颜色和尺寸
通过组件的props可以自定义各种颜色和尺寸属性，如`bgColor`、`railColor`、`height`、`width`等。

```vue
<wd-slider-button 
  :height="60"
  :width="350"
  bg-color="#f5f7fa"
  rail-color="#67c23a"
  text-color="#909399"
  active-text-color="#ffffff"
>
  <!-- 内容 -->
</wd-slider-button>
```

## 注意事项

1. **组件初始化**：
   - 组件会在挂载后自动初始化，获取组件的宽度和位置信息
   - 可以手动调用`init`方法重新初始化组件

2. **阈值设置**：
   - 阈值用于控制滑动解锁的难度，默认为组件宽度减去滑块宽度
   - 可以通过`threshold`属性自定义阈值，值为像素单位
   - 阈值越大，解锁难度越高

3. **自动重置功能**：
   - 设置`autoReset`为`true`时，组件会在滑动成功后自动重置
   - 可以通过`resetDelay`属性设置重置延迟时间，单位为毫秒
   - 自动重置时会触发`reset`事件

4. **事件触发**：
   - `change`事件在滑动过程中持续触发，返回当前进度百分比
   - `success`事件在滑动成功时触发
   - `reset`事件在组件重置时触发

5. **禁用状态**：
   - 设置`disabled`为`true`时，组件不可滑动
   - 禁用状态下，组件不会触发任何事件

6. **自定义滑块**：
   - 可以通过`thumb`插槽自定义滑块内容
   - 自定义滑块时，需要确保滑块的样式和大小适合组件

7. **自定义文字**：
   - 可以通过`default`插槽自定义按钮文字
   - 自定义文字时，需要确保文字的样式和位置适合组件

8. **多端适配**：
   - 组件在不同平台上可能存在细微的样式差异
   - 建议在实际使用中进行多端测试

## 常见问题

1. **Q: 为什么滑动后组件没有自动重置？**
   A: 请检查是否设置了`autoReset`属性为`true`，并且`resetDelay`属性设置合理。

2. **Q: 如何调整滑动解锁的难度？**
   A: 可以通过调整`threshold`属性来控制解锁难度，阈值越大，解锁难度越高。

3. **Q: 如何自定义滑块的样式？**
   A: 可以通过`thumb`插槽自定义滑块内容，完全控制滑块的样式和结构。

4. **Q: 为什么组件在某些平台上显示异常？**
   A: 请确保组件的尺寸设置合理，并且在实际使用中进行多端测试，根据需要调整样式。

5. **Q: 如何监听滑动过程中的进度？**
   A: 可以监听`change`事件，该事件会在滑动过程中持续触发，返回当前进度百分比。

6. **Q: 如何手动触发成功状态？**
   A: 可以通过组件的`handleSuccess`方法手动触发成功状态。

7. **Q: 如何重置组件状态？**
   A: 可以通过组件的`reset`方法重置组件状态，或者等待自动重置（如果启用了自动重置功能）。

8. **Q: 为什么组件的宽度没有生效？**
   A: 请确保`width`属性的类型正确，并且值为有效的数值或字符串。