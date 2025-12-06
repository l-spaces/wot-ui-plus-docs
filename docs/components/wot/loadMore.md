# LoadMore 加载更多

<demo-model url="/subPages/loadMore/Index"></demo-model>

## 组件概况

### 组件概述
加载更多组件是一个用于列表底部的加载状态指示器，支持多种状态切换，提供了加载中、加载失败和加载完成三种状态的展示，可自定义提示文本和加载动画。

### 详细功能描述
- 支持三种加载状态：loading（加载中）、error（加载失败）、finished（加载完成）
- 可自定义各状态的提示文本
- 支持自定义加载动画属性
- 加载失败时支持点击重试
- 内置国际化支持
- 支持自定义样式

### 适用业务场景
- 列表分页加载场景
- 滚动到底部自动加载更多数据
- 下拉刷新配合上拉加载的列表
- 任何需要展示加载状态的列表底部

## 完整API参考

### Props

| 名称 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| state | 'loading' \| 'error' \| 'finished' | - | 否 | 加载状态 |
| loadingText | string | - | 否 | 加载中提示文案 |
| finishedText | string | - | 否 | 全部加载完的提示文案 |
| errorText | string | - | 否 | 加载失败的提示文案 |
| loadingProps | object | - | 否 | 加载中loading组件的属性，参考loading组件 |
| customStyle | string | - | 否 | 自定义样式 |
| customClass | string | - | 否 | 自定义类名 |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| reload | 加载失败状态下点击组件时 | - |

### Methods

无

### Slots

无

## 多场景使用示例

### 基础用法

```vue
<template>
  <view>
    <view v-for="item in list" :key="item.id" class="list-item">
      {{ item.content }}
    </view>
    <wd-loadmore 
      :state="loadmoreState" 
      @reload="onReload"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const list = ref([])
const loadmoreState = ref('loading')

// 模拟加载数据
const loadData = () => {
  // 模拟网络请求
  setTimeout(() => {
    // 模拟加载完成
    loadmoreState.value = 'finished'
  }, 1000)
}

// 加载失败时重试
const onReload = () => {
  loadmoreState.value = 'loading'
  loadData()
}

// 初始加载
loadData()
</script>

<style scoped>
.list-item {
  padding: 20rpx;
  border-bottom: 1rpx solid #f0f0f0;
}
</style>
```

### 自定义提示文本

```vue
<template>
  <view>
    <view v-for="item in list" :key="item.id" class="list-item">
      {{ item.content }}
    </view>
    <wd-loadmore 
      :state="loadmoreState" 
      loading-text="正在加载更多..."
      finished-text="没有更多数据了"
      error-text="加载失败"
      @reload="onReload"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const list = ref([])
const loadmoreState = ref('loading')

// 模拟加载数据
const loadData = () => {
  setTimeout(() => {
    loadmoreState.value = 'finished'
  }, 1000)
}

const onReload = () => {
  loadmoreState.value = 'loading'
  loadData()
}

loadData()
</script>
```

### 自定义加载动画

```vue
<template>
  <view>
    <view v-for="item in list" :key="item.id" class="list-item">
      {{ item.content }}
    </view>
    <wd-loadmore 
      :state="loadmoreState" 
      :loading-props="{ type: 'outline', color: '#1890FF', size: '20' }"
      @reload="onReload"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const list = ref([])
const loadmoreState = ref('loading')

const loadData = () => {
  setTimeout(() => {
    loadmoreState.value = 'finished'
  }, 1000)
}

const onReload = () => {
  loadmoreState.value = 'loading'
  loadData()
}

loadData()
</script>
```

### 结合下拉刷新使用

```vue
<template>
  <scroll-view 
    class="scroll-view" 
    scroll-y 
    @scrolltolower="onScrollToLower"
    @refresherrefresh="onRefresh"
    :refresher-enabled="true"
    :refresher-threshold="90"
    :refresher-triggered="refreshing"
  >
    <view v-for="item in list" :key="item.id" class="list-item">
      {{ item.content }}
    </view>
    <wd-loadmore 
      :state="loadmoreState" 
      @reload="onReload"
    />
  </scroll-view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const list = ref([])
const loadmoreState = ref('loading')
const refreshing = ref(false)

// 模拟加载数据
const loadData = (isRefresh = false) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (isRefresh) {
        list.value = Array.from({ length: 10 }, (_, i) => ({
          id: i,
          content: `刷新后的数据 ${i + 1}`
        }))
      } else {
        const newData = Array.from({ length: 10 }, (_, i) => ({
          id: list.value.length + i,
          content: `加载更多的数据 ${list.value.length + i + 1}`
        }))
        list.value = [...list.value, ...newData]
      }
      resolve(true)
    }, 1000)
  })
}

// 滚动到底部加载更多
const onScrollToLower = () => {
  if (loadmoreState.value === 'loading' || loadmoreState.value === 'finished') {
    return
  }
  loadmoreState.value = 'loading'
  loadData().then(() => {
    loadmoreState.value = list.value.length >= 30 ? 'finished' : ''
  }).catch(() => {
    loadmoreState.value = 'error'
  })
}

// 下拉刷新
const onRefresh = () => {
  refreshing.value = true
  loadmoreState.value = ''
  loadData(true).then(() => {
    refreshing.value = false
  }).catch(() => {
    refreshing.value = false
  })
}

// 加载失败重试
const onReload = () => {
  loadmoreState.value = 'loading'
  loadData().then(() => {
    loadmoreState.value = list.value.length >= 30 ? 'finished' : ''
  }).catch(() => {
    loadmoreState.value = 'error'
  })
}

// 初始加载
loadData().then(() => {
  loadmoreState.value = ''
})
</script>

<style scoped>
.scroll-view {
  height: 100vh;
}

.list-item {
  padding: 20rpx;
  border-bottom: 1rpx solid #f0f0f0;
}
</style>
```

### 不同状态展示

```vue
<template>
  <view class="demo-container">
    <view class="demo-item">
      <text class="demo-title">loading状态</text>
      <wd-loadmore state="loading" />
    </view>
    <view class="demo-item">
      <text class="demo-title">error状态</text>
      <wd-loadmore state="error" @reload="onReload" />
    </view>
    <view class="demo-item">
      <text class="demo-title">finished状态</text>
      <wd-loadmore state="finished" />
    </view>
  </view>
</template>

<script lang="ts" setup>
const onReload = () => {
  console.log('重新加载')
}
</script>

<style scoped>
.demo-container {
  padding: 20rpx;
}

.demo-item {
  margin-bottom: 40rpx;
  padding: 20rpx;
  background: #f5f5f5;
  border-radius: 10rpx;
}

.demo-title {
  display: block;
  margin-bottom: 20rpx;
  font-size: 28rpx;
  font-weight: bold;
}
</style>
```

## 样式定制指南

### 自定义样式

通过 `customStyle` 属性可以自定义加载更多组件的样式：

```vue
<wd-loadmore 
  :state="loadmoreState" 
  :custom-style="{ padding: '30rpx 0', color: '#666' }"
  @reload="onReload"
/>
```

### 自定义类名

通过 `customClass` 属性可以添加自定义类名，然后在样式文件中定义样式：

```vue
<wd-loadmore 
  :state="loadmoreState" 
  custom-class="my-loadmore"
  @reload="onReload"
/>
```

```scss
.my-loadmore {
  /* 自定义加载更多组件样式 */
  padding: 30rpx 0;
  color: #666;
  
  .wd-loadmore__text {
    /* 自定义文本样式 */
    font-size: 26rpx;
  }
  
  .wd-loadmore__refresh {
    /* 自定义刷新图标样式 */
    margin-left: 10rpx;
  }
}
```

## 注意事项

1. 状态管理：
   - 通过 `state` 属性控制组件的显示状态
   - 支持三种状态：`loading`（加载中）、`error`（加载失败）、`finished`（加载完成）
   - 当 `state` 为空字符串时，组件不会显示

2. 事件处理：
   - 只有在 `state` 为 `error` 时，点击组件才会触发 `reload` 事件
   - 可在 `reload` 事件回调中实现重新加载逻辑

3. 自定义加载动画：
   - 通过 `loadingProps` 属性可以自定义加载动画的样式
   - `loadingProps` 支持所有 `wd-loading` 组件的属性
   - 可自定义加载动画的类型、颜色、大小等

4. 国际化支持：
   - 组件内置了国际化支持，默认提示文本会根据当前语言环境自动切换
   - 可通过 `loadingText`、`finishedText`、`errorText` 属性自定义提示文本

5. 性能优化：
   - 当列表数据全部加载完成后，建议将 `state` 设置为 `finished`，避免不必要的渲染
   - 在滚动到底部加载更多时，需添加状态判断，避免重复触发加载
   - 结合下拉刷新使用时，需注意状态的同步管理

6. 样式定制：
   - 可通过 `customStyle` 和 `customClass` 属性自定义组件样式
   - 组件默认样式简洁，便于与各种设计风格适配
   - 建议根据项目设计规范调整组件样式，保持视觉一致性