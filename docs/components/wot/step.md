# Step 步骤项
<demo-model url="/subPages/step/Index"></demo-model>

## 组件概况

### 组件概述
Step 是步骤条组件的单个步骤项，用于配合 Steps 组件实现分步展示功能。它可以显示步骤的状态、标题、描述和图标，支持多种状态和布局样式，适用于各种流程引导和状态展示场景。

### 详细功能描述
- 支持自定义步骤标题和描述文本
- 支持自定义步骤图标
- 支持多种步骤状态：已完成（finished）、进行中（process）、出错（error）
- 支持水平和垂直两种布局方式
- 支持点状样式
- 支持自定义样式和类名
- 自动继承父组件 Steps 的配置

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
| title | string | - | 否 | 步骤标题，如果没有则使用默认文案。当只有标题而没有描述时，标题的字号会小2号 |
| description | string | - | 否 | 步骤描述 |
| icon | string | - | 否 | 步骤图标 |
| status | string | - | 否 | 步骤状态，可选值：finished（已完成）、process（进行中）、error（出错） |
| customStyle | string | - | 否 | 自定义根节点样式 |
| customClass | string | - | 否 | 自定义根节点样式类 |

### Events事件

该组件没有对外暴露的事件。

### Methods方法

该组件没有对外暴露的方法。

### Slots插槽

| 插槽名 | 作用域变量 | 使用说明 |
|--------|------------|----------|
| icon | - | 自定义步骤图标，用于替换默认的图标或数字 |
| title | - | 自定义步骤标题，用于替换默认的标题文本 |
| description | - | 自定义步骤描述，用于替换默认的描述文本 |

## 多场景使用示例代码

### 1. 基础用法

```vue
<template>
  <view class="step-demo">
    <wd-steps :active="active">
      <wd-step title="步骤一" description="这是步骤一的描述"></wd-step>
      <wd-step title="步骤二" description="这是步骤二的描述"></wd-step>
      <wd-step title="步骤三" description="这是步骤三的描述"></wd-step>
    </wd-steps>
    
    <view class="step-demo__actions">
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
.step-demo {
  padding: 40rpx;
}

.step-demo__actions {
  margin-top: 40rpx;
  display: flex;
  gap: 20rpx;
  justify-content: center;
}
</style>
```

### 2. 自定义图标

```vue
<template>
  <view class="step-demo">
    <wd-steps :active="active">
      <wd-step icon="user" title="填写信息" description="请填写基本信息"></wd-step>
      <wd-step icon="card" title="身份验证" description="请进行身份验证"></wd-step>
      <wd-step icon="check" title="完成注册" description="注册成功"></wd-step>
    </wd-steps>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(1)
</script>

<style scoped>
.step-demo {
  padding: 40rpx;
}
</style>
```

### 3. 自定义插槽内容

```vue
<template>
  <view class="step-demo">
    <wd-steps :active="active">
      <wd-step>
        <template #icon>
          <view class="custom-icon">1</view>
        </template>
        <template #title>
          <view class="custom-title">自定义标题</view>
        </template>
        <template #description>
          <view class="custom-description">这是自定义的描述内容</view>
        </template>
      </wd-step>
      <wd-step>
        <template #icon>
          <view class="custom-icon">2</view>
        </template>
        <template #title>
          <view class="custom-title">自定义标题</view>
        </template>
        <template #description>
          <view class="custom-description">这是自定义的描述内容</view>
        </template>
      </wd-step>
      <wd-step>
        <template #icon>
          <view class="custom-icon">3</view>
        </template>
        <template #title>
          <view class="custom-title">自定义标题</view>
        </template>
        <template #description>
          <view class="custom-description">这是自定义的描述内容</view>
        </template>
      </wd-step>
    </wd-steps>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(1)
</script>

<style scoped>
.step-demo {
  padding: 40rpx;
}

.custom-icon {
  width: 40rpx;
  height: 40rpx;
  background-color: #1989fa;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
}

.custom-title {
  color: #1989fa;
  font-weight: bold;
}

.custom-description {
  color: #606266;
  font-size: 24rpx;
}
</style>
```

### 4. 单独控制步骤状态

```vue
<template>
  <view class="step-demo">
    <wd-steps>
      <wd-step status="finished" title="步骤一" description="已完成"></wd-step>
      <wd-step status="error" title="步骤二" description="出错了"></wd-step>
      <wd-step status="wait" title="步骤三" description="等待中"></wd-step>
    </wd-steps>
  </view>
</template>

<style scoped>
.step-demo {
  padding: 40rpx;
}
</style>
```

### 5. 垂直布局

```vue
<template>
  <view class="step-demo">
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
.step-demo {
  padding: 40rpx;
}
</style>
```

## 样式定制指南

### 1. 使用customStyle自定义样式

```vue
<template>
  <view class="step-demo">
    <wd-steps :active="active">
      <wd-step 
        title="自定义样式" 
        description="这是自定义样式的步骤" 
        customStyle="background-color: #f0f9ff; padding: 20rpx; border-radius: 12rpx;"
      ></wd-step>
      <wd-step title="普通步骤" description="这是普通步骤"></wd-step>
      <wd-step title="普通步骤" description="这是普通步骤"></wd-step>
    </wd-steps>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(0)
</script>

<style scoped>
.step-demo {
  padding: 40rpx;
}
</style>
```

### 2. 使用customClass自定义类名

```vue
<template>
  <view class="step-demo">
    <wd-steps :active="active">
      <wd-step 
        title="自定义类名" 
        description="这是自定义类名的步骤" 
        customClass="my-step"
      ></wd-step>
      <wd-step title="普通步骤" description="这是普通步骤"></wd-step>
      <wd-step title="普通步骤" description="这是普通步骤"></wd-step>
    </wd-steps>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(0)
</script>

<style scoped>
.step-demo {
  padding: 40rpx;
}

:deep(.my-step) {
  background-color: #f0f9ff;
  padding: 20rpx;
  border-radius: 12rpx;
}

:deep(.my-step .wd-step__title) {
  color: #1989fa;
  font-weight: bold;
}

:deep(.my-step .wd-step__description) {
  color: #606266;
  font-size: 24rpx;
}
</style>
```

## 注意事项

1. **组件关系**：Step 组件必须作为 Steps 组件的直接子组件使用，否则无法正常工作。

2. **标题样式**：当只有标题而没有描述时，标题的字号会自动减小2号，以适应不同的布局需求。

3. **状态控制**：
   - 步骤状态可以通过父组件 Steps 的 active 属性统一控制
   - 也可以通过 Step 组件自身的 status 属性单独控制某个步骤的状态
   - 当同时设置了父组件的 active 属性和子组件的 status 属性时，子组件的 status 属性优先级更高

4. **布局继承**：Step 组件会自动继承父组件 Steps 的布局属性（如 vertical、dot 等），无需在每个 Step 组件上重复设置。

5. **插槽优先级**：当同时设置了属性（如 title、description、icon）和对应的插槽时，插槽的内容会覆盖属性的值。

6. **步骤数量**：Step 组件的数量应与业务流程的实际步骤数量一致，避免过多或过少的步骤导致用户体验不佳。

7. **描述文本**：描述文本应简洁明了，避免过长的文本导致布局错乱或用户阅读困难。

8. **自定义图标**：使用自定义图标时，建议使用与组件库风格一致的图标，以保证整体视觉效果的统一性。

9. **跨平台兼容性**：该组件在各平台表现一致，无需特殊处理。

10. **性能优化**：对于大量步骤的场景，建议使用懒加载或分页加载的方式，避免一次性渲染过多步骤影响性能。