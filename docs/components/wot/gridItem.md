# GridItem 网格项

<demo-model url="/subPages/gridItem/Index"></demo-model>


## 组件概况

### 组件概述
GridItem 是 Grid 组件的子组件，用于定义网格布局中的单个网格项。它支持图标、文字、徽章等元素的组合展示，并提供点击交互和路由跳转功能。

### 核心功能
- 支持图标展示
- 支持文字描述
- 支持徽章通知（红点/数字）
- 支持点击跳转
- 支持多种页面跳转方式
- 支持自定义样式

### 适用业务场景
- 首页功能入口
- 分类导航项
- 商品卡片
- 功能图标按钮
- 带通知标记的网格项

## 完整API参考

### Props
| 名称 | 类型 | 默认值 | 必填项 | 描述 |
| --- | --- | --- | --- | --- |
| customText | string | '' | 否 | GridItem 下方文字样式 |
| customIcon | string | '' | 否 | GridItem 上方 icon 样式 |
| icon | string | '' | 否 | 图标名称，可选值见 wd-icon 组件 |
| iconSize | string | '26px' | 否 | 图标大小 |
| text | string | '' | 否 | 文字 |
| url | string | '' | 否 | 点击后跳转的链接地址 |
| linkType | string | 'navigateTo' | 否 | 页面跳转方式，可选值：navigateTo / switchTab / reLaunch / redirectTo |
| isDot | boolean | false | 否 | 是否显示图标右上角小红点 |
| type | string | - | 否 | 图标右上角显示的 badge 类型，可选值：primary / success / warning / danger / info |
| value | number / string | - | 否 | 图标右上角 badge 显示值 |
| max | number | - | 否 | 图标右上角 badge 最大值，超过最大值会显示 '{max}+'，要求 value 是 Number 类型 |
| badgeProps | object | - | 否 | 徽标属性，透传给 Badge 组件 |
| customStyle | string | '' | 否 | 自定义样式，对象格式 |
| customClass | string | '' | 否 | 自定义类名 |

### Events
| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| itemclick | 点击 GridItem 时触发 | - |

### Methods
| 方法名 | 参数 | 返回值 | 功能说明 |
| --- | --- | --- | --- |
| setiIemClass | classes: string | void | 设置 GridItem 的样式类 |

### Slots
| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| default | - | 自定义 GridItem 内容，覆盖默认的图标和文字布局 |
| icon | - | 自定义图标内容，替换默认的 wd-icon 组件 |
| text | - | 自定义文字内容，替换默认的文字展示 |

## 多场景使用示例代码

### 基础用法

```vue
<template>
  <wd-grid :column="4" :border="true">
    <wd-grid-item 
      v-for="item in 8" 
      :key="item" 
      :text="`Item ${item}`" 
    />
  </wd-grid>
</template>
```

### 带图标的网格项

```vue
<template>
  <wd-grid :column="4">
    <wd-grid-item 
      :icon="'home'" 
      :text="'首页'"
    />
    <wd-grid-item 
      :icon="'category'" 
      :text="'分类'"
    />
    <wd-grid-item 
      :icon="'cart'" 
      :text="'购物车'"
    />
    <wd-grid-item 
      :icon="'user'" 
      :text="'我的'"
    />
  </wd-grid>
</template>
```

### 带徽章的网格项

```vue
<template>
  <wd-grid :column="4">
    <wd-grid-item 
      :icon="'home'" 
      :text="'首页'"
    />
    <wd-grid-item 
      :icon="'category'" 
      :text="'分类'"
      :is-dot="true"
    />
    <wd-grid-item 
      :icon="'cart'" 
      :text="'购物车'"
      :value="5"
      :type="'success'"
    />
    <wd-grid-item 
      :icon="'user'" 
      :text="'我的'"
      :value="12"
      :max="9"
      :type="'danger'"
    />
  </wd-grid>
</template>
```

### 带跳转链接的网格项

```vue
<template>
  <wd-grid :column="3">
    <wd-grid-item 
      :icon="'phone'" 
      :text="'联系我们'"
      :url="'/pages/contact/index'"
      :link-type="'navigateTo'"
    />
    <wd-grid-item 
      :icon="'setting'" 
      :text="'设置'"
      :url="'/pages/setting/index'"
    />
    <wd-grid-item 
      :icon="'cart'" 
      :text="'购物车'"
      :url="'/pages/cart/index'"
      :link-type="'switchTab'"
    />
  </wd-grid>
</template>
```

### 自定义内容的网格项

```vue
<template>
  <wd-grid :column="2" :gutter="10">
    <wd-grid-item>
      <template #default>
        <view class="custom-grid-item">
          <view class="custom-grid-item__header">
            <wd-icon name="coupon" :size="32" />
            <view class="custom-grid-item__badge">新</view>
          </view>
          <view class="custom-grid-item__content">
            <text class="custom-grid-item__title">优惠券</text>
            <text class="custom-grid-item__desc">点击领取</text>
          </view>
        </view>
      </template>
    </wd-grid-item>
    <wd-grid-item>
      <template #default>
        <view class="custom-grid-item">
          <view class="custom-grid-item__header">
            <wd-icon name="gift" :size="32" />
          </view>
          <view class="custom-grid-item__content">
            <text class="custom-grid-item__title">礼品兑换</text>
            <text class="custom-grid-item__desc">积分兑换</text>
          </view>
        </view>
      </template>
    </wd-grid-item>
  </wd-grid>
</template>

<style scoped>
.custom-grid-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 10px;
}

.custom-grid-item__header {
  position: relative;
  margin-bottom: 10px;
}

.custom-grid-item__badge {
  position: absolute;
  top: -5px;
  right: -10px;
  background-color: #ff4d4f;
  color: white;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 10px;
}

.custom-grid-item__content {
  text-align: center;
}

.custom-grid-item__title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
}

.custom-grid-item__desc {
  font-size: 12px;
  color: #999;
}
</style>
```

## 样式定制指南

### 使用 customStyle 自定义样式

```vue
<template>
  <wd-grid :column="4">
    <wd-grid-item 
      :icon="'star'" 
      :text="'收藏'"
      :custom-style="{ 
        borderRadius: '8px', 
        backgroundColor: '#f0f9ff',
        padding: '10px'
      }"
    />
    <wd-grid-item 
      :icon="'heart'" 
      :text="'喜欢'"
      :custom-style="{ 
        borderRadius: '8px', 
        backgroundColor: '#fff2f0',
        padding: '10px'
      }"
    />
  </wd-grid>
</template>
```

### 使用 customIcon 和 customText 自定义图标和文字样式

```vue
<template>
  <wd-grid :column="4">
    <wd-grid-item 
      :icon="'home'" 
      :text="'首页'"
      :custom-icon="'my-custom-icon'"
      :custom-text="'my-custom-text'"
    />
  </wd-grid>
</template>

<style scoped>
.my-custom-icon {
  color: #1989fa;
  font-weight: bold;
}

.my-custom-text {
  color: #333;
  font-size: 14px;
  margin-top: 5px;
}
</style>
```

## 注意事项

1. **跳转方式**：linkType 属性支持四种页面跳转方式，需根据实际场景选择：
   - `navigateTo`：保留当前页面，跳转到应用内的某个页面
   - `switchTab`：跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
   - `reLaunch`：关闭所有页面，打开到应用内的某个页面
   - `redirectTo`：关闭当前页面，跳转到应用内的某个页面

2. **徽章配置**：
   - `isDot` 为 true 时，会显示小红点，忽略 value 属性
   - `value` 属性用于显示数字徽章
   - `max` 属性用于设置徽章最大值，超过则显示 "{max}+"
   - `type` 属性用于设置徽章颜色类型

3. **自定义内容**：
   - 使用默认插槽可以完全自定义 GridItem 的内容结构
   - 使用 icon 或 text 插槽可以分别自定义图标或文字部分

4. **样式继承**：
   - GridItem 会继承 Grid 组件的一些属性，如 clickable、square、border 等
   - 父组件 Grid 的 gutter 属性会影响 GridItem 的间距和边框样式

5. **性能优化**：
   - 当网格项数量较多时，建议使用 v-for 的 key 属性优化渲染性能
   - 对于固定内容的网格项，可考虑使用静态渲染

6. **点击反馈**：
   - 当 Grid 组件设置 clickable 为 true 时，GridItem 会自动添加点击反馈效果
   - 可通过 Grid 组件的 hoverClass 属性自定义点击反馈样式