# TableCol 表格列
<demo-model url="/subPages/tableCol/Index"></demo-model>

## 组件概况

### 组件概述
表格列组件是表格组件的子组件，用于定义表格中的列配置和渲染逻辑。wd-table-col组件支持自定义列宽、对齐方式、排序功能和固定列等特性，是构建灵活表格布局的核心组件。

### 详细功能描述
- 支持自定义列对应的数据字段
- 支持自定义列标题
- 支持自定义列宽度
- 支持列排序功能
- 支持列固定功能
- 支持自定义列对齐方式（左对齐、居中、右对齐）
- 支持自定义单元格内容
- 支持响应式行高
- 集成表格的边框、斑马纹等样式
- 支持单元格点击事件
- 支持单元格内容自动省略

### 适用业务场景
- 与wd-table组件配合使用，构建完整表格
- 需要自定义列配置的表格
- 需要列排序功能的表格
- 需要固定列的表格
- 需要自定义单元格内容的表格

## 完整API参考

### Props属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| prop | string | - | 是 | 列对应字段 |
| label | string | - | 是 | 列对应字段标题 |
| width | number / string | 100 | 否 | 列宽度，单位px |
| sortable | boolean | false | 否 | 是否开启列排序 |
| fixed | boolean | false | 否 | 是否固定本列 |
| align | 'left' / 'center' / 'right' | left | 否 | 列的对齐方式 |

### Events事件

该组件没有直接暴露事件，但会触发父组件table的row-click事件。

### Methods方法

该组件没有对外暴露的方法。

### Slots插槽

| 插槽名 | 作用域变量 | 使用说明 |
|--------|------------|----------|
| value | { row: any, index: number } | 自定义单元格内容，row为当前行数据，index为行索引 |

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
  { name: '王五', age: 28, gender: '男', address: '广州市天河区' }
])
</script>
```

### 2. 带排序功能的列
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
  { name: '王五', age: 28, gender: '男', address: '广州市天河区' }
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

### 3. 固定列和自定义对齐方式
```vue
<template>
  <wd-table :data="tableData">
    <wd-table-col prop="name" label="姓名" width="150" fixed></wd-table-col>
    <wd-table-col prop="age" label="年龄" width="100" align="center"></wd-table-col>
    <wd-table-col prop="gender" label="性别" width="100" align="center"></wd-table-col>
    <wd-table-col prop="address" label="地址" width="300"></wd-table-col>
    <wd-table-col prop="phone" label="电话" width="200"></wd-table-col>
    <wd-table-col prop="email" label="邮箱" width="250"></wd-table-col>
    <wd-table-col prop="salary" label="薪资" width="150" align="right"></wd-table-col>
  </wd-table>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 模拟大量数据
const tableData = ref(
  Array.from({ length: 10 }, (_, i) => ({
    name: `用户${i + 1}`,
    age: 20 + Math.floor(Math.random() * 30),
    gender: Math.random() > 0.5 ? '男' : '女',
    address: `北京市朝阳区街道${i + 1}号`,
    phone: `1380013800${i % 10}`,
    email: `user${i + 1}@example.com`,
    salary: 5000 + Math.floor(Math.random() * 10000)
  }))
)
</script>
```

### 4. 自定义单元格内容
```vue
<template>
  <wd-table :data="tableData">
    <wd-table-col prop="name" label="姓名" width="150"></wd-table-col>
    <wd-table-col prop="age" label="年龄" width="100"></wd-table-col>
    <wd-table-col prop="gender" label="性别" width="100">
      <template #value="{ row }">
        <view class="gender-tag" :class="row.gender === '男' ? 'male' : 'female'">
          {{ row.gender }}
        </view>
      </template>
    </wd-table-col>
    <wd-table-col prop="status" label="状态" width="120">
      <template #value="{ row }">
        <wd-tag :type="row.status === 'active' ? 'success' : 'warning'" size="small">
          {{ row.status === 'active' ? '活跃' : '禁用' }}
        </wd-tag>
      </template>
    </wd-table-col>
    <wd-table-col prop="action" label="操作" width="180" align="center">
      <template #value="{ row }">
        <wd-button type="primary" size="mini" @click="edit(row)">编辑</wd-button>
        <wd-button type="error" size="mini" @click="deleteRow(row)" style="margin-left: 10rpx;">删除</wd-button>
      </template>
    </wd-table-col>
  </wd-table>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 模拟表格数据
const tableData = ref([
  { name: '张三', age: 25, gender: '男', status: 'active' },
  { name: '李四', age: 30, gender: '女', status: 'active' },
  { name: '王五', age: 28, gender: '男', status: 'disabled' },
  { name: '赵六', age: 35, gender: '女', status: 'active' },
  { name: '孙七', age: 22, gender: '男', status: 'disabled' }
])

// 编辑操作
const edit = (row: any) => {
  console.log('Edit row:', row)
  // 实现编辑逻辑
}

// 删除操作
const deleteRow = (row: any) => {
  console.log('Delete row:', row)
  // 实现删除逻辑
  const index = tableData.value.findIndex(item => item.name === row.name)
  if (index > -1) {
    tableData.value.splice(index, 1)
  }
}
</script>

<style scoped>
.gender-tag {
  padding: 8rpx 16rpx;
  border-radius: 16rpx;
  font-size: 24rpx;
  color: #fff;
  display: inline-block;
}

.gender-tag.male {
  background-color: #1989fa;
}

.gender-tag.female {
  background-color: #ee0a24;
}
</style>
```

### 5. 复杂数据结构处理
```vue
<template>
  <wd-table :data="tableData">
    <wd-table-col prop="name" label="姓名" width="150"></wd-table-col>
    <wd-table-col prop="company" label="公司信息" width="300">
      <template #value="{ row }">
        <view class="company-info">
          <text class="company-name">{{ row.company.name }}</text>
          <text class="company-address">{{ row.company.address }}</text>
        </view>
      </template>
    </wd-table-col>
    <wd-table-col prop="skills" label="技能" width="250">
      <template #value="{ row }">
        <view class="skills">
          <wd-tag 
            v-for="(skill, index) in row.skills" 
            :key="index" 
            size="small" 
            style="margin-right: 8rpx; margin-bottom: 8rpx;"
          >
            {{ skill }}
          </wd-tag>
        </view>
      </template>
    </wd-table-col>
    <wd-table-col prop="scores" label="评分" width="150" align="center">
      <template #value="{ row }">
        <wd-rate v-model="row.scores" readonly :size="24"></wd-rate>
      </template>
    </wd-table-col>
  </wd-table>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 模拟复杂数据结构
const tableData = ref([
  {
    name: '张三',
    company: {
      name: '科技有限公司',
      address: '北京市朝阳区'
    },
    skills: ['JavaScript', 'Vue', 'TypeScript'],
    scores: 4.5
  },
  {
    name: '李四',
    company: {
      name: '互联网公司',
      address: '上海市浦东新区'
    },
    skills: ['React', 'Node.js', 'MongoDB'],
    scores: 4.2
  },
  {
    name: '王五',
    company: {
      name: '软件开发公司',
      address: '广州市天河区'
    },
    skills: ['Python', 'Django', 'MySQL'],
    scores: 4.8
  }
])
</script>

<style scoped>
.company-info {
  display: flex;
  flex-direction: column;
}

.company-name {
  font-weight: bold;
  margin-bottom: 4rpx;
}

.company-address {
  font-size: 24rpx;
  color: #969799;
}

.skills {
  display: flex;
  flex-wrap: wrap;
}
</style>
```

## 样式定制指南

### 自定义单元格样式
```vue
<template>
  <wd-table :data="tableData">
    <wd-table-col prop="name" label="姓名" width="150"></wd-table-col>
    <wd-table-col prop="age" label="年龄" width="100"></wd-table-col>
    <wd-table-col prop="gender" label="性别" width="100"></wd-table-col>
    <wd-table-col prop="address" label="地址" width="300">
      <template #value="{ row }">
        <text class="custom-address">{{ row.address }}</text>
      </template>
    </wd-table-col>
  </wd-table>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 模拟表格数据
const tableData = ref([
  { name: '张三', age: 25, gender: '男', address: '北京市朝阳区' },
  { name: '李四', age: 30, gender: '女', address: '上海市浦东新区' }
])
</script>

<style scoped>
.custom-address {
  color: #1989fa;
  font-weight: bold;
}
</style>
```

### 自定义列宽和行高
```vue
<template>
  <wd-table :data="tableData" :row-height="60">
    <wd-table-col prop="name" label="姓名" width="180"></wd-table-col>
    <wd-table-col prop="description" label="描述" width="400"></wd-table-col>
    <wd-table-col prop="status" label="状态" width="120"></wd-table-col>
  </wd-table>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 模拟表格数据
const tableData = ref([
  {
    name: '项目A',
    description: '这是一个详细的项目描述，包含项目的目标、范围和实现方案',
    status: '进行中'
  },
  {
    name: '项目B',
    description: '这是另一个项目的详细描述，包含更多的技术细节和实施计划',
    status: '已完成'
  }
])
</script>
```

## 注意事项

1. wd-table-col组件必须作为wd-table组件的子组件使用
2. 每个wd-table-col组件必须设置prop和label属性
3. 当使用sortable属性时，需要在父组件table上监听sort-method事件来处理排序逻辑
4. 固定列功能（fixed）在移动端可能影响性能，建议谨慎使用
5. 使用自定义单元格内容时，通过value插槽可以访问到当前行数据和索引
6. 列宽度width属性建议使用数字或带单位的字符串，如100或'100px'
7. 对齐方式align支持left、center、right三种值
8. 单元格点击事件会触发父组件table的row-click事件
9. 当表格数据为复杂数据结构时，需要使用value插槽来自定义渲染逻辑
10. 与父组件table的border、stripe、ellipsis等属性配合使用，可以实现统一的表格样式
