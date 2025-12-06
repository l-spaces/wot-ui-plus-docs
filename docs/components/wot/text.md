# Text 文本
<demo-model url="/subPages/text/Index"></demo-model>

## 组件概况

### 组件概述
文本组件是用于展示和格式化文本内容的基础UI组件，提供了丰富的文本样式和处理选项。wd-text组件支持多种文本类型、大小、颜色、装饰效果，以及日期、电话、姓名、金额等特殊格式的处理，适用于各种文本展示场景。

### 详细功能描述
- 支持5种文本类型：default、primary、success、warning、error
- 支持自定义文本大小、颜色和行高
- 支持文本装饰：下划线、中划线、上划线
- 支持文本格式化：普通文本、日期、手机号、姓名、金额
- 支持手机号和姓名脱敏处理
- 支持手机号点击拨号功能
- 支持文本行数限制和自动省略
- 支持粗体文本
- 支持前缀和后缀文本或插槽
- 支持点击事件

### 适用业务场景
- 普通文本展示
- 状态文本展示
- 日期格式化展示
- 手机号展示和脱敏
- 姓名脱敏展示
- 金额格式化展示
- 需要特殊样式的文本
- 可点击的文本

## 完整API参考

### Props属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| type | 'default' / 'primary' / 'success' / 'warning' / 'error' | default | 否 | 主题类型 |
| text | string / number | '' | 否 | 文字内容 |
| size | number / string | '' | 否 | 字体大小 |
| mode | 'text' / 'date' / 'phone' / 'name' / 'price' | text | 否 | 文本处理的匹配模式 |
| decoration | 'none' / 'underline' / 'line-through' / 'overline' | none | 否 | 文字装饰 |
| call | boolean | false | 否 | mode=phone时，点击文本是否拨打电话 |
| bold | boolean | false | 否 | 是否粗体 |
| format | boolean | false | 否 | 是否脱敏，当mode为phone和name时生效 |
| color | string | '' | 否 | 文本颜色 |
| prefix | string | '' | 否 | 前置文本 |
| suffix | string | '' | 否 | 后置文本 |
| lines | number | - | 否 | 文本显示的行数，超出此行数显示省略号，最大值为5 |
| lineHeight | string | '' | 否 | 文本行高 |
| customStyle | string / object | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |

### Events事件

| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| click | 点击文本时触发 | event - 点击事件对象 |

### Methods方法

该组件没有对外暴露的方法。

### Slots插槽

| 插槽名 | 作用域变量 | 使用说明 |
|--------|------------|----------|
| prefix | - | 前置内容插槽 |
| suffix | - | 后置内容插槽 |

## 多场景使用示例代码

### 1. 基础用法
```vue
<template>
  <view class="text-container">
    <wd-text text="默认文本" type="default"></wd-text>
    <wd-text text="主要文本" type="primary"></wd-text>
    <wd-text text="成功文本" type="success"></wd-text>
    <wd-text text="警告文本" type="warning"></wd-text>
    <wd-text text="错误文本" type="error"></wd-text>
  </view>
</template>

<script setup lang="ts">
// 基础文本用法
</script>

<style scoped>
.text-container {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
  padding: 20rpx;
}
</style>
```

### 2. 文本样式和装饰
```vue
<template>
  <view class="text-container">
    <wd-text text="粗体文本" bold></wd-text>
    <wd-text text="下划线文本" decoration="underline"></wd-text>
    <wd-text text="中划线文本" decoration="line-through"></wd-text>
    <wd-text text="上划线文本" decoration="overline"></wd-text>
    <wd-text text="自定义大小文本" :size="36"></wd-text>
    <wd-text text="自定义颜色文本" color="#1989fa"></wd-text>
    <wd-text text="自定义行高文本" line-height="2"></wd-text>
  </view>
</template>

<script setup lang="ts">
// 文本样式和装饰用法
</script>

<style scoped>
.text-container {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
  padding: 20rpx;
}
</style>
```

### 3. 文本格式化
```vue
<template>
  <view class="text-container">
    <wd-text text="20231201" mode="date"></wd-text>
    <wd-text text="13800138000" mode="phone"></wd-text>
    <wd-text text="13800138000" mode="phone" format></wd-text>
    <wd-text text="张三" mode="name"></wd-text>
    <wd-text text="张三" mode="name" format></wd-text>
    <wd-text text="123456.789" mode="price"></wd-text>
    <wd-text text="99.9" mode="price"></wd-text>
  </view>
</template>

<script setup lang="ts">
// 文本格式化用法
</script>

<style scoped>
.text-container {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
  padding: 20rpx;
}
</style>
```

### 4. 带前缀后缀和点击事件
```vue
<template>
  <view class="text-container">
    <wd-text text="100" prefix="¥" suffix="元"></wd-text>
    <wd-text text="库存" suffix="件" type="success"></wd-text>
    <wd-text text="点击拨打电话" mode="phone" call @click="handleClick"></wd-text>
    <wd-text text="带图标的文本">
      <template #prefix>
        <wd-icon name="star" color="#ffd700" size="24"></wd-icon>
      </template>
      <template #suffix>
        <wd-icon name="arrow-right" color="#969799" size="24"></wd-icon>
      </template>
    </wd-text>
  </view>
</template>

<script setup lang="ts">
// 带前缀后缀和点击事件用法

const handleClick = () => {
  console.log('文本被点击了')
}
</script>

<style scoped>
.text-container {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
  padding: 20rpx;
}
</style>
```

### 5. 文本行数限制
```vue
<template>
  <view class="text-container">
    <view class="text-item">
      <text class="text-label">1行文本：</text>
      <wd-text 
        text="这是一段需要显示多行的文本内容，用于测试文本行数限制功能，当超过指定行数时，会自动显示省略号。" 
        :lines="1"
      ></wd-text>
    </view>
    
    <view class="text-item">
      <text class="text-label">2行文本：</text>
      <wd-text 
        text="这是一段需要显示多行的文本内容，用于测试文本行数限制功能，当超过指定行数时，会自动显示省略号。" 
        :lines="2"
      ></wd-text>
    </view>
    
    <view class="text-item">
      <text class="text-label">3行文本：</text>
      <wd-text 
        text="这是一段需要显示多行的文本内容，用于测试文本行数限制功能，当超过指定行数时，会自动显示省略号。这是一段需要显示多行的文本内容，用于测试文本行数限制功能。" 
        :lines="3"
      ></wd-text>
    </view>
  </view>
</template>

<script setup lang="ts">
// 文本行数限制用法
</script>

<style scoped>
.text-container {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  padding: 20rpx;
}

.text-item {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.text-label {
  font-size: 28rpx;
  color: #606266;
}
</style>
```

## 样式定制指南

### customStyle 用法
```vue
<template>
  <wd-text 
    text="自定义样式文本" 
    :custom-style="{ 
      fontSize: '36rpx', 
      color: '#1989fa', 
      backgroundColor: '#f0f9ff', 
      padding: '10rpx 20rpx', 
      borderRadius: '8rpx'
    }"
  ></wd-text>
</template>

<script setup lang="ts">
// 自定义样式文本
</script>
```

### customClass 用法
```vue
<template>
  <wd-text text="自定义类名文本" custom-class="my-text"></wd-text>
</template>

<script setup lang="ts">
// 自定义类名文本
</script>

<style lang="scss">
.my-text {
  font-size: 36rpx;
  color: #1989fa;
  font-weight: bold;
  text-decoration: underline;
  background-color: #f0f9ff;
  padding: 10rpx 20rpx;
  border-radius: 8rpx;
}
</style>
```

## 注意事项

1. 文本类型(type)和自定义颜色(color)同时设置时，自定义颜色优先级更高
2. 文本行数(lines)限制最大值为5行，超过5行将按5行处理
3. 手机号格式化(format)仅对11位手机号生效，格式为XXX****XXXX
4. 姓名脱敏(format)仅对2个及以上字符的姓名生效，格式为X**X
5. 日期格式化(mode="date")要求输入的text为时间戳或可被dayjs解析的日期字符串
6. 金额格式化(mode="price")会自动保留两位小数，并添加千位分隔符
7. 点击拨打电话(call)功能仅在mode="phone"时生效
8. 文本装饰(decoration)支持underline、line-through和overline三种值
9. 前缀(prefix)和后缀(suffix)支持文本和插槽两种方式设置
10. 自定义大小(size)可以是数字或字符串，数字会被解析为px单位
11. 行高(lineHeight)支持数字或字符串，数字会被解析为倍数值
12. 组件会自动处理文本内容，确保输出格式正确
