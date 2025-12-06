# Grid 网格

<demo-model url="/subPages/grid/Index"></demo-model>


## 组件概况

### 组件概述
Grid 是一个用于创建网格布局的容器组件，配合 GridItem 子组件使用，可以快速实现等分布局、响应式布局等多种网格效果。

### 核心功能
- 支持自定义列数
- 支持网格间距设置
- 支持正方形网格
- 支持边框显示
- 支持点击反馈
- 支持自定义背景色

### 适用业务场景
- 首页功能入口网格
- 商品列表展示
- 图标导航栏
- 数据卡片网格布局
- 响应式内容布局

## 完整API参考

### Props
| 名称 | 类型 | 默认值 | 必填项 | 描述 |
| --- | --- | --- | --- | --- |
| clickable | boolean | false | 否 | 是否开启格子点击反馈 |
| square | boolean | false | 否 | 是否将格子固定为正方形 |
| column | number | - | 否 | 列数 |
| border | boolean | false | 否 | 是否显示边框 |
| bgColor | string | '' | 否 | 背景颜色 |
| gutter | number | - | 否 | 格子之间的间距，默认单位为px |
| hoverClass | string | - | 否 | 自定义内容区域hover-class |
| customStyle | string | '' | 否 | 自定义样式，对象格式 |
| customClass | string | '' | 否 | 自定义类名 |

### Events
Grid 组件本身不直接触发事件，事件通过 GridItem 组件触发。

### Methods
Grid 组件不直接对外暴露方法。

### Slots
| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| default | - | 用于放置 GridItem 子组件 |

## 多场景使用示例代码

### 基础用法

```vue
<template>
  <wd-grid :column="4" :border="true">
    <wd-grid-item v-for="item in 8" :key="item" :text="`Item ${item}`" />
  </wd-grid>
</template>
```

### 带图标的网格

```vue
<template>
  <wd-grid :column="4" :gutter="10">
    <wd-grid-item 
      v-for="item in gridData" 
      :key="item.name" 
      :icon="item.icon" 
      :text="item.name"
      :link-type="'navigateTo'"
      :url="`/pages/detail/index?id=${item.id}`"
    />
  </wd-grid>
</template>

<script setup lang="ts">
const gridData = [
  { id: 1, name: '首页', icon: 'home' },
  { id: 2, name: '分类', icon: 'category' },
  { id: 3, name: '购物车', icon: 'cart' },
  { id: 4, name: '我的', icon: 'user' }
]
</script>
```

### 正方形网格

```vue
<template>
  <wd-grid :column="3" :square="true" :border="true">
    <wd-grid-item 
      v-for="item in 6" 
      :key="item" 
      :icon="`icon-${item}`" 
      :text="`Square ${item}`"
    />
  </wd-grid>
</template>
```

### 自定义背景色和间距

```vue
<template>
  <wd-grid :column="2" :gutter="20" :bg-color="'#f5f7fa'" :border="true">
    <wd-grid-item 
      v-for="item in 4" 
      :key="item" 
      :text="`Item ${item}`"
      :custom-style="{ padding: '20px' }"
    >
      <template #icon>
        <wd-icon :name="`star`" :size="32" />
      </template>
    </wd-grid-item>
  </wd-grid>
</template>
```

### 无边框网格

```vue
<template>
  <wd-grid :column="4">
    <wd-grid-item 
      v-for="item in 8" 
      :key="item" 
      :text="`Item ${item}`"
      :custom-class="'no-border-item'"
    />
  </wd-grid>
</template>

<style scoped>
.no-border-item {
  text-align: center;
}
</style>
```

## 样式定制指南

### 使用 customStyle 自定义样式

```vue
<template>
  <wd-grid 
    :column="3" 
    :custom-style="{ 
      borderRadius: '8px', 
      padding: '10px',
      backgroundColor: '#ffffff'
    }"
  >
    <wd-grid-item 
      v-for="item in 6" 
      :key="item" 
      :text="`Custom ${item}`"
    />
  </wd-grid>
</template>
```

### 使用 customClass 自定义类名

```vue
<template>
  <wd-grid :column="3" custom-class="custom-grid">
    <wd-grid-item 
      v-for="item in 6" 
      :key="item" 
      :text="`Styled ${item}`"
    />
  </wd-grid>
</template>

<style scoped>
.custom-grid {
  background-color: #f0f2f5;
  border-radius: 12px;
  overflow: hidden;
}
</style>
```

## 注意事项

1. **列数设置**：column 属性值必须大于 0，不建议使用过大的值，否则会导致网格项显示异常。

2. **间距设置**：gutter 属性会同时设置水平和垂直方向的间距，单位默认为 px。

3. **边框显示**：当设置了 gutter 时，边框样式会自动调整为圆角边框；当未设置 gutter 时，会显示直角边框。

4. **点击反馈**：hoverClass 属性只在 clickable 为 true 时生效。

5. **组件嵌套**：Grid 组件仅能包含 GridItem 子组件，不支持直接包含其他类型的子组件。

6. **性能优化**：在包含大量网格项时，建议使用适当的列数，避免过多的 DOM 元素渲染。