# Picker 选择器

<demo-model url="/subPages/picker/Index"></demo-model>

## 组件概况

### 组件概述
选择器组件用于从预设的选项中选择一个或多个值，通常用于表单、设置页、数据筛选等场景。wd-picker 组件提供了灵活的配置选项，支持单列/多列选择、自定义数据源、加载状态、确认前校验等功能。

### 详细功能描述
- 支持单列和多列选择
- 支持自定义数据源
- 支持加载状态
- 支持确认前校验
- 支持自定义标题和按钮文案
- 支持禁用和只读状态
- 支持表单验证
- 支持自定义展示格式
- 支持列联动
- 支持清空按钮
- 支持根节点样式定制
- 支持弹出层层级设置
- 支持根节点脱离文档流

### 适用业务场景
- 表单中的选择字段
- 数据筛选和排序
- 设置页面的选项选择
- 日期和时间选择
- 地址选择
- 商品规格选择

## 完整API参考

### Props属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
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
| useDefaultSlot | boolean | false | 否 | 使用默认插槽（已废弃） |
| useLabelSlot | boolean | false | 否 | 使用标签插槽（已废弃） |
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
| immediateChange | boolean | false | 否 | 是否在手指松开时立即触发 change 事件。若不开启则会在滚动动画结束后触发 change 事件，1.2.25版本起提供，仅微信小程序和支付宝小程序支持 |
| rootPortal | boolean | false | 否 | 是否从页面中脱离出来，用于解决各种 fixed 失效问题 (H5: teleport, APP: renderjs, 小程序: root-portal) |
| clearable | boolean | false | 否 | 显示清空按钮 |
| markerSide | string | 'before' | 否 | 必填标记位置，可选值：before、after |
| customLabelClass | string | '' | 否 | label 外部自定义样式 |
| customValueClass | string | '' | 否 | value 外部自定义样式 |
| customViewClass | string | '' | 否 | pickerView 外部自定义样式 |
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |

### Events事件

| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| confirm | 点击确认按钮时 | { value: any, selectedItems: any[] } - 选中值和选中项 |
| open | 打开选择器时 | - |
| cancel | 点击取消按钮时 | - |
| clear | 点击清空按钮时 | - |
| update:modelValue | 选中值改变时 | value: any - 选中值 |

### Methods方法

| 方法名 | 参数 | 返回值 | 功能说明 |
|--------|------|--------|----------|
| open | - | - | 打开picker弹框 |
| close | - | - | 关闭picker弹框 |
| setLoading | loading: boolean | - | 设置加载状态 |

### Slots插槽

| 插槽名 | 作用域变量 | 使用说明 |
|--------|------------|----------|
| default | - | 自定义选择器内容 |
| label | - | 自定义标签内容 |

## 多场景使用示例代码

### 1. 基础用法

```vue
<template>
  <view class="picker-demo">
    <wd-picker 
      v-model="selectedValue" 
      label="性别" 
      :columns="columns"
      @confirm="onConfirm"
    />
    <view class="picker-info">选中值：{{ selectedValue }}</view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const selectedValue = ref('')
const columns = ['男', '女', '保密']

const onConfirm = (params: { value: any, selectedItems: any[] }) => {
  console.log('选择结果', params)
}
</script>

<style scoped>
.picker-demo {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.picker-info {
  font-size: 16px;
  color: #666;
}
</style>
```

### 2. 对象数组数据源

```vue
<template>
  <view class="picker-demo">
    <wd-picker 
      v-model="selectedValue" 
      label="城市" 
      :columns="columns"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const selectedValue = ref('')
const columns = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '广州', value: 'guangzhou' },
  { label: '深圳', value: 'shenzhen' }
]
</script>
```

### 3. 多列联动

```vue
<template>
  <view class="picker-demo">
    <wd-picker 
      v-model="selectedValue" 
      label="地址" 
      :columns="columns" 
      :column-change="onColumnChange"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const selectedValue = ref(['beijing', 'chaoyang'])

const columns = ref([
  [
    { label: '北京', value: 'beijing' },
    { label: '上海', value: 'shanghai' }
  ],
  [
    { label: '朝阳区', value: 'chaoyang' },
    { label: '海淀区', value: 'haidian' }
  ]
])

const cityAreas = {
  beijing: [
    { label: '朝阳区', value: 'chaoyang' },
    { label: '海淀区', value: 'haidian' },
    { label: '东城区', value: 'dongcheng' }
  ],
  shanghai: [
    { label: '浦东新区', value: 'pudong' },
    { label: '徐汇区', value: 'xuhui' },
    { label: '黄浦区', value: 'huangpu' }
  ]
}

const onColumnChange = (picker: any, value: any, index: number, resolve: any) => {
  if (index === 0) {
    const city = value[0]
    picker.setColumnData(1, cityAreas[city])
  }
  resolve()
}
</script>
```

### 4. 自定义展示格式

```vue
<template>
  <view class="picker-demo">
    <wd-picker 
      v-model="selectedValue" 
      label="商品规格" 
      :columns="columns" 
      :display-format="displayFormat"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const selectedValue = ref(['red', 's'])
const columns = [
  [{ label: '红色', value: 'red' }, { label: '蓝色', value: 'blue' }],
  [{ label: 'S', value: 's' }, { label: 'M', value: 'm' }, { label: 'L', value: 'l' }]
]

const displayFormat = (items: any, { valueKey, labelKey }: { valueKey: string, labelKey: string }) => {
  if (!Array.isArray(items)) {
    return items[labelKey]
  }
  return items.map(item => item[labelKey]).join(' - ')
}
</script>
```

### 5. 带清空按钮

```vue
<template>
  <view class="picker-demo">
    <wd-picker 
      v-model="selectedValue" 
      label="兴趣爱好" 
      :columns="columns"
      clearable
      @clear="onClear"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const selectedValue = ref('')
const columns = ['篮球', '足球', '羽毛球', '乒乓球']

const onClear = () => {
  console.log('清空选择')
}
</script>
```

## 样式定制指南

### customStyle 用法
使用 customStyle 属性可以自定义选择器的内联样式，例如修改高度、宽度、背景色等。

```vue
<wd-picker 
  v-model="selectedValue" 
  label="性别" 
  :columns="columns"
  custom-style="background-color: #f5f7fa; padding: 10px;"
/>
```

### customClass 用法
使用 customClass 属性可以为选择器添加自定义样式类，便于在外部 CSS 中进行样式定制。

```vue
<wd-picker 
  v-model="selectedValue" 
  label="性别" 
  :columns="columns"
  custom-class="my-picker"
/>

<style scoped>
:deep(.my-picker) {
  --wd-picker-label-color: #333;
  --wd-picker-value-color: #606266;
  --wd-picker-placeholder-color: #909399;
  --wd-picker-border-color: #e4e7ed;
}
</style>
```

## 注意事项

1. **数据源格式**：columns 属性支持字符串数组、对象数组和二维数组，分别对应不同的选择器类型。

2. **双向绑定**：组件支持使用 v-model 双向绑定选中值，也可以使用 :model-value 和 @update:model-value 手动绑定。

3. **columnChange 事件**：用于处理多列联动逻辑，接收 pickerView 实例、选中值、当前修改列的下标和 resolve 函数作为参数。

4. **displayFormat 函数**：用于自定义选择器的展示格式，接收选中项和配置对象作为参数，返回一个字符串。

5. **beforeConfirm 函数**：用于在确认前进行校验，接收选中值、resolve 函数和 picker 实例作为参数，通过调用 resolve(true/false) 决定是否继续确认。

6. **loading 属性**：用于控制选择器的加载状态，当 loading 为 true 时，确认按钮会显示为加载状态，无法点击。

7. **rootPortal 属性**：用于解决弹出层在某些场景下 fixed 定位失效的问题，支持 H5、APP 和小程序。

8. **clearable 属性**：当 clearable 为 true 时，选择器会显示清空按钮，点击清空按钮会清空选中值并触发 clear 事件。

9. **markerSide 属性**：用于设置必填标记的位置，可选值为 'before' 和 'after'。

10. **兼容性**：组件在不同平台上的表现可能略有差异，特别是在根节点脱离文档流和立即触发 change 事件方面。

11. **性能优化**：对于大数据量的场景，建议使用虚拟滚动或分页加载，避免一次性渲染过多选项。

12. **表单校验**：组件支持结合 wd-form 组件使用，通过 prop 和 rules 属性进行表单校验。