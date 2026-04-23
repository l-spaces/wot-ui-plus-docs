# Table 表格

## 组件概述

Table 表格组件用于展示行列数据，由 `wd-table` 和 `wd-table-col` 两个组件配合使用。支持排序、斑马纹、固定表头、固定列、索引列、空数据提示等功能。常用于后台管理系统的数据列表展示。

## 核心功能描述

- **数据展示**：`data` 传入数组数据，配合 `wd-table-col` 定义列
- **斑马纹**：`stripe` 开启交替行背景色，默认开启
- **边框**：`border` 显示表格边框，默认开启
- **固定表头**：`fixedHeader` 固定表头不随内容滚动，默认开启
- **固定列**：`fixed` 固定列不随水平滚动移动
- **列排序**：`sortable` 开启列排序功能
- **索引列**：`index` 显示行号列，支持自定义配置
- **空数据**：`emptyText` 和 `emptyHeight` 自定义空数据提示
- **行高与高度**：`rowHeight` 设置行高，`height` 设置表格整体高度
- **文本省略**：`ellipsis` 超出2行自动省略，默认开启

## 适用业务场景

- **数据列表**：后台管理系统中展示用户列表、订单列表等结构化数据
- **数据报表**：展示统计报表、财务数据等
- **配置管理**：展示系统配置项、参数列表等

## API

### Table Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| data | Array | - | 是 | 表格数据，数组对象格式 |
| border | Boolean | true | 否 | 是否显示边框 |
| stripe | Boolean | true | 否 | 是否显示斑马纹 |
| height | String / Number | - | 否 | 表格高度 |
| rowHeight | String / Number | 40 | 否 | 行高 |
| showHeader | Boolean | true | 否 | 是否显示表头 |
| ellipsis | Boolean | true | 否 | 是否超出2行隐藏 |
| index | Boolean / Object | false | 否 | 是否显示索引列，对象格式可自定义列配置 |
| fixedHeader | Boolean | true | 否 | 是否固定表头 |
| emptyText | String | '暂无数据' | 否 | 空数据时显示的文本 |
| emptyHeight | String / Number | 100 | 否 | 空数据区域高度，单位 px |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### TableCol Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| prop | String | - | 是 | 列对应字段名 |
| label | String | - | 是 | 列标题 |
| width | String / Number | 100 | 否 | 列宽度，单位 px |
| sortable | Boolean | false | 否 | 是否可排序 |
| fixed | Boolean | false | 否 | 是否固定列 |
| align | String | 'left' | 否 | 对齐方式，可选值：left / center / right |

### Table Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| sort | 排序时触发 | ({ prop, order }) | 排序字段和方向 |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-table :data="tableData">
    <wd-table-col prop="name" label="姓名" />
    <wd-table-col prop="age" label="年龄" />
    <wd-table-col prop="address" label="地址" />
  </wd-table>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const tableData = ref([
  { name: '张三', age: 28, address: '北京市' },
  { name: '李四', age: 32, address: '上海市' },
  { name: '王五', age: 25, address: '广州市' }
])
</script>
```

基本表格展示，`data` 传入数据数组，`wd-table-col` 定义每列的字段和标题。

### 示例2：排序与斑马纹

```vue
<template>
  <wd-table :data="tableData" stripe border>
    <wd-table-col prop="name" label="姓名" />
    <wd-table-col prop="age" label="年龄" sortable />
    <wd-table-col prop="score" label="分数" sortable align="center" />
  </wd-table>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const tableData = ref([
  { name: '张三', age: 28, score: 90 },
  { name: '李四', age: 32, score: 85 },
  { name: '王五', age: 25, score: 95 }
])
</script>
```

`sortable` 开启列排序，点击表头可切换升序/降序，`align` 设置列对齐方式。

### 示例3：固定列与索引

```vue
<template>
  <wd-table :data="tableData" :index="true" :height="300">
    <wd-table-col prop="name" label="姓名" :fixed="true" :width="80" />
    <wd-table-col prop="age" label="年龄" :width="80" />
    <wd-table-col prop="address" label="地址" :width="200" />
    <wd-table-col prop="phone" label="电话" :width="150" />
  </wd-table>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const tableData = ref([
  { name: '张三', age: 28, address: '北京市', phone: '13800138000' },
  { name: '李四', age: 32, address: '上海市', phone: '13900139000' },
  { name: '王五', age: 25, address: '广州市', phone: '13700137000' }
])
</script>
```

`index` 显示行号列，`fixed` 固定列不随水平滚动移动，`height` 设置表格高度启用滚动。

## 注意事项

- `data` 为必填属性，数据格式必须为对象数组
- `prop` 和 `label` 为 TableCol 的必填属性
- `fixed` 固定列时需设置明确的 `width`
- `index` 传入对象时可自定义索引列的标题、宽度等配置
- `ellipsis` 默认开启，超出2行文本会被截断
- `fixedHeader` 需配合 `height` 使用才能生效
