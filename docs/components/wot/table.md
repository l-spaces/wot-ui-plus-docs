# Table 表格

## 组件概述

Table 表格组件用于展示结构化行列数据，由 `wd-table` 和 `wd-table-col` 两个组件配合使用。支持固定表头、固定列、排序、索引列、自定义单元格模板和空状态插槽，适用于管理后台、数据报表和配置列表等场景。

## 核心功能描述

- **表格渲染**：通过 `data` 和多个 `wd-table-col` 定义行列数据
- **固定表头与横向滚动**：支持固定表头和固定列
- **列排序**：列开启 `sortable` 后可通过表头切换排序方向
- **索引列**：通过 `index` 快速启用行号列
- **自定义单元格**：`wd-table-col` 支持 `value` 作用域插槽
- **空状态定制**：支持 `empty` 插槽覆盖默认空文案

## 适用业务场景

- **数据列表**：用户列表、订单列表、权限列表等后台数据展示
- **统计报表**：成绩、销量、经营数据等结构化信息展示
- **配置管理**：参数配置、审批记录、设备清单等场景

## API

### Table Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| data | Array | - | 是 | 表格数据，必须为对象数组 |
| border | Boolean | true | 否 | 是否显示边框 |
| stripe | Boolean | true | 否 | 是否显示斑马纹 |
| height | String / Number | - | 否 | 表格高度 |
| rowHeight | String / Number | 40 | 否 | 行高 |
| showHeader | Boolean | true | 否 | 是否显示表头 |
| ellipsis | Boolean | true | 否 | 是否超出 2 行隐藏 |
| index | Boolean / Object | false | 否 | 是否显示索引列；传对象时可自定义索引列配置 |
| fixedHeader | Boolean | true | 否 | 是否固定表头 |
| emptyText | String | `'暂无数据'` | 否 | 空数据时显示的文本 |
| emptyHeight | String / Number | 100 | 否 | 空数据区域高度，单位为 `px` |
| customStyle | String | `''` | 否 | 自定义根节点样式 |
| customClass | String | `''` | 否 | 自定义根节点样式类 |

### TableCol Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| prop | String | - | 是 | 列对应字段名 |
| label | String | - | 是 | 列标题 |
| width | String / Number | 100 | 否 | 列宽度，单位为 `px` |
| sortable | Boolean | false | 否 | 是否开启列排序 |
| fixed | Boolean | false | 否 | 是否固定当前列 |
| align | String | `'left'` | 否 | 列对齐方式，可选值：`left` / `center` / `right` |

### Table Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| sort-method | 排序列方向变更时触发 | `TableColumn` | 返回当前列的 `prop`、`label`、`width`、`sortable`、`align`、`sortDirection`、`fixed` |
| row-click | 点击任意数据行时触发 | `({ rowIndex })` | 返回当前点击行的索引 |

### Table Slots

| 插槽名称 | 说明 |
|---------|------|
| default | 默认插槽，用于放置 `wd-table-col` |
| empty | 自定义空数据展示内容 |

### TableCol Slots

| 插槽名称 | 说明 |
|---------|------|
| value | 自定义单元格内容，作用域参数为 `{ row, index }` |

### TableCol Methods

| 方法名称 | 说明 | 参数 |
|---------|------|------|
| sortDirection | 当前列排序方向，`0` 表示未排序，`1` 表示升序，`-1` 表示降序 | - |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-table :data="tableData" :height="320" @row-click="handleRowClick">
    <wd-table-col prop="name" label="姓名" />
    <wd-table-col prop="age" label="年龄" />
    <wd-table-col prop="address" label="地址" :width="180" />
  </wd-table>
</template>

<script lang="ts" setup>
const tableData = [
  { name: '张三', age: 28, address: '北京市' },
  { name: '李四', age: 32, address: '上海市' },
  { name: '王五', age: 25, address: '广州市' }
]

function handleRowClick({ rowIndex }: { rowIndex: number }) {
  console.log(rowIndex)
}
</script>
```

基础表格通过 `data` 提供数据源，通过 `wd-table-col` 定义每一列。

### 示例2：排序与索引列

```vue
<template>
  <wd-table
    :data="tableData"
    :height="400"
    :index="{ align: 'center' }"
    @sort-method="handleSort"
  >
    <wd-table-col prop="name" label="姓名" sortable />
    <wd-table-col prop="score" label="分数" sortable align="center" />
    <wd-table-col prop="school" label="学校" :width="180" />
  </wd-table>
</template>

<script lang="ts" setup>
import type { TableColumn } from '@/uni_modules/wot-ui-plus/components/wd-table-col/types'

const tableData = [
  { name: '张三', score: 90, school: '第一中学' },
  { name: '李四', score: 85, school: '第二中学' }
]

function handleSort(column: TableColumn) {
  console.log(column.sortDirection, column.prop)
}
</script>
```

排序回调使用 `@sort-method`，而不是 `@sort`，索引列通过 `index` 快速开启。

### 示例3：自定义单元格与空状态

```vue
<template>
  <wd-table :data="tableData" :height="360">
    <wd-table-col prop="name" label="姓名" fixed />
    <wd-table-col prop="score" label="分数" sortable>
      <template #value="{ row, index }">
        <view class="score-cell">
          <text>{{ index + 1 }}.</text>
          <text>{{ row.score }}</text>
        </view>
      </template>
    </wd-table-col>

    <template #empty>
      <view class="empty-state">暂无成绩数据</view>
    </template>
  </wd-table>
</template>
```

`wd-table-col` 的 `value` 插槽可以拿到当前行数据与索引，用于渲染复杂单元格内容。

## 注意事项

- `wd-table` 实际抛出的排序事件是 `sort-method`，不是 `sort`。
- `row-click` 返回的是对象结构 `{ rowIndex }`，不是整行数据。
- 自定义列内容请使用 `wd-table-col` 的 `value` 作用域插槽，作用域参数为 `{ row, index }`。
- 固定列建议同时设置明确的 `width`，否则横向滚动场景下布局容易出现偏差。
- `fixedHeader` 配合 `height` 使用效果更稳定；不固定表头时会切换为单个滚动容器实现。
