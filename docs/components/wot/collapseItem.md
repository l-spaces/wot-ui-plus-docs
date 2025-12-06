# CollapseItem 折叠面板项

<demo-model url="/subPages/collapseItem/Index"></demo-model>

## 组件概况

### 组件概述
CollapseItem 折叠面板项是 Collapse 组件的子组件，用于创建单个可折叠面板。它支持自定义标题、禁用状态、展开前钩子等功能，与 Collapse 组件配合使用可以构建灵活的折叠面板组。

### 详细功能描述
- 支持自定义标题内容
- 提供禁用状态
- 支持展开前钩子函数
- 提供自定义样式和类名
- 支持自定义内容容器样式
- 提供平滑的展开/收起动画
- 支持手风琴和普通两种模式
- 支持获取当前展开状态

### 适用业务场景
- 折叠菜单中的菜单项
- 表单中的可折叠字段组
- 详情页中的可折叠区块
- 商品详情中的参数项
- 列表中的可展开项
- 各种需要单个可折叠面板的场景

## 完整API参考

### Props
| 名称            | 类型     | 默认值 | 必填 | 描述                                                        |
| --------------- | -------- | ------ | ---- | ----------------------------------------------------------- |
| title           | string   | ''     | 否   | 折叠栏的标题，可通过 slot 传递自定义内容                    |
| disabled        | boolean  | false  | 否   | 禁用折叠栏                                                  |
| name            | string   | -      | 是   | 折叠栏的唯一标识符                                          |
| beforeExpend    | function | -      | 否   | 打开前的回调函数，返回 false 可以阻止打开，支持返回 Promise |
| customBodyClass | string   | ''     | 否   | 自定义折叠栏内容容器样式类名                                |
| customBodyStyle | string   | ''     | 否   | 自定义折叠栏内容容器样式                                    |
| customStyle     | object   | -      | 否   | 自定义组件样式，对象形式                                    |
| customClass     | string   | ''     | 否   | 自定义组件类名                                              |

### Events
该组件不触发任何自定义事件，通过与父组件 Collapse 通信实现状态管理。

### Methods
| 名称         | 参数                      | 返回值        | 功能说明                                                     |
| ------------ | ------------------------- | ------------- | ------------------------------------------------------------ |
| getExpanded  | -                         | boolean       | 获取当前展开状态                                             |
| updateExpand | useBeforeExpand?: boolean | `Promise<void>` | 更新展开状态，useBeforeExpand 表示是否执行 beforeExpend 钩子 |

### Slots
| 名称    | 作用域变量                                             | 说明                                                               |
| ------- | ------------------------------------------------------ | ------------------------------------------------------------------ |
| default | -                                                      | 折叠面板内容                                                       |
| title   | expanded: boolean, disabled: boolean, isFirst: boolean | 自定义标题内容，提供当前展开状态、禁用状态和是否为第一个面板的信息 |

## 多场景使用示例代码

### 1. 基础用法
```vue
<template>
  <view class="demo-container">
    <wd-collapse v-model="activeNames">
      <!-- 基础折叠面板项 -->
      <wd-collapse-item name="1" title="标题1">
        <view class="content">内容1</view>
      </wd-collapse-item>
      
      <!-- 基础折叠面板项 -->
      <wd-collapse-item name="2" title="标题2">
        <view class="content">内容2</view>
      </wd-collapse-item>
    </wd-collapse>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeNames = ref(['1'])
</script>

<style scoped>
.demo-container {
  padding: 20px;
}

.content {
  padding: 15px;
  background-color: #f5f7fa;
  border-radius: 4px;
}
</style>
```

### 2. 自定义标题
```vue
<template>
  <view class="demo-container">
    <wd-collapse v-model="activeNames">
      <wd-collapse-item name="1">
        <!-- 自定义标题 -->
        <template #title="{ expanded, disabled }">
          <view class="custom-title">
            <text class="title-text">自定义标题</text>
            <wd-badge :value="5" custom-class="title-badge"></wd-badge>
            <wd-icon 
              name="down" 
              :custom-class="`title-arrow ${expanded ? 'is-retract' : ''}`" 
            ></wd-icon>
          </view>
        </template>
        <view class="content">这是带有自定义标题的折叠面板内容</view>
      </wd-collapse-item>
    </wd-collapse>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeNames = ref(['1'])
</script>

<style scoped>
.demo-container {
  padding: 20px;
}

.custom-title {
  display: flex;
  align-items: center;
}

.title-text {
  flex: 1;
  font-size: 16px;
  font-weight: 500;
  color: #303133;
}

.title-badge {
  margin-right: 10px;
}

.title-arrow {
  transition: transform 0.3s ease;
  font-size: 16px;
  color: #909399;
}

.title-arrow.is-retract {
  transform: rotate(180deg);
}

.content {
  padding: 15px;
  background-color: #f5f7fa;
  border-radius: 4px;
}
</style>
```

### 3. 禁用状态
```vue
<template>
  <view class="demo-container">
    <wd-collapse v-model="activeNames">
      <wd-collapse-item name="1" title="可折叠项">
        <view class="content">这是可以折叠的面板内容</view>
      </wd-collapse-item>
      
      <!-- 禁用状态 -->
      <wd-collapse-item name="2" title="禁用项" disabled>
        <view class="content">这是禁用状态的面板内容，无法折叠</view>
      </wd-collapse-item>
    </wd-collapse>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeNames = ref(['1'])
</script>

<style scoped>
.demo-container {
  padding: 20px;
}

.content {
  padding: 15px;
  background-color: #f5f7fa;
  border-radius: 4px;
}
</style>
```

### 4. 展开前钩子
```vue
<template>
  <view class="demo-container">
    <wd-collapse v-model="activeNames">
      <wd-collapse-item 
        name="1" 
        title="带展开前钩子" 
        :beforeExpend="beforeExpand"
      >
        <view class="content">这是带有展开前钩子的面板内容</view>
      </wd-collapse-item>
    </wd-collapse>
    <text class="tip">点击面板标题，会先触发确认弹窗</text>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeNames = ref([])

// 展开前钩子函数
const beforeExpand = (name: string) => {
  return new Promise((resolve) => {
    // 模拟确认弹窗
    uni.showModal({
      title: '确认',
      content: '确定要展开这个面板吗？',
      success: (res) => {
        if (res.confirm) {
          resolve(true)
        } else {
          resolve(false)
        }
      }
    })
  })
}
</script>

<style scoped>
.demo-container {
  padding: 20px;
}

.content {
  padding: 15px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.tip {
  display: block;
  margin-top: 10px;
  font-size: 12px;
  color: #909399;
}
</style>
```

### 5. 自定义内容样式
```vue
<template>
  <view class="demo-container">
    <wd-collapse v-model="activeNames">
      <!-- 自定义内容容器样式 -->
      <wd-collapse-item 
        name="1" 
        title="自定义内容样式"
        custom-body-class="custom-body"
        :custom-body-style="{ backgroundColor: '#ecf5ff', borderLeft: '4px solid #409eff' }"
      >
        <view class="content">
          <text class="content-text">这是带有自定义样式的内容</text>
          <text class="content-desc">可以通过 customBodyClass 和 customBodyStyle 来自定义内容容器样式</text>
        </view>
      </wd-collapse-item>
    </wd-collapse>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeNames = ref(['1'])
</script>

<style scoped>
.demo-container {
  padding: 20px;
}

.content {
  padding: 15px;
}

.content-text {
  display: block;
  font-size: 16px;
  font-weight: 500;
  color: #303133;
  margin-bottom: 10px;
}

.content-desc {
  display: block;
  font-size: 14px;
  color: #606266;
  line-height: 1.5;
}

/* 自定义内容容器样式 */
.custom-body {
  padding: 10px;
  border-radius: 8px;
}
</style>
```

## 样式定制指南

### customStyle 自定义样式
通过 `customStyle` 属性可以直接设置折叠面板项的内联样式。

```vue
<wd-collapse-item 
  name="1" 
  title="自定义样式"
  :custom-style="{ backgroundColor: '#f0f2f5', borderRadius: '8px', marginBottom: '10px' }"
>
  <!-- 内容 -->
</wd-collapse-item>
```

### customClass 自定义类名
通过 `customClass` 属性可以为折叠面板项添加自定义类名，结合外部样式表进行更复杂的样式定制。

```vue
<wd-collapse-item 
  name="1" 
  title="自定义类名"
  custom-class="my-collapse-item"
>
  <!-- 内容 -->
</wd-collapse-item>
```

```scss
.my-collapse-item {
  // 自定义折叠面板项样式
  margin: 10px 0;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  overflow: hidden;
  
  .wd-collapse-item__header {
    // 自定义标题样式
    padding: 12px 16px;
    background-color: #fafafa;
  }
  
  .wd-collapse-item__body {
    // 自定义内容样式
    padding: 16px;
  }
}
```

### customBodyStyle 和 customBodyClass
通过 `customBodyStyle` 和 `customBodyClass` 属性可以自定义内容容器的样式。

```vue
<wd-collapse-item 
  name="1" 
  title="自定义内容容器样式"
  custom-body-class="custom-body"
  :custom-body-style="{ backgroundColor: '#ecf5ff', padding: '20px' }"
>
  <!-- 内容 -->
</wd-collapse-item>
```

### 自定义标题样式
通过 `title` 插槽可以完全自定义标题的样式和内容。

```vue
<wd-collapse-item name="1">
  <template #title="{ expanded }">
    <view class="custom-title">
      <!-- 自定义标题内容 -->
    </view>
  </template>
  <!-- 内容 -->
</wd-collapse-item>
```

## 注意事项

### 常见问题解决方案
1. **面板无法展开/收起**：
   - 检查 `name` 属性是否唯一
   - 确认 `disabled` 属性是否为 `false`
   - 检查 `beforeExpend` 钩子是否正确返回

2. **自定义标题不显示**：
   - 确保 `title` 插槽正确定义
   - 检查是否传递了 `name` 属性

3. **样式覆盖问题**：
   - 使用 `customClass` 或 `customStyle` 进行样式定制
   - 确保样式选择器优先级足够高
   - 考虑使用 `!important` 强制覆盖（谨慎使用）

4. **展开前钩子不触发**：
   - 确保 `beforeExpend` 属性正确绑定
   - 检查钩子函数是否正确返回 Promise 或布尔值
   - 确认面板未被禁用

5. **与父组件通信问题**：
   - 确保 CollapseItem 组件正确嵌套在 Collapse 组件内
   - 检查 Collapse 组件的 `modelValue` 是否正确绑定
   - 确认 Collapse 组件的 `accordion` 属性设置正确

### 性能优化建议
- 避免在折叠内容中放置大量复杂组件
- 对于静态内容，考虑使用 `v-if` 条件渲染而非 `v-show`
- 减少 `beforeExpend` 钩子中的复杂计算
- 避免频繁调用 `updateExpand` 方法

### 使用限制条件
- 必须作为 Collapse 组件的子组件使用
- `name` 属性是必填项，且必须唯一
- 手风琴模式下，同一时间只能展开一个面板
- 禁用状态下，面板无法展开/收起
