# Popup 弹出层

<demo-model url="/subPages/popup/Index"></demo-model>

## 组件概况

### 组件概述
Popup 组件是一种在页面中弹出的容器，用于显示临时内容，通常用于模态框、抽屉、侧边栏、底部弹出菜单等场景。wd-popup 组件提供了灵活的配置选项，支持多种弹出位置、动画效果、遮罩控制、关闭方式等功能。

### 详细功能描述
- 支持多种弹出位置：center、top、right、bottom、left
- 支持多种动画效果：fade、slide、zoom 等
- 支持遮罩显示/隐藏控制
- 支持点击遮罩关闭
- 支持显示关闭按钮
- 支持自定义层级
- 支持自定义动画时长
- 支持懒渲染
- 支持锁定滚动
- 支持根节点脱离文档流
- 支持底部安全距离适配
- 支持丰富的过渡事件

### 适用业务场景
- 模态框
- 抽屉组件
- 侧边栏
- 底部弹出菜单
- 通知提示
- 确认对话框

## 完整API参考

### Props属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| transition | string | - | 否 | 动画类型，可选值：fade / fade-up / fade-down / fade-left / fade-right / slide-up / slide-down / slide-left / slide-right / zoom-in |
| closable | boolean | false | 否 | 是否显示关闭按钮 |
| position | string | 'center' | 否 | 弹出框的位置，可选值：center / top / right / bottom / left |
| closeOnClickModal | boolean | true | 否 | 点击遮罩是否关闭 |
| duration | number / boolean | 300 | 否 | 动画持续时间 |
| modal | boolean | true | 否 | 是否显示遮罩 |
| zIndex | number | 10 | 否 | 设置层级 |
| hideWhenClose | boolean | true | 否 | 是否当关闭时将弹出层隐藏（display: none) |
| modalStyle | string | '' | 否 | 遮罩样式 |
| safeAreaInsetBottom | boolean | false | 否 | 弹出面板是否设置底部安全距离（iphone X 类型的机型） |
| modelValue | boolean | false | 否 | 弹出层是否显示 |
| lazyRender | boolean | true | 否 | 弹层内容懒渲染，触发展示时才渲染内容 |
| lockScroll | boolean | true | 否 | 是否锁定滚动 |
| rootPortal | boolean | false | 否 | 是否从页面中脱离出来，用于解决各种 fixed 失效问题 (H5: teleport, APP: renderjs, 小程序: root-portal) |
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |

### Events事件

| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| update:modelValue | 弹出层显示状态改变时 | value: boolean - 弹出层显示状态 |
| before-enter | 进入过渡开始之前 | - |
| enter | 进入过渡开始 | - |
| after-enter | 进入过渡结束 | - |
| before-leave | 离开过渡开始之前 | - |
| leave | 离开过渡开始 | - |
| after-leave | 离开过渡结束 | - |
| click-modal | 点击遮罩层时 | - |
| close | 关闭弹出层时 | - |

### Methods方法

该组件没有对外暴露的方法。

### Slots插槽

| 插槽名 | 作用域变量 | 使用说明 |
|--------|------------|----------|
| default | - | 弹出层内容 |

## 多场景使用示例代码

### 1. 基础用法

```vue
<template>
  <view class="popup-demo">
    <wd-button @click="show = true">显示弹出层</wd-button>
    <wd-popup v-model="show" position="center">
      <view class="popup-content">
        <view class="popup-title">居中弹出层</view>
        <view class="popup-text">这是一个居中显示的弹出层</view>
        <wd-button size="small" @click="show = false">关闭</wd-button>
      </view>
    </wd-popup>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(false)
</script>

<style scoped>
.popup-demo {
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
}

.popup-content {
  width: 300px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.popup-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.popup-text {
  font-size: 14px;
  color: #666;
  text-align: center;
}
</style>
```

### 2. 底部弹出

```vue
<template>
  <view class="popup-demo">
    <wd-button @click="show = true">底部弹出</wd-button>
    <wd-popup v-model="show" position="bottom" closable>
      <view class="popup-content bottom-popup">
        <view class="popup-title">底部弹出层</view>
        <view class="popup-text">这是一个从底部弹出的弹出层</view>
      </view>
    </wd-popup>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(false)
</script>

<style scoped>
.popup-demo {
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
}

.bottom-popup {
  width: 100%;
  border-radius: 16px 16px 0 0;
  padding: 30px 20px;
}

.popup-content {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.popup-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.popup-text {
  font-size: 14px;
  color: #666;
  text-align: center;
}
</style>
```

### 3. 自定义动画

```vue
<template>
  <view class="popup-demo">
    <wd-button @click="show = true">自定义动画</wd-button>
    <wd-popup v-model="show" position="center" transition="zoom-in">
      <view class="popup-content">
        <view class="popup-title">缩放动画</view>
        <view class="popup-text">这是一个使用缩放动画的弹出层</view>
        <wd-button size="small" @click="show = false">关闭</wd-button>
      </view>
    </wd-popup>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(false)
</script>
```

### 4. 无遮罩模式

```vue
<template>
  <view class="popup-demo">
    <wd-button @click="show = true">无遮罩模式</wd-button>
    <wd-popup v-model="show" position="right" modal="false">
      <view class="popup-content right-popup">
        <view class="popup-title">侧边栏</view>
        <view class="popup-text">这是一个没有遮罩的侧边栏</view>
        <wd-button size="small" @click="show = false">关闭</wd-button>
      </view>
    </wd-popup>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(false)
</script>

<style scoped>
.popup-demo {
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
}

.right-popup {
  width: 250px;
  height: 100%;
  border-radius: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
}

.popup-content {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.popup-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.popup-text {
  font-size: 14px;
  color: #666;
  text-align: center;
}
</style>
```

### 5. 底部安全距离适配

```vue
<template>
  <view class="popup-demo">
    <wd-button @click="show = true">底部安全距离</wd-button>
    <wd-popup v-model="show" position="bottom" safe-area-inset-bottom>
      <view class="popup-content bottom-popup">
        <view class="popup-title">底部安全距离</view>
        <view class="popup-text">这是一个适配底部安全距离的弹出层</view>
        <wd-button size="small" @click="show = false">关闭</wd-button>
      </view>
    </wd-popup>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(false)
</script>
```

## 样式定制指南

### customStyle 用法
使用 customStyle 属性可以自定义弹出层的内联样式。

```vue
<wd-popup 
  v-model="show" 
  position="center"
  custom-style="width: 80%; max-width: 400px;"
>
  <!-- 内容 -->
</wd-popup>
```

### customClass 用法
使用 customClass 属性可以为弹出层添加自定义样式类。

```vue
<wd-popup 
  v-model="show" 
  position="center"
  custom-class="my-popup"
>
  <!-- 内容 -->
</wd-popup>

<style scoped>
:deep(.my-popup) {
  --wd-popup-bg-color: #f0f9ff;
  --wd-popup-border-radius: 12px;
  --wd-popup-box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}
</style>
```

### 遮罩样式定制

```vue
<wd-popup 
  v-model="show" 
  position="center"
  modal-style="background-color: rgba(0, 0, 0, 0.3);"
>
  <!-- 内容 -->
</wd-popup>
```

## 注意事项

1. **position 属性**：position 决定了弹出层的显示位置，支持 center、top、right、bottom、left 五种位置。

2. **transition 属性**：transition 决定了弹出层的动画效果，支持多种过渡动画类型。

3. **modal 属性**：modal 控制是否显示遮罩，当 modal 为 false 时，点击弹出层外部不会关闭弹出层。

4. **closeOnClickModal 属性**：closeOnClickModal 控制点击遮罩是否关闭弹出层，当 closeOnClickModal 为 false 时，点击遮罩不会关闭弹出层。

5. **rootPortal 属性**：rootPortal 用于解决弹出层在某些场景下 fixed 定位失效的问题，支持 H5、APP 和小程序。

6. **safeAreaInsetBottom 属性**：safeAreaInsetBottom 用于适配 iPhone X 等机型的底部安全距离，当 safeAreaInsetBottom 为 true 时，弹出层底部会自动添加安全距离。

7. **lazyRender 属性**：lazyRender 用于控制弹出层内容的渲染时机，当 lazyRender 为 true 时，只有在弹出层显示时才会渲染内容。

8. **lockScroll 属性**：lockScroll 用于控制是否锁定页面滚动，当 lockScroll 为 true 时，弹出层显示时会阻止页面滚动。

9. **过渡事件**：组件提供了丰富的过渡事件，包括 before-enter、enter、after-enter、before-leave、leave、after-leave，可以用于在过渡过程中执行自定义逻辑。

10. **性能优化**：对于复杂的弹出层内容，建议使用 lazyRender 属性，避免不必要的渲染开销。

11. **兼容性**：组件在不同平台上的表现可能略有差异，特别是在根节点脱离文档流和过渡动画方面。