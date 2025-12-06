# Curtain 幕帘

<demo-model url="/subPages/curtain/Index"></demo-model>

## 组件概况

### 组件概述
Curtain 是一个全屏或居中显示的幕帘组件，主要用于展示图片、广告或重要信息，支持多种关闭方式和自定义样式。

### 详细功能描述
- 支持全屏居中展示图片
- 提供多种关闭按钮位置选项
- 支持点击遮罩关闭幕帘
- 支持图片加载状态监听
- 支持自定义关闭按钮样式
- 支持长按图片显示菜单（微信小程序）
- 支持点击图片跳转链接
- 支持点击图片关闭幕帘
- 提供完整的过渡动画事件

### 适用业务场景
- 应用启动广告展示
- 重要活动宣传图展示
- 产品详情大图查看
- 弹窗式图片展示
- 需要全屏覆盖的提示信息

## 完整API参考

### Props
| 名称 | 类型 | 默认值 | 必填项 | 描述 |
| --- | --- | --- | --- | --- |
| value | boolean | false | 否 | 绑定值，展示/关闭幕帘（已废弃，请使用modelValue） |
| modelValue | boolean | false | 否 | 绑定值，展示/关闭幕帘 |
| closePosition | string | "inset" | 否 | 关闭按钮位置，可选值：inset / top / bottom / top-left / top-right / bottom-left / bottom-right |
| src | string | - | 是 | 幕帘图片地址，必须使用网络地址 |
| to | string | - | 否 | 幕帘图片点击链接 |
| width | number | - | 否 | 幕帘图片宽度 |
| closeOnClickModal | boolean | false | 否 | 点击遮罩是否关闭 |
| hideWhenClose | boolean | true | 否 | 是否当关闭时将弹出层隐藏（display: none） |
| zIndex | number | 10 | 否 | 设置层级 |
| customCloseClass | string | "" | 否 | 自定义关闭按钮的类名 |
| customCloseStyle | string | "" | 否 | 自定义关闭按钮的样式 |
| rootPortal | boolean | false | 否 | 是否从页面中脱离出来，用于解决各种 fixed 失效问题 |
| showMenuByLongpress | boolean | false | 否 | 开启长按图片显示识别小程序码菜单，仅在微信小程序平台有效 |
| closeOnClick | boolean | true | 否 | 点击图片是否关闭幕帘 |
| customStyle | string | "" | 否 | 自定义样式 |
| customClass | string | "" | 否 | 自定义类名 |

### Events
| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| beforeenter | 进入动画开始前触发 | - |
| enter | 进入动画进行中触发 | - |
| afterenter | 进入动画结束后触发 | - |
| beforeleave | 离开动画开始前触发 | - |
| leave | 离开动画进行中触发 | - |
| afterleave | 离开动画结束后触发 | - |
| closed | 关闭动画结束后触发 | - |
| close | 关闭时触发 | - |
| click-modal | 点击遮罩时触发 | - |
| load | 图片加载成功时触发 | - |
| error | 图片加载失败时触发 | - |
| click | 点击图片时触发 | - |
| update:modelValue | 绑定值变化时触发 | 新的绑定值 |

### Methods
该组件没有对外暴露的方法。

### Slots
| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| close | - | 自定义关闭按钮，默认显示关闭图标 |

## 多场景使用示例代码

### 基础用法
```vue
<template>
  <view>
    <wd-button @click="showCurtain = true">打开幕帘</wd-button>
    <wd-curtain
      v-model="showCurtain"
      src="https://example.com/image.jpg"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showCurtain = ref(false)
</script>
```

### 自定义关闭按钮位置
```vue
<template>
  <view>
    <wd-button @click="showCurtain = true">打开幕帘</wd-button>
    <wd-curtain
      v-model="showCurtain"
      src="https://example.com/image.jpg"
      closePosition="top-right"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showCurtain = ref(false)
</script>
```

### 点击遮罩关闭
```vue
<template>
  <view>
    <wd-button @click="showCurtain = true">打开幕帘</wd-button>
    <wd-curtain
      v-model="showCurtain"
      src="https://example.com/image.jpg"
      closeOnClickModal="true"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showCurtain = ref(false)
</script>
```

### 自定义关闭按钮
```vue
<template>
  <view>
    <wd-button @click="showCurtain = true">打开幕帘</wd-button>
    <wd-curtain
      v-model="showCurtain"
      src="https://example.com/image.jpg"
    >
      <template #close>
        <wd-button type="primary" size="small" @click="showCurtain = false">关闭</wd-button>
      </template>
    </wd-curtain>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showCurtain = ref(false)
</script>
```

### 图片点击跳转
```vue
<template>
  <view>
    <wd-button @click="showCurtain = true">打开幕帘</wd-button>
    <wd-curtain
      v-model="showCurtain"
      src="https://example.com/image.jpg"
      to="/pages/detail/index"
      closeOnClick="false"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showCurtain = ref(false)
</script>
```

## 样式定制指南

### 自定义幕帘样式
```vue
<template>
  <view>
    <wd-button @click="showCurtain = true">打开幕帘</wd-button>
    <wd-curtain
      v-model="showCurtain"
      src="https://example.com/image.jpg"
      customClass="my-curtain"
      customStyle="border-radius: 10px;"
      customCloseClass="my-close-btn"
      customCloseStyle="color: red; font-size: 32rpx;"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showCurtain = ref(false)
</script>

<style scoped>
.my-curtain {
  /* 自定义幕帘样式 */
}

.my-close-btn {
  /* 自定义关闭按钮样式 */
}
</style>
```

## 注意事项

1. 图片地址必须使用网络地址，不支持本地图片
2. 点击图片跳转链接仅支持小程序内页面跳转
3. showMenuByLongpress 属性仅在微信小程序平台有效
4. 使用 rootPortal 属性可以解决 fixed 定位失效问题
5. 建议设置合适的 zIndex 值，避免与其他组件层级冲突
6. 图片加载失败时会触发 error 事件，可用于处理异常情况
7. 关闭按钮位置使用 inset 时，按钮会覆盖在图片上
8. 组件内部使用了 wd-popup 组件，继承了其部分特性