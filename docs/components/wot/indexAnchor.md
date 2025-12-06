# IndexAnchor 索引锚点

<demo-model url="/subPages/indexAnchor/Index"></demo-model>


## 组件概况

### 组件概述
IndexAnchor 是 IndexBar 组件的子组件，用于定义索引列表中的锚点。它通常与 IndexBar 组件配合使用，实现类似通讯录、城市选择器等带有侧边索引的列表功能。IndexAnchor 支持吸顶效果，当滚动到对应位置时，会自动高亮显示当前锚点。

### 核心功能
- 定义索引列表中的锚点
- 支持自定义锚点内容
- 支持吸顶效果
- 自动与父组件 IndexBar 交互

### 适用业务场景
- 通讯录联系人列表
- 城市选择器
- 分类索引列表
- 字母索引列表
- 带有层级索引的长列表

## 完整API参考

### Props
| 名称 | 类型 | 默认值 | 必填项 | 描述 |
| --- | --- | --- | --- | --- |
| index | string / number | - | 是 | 锚点索引值，用于匹配 IndexBar 侧边栏的索引 |
| customStyle | string | '' | 否 | 自定义样式，对象格式 |
| customClass | string | '' | 否 | 自定义类名 |

### Events
IndexAnchor 组件本身不直接触发事件。

### Methods
IndexAnchor 组件不直接对外暴露方法。

### Slots
| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| default | - | 自定义锚点内容，默认显示 index 属性值 |

## 多场景使用示例代码

### 基础用法

```vue
<template>
  <wd-index-bar>
    <wd-index-anchor index="A"></wd-index-anchor>
    <view class="list-item">列表项A1</view>
    <view class="list-item">列表项A2</view>
    <view class="list-item">列表项A3</view>
    
    <wd-index-anchor index="B"></wd-index-anchor>
    <view class="list-item">列表项B1</view>
    <view class="list-item">列表项B2</view>
    <view class="list-item">列表项B3</view>
    
    <!-- 更多锚点... -->
  </wd-index-bar>
</template>

<style scoped>
.list-item {
  padding: 20px;
  border-bottom: 1px solid #eee;
}
</style>
```

### 自定义锚点内容

```vue
<template>
  <wd-index-bar>
    <wd-index-anchor index="热门">
      <view class="custom-anchor">
        <wd-icon name="hot" size="16px" color="#ff4d4f" />
        <text>热门城市</text>
      </view>
    </wd-index-anchor>
    <view class="city-item">北京</view>
    <view class="city-item">上海</view>
    <view class="city-item">广州</view>
    <view class="city-item">深圳</view>
    
    <wd-index-anchor index="A"></wd-index-anchor>
    <view class="city-item">安庆</view>
    <view class="city-item">安阳</view>
    
    <!-- 更多锚点... -->
  </wd-index-bar>
</template>

<style scoped>
.city-item {
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
}

.custom-anchor {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #ff4d4f;
  font-weight: bold;
}
</style>
```

### 数字索引

```vue
<template>
  <wd-index-bar>
    <wd-index-anchor index="0"></wd-index-anchor>
    <view class="number-item">数字0-9</view>
    <view class="number-item">数字0-8</view>
    
    <wd-index-anchor index="1"></wd-index-anchor>
    <view class="number-item">数字1-0</view>
    <view class="number-item">数字1-1</view>
    
    <!-- 更多数字锚点... -->
  </wd-index-bar>
</template>
```

### 吸顶效果

```vue
<template>
  <wd-index-bar :sticky="true">
    <wd-index-anchor index="1"></wd-index-anchor>
    <view class="list-item" v-for="i in 10" :key="i">项目1-{{ i }}</view>
    
    <wd-index-anchor index="2"></wd-index-anchor>
    <view class="list-item" v-for="i in 10" :key="i">项目2-{{ i }}</view>
    
    <wd-index-anchor index="3"></wd-index-anchor>
    <view class="list-item" v-for="i in 10" :key="i">项目3-{{ i }}</view>
  </wd-index-bar>
</template>
```

### 分类索引

```vue
<template>
  <wd-index-bar>
    <wd-index-anchor index="水果"></wd-index-anchor>
    <view class="category-item">苹果</view>
    <view class="category-item">香蕉</view>
    <view class="category-item">橙子</view>
    
    <wd-index-anchor index="蔬菜"></wd-index-anchor>
    <view class="category-item">西红柿</view>
    <view class="category-item">黄瓜</view>
    <view class="category-item">土豆</view>
    
    <wd-index-anchor index="肉类"></wd-index-anchor>
    <view class="category-item">猪肉</view>
    <view class="category-item">牛肉</view>
    <view class="category-item">鸡肉</view>
  </wd-index-bar>
</template>
```

## 样式定制指南

### 使用 customStyle 自定义样式

```vue
<template>
  <wd-index-bar>
    <wd-index-anchor 
      index="A" 
      :custom-style="{
        backgroundColor: '#f5f7fa',
        padding: '10px 20px',
        color: '#1989fa',
        fontWeight: 'bold'
      }"
    ></wd-index-anchor>
    <!-- 列表项... -->
  </wd-index-bar>
</template>
```

### 使用 customClass 自定义类名

```vue
<template>
  <wd-index-bar>
    <wd-index-anchor index="A" custom-class="my-anchor"></wd-index-anchor>
    <!-- 列表项... -->
  </wd-index-bar>
</template>

<style scoped>
.my-anchor {
  background-color: #fff2f0;
  color: #ff4d4f;
  border-left: 4px solid #ff4d4f;
  padding-left: 16px;
}
</style>
```

## 注意事项

1. **父子组件关系**：IndexAnchor 组件必须作为 IndexBar 组件的直接子组件使用，否则无法正常工作。

2. **index 属性**：index 属性是必填项，用于标识锚点，必须与 IndexBar 侧边栏的索引值匹配。

3. **吸顶效果**：吸顶效果由父组件 IndexBar 的 sticky 属性控制，当 sticky 为 true 时，当前激活的锚点会自动吸顶显示。

4. **自定义内容**：通过默认插槽可以自定义锚点的显示内容，不限于文本，还可以包含图标、图片等元素。

5. **性能优化**：对于包含大量锚点的长列表，建议合理使用虚拟滚动等技术优化性能。

6. **锚点顺序**：锚点的顺序应该与列表内容的顺序保持一致，以确保索引导航的准确性。

7. **平台兼容性**：在不同平台上，吸顶效果的实现可能存在细微差异，建议在各平台进行测试。

8. **交互逻辑**：IndexAnchor 组件本身不处理点击事件，点击侧边栏索引的交互逻辑由父组件 IndexBar 处理。