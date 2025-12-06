# ActionSheet 动作面板

<demo-model url="/subPages/actionSheet/Index"></demo-model>

## 组件概况

### 组件概述
ActionSheet 动作面板组件是从底部弹出的操作菜单，用于展示一系列可选择的操作选项，支持普通操作列表和带图标面板两种形式，常用于确认操作、选择选项等场景。

### 详细功能描述
- 支持两种展示形式：普通操作列表和带图标面板
- 支持标题和关闭按钮
- 支持取消按钮
- 支持选项禁用和加载状态
- 支持多行面板展示
- 支持自定义样式和类名
- 支持点击遮罩关闭
- 支持点击选项后自动关闭
- 支持底部安全距离适配
- 支持懒渲染
- 支持从页面中脱离（解决fixed失效问题）

### 适用业务场景
- 确认删除、分享等操作
- 选择图片来源（拍照/从相册选择）
- 选择支付方式
- 选择商品规格
- 任何需要从底部弹出选择菜单的场景

## 完整API参考

### Props属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| modelValue | boolean | - | 是 | 设置菜单显示隐藏 |
| actions | array | [] | 否 | 菜单选项，数组元素为Action对象 |
| panels | array | [] | 否 | 自定义面板项，可为字符串数组、对象数组或二维数组（多行展示） |
| title | string | - | 否 | 标题 |
| cancelText | string | - | 否 | 取消按钮文案 |
| closeOnClickAction | boolean | true | 否 | 点击选项后是否关闭菜单 |
| closeOnClickModal | boolean | true | 否 | 点击遮罩是否关闭菜单 |
| duration | number | 200 | 否 | 弹框动画持续时间（毫秒） |
| zIndex | number | 10 | 否 | 菜单层级 |
| lazyRender | boolean | true | 否 | 弹层内容懒渲染，触发展示时才渲染内容 |
| safeAreaInsetBottom | boolean | true | 否 | 是否设置底部安全距离（适配iPhone X等机型） |
| rootPortal | boolean | false | 否 | 是否从页面中脱离出来，解决fixed失效问题 |
| customHeaderClass | string | - | 否 | 自定义头部样式类 |
| customStyle | string | - | 否 | 自定义根节点样式 |
| customClass | string | - | 否 | 自定义根节点样式类 |

### Events事件

| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| select | 选择菜单选项时 | item: 选中的选项对象, index: 选中的索引, rowIndex?: 行索引（多行面板时）, colIndex?: 列索引（面板时） |
| click-modal | 点击遮罩时 | - |
| cancel | 点击取消按钮时 | - |
| closed | 菜单关闭动画结束后 | - |
| close | 菜单开始关闭时 | - |
| open | 菜单开始打开时 | - |
| opened | 菜单打开动画结束后 | - |
| update:modelValue | 菜单显示状态变化时 | newValue: 新的显示状态 |

### Methods方法

该组件没有对外暴露的方法。

### Slots插槽

| 插槽名 | 作用域变量 | 使用说明 |
|--------|------------|----------|
| default | - | 自定义内容区域，位于actions/panels和cancel按钮之间 |

## 多场景使用示例代码

### 1. 基础用法

```vue
<template>
  <view class="action-sheet-demo">
    <wd-button type="primary" @click="show = true">打开动作面板</wd-button>
    <wd-action-sheet v-model="show" :actions="actions" @select="handleSelect" />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { showToast } from '@/utils/toast'

// 基础动作面板用法
const show = ref(false)

// 动作列表
const actions = ref([
  { name: '选项一' },
  { name: '选项二' },
  { name: '选项三' }
])

// 处理选择事件
const handleSelect = (event: any) => {
  showToast(`选择了：${event.item.name}`)
}
</script>

<style scoped>
.action-sheet-demo {
  padding: 20rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500rpx;
}
</style>
```

### 2. 带标题和取消按钮

```vue
<template>
  <view class="action-sheet-demo">
    <wd-button type="success" @click="show = true">带标题和取消按钮</wd-button>
    <wd-action-sheet 
      v-model="show" 
      :actions="actions" 
      title="请选择操作" 
      cancelText="取消" 
      @select="handleSelect" 
      @cancel="handleCancel"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { showToast } from '@/utils/toast'

// 带标题和取消按钮的动作面板
const show = ref(false)

// 动作列表
const actions = ref([
  { name: '分享', color: '#4D80F0' },
  { name: '收藏', color: '#f0883a' },
  { name: '举报', color: '#fa4350' }
])

// 处理选择事件
const handleSelect = (event: any) => {
  showToast(`选择了：${event.item.name}`)
}

// 处理取消事件
const handleCancel = () => {
  showToast('已取消')
}
</script>

<style scoped>
.action-sheet-demo {
  padding: 20rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500rpx;
}
</style>
```

### 3. 面板形式（带图标）

```vue
<template>
  <view class="action-sheet-demo">
    <wd-button type="warning" @click="show = true">面板形式</wd-button>
    <wd-action-sheet 
      v-model="show" 
      :panels="panels" 
      title="选择支付方式" 
      cancelText="取消" 
      @select="handleSelect"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { showToast } from '@/utils/toast'

// 面板形式的动作面板
const show = ref(false)

// 面板数据
const panels = ref([
  { iconUrl: 'https://example.com/wechat.png', title: '微信支付' },
  { iconUrl: 'https://example.com/alipay.png', title: '支付宝' },
  { iconUrl: 'https://example.com/unionpay.png', title: '银联支付' },
  { iconUrl: 'https://example.com/card.png', title: '银行卡支付' }
])

// 处理选择事件
const handleSelect = (event: any) => {
  showToast(`选择了：${event.item.title}`)
}
</script>

<style scoped>
.action-sheet-demo {
  padding: 20rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500rpx;
}
</style>
```

### 4. 多行面板和禁用状态

```vue
<template>
  <view class="action-sheet-demo">
    <wd-button type="error" @click="show = true">多行面板和禁用状态</wd-button>
    <wd-action-sheet 
      v-model="show" 
      :actions="actions" 
      :panels="multiPanels" 
      title="选择商品规格" 
      cancelText="取消" 
      @select="handleSelect"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { showToast } from '@/utils/toast'

// 多行面板和禁用状态的动作面板
const show = ref(false)

// 动作列表（带禁用和加载状态）
const actions = ref([
  { name: '选项一', disabled: true },
  { name: '选项二', loading: true },
  { name: '选项三' }
])

// 多行面板数据
const multiPanels = ref([
  [
    { iconUrl: 'https://example.com/red.png', title: '红色' },
    { iconUrl: 'https://example.com/blue.png', title: '蓝色' },
    { iconUrl: 'https://example.com/green.png', title: '绿色' }
  ],
  [
    { iconUrl: 'https://example.com/small.png', title: '小码' },
    { iconUrl: 'https://example.com/medium.png', title: '中码' },
    { iconUrl: 'https://example.com/large.png', title: '大码' }
  ]
])

// 处理选择事件
const handleSelect = (event: any) => {
  if (event.item.title) {
    showToast(`选择了：${event.item.title}`)
  } else {
    showToast(`选择了：${event.item.name}`)
  }
}
</script>

<style scoped>
.action-sheet-demo {
  padding: 20rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500rpx;
}
</style>
```

### 5. 自定义样式和插槽

```vue
<template>
  <view class="action-sheet-demo">
    <wd-button type="info" @click="show = true">自定义样式和插槽</wd-button>
    <wd-action-sheet 
      v-model="show" 
      :actions="actions" 
      title="自定义样式" 
      cancelText="取消"
      customStyle="border-radius: 20rpx; background-color: #f5f7fa;"
      customClass="my-action-sheet"
      customHeaderClass="my-header"
      @select="handleSelect"
    >
      <view class="custom-content">
        <text class="custom-text">这是自定义内容区域</text>
        <wd-button type="primary" size="small" @click="handleCustom">自定义按钮</wd-button>
      </view>
    </wd-action-sheet>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { showToast } from '@/utils/toast'

// 自定义样式和插槽的动作面板
const show = ref(false)

// 动作列表
const actions = ref([
  { name: '选项一', subname: '描述信息' },
  { name: '选项二', subname: '描述信息' }
])

// 处理选择事件
const handleSelect = (event: any) => {
  showToast(`选择了：${event.item.name}`)
}

// 处理自定义按钮点击
const handleCustom = () => {
  showToast('点击了自定义按钮')
  show.value = false
}
</script>

<style scoped>
.action-sheet-demo {
  padding: 20rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500rpx;
}

.custom-content {
  padding: 30rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20rpx;
  border-top: 1rpx solid #ebedf0;
  border-bottom: 1rpx solid #ebedf0;
}

.custom-text {
  font-size: 28rpx;
  color: #666;
}

/* 注意：需要使用 ::v-deep 或 /deep/ 穿透 scoped 样式 */
:deep(.my-action-sheet) {
  margin: 0 20rpx calc(var(--window-bottom) + 20rpx) 20rpx;
}

:deep(.my-header) {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}
</style>
```

## 样式定制指南

### 1. 使用customStyle自定义样式

```vue
<template>
  <wd-action-sheet 
    v-model="show" 
    :actions="actions" 
    customStyle="border-radius: 20rpx; margin: 0 20rpx;"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(false)
const actions = ref([{ name: '选项一' }, { name: '选项二' }])
</script>
```

### 2. 使用customClass自定义类名

```vue
<template>
  <wd-action-sheet 
    v-model="show" 
    :actions="actions" 
    customClass="custom-action-sheet"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(false)
const actions = ref([{ name: '选项一' }, { name: '选项二' }])
</script>

<style scoped>
/* 注意：需要使用 ::v-deep 或 /deep/ 穿透 scoped 样式 */
:deep(.custom-action-sheet) {
  background-color: #f0f2f5;
  border-radius: 20rpx;
  overflow: hidden;
}

:deep(.custom-action-sheet .wd-action-sheet__action) {
  color: #333;
  font-size: 32rpx;
}
</style>
```

### 3. 自定义头部样式

```vue
<template>
  <wd-action-sheet 
    v-model="show" 
    :actions="actions" 
    title="自定义头部" 
    customHeaderClass="custom-header"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(false)
const actions = ref([{ name: '选项一' }, { name: '选项二' }])
</script>

<style scoped>
/* 注意：需要使用 ::v-deep 或 /deep/ 穿透 scoped 样式 */
:deep(.custom-header) {
  background-color: #4D80F0;
  color: #fff;
  font-weight: bold;
  padding: 30rpx;
}
</style>
```

## 注意事项

1. **actions和panels的区别**：
   - actions用于展示普通操作列表，支持禁用、加载状态和子标题
   - panels用于展示带图标面板，支持单行和多行展示
   - 两者可以同时使用，actions会显示在panels下方

2. **closeOnClickAction**：点击选项后是否自动关闭菜单，默认为true

3. **closeOnClickModal**：点击遮罩层是否关闭菜单，默认为true

4. **safeAreaInsetBottom**：在iPhone X等全面屏机型上，为true时会自动添加底部安全距离

5. **rootPortal**：当页面中存在fixed定位元素时，可能会出现层级问题，设置rootPortal为true可以解决此问题

6. **lazyRender**：默认为true，只有当菜单显示时才会渲染内容，提高性能

7. **title和cancelText**：如果不设置title，头部区域会隐藏；如果不设置cancelText，取消按钮会隐藏

8. **actions中的disabled和loading**：当disabled为true或loading为true时，选项不可点击

9. **panels的二维数组**：当panels为二维数组时，会多行展示，每行一个数组元素

10. **事件触发顺序**：打开时：open → after-enter → opened；关闭时：close → after-leave → closed

11. **样式优先级**：customStyle会覆盖默认样式，customClass可以通过深度选择器覆盖组件内部样式

12. **zIndex**：可以通过zIndex属性调整菜单的层级，确保在其他元素上方显示