# Tour 引导
<demo-model url="/subPages/tour/Index"></demo-model>

## 组件概况

### 组件概述
Tour 是一种用于新用户引导的组件，它通过高亮页面中的特定元素并显示提示信息，引导用户了解产品的主要功能和操作流程。

### 详细功能描述
- 支持多步骤引导，可定义多个高亮元素和提示内容
- 自动计算高亮元素位置，并智能调整提示框位置
- 支持点击蒙版或按钮切换步骤
- 可自定义蒙版样式、高亮区域样式和提示框内容
- 支持上一步、下一步、跳过和完成等操作
- 提供丰富的事件回调，便于控制引导流程
- 支持自定义按钮文本和样式
- 支持动画效果和过渡

### 适用业务场景
- 新用户首次使用产品时的功能引导
- 产品更新后新增功能的引导提示
- 复杂操作流程的分步引导
- 重点功能的突出展示
- 降低用户学习成本，提高产品易用性

## 完整API参考

### Props

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| modelValue | boolean | false | 否 | 是否显示引导组件，使用 v-model 绑定 |
| steps | array | [] | 否 | 引导步骤列表，每个步骤包含 element（需要高亮的元素选择器）和 content（引导文字内容） |
| current | number | 0 | 否 | 当前引导步骤索引 |
| mask | boolean | true | 否 | 是否显示蒙版 |
| maskColor | string | 'rgba(0, 0, 0, 0.5)' | 否 | 蒙版颜色（支持 rgba 格式） |
| offset | number | 20 | 否 | 引导框与高亮元素之间的间距 |
| duration | number | 300 | 否 | 动画持续时间（毫秒） |
| borderRadius | number | 8 | 否 | 高亮区域的圆角大小 |
| padding | number | 8 | 否 | 高亮区域的内边距 |
| prevText | string | '上一步' | 否 | 上一步按钮文字 |
| nextText | string | '下一步' | 否 | 下一步按钮文字 |
| skipText | string | '跳过' | 否 | 跳过按钮文字 |
| finishText | string | '完成' | 否 | 完成按钮文字 |
| bottomSafetyOffset | number | 100 | 否 | 底部安全偏移量，用于滚动计算时确保元素周围有足够的空间 |
| topSafetyOffset | number | 0 | 否 | 顶部安全偏移量，用于滚动计算时确保元素周围有足够的空间 |
| customNav | boolean | false | 否 | 是否自定义顶部导航栏 |
| clickMaskNext | boolean | false | 否 | 点击蒙版是否可以切换到下一步 |
| highlightStyle | object | {} | 否 | 高亮区域样式 |
| zIndex | number | 999998 | 否 | 引导框的层级 |
| showTourButtons | boolean | true | 否 | 是否显示引导按钮 |
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |

### Events

| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| update:modelValue | 引导组件显示/隐藏状态变化时 | 新的状态值（boolean） |
| update:current | 当前引导步骤索引变化时 | 新的步骤索引（number） |
| change | 当前引导步骤变化时 | 新的步骤索引（number） |
| prev | 点击上一步按钮时 | 包含oldCurrent（旧索引）、current（新索引）、total（总步骤数）、isUp（是否向上）的对象 |
| next | 点击下一步按钮时 | 包含oldCurrent（旧索引）、current（新索引）、total（总步骤数）、isUp（是否向上）的对象 |
| finish | 点击完成按钮时 | 包含current（当前索引）、total（总步骤数）的对象 |
| skip | 点击跳过按钮时 | 包含current（当前索引）、total（总步骤数）的对象 |
| error | 无法找到指定的引导元素时 | 包含message（错误信息）、element（元素选择器）的对象 |

### Methods

| 方法名 | 参数 | 返回值 | 功能说明 |
|--------|------|--------|----------|
| handlePrev | 无 | 无 | 切换到上一步 |
| handleNext | 无 | 无 | 切换到下一步 |
| handleFinish | 无 | 无 | 完成引导 |
| handleSkip | 无 | 无 | 跳过引导 |

### Slots

| 插槽名 | 作用域变量 | 使用说明 |
|--------|------------|----------|
| highlight | elementInfo（高亮元素信息） | 自定义高亮区域样式和内容 |
| content | 无 | 自定义引导框内容 |
| prev | 无 | 自定义上一步按钮 |
| skip | 无 | 自定义跳过按钮 |
| next | 无 | 自定义下一步按钮 |
| finish | 无 | 自定义完成按钮 |

## 多场景使用示例代码

### 基础用法

```vue
<template>
  <view>
    <wd-button type="primary" id="button1" @click="showTour = true">开始引导</wd-button>
    <view class="content">
      <view id="element1" class="element">元素1</view>
      <view id="element2" class="element">元素2</view>
      <view id="element3" class="element">元素3</view>
    </view>
    <wd-tour v-model="showTour" :steps="steps" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showTour = ref(false)

const steps = ref([
  {
    element: '#button1',
    content: '点击此按钮开始引导'
  },
  {
    element: '#element1',
    content: '这是第一个需要注意的元素'
  },
  {
    element: '#element2',
    content: '这是第二个需要注意的元素'
  },
  {
    element: '#element3',
    content: '这是第三个需要注意的元素'
  }
])
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}

.element {
  width: 200px;
  height: 100px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}
</style>
```

### 自定义样式

```vue
<template>
  <view>
    <wd-button type="primary" id="custom-button" @click="showCustomTour = true">自定义样式引导</wd-button>
    <wd-tour 
      v-model="showCustomTour" 
      :steps="customSteps" 
      :mask="true" 
      mask-color="rgba(0, 0, 0, 0.3)" 
      :offset="10" 
      :duration="500"
      :border-radius="12"
      :padding="10"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showCustomTour = ref(false)

const customSteps = ref([
  {
    element: '#custom-button',
    content: '这是一个自定义样式的引导提示'
  }
])
</script>
```

### 自定义按钮文本

```vue
<template>
  <view>
    <wd-button type="primary" id="custom-text-button" @click="showTextTour = true">自定义按钮文本</wd-button>
    <wd-tour 
      v-model="showTextTour" 
      :steps="textSteps" 
      prev-text="上一步骤" 
      next-text="下一步骤" 
      skip-text="跳过引导" 
      finish-text="完成引导"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showTextTour = ref(false)

const textSteps = ref([
  {
    element: '#custom-text-button',
    content: '这是一个自定义按钮文本的引导提示'
  }
])
</script>
```

### 使用插槽自定义内容

```vue
<template>
  <view>
    <wd-button type="primary" id="slot-button" @click="showSlotTour = true">自定义插槽内容</wd-button>
    <wd-tour v-model="showSlotTour" :steps="slotSteps">
      <template #content>
        <view class="custom-content">
          <wd-icon name="info" size="24" color="#409eff" />
          <text class="title">自定义标题</text>
          <text class="desc">这是一段自定义的引导内容，可以包含图标、文字和样式。</text>
        </view>
      </template>
      <template #next>
        <wd-button type="primary" size="small">下一步</wd-button>
      </template>
      <template #finish>
        <wd-button type="success" size="small">完成</wd-button>
      </template>
    </wd-tour>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showSlotTour = ref(false)

const slotSteps = ref([
  {
    element: '#slot-button',
    content: ''
  }
])
</script>

<style scoped>
.custom-content {
  padding: 20px;
  text-align: center;
}

.title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  display: block;
  margin: 10px 0;
}

.desc {
  font-size: 14px;
  color: #666;
  line-height: 1.4;
}
</style>
```

### 点击蒙版切换下一步

```vue
<template>
  <view>
    <wd-button type="primary" id="mask-button" @click="showMaskTour = true">点击蒙版切换</wd-button>
    <wd-tour 
      v-model="showMaskTour" 
      :steps="maskSteps" 
      click-mask-next
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showMaskTour = ref(false)

const maskSteps = ref([
  {
    element: '#mask-button',
    content: '点击蒙版可以切换到下一步'
  },
  {
    element: '#mask-button',
    content: '这是第二步，继续点击蒙版完成引导'
  }
])
</script>
```

## 样式定制指南

### 自定义高亮区域样式

```vue
<template>
  <view>
    <wd-button type="primary" id="style-button" @click="showStyleTour = true">自定义高亮样式</wd-button>
    <wd-tour 
      v-model="showStyleTour" 
      :steps="styleSteps" 
      :highlight-style="highlightStyle"
    >
      <template #highlight="{ elementInfo }">
        <view class="custom-highlight" :style="elementInfo"></view>
      </template>
    </wd-tour>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showStyleTour = ref(false)

const styleSteps = ref([
  {
    element: '#style-button',
    content: '这是一个自定义高亮样式的引导提示'
  }
])

const highlightStyle = ref({
  border: '2px solid #409eff',
  boxShadow: '0 0 20px rgba(64, 158, 255, 0.5)'
})
</script>

<style scoped>
.custom-highlight {
  border-radius: 8px;
  background-color: rgba(64, 158, 255, 0.1);
}
</style>
```

## 注意事项

1. **元素选择器**：确保提供的element选择器能准确找到目标元素，否则会触发error事件。
2. **步骤顺序**：steps数组的顺序决定了引导的顺序，建议按照用户操作流程排列。
3. **内容简洁**：引导内容应简洁明了，避免过长的文字描述，影响用户体验。
4. **性能优化**：避免在引导过程中进行复杂的DOM操作，可能影响引导的流畅性。
5. **层级设置**：如果页面中存在其他层级较高的元素，可能会遮挡引导组件，此时需要调整zIndex属性。
6. **自定义导航栏**：如果使用了自定义导航栏，需要设置customNav为true，并根据实际情况调整topSafetyOffset。
7. **滚动处理**：引导组件会自动处理页面滚动，确保高亮元素在可视区域内。
8. **事件监听**：可以通过监听prev、next、finish、skip等事件，实现引导流程的自定义控制。