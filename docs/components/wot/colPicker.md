# ColPicker 多列选择器

<demo-model url="/subPages/colPicker/Index"></demo-model>

## 组件概况

### 组件概述
ColPicker 多列选择器是一个用于从多列数据中选择值的组件，支持级联选择、自定义展示格式、表单验证等功能。它提供了直观的交互界面，允许用户在多列数据中进行选择，并支持各种自定义配置。

### 详细功能描述
- 支持多列数据选择，可配置级联关系
- 支持自定义展示文案格式化
- 提供表单验证支持，可结合 wd-form 使用
- 支持禁用和只读状态
- 支持自定义样式和类名
- 支持弹出层标题和占位符配置
- 提供确认前校验机制
- 支持自动补全数据功能
- 支持底部安全距离适配
- 支持从页面中脱离，解决 fixed 失效问题
- 支持国际化

### 适用业务场景
- 地址选择（省市区三级联动）
- 日期时间选择（年月日时分秒）
- 商品分类选择
- 多维度数据筛选
- 表单中的多列选择项
- 各种需要从层级数据中选择值的场景

## 完整API参考

### Props
| 名称 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| modelValue | array | - | 是 | 选中项，数组格式，对应每一列的选中值 |
| columns | array | [] | 否 | 选择器数据，二维数组，每一项为一列数据 |
| label | string | - | 否 | 选择器左侧文案 |
| labelWidth | string | '33%' | 否 | 设置左侧标题宽度 |
| useLabelSlot | boolean | false | 否 | 使用 label 插槽时设置该选项 |
| useDefaultSlot | boolean | false | 否 | 使用默认插槽时设置该选项 |
| disabled | boolean | false | 否 | 禁用状态 |
| readonly | boolean | false | 否 | 只读状态 |
| placeholder | string | - | 否 | 选择器占位符 |
| title | string | - | 否 | 弹出层标题 |
| columnChange | function | - | 否 | 列数据变化事件，接收当前列的选中项 item、当前列下标、当前列选中项下标、下一列数据处理函数 resolve、结束选择 finish |
| displayFormat | function | - | 否 | 自定义展示文案的格式化函数，返回一个字符串 |
| beforeConfirm | function | - | 否 | 确定前校验函数，接收 (value, resolve) 参数，通过 resolve 继续执行 picker，resolve 接收 1 个 boolean 参数 |
| alignRight | boolean | false | 否 | 选择器的值靠右展示 |
| error | boolean | false | 否 | 是否为错误状态，错误状态时右侧内容为红色 |
| required | boolean | false | 否 | 是否必填 |
| size | string | - | 否 | 设置选择器大小，可选值：large |
| valueKey | string | 'value' | 否 | 选项对象中，value 对应的 key |
| labelKey | string | 'label' | 否 | 选项对象中，展示的文本对应的 key |
| tipKey | string | 'tip' | 否 | 选项对象中，提示文案对应的 key |
| loadingColor | string | '#4D80F0' | 否 | loading 图标的颜色 |
| closeOnClickModal | boolean | true | 否 | 点击遮罩是否关闭 |
| autoComplete | boolean | false | 否 | 自动触发 column-change 事件来补全数据，当 columns 为空数组或者 columns 数组长度小于 value 数组长度时，会自动触发 column-change |
| zIndex | number | 15 | 否 | 弹窗层级 |
| safeAreaInsetBottom | boolean | true | 否 | 弹出面板是否设置底部安全距离（iphone X 类型的机型） |
| ellipsis | boolean | false | 否 | 是否超出隐藏 |
| prop | string | - | 否 | 表单域 model 字段名，在使用表单校验功能的情况下，该属性是必填的 |
| rules | array | [] | 否 | 表单验证规则，结合wd-form组件使用 |
| lineWidth | number | - | 否 | 底部条宽度，单位像素 |
| lineHeight | number | - | 否 | 底部条高度，单位像素 |
| customViewClass | string | '' | 否 | label 外部自定义样式 |
| customLabelClass | string | '' | 否 | value 外部自定义样式 |
| customValueClass | string | '' | 否 | 自定义值样式类名 |
| rootPortal | boolean | false | 否 | 是否从页面中脱离出来，用于解决各种 fixed 失效问题 (H5: teleport, APP: renderjs, 小程序: root-portal) |
| markerSide | string | 'before' | 否 | 必填标记位置，可选值：before、after |
| customStyle | object | - | 否 | 自定义样式，对象形式 |
| customClass | string | - | 否 | 自定义类名 |

### Events
| 名称 | 触发条件 | 参数说明 |
| --- | --- | --- |
| update:modelValue | 选择值变化时 | 当前选中的值数组 |
| confirm | 确认选择时 | 包含 value 和 selectedItems 的对象，value 为选中值数组，selectedItems 为选中项对象数组 |
| close | 关闭选择器时 | 无 |

### Methods
| 名称 | 参数 | 返回值 | 功能说明 |
| --- | --- | --- | --- |
| open | - | - | 打开选择器 |
| close | - | - | 关闭选择器 |

### Slots
| 名称 | 作用域变量 | 说明 |
| --- | --- | --- |
| default | - | 自定义选择器触发器 |
| label | - | 自定义左侧标签 |

## 多场景使用示例代码

### 1. 基础用法
```vue
<template>
  <view class="demo-container">
    <wd-col-picker 
      v-model="selectedValue" 
      :columns="columns" 
      label="基础选择"
    ></wd-col-picker>
    <text class="result">选择结果：{{ selectedValue }}</text>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const selectedValue = ref(['1', '1-2'])

// 基础数据
const columns = ref([
  [
    { value: '1', label: '选项1' },
    { value: '2', label: '选项2' },
    { value: '3', label: '选项3' }
  ],
  [
    { value: '1-1', label: '选项1-1' },
    { value: '1-2', label: '选项1-2' },
    { value: '1-3', label: '选项1-3' }
  ]
])
</script>

<style scoped>
.demo-container {
  padding: 20px;
}

.result {
  display: block;
  margin-top: 20px;
  font-size: 14px;
  color: #606266;
}
</style>
```

### 2. 级联选择
```vue
<template>
  <view class="demo-container">
    <wd-col-picker 
      v-model="selectedValue" 
      :columns="columns" 
      label="级联选择"
      :columnChange="onColumnChange"
    ></wd-col-picker>
    <text class="result">选择结果：{{ selectedValue }}</text>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const selectedValue = ref(['1', '1-2'])
const columns = ref([
  [
    { value: '1', label: '选项1' },
    { value: '2', label: '选项2' },
    { value: '3', label: '选项3' }
  ],
  [] // 第二列数据通过 columnChange 动态加载
])

// 列数据变化事件
const onColumnChange = (option: any) => {
  const { selectedItem, index, resolve, finish } = option
  
  // 模拟异步加载数据
  setTimeout(() => {
    let nextColumn = []
    
    if (index === 0) {
      // 根据第一列选择加载第二列数据
      switch (selectedItem.value) {
        case '1':
          nextColumn = [
            { value: '1-1', label: '选项1-1' },
            { value: '1-2', label: '选项1-2' },
            { value: '1-3', label: '选项1-3' }
          ]
          break
        case '2':
          nextColumn = [
            { value: '2-1', label: '选项2-1' },
            { value: '2-2', label: '选项2-2' }
          ]
          break
        case '3':
          nextColumn = [
            { value: '3-1', label: '选项3-1' },
            { value: '3-2', label: '选项3-2' },
            { value: '3-3', label: '选项3-3' },
            { value: '3-4', label: '选项3-4' }
          ]
          break
      }
      
      // 调用 resolve 加载下一列数据
      resolve(nextColumn)
    } else {
      // 最后一列选择完成，调用 finish 结束选择
      finish()
    }
  }, 500)
}
</script>

<style scoped>
.demo-container {
  padding: 20px;
}

.result {
  display: block;
  margin-top: 20px;
  font-size: 14px;
  color: #606266;
}
</style>
```

### 3. 自定义展示格式
```vue
<template>
  <view class="demo-container">
    <wd-col-picker 
      v-model="selectedValue" 
      :columns="columns" 
      label="自定义格式"
      :displayFormat="displayFormat"
      placeholder="请选择"
    ></wd-col-picker>
    <text class="result">选择结果：{{ selectedValue }}</text>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const selectedValue = ref(['1', '1-2'])

// 数据
const columns = ref([
  [
    { value: '1', label: '选项1' },
    { value: '2', label: '选项2' }
  ],
  [
    { value: '1-1', label: '选项1-1' },
    { value: '1-2', label: '选项1-2' }
  ]
])

// 自定义展示格式
const displayFormat = (selectedItems: any[]) => {
  return selectedItems.map(item => item.label).join(' / ')
}
</script>

<style scoped>
.demo-container {
  padding: 20px;
}

.result {
  display: block;
  margin-top: 20px;
  font-size: 14px;
  color: #606266;
}
</style>
```

### 4. 表单验证
```vue
<template>
  <view class="demo-container">
    <wd-form ref="formRef">
      <wd-col-picker 
        v-model="selectedValue" 
        :columns="columns" 
        label="表单验证"
        prop="picker"
        :rules="[{ required: true, message: '请选择选项' }]"
        error
      ></wd-col-picker>
    </wd-form>
    <button @click="validateForm" class="validate-btn">验证表单</button>
    <text class="result">{{ validateResult }}</text>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const formRef = ref()
const selectedValue = ref([])
const validateResult = ref('')

// 数据
const columns = ref([
  [
    { value: '1', label: '选项1' },
    { value: '2', label: '选项2' }
  ]
])

// 验证表单
const validateForm = async () => {
  try {
    await formRef.value.validate()
    validateResult.value = '验证通过'
  } catch (error: any) {
    validateResult.value = `验证失败：${error.message}`
  }
}
</script>

<style scoped>
.demo-container {
  padding: 20px;
}

.validate-btn {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4d80f0;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
}

.result {
  display: block;
  margin-top: 20px;
  font-size: 14px;
  color: #606266;
}
</style>
```

### 5. 自定义触发器
```vue
<template>
  <view class="demo-container">
    <wd-col-picker 
      v-model="selectedValue" 
      :columns="columns"
      use-default-slot
    >
      <!-- 自定义触发器 -->
      <view class="custom-trigger">
        <text class="trigger-text">点击选择</text>
        <text class="trigger-value">{{ displayText }}</text>
        <wd-icon name="arrow-right" custom-class="trigger-icon"></wd-icon>
      </view>
    </wd-col-picker>
    <text class="result">选择结果：{{ selectedValue }}</text>
  </view>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

const selectedValue = ref(['1', '1-2'])

// 数据
const columns = ref([
  [
    { value: '1', label: '选项1' },
    { value: '2', label: '选项2' }
  ],
  [
    { value: '1-1', label: '选项1-1' },
    { value: '1-2', label: '选项1-2' }
  ]
])

// 计算显示文本
const displayText = computed(() => {
  if (!selectedValue.value.length) return '请选择'
  
  let text = ''
  selectedValue.value.forEach((value, index) => {
    const column = columns.value[index]
    if (column) {
      const item = column.find((item: any) => item.value === value)
      if (item) {
        text += item.label + ' '
      }
    }
  })
  
  return text.trim()
})
</script>

<style scoped>
.demo-container {
  padding: 20px;
}

.custom-trigger {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: #f5f7fa;
  border-radius: 8px;
}

.trigger-text {
  font-size: 14px;
  color: #606266;
  margin-right: 10px;
}

.trigger-value {
  flex: 1;
  font-size: 14px;
  color: #303133;
  text-align: right;
}

.trigger-icon {
  margin-left: 10px;
  color: #c0c4cc;
}

.result {
  display: block;
  margin-top: 20px;
  font-size: 14px;
  color: #606266;
}
</style>
```

## 样式定制指南

### customStyle 自定义样式
通过 `customStyle` 属性可以直接设置选择器的内联样式。

```vue
<wd-col-picker 
  v-model="selectedValue" 
  :columns="columns" 
  label="自定义样式"
  :custom-style="{ backgroundColor: '#f0f2f5', borderRadius: '8px' }"
></wd-col-picker>
```

### customClass 自定义类名
通过 `customClass` 属性可以为选择器添加自定义类名，结合外部样式表进行更复杂的样式定制。

```vue
<wd-col-picker 
  v-model="selectedValue" 
  :columns="columns" 
  label="自定义类名"
  custom-class="my-col-picker"
></wd-col-picker>
```

```scss
.my-col-picker {
  // 自定义选择器样式
  margin: 10px 0;
  
  .wd-col-picker__cell {
    // 自定义选择器单元格样式
    padding: 12px 0;
  }
}
```

### 自定义触发器样式
使用 `default` 插槽可以完全自定义选择器的触发器样式。

```vue
<wd-col-picker 
  v-model="selectedValue" 
  :columns="columns"
  use-default-slot
>
  <view class="custom-trigger">
    <!-- 自定义内容 -->
  </view>
</wd-col-picker>
```

## 注意事项

### 常见问题解决方案
1. **数据不显示**：
   - 检查 `columns` 属性是否为二维数组
   - 确认 `valueKey` 和 `labelKey` 与数据结构匹配
   - 检查数据是否正确传递给组件

2. **级联选择不生效**：
   - 确保 `columnChange` 事件正确处理
   - 检查是否正确调用了 `resolve` 函数加载下一列数据
   - 确认异步数据加载逻辑正确

3. **表单验证不生效**：
   - 确保组件被包裹在 `wd-form` 组件内
   - 检查 `prop` 属性是否正确设置
   - 确认 `rules` 属性格式正确

4. **弹窗层级问题**：
   - 调整 `zIndex` 属性值
   - 尝试设置 `rootPortal` 为 `true`

5. **底部安全距离问题**：
   - 确保 `safeAreaInsetBottom` 属性设置为 `true`
   - 检查是否需要调整自定义样式以适应安全距离

### 性能优化建议
- 避免一次性加载大量数据，使用 `columnChange` 事件动态加载
- 对于静态数据，尽量在组件外部定义，避免每次渲染重新创建
- 减少 `displayFormat` 函数中的复杂计算
- 避免频繁修改 `columns` 属性

### 使用限制条件
- `columns` 属性必须是二维数组
- `modelValue` 属性必须是数组格式
- 级联选择需要正确实现 `columnChange` 事件
- 表单验证需要结合 `wd-form` 组件使用
- 自定义触发器需要设置 `use-default-slot` 为 `true`
