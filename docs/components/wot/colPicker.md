# 列选择器组件（wd-col-picker）

## 组件概述

wd-col-picker 是一个基于多级联动的列选择器组件，用于实现省市区选择、分类选择等多级选择场景。它支持自定义数据源、动态加载数据、自定义展示格式等功能，提供了丰富的配置选项和灵活的定制能力。

### 功能描述
- 支持多级联动选择
- 支持动态加载数据
- 支持自定义展示格式
- 支持表单验证
- 支持自定义样式和类名
- 支持确定前校验
- 支持自动补全数据
- 支持只读和禁用状态

### 适用业务场景
- 省市区联动选择
- 分类筛选选择
- 多级菜单选择
- 表单中的多级选择字段
- 商品规格选择
- 日期时间选择（年/月/日/时/分/秒）

### 组件设计理念
wd-col-picker 组件采用了模块化设计，将选择器的触发区域和弹出层分离，便于维护和扩展。组件使用了 Vue 3 的 Composition API 和 TypeScript，确保了类型安全和代码可维护性。组件设计考虑了跨平台兼容性和性能优化，提供了丰富的配置选项，允许开发者根据实际需求进行定制。

组件的核心实现基于 action-sheet 弹出层和 scroll-view 滚动视图，确保了良好的用户体验和流畅的交互效果。组件支持动态加载数据，能够处理大数据量的多级选择场景。

## 完整 API 参考

### Props

| 名称 | 类型 | 默认值 | 必填项 | 描述 |
| --- | --- | --- | --- | --- |
| modelValue | array | - | 是 | 选中项，为字符串或数字数组 |
| columns | array | [] | 否 | 选择器数据，二维数组 |
| label | string | - | 否 | 选择器左侧文案 |
| labelWidth | string | '33%' | 否 | 设置左侧标题宽度 |
| useLabelSlot | boolean | false | 否 | 使用 label 插槽时设置该选项 |
| useDefaultSlot | boolean | false | 否 | 使用默认插槽时设置该选项 |
| disabled | boolean | false | 否 | 禁用 |
| readonly | boolean | false | 否 | 只读 |
| placeholder | string | - | 否 | 选择器占位符 |
| title | string | - | 否 | 弹出层标题 |
| columnChange | function | - | 否 | 接收当前列的选中项 item、当前列下标、当前列选中项下标下一列数据处理函数 resolve、结束选择 finish |
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
| lineWidth | number / string | - | 否 | 底部条宽度，单位像素 |
| lineHeight | number / string | - | 否 | 底部条高度，单位像素 |
| customViewClass | string | '' | 否 | 自定义视图类名 |
| customLabelClass | string | '' | 否 | label 外部自定义样式 |
| customValueClass | string | '' | 否 | value 外部自定义样式 |
| rootPortal | boolean | false | 否 | 是否从页面中脱离出来，用于解决各种 fixed 失效问题 (H5: teleport, APP: renderjs, 小程序: root-portal) |
| markerSide | string | 'before' | 否 | 必填标记位置，可选值：before、after |
| customStyle | object | - | 否 | 自定义样式，用于覆盖组件默认样式 |
| customClass | string | - | 否 | 自定义类名，用于扩展组件样式 |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| update:modelValue | 选中值变化时 | value: array - 选中的选项值数组 |
| confirm | 点击确定按钮时 | { value: array, selectedItems: array } - 包含选中值和选中项对象数组的对象 |
| close | 关闭选择器时 | - |

### Methods

| 方法名 | 参数 | 返回值 | 功能说明 |
| --- | --- | --- | --- |
| open | - | void | 打开选择器 |
| close | - | void | 关闭选择器 |

### Slots

| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| default | - | 自定义选择器内容，仅在 useDefaultSlot 为 true 时生效 |
| label | - | 自定义标签内容，仅在 useLabelSlot 为 true 时生效 |

## 多场景使用示例代码

### 基础用法

```vue
<template>
  <wd-col-picker
    v-model="selected"
    :columns="columns"
    label="选择分类"
    placeholder="请选择分类"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const selected = ref<string[]>(['1', '1-1', '1-1-1'])

const columns = ref<Record<string, any>[][]>([
  [
    { label: '分类1', value: '1' },
    { label: '分类2', value: '2' },
    { label: '分类3', value: '3' }
  ],
  [
    { label: '分类1-1', value: '1-1' },
    { label: '分类1-2', value: '1-2' },
    { label: '分类1-3', value: '1-3' }
  ],
  [
    { label: '分类1-1-1', value: '1-1-1' },
    { label: '分类1-1-2', value: '1-1-2' },
    { label: '分类1-1-3', value: '1-1-3' }
  ]
])
</script>
```

### 动态加载数据

```vue
<template>
  <wd-col-picker
    v-model="selected"
    :columns="columns"
    label="选择地区"
    placeholder="请选择地区"
    :column-change="handleColumnChange"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const selected = ref<string[]>(['1', '1-1', '1-1-1'])
const columns = ref<Record<string, any>[][]>([
  [
    { label: '北京市', value: '1' },
    { label: '上海市', value: '2' },
    { label: '广州市', value: '3' }
  ]
])

// 模拟异步获取数据
const fetchData = (parentValue: string): Promise<Record<string, any>[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const dataMap: Record<string, Record<string, any>[]> = {
        '1': [
          { label: '东城区', value: '1-1' },
          { label: '西城区', value: '1-2' },
          { label: '朝阳区', value: '1-3' }
        ],
        '2': [
          { label: '黄浦区', value: '2-1' },
          { label: '徐汇区', value: '2-2' },
          { label: '长宁区', value: '2-3' }
        ],
        '3': [
          { label: '天河区', value: '3-1' },
          { label: '越秀区', value: '3-2' },
          { label: '海珠区', value: '3-3' }
        ],
        '1-1': [
          { label: '王府井', value: '1-1-1' },
          { label: '东单', value: '1-1-2' }
        ],
        '1-2': [
          { label: '西单', value: '1-2-1' },
          { label: '金融街', value: '1-2-2' }
        ]
      }
      resolve(dataMap[parentValue] || [])
    }, 500)
  })
}

// 列变化处理函数
const handleColumnChange = async ({ selectedItem, index, rowIndex, resolve, finish }: any) => {
  if (index === 2) {
    // 最后一列，结束选择
    finish()
    return
  }
  
  // 动态加载下一列数据
  const nextColumn = await fetchData(selectedItem.value)
  resolve(nextColumn)
}
</script>
```

### 自定义展示格式

```vue
<template>
  <wd-col-picker
    v-model="selected"
    :columns="columns"
    label="选择日期"
    placeholder="请选择日期"
    :display-format="customDisplayFormat"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const selected = ref<string[]>(['2024', '05', '15'])

const columns = ref<Record<string, any>[][]>([
  [
    { label: '2022', value: '2022' },
    { label: '2023', value: '2023' },
    { label: '2024', value: '2024' },
    { label: '2025', value: '2025' }
  ],
  [
    { label: '01', value: '01' },
    { label: '02', value: '02' },
    { label: '03', value: '03' },
    { label: '04', value: '04' },
    { label: '05', value: '05' },
    { label: '06', value: '06' },
    { label: '07', value: '07' },
    { label: '08', value: '08' },
    { label: '09', value: '09' },
    { label: '10', value: '10' },
    { label: '11', value: '11' },
    { label: '12', value: '12' }
  ],
  [
    { label: '01', value: '01' },
    { label: '02', value: '02' },
    { label: '03', value: '03' },
    { label: '04', value: '04' },
    { label: '05', value: '05' },
    { label: '06', value: '06' },
    { label: '07', value: '07' },
    { label: '08', value: '08' },
    { label: '09', value: '09' },
    { label: '10', value: '10' },
    { label: '11', value: '11' },
    { label: '12', value: '12' },
    { label: '13', value: '13' },
    { label: '14', value: '14' },
    { label: '15', value: '15' }
  ]
])

// 自定义展示格式
const customDisplayFormat = (selectedItems: Record<string, any>[]) => {
  return selectedItems.map(item => item.label).join('-')
}
</script>
```

### 表单验证

```vue
<template>
  <wd-form ref="formRef" v-model="form" :rules="rules">
    <wd-col-picker
      v-model="form.category"
      :columns="columns"
      label="选择分类"
      placeholder="请选择分类"
      prop="category"
    />
    <view class="form-actions">
      <wd-button type="primary" @click="submitForm">提交</wd-button>
    </view>
  </wd-form>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import type { FormInstance } from '@/uni_modules/wot-ui-plus/components/wd-form/types'

const formRef = ref<FormInstance>()
const form = reactive({
  category: ['']
})
const rules = {
  category: [{ required: true, message: '请选择分类' }]
}

const columns = ref<Record<string, any>[][]>([
  [
    { label: '分类1', value: '1' },
    { label: '分类2', value: '2' }
  ],
  [
    { label: '分类1-1', value: '1-1' },
    { label: '分类1-2', value: '1-2' }
  ]
])

const submitForm = async () => {
  const { valid, errors } = await formRef.value?.validate()
  if (valid) {
    uni.showToast({
      title: '表单验证通过',
      icon: 'success'
    })
  } else {
    console.log('表单验证失败', errors)
  }
}
</script>

<style scoped>
.form-actions {
  display: flex;
  gap: 20rpx;
  padding: 20rpx;
  justify-content: center;
}
</style>
```

## 样式定制指南

### customStyle 和 customClass

wd-col-picker 组件支持通过 `customStyle` 和 `customClass` 进行样式定制。

```vue
<template>
  <wd-col-picker
    v-model="selected"
    :columns="columns"
    label="选择分类"
    :custom-style="{ backgroundColor: '#f5f5f5', padding: '10rpx' }"
    custom-class="custom-col-picker"
  />
</template>

<style scoped>
.custom-col-picker {
  /* 自定义类名样式 */
  border-radius: 10rpx;
  margin-bottom: 20rpx;
}

/* 可以通过深度选择器修改组件内部样式 */
:deep(.wd-col-picker__title) {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
}
</style>
```

### 自定义弹出层样式

可以通过修改 CSS 变量来定制弹出层的样式：

```vue
<template>
  <wd-col-picker v-model="selected" :columns="columns" label="选择分类" />
</template>

<style>
/* 定制弹出层背景色 */
:root {
  --wd-col-picker-bg-color: #f5f5f5;
  --wd-col-picker-header-bg-color: #fff;
  --wd-col-picker-title-color: #333;
  --wd-col-picker-confirm-bg-color: #fff;
}
</style>
```

## 注意事项

1. **数据格式**：
   - `modelValue` 属性接受字符串或数字数组
   - `columns` 属性必须是二维数组，每一列的数据必须是对象数组
   - 选项对象必须包含 `value` 和 `label` 属性（或通过 `valueKey` 和 `labelKey` 自定义）

2. **动态加载数据**：
   - 通过 `columnChange` 回调函数可以实现动态加载数据
   - 回调函数接收 `selectedItem`、`index`、`rowIndex`、`resolve` 和 `finish` 参数
   - 调用 `resolve` 函数来更新下一列数据
   - 调用 `finish` 函数来结束选择

3. **表单验证**：
   - 可以结合 `wd-form` 组件使用，通过 `prop` 和 `rules` 属性进行表单验证
   - 支持必填验证、自定义验证规则等

4. **性能优化**：
   - 对于大量数据，建议使用虚拟滚动或分页加载
   - 避免在 `columnChange` 回调中执行复杂的计算或异步操作
   - 对于频繁变化的数据，建议使用 `computed` 属性来优化性能

5. **跨平台兼容性**：
   - 组件支持 H5、小程序和 App 平台
   - 部分功能（如 `root-portal`）可能在不同平台上表现不同，需要测试验证
   - 在小程序平台上，建议使用 `useDefaultSlot` 属性来优化性能

6. **样式定制**：
   - 可以通过 `customStyle` 和 `customClass` 属性进行样式定制
   - 可以通过修改 CSS 变量来定制弹出层的样式
   - 建议使用深度选择器 `:deep()` 来修改组件内部样式

7. **使用限制**：
   - 组件的 `modelValue` 属性必须是数组类型
   - 组件的 `columns` 属性必须是二维数组
   - 组件本身不支持搜索功能，需要结合外部组件实现

## 组件架构与实现

wd-col-picker 组件采用了 Vue 3 的 Composition API 和 TypeScript，主要包含以下部分：

1. **组件主体**：`wd-col-picker.vue`，负责选择器的整体布局和交互逻辑
2. **类型定义**：`types.ts`，包含组件的属性、事件和接口定义
3. **样式文件**：`index.scss`，包含组件的样式定义
4. **依赖组件**：
   - `wd-action-sheet`：弹出层组件，用于显示选择器内容
   - `wd-cell`：单元格组件，用于显示选择器的标签和值
   - `wd-icon`：图标组件，用于显示箭头、勾选等图标
   - `wd-loading`：加载组件，用于动态加载数据时的加载状态

组件的核心实现原理：

1. **数据绑定**：通过 `modelValue` 属性实现双向绑定
2. **弹出层**：使用 `wd-action-sheet` 组件实现弹出层效果
3. **滚动视图**：使用 `scroll-view` 组件实现选择器的横向滚动
4. **动态加载**：通过 `columnChange` 回调函数实现动态加载数据
5. **事件处理**：通过 emit 触发各种事件，实现组件与外部的通信
6. **方法暴露**：通过 `defineExpose` 暴露 `open` 和 `close` 方法，允许外部控制组件

## 总结

wd-col-picker 是一个功能强大、高度可定制的多级联动选择器组件，适用于省市区选择、分类选择、日期时间选择等多种场景。它基于 Vue 3 + TypeScript + UniApp 开发，具有良好的跨平台兼容性和性能表现。组件提供了丰富的配置选项和灵活的定制能力，可以满足各种复杂的多级选择需求。

通过合理使用 wd-col-picker 组件，可以提高表单开发效率，提升用户体验，确保选择数据的准确性和一致性。在使用过程中，建议根据实际需求调整组件的配置选项，以达到最佳的使用效果。