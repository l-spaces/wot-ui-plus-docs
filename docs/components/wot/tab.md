# Tab 标签页内容
<demo-model url="/subPages/tab/Index"></demo-model>

## 组件概况

### 组件概述
Tab 是标签页内容组件，用于配合 Tabs 组件使用，实现标签页切换功能。它负责显示单个标签页的内容，支持懒加载、禁用状态、徽标属性等功能，适用于各种需要标签页切换的场景。

### 详细功能描述
- 支持标签页内容显示
- 支持懒加载，切换到该标签页时才加载内容
- 支持禁用状态
- 支持徽标属性，可显示未读消息数或红点
- 支持自定义样式和类名
- 自动与父组件 Tabs 配合使用

### 适用业务场景
- 表单中的标签页切换
- 设置页面中的标签页选项
- 内容分类展示
- 多标签页切换
- 任何需要标签页切换的场景

## 完整API参考

### Props属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| name | number/string | - | 否 | 唯一标识符，用于标识当前标签页 |
| title | string | - | 否 | tab的标题，会显示在标签栏上 |
| disabled | boolean | false | 否 | 是否禁用，禁用状态下无法点击切换 |
| lazy | boolean | true | 否 | 是否懒加载，切换到该tab时才加载内容 |
| badgeProps | object | - | 否 | 徽标属性，透传给 Badge 组件 |
| customStyle | string | - | 否 | 自定义根节点样式 |
| customClass | string | - | 否 | 自定义根节点样式类 |

### Events事件

该组件没有对外暴露的事件。

### Methods方法

该组件没有对外暴露的方法。

### Slots插槽

| 插槽名 | 作用域变量 | 使用说明 |
|--------|------------|----------|
| default | - | 标签页内容，用于放置当前标签页的具体内容 |

## 多场景使用示例代码

### 1. 基础用法

```vue
<template>
  <view class="tab-demo">
    <wd-tabs v-model="activeTab">
      <wd-tab title="标签一">
        <view class="tab-content">
          <text>标签页一的内容</text>
        </view>
      </wd-tab>
      <wd-tab title="标签二">
        <view class="tab-content">
          <text>标签页二的内容</text>
        </view>
      </wd-tab>
      <wd-tab title="标签三">
        <view class="tab-content">
          <text>标签页三的内容</text>
        </view>
      </wd-tab>
    </wd-tabs>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeTab = ref(0)
</script>

<style scoped>
.tab-demo {
  padding: 20rpx;
  background-color: #f5f5f5;
}

.tab-content {
  padding: 40rpx;
  background-color: #fff;
  border-radius: 8rpx;
  min-height: 300rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
  color: #303133;
}
</style>
```

### 2. 使用name属性

```vue
<template>
  <view class="tab-demo">
    <wd-tabs v-model="activeName">
      <wd-tab name="tab1" title="标签一">
        <view class="tab-content">
          <text>标签页一的内容</text>
        </view>
      </wd-tab>
      <wd-tab name="tab2" title="标签二">
        <view class="tab-content">
          <text>标签页二的内容</text>
        </view>
      </wd-tab>
      <wd-tab name="tab3" title="标签三">
        <view class="tab-content">
          <text>标签页三的内容</text>
        </view>
      </wd-tab>
    </wd-tabs>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeName = ref('tab1')
</script>

<style scoped>
.tab-demo {
  padding: 20rpx;
  background-color: #f5f5f5;
}

.tab-content {
  padding: 40rpx;
  background-color: #fff;
  border-radius: 8rpx;
  min-height: 300rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
  color: #303133;
}
</style>
```

### 3. 禁用状态

```vue
<template>
  <view class="tab-demo">
    <wd-tabs v-model="activeTab">
      <wd-tab title="标签一">
        <view class="tab-content">
          <text>标签页一的内容</text>
        </view>
      </wd-tab>
      <wd-tab title="标签二" disabled>
        <view class="tab-content">
          <text>标签页二的内容（禁用）</text>
        </view>
      </wd-tab>
      <wd-tab title="标签三">
        <view class="tab-content">
          <text>标签页三的内容</text>
        </view>
      </wd-tab>
    </wd-tabs>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeTab = ref(0)
</script>

<style scoped>
.tab-demo {
  padding: 20rpx;
  background-color: #f5f5f5;
}

.tab-content {
  padding: 40rpx;
  background-color: #fff;
  border-radius: 8rpx;
  min-height: 300rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
  color: #303133;
}
</style>
```

### 4. 懒加载

```vue
<template>
  <view class="tab-demo">
    <wd-tabs v-model="activeTab">
      <wd-tab title="标签一" :lazy="true">
        <view class="tab-content">
          <text>标签页一的内容（懒加载）</text>
          <text class="load-time">加载时间：{{ loadTime1 }}</text>
        </view>
      </wd-tab>
      <wd-tab title="标签二" :lazy="true">
        <view class="tab-content">
          <text>标签页二的内容（懒加载）</text>
          <text class="load-time">加载时间：{{ loadTime2 }}</text>
        </view>
      </wd-tab>
      <wd-tab title="标签三" :lazy="false">
        <view class="tab-content">
          <text>标签页三的内容（非懒加载）</text>
          <text class="load-time">加载时间：{{ loadTime3 }}</text>
        </view>
      </wd-tab>
    </wd-tabs>
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const activeTab = ref(0)
const loadTime1 = ref('')
const loadTime2 = ref('')
const loadTime3 = ref('')

// 非懒加载的标签页会在组件挂载时加载
onMounted(() => {
  loadTime3.value = new Date().toLocaleTimeString()
})

// 监听activeTab变化，模拟懒加载
watch(activeTab, (newValue) => {
  if (newValue === 0) {
    loadTime1.value = new Date().toLocaleTimeString()
  } else if (newValue === 1) {
    loadTime2.value = new Date().toLocaleTimeString()
  }
})
</script>

<style scoped>
.tab-demo {
  padding: 20rpx;
  background-color: #f5f5f5;
}

.tab-content {
  padding: 40rpx;
  background-color: #fff;
  border-radius: 8rpx;
  min-height: 300rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
  color: #303133;
  gap: 20rpx;
}

.load-time {
  font-size: 24rpx;
  color: #606266;
}
</style>
```

### 5. 使用徽标

```vue
<template>
  <view class="tab-demo">
    <wd-tabs v-model="activeTab">
      <wd-tab title="消息" :badge-props="{ value: 5 }">
        <view class="tab-content">
          <text>消息列表</text>
        </view>
      </wd-tab>
      <wd-tab title="通知" :badge-props="{ dot: true }">
        <view class="tab-content">
          <text>通知列表</text>
        </view>
      </wd-tab>
      <wd-tab title="设置">
        <view class="tab-content">
          <text>设置页面</text>
        </view>
      </wd-tab>
    </wd-tabs>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeTab = ref(0)
</script>

<style scoped>
.tab-demo {
  padding: 20rpx;
  background-color: #f5f5f5;
}

.tab-content {
  padding: 40rpx;
  background-color: #fff;
  border-radius: 8rpx;
  min-height: 300rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
  color: #303133;
}
</style>
```

## 样式定制指南

### 1. 使用customStyle自定义样式

```vue
<template>
  <wd-tab 
    title="自定义样式" 
    customStyle="background-color: #f0f9ff; padding: 40rpx; border-radius: 16rpx;"
  >
    <view class="tab-content">
      <text>标签页内容</text>
    </view>
  </wd-tab>
</template>
```

### 2. 使用customClass自定义类名

```vue
<template>
  <wd-tab 
    title="自定义类名" 
    customClass="my-tab"
  >
    <view class="tab-content">
      <text>标签页内容</text>
    </view>
  </wd-tab>
</template>

<style scoped>
:deep(.my-tab) {
  background-color: #f0f9ff;
  padding: 40rpx;
  border-radius: 16rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
}

.tab-content {
  font-size: 32rpx;
  color: #1989fa;
}
</style>
```

## 注意事项

1. **组件关系**：
   - Tab 组件必须作为 Tabs 组件的直接子组件使用
   - 单个 Tab 组件无法独立使用，必须配合 Tabs 组件

2. **name属性**：
   - name属性用于唯一标识标签页，支持number和string类型
   - 如果多个 Tab 组件的name属性值相同，会在控制台输出错误信息
   - 建议为每个 Tab 组件设置唯一的name属性

3. **懒加载**：
   - 默认情况下，Tab 组件是懒加载的，只有切换到该标签页时才会加载内容
   - 设置lazy="false"可以关闭懒加载，组件挂载时就会加载内容
   - 懒加载可以提高初始加载性能，适合内容较多的标签页

4. **禁用状态**：
   - 设置disabled="true"可以禁用标签页
   - 禁用状态下，标签页无法点击切换
   - 但可以通过代码切换到禁用的标签页

5. **徽标属性**：
   - badgeProps属性支持所有 Badge 组件的属性
   - 可以显示数字徽标、红点徽标等
   - 徽标会显示在标签栏的标题旁边

6. **样式注意**：
   - customStyle和customClass会应用到 Tab 组件的根节点上
   - 可以通过穿透选择器修改内部样式

7. **内容渲染**：
   - 组件内部会根据active状态控制内容的显示和隐藏
   - 非激活状态下，内容会被隐藏（除了使用动画切换时）

8. **性能优化**：
   - 对于内容较多的标签页，建议开启懒加载
   - 避免在标签页中使用过于复杂的组件或大量数据

9. **跨平台兼容性**：
   - 组件在 H5、App 和小程序平台表现一致
   - 样式会自动适应不同平台的渲染差异

10. **与Tabs组件配合**：
    - Tab 组件会自动与父组件 Tabs 建立联系
    - 不需要手动处理标签页的切换逻辑
    - 所有标签页的切换逻辑由 Tabs 组件统一管理