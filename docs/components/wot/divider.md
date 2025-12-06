# Divider 分割线组件

<demo-model url="/subPages/divider/Index"></demo-model>


## 组件概况

### 组件概述
Divider 组件是一个用于分隔内容区块的布局组件，支持水平和垂直两种方向，可自定义样式、内容位置和线宽，常用于列表、表单、卡片等组件之间的分隔。

### 详细功能描述
- 支持水平和垂直两种分割线方向
- 支持自定义分割线颜色
- 支持实线和虚线两种样式
- 支持 0.5px 细线和正常线宽
- 支持在水平分割线中间、左侧或右侧添加自定义内容
- 支持自定义样式和类名
- 轻量级实现，无复杂逻辑

### 适用业务场景
- 列表项之间的分隔
- 表单区块之间的分隔
- 卡片组件之间的分隔
- 页面内容区域的分隔
- 导航菜单的分隔
- 对话框内容区域的分隔

## 完整API参考

### Props
| 名称 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| color | string | - | 否 | 自定义分割线颜色 |
| contentPosition | string | center | 否 | 内容位置，可选值为 `left` `right` `center` |
| dashed | boolean | false | 否 | 是否显示为虚线 |
| vertical | boolean | false | 否 | 是否为垂直分割线 |
| hairline | boolean | true | 否 | 是否显示为 0.5px 的线 |
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |

### Events
| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |

### Methods
| 方法名 | 参数 | 返回值 | 功能说明 |
| --- | --- | --- | --- |

### Slots
| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| default | - | 水平分割线的内容插槽，仅在非垂直方向下显示 |

## 多场景使用示例代码

### 基础用法
```vue
<template>
  <view>
    <text>上方内容</text>
    <!-- 基础水平分割线 -->
    <wd-divider />
    <text>下方内容</text>
  </view>
</template>
```

### 垂直分割线
```vue
<template>
  <view class="flex-container">
    <text>左侧内容</text>
    <!-- 垂直分割线 -->
    <wd-divider vertical />
    <text>右侧内容</text>
  </view>
</template>

<style scoped>
.flex-container {
  display: flex;
  align-items: center;
}
</style>
```

### 自定义颜色和样式
```vue
<template>
  <view>
    <text>上方内容</text>
    <!-- 自定义颜色的分割线 -->
    <wd-divider color="#1989fa" />
    <!-- 虚线分割线 -->
    <wd-divider dashed />
    <!-- 自定义颜色和虚线 -->
    <wd-divider color="#fa2c19" dashed />
    <!-- 正常线宽的分割线 -->
    <wd-divider hairline="false" />
    <text>下方内容</text>
  </view>
</template>
```

### 带内容的分割线
```vue
<template>
  <view>
    <text>上方内容</text>
    <!-- 带内容的分割线，默认居中 -->
    <wd-divider>
      <text class="divider-content">分割线内容</text>
    </wd-divider>
    <!-- 内容居左 -->
    <wd-divider content-position="left">
      <text class="divider-content">左侧内容</text>
    </wd-divider>
    <!-- 内容居右 -->
    <wd-divider content-position="right">
      <text class="divider-content">右侧内容</text>
    </wd-divider>
    <!-- 带图标和文字的分割线 -->
    <wd-divider>
      <view class="divider-content">
        <text class="icon">📌</text>
        <text>重要分割线</text>
      </view>
    </wd-divider>
    <text>下方内容</text>
  </view>
</template>

<style scoped>
.divider-content {
  font-size: 14px;
  color: #646566;
  padding: 0 12px;
}
</style>
```

### 自定义样式和类
```vue
<template>
  <view>
    <text>上方内容</text>
    <!-- 自定义样式的分割线 -->
    <wd-divider 
      custom-style="margin: 20px 0; padding: 10px 0;" 
      custom-class="my-divider"
    />
    <!-- 垂直分割线自定义样式 -->
    <view class="flex-container">
      <text>左侧内容</text>
      <wd-divider 
        vertical 
        custom-style="height: 20px; margin: 0 10px;" 
      />
      <text>右侧内容</text>
    </view>
    <text>下方内容</text>
  </view>
</template>

<style scoped>
.flex-container {
  display: flex;
  align-items: center;
}

.my-divider {
  /* 自定义类样式 */
  background-color: #f5f7fa;
}
</style>
```

## 样式定制指南

### customStyle 用法
使用 `customStyle` 属性可以直接为分割线添加内联样式，例如：
```vue
<wd-divider custom-style="margin: 20px 0; color: #1989fa;" />
```

### customClass 用法
通过 `customClass` 属性可以为组件添加自定义CSS类，便于进行更复杂的样式定制：
```vue
<wd-divider custom-class="custom-divider" />

<style>
.custom-divider {
  /* 全局样式 */
  margin: 20px 0;
  padding: 10px 0;
  background-color: #f5f7fa;
}
</style>
```

### 垂直分割线样式调整
对于垂直分割线，可以通过自定义样式调整其高度、边距等：
```vue
<wd-divider vertical custom-style="height: 30px; margin: 0 15px;" />
```

## 注意事项

1. **内容插槽**: 只有水平分割线（`vertical` 为 `false`）支持内容插槽，垂直分割线不显示插槽内容。
2. **线宽设置**: `hairline` 属性为 `true` 时，分割线显示为 0.5px 细线，`false` 时显示为 1px 正常线宽。
3. **颜色继承**: 分割线颜色会同时应用到线条和插槽内容上，如需单独设置内容颜色，需在插槽内部元素上设置。
4. **内容位置**: 只有在设置了插槽内容时，`contentPosition` 属性才会生效。
5. **样式隔离**: 组件使用 `styleIsolation: 'shared'`，确保自定义样式能正常生效。
6. **性能优化**: 由于该组件结构简单，性能消耗极低，可放心大量使用。
