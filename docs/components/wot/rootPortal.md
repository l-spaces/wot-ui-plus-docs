# Root Portal
<demo-model url="/subPages/rootPortal/Index"></demo-model>

## 组件概况

### 组件概述
Root Portal组件是一个跨平台的内容传送门组件，用于将组件的子内容渲染到应用的根节点上，解决了在复杂组件嵌套场景下的层级溢出和样式隔离问题。

### 详细功能描述
- 支持多端适配：H5、微信小程序、支付宝小程序、App Plus
- 自动根据平台选择最佳实现方案
- 保持子组件的原有功能和样式
- 解决组件嵌套导致的层级问题
- 支持动态内容更新

### 适用业务场景
- 弹出层、模态框等需要覆盖整个应用的组件
- 下拉菜单、气泡提示等需要突破父容器层级限制的组件
- 复杂表单中的动态弹窗
- 需要在应用全局层级显示的通知和提示

## 完整API参考

### Props
| 参数 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| customClass | string | - | 否 | 自定义类名 |
| customStyle | object | - | 否 | 自定义样式，对象形式 |

### Events
无

### Methods
无

### Slots
| 插槽名 | 作用域变量 | 说明 |
|--------|------------|------|
| default | - | 默认插槽，用于放置需要传送的内容 |

## 多场景使用示例

### 基础用法
```vue
<template>
  <view>
    <wd-root-portal>
      <!-- 这里的内容会被渲染到应用根节点 -->
      <view class="overlay">
        <text>这是一个覆盖在根节点的内容</text>
      </view>
    </wd-root-portal>
  </view>
</template>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
</style>
```

### 结合弹出层使用
```vue
<template>
  <view>
    <wd-button type="primary" @click="showPopup = true">显示弹出层</wd-button>
    
    <wd-root-portal>
      <wd-popup v-model:visible="showPopup" position="center">
        <view class="popup-content">
          <text class="title">弹出层标题</text>
          <text class="desc">这是一个使用root-portal渲染的弹出层</text>
          <wd-button type="primary" @click="showPopup = false" style="margin-top: 20px;">关闭</wd-button>
        </view>
      </wd-popup>
    </wd-root-portal>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showPopup = ref(false)
</script>

<style scoped>
.popup-content {
  padding: 30px;
  text-align: center;
}

.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  display: block;
}

.desc {
  font-size: 14px;
  color: #666;
  display: block;
}
</style>
```

### 结合下拉菜单使用
```vue
<template>
  <view>
    <wd-button type="primary" @click="showMenu = !showMenu">切换菜单</wd-button>
    
    <wd-root-portal>
      <view v-if="showMenu" class="dropdown-menu">
        <view class="menu-item" @click="handleMenuItemClick('item1')">菜单选项1</view>
        <view class="menu-item" @click="handleMenuItemClick('item2')">菜单选项2</view>
        <view class="menu-item" @click="handleMenuItemClick('item3')">菜单选项3</view>
      </view>
    </wd-root-portal>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showMenu = ref(false)

const handleMenuItemClick = (item: string) => {
  console.log('点击了菜单选项:', item)
  showMenu.value = false
}
</script>

<style scoped>
.dropdown-menu {
  position: fixed;
  top: 100px;
  left: 50px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 8px 0;
  min-width: 150px;
}

.menu-item {
  padding: 12px 20px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  transition: all 0.3s;
}

.menu-item:hover {
  background-color: #f5f7fa;
  color: #409eff;
}
</style>
```

### 结合动态内容使用
```vue
<template>
  <view>
    <wd-button type="primary" @click="addItem">添加项目</wd-button>
    
    <wd-root-portal>
      <view class="dynamic-list">
        <view v-for="(item, index) in items" :key="index" class="list-item">
          <text>{{ item }}</text>
          <wd-button size="mini" type="danger" @click="removeItem(index)">删除</wd-button>
        </view>
      </view>
    </wd-root-portal>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const items = ref(['项目1', '项目2', '项目3'])

const addItem = () => {
  items.value.push(`项目${items.value.length + 1}`)
}

const removeItem = (index: number) => {
  items.value.splice(index, 1)
}
</script>

<style scoped>
.dynamic-list {
  position: fixed;
  top: 100px;
  right: 50px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 10px;
  max-width: 200px;
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid #ebeef5;
}

.list-item:last-child {
  border-bottom: none;
}
</style>
```

## 样式定制指南

### 自定义类名
通过`customClass`属性可以为组件添加自定义类名，用于覆盖默认样式。

```vue
<wd-root-portal custom-class="my-root-portal">
  <!-- 内容 -->
</wd-root-portal>

<style>
.my-root-portal {
  /* 自定义样式 */
}
</style>
```

### 自定义样式对象
通过`customStyle`属性可以直接设置组件的内联样式。

```vue
<wd-root-portal :custom-style="{ marginTop: '20px', padding: '10px' }">
  <!-- 内容 -->
</wd-root-portal>
```

## 注意事项

1. **平台兼容性**：
   - H5端使用Vue的`teleport`组件
   - 微信小程序和支付宝小程序使用`root-portal`组件
   - App Plus端使用renderjs实现
   - 钉钉小程序不支持该组件

2. **性能考虑**：
   - 避免频繁创建和销毁root-portal组件
   - 对于静态内容，考虑缓存机制
   - 动态内容更新时，注意监听性能变化

3. **样式隔离**：
   - 使用root-portal后，组件的样式会受到全局样式影响
   - 建议为传送内容添加独立的样式前缀或命名空间
   - 避免使用过于宽泛的CSS选择器

4. **事件处理**：
   - 传送内容中的事件处理正常工作
   - 注意事件冒泡和捕获机制
   - 组件间通信不受影响

5. **生命周期**：
   - 子组件的生命周期正常触发
   - 父组件可以正常监听子组件的事件
   - 动态组件的挂载和卸载正常

6. **使用限制**：
   - 不支持嵌套使用root-portal
   - 钉钉小程序不支持该组件
   - 部分旧版浏览器可能存在兼容性问题

## 常见问题

1. **Q: 为什么在某些平台上root-portal不生效？**
   A: 请检查平台兼容性，该组件不支持钉钉小程序。对于其他平台，请确保使用了正确的组件版本。

2. **Q: 如何处理root-portal内容的样式冲突？**
   A: 建议为传送内容添加独立的样式命名空间，避免与全局样式冲突。

3. **Q: root-portal会影响组件的性能吗？**
   A: 合理使用不会有明显性能影响，但频繁创建和销毁会影响性能。建议在需要时创建，不需要时及时销毁。

4. **Q: 可以在root-portal中使用其他wd-ui-plus组件吗？**
   A: 可以正常使用，所有wd-ui-plus组件都支持在root-portal中使用。

5. **Q: root-portal的内容如何响应父组件的数据变化？**
   A: 正常响应，root-portal不会影响组件间的数据绑定和响应式更新。