# Steps 步骤条

## 组件概述

Steps 步骤条组件用于展示流程步骤，由 `wd-steps` 和 `wd-step` 两个组件配合使用。支持水平/垂直方向、点状样式、自定义图标、状态标记、居中对齐等功能。常用于订单流程、注册步骤、审批流程等场景。

## 核心功能描述

- **方向控制**：`vertical` 切换水平/垂直展示方向
- **点状样式**：`dot` 开启后使用圆点替代数字序号
- **步骤状态**：`status` 支持 finished（已完成）、process（进行中）、error（出错）三种状态
- **自定义图标**：`icon` 可自定义步骤图标
- **间距控制**：`space` 自定义步骤间距，不设置则自动计算
- **居中对齐**：`alignCenter` 仅对横向步骤条有效，使步骤条水平居中
- **自动状态**：根据 `active` 值自动判断已完成/进行中/待处理状态

## 适用业务场景

- **订单流程**：展示订单的提交、审核、发货、收货等流程节点
- **注册步骤**：多步骤注册流程中展示当前进度
- **审批流程**：展示审批节点的完成、进行中、驳回等状态

## API

### Steps Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| active | Number | 0 | 否 | 当前激活的步骤，从0开始 |
| vertical | Boolean | false | 否 | 是否垂直展示 |
| dot | Boolean | false | 否 | 是否为点状步骤条 |
| space | String | 自动计算 | 否 | 步骤间距 |
| alignCenter | Boolean | false | 否 | 是否水平居中，仅横向有效 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Step Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| title | String | - | 否 | 步骤标题 |
| description | String | - | 否 | 步骤描述 |
| icon | String | - | 否 | 自定义图标 |
| status | String | - | 否 | 状态，可选值：finished / process / error |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-steps :active="active">
    <wd-step title="步骤一" description="描述信息" />
    <wd-step title="步骤二" description="描述信息" />
    <wd-step title="步骤三" description="描述信息" />
  </wd-steps>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(1)
</script>
```

水平步骤条，`active` 设置当前步骤索引，自动标记已完成和进行中状态。

### 示例2：垂直与点状样式

```vue
<template>
  <wd-steps :active="1" vertical dot>
    <wd-step title="提交申请" description="2024-01-01 10:00" />
    <wd-step title="审核中" description="预计1-2个工作日" />
    <wd-step title="审核完成" />
  </wd-steps>
</template>
```

垂直方向展示，`dot` 使用圆点样式，适合时间线场景。

### 示例3：自定义图标与状态

```vue
<template>
  <wd-steps :active="2" align-center>
    <wd-step title="选择商品" icon="cart" />
    <wd-step title="确认订单" icon="order" />
    <wd-step title="支付" icon="wallet" status="error" />
    <wd-step title="完成" icon="check-circle" />
  </wd-steps>
</template>
```

自定义图标名称，`status="error"` 标记出错步骤，`alignCenter` 居中对齐。

## 注意事项

- `active` 从 0 开始计数，小于 active 的步骤自动标记为已完成
- `status` 仅影响当前步骤的显示，不影响其他步骤的自动状态判断
- `dot` 模式下不显示步骤序号，使用圆点代替
- `alignCenter` 仅在水平方向下有效
- `space` 不设置时自动计算间距，设置后使用固定值
