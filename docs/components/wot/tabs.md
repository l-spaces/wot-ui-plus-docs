# Tabs 标签页
<demo-model url="/subPages/tabs/Index"></demo-model>

## 组件概况

### 组件概述
标签页组件是用于实现内容切换的常用UI组件，支持多种配置选项和交互方式。wd-tabs组件提供了丰富的功能，包括粘性布局、手势滑动、动态下划线、导航地图等特性，适用于各种复杂的标签页场景。

### 详细功能描述
- 支持粘性布局，可配置吸顶位置
- 支持手势滑动切换标签
- 支持自动调整底部条宽度
- 支持自定义底部条宽度和高度
- 支持自定义激活和非激活状态颜色
- 支持标签内容切换动画
- 支持标签数量超过阈值时可滑动
- 支持标签数量超过阈值时显示导航地图
- 支持自定义导航地图标题
- 支持标签项徽标显示
- 支持标签项禁用状态
- 支持标签内容懒加载
- 支持标签点击事件
- 支持标签切换事件

### 适用业务场景
- 页面内容分类切换
- 表单分步填写
- 数据统计分析不同维度切换
- 移动端应用主导航
- 任何需要内容切换的场景

## 完整API参考

### Props属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| modelValue | number / string | 0 | 否 | 绑定值 |
| slidableNum | number | 6 | 否 | 标签数超过阈值可滑动 |
| mapNum | number | 10 | 否 | 标签数超过阈值显示导航地图 |
| mapTitle | string | - | 否 | 导航地图的标题 |
| sticky | boolean | false | 否 | 粘性布局 |
| offsetTop | number | 0 | 否 | 粘性布局吸顶位置 |
| swipeable | boolean | false | 否 | 开启手势滑动 |
| autoLineWidth | boolean | false | 否 | 自动调整底部条宽度，设置了 lineWidth 后无效 |
| lineWidth | number / string | - | 否 | 底部条宽度，单位像素 |
| lineHeight | number / string | - | 否 | 底部条高度，单位像素 |
| color | string | - | 否 | 激活状态颜色 |
| inactiveColor | string | - | 否 | 非活动状态颜色 |
| animated | boolean | false | 否 | 是否开启切换标签内容时的过渡动画 |
| duration | number | 300 | 否 | 切换动画过渡时间，单位毫秒 |
| slidable | 'auto' / 'always' | auto | 否 | 是否开启滚动导航 |
| showScrollbar | boolean | false | 否 | 标签可滑动时是否显示滚动条 |
| customStyle | string / object | - | 否 | 自定义样式 |
| customClass | string | - | 否 | 自定义类名 |

### Events事件

| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| change | 标签切换时触发 | { index: number, name: string } - 切换后的标签索引和名称 |
| disabled | 点击禁用标签时触发 | { index: number, name: string } - 禁用标签的索引和名称 |
| click | 点击标签时触发 | { index: number, name: string } - 点击标签的索引和名称 |
| update:modelValue | 标签切换时触发 | number / string - 切换后的标签索引或名称 |

### Methods方法

| 方法名 | 参数 | 返回值 | 功能说明 |
|--------|------|--------|----------|
| setActive | value: number / string, init: boolean, setScroll: boolean | void | 设置激活项 |
| scrollIntoView | - | void | 使选中项滚动到可视区域 |
| updateLineStyle | animation?: boolean | void | 更新激活项边框线样式 |

### Slots插槽

| 插槽名 | 作用域变量 | 使用说明 |
|--------|------------|----------|
| default | - | 用于放置 Tab 组件 |

## 多场景使用示例代码

### 1. 基础用法
```vue
<template>
  <wd-tabs v-model="activeTab">
    <wd-tab title="标签1" name="tab1">
      <view class="tab-content">标签1内容</view>
    </wd-tab>
    <wd-tab title="标签2" name="tab2">
      <view class="tab-content">标签2内容</view>
    </wd-tab>
    <wd-tab title="标签3" name="tab3">
      <view class="tab-content">标签3内容</view>
    </wd-tab>
  </wd-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 初始激活的标签
const activeTab = ref('tab1')
</script>

<style scoped>
.tab-content {
  padding: 20rpx;
  text-align: center;
}
</style>
```

### 2. 粘性布局和手势滑动
```vue
<template>
  <view class="container">
    <view class="header">
      <text class="header-title">页面标题</text>
    </view>
    
    <wd-tabs 
      v-model="activeTab" 
      sticky 
      offset-top="100" 
      swipeable 
      animated
      color="#1989fa"
    >
      <wd-tab title="标签1" name="tab1">
        <view class="tab-content">
          <view class="long-content" v-for="i in 20" :key="i">
            标签1内容 - {{ i }}
          </view>
        </view>
      </wd-tab>
      <wd-tab title="标签2" name="tab2">
        <view class="tab-content">
          <view class="long-content" v-for="i in 20" :key="i">
            标签2内容 - {{ i }}
          </view>
        </view>
      </wd-tab>
      <wd-tab title="标签3" name="tab3">
        <view class="tab-content">
          <view class="long-content" v-for="i in 20" :key="i">
            标签3内容 - {{ i }}
          </view>
        </view>
      </wd-tab>
      <wd-tab title="标签4" name="tab4">
        <view class="tab-content">
          <view class="long-content" v-for="i in 20" :key="i">
            标签4内容 - {{ i }}
          </view>
        </view>
      </wd-tab>
    </wd-tabs>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 初始激活的标签
const activeTab = ref('tab1')
</script>

<style scoped>
.container {
  height: 100vh;
}

.header {
  height: 100rpx;
  background-color: #1989fa;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-title {
  color: #fff;
  font-size: 36rpx;
  font-weight: bold;
}

.tab-content {
  padding: 20rpx;
}

.long-content {
  height: 80rpx;
  display: flex;
  align-items: center;
  border-bottom: 1rpx solid #f0f0f0;
}
</style>
```

### 3. 自定义底部条和颜色
```vue
<template>
  <wd-tabs 
    v-model="activeTab" 
    :line-width="80" 
    :line-height="4" 
    color="#ee0a24"
    inactive-color="#969799"
  >
    <wd-tab title="热门" name="hot">
      <view class="tab-content">热门内容</view>
    </wd-tab>
    <wd-tab title="最新" name="new">
      <view class="tab-content">最新内容</view>
    </wd-tab>
    <wd-tab title="推荐" name="recommend">
      <view class="tab-content">推荐内容</view>
    </wd-tab>
  </wd-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 初始激活的标签
const activeTab = ref('hot')
</script>

<style scoped>
.tab-content {
  padding: 20rpx;
  text-align: center;
}
</style>
```

### 4. 带徽标的标签
```vue
<template>
  <wd-tabs v-model="activeTab">
    <wd-tab title="消息" name="message" :badge-props="{ value: 5 }">
      <view class="tab-content">消息内容</view>
    </wd-tab>
    <wd-tab title="通知" name="notification" :badge-props="{ is-dot: true }">
      <view class="tab-content">通知内容</view>
    </wd-tab>
    <wd-tab title="私信" name="private" :badge-props="{ value: 12, max: 99 }">
      <view class="tab-content">私信内容</view>
    </wd-tab>
  </wd-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 初始激活的标签
const activeTab = ref('message')
</script>

<style scoped>
.tab-content {
  padding: 20rpx;
  text-align: center;
}
</style>
```

### 5. 禁用标签和事件处理
```vue
<template>
  <wd-tabs 
    v-model="activeTab" 
    @change="handleChange" 
    @click="handleClick" 
    @disabled="handleDisabled"
  >
    <wd-tab title="可用标签" name="enabled">
      <view class="tab-content">可用标签内容</view>
    </wd-tab>
    <wd-tab title="禁用标签" name="disabled" disabled>
      <view class="tab-content">禁用标签内容</view>
    </wd-tab>
    <wd-tab title="普通标签" name="normal">
      <view class="tab-content">普通标签内容</view>
    </wd-tab>
  </wd-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 初始激活的标签
const activeTab = ref('enabled')

// 标签切换事件
const handleChange = (event: { index: number; name: string }) => {
  console.log('标签切换:', event)
}

// 标签点击事件
const handleClick = (event: { index: number; name: string }) => {
  console.log('标签点击:', event)
}

// 禁用标签点击事件
const handleDisabled = (event: { index: number; name: string }) => {
  console.log('禁用标签点击:', event)
}
</script>

<style scoped>
.tab-content {
  padding: 20rpx;
  text-align: center;
}
</style>
```

## 样式定制指南

### customStyle 用法
```vue
<template>
  <wd-tabs 
    v-model="activeTab" 
    :custom-style="{ backgroundColor: '#f5f7fa', borderRadius: '8px' }"
  >
    <wd-tab title="标签1" name="tab1">
      <view class="tab-content">标签1内容</view>
    </wd-tab>
    <wd-tab title="标签2" name="tab2">
      <view class="tab-content">标签2内容</view>
    </wd-tab>
  </wd-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('tab1')
</script>

<style scoped>
.tab-content {
  padding: 20rpx;
  text-align: center;
}
</style>
```

### customClass 用法
```vue
<template>
  <wd-tabs v-model="activeTab" custom-class="my-tabs">
    <wd-tab title="标签1" name="tab1">
      <view class="tab-content">标签1内容</view>
    </wd-tab>
    <wd-tab title="标签2" name="tab2">
      <view class="tab-content">标签2内容</view>
    </wd-tab>
  </wd-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('tab1')
</script>

<style lang="scss">
.my-tabs {
  background-color: #f5f7fa;
  
  .wd-tabs__nav {
    padding: 0 20rpx;
  }
  
  .wd-tabs__nav-item {
    margin: 0 30rpx;
    
    &.is-active {
      font-weight: bold;
    }
  }
  
  .wd-tabs__line {
    background-color: #1989fa;
    border-radius: 2px;
  }
}
</style>
```

## 注意事项

1. wd-tabs组件必须与wd-tab组件配合使用
2. 每个wd-tab组件必须设置title属性，用于显示标签标题
3. 建议为每个wd-tab组件设置唯一的name属性，用于标识不同的标签
4. 粘性布局(sticky)需要在父容器中正确设置，确保有足够的滚动空间
5. 手势滑动(swipeable)功能在移动端效果更好，在PC端可能体验不佳
6. 标签数量较多时，建议启用导航地图(mapNum)功能，提升用户体验
7. 自定义底部条宽度(lineWidth)时，建议同时设置合适的lineHeight
8. 颜色(color)和非活动颜色(inactiveColor)建议一起设置，保持视觉一致性
9. 动画(animated)效果会增加性能消耗，在低端设备上可能影响流畅度
10. 懒加载(lazy)功能默认开启，切换到该标签时才会加载内容，提升初始加载性能
11. 禁用的标签(disabled)无法点击，但仍会显示在标签列表中
12. 标签的name属性支持数字或字符串类型，但建议保持一致类型
