# Sticky 粘性定位

## 组件概述

Sticky 粘性定位组件用于在页面滚动过程中将目标内容固定在顶部，适合导航栏吸顶、筛选栏悬停、关键操作区保持可见等场景。组件本身能力简洁，重点在于通过 `offsetTop` 与滚动容器配合实现稳定的吸顶体验。

## 核心功能描述

- **吸顶固定**：滚动到指定位置后自动切换为固定状态
- **层级控制**：通过 `zIndex` 控制吸顶元素覆盖关系
- **偏移控制**：通过 `offsetTop` 设置距离顶部的保留间距
- **样式扩展**：支持根节点样式和类名扩展，便于与业务布局融合

## 适用业务场景

- **导航栏吸顶**：页面滚动时保持关键导航始终可见
- **筛选栏驻留**：商品列表、内容列表中让筛选条件始终可操作
- **关键操作保留**：在长页面中固定提交、保存或快捷操作区域

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| zIndex | Number | 1 | 否 | 吸顶层级 |
| offsetTop | Number | 0 | 否 | 吸顶距离顶部的偏移量，单位 px |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| change | 吸顶状态变化时触发 | ({ isFixed: boolean }) | `isFixed` 表示当前是否处于吸顶状态 |

### Methods

| 方法名称 | 参数 | 返回值 | 说明 |
|---------|------|--------|------|
| setPosition | (boxLeaved: boolean, position: string, top: number) | void | 手动设置吸顶状态与定位信息 |

### Slots

| 插槽名称 | 作用域参数 | 使用场景 |
|---------|-----------|---------|
| default | - | 需要被吸顶的内容区域 |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-sticky :offset-top="50">
    <wd-button type="primary">吸顶按钮</wd-button>
  </wd-sticky>
</template>
```

### 示例2：配合导航栏

将导航栏固定在页面顶部，常用于内容页和列表页。

```vue
<template>
  <wd-sticky :offset-top="0">
    <wd-navbar title="导航栏" />
  </wd-sticky>
</template>
```

### 示例3：指定容器内吸顶

在局部滚动区域中使用时，需要让容器具备固定高度和滚动能力。

```vue
<template>
  <view style="height: 400px; overflow: auto;">
    <wd-sticky :offset-top="50">
      <wd-button>容器内吸顶</wd-button>
    </wd-sticky>
  </view>
</template>
```

## 注意事项

- `offsetTop` 为距离页面顶部的偏移量，通常需要结合导航栏高度一起计算
- 在局部滚动容器中使用时，应先确认滚动上下文是否正确，否则吸顶行为可能不符合预期
- 组件依赖粘性定位能力实现，较老环境下需重点验证兼容性表现
- 组件实例还会暴露 `stickyState` 和 `offsetTop` 只读信息，适合与外部布局联动时读取状态
