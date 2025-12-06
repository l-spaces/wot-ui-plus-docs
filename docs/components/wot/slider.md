# Slider 滑块选择器
<demo-model url="/subPages/slider/Index"></demo-model>

## 组件概况

### 组件概述
Slider组件是一个滑块选择组件，支持单滑块和双滑块两种模式，用于在指定范围内选择数值。它提供了丰富的自定义选项，包括颜色、样式、步长等，适用于各种需要数值选择的场景。

### 详细功能描述
- 支持单滑块和双滑块两种模式，通过modelValue的类型自动切换
- 支持自定义最小值、最大值和步长
- 支持自定义滑块颜色、轨道颜色和激活颜色
- 支持禁用状态
- 支持隐藏最大值、最小值和当前值显示
- 支持拖动事件监听（dragstart、dragmove、dragend）
- 支持双向数据绑定
- 支持自定义样式和类名
- 支持多端适配

### 适用业务场景
- 价格范围选择
- 音量调节
- 亮度调节
- 进度控制
- 筛选条件设置
- 参数配置

## 完整API参考

### Props
| 参数 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| modelValue | number / array | 0 | 否 | 滑块的值，如果为数组，则为双向滑块 |
| min | number | 0 | 否 | 滑块的最小值 |
| max | number | 100 | 否 | 滑块的最大值 |
| step | number | 1 | 否 | 滑块的步进值 |
| disabled | boolean | false | 否 | 是否禁用滑块 |
| inactiveColor | string | '#e5e5e5' | 否 | 进度条未激活的背景颜色 |
| activeColor | string | '' | 否 | 进度条激活的背景颜色 |
| hideMinMax | boolean | false | 否 | 是否隐藏左右的最大最小值 |
| hideLabel | boolean | false | 否 | 是否隐藏当前滑块值 |
| customMinClass | string | '' | 否 | 自定义最小值的样式类名 |
| customMaxClass | string | '' | 否 | 自定义最大值的样式类名 |
| customClass | string | - | 否 | 自定义类名 |
| customStyle | object | - | 否 | 自定义样式，对象形式 |

### Events
| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| dragstart | 开始拖动滑块时 | { value: number / array } 当前滑块的值 |
| dragmove | 拖动滑块过程中 | { value: number / array } 当前滑块的值 |
| dragend | 结束拖动滑块时 | { value: number / array } 当前滑块的值 |
| update:modelValue | 滑块值变化时 | number / array 滑块的新值 |

### Methods
| 方法名 | 参数 | 返回值 | 功能说明 |
|--------|------|--------|----------|
| initSlider | 无 | void | 初始化slider宽度 |

### Slots
无

## 多场景使用示例

### 基础用法
```vue
<template>
  <view>
    <wd-slider v-model="value" @dragend="handleDragEnd"></wd-slider>
    <text>当前值: {{ value }}</text>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(50)

const handleDragEnd = (event: any) => {
  console.log('拖动结束，当前值:', event.value)
}
</script>
```

### 双滑块模式
```vue
<template>
  <view>
    <wd-slider v-model="value" @dragend="handleDragEnd"></wd-slider>
    <text>最小值: {{ value[0] }}, 最大值: {{ value[1] }}</text>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref([20, 80])

const handleDragEnd = (event: any) => {
  console.log('拖动结束，当前范围:', event.value)
}
</script>
```

### 自定义样式
```vue
<template>
  <view>
    <wd-slider 
      v-model="value" 
      active-color="#409eff" 
      inactive-color="#e6f7ff"
      :step="5"
    ></wd-slider>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(50)
</script>
```

### 隐藏标签和数值
```vue
<template>
  <view>
    <wd-slider 
      v-model="value" 
      hide-label 
      hide-min-max
    ></wd-slider>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(50)
</script>
```

### 禁用状态
```vue
<template>
  <view>
    <wd-slider 
      v-model="value" 
      disabled
    ></wd-slider>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(50)
</script>
```

### 自定义范围和步长
```vue
<template>
  <view>
    <wd-slider 
      v-model="value" 
      :min="0" 
      :max="1000" 
      :step="10"
    ></wd-slider>
    <text>当前值: {{ value }}</text>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(500)
</script>
```

## 样式定制指南

### 自定义类名
通过`customClass`属性可以为Slider组件添加自定义类名，用于覆盖默认样式。

```vue
<wd-slider custom-class="my-slider">
  <!-- 内容 -->
</wd-slider>

<style>
.my-slider {
  /* 自定义样式 */
  margin: 20px;
}
</style>
```

### 自定义样式对象
通过`customStyle`属性可以直接设置组件的内联样式。

```vue
<wd-slider :custom-style="{ margin: '20px', padding: '10px' }">
  <!-- 内容 -->
</wd-slider>
```

### 自定义最大值和最小值样式
通过`customMinClass`和`customMaxClass`属性可以自定义最大值和最小值的样式。

```vue
<wd-slider 
  custom-min-class="my-min" 
  custom-max-class="my-max"
>
  <!-- 内容 -->
</wd-slider>

<style>
.my-min {
  color: #409eff;
  font-weight: bold;
}

.my-max {
  color: #67c23a;
  font-weight: bold;
}
</style>
```

## 注意事项

1. **单滑块与双滑块切换**：
   - 当`modelValue`为数字类型时，组件为单滑块模式
   - 当`modelValue`为数组类型时，组件为双滑块模式
   - 双滑块模式下，数组的第一个元素表示最小值，第二个元素表示最大值

2. **步长设置**：
   - 步长必须大于0，否则会在控制台输出警告并使用默认值1
   - 滑块值会自动对齐到步长的整数倍

3. **值范围限制**：
   - 单滑块模式下，值会被限制在`min`和`max`之间
   - 双滑块模式下，会确保最小值小于等于最大值

4. **禁用状态**：
   - 禁用状态下，滑块不可拖动
   - 禁用状态下，滑块按钮会隐藏

5. **事件触发**：
   - `dragstart`事件在触摸开始时触发
   - `dragmove`事件在拖动过程中持续触发
   - `dragend`事件在触摸结束时触发
   - `update:modelValue`事件在滑块值变化时触发

6. **初始化**：
   - 组件会在挂载后自动初始化，获取轨道宽度
   - 可以手动调用`initSlider`方法重新初始化

7. **多端适配**：
   - 组件在不同平台上可能存在细微的样式差异
   - 在钉钉小程序上有特殊处理，确保正常显示

8. **性能优化**：
   - 拖动过程中会频繁触发`dragmove`事件，建议在事件处理函数中避免复杂计算
   - 对于大数据量场景，建议使用`debounce`或`throttle`优化事件处理

## 常见问题

1. **Q: 如何切换单滑块和双滑块模式？**
   A: 通过修改`modelValue`的类型即可切换，数字类型为单滑块，数组类型为双滑块。

2. **Q: 为什么步长设置不生效？**
   A: 请检查步长是否大于0，步长必须大于0才能生效。

3. **Q: 如何自定义滑块的颜色？**
   A: 可以通过`activeColor`属性设置激活颜色，通过`inactiveColor`属性设置未激活颜色。

4. **Q: 如何隐藏滑块的标签？**
   A: 通过设置`hideLabel`属性为`true`即可隐藏滑块的当前值标签。

5. **Q: 如何隐藏最大值和最小值？**
   A: 通过设置`hideMinMax`属性为`true`即可隐藏最大值和最小值。

6. **Q: 为什么双滑块的最小值大于最大值？**
   A: 组件会自动处理这种情况，确保最小值小于等于最大值。

7. **Q: 如何监听滑块的拖动事件？**
   A: 可以监听`dragstart`、`dragmove`、`dragend`事件，分别对应拖动开始、拖动过程中、拖动结束。

8. **Q: 如何禁用滑块？**
   A: 通过设置`disabled`属性为`true`即可禁用滑块，禁用后滑块不可拖动。