# Img 图片

<demo-model url="/subPages/img/Index"></demo-model>


## 组件概况

### 组件概述
Img 组件是一个功能增强的图片组件，基于原生 image 组件封装，提供了加载状态、错误处理、图片预览、懒加载等增强功能，同时支持多种图片填充模式和样式定制。

### 核心功能
- 支持图片加载状态显示
- 支持图片加载错误处理
- 支持图片预览功能
- 支持懒加载
- 支持多种填充模式
- 支持圆形图片
- 支持圆角设置
- 支持长按显示菜单（微信小程序）

### 适用业务场景
- 商品图片展示
- 用户头像显示
- 文章配图
- 轮播图图片
- 列表图片
- 需要懒加载的长列表图片

## 完整API参考

### Props
| 名称 | 类型 | 默认值 | 必填项 | 描述 |
| --- | --- | --- | --- | --- |
| customImage | string | '' | 否 | 自定义图片样式类 |
| src | string | - | 否 | 图片链接 |
| previewSrc | string | - | 否 | 预览图片链接 |
| round | boolean | false | 否 | 是否显示为圆形 |
| mode | string | 'scaleToFill' | 否 | 填充模式，可选值：'top left' / 'top right' / 'bottom left' / 'bottom right' / 'right' / 'left' / 'center' / 'bottom' / 'top' / 'heightFix' / 'widthFix' / 'aspectFill' / 'aspectFit' / 'scaleToFill' |
| lazyLoad | boolean | false | 否 | 是否懒加载 |
| width | number / string | - | 否 | 宽度，默认单位为px |
| height | number / string | - | 否 | 高度，默认单位为px |
| radius | number / string | - | 否 | 圆角大小，默认单位为px |
| enablePreview | boolean | false | 否 | 是否允许预览 |
| showMenuByLongpress | boolean | false | 否 | 开启长按图片显示识别小程序码菜单，仅在微信小程序平台有效 |
| customStyle | string | '' | 否 | 自定义样式，对象格式 |
| customClass | string | '' | 否 | 自定义类名 |

### Events
| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| error | 图片加载失败时触发 | event: 事件对象 |
| click | 点击图片时触发 | event: 事件对象 |
| load | 图片加载成功时触发 | event: 事件对象 |

### Methods
Img 组件不直接对外暴露方法。

### Slots
| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| loading | - | 图片加载中时显示的内容 |
| error | - | 图片加载失败时显示的内容 |

## 多场景使用示例代码

### 基础用法

```vue
<template>
  <wd-img src="https://example.com/image.jpg" />
</template>
```

### 自定义尺寸和填充模式

```vue
<template>
  <wd-img 
    src="https://example.com/image.jpg" 
    width="200" 
    height="200" 
    mode="aspectFit"
  />
  <wd-img 
    src="https://example.com/image.jpg" 
    width="200" 
    height="200" 
    mode="aspectFill"
  />
  <wd-img 
    src="https://example.com/image.jpg" 
    width="200" 
    mode="widthFix"
  />
</template>
```

### 圆形图片和圆角图片

```vue
<template>
  <!-- 圆形头像 -->
  <wd-img 
    src="https://example.com/avatar.jpg" 
    width="80" 
    height="80" 
    round
  />
  
  <!-- 圆角图片 -->
  <wd-img 
    src="https://example.com/image.jpg" 
    width="200" 
    height="150" 
    :radius="12"
  />
</template>
```

### 带加载和错误状态

```vue
<template>
  <wd-img src="https://example.com/image.jpg">
    <template #loading>
      <view class="img-loading">
        <wd-icon name="loading" size="32" color="#1989fa" />
        <text>加载中...</text>
      </view>
    </template>
    <template #error>
      <view class="img-error">
        <wd-icon name="error" size="32" color="#ff4d4f" />
        <text>加载失败</text>
      </view>
    </template>
  </wd-img>
</template>

<style scoped>
.img-loading,
.img-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 150px;
  background-color: #f5f7fa;
  color: #909399;
}

.img-loading text,
.img-error text {
  margin-top: 8px;
  font-size: 14px;
}
</style>
```

### 图片预览功能

```vue
<template>
  <wd-img 
    src="https://example.com/thumbnail.jpg" 
    :enable-preview="true" 
    preview-src="https://example.com/full-size.jpg"
    width="200"
    height="150"
  />
</template>
```

### 懒加载图片

```vue
<template>
  <view>
    <!-- 长列表中的图片使用懒加载 -->
    <wd-img 
      v-for="item in imageList" 
      :key="item.id" 
      :src="item.src" 
      :lazy-load="true" 
      width="100%"
      height="200"
      mode="aspectFill"
    />
  </view>
</template>

<script setup lang="ts">
const imageList = [
  { id: 1, src: 'https://example.com/image1.jpg' },
  { id: 2, src: 'https://example.com/image2.jpg' },
  { id: 3, src: 'https://example.com/image3.jpg' },
  // 更多图片...
]
</script>
```

## 样式定制指南

### 使用 customImage 自定义图片样式

```vue
<template>
  <wd-img 
    src="https://example.com/image.jpg" 
    custom-image="my-custom-image"
    width="200"
    height="150"
  />
</template>

<style scoped>
.my-custom-image {
  border: 2px solid #1989fa;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
</style>
```

### 使用 customStyle 自定义容器样式

```vue
<template>
  <wd-img 
    src="https://example.com/image.jpg" 
    :custom-style="{
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e4e7ed'
    }"
    width="200"
    height="150"
  />
</template>
```

## 注意事项

1. **填充模式**：mode 属性支持多种填充模式，需根据实际需求选择合适的模式：
   - `scaleToFill`：不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素
   - `aspectFit`：保持纵横比缩放图片，使图片的长边能完全显示出来
   - `aspectFill`：保持纵横比缩放图片，只保证图片的短边能完全显示出来
   - `widthFix`：宽度不变，高度自动变化，保持原图宽高比不变
   - `heightFix`：高度不变，宽度自动变化，保持原图宽高比不变

2. **懒加载**：lazyLoad 属性仅在 scroll-view、list-view 或 swiper 组件中有效，需要确保图片在滚动容器内。

3. **图片预览**：enablePreview 属性为 true 时，点击图片会触发预览功能，若未设置 previewSrc，则使用 src 作为预览图片链接。

4. **圆形图片**：round 属性为 true 时，会忽略 radius 属性，将图片显示为圆形。

5. **长按菜单**：showMenuByLongpress 属性仅在微信小程序平台有效，用于开启长按图片显示识别小程序码菜单。

6. **性能优化**：
   - 对于长列表中的图片，建议使用懒加载以提高性能
   - 合理设置图片尺寸，避免图片过大导致加载缓慢
   - 使用合适的填充模式，避免图片变形或拉伸

7. **错误处理**：通过 error 事件可以捕获图片加载错误，并进行相应的处理，如显示默认图片或重试加载。