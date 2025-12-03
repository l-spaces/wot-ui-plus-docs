# wd-picker 选择器

## 组件概述

wd-picker 是一个基于 UniApp 实现的跨平台选择器组件，提供了丰富的配置选项和灵活的使用方式。该组件支持单列选择、多列选择以及联动选择，适用于各种需要从预设选项中进行选择的场景，如日期选择、地区选择、商品分类选择等。

### 设计理念

- **模块化设计**：将选择器分为外层触发区域和内层选择视图两部分，便于单独定制和扩展
- **跨平台兼容**：基于 UniApp 实现，支持 iOS/Android App、H5 以及主流小程序
- **灵活配置**：提供丰富的属性配置，支持自定义样式、加载状态、禁用状态等
- **流畅交互**：支持平滑滚动选择，提供清晰的视觉反馈
- **易于集成**：与 wd-form 组件无缝集成，支持表单验证

### 适用场景

- 日期时间选择
- 地区选择
- 商品分类选择
- 性别、学历等基础信息选择
- 自定义联动选择场景

## API 参考

### Props

| 属性名 | 类型 | 默认值 | 必填项 | 描述 |
| --- | --- | --- | --- | --- |
| customClass | string | '' | 否 | 自定义类名 |
| customStyle | object | {} | 否 | 自定义样式 |
| customLabelClass | string | '' | 否 | label 外部自定义样式 |
| customValueClass | string | '' | 否 | value 外部自定义样式 |
| customViewClass | string | '' | 否 | pickerView 外部自定义样式 |
| label | string | - | 否 | 选择器左侧文案 |
| placeholder | string | - | 否 | 选择器占位符 |
| disabled | boolean | false | 否 | 是否禁用 |
| readonly | boolean | false | 否 | 是否只读 |
| loading | boolean | false | 否 | 加载中 |
| loadingColor | string | '#4D80F0' | 否 | 加载中颜色 |
| title | string | - | 否 | 弹出层标题 |
| cancelButtonText | string | - | 否 | 取消按钮文案 |
| confirmButtonText | string | - | 否 | 确认按钮文案 |
| required | boolean | false | 否 | 是否必填 |
| size | string | - | 否 | 尺寸 |
| labelWidth | string | '33%' | 否 | 设置左侧标题宽度 |
| useDefaultSlot | boolean | false | 否 | 使用默认插槽（已废弃，可直接使用默认插槽） |
| useLabelSlot | boolean | false | 否 | 使用标签插槽（已废弃，可直接使用标签插槽） |
| error | boolean | false | 否 | 错误状态 |
| alignRight | boolean | false | 否 | 右对齐 |
| beforeConfirm | function | - | 否 | 确定前校验函数，接收 (value, resolve, picker) 参数，通过 resolve 继续执行 picker，resolve 接收1个boolean参数 |
| closeOnClickModal | boolean | true | 否 | 点击蒙层关闭 |
| safeAreaInsetBottom | boolean | true | 否 | 底部安全区域内 |
| ellipsis | boolean | false | 否 | 文本溢出显示省略号 |
| columnsHeight | number | 217 | 否 | 选项总高度 |
| valueKey | string | 'value' | 否 | 选项值对应的键名 |
| labelKey | string | 'label' | 否 | 选项文本对应的键名 |
| modelValue | string / number / array | '' | 否 | 选中项，如果为多列选择器，则其类型应为数组 |
| columns | array | [] | 否 | 选择器数据，可以为字符串数组，也可以为对象数组，如果为二维数组，则为多列选择器 |
| columnChange | function | - | 否 | 接收 pickerView 实例、选中项、当前修改列的下标、resolve 作为入参，根据选中项和列下标进行判断，通过 pickerView 实例暴露出来的 setColumnData 方法修改其他列的数据源 |
| displayFormat | function | - | 否 | 自定义展示文案的格式化函数，返回一个字符串 |
| zIndex | number | 15 | 否 | 自定义层级 |
| prop | string | - | 否 | 表单域 model 字段名，在使用表单校验功能的情况下，该属性是必填的 |
| rules | array | [] | 否 | 表单验证规则，结合wd-form组件使用 |
| immediateChange | boolean | false | 否 | 是否在手指松开时立即触发 change 事件。若不开启则会在滚动动画结束后触发 change 事件，仅微信小程序和支付宝小程序支持 |
| rootPortal | boolean | false | 否 | 是否从页面中脱离出来，用于解决各种 fixed 失效问题 (H5: teleport, APP: renderjs, 小程序: root-portal) |
| clearable | boolean | false | 否 | 显示清空按钮 |
| markerSide | 'before' / 'after' | 'before' | 否 | 必填标记位置 |

### Events

| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| open | 打开选择器弹窗时 | - |
| close | 关闭选择器弹窗时 | - |
| change | 选择器选中值变化时 | { value: 选中值, selectedItems: 选中项对象 } |
| confirm | 点击确认按钮时 | { value: 选中值, selectedItems: 选中项对象 } |
| cancel | 点击取消按钮或蒙层时 | - |
| clear | 点击清空按钮时 | - |
| update:modelValue | 选中值变化时 | 新的选中值 |

### Methods

| 方法名 | 参数 | 返回值 | 功能说明 |
| --- | --- | --- | --- |
| open | - | - | 打开选择器弹窗 |
| close | - | - | 关闭选择器弹窗 |
| setLoading | loading: boolean | - | 设置加载状态 |

### Slots

| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| default | - | 自定义选择器触发区域内容 |
| label | - | 自定义左侧标签内容 |

## 使用示例

### 基础用法

```vue
<template>
  <wd-picker
    v-model="value"
    :columns="columns"
    label="基础选择器"
    placeholder="请选择"
    @confirm="handleConfirm"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const columns = ref([
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' }
])

const handleConfirm = (event: any) => {
  console.log('选择结果:', event.value)
}
</script>
```

### 多列选择

```vue
<template>
  <wd-picker
    v-model="value"
    :columns="columns"
    label="多列选择器"
    placeholder="请选择"
    @confirm="handleConfirm"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(['1', '1-1'])
const columns = ref([
  [
    { label: '选项1', value: '1' },
    { label: '选项2', value: '2' }
  ],
  [
    { label: '选项1-1', value: '1-1' },
    { label: '选项1-2', value: '1-2' }
  ]
])

const handleConfirm = (event: any) => {
  console.log('选择结果:', event.value)
}
</script>
```

### 自定义展示格式

```vue
<template>
  <wd-picker
    v-model="value"
    :columns="columns"
    label="自定义格式"
    placeholder="请选择"
    :displayFormat="displayFormat"
    @confirm="handleConfirm"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(['2023', '01'])
const columns = ref([
  ['2023', '2024', '2025'],
  ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
])

const displayFormat = (items: any[], vl: any) => {
  return `${items[0]}年${items[1]}月`
}

const handleConfirm = (event: any) => {
  console.log('选择结果:', event.value)
}
</script>
```

### 联动选择

```vue
<template>
  <wd-picker
    v-model="value"
    :columns="columns"
    label="联动选择器"
    placeholder="请选择"
    :columnChange="handleColumnChange"
    @confirm="handleConfirm"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(['1'])
const columns = ref([
  [
    { label: '选项1', value: '1' },
    { label: '选项2', value: '2' }
  ],
  [
    { label: '选项1-1', value: '1-1' },
    { label: '选项1-2', value: '1-2' }
  ]
])

const handleColumnChange = (pickerView: any, selects: any, index: number, resolve: any) => {
  if (index === 0) {
    const newColumns = selects[0].value === '1' 
      ? [
          { label: '选项1-1', value: '1-1' },
          { label: '选项1-2', value: '1-2' }
        ]
      : [
          { label: '选项2-1', value: '2-1' },
          { label: '选项2-2', value: '2-2' }
        ]
    pickerView.setColumnData(1, newColumns, 0)
  }
  resolve()
}

const handleConfirm = (event: any) => {
  console.log('选择结果:', event.value)
}
</script>
```

### 自定义触发区域

```vue
<template>
  <wd-picker
    v-model="value"
    :columns="columns"
    @confirm="handleConfirm"
  >
    <view class="custom-picker-trigger">
      <text class="custom-label">自定义触发区域</text>
      <text class="custom-value">{{ value || '请选择' }}</text>
      <wd-icon name="arrow-right" />
    </view>
  </wd-picker>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import wdIcon from '@/uni_modules/wot-ui-plus/components/wd-icon/wd-icon.vue'

const value = ref('')
const columns = ref([
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' }
])

const handleConfirm = (event: any) => {
  console.log('选择结果:', event.value)
}
</script>

<style scoped>
.custom-picker-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx;
  background-color: #f5f5f5;
  border-radius: 8rpx;
}

.custom-label {
  font-size: 28rpx;
  color: #333;
}

.custom-value {
  font-size: 28rpx;
  color: #666;
  margin-right: 10rpx;
}
</style>
```

## 样式定制

### 自定义触发区域样式

```vue
<wd-picker
  v-model="value"
  :columns="columns"
  label="自定义样式"
  placeholder="请选择"
  customClass="custom-picker"
  customLabelClass="custom-label"
  customValueClass="custom-value"
/>

<style scoped>
.custom-picker {
  /* 自定义选择器容器样式 */
  margin: 20rpx 0;
}

.custom-label {
  /* 自定义标签样式 */
  color: #4D80F0;
  font-weight: bold;
}

.custom-value {
  /* 自定义值样式 */
  color: #666;
  font-size: 28rpx;
}
</style>
```

### 自定义选择视图样式

```vue
<wd-picker
  v-model="value"
  :columns="columns"
  label="自定义选择视图"
  placeholder="请选择"
  customViewClass="custom-picker-view"
  :columnsHeight="250"
  :itemHeight="40"
/>

<style scoped>
.custom-picker-view {
  /* 自定义选择视图样式 */
  background-color: #fafafa;
}
</style>
```

## 注意事项

1. **数据格式要求**：
   - 单列选择器：columns 可以是一维数组（如 ['选项1', '选项2']）或包含 value 和 label 的对象数组
   - 多列选择器：columns 必须是二维数组，每一列数据格式与单列相同

2. **联动选择注意事项**：
   - 在 columnChange 事件中修改列数据时，需要调用 pickerView.setColumnData 方法
   - 如果 columnChange 是异步操作，需要调用 resolve 函数通知组件继续执行

3. **性能优化建议**：
   - 避免一次性加载大量数据，可考虑分页或异步加载
   - 对于固定数据，建议在组件外部定义，避免每次渲染重新创建

4. **平台差异**：
   - immediateChange 属性仅支持微信小程序和支付宝小程序
   - rootPortal 属性在不同平台有不同实现（H5: teleport, APP: renderjs, 小程序: root-portal）

5. **表单集成**：
   - 与 wd-form 组件集成时，需要设置 prop 和 rules 属性
   - 支持表单验证和错误状态显示

6. **自定义显示格式**：
   - 使用 displayFormat 函数可以自定义选择器触发区域的显示文本
   - 该函数接收选中项和配置对象作为参数，返回格式化后的字符串

## 常见问题

### Q: 如何实现级联选择？
A: 使用 columnChange 事件，当某一列的值发生变化时，根据当前选中值动态更新其他列的数据。

### Q: 如何自定义选择器的样式？
A: 可以通过 customClass、customStyle、customLabelClass、customValueClass 和 customViewClass 等属性来自定义不同部分的样式。

### Q: 如何设置默认选中值？
A: 通过 v-model 或 modelValue 属性设置默认选中值，注意数据类型要与 columns 中的 value 类型保持一致。

### Q: 如何禁用某些选项？
A: 在 columns 数据中为需要禁用的选项添加 disabled: true 属性。

### Q: 如何清空选择值？
A: 设置 clearable 属性为 true，会在选择器右侧显示清空按钮，点击可清空选择值。

## 浏览器兼容性

支持 iOS/Android App、H5 以及主流小程序（微信/支付宝/百度/字节跳动）。