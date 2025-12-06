# TabbarItem 标签栏项
<demo-model url="/subPages/tabbarItem/Index"></demo-model>

## 组件概况

### 组件概述
TabbarItem 是 Tabbar 组件的子组件，用于定义标签栏中的单个标签项。它支持图标、文字、徽标等多种元素组合，可灵活配置标签样式和行为。

### 详细功能描述
- 支持设置标签标题和图标
- 集成徽标功能，支持数字徽标和点状徽标
- 支持自定义徽标最大值
- 可通过插槽自定义图标内容
- 自动响应父组件 Tabbar 的激活状态
- 支持自定义样式和类名

### 适用业务场景
- 与 Tabbar 组件配合使用，构建应用底部导航
- 用于多模块功能切换的标签项
- 需要显示徽标的导航菜单

## 完整API参考

### Props属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| title | string | - | 否 | 标签页的标题 |
| name | number / string | - | 否 | 唯一标识符，用于区分不同标签页 |
| icon | string | - | 否 | 图标名称 |
| value | number / string / null | null | 否 | 徽标显示值 |
| isDot | boolean | undefined | 否 | 是否显示点状徽标 |
| max | number | 99 | 否 | 徽标最大值，超过最大值会显示 `${max}+` |
| badgeProps | object | - | 否 | 徽标属性，透传给 Badge 组件 |
| customStyle | string / object | - | 否 | 自定义样式 |
| customClass | string | - | 否 | 自定义类名 |

### Events事件

该组件没有定义任何事件。

### Methods方法

该组件没有对外暴露的方法。

### Slots插槽

| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| icon | { active: boolean } | 自定义图标，active 表示当前标签是否激活 |

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

### 2. 带数字徽标的标签
```vue
<template>
  <wd-tabbar v-model="active">
    <wd-tabbar-item title="首页" icon="home" name="home"></wd-tabbar-item>
    <wd-tabbar-item title="分类" icon="category" name="category" :value="5"></wd-tabbar-item>
    <wd-tabbar-item title="购物车" icon="cart" name="cart" :value="12"></wd-tabbar-item>
    <wd-tabbar-item title="我的" icon="user" name="user"></wd-tabbar-item>
  </wd-tabbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref('home')
</script>
```

### 3. 带点状徽标的标签
```vue
<template>
  <wd-tabbar v-model="active">
    <wd-tabbar-item title="首页" icon="home" name="home"></wd-tabbar-item>
    <wd-tabbar-item title="分类" icon="category" name="category" :is-dot="true"></wd-tabbar-item>
    <wd-tabbar-item title="购物车" icon="cart" name="cart"></wd-tabbar-item>
    <wd-tabbar-item title="我的" icon="user" name="user" :is-dot="true"></wd-tabbar-item>
  </wd-tabbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref('home')
</script>
```

### 4. 自定义徽标最大值
```vue
<template>
  <wd-tabbar v-model="active">
    <wd-tabbar-item title="首页" icon="home" name="home"></wd-tabbar-item>
    <wd-tabbar-item title="消息" icon="message" name="message" :value="120" :max="200"></wd-tabbar-item>
    <wd-tabbar-item title="购物车" icon="cart" name="cart" :value="250" :max="100"></wd-tabbar-item>
    <wd-tabbar-item title="我的" icon="user" name="user"></wd-tabbar-item>
  </wd-tabbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref('home')
</script>
```

### 5. 自定义图标插槽
```vue
<template>
  <wd-tabbar v-model="active">
    <wd-tabbar-item title="首页" name="home">
      <template #icon="{ active }">
        <view class="custom-icon" :class="{ active }">
          <wd-icon name="home" :size="20"></wd-icon>
        </view>
      </template>
    </wd-tabbar-item>
    <wd-tabbar-item title="分类" name="category">
      <template #icon="{ active }">
        <view class="custom-icon" :class="{ active }">
          <wd-icon name="category" :size="20"></wd-icon>
        </view>
      </template>
    </wd-tabbar-item>
    <wd-tabbar-item title="购物车" name="cart">
      <template #icon="{ active }">
        <view class="custom-icon" :class="{ active }">
          <wd-icon name="cart" :size="20"></wd-icon>
        </view>
      </template>
    </wd-tabbar-item>
    <wd-tabbar-item title="我的" name="user">
      <template #icon="{ active }">
        <view class="custom-icon" :class="{ active }">
          <wd-icon name="user" :size="20"></wd-icon>
        </view>
      </template>
    </wd-tabbar-item>
  </wd-tabbar>
</template>

<style scoped>
.custom-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40rpx;
  height: 40rpx;
  color: #969799;
}

.custom-icon.active {
  color: #1989fa;
  background-color: rgba(25, 137, 250, 0.1);
  border-radius: 50%;
}
</style>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref('home')
</script>
```

## 三、样式定制指南

### customStyle 用法
```vue
<template>
  <wd-tabbar v-model="active">
    <wd-tabbar-item 
      title="首页" 
      icon="home" 
      name="home"
      :custom-style="{ color: '#666', fontSize: '28rpx' }"
    ></wd-tabbar-item>
    <wd-tabbar-item 
      title="分类" 
      icon="category" 
      name="category"
      :custom-style="{ color: '#666', fontSize: '28rpx' }"
    ></wd-tabbar-item>
    <wd-tabbar-item 
      title="购物车" 
      icon="cart" 
      name="cart"
      :custom-style="{ color: '#666', fontSize: '28rpx' }"
    ></wd-tabbar-item>
    <wd-tabbar-item 
      title="我的" 
      icon="user" 
      name="user"
      :custom-style="{ color: '#666', fontSize: '28rpx' }"
    ></wd-tabbar-item>
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
  <wd-tabbar v-model="active">
    <wd-tabbar-item title="首页" icon="home" name="home" custom-class="my-tabbar-item"></wd-tabbar-item>
    <wd-tabbar-item title="分类" icon="category" name="category" custom-class="my-tabbar-item"></wd-tabbar-item>
    <wd-tabbar-item title="购物车" icon="cart" name="cart" custom-class="my-tabbar-item"></wd-tabbar-item>
    <wd-tabbar-item title="我的" icon="user" name="user" custom-class="my-tabbar-item"></wd-tabbar-item>
  </wd-tabbar>
</template>

<style lang="scss">
.my-tabbar-item {
  .wd-tabbar-item__body-title {
    font-size: 28rpx;
    color: #666;
  }
  
  .wd-tabbar-item__body-icon {
    font-size: 44rpx;
  }
}
</style>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref('home')
</script>
```

## 五、注意事项

1. TabbarItem 组件必须作为 Tabbar 组件的子组件使用
2. 当未设置 `name` 属性时，组件会使用其在 Tabbar 中的索引作为默认值
3. `value` 属性为 `null` 或 `undefined` 时，徽标不会显示
4. `isDot` 属性优先级高于 `value` 属性，当 `isDot` 为 `true` 时，会显示点状徽标，忽略 `value` 属性
5. 徽标默认最大值为 99，可通过 `max` 属性自定义
6. 使用自定义图标插槽时，会覆盖 `icon` 属性设置
7. 激活状态的颜色由父组件 Tabbar 的 `activeColor` 和 `inactiveColor` 属性控制
8. 组件会自动响应父组件 Tabbar 的 `modelValue` 变化，无需手动设置激活状态
