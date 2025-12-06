# DateStrip 日期选择条组件

<demo-model url="/subPages/dateStrip/Index"></demo-model>


## 组件概况

### 组件概述
DateStrip 组件是一个用于日期选择的水平滚动条组件，支持周模式和平铺模式两种展示方式，可自定义日期范围、样式、高亮模式等，常用于日历选择、日期筛选、日程安排等场景。

### 详细功能描述
- 支持周模式（按周切换）和平铺模式（水平滚动展示所有日期）
- 支持自定义日期范围（最小日期和最大日期）
- 支持农历显示
- 支持自定义选中样式和高亮模式
- 支持日期禁用和格式化
- 支持自定义每格日期的宽度和圆角
- 支持自定义背景色和高度
- 支持从任意星期几开始显示
- 支持日期补零显示
- 支持响应式设计，自动滚动到选中日期
- 支持禁用特定日期
- 支持自定义日期底部信息

### 适用业务场景
- 日历应用的日期选择条
- 酒店、机票预订的日期选择器
- 日程安排的日期导航
- 数据统计的日期筛选
- 活动报名的日期选择
- 考勤打卡的日期选择

## 完整API参考

### Props
| 名称 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| modelValue | number | 0 | 否 | 选中的值（时间戳） |
| defaultDate | string / number | '' | 否 | 默认选中的日期（时间戳或日期字符串） |
| mode | string | week | 否 | 切换模式：'none' 平铺展示所有日期，'week' 按周方式切换 |
| minDate | number | 0 | 否 | 可选择的最小日期（时间戳） |
| maxDate | number | 0 | 否 | 可选择的最大日期（时间戳） |
| height | string | 55px | 否 | 插件高度 |
| itemWidth | string | 50px | 否 | 每格日期宽度 |
| itemRound | string | 6px | 否 | 每格日期圆角 |
| activeBgColor | string | #3c9cff | 否 | 选中框背景色 |
| activeColor | string | #ffffff | 否 | 选中框文本色 |
| activeStyle | object | {} | 否 | 选中框样式 |
| bgColor | string | '' | 否 | 横条背景色 |
| round | string | '' | 否 | 横条圆角 |
| firstDayOfWeek | number | 0 | 否 | 第一天从星期几开始，默认 0 = 周日 |
| activeMode | string | both | 否 | 高亮模式：'both' 同时高亮星期和日期，'date' 只高亮日期，'text' 只高亮文本 |
| formatter | function / null | null | 否 | 日期格式化函数 |
| monthNum | number / string | 1 | 否 | 最多展示月份数量 |
| disabledFun | function / null | null | 否 | 禁止选择的日期函数 |
| disabledDate | array / string / null | null | 否 | 禁止选择的日期列表 |
| disabledColor | string | #c8c9cc | 否 | 禁用日期的文字颜色 |
| showLunar | boolean | false | 否 | 是否显示农历 |
| padZero | boolean | false | 否 | 是否对小于10的数字补0 |
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |

### Events
| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| update:value | 选中日期变化时触发 | value: number - 选中日期的时间戳 |
| change | 选中日期变化时触发 | data: { weekday: string, date: string/number, timestamp: number, lunar?: any } - 选中日期的详细信息 |

### Methods
| 方法名 | 参数 | 返回值 | 功能说明 |
| --- | --- | --- | --- |
| setFormatter | formatter: function | - | 设置日期格式化函数（用于微信小程序中不支持将函数作为props传递的情况） |

### Slots
| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |

## 多场景使用示例代码

### 基础用法
```vue
<template>
  <view>
    <!-- 基础日期选择条 -->
    <wd-date-strip v-model="selectedDate" @change="handleChange" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedDate = ref<number>(Date.now())

const handleChange = (data: any) => {
  console.log('选中的日期：', data)
}
</script>
```

### 平铺模式
```vue
<template>
  <view>
    <!-- 平铺模式的日期选择条 -->
    <wd-date-strip 
      v-model="selectedDate" 
      mode="none" 
      show-lunar
      :month-num="2"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedDate = ref<number>(Date.now())
</script>
```

### 自定义样式
```vue
<template>
  <view>
    <!-- 自定义样式的日期选择条 -->
    <wd-date-strip 
      v-model="selectedDate"
      active-bg-color="#ff6b6b"
      active-color="#fff"
      height="60px"
      item-width="55px"
      item-round="8px"
      bg-color="#f8f9fa"
      round="10px"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedDate = ref<number>(Date.now())
</script>
```

### 自定义日期范围和高亮模式
```vue
<template>
  <view>
    <!-- 自定义日期范围和高亮模式 -->
    <wd-date-strip 
      v-model="selectedDate"
      mode="none"
      active-mode="date"
      :min-date="minDate"
      :max-date="maxDate"
      first-day-of-week="1"
      pad-zero
    />
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import dayjs from 'dayjs'

const selectedDate = ref<number>(Date.now())
const minDate = computed(() => dayjs().subtract(1, 'month').valueOf())
const maxDate = computed(() => dayjs().add(1, 'month').valueOf())
</script>
```

### 禁用特定日期
```vue
<template>
  <view>
    <!-- 禁用特定日期的日期选择条 -->
    <wd-date-strip 
      v-model="selectedDate"
      :disabled-date="disabledDates"
      :disabled-fun="disabledFun"
    />
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import dayjs from 'dayjs'

const selectedDate = ref<number>(Date.now())

// 禁用特定日期列表
const disabledDates = computed(() => {
  const today = dayjs()
  return [
    today.add(1, 'day').valueOf(),
    today.add(2, 'day').valueOf(),
    today.add(5, 'day').valueOf()
  ]
})

// 禁用函数：禁用周末
const disabledFun = (day: any) => {
  // 禁用周六和周日
  if (day.weekday === '六' || day.weekday === '日') {
    return true
  }
  // 可以返回数组，第一个元素表示是否禁用，第二个元素表示底部信息
  return [false, '']
}
</script>
```

## 样式定制指南

### customStyle 用法
使用 `customStyle` 属性可以直接为日期选择条添加内联样式：
```vue
<wd-date-strip custom-style="box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); margin: 10px;" />
```

### customClass 用法
通过 `customClass` 属性可以为组件添加自定义CSS类：
```vue
<wd-date-strip custom-class="my-date-strip" />

<style>
.my-date-strip {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 10px;
  padding: 5px;
}
</style>
```

### 主题变量
组件支持通过CSS变量进行样式定制，主要样式变量包括：
- 日期项宽度和高度
- 文字颜色和大小
- 选中状态样式
- 禁用状态样式

## 注意事项

1. **日期格式**: 所有日期相关的属性（`modelValue`, `defaultDate`, `minDate`, `maxDate`）都支持时间戳或日期字符串格式。
2. **模式切换**: `mode` 属性控制组件的展示方式，'week' 为按周切换，'none' 为平铺展示所有日期。
3. **高亮模式**: `activeMode` 属性控制选中状态的高亮方式，可选值为 'both'（同时高亮星期和日期）、'date'（只高亮日期）、'text'（只高亮文本）。
4. **禁用日期**: 可以通过 `disabledDate` 属性（禁用日期列表）和 `disabledFun` 属性（禁用日期函数）两种方式禁用特定日期。
5. **农历显示**: 当 `showLunar` 为 `true` 时，会在日期下方显示农历信息。
6. **补零显示**: 当 `padZero` 为 `true` 时，小于10的日期会补零显示（如 "01" 而不是 "1"）。
7. **月份数量**: `monthNum` 属性控制最多展示的月份数量，默认为1个月。
8. **第一天设置**: `firstDayOfWeek` 属性控制每周从星期几开始，默认值为0（周日）。
9. **微信小程序兼容**: 在微信小程序中，不支持将函数作为props传递，需要使用 `setFormatter` 方法来设置格式化函数。
10. **性能优化**: 当日期范围较大时，建议使用 'week' 模式，避免一次性渲染过多日期项导致性能问题。
