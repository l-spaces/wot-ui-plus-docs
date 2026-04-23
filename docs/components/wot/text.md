# Text 文本

## 组件概述

Text 文本组件用于展示文本内容，支持多种主题类型、文本处理模式（日期、手机号、姓名、金额）、脱敏处理、装饰线、行数限制等功能。

## 核心功能描述

- **主题类型**：default、primary、success、warning、error
- **文本模式**：text（普通文本）、date（日期）、phone（手机号）、name（姓名）、price（金额）
- **脱敏处理**：手机号和姓名模式支持脱敏显示
- **装饰线**：underline（下划线）、line-through（删除线）、overline（上划线）
- **行数限制**：超出指定行数显示省略号
- **点击拨号**：手机号模式支持点击拨打电话

## 适用业务场景

- **价格展示**：使用 price 模式格式化金额
- **手机号展示**：使用 phone 模式脱敏显示
- **多行文本**：使用 lines 限制行数

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| type | String | 'default' | 否 | 主题类型，可选值：default / primary / success / warning / error |
| text | String / Number | '' | 否 | 文本内容 |
| size | String / Number | '' | 否 | 字体大小 |
| mode | String | 'text' | 否 | 文本模式，可选值：text / date / phone / name / price |
| decoration | String | 'none' | 否 | 文字装饰，可选值：none / underline / line-through / overline |
| call | Boolean | false | 否 | 手机号模式点击是否拨打电话 |
| bold | Boolean | false | 否 | 是否粗体 |
| format | Boolean | false | 否 | 是否脱敏（phone/name 模式生效） |
| color | String | '' | 否 | 文本颜色 |
| prefix | String | - | 否 | 前置插槽名称 |
| suffix | String | - | 否 | 后置插槽名称 |
| lines | Number | - | 否 | 文本显示行数，超出显示省略号，最大 5 |
| lineHeight | String | '' | 否 | 文本行高 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-text text="普通文本" />
  <wd-text type="primary" text="主要文本" />
  <wd-text type="error" text="错误文本" />
</template>
```

### 示例2：文本模式

```vue
<template>
  <wd-text mode="price" text="1999.50" />
  <wd-text mode="phone" text="13812345678" format />
  <wd-text mode="name" text="张三丰" format />
  <wd-text mode="date" text="2024-01-15" />
</template>
```

### 示例3：装饰与行数限制

```vue
<template>
  <wd-text text="删除线文本" decoration="line-through" />
  <wd-text text="下划线文本" decoration="underline" />
  <wd-text :lines="2" text="这是一段很长的文本内容，超出两行后会显示省略号..." />
</template>
```

## 注意事项

- `format` 脱敏仅在 phone 和 name 模式下生效
- `call` 仅在 phone 模式下生效
- `lines` 最大值为 5
