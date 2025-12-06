# Gap 间距组件

<demo-model url="/subPages/gap/Index"></demo-model>


## 组件概况

### 组件概述
Gap 组件是一个用于创建固定间距的布局工具组件，通过简单的配置即可在页面中生成指定高度的空白区域，支持自定义背景色和安全区域适配。

### 详细功能描述
- 支持自定义高度，可传入数字或字符串值
- 支持自定义背景色
- 支持底部安全区域适配，确保在全面屏设备上显示正常
- 支持自定义样式和类名
- 轻量级实现，无复杂逻辑

### 适用业务场景
- 页面模块间的间距分隔
- 列表项之间的间距
- 表单元素之间的间距
- 需要安全区域适配的底部间距

## 完整API参考

### Props
| 名称 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| bgColor | string | transparent | 否 | 背景颜色 |
| safeAreaBottom | boolean | false | 否 | 是否开启底部安全区 |
| height | string / number | 15 | 否 | 高度 |
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

## 多场景使用示例代码

### 基础用法
```vue
<template>
  <view>
    <text>上方内容</text>
    <!-- 使用默认高度15px的间距 -->
    <wd-gap />
    <text>下方内容</text>
  </view>
</template>
```

### 自定义高度
```vue
<template>
  <view>
    <text>上方内容</text>
    <!-- 自定义高度为30px -->
    <wd-gap :height="30" />
    <!-- 也可以使用字符串形式 -->
    <wd-gap height="20rpx" />
    <text>下方内容</text>
  </view>
</template>
```

### 自定义背景色
```vue
<template>
  <view>
    <text>上方内容</text>
    <!-- 自定义背景色为灰色 -->
    <wd-gap height="20" bg-color="#f5f5f5" />
    <text>下方内容</text>
  </view>
</template>
```

### 底部安全区域适配
```vue
<template>
  <view>
    <text>主要内容区域</text>
    <!-- 底部安全区适配，确保在全面屏设备上不被遮挡 -->
    <wd-gap safe-area-bottom height="0" />
    <!-- 或者同时设置高度和安全区 -->
    <wd-gap safe-area-bottom height="20" bg-color="#fff" />
  </view>
</template>
```

### 自定义样式和类
```vue
<template>
  <view>
    <text>上方内容</text>
    <!-- 自定义样式和类 -->
    <wd-gap 
      height="20" 
      custom-style="border-radius: 8px;" 
      custom-class="my-gap"
    />
    <text>下方内容</text>
  </view>
</template>

<style scoped>
.my-gap {
  /* 自定义类样式 */
  border: 1px dashed #ddd;
}
</style>
```

## 样式定制指南

### customStyle 用法
使用 `customStyle` 属性可以直接为间距组件添加内联样式，例如：
```vue
<wd-gap custom-style="margin: 10px 0; background: linear-gradient(to right, #f00, #00f);" />
```

### customClass 用法
通过 `customClass` 属性可以为组件添加自定义CSS类，便于进行更复杂的样式定制：
```vue
<wd-gap custom-class="custom-gap" />

<style>
.custom-gap {
  /* 全局样式 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 15px;
}
</style>
```

## 注意事项

1. **高度单位**: 当传入数字类型的 `height` 属性时，默认使用 `px` 单位，小程序环境下会自动转换为 `rpx`。
2. **安全区域适配**: 只有在 `safeAreaBottom` 为 `true` 时，组件才会添加安全区域底部内边距。
3. **背景色**: `bgColor` 属性支持所有CSS颜色值，包括十六进制、RGB、RGBA等。
4. **性能优化**: 由于该组件结构简单，性能消耗极低，可放心大量使用。
5. **样式隔离**: 组件使用 `styleIsolation: 'shared'`，确保自定义样式能正常生效。
