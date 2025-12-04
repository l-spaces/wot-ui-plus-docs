# 最佳实践建议

##  性能优化策略

### 1 组件懒加载

对于大型组件或不常用的组件，可以使用懒加载方式导入，减少初始加载时间。

```vue
<template>
  <view>
    <component :is="lazyComponent" />
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const lazyComponent = ref(null)

onMounted(async () => {
  // 异步加载组件
  const module = await import('@/uni_modules/wot-ui-plus/components/wd-calendar/wd-calendar.vue')
  lazyComponent.value = module.default
})
</script>
```

### 2 避免不必要的渲染

1. 使用 `v-show` 代替 `v-if` 频繁切换的组件
2. 使用 `computed` 缓存计算结果
3. 使用 `shallowRef` 或 `shallowReactive` 减少响应式开销
4. 使用 `v-memo` 优化列表渲染

```vue
<template>
  <view>
    <!-- 使用 v-memo 优化列表渲染 -->
    <view v-for="item in list" :key="item.id" v-memo="[item.id, item.name]">
      {{ item.name }}
    </view>
  </view>
</template>
```

### 3 大型列表优化

对于大型列表，建议使用虚拟列表组件，只渲染可见区域的内容，减少 DOM 节点数量。

```vue
<template>
  <view>
    <wd-waterfall :list="largeList" :columns="2">
      <template #item="{ item }">
        <view class="waterfall-item">{{ item.name }}</view>
      </template>
    </wd-waterfall>
  </view>
</template>
```

## 样式规范指南

### 1 命名规范

1. 组件类名使用 BEM 规范：`组件名__元素名--修饰符`
2. 自定义类名使用 kebab-case 格式
3. 避免使用与组件库冲突的类名

### 2 样式覆盖方法

1. 使用 CSS 变量覆盖主题样式
2. 使用深度选择器 `::v-deep` 或 `:deep()` 覆盖组件样式
3. 避免使用 `!important`，尽量通过优先级覆盖

```scss
/* 正确的样式覆盖方式 */
.my-button {
  :deep(.wd-button__content) {
    font-size: 16px;
    color: #007aff;
  }
}
```

### 3 scoped 样式处理

1. 组件样式推荐使用 `scoped` 属性，避免样式污染
2. 全局样式放在单独的文件中
3. 使用 `:global()` 定义全局样式

```scss
/* 组件样式 */
<style scoped>
.my-component {
  color: #333;
}

:global(.global-class) {
  font-size: 14px;
}
</style>
```

## 组件组合使用模式

### 1 表单组件组合

```vue
<template>
  <wd-form @submit="onSubmit">
    <wd-form-item label="用户名" prop="username">
      <wd-input v-model="form.username" placeholder="请输入用户名" />
    </wd-form-item>
    <wd-form-item label="密码" prop="password">
      <wd-input v-model="form.password" type="password" placeholder="请输入密码" />
    </wd-form-item>
    <wd-form-item>
      <wd-button type="primary" native-type="submit">提交</wd-button>
    </wd-form-item>
  </wd-form>
</template>
```

### 2 列表组件组合

```vue
<template>
  <view>
    <wd-list>
      <wd-list-item v-for="item in list" :key="item.id">
        <template #title>{{ item.title }}</template>
        <template #right-icon>
          <wd-icon name="arrow-right" />
        </template>
      </wd-list-item>
    </wd-list>
  </view>
</template>
```

## 兼容性处理方案

### 浏览器兼容性

1. 使用 uni-app 提供的跨端 API，避免使用浏览器特定 API
2. 对于 H5 平台，设置合适的浏览器兼容目标
3. 使用 polyfill 兼容旧浏览器

### 设备适配技巧

1. 使用 `rpx` 单位进行响应式布局
2. 使用媒体查询适配不同屏幕尺寸
3. 考虑刘海屏、水滴屏等特殊屏幕的适配
4. 测试不同设备的显示效果
