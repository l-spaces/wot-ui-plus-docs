# Tabbar 标签栏
<demo-model url="/subPages/tabbar/Index"></demo-model>

## 组件概况

### 组件概述
Tabbar 标签栏是一个底部导航组件，用于在应用的不同页面或功能模块之间进行快速切换。它支持固定定位、安全区域适配、自定义形状和样式，是移动应用中常见的导航解决方案。

### 详细功能描述
- 支持固定在底部显示，可配置占位元素避免内容被遮挡
- 支持 iPhone X 等机型的底部安全区域适配
- 可配置顶部边框显示
- 支持默认和圆形两种形状样式
- 可自定义激活和未激活状态的颜色
- 支持设置组件层级
- 支持自定义样式和类名

### 适用业务场景
- 应用底部主导航栏
- 多模块功能切换
- 需要固定在底部的导航菜单

## 完整API参考

### Props属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| modelValue | number / string | 0 | 否 | 选中标签的索引值或者名称 |
| fixed | boolean | false | 否 | 是否固定在底部 |
| safeAreaInsetBottom | boolean | false | 否 | 是否设置底部安全距离（iPhone X 类型的机型） |
| bordered | boolean | true | 否 | 是否显示顶部边框 |
| shape | 'default' / 'round' | 'default' | 否 | 标签栏的形状 |
| activeColor | string | - | 否 | 激活标签的颜色 |
| inactiveColor | string | - | 否 | 未激活标签的颜色 |
| placeholder | boolean | false | 否 | 固定在底部时，是否在标签位置生成一个等高的占位元素 |
| zIndex | number | 99 | 否 | 自定义组件的层级 |
| customStyle | string / object | - | 否 | 自定义样式 |
| customClass | string | - | 否 | 自定义类名 |

### Events事件

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| change | 标签切换时触发 | { value: number / string } - 切换后的标签索引值或名称 |
| update:modelValue | 标签切换时触发 | number / string - 切换后的标签索引值或名称 |

### Methods方法

该组件没有对外暴露的方法。

### Slots插槽

| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| default | - | 用于放置 TabbarItem 组件 |

## 多场景使用示例代码

### 1. 基础用法
```vue
<template>
  <wd-tabbar v-model="active">
    <wd-tabbar-item title="首页" icon="home" name="home"></wd-tabbar-item>
    <wd-tabbar-item title="分类" icon="category" name="category"></wd-tabbar-item>
    <wd-tabbar-item title="购物车" icon="cart" name="cart"></wd-tabbar-item>
    <wd-tabbar-item title="我的" icon="user" name="user"></wd-tabbar-item>
  </wd-tabbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref('home')
</script>
```

### 2. 固定在底部并带占位元素
```vue
<template>
  <wd-tabbar v-model="active" fixed placeholder>
    <wd-tabbar-item title="首页" icon="home" name="home"></wd-tabbar-item>
    <wd-tabbar-item title="分类" icon="category" name="category"></wd-tabbar-item>
    <wd-tabbar-item title="购物车" icon="cart" name="cart"></wd-tabbar-item>
    <wd-tabbar-item title="我的" icon="user" name="user"></wd-tabbar-item>
  </wd-tabbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref('home')
</script>
```

### 3. 圆形形状样式
```vue
<template>
  <wd-tabbar v-model="active" fixed shape="round" safe-area-inset-bottom>
    <wd-tabbar-item title="首页" icon="home" name="home"></wd-tabbar-item>
    <wd-tabbar-item title="分类" icon="category" name="category"></wd-tabbar-item>
    <wd-tabbar-item title="购物车" icon="cart" name="cart"></wd-tabbar-item>
    <wd-tabbar-item title="我的" icon="user" name="user"></wd-tabbar-item>
  </wd-tabbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref('home')
</script>
```

### 4. 自定义激活颜色
```vue
<template>
  <wd-tabbar v-model="active" active-color="#1989fa" inactive-color="#969799">
    <wd-tabbar-item title="首页" icon="home" name="home"></wd-tabbar-item>
    <wd-tabbar-item title="分类" icon="category" name="category"></wd-tabbar-item>
    <wd-tabbar-item title="购物车" icon="cart" name="cart"></wd-tabbar-item>
    <wd-tabbar-item title="我的" icon="user" name="user"></wd-tabbar-item>
  </wd-tabbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref('home')
</script>
```

### 5. 监听标签切换事件
```vue
<template>
  <wd-tabbar v-model="active" @change="handleChange">
    <wd-tabbar-item title="首页" icon="home" name="home"></wd-tabbar-item>
    <wd-tabbar-item title="分类" icon="category" name="category"></wd-tabbar-item>
    <wd-tabbar-item title="购物车" icon="cart" name="cart"></wd-tabbar-item>
    <wd-tabbar-item title="我的" icon="user" name="user"></wd-tabbar-item>
  </wd-tabbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref('home')

const handleChange = (event: { value: string }) => {
  console.log('Tab changed to:', event.value)
}
</script>
```

## 三、样式定制指南

### customStyle 用法
```vue
<template>
  <wd-tabbar 
    v-model="active" 
    :custom-style="{ backgroundColor: '#f0f0f0', height: '60px' }"
  >
    <wd-tabbar-item title="首页" icon="home" name="home"></wd-tabbar-item>
    <wd-tabbar-item title="分类" icon="category" name="category"></wd-tabbar-item>
    <wd-tabbar-item title="购物车" icon="cart" name="cart"></wd-tabbar-item>
    <wd-tabbar-item title="我的" icon="user" name="user"></wd-tabbar-item>
  </wd-tabbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref('home')
</script>
```

### customClass 用法
```vue
<template>
  <wd-tabbar v-model="active" custom-class="my-tabbar">
    <wd-tabbar-item title="首页" icon="home" name="home"></wd-tabbar-item>
    <wd-tabbar-item title="分类" icon="category" name="category"></wd-tabbar-item>
    <wd-tabbar-item title="购物车" icon="cart" name="cart"></wd-tabbar-item>
    <wd-tabbar-item title="我的" icon="user" name="user"></wd-tabbar-item>
  </wd-tabbar>
</template>

<style lang="scss">
.my-tabbar {
  background-color: #f0f0f0;
  height: 60px;
}
</style>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref('home')
</script>
```

## 五、注意事项

1. Tabbar 组件必须包含 TabbarItem 子组件才能正常工作
2. 使用 `fixed` 属性时，建议同时设置 `placeholder` 属性，避免内容被遮挡
3. 在 iPhone X 等机型上，建议设置 `safeAreaInsetBottom` 属性以适配底部安全区域
4. 当使用 `shape="round"` 时，建议结合 `safeAreaInsetBottom` 使用，以获得更好的视觉效果
5. TabbarItem 的 `name` 属性用于标识不同的标签页，建议使用字符串或数字类型
6. 组件默认层级为 99，如需调整可通过 `zIndex` 属性设置
7. 激活状态颜色会同时作用于图标和文字
