# Steps 步骤条
<demo-model url="/subPages/steps/Index"></demo-model>

## 组件概况

### 组件概述
Steps 是步骤条组件，用于配合 Step 组件实现分步展示功能。它可以统一管理多个步骤项，控制当前激活的步骤，设置布局方向和样式，适用于各种流程引导和状态展示场景。

### 详细功能描述
- 支持水平和垂直两种布局方式
- 支持设置当前激活的步骤
- 支持点状和数字两种步骤样式
- 支持自定义步骤之间的间距
- 支持水平居中显示
- 支持自定义样式和类名
- 自动管理子组件 Step 的状态

### 适用业务场景
- 表单提交流程
- 注册登录流程
- 引导用户完成任务的步骤
- 订单状态跟踪
- 任何需要分步展示的场景

## 完整API参考

### Props属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| active | number | 0 | 否 | 当前激活的步骤进度，以数字表示 |
| vertical | boolean | false | 否 | 是否为垂直方向的步骤条 |
| dot | boolean | false | 否 | 是否为点状步骤条样式 |
| space | string | - | 否 | 步骤条之间的间距，默认为自动计算 |
| alignCenter | boolean | false | 否 | 是否将步骤条水平居中显示，只对横向步骤条有效 |
| customStyle | string | - | 否 | 自定义根节点样式 |
| customClass | string | - | 否 | 自定义根节点样式类 |

### Events事件

该组件没有对外暴露的事件。

### Methods方法

该组件没有对外暴露的方法。

### Slots插槽

| 插槽名 | 作用域变量 | 使用说明 |
|--------|------------|----------|
| default | - | 用于放置 Step 组件，作为步骤条的子项 |

## 多场景使用示例代码

### 1. 基础用法

```vue
<template>
  <view class="steps-demo">
    <wd-steps :active="active">
      <wd-step title="步骤一" description="这是步骤一的描述"></wd-step>
      <wd-step title="步骤二" description="这是步骤二的描述"></wd-step>
      <wd-step title="步骤三" description="这是步骤三的描述"></wd-step>
    </wd-steps>
    
    <view class="steps-demo__actions">
      <wd-button size="small" @click="prevStep" :disabled="active === 0">上一步</wd-button>
      <wd-button size="small" type="primary" @click="nextStep" :disabled="active === 2">下一步</wd-button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(0)

const prevStep = () => {
  if (active.value > 0) {
    active.value--
  }
}

const nextStep = () => {
  if (active.value < 2) {
    active.value++
  }
}
</script>

<style scoped>
.steps-demo {
  padding: 40rpx;
}

.steps-demo__actions {
  margin-top: 40rpx;
  display: flex;
  gap: 20rpx;
  justify-content: center;
}
</style>
```

### 2. 垂直布局

```vue
<template>
  <view class="steps-demo">
    <wd-steps :active="active" vertical>
      <wd-step title="步骤一" description="这是步骤一的描述内容，垂直布局下可以显示更多的描述信息"></wd-step>
      <wd-step title="步骤二" description="这是步骤二的描述内容，垂直布局下可以显示更多的描述信息"></wd-step>
      <wd-step title="步骤三" description="这是步骤三的描述内容，垂直布局下可以显示更多的描述信息"></wd-step>
    </wd-steps>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(1)
</script>

<style scoped>
.steps-demo {
  padding: 40rpx;
}
</style>
```

### 3. 点状样式

```vue
<template>
  <view class="steps-demo">
    <wd-steps :active="active" dot>
      <wd-step title="步骤一" description="这是点状样式的步骤一"></wd-step>
      <wd-step title="步骤二" description="这是点状样式的步骤二"></wd-step>
      <wd-step title="步骤三" description="这是点状样式的步骤三"></wd-step>
    </wd-steps>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(1)
</script>

<style scoped>
.steps-demo {
  padding: 40rpx;
}
</style>
```

### 4. 自定义间距

```vue
<template>
  <view class="steps-demo">
    <wd-steps :active="active" space="200rpx">
      <wd-step title="步骤一" description="自定义间距"></wd-step>
      <wd-step title="步骤二" description="自定义间距"></wd-step>
      <wd-step title="步骤三" description="自定义间距"></wd-step>
    </wd-steps>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(1)
</script>

<style scoped>
.steps-demo {
  padding: 40rpx;
}
</style>
```

### 5. 水平居中显示

```vue
<template>
  <view class="steps-demo">
    <wd-steps :active="active" align-center>
      <wd-step title="步骤一" description="水平居中显示"></wd-step>
      <wd-step title="步骤二" description="水平居中显示"></wd-step>
      <wd-step title="步骤三" description="水平居中显示"></wd-step>
    </wd-steps>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(1)
</script>

<style scoped>
.steps-demo {
  padding: 40rpx;
}
</style>
```

## 样式定制指南

### 1. 使用customStyle自定义样式

```vue
<template>
  <view class="steps-demo">
    <wd-steps 
      :active="active" 
      customStyle="background-color: #f0f9ff; padding: 40rpx; border-radius: 16rpx;"
    >
      <wd-step title="步骤一" description="自定义样式"></wd-step>
      <wd-step title="步骤二" description="自定义样式"></wd-step>
      <wd-step title="步骤三" description="自定义样式"></wd-step>
    </wd-steps>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(1)
</script>

<style scoped>
.steps-demo {
  padding: 40rpx;
}
</style>
```

### 2. 使用customClass自定义类名

```vue
<template>
  <view class="steps-demo">
    <wd-steps 
      :active="active" 
      customClass="my-steps"
    >
      <wd-step title="步骤一" description="自定义类名"></wd-step>
      <wd-step title="步骤二" description="自定义类名"></wd-step>
      <wd-step title="步骤三" description="自定义类名"></wd-step>
    </wd-steps>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(1)
</script>

<style scoped>
.steps-demo {
  padding: 40rpx;
}

:deep(.my-steps) {
  background-color: #f0f9ff;
  padding: 40rpx;
  border-radius: 16rpx;
}

:deep(.my-steps .wd-step__title) {
  color: #1989fa;
  font-weight: bold;
}
</style>
```

## 注意事项

1. **组件关系**：Steps 组件必须包含一个或多个 Step 子组件，否则无法正常显示。

2. **active属性**：active 属性用于设置当前激活的步骤索引，从0开始计数。

3. **布局方向**：
   - 当 vertical 为 false（默认）时，步骤条为水平布局
   - 当 vertical 为 true 时，步骤条为垂直布局

4. **样式类型**：
   - 当 dot 为 false（默认）时，步骤条使用数字样式
   - 当 dot 为 true 时，步骤条使用点状样式

5. **间距设置**：
   - 当不设置 space 属性时，步骤条会自动计算每个步骤的间距
   - 当设置了 space 属性时，会使用该值作为每个步骤之间的间距
   - space 属性支持带单位的字符串，如 "200rpx"、"100px"

6. **居中显示**：alignCenter 属性只对水平布局的步骤条有效，垂直布局时该属性无效。

7. **状态继承**：Steps 组件的属性会自动传递给子组件 Step，子组件可以覆盖父组件的设置。

8. **步骤数量**：建议步骤数量控制在3-5个之间，过多的步骤会导致用户体验不佳。

9. **跨平台兼容性**：该组件在各平台表现一致，无需特殊处理。

10. **性能优化**：对于大量步骤的场景，建议使用垂直布局或分页展示，避免一次性渲染过多步骤影响性能。