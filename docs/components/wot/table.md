# Table 表格
<demo-model url="/subPages/table/Index"></demo-model>

## 组件概况

### 组件概述
表格组件是用于展示结构化数据的重要UI组件，提供了丰富的功能和灵活的配置选项。wd-table组件支持固定表头、列排序、斑马纹、边框、索引列等多种特性，适用于各种数据展示场景。

### 详细功能描述
- 支持固定表头，实现长表格滚动时表头固定
- 支持列排序功能，可配置升序、降序和重置
- 支持斑马纹表格样式，提高数据可读性
- 支持表格边框配置
- 支持显示/隐藏表头
- 支持自动省略超出2行的文本
- 支持显示索引列，可自定义索引列配置
- 支持行高配置
- 支持固定列功能
- 支持自定义空数据显示文本
- 支持自定义空数据区域高度
- 支持自定义表格高度

### 适用业务场景
- 数据列表展示
- 数据分析报表
- 后台管理系统数据展示
- 任何需要结构化数据展示的场景

## 完整API参考

### Props属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| data | Array<Record<string, any>> | - | 是 | 显示的数据 |
| border | boolean | true | 否 | 是否带有边框 |
| stripe | boolean | true | 否 | 是否为斑马纹表格 |
| height | string / number | - | 否 | Table 的高度 |
| rowHeight | number / string | 40 | 否 | 行高 |
| showHeader | boolean | true | 否 | 是否显示表头 |
| ellipsis | boolean | true | 否 | 是否超出2行隐藏 |
| index | boolean / object | false | 否 | 是否显示索引列，支持对象配置 |
| fixedHeader | boolean | true | 否 | 是否固定表头 |
| emptyText | string | 暂无数据 | 否 | 空数据时显示的文本 |
| emptyHeight | string / number | 100 | 否 | 空数据区域高度，单位为px |
| customStyle | string / object | - | 否 | 自定义样式 |
| customClass | string | - | 否 | 自定义类名 |

### Events事件

| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| sort-method | 列排序状态变化时触发 | column: TableColumn - 包含列信息和排序方向 |
| row-click | 行被点击时触发 | { rowIndex: number } - 点击行的索引 |

### Methods方法

该组件没有对外暴露的方法。

### Slots插槽

| 插槽名 | 作用域变量 | 使用说明 |
|--------|------------|----------|
| default | - | 用于放置 TableCol 组件 |
| empty | - | 自定义空数据显示内容 |

## 多场景使用示例代码

### 1. 基础用法
```vue
<template>
  <wd-table :data="tableData">
    <wd-table-col prop="name" label="姓名" width="150"></wd-table-col>
    <wd-table-col prop="age" label="年龄" width="100"></wd-table-col>
    <wd-table-col prop="gender" label="性别" width="100"></wd-table-col>
    <wd-table-col prop="address" label="地址" width="300"></wd-table-col>
  </wd-table>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 模拟表格数据
const tableData = ref([
  { name: '张三', age: 25, gender: '男', address: '北京市朝阳区' },
  { name: '李四', age: 30, gender: '女', address: '上海市浦东新区' },
  { name: '王五', age: 28, gender: '男', address: '广州市天河区' },
  { name: '赵六', age: 35, gender: '女', address: '深圳市南山区' },
  { name: '孙七', age: 22, gender: '男', address: '杭州市西湖区' }
])
</script>
```

### 2. 带排序功能的表格
```vue
<template>
  <wd-table :data="tableData" @sort-method="handleSort">
    <wd-table-col prop="name" label="姓名" width="150"></wd-table-col>
    <wd-table-col prop="age" label="年龄" width="100" sortable></wd-table-col>
    <wd-table-col prop="gender" label="性别" width="100"></wd-table-col>
    <wd-table-col prop="address" label="地址" width="300"></wd-table-col>
  </wd-table>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { TableColumn } from '@/uni_modules/wot-ui-plus/components/wd-table-col/types'

// 模拟表格数据
const tableData = ref([
  { name: '张三', age: 25, gender: '男', address: '北京市朝阳区' },
  { name: '李四', age: 30, gender: '女', address: '上海市浦东新区' },
  { name: '王五', age: 28, gender: '男', address: '广州市天河区' },
  { name: '赵六', age: 35, gender: '女', address: '深圳市南山区' },
  { name: '孙七', age: 22, gender: '男', address: '杭州市西湖区' }
])

// 处理排序事件
const handleSort = (column: TableColumn) => {
  console.log('Sort column:', column.prop, 'Direction:', column.sortDirection)
  // 根据排序条件处理数据
  if (column.sortDirection === 1) {
    // 升序
    tableData.value.sort((a, b) => a[column.prop] - b[column.prop])
  } else if (column.sortDirection === -1) {
    // 降序
    tableData.value.sort((a, b) => b[column.prop] - a[column.prop])
  }
}
</script>
```

### 3. 带索引列的表格
```vue
<template>
  <wd-table :data="tableData" :index="true">
    <wd-table-col prop="name" label="姓名" width="150"></wd-table-col>
    <wd-table-col prop="age" label="年龄" width="100"></wd-table-col>
    <wd-table-col prop="gender" label="性别" width="100"></wd-table-col>
    <wd-table-col prop="address" label="地址" width="300"></wd-table-col>
  </wd-table>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 模拟表格数据
const tableData = ref([
  { name: '张三', age: 25, gender: '男', address: '北京市朝阳区' },
  { name: '李四', age: 30, gender: '女', address: '上海市浦东新区' },
  { name: '王五', age: 28, gender: '男', address: '广州市天河区' },
  { name: '赵六', age: 35, gender: '女', address: '深圳市南山区' },
  { name: '孙七', age: 22, gender: '男', address: '杭州市西湖区' }
])
</script>
```

### 4. 自定义索引列和空数据
```vue
<template>
  <wd-table :data="emptyData" :index="{ label: '序号', width: '80rpx' }">
    <wd-table-col prop="name" label="姓名" width="150"></wd-table-col>
    <wd-table-col prop="age" label="年龄" width="100"></wd-table-col>
    <wd-table-col prop="gender" label="性别" width="100"></wd-table-col>
    <wd-table-col prop="address" label="地址" width="300"></wd-table-col>
    <template #empty>
      <view class="custom-empty">
        <wd-icon name="network" size="60"></wd-icon>
        <text class="empty-text">暂无数据，请稍后重试</text>
        <wd-button type="primary" size="small" @click="loadData">重新加载</wd-button>
      </view>
    </template>
  </wd-table>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 初始为空数据
const emptyData = ref([])

// 加载数据函数
const loadData = () => {
  // 模拟异步加载数据
  setTimeout(() => {
    emptyData.value = [
      { name: '张三', age: 25, gender: '男', address: '北京市朝阳区' },
      { name: '李四', age: 30, gender: '女', address: '上海市浦东新区' }
    ]
  }, 1000)
}
</script>

<style scoped>
.custom-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40rpx;
}

.empty-text {
  margin: 20rpx 0;
  color: #969799;
}
</style>
```

### 5. 固定列和自定义行高
```vue
<template>
  <wd-table :data="tableData" :row-height="50">
    <wd-table-col prop="name" label="姓名" width="150" fixed></wd-table-col>
    <wd-table-col prop="age" label="年龄" width="100"></wd-table-col>
    <wd-table-col prop="gender" label="性别" width="100"></wd-table-col>
    <wd-table-col prop="address" label="地址" width="300"></wd-table-col>
    <wd-table-col prop="phone" label="电话" width="200"></wd-table-col>
    <wd-table-col prop="email" label="邮箱" width="250"></wd-table-col>
    <wd-table-col prop="company" label="公司" width="200"></wd-table-col>
    <wd-table-col prop="position" label="职位" width="200"></wd-table-col>
  </wd-table>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 模拟大量数据
const tableData = ref(
  Array.from({ length: 20 }, (_, i) => ({
    name: `用户${i + 1}`,
    age: 20 + Math.floor(Math.random() * 30),
    gender: Math.random() > 0.5 ? '男' : '女',
    address: `北京市朝阳区街道${i + 1}号`,
    phone: `1380013800${i % 10}`,
    email: `user${i + 1}@example.com`,
    company: `公司${i + 1}`,
    position: `职位${i + 1}`
  }))
)
</script>
```

## 样式定制指南

### customStyle 用法
```vue
<template>
  <wd-table 
    :data="tableData" 
    :custom-style="{ backgroundColor: '#f5f7fa', borderRadius: '8px' }"
  >
    <wd-table-col prop="name" label="姓名" width="150"></wd-table-col>
    <wd-table-col prop="age" label="年龄" width="100"></wd-table-col>
    <wd-table-col prop="gender" label="性别" width="100"></wd-table-col>
    <wd-table-col prop="address" label="地址" width="300"></wd-table-col>
  </wd-table>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { name: '张三', age: 25, gender: '男', address: '北京市朝阳区' },
  { name: '李四', age: 30, gender: '女', address: '上海市浦东新区' }
])
</script>
```

### customClass 用法
```vue
<template>
  <wd-table :data="tableData" custom-class="my-table">
    <wd-table-col prop="name" label="姓名" width="150"></wd-table-col>
    <wd-table-col prop="age" label="年龄" width="100"></wd-table-col>
    <wd-table-col prop="gender" label="性别" width="100"></wd-table-col>
    <wd-table-col prop="address" label="地址" width="300"></wd-table-col>
  </wd-table>
</template>

<style lang="scss">
.my-table {
  background-color: #f5f7fa;
  border-radius: 8px;
  overflow: hidden;
  
  .wd-table__cell {
    font-size: 28rpx;
    
    &.is-header {
      background-color: #eef2f7;
      font-weight: bold;
    }
  }
}
</style>

<script setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { name: '张三', age: 25, gender: '男', address: '北京市朝阳区' },
  { name: '李四', age: 30, gender: '女', address: '上海市浦东新区' }
])
</script>
```

## 注意事项

1. 当表格数据量较大时，建议设置固定的`height`和`rowHeight`属性，以提高渲染性能
2. 列宽度`width`属性建议使用数字或带单位的字符串，如`100`或`100px`
3. 使用`sortable`属性时，需监听`sort-method`事件来自行处理数据排序
4. 固定列功能在移动端可能影响性能，建议谨慎使用
5. 当使用自定义索引列时，可通过`index`属性配置索引列的宽度、标题等
6. 表格数据`data`属性应是一个数组对象，每个对象代表一行数据
7. 空数据插槽`empty`可用于自定义空数据时的显示内容
8. 表格组件内部使用了`scroll-view`组件，在某些场景下可能与页面其他滚动区域产生冲突
9. 建议为每个`wd-table-col`组件提供唯一的`prop`属性
10. 当表格高度超过容器高度时，表格内容会自动滚动
