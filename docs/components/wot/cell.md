# Cell 单元格

## 组件概况

Cell 单元格组件用于展示列表项，由 `wd-cell` 和 `wd-cell-group` 两个组件配合使用。支持标题、描述、图标、右侧箭头、表单模式等功能。是构建设置页、信息列表的基础组件。

## 核心功能描述

- **标题与描述**：通过 `title` 和 `label` 设置标题和描述
- **右侧内容**：通过 `value` 设置右侧内容
- **图标**：支持左侧图标
- **箭头**：通过 `isLink` 显示右侧箭头
- **分组**：通过 `wd-cell-group` 分组展示
- **可点击**：通过 `clickable` 显示点击态
- **必填标记**：通过 `required` 显示必填星号
- **尺寸**：支持 large 大尺寸

## 适用业务场景

- **设置列表**：展示设置项，点击跳转对应设置页
- **用户信息**：展示用户昵称、手机号等信息
- **表单字段**：展示表单中的只读字段信息

## API

### CellGroup Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| border | Boolean | true | 否 | 是否显示外边框 |
| title | String | - | 否 | 分组标题 |
| value | String / Number | - | 否 | 分组右侧内容 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Cell Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| title | String | - | 否 | 左侧标题 |
| label | String | - | 否 | 标题下方的描述信息 |
| value | String / Number | - | 否 | 右侧内容 |
| icon | String | - | 否 | 左侧图标名称 |
| isLink | Boolean | false | 否 | 是否显示右侧箭头 |
| required | Boolean | false | 否 | 是否显示必填标记 |
| center | Boolean | false | 否 | 是否垂直居中 |
| clickable | Boolean | false | 否 | 是否显示点击态 |
| size | String | - | 否 | 尺寸，可选值：large |
| titleWidth | String | - | 否 | 标题宽度 |
| prop | String | - | 否 | 表单域字段名 |
| rules | Array | [] | 否 | 表单验证规则 |
| markerSide | String | 'before' | 否 | 必填标记位置 |
| customTitleClass | String | '' | 否 | 自定义标题样式类 |
| customLabelClass | String | '' | 否 | 自定义描述样式类 |
| customValueClass | String | '' | 否 | 自定义值样式类 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Cell Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| click | 点击单元格时触发 | - | - |

### Cell Slots

| 插槽名称 | 作用域参数 | 使用场景 |
|---------|-----------|---------|
| default | - | 右侧自定义内容 |
| title | - | 自定义标题 |
| label | - | 自定义描述 |
| icon | - | 自定义左侧图标 |
| right-icon | - | 自定义右侧图标 |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-cell-group>
    <wd-cell title="标题" value="内容" />
    <wd-cell title="带箭头" is-link />
  </wd-cell-group>
</template>
```

### 示例2：带图标与描述

```vue
<template>
  <wd-cell-group>
    <wd-cell title="用户名" label="描述信息" icon="user" value="张三" />
    <wd-cell title="设置" icon="setting" is-link />
  </wd-cell-group>
</template>
```

### 示例3：可点击与必填

```vue
<template>
  <wd-cell-group>
    <wd-cell title="选择城市" is-link clickable @click="handleClick" />
    <wd-cell title="姓名" required value="请输入" />
  </wd-cell-group>
</template>

<script lang="ts" setup>
function handleClick() {
  console.log('点击单元格')
}
</script>
```

## 注意事项

- `isLink` 和 `clickable` 都会显示点击态，`isLink` 额外显示箭头
- `wd-cell-group` 的 `border` 控制外边框，单元格之间的分割线默认显示