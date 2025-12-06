# Rate 评分
<demo-model url="/subPages/rate/Index"></demo-model>

## 组件概况

### 组件概述
评分组件用于用户对商品、服务、内容等进行评分，通常用于电商商品评价、服务评价、内容评分等场景。wd-rate 组件提供了灵活的配置选项，支持完整评分和半星评分、自定义图标、颜色、大小、数量等功能。

### 详细功能描述
- 支持完整评分和半星评分
- 支持自定义评分最大值（默认为5）
- 支持只读模式
- 支持自定义图标大小和间距
- 支持自定义未选中和选中的图标颜色
- 支持自定义图标类名
- 支持禁用状态
- 支持分段颜色
- 支持再次点击清空评分
- 支持触摸滑动评分
- 支持双向绑定
- 支持 change 事件

### 适用业务场景
- 电商商品评价
- 服务质量评分
- 内容评分（文章、视频、音乐等）
- 应用商店评分
- 调查问卷评分
- 用户反馈评分

## 完整API参考

### Props属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| num | number | 5 | 否 | 评分最大值 |
| modelValue | string / number / null | null | 否 | 当前分数，使用v-model进行双向绑定 |
| readonly | boolean | false | 否 | 是否只读 |
| size | string | '16px' | 否 | 图标大小 |
| space | string | '4px' | 否 | 图标间距 |
| color | string | '#E8E8E8' | 否 | 未选中的图标颜色 |
| activeColor | string / array | 'linear-gradient(180deg, rgba(255,238,0,1) 0%,rgba(250,176,21,1) 100%)' | 否 | 选中的图标颜色，支持传颜色数组（用于分段颜色） |
| icon | string | 'star-filled' | 否 | 未选中的图标类名 |
| activeIcon | string | 'star-filled' | 否 | 选中的图标类名 |
| disabled | boolean | false | 否 | 是否禁用 |
| disabledColor | string | 'linear-gradient(315deg, rgba(177,177,177,1) 0%,rgba(199,199,199,1) 100%)' | 否 | 禁用的图标颜色 |
| allowHalf | boolean | false | 否 | 是否允许半选 |
| clearable | boolean | false | 否 | 当 clearable 属性设置为 true，再次点击相同的值时，可以将值重置为 0 |
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |

### Events事件

| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| update:modelValue | 评分值改变时 | value: number - 评分值 |
| change | 评分值改变时 | { value: number } - 评分值 |

### Methods方法

该组件没有对外暴露的方法。

### Slots插槽

该组件没有定义插槽。

## 多场景使用示例代码

### 1. 基础用法

```vue
<template>
  <view class="rate-demo">
    <view class="demo-title">基础用法</view>
    <wd-rate v-model="rating" />
    <view class="rate-info">评分：{{ rating }}</view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const rating = ref(3)
</script>

<style scoped>
.rate-demo {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.demo-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.rate-info {
  font-size: 16px;
  color: #666;
}
</style>
```

### 2. 半星评分

```vue
<template>
  <view class="rate-demo">
    <view class="demo-title">半星评分</view>
    <wd-rate v-model="rating" allow-half />
    <view class="rate-info">评分：{{ rating }}</view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const rating = ref(3.5)
</script>
```

### 3. 自定义数量和大小

```vue
<template>
  <view class="rate-demo">
    <view class="demo-title">自定义数量和大小</view>
    <wd-rate v-model="rating" :num="10" size="24px" />
    <view class="rate-info">评分：{{ rating }}</view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const rating = ref(7)
</script>
```

### 4. 自定义颜色

```vue
<template>
  <view class="rate-demo">
    <view class="demo-title">自定义颜色</view>
    <wd-rate v-model="rating" color="#E0E0E0" active-color="#4CAF50" />
    <view class="demo-subtitle">分段颜色</view>
    <wd-rate v-model="rating2" active-color="['#FF4D4F', '#4D80F0']" />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const rating = ref(4)
const rating2 = ref(4)
</script>

<style scoped>
.demo-subtitle {
  font-size: 14px;
  color: #666;
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>
```

### 5. 只读和禁用

```vue
<template>
  <view class="rate-demo">
    <view class="demo-title">只读和禁用</view>
    <view class="demo-subtitle">只读模式</view>
    <wd-rate v-model="rating" readonly />
    <view class="demo-subtitle">禁用模式</view>
    <wd-rate v-model="rating2" disabled />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const rating = ref(4)
const rating2 = ref(3)
</script>
```

### 6. 自定义图标

```vue
<template>
  <view class="rate-demo">
    <view class="demo-title">自定义图标</view>
    <wd-rate v-model="rating" icon="heart" active-icon="heart-filled" color="#E0E0E0" active-color="#FF4D4F" />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const rating = ref(4)
</script>
```

## 样式定制指南

### customStyle 用法
使用 customStyle 属性可以自定义评分组件的内联样式，例如修改边距、背景色等。

```vue
<wd-rate 
  v-model="rating"
  custom-style="margin: 20px; padding: 10px; background-color: #f5f7fa; border-radius: 8px;"
/>
```

### customClass 用法
使用 customClass 属性可以为评分组件添加自定义样式类，便于在外部 CSS 中进行样式定制。

```vue
<wd-rate 
  v-model="rating"
  custom-class="my-rate"
/>

<style scoped>
:deep(.my-rate) {
  --wd-rate-icon-color: #E0E0E0;
  --wd-rate-active-color: #4D80F0;
  --wd-rate-disabled-color: #BDBDBD;
}
</style>
```

## 注意事项

1. **modelValue 属性**：modelValue 用于绑定评分值，支持字符串、数字或 null 类型，使用 v-model 进行双向绑定。

2. **allowHalf 属性**：allowHalf 用于允许半星评分，当 allowHalf 为 true 时，用户可以选择半星评分。

3. **readonly 属性**：readonly 用于设置评分组件为只读模式，只读模式下用户无法点击或滑动评分。

4. **disabled 属性**：disabled 用于禁用评分组件，禁用后无法点击或滑动评分，且图标颜色变为禁用颜色。

5. **activeColor 属性**：activeColor 支持两种形式：
   - 字符串形式：如 '#4D80F0'，表示所有选中的图标使用同一种颜色
   - 数组形式：如 ['#FF4D4F', '#4D80F0']，表示分段颜色，评分较低时使用第一种颜色，评分较高时使用第二种颜色

6. **clearable 属性**：clearable 用于允许再次点击相同的值时重置为 0，当 clearable 为 true 时，点击当前评分值会将评分重置为 0。

7. **触摸滑动评分**：组件支持触摸滑动评分，在移动设备上可以通过滑动手势快速调整评分。

8. **性能优化**：对于频繁更新的评分组件，建议使用 readonly 模式，避免不必要的渲染开销。

9. **兼容性**：组件在不同平台上的表现可能略有差异，特别是在触摸滑动评分方面。

10. **样式定制**：可以通过 CSS 变量修改评分组件的样式，包括图标颜色、大小、间距等。