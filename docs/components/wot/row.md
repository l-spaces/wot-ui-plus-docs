# Row 行容器
<demo-model url="/subPages/row/Index"></demo-model>

## 组件概况

### 组件概述
Row组件是一个栅格布局的行容器组件，用于配合Col组件实现响应式栅格系统。它提供了列间距控制和自动换行功能，帮助开发者快速构建灵活的网格布局。

### 详细功能描述
- 支持设置列之间的间距（gutter）
- 支持自动换行（wrap）
- 配合Col组件实现完整的栅格布局系统
- 支持自定义样式和类名
- 响应式设计，适配不同屏幕尺寸
- 支持多端适配

### 适用业务场景
- 页面布局设计
- 表单布局
- 卡片网格展示
- 响应式导航栏
- 商品列表展示
- 复杂数据表格布局

## 完整API参考

### Props
| 参数 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| gutter | number | 0 | 否 | 列元素之间的间距（单位为px），必须大于等于0 |
| wrap | boolean | false | 否 | 是否自动换行 |
| customClass | string | - | 否 | 自定义类名 |
| customStyle | object | - | 否 | 自定义样式，对象形式 |

### Events
无

### Methods
无

### Slots
| 插槽名 | 作用域变量 | 说明 |
|--------|------------|------|
| default | - | 默认插槽，用于放置wd-col组件 |

## 多场景使用示例

### 基础用法
```vue
<template>
  <view>
    <wd-row>
      <wd-col span="12">
        <view class="demo-col">span: 12</view>
      </wd-col>
      <wd-col span="12">
        <view class="demo-col">span: 12</view>
      </wd-col>
    </wd-row>
  </view>
</template>

<style scoped>
.demo-col {
  background-color: #409eff;
  color: white;
  text-align: center;
  padding: 20px;
  border-radius: 4px;
}
</style>
```

### 设置列间距
```vue
<template>
  <view>
    <wd-row :gutter="20">
      <wd-col span="8">
        <view class="demo-col">span: 8</view>
      </wd-col>
      <wd-col span="8">
        <view class="demo-col">span: 8</view>
      </wd-col>
      <wd-col span="8">
        <view class="demo-col">span: 8</view>
      </wd-col>
    </wd-row>
  </view>
</template>

<style scoped>
.demo-col {
  background-color: #67c23a;
  color: white;
  text-align: center;
  padding: 20px;
  border-radius: 4px;
}
</style>
```

### 自动换行
```vue
<template>
  <view>
    <wd-row :gutter="10" wrap>
      <wd-col span="8">
        <view class="demo-col">span: 8</view>
      </wd-col>
      <wd-col span="8">
        <view class="demo-col">span: 8</view>
      </wd-col>
      <wd-col span="8">
        <view class="demo-col">span: 8</view>
      </wd-col>
      <wd-col span="8">
        <view class="demo-col">span: 8</view>
      </wd-col>
      <wd-col span="8">
        <view class="demo-col">span: 8</view>
      </wd-col>
    </wd-row>
  </view>
</template>

<style scoped>
.demo-col {
  background-color: #e6a23c;
  color: white;
  text-align: center;
  padding: 20px;
  border-radius: 4px;
}
</style>
```

### 响应式布局
```vue
<template>
  <view>
    <wd-row :gutter="15" wrap>
      <wd-col span="24" xs="12" sm="8" md="6" lg="4">
        <view class="demo-col">响应式列</view>
      </wd-col>
      <wd-col span="24" xs="12" sm="8" md="6" lg="4">
        <view class="demo-col">响应式列</view>
      </wd-col>
      <wd-col span="24" xs="12" sm="8" md="6" lg="4">
        <view class="demo-col">响应式列</view>
      </wd-col>
      <wd-col span="24" xs="12" sm="8" md="6" lg="4">
        <view class="demo-col">响应式列</view>
      </wd-col>
      <wd-col span="24" xs="12" sm="8" md="6" lg="4">
        <view class="demo-col">响应式列</view>
      </wd-col>
      <wd-col span="24" xs="12" sm="8" md="6" lg="4">
        <view class="demo-col">响应式列</view>
      </wd-col>
    </wd-row>
  </view>
</template>

<style scoped>
.demo-col {
  background-color: #f56c6c;
  color: white;
  text-align: center;
  padding: 20px;
  border-radius: 4px;
}
</style>
```

### 嵌套行布局
```vue
<template>
  <view>
    <wd-row :gutter="10">
      <wd-col span="12">
        <view class="demo-col">
          <wd-row :gutter="5" wrap>
            <wd-col span="12">
              <view class="demo-col demo-col-small">嵌套列 1</view>
            </wd-col>
            <wd-col span="12">
              <view class="demo-col demo-col-small">嵌套列 2</view>
            </wd-col>
            <wd-col span="12">
              <view class="demo-col demo-col-small">嵌套列 3</view>
            </wd-col>
            <wd-col span="12">
              <view class="demo-col demo-col-small">嵌套列 4</view>
            </wd-col>
          </wd-row>
        </view>
      </wd-col>
      <wd-col span="12">
        <view class="demo-col">span: 12</view>
      </wd-col>
    </wd-row>
  </view>
</template>

<style scoped>
.demo-col {
  background-color: #909399;
  color: white;
  text-align: center;
  padding: 20px;
  border-radius: 4px;
}

.demo-col-small {
  padding: 10px;
  margin: 5px 0;
}
</style>
```

## 样式定制指南

### 自定义类名
通过`customClass`属性可以为Row组件添加自定义类名，用于覆盖默认样式。

```vue
<wd-row custom-class="my-row">
  <!-- 内容 -->
</wd-row>

<style>
.my-row {
  /* 自定义样式 */
  background-color: #f0f2f5;
  padding: 20px;
  border-radius: 8px;
}
</style>
```

### 自定义样式对象
通过`customStyle`属性可以直接设置组件的内联样式。

```vue
<wd-row :custom-style="{ backgroundColor: '#f0f2f5', padding: '20px', borderRadius: '8px' }">
  <!-- 内容 -->
</wd-row>
```

## 注意事项

1. **与Col组件配合使用**：Row组件必须与Col组件配合使用才能实现完整的栅格布局功能。

2. **gutter参数限制**：gutter参数必须大于等于0，否则会在控制台输出警告信息。

3. **响应式设计**：结合Col组件的xs、sm、md、lg、xl属性，可以实现不同屏幕尺寸下的响应式布局。

4. **嵌套布局**：Row组件支持嵌套使用，但建议不要嵌套过深，以免影响性能和代码可读性。

5. **样式隔离**：Row组件使用了`styleIsolation: 'shared'`，允许外部样式穿透到组件内部。

6. **虚拟主机模式**：组件开启了`virtualHost: true`，在页面渲染时会被作为虚拟节点处理，不会生成额外的DOM元素。

7. **多端适配**：组件支持H5、App、小程序等多端平台，但在不同平台上可能存在细微的样式差异。

## 常见问题

1. **Q: 为什么设置了gutter属性后，列元素之间没有间距？**
   A: 请确保Row组件的直接子元素是Col组件，gutter属性只对直接子Col元素生效。

2. **Q: 如何实现不等宽列布局？**
   A: 通过设置Col组件的span属性为不同值，可以实现不等宽列布局。

3. **Q: 为什么在小程序中Row组件的样式不生效？**
   A: 请检查是否正确引入了组件样式，或者尝试使用自定义类名来覆盖默认样式。

4. **Q: 如何实现垂直居中对齐？**
   A: 可以通过自定义样式为Row组件添加`align-items: center`来实现垂直居中对齐。

5. **Q: 支持的最大列数是多少？**
   A: 栅格系统默认将一行分为24列，因此Col组件的span属性最大值为24。