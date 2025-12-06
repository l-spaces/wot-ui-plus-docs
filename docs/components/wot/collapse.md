# Collapse 折叠面板

<demo-model url="/subPages/collapse/Index"></demo-model>

## 组件概况

### 组件概述
Collapse 折叠面板是一个用于展示和隐藏内容的组件，支持普通折叠模式和查看更多模式，可配置手风琴效果，提供了灵活的内容展示方式。

### 详细功能描述
- 支持普通折叠模式，配合 CollapseItem 组件使用
- 支持查看更多模式，可配置收起时显示行数
- 支持手风琴模式，同一时间只能展开一个面板
- 提供自定义展开/收起按钮
- 支持通过 v-model 双向绑定展开状态
- 支持切换所有面板状态的方法
- 提供自定义插槽，可定制展开/收起按钮样式
- 支持国际化

### 适用业务场景
- 折叠菜单和分类
- 长内容的分段展示
- 详情页的可折叠内容
- 表单的可折叠区域
- 商品详情的参数展示
- 列表项的展开/收起功能

## 完整API参考

### Props
| 名称 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| modelValue | string \| array \| boolean | - | 否 | 绑定值，手风琴模式下为字符串，普通模式下为数组，查看更多模式下为布尔值 |
| accordion | boolean | false | 否 | 手风琴模式，同一时间只能展开一个面板 |
| viewmore | boolean | false | 否 | 查看更多模式，显示展开/收起按钮 |
| useMoreSlot | boolean | false | 否 | 使用查看更多模式下的自定义插槽 |
| lineNum | number | 2 | 否 | 查看更多模式下，收起时的显示行数 |
| customMoreSlotClass | string | '' | 否 | 查看更多模式下的插槽外部自定义样式 |
| customStyle | object | - | 否 | 自定义样式，对象形式 |
| customClass | string | '' | 否 | 自定义类名 |

### Events
| 名称 | 触发条件 | 参数说明 |
| --- | --- | --- |
| update:modelValue | 展开状态变化时 | 当前展开的面板名称或状态 |
| change | 展开状态变化时 | 包含 value 的对象，value 为当前展开的面板名称或状态 |

### Methods
| 名称 | 参数 | 返回值 | 功能说明 |
| --- | --- | --- | --- |
| toggleAll | options | - | 切换所有面板展开状态，传 true 为全部展开，false 为全部收起，不传参为全部切换；options 可以是布尔值或对象 { expanded?: boolean, skipDisabled?: boolean } |

### Slots
| 名称 | 作用域变量 | 说明 |
| --- | --- | --- |
| default | - | 内容插槽，普通模式下用于放置 CollapseItem 组件，查看更多模式下用于放置折叠内容 |
| more | - | 查看更多模式下的自定义展开/收起按钮插槽 |

## 多场景使用示例代码

### 1. 基础用法
```vue
<template>
  <view class="demo-container">
    <wd-collapse v-model="activeNames">
      <wd-collapse-item name="1" title="标题1">
        <view class="content">内容1</view>
      </wd-collapse-item>
      <wd-collapse-item name="2" title="标题2">
        <view class="content">内容2</view>
      </wd-collapse-item>
      <wd-collapse-item name="3" title="标题3">
        <view class="content">内容3</view>
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

### 2. 手风琴模式
```vue
<template>
  <view class="demo-container">
    <wd-collapse v-model="activeName" accordion>
      <wd-collapse-item name="1" title="标题1">
        <view class="content">内容1</view>
      </wd-collapse-item>
      <wd-collapse-item name="2" title="标题2">
        <view class="content">内容2</view>
      </wd-collapse-item>
      <wd-collapse-item name="3" title="标题3">
        <view class="content">内容3</view>
      </wd-collapse-item>
    </wd-collapse>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeName = ref('1')
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

### 3. 查看更多模式
```vue
<template>
  <view class="demo-container">
    <wd-collapse v-model="isExpanded" viewmore :line-num="3">
      <view class="long-content">
        <text>This is a long text that will be collapsed when not expanded. </text>
        <text>It supports multiple lines and will show an ellipsis when collapsed. </text>
        <text>You can click the "View more" button to expand the full content.</text>
        <text>This is additional content that will be visible only when expanded.</text>
        <text>You can customize the number of lines shown when collapsed using the lineNum prop.</text>
      </view>
    </wd-collapse>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const isExpanded = ref(false)
</script>

<style scoped>
.demo-container {
  padding: 20px;
}

.long-content {
  font-size: 14px;
  line-height: 1.6;
  color: #303133;
}
</style>
```

### 4. 自定义查看更多按钮
```vue
<template>
  <view class="demo-container">
    <wd-collapse v-model="isExpanded" viewmore use-more-slot>
      <view class="long-content">
        <text>This is a long text with a custom "view more" button. </text>
        <text>You can customize the button's appearance using the more slot.</text>
        <text>This allows you to create a unique look for your collapse component.</text>
      </view>
      
      <!-- 自定义查看更多按钮 -->
      <template #more>
        <view class="custom-more-btn">
          <text class="btn-text">{{ isExpanded ? '收起' : '展开' }}</text>
          <wd-icon 
            name="arrow-down" 
            custom-class="btn-icon" 
            :style="{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }"
          ></wd-icon>
        </view>
      </template>
    </wd-collapse>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const isExpanded = ref(false)
</script>

<style scoped>
.demo-container {
  padding: 20px;
}

.long-content {
  font-size: 14px;
  line-height: 1.6;
  color: #303133;
}

.custom-more-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  color: #4d80f0;
  font-size: 14px;
}

.btn-text {
  margin-right: 5px;
}

.btn-icon {
  transition: transform 0.3s ease;
}
</style>
```

### 5. 控制所有面板
```vue
<template>
  <view class="demo-container">
    <view class="control-buttons">
      <button @click="expandAll">全部展开</button>
      <button @click="collapseAll">全部收起</button>
      <button @click="toggleAll">切换全部</button>
    </view>
    
    <wd-collapse ref="collapseRef" v-model="activeNames">
      <wd-collapse-item name="1" title="标题1">
        <view class="content">内容1</view>
      </wd-collapse-item>
      <wd-collapse-item name="2" title="标题2">
        <view class="content">内容2</view>
      </wd-collapse-item>
      <wd-collapse-item name="3" title="标题3">
        <view class="content">内容3</view>
      </wd-collapse-item>
      <wd-collapse-item name="4" title="标题4">
        <view class="content">内容4</view>
      </wd-collapse-item>
    </wd-collapse>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const collapseRef = ref()
const activeNames = ref(['1'])

// 全部展开
const expandAll = () => {
  collapseRef.value.toggleAll(true)
}

// 全部收起
const collapseAll = () => {
  collapseRef.value.toggleAll(false)
}

// 切换全部
const toggleAll = () => {
  collapseRef.value.toggleAll()
}
</script>

<style scoped>
.demo-container {
  padding: 20px;
}

.control-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

button {
  padding: 8px 16px;
  background-color: #4d80f0;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
}

.content {
  padding: 15px;
  background-color: #f5f7fa;
  border-radius: 4px;
}
</style>
```

## 样式定制指南

### customStyle 自定义样式
通过 `customStyle` 属性可以直接设置折叠面板的内联样式。

```vue
<wd-collapse 
  v-model="activeNames" 
  :custom-style="{ backgroundColor: '#f0f2f5', borderRadius: '8px', padding: '10px' }"
>
  <!-- 内容 -->
</wd-collapse>
```

### customClass 自定义类名
通过 `customClass` 属性可以为折叠面板添加自定义类名，结合外部样式表进行更复杂的样式定制。

```vue
<wd-collapse 
  v-model="activeNames" 
  custom-class="my-collapse"
>
  <!-- 内容 -->
</wd-collapse>
```

```scss
.my-collapse {
  // 自定义折叠面板样式
  margin: 10px 0;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  overflow: hidden;
  
  .wd-collapse__more {
    // 自定义查看更多按钮样式
    padding: 10px;
    text-align: center;
  }
}
```

### 自定义查看更多按钮
使用 `more` 插槽可以完全自定义查看更多模式下的展开/收起按钮样式。

```vue
<wd-collapse 
  v-model="isExpanded" 
  viewmore 
  use-more-slot
>
  <!-- 内容 -->
  
  <template #more>
    <view class="custom-more-btn">
      <!-- 自定义按钮内容 -->
    </view>
  </template>
</wd-collapse>
```

## 注意事项

### 常见问题解决方案
1. **手风琴模式下无法正常工作**：
   - 确保 `modelValue` 绑定的是字符串类型，而非数组
   - 检查每个 CollapseItem 的 `name` 属性是否唯一

2. **查看更多模式下内容不显示**：
   - 确保 `viewmore` 属性设置为 `true`
   - 检查内容是否正确放置在 default 插槽中
   - 调整 `lineNum` 属性值，确保内容足够长

3. **toggleAll 方法不生效**：
   - 确保组件引用正确获取
   - 手风琴模式下 `toggleAll` 方法无效
   - 检查是否正确传递参数

4. **自定义查看更多按钮不显示**：
   - 确保 `use-more-slot` 属性设置为 `true`
   - 检查 `more` 插槽是否正确定义

5. **样式覆盖问题**：
   - 使用 `customClass` 或 `customStyle` 进行样式定制
   - 确保样式选择器优先级足够高
   - 考虑使用 `!important` 强制覆盖（谨慎使用）

### 性能优化建议
- 避免在折叠内容中放置大量复杂组件
- 对于静态内容，考虑使用 `v-if` 条件渲染而非 `v-show`
- 减少 `toggleAll` 方法的频繁调用
- 对于长列表，考虑使用虚拟滚动

### 使用限制条件
- 手风琴模式下 `modelValue` 必须是字符串类型
- 普通模式下 `modelValue` 必须是数组类型
- 查看更多模式下 `modelValue` 必须是布尔类型
- `toggleAll` 方法在手风琴模式下无效
- 查看更多模式下内容必须是文本或简单元素，复杂组件可能导致样式异常
