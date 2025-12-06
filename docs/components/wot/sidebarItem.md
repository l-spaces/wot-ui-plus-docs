# Sidebar Item 侧边栏子项
<demo-model url="/subPages/sidebarItem/Index"></demo-model>

## 组件概况

### 组件概述
Sidebar Item组件是侧边栏的子项组件，用于配合Sidebar组件实现侧边导航功能。它支持图标、标题、徽标等功能，并能自动与父组件交互，实现选中状态管理。

### 详细功能描述
- 支持设置选项标题和唯一值
- 支持图标显示，可使用内置图标或自定义图标
- 支持徽标显示，包括数字徽标和点状徽标
- 支持徽标最大值限制
- 支持禁用状态
- 自动与父组件Sidebar交互，实现选中状态管理
- 支持自定义样式和类名
- 支持多端适配

### 适用业务场景
- 侧边导航菜单
- 分类选择器
- 步骤指示器
- 垂直选项卡

## 完整API参考

### Props
| 参数 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| label | string | - | 是 | 当前选项标题 |
| value | string / number | - | 是 | 当前选项的值，唯一标识 |
| badge | string / number / null | null | 否 | 徽标显示值 |
| badgeProps | object | - | 否 | 徽标属性，透传给 Badge 组件 |
| icon | string | - | 否 | 图标名称 |
| isDot | boolean | undefined | 否 | 是否点状徽标 |
| max | number | 99 | 否 | 徽标最大值 |
| disabled | boolean | false | 否 | 是否禁用 |
| customClass | string | - | 否 | 自定义类名 |
| customStyle | object | - | 否 | 自定义样式，对象形式 |

### Events
无直接事件，通过父组件Sidebar的change事件触发

### Methods
无

### Slots
| 插槽名 | 作用域变量 | 说明 |
|--------|------------|------|
| icon | - | 自定义图标插槽，用于替换默认图标 |

## 多场景使用示例

### 基础用法
```vue
<template>
  <view>
    <wd-sidebar v-model="activeKey" @change="handleChange">
      <wd-sidebar-item label="选项1" value="1"></wd-sidebar-item>
      <wd-sidebar-item label="选项2" value="2"></wd-sidebar-item>
      <wd-sidebar-item label="选项3" value="3"></wd-sidebar-item>
    </wd-sidebar>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeKey = ref('1')

const handleChange = (event: any) => {
  console.log('选中项:', event.value, event.label)
}
</script>
```

### 带图标
```vue
<template>
  <view>
    <wd-sidebar v-model="activeKey">
      <wd-sidebar-item label="首页" value="home" icon="home"></wd-sidebar-item>
      <wd-sidebar-item label="分类" value="category" icon="category"></wd-sidebar-item>
      <wd-sidebar-item label="购物车" value="cart" icon="cart"></wd-sidebar-item>
      <wd-sidebar-item label="我的" value="user" icon="user"></wd-sidebar-item>
    </wd-sidebar>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeKey = ref('home')
</script>
```

### 带徽标
```vue
<template>
  <view>
    <wd-sidebar v-model="activeKey">
      <wd-sidebar-item label="首页" value="home" icon="home"></wd-sidebar-item>
      <wd-sidebar-item label="消息" value="message" icon="chat" badge="5"></wd-sidebar-item>
      <wd-sidebar-item label="通知" value="notification" icon="bell" is-dot></wd-sidebar-item>
      <wd-sidebar-item label="购物车" value="cart" icon="cart" badge="99+"></wd-sidebar-item>
    </wd-sidebar>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeKey = ref('home')
</script>
```

### 禁用状态
```vue
<template>
  <view>
    <wd-sidebar v-model="activeKey">
      <wd-sidebar-item label="启用项" value="1" icon="home"></wd-sidebar-item>
      <wd-sidebar-item label="禁用项" value="2" icon="lock" disabled></wd-sidebar-item>
      <wd-sidebar-item label="启用项" value="3" icon="user"></wd-sidebar-item>
    </wd-sidebar>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeKey = ref('1')
</script>
```

### 自定义图标插槽
```vue
<template>
  <view>
    <wd-sidebar v-model="activeKey">
      <wd-sidebar-item label="首页" value="home">
        <template #icon>
          <view class="custom-icon">🏠</view>
        </template>
      </wd-sidebar-item>
      <wd-sidebar-item label="分类" value="category">
        <template #icon>
          <view class="custom-icon">📁</view>
        </template>
      </wd-sidebar-item>
      <wd-sidebar-item label="购物车" value="cart">
        <template #icon>
          <view class="custom-icon">🛒</view>
        </template>
      </wd-sidebar-item>
    </wd-sidebar>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeKey = ref('home')
</script>

<style scoped>
.custom-icon {
  font-size: 24px;
}
</style>
```

## 样式定制指南

### 自定义类名
通过`customClass`属性可以为Sidebar Item组件添加自定义类名，用于覆盖默认样式。

```vue
<wd-sidebar-item custom-class="my-sidebar-item">
  <!-- 内容 -->
</wd-sidebar-item>

<style>
.my-sidebar-item {
  /* 自定义样式 */
  background-color: #f5f7fa;
  font-weight: bold;
}
</style>
```

### 自定义样式对象
通过`customStyle`属性可以直接设置组件的内联样式。

```vue
<wd-sidebar-item :custom-style="{ backgroundColor: '#f5f7fa', fontWeight: 'bold' }">
  <!-- 内容 -->
</wd-sidebar-item>
```

### 自定义徽标样式
通过`badgeProps`属性可以自定义徽标的样式，该属性会透传给Badge组件。

```vue
<wd-sidebar-item 
  label="消息" 
  value="message" 
  icon="chat" 
  badge="5"
  :badge-props="{ color: '#ff4d4f', fontSize: '10px' }"
>
</wd-sidebar-item>
```

## 注意事项

1. **必须与Sidebar组件配合使用**：Sidebar Item组件不能单独使用，必须作为Sidebar组件的子组件使用。

2. **必填属性**：`label`和`value`是必填属性，必须为每个Sidebar Item组件设置。

3. **徽标功能依赖**：徽标功能依赖于wd-badge组件，确保该组件已正确引入。

4. **图标功能依赖**：图标功能依赖于wd-icon组件，确保该组件已正确引入。

5. **选中状态管理**：Sidebar Item组件的选中状态由父组件Sidebar统一管理，通过`v-model`双向绑定。

6. **禁用状态**：设置`disabled`为`true`时，选项不可点击，且会显示禁用样式。

7. **多端适配**：组件在不同平台上可能存在细微的样式差异，建议在实际使用中进行测试。

8. **事件处理**：Sidebar Item组件本身不触发事件，点击事件由父组件Sidebar统一处理，通过`change`事件通知选中状态变化。

9. **徽标最大值**：徽标默认最大值为99，超过最大值时会显示"99+"，可通过`max`属性自定义最大值。

10. **点状徽标**：设置`isDot`为`true`时，会显示点状徽标，不显示具体数字。

## 常见问题

1. **Q: 为什么Sidebar Item组件没有选中效果？**
   A: 请确保Sidebar Item组件已正确嵌套在Sidebar组件中，且父组件Sidebar的`v-model`值与Sidebar Item的`value`值匹配。

2. **Q: 如何修改Sidebar Item的选中样式？**
   A: 可以通过CSS选择器`.wd-sidebar-item--active`来修改选中状态的样式。

3. **Q: 为什么徽标不显示？**
   A: 请检查是否已正确设置`badge`属性，且徽标值不为`null`或`undefined`。

4. **Q: 如何自定义图标的大小和颜色？**
   A: 可以通过修改`.wd-sidebar-item__icon`类的样式来调整图标大小和颜色，或使用自定义图标插槽完全控制图标样式。

5. **Q: 如何禁用某个Sidebar Item？**
   A: 通过设置`disabled`属性为`true`即可禁用该选项，禁用后选项不可点击。

6. **Q: 为什么自定义徽标样式不生效？**
   A: 请确保`badgeProps`属性是一个对象，且包含有效的Badge组件属性。

7. **Q: 如何在点击Sidebar Item时执行自定义逻辑？**
   A: 可以监听父组件Sidebar的`change`事件，在事件处理函数中执行自定义逻辑。

8. **Q: 支持哪些图标？**
   A: 支持wd-icon组件提供的所有内置图标，也可以通过自定义图标插槽使用自定义图标。