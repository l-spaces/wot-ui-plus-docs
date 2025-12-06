# Search 搜索框
<demo-model url="/subPages/search/Index"></demo-model>

## 组件概况

### 组件概述
Search组件是一个功能丰富的搜索框组件，提供了输入、清除、搜索等核心功能，并支持自定义样式、占位符、前后缀等扩展功能。它适用于各种需要搜索功能的场景，如商品搜索、内容搜索等。

### 详细功能描述
- 支持双向数据绑定（v-model）
- 自动显示/隐藏清除按钮
- 支持自定义占位符文本
- 支持自定义取消按钮文本
- 支持浅色/深色主题切换
- 支持禁用状态
- 支持最大输入长度限制
- 支持自动聚焦
- 支持自定义前后缀插槽
- 支持多种事件触发（focus、blur、input、search等）
- 支持多端适配

### 适用业务场景
- 搜索页面的核心搜索框
- 商品列表顶部的搜索栏
- 文章、新闻等内容的搜索功能
- 应用内的全局搜索入口
- 表单中的搜索输入框

## 完整API参考

### Props
| 参数 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| modelValue | string | '' | 否 | 输入框内容，双向绑定 |
| clearabled | boolean | true | 否 | 是否显示清除按钮 |
| placeholder | string | - | 否 | 搜索框占位文本 |
| cancelTxt | string | - | 否 | 搜索框右侧文本 |
| light | boolean | false | 否 | 是否使用亮色（白色）主题 |
| hideCancel | boolean | false | 否 | 是否隐藏右侧文本 |
| disabled | boolean | false | 否 | 是否禁用搜索框 |
| maxlength | number | -1 | 否 | 原生属性，设置最大长度。-1 表示无限制 |
| placeholderLeft | boolean | false | 否 | placeholder 居左边 |
| focus | boolean | false | 否 | 是否自动聚焦 |
| focusWhenClear | boolean | false | 否 | 是否在点击清除按钮时聚焦输入框 |
| placeholderStyle | string | - | 否 | 原生属性，指定 placeholder 的样式，目前仅支持color,font-size和font-weight |
| placeholderClass | string | '' | 否 | 原生属性，指定 placeholder 的样式类 |
| customInputClass | string | '' | 否 | 输入框自定义类名 |
| customClass | string | - | 否 | 自定义类名 |
| customStyle | object | - | 否 | 自定义样式，对象形式 |
| useSuffixSlot | boolean | false | 否 | 是否使用输入框右侧插槽（已废弃，直接使用插槽即可） |

### Events
| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| update:modelValue | 输入框内容变化时 | { value: string } 输入框当前值 |
| change | 输入框内容变化时 | { value: string } 输入框当前值 |
| focus | 输入框获得焦点时 | { value: string } 输入框当前值 |
| blur | 输入框失去焦点时 | { value: string } 输入框当前值 |
| search | 点击键盘搜索按钮时 | { value: string } 输入框当前值 |
| clear | 点击清除按钮时 | 无 |
| cancel | 点击取消按钮时 | { value: string } 输入框当前值 |

### Methods
无

### Slots
| 插槽名 | 作用域变量 | 说明 |
|--------|------------|------|
| prefix | - | 搜索框左侧插槽，用于放置自定义内容 |
| suffix | - | 搜索框右侧插槽，用于放置自定义内容，默认显示取消按钮 |

## 多场景使用示例

### 基础用法
```vue
<template>
  <view>
    <wd-search v-model="keyword" @search="handleSearch" placeholder="请输入搜索内容"></wd-search>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const keyword = ref('')

const handleSearch = (event: any) => {
  console.log('搜索内容:', event.value)
  // 执行搜索逻辑
}
</script>
```

### 自定义样式
```vue
<template>
  <view>
    <wd-search 
      v-model="keyword" 
      custom-class="my-search" 
      custom-input-class="my-input" 
      placeholder="请输入搜索内容"
    ></wd-search>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const keyword = ref('')
</script>

<style scoped>
.my-search {
  margin: 20px;
  background-color: #f5f7fa;
  padding: 10px;
  border-radius: 8px;
}

.my-input {
  font-size: 16px;
  color: #333;
}
</style>
```

### 禁用状态
```vue
<template>
  <view>
    <wd-search 
      v-model="keyword" 
      disabled 
      placeholder="搜索功能已禁用"
    ></wd-search>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const keyword = ref('')
</script>
```

### 自定义占位符和取消文本
```vue
<template>
  <view>
    <wd-search 
      v-model="keyword" 
      placeholder="请输入商品名称" 
      cancel-txt="搜索"
      @search="handleSearch"
    ></wd-search>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const keyword = ref('')

const handleSearch = (event: any) => {
  console.log('搜索商品:', event.value)
  // 执行商品搜索逻辑
}
</script>
```

### 自定义前后缀
```vue
<template>
  <view>
    <wd-search v-model="keyword" placeholder="请输入搜索内容">
      <template #prefix>
        <wd-icon name="scan" custom-class="prefix-icon"></wd-icon>
      </template>
      <template #suffix>
        <view class="custom-suffix">
          <wd-icon name="filter" @click="handleFilter"></wd-icon>
          <wd-button size="mini" type="primary" @click="handleSearch">搜索</wd-button>
        </view>
      </template>
    </wd-search>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const keyword = ref('')

const handleSearch = () => {
  console.log('搜索内容:', keyword.value)
  // 执行搜索逻辑
}

const handleFilter = () => {
  console.log('打开筛选面板')
  // 打开筛选面板逻辑
}
</script>

<style scoped>
.prefix-icon {
  margin-right: 5px;
  color: #909399;
}

.custom-suffix {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
```

## 样式定制指南

### 自定义类名
通过`customClass`属性可以为Search组件添加自定义类名，用于覆盖默认样式。

```vue
<wd-search custom-class="my-search">
  <!-- 内容 -->
</wd-search>

<style>
.my-search {
  /* 自定义样式 */
  margin: 20px;
  background-color: #f0f2f5;
}
</style>
```

### 自定义输入框类名
通过`customInputClass`属性可以为输入框添加自定义类名，用于修改输入框的样式。

```vue
<wd-search custom-input-class="my-input">
  <!-- 内容 -->
</wd-search>

<style>
.my-input {
  /* 自定义输入框样式 */
  font-size: 16px;
  color: #333;
  font-weight: 500;
}
</style>
```

### 自定义样式对象
通过`customStyle`属性可以直接设置组件的内联样式。

```vue
<wd-search :custom-style="{ margin: '20px', backgroundColor: '#f0f2f5', borderRadius: '8px' }">
  <!-- 内容 -->
</wd-search>
```

### 自定义占位符样式
通过`placeholderStyle`属性可以直接设置占位符的样式。

```vue
<wd-search placeholder-style="color: #909399; font-size: 14px;">
  <!-- 内容 -->
</wd-search>
```

## 注意事项

1. **双向绑定**：使用`v-model`进行双向数据绑定，获取和设置输入框内容。

2. **清除按钮**：当输入框有内容时，清除按钮会自动显示，点击清除按钮会清空输入框内容并触发`clear`事件。

3. **取消按钮**：取消按钮默认显示，可通过`hideCancel`属性隐藏。点击取消按钮会触发`cancel`事件。

4. **禁用状态**：通过`disabled`属性可以禁用搜索框，禁用后输入框不可编辑，清除按钮不显示。

5. **自动聚焦**：通过`focus`属性可以设置输入框自动聚焦，但需要注意在某些平台上可能存在兼容性问题。

6. **最大长度**：通过`maxlength`属性可以设置输入框的最大长度，-1表示无限制。

7. **废弃属性**：`useSuffixSlot`属性已废弃，将在下一个minor版本被移除，直接使用`suffix`插槽即可。

8. **多端适配**：组件在不同平台上可能存在细微的样式差异，建议在实际使用中进行测试。

9. **事件触发**：组件支持多种事件，包括`focus`、`blur`、`input`、`search`、`clear`、`cancel`等，可根据需要监听相应事件。

10. **国际化支持**：组件的默认占位符和取消文本支持国际化，可通过`Locale`组件进行配置。

## 常见问题

1. **Q: 为什么清除按钮不显示？**
   A: 清除按钮只有在输入框有内容且`clearabled`属性为`true`时才会显示，请检查这两个条件是否满足。

2. **Q: 如何修改搜索框的背景颜色？**
   A: 可以通过`customClass`属性添加自定义类名，然后在CSS中修改背景颜色。

3. **Q: 为什么自动聚焦不生效？**
   A: 自动聚焦功能在某些平台上可能存在兼容性问题，建议在组件挂载后手动调用聚焦方法，或者使用`setTimeout`延迟设置聚焦。

4. **Q: 如何自定义取消按钮的样式？**
   A: 可以使用`suffix`插槽自定义右侧内容，完全控制取消按钮的样式和行为。

5. **Q: 为什么输入框内容变化时没有触发`change`事件？**
   A: 请确保使用了`v-model`进行双向绑定，或者监听了`input`事件，`change`事件会在输入框内容变化时触发。

6. **Q: 如何禁用清除按钮？**
   A: 可以将`clearabled`属性设置为`false`来禁用清除按钮。

7. **Q: 支持哪些事件？**
   A: 组件支持`focus`、`blur`、`input`、`search`、`clear`、`cancel`等事件，具体可参考API文档中的Events部分。

8. **Q: 如何自定义搜索图标？**
   A: 目前不支持直接修改搜索图标，但可以通过`prefix`插槽自定义左侧内容，实现自定义搜索图标的效果。