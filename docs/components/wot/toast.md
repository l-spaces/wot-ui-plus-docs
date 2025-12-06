# Toast 提示
<demo-model url="/subPages/toast/Index"></demo-model>

## 组件概况

### 组件概述
提示组件是用于显示临时通知信息的轻量级UI组件，支持多种类型和自定义配置。wd-toast组件提供了成功、错误、警告、加载、信息等多种提示类型，支持自定义位置、时长、图标和布局，适用于各种需要临时反馈的场景。

### 详细功能描述
- 支持5种提示类型：success、error、warning、loading、info
- 支持4种位置：top、middle-top、middle、bottom
- 支持自定义提示时长
- 支持垂直和水平两种布局方向
- 支持加载状态，可配置加载类型和颜色
- 支持自定义图标大小和颜色
- 支持遮罩层
- 支持函数式API调用
- 支持完全展示和完全关闭的回调函数
- 支持自定义z-index
- 支持自定义图标类名

### 适用业务场景
- 操作成功提示
- 操作失败提示
- 警告信息提示
- 加载状态提示
- 普通信息提示
- 任何需要临时反馈的场景

## 完整API参考

### Props属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| msg | string | '' | 否 | 提示信息 |
| direction | 'vertical' / 'horizontal' | horizontal | 否 | 排列方向 |
| iconName | 'success' / 'error' / 'warning' / 'loading' / 'info' | '' | 否 | 图标名称 |
| iconSize | number | - | 否 | 图标大小 |
| loadingType | 'outline' / 'ring' | outline | 否 | 加载类型 |
| loadingColor | string | '#4D80F0' | 否 | 加载颜色 |
| loadingSize | number | - | 否 | 加载大小 |
| iconColor | string | - | 否 | 图标颜色 |
| position | 'top' / 'middle-top' / 'middle' / 'bottom' | middle-top | 否 | 提示信息框的位置 |
| zIndex | number | 100 | 否 | 层级 |
| cover | boolean | false | 否 | 是否存在遮罩层 |
| iconClass | string | '' | 否 | 图标类名 |
| classPrefix | string | 'wd-icon' | 否 | 类名前缀，用于使用自定义图标 |
| opened | Function | - | 否 | 完全展示后的回调函数 |
| closed | Function | - | 否 | 完全关闭时的回调函数 |
| customStyle | string / object | '' | 否 | 自定义样式 |
| customClass | string | '' | 否 | 自定义类名 |

### Methods方法

| 方法名 | 参数 | 返回值 | 功能说明 |
|--------|------|--------|----------|
| show | ToastOptions / string | void | 打开Toast |
| success | ToastOptions / string | void | 显示成功提示 |
| error | ToastOptions / string | void | 显示错误提示 |
| warning | ToastOptions / string | void | 显示警告提示 |
| info | ToastOptions / string | void | 显示信息提示 |
| loading | ToastOptions / string | void | 显示加载提示 |
| close | - | void | 关闭Toast |

### ToastOptions 类型

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| msg | string | '' | 否 | 提示信息 |
| duration | number | 2000 | 否 | 提示时长，单位毫秒，0表示不自动关闭 |
| direction | 'vertical' / 'horizontal' | horizontal | 否 | 排列方向 |
| iconName | 'success' / 'error' / 'warning' / 'loading' / 'info' | '' | 否 | 图标名称 |
| iconSize | number | - | 否 | 图标大小 |
| loadingType | 'outline' / 'ring' | outline | 否 | 加载类型 |
| loadingColor | string | '#4D80F0' | 否 | 加载颜色 |
| loadingSize | number | - | 否 | 加载大小 |
| iconColor | string | - | 否 | 图标颜色 |
| position | 'top' / 'middle-top' / 'middle' / 'bottom' | middle-top | 否 | 提示信息框的位置 |
| show | boolean | false | 否 | 是否显示 |
| zIndex | number | 100 | 否 | 层级 |
| cover | boolean | false | 否 | 是否存在遮罩层 |
| iconClass | string | '' | 否 | 图标类名 |
| classPrefix | string | 'wd-icon' | 否 | 类名前缀，用于使用自定义图标 |
| opened | () => void | - | 否 | 完全展示后的回调函数 |
| closed | () => void | - | 否 | 完全关闭时的回调函数 |

## 多场景使用示例代码

### 1. 基础用法（组件式）
```vue
<template>
  <wd-toast v-model="showToast" msg="操作成功" icon-name="success"></wd-toast>
  <wd-button type="primary" @click="showToast = true">显示提示</wd-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 控制Toast显示
const showToast = ref(false)
</script>
```

### 2. 函数式API使用
```vue
<template>
  <wd-button type="primary" @click="showSuccess">成功提示</wd-button>
  <wd-button type="success" @click="showError">错误提示</wd-button>
  <wd-button type="warning" @click="showWarning">警告提示</wd-button>
  <wd-button type="info" @click="showInfo">信息提示</wd-button>
  <wd-button @click="showLoading">加载提示</wd-button>
</template>

<script setup lang="ts">
import { useToast } from '@/uni_modules/wot-ui-plus/components/wd-toast'

// 获取toast实例
const toast = useToast()

// 成功提示
const showSuccess = () => {
  toast.success('操作成功')
}

// 错误提示
const showError = () => {
  toast.error('操作失败')
}

// 警告提示
const showWarning = () => {
  toast.warning('警告信息')
}

// 信息提示
const showInfo = () => {
  toast.info('普通信息')
}

// 加载提示
const showLoading = () => {
  toast.loading('加载中...')
  // 模拟加载完成
  setTimeout(() => {
    toast.close()
  }, 2000)
}
</script>
```

### 3. 自定义配置
```vue
<template>
  <wd-button type="primary" @click="showCustomToast">自定义提示</wd-button>
</template>

<script setup lang="ts">
import { useToast } from '@/uni_modules/wot-ui-plus/components/wd-toast'

// 获取toast实例
const toast = useToast()

// 自定义提示
const showCustomToast = () => {
  toast.show({
    msg: '自定义提示',
    iconName: 'success',
    position: 'bottom',
    duration: 3000,
    direction: 'vertical',
    iconSize: 60,
    cover: true,
    opened: () => {
      console.log('Toast 完全展示')
    },
    closed: () => {
      console.log('Toast 完全关闭')
    }
  })
}
</script>
```

### 4. 不同位置和布局
```vue
<template>
  <wd-button @click="showTop">顶部提示</wd-button>
  <wd-button @click="showMiddleTop">中部偏上</wd-button>
  <wd-button @click="showMiddle">居中提示</wd-button>
  <wd-button @click="showBottom">底部提示</wd-button>
  <wd-button @click="showVertical">垂直布局</wd-button>
</template>

<script setup lang="ts">
import { useToast } from '@/uni_modules/wot-ui-plus/components/wd-toast'

// 获取toast实例
const toast = useToast()

// 顶部提示
const showTop = () => {
  toast.success({
    msg: '顶部提示',
    position: 'top'
  })
}

// 中部偏上
const showMiddleTop = () => {
  toast.success({
    msg: '中部偏上提示',
    position: 'middle-top'
  })
}

// 居中提示
const showMiddle = () => {
  toast.success({
    msg: '居中提示',
    position: 'middle'
  })
}

// 底部提示
const showBottom = () => {
  toast.success({
    msg: '底部提示',
    position: 'bottom'
  })
}

// 垂直布局
const showVertical = () => {
  toast.success({
    msg: '垂直布局提示',
    direction: 'vertical'
  })
}
</script>
```

### 5. 加载状态配置
```vue
<template>
  <wd-button @click="showRingLoading">环形加载</wd-button>
  <wd-button @click="showOutlineLoading">轮廓加载</wd-button>
  <wd-button @click="showCustomLoading">自定义加载</wd-button>
</template>

<script setup lang="ts">
import { useToast } from '@/uni_modules/wot-ui-plus/components/wd-toast'

// 获取toast实例
const toast = useToast()

// 环形加载
const showRingLoading = () => {
  toast.loading({
    msg: '环形加载',
    loadingType: 'ring'
  })
  setTimeout(() => {
    toast.close()
  }, 2000)
}

// 轮廓加载
const showOutlineLoading = () => {
  toast.loading({
    msg: '轮廓加载',
    loadingType: 'outline'
  })
  setTimeout(() => {
    toast.close()
  }, 2000)
}

// 自定义加载
const showCustomLoading = () => {
  toast.loading({
    msg: '自定义加载',
    loadingColor: '#1989fa',
    loadingSize: 40,
    duration: 0,
    cover: true
  })
  setTimeout(() => {
    toast.close()
  }, 3000)
}
</script>
```

## 样式定制指南

### 自定义类名
```vue
<template>
  <wd-toast 
    v-model="showToast" 
    msg="自定义样式" 
    icon-name="success" 
    custom-class="my-toast"
  ></wd-toast>
  <wd-button type="primary" @click="showToast = true">自定义样式</wd-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 控制Toast显示
const showToast = ref(false)
</script>

<style lang="scss">
.my-toast {
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 12rpx;
  padding: 20rpx 30rpx;
  
  .wd-toast__msg {
    color: #fff;
    font-size: 28rpx;
    margin-top: 10rpx;
  }
  
  .wd-toast__icon {
    color: #1989fa;
  }
}
</style>
```

### 自定义样式
```vue
<template>
  <wd-toast 
    v-model="showToast" 
    msg="自定义样式" 
    icon-name="success" 
    :custom-style="{ 
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderRadius: '12rpx',
      padding: '20rpx 30rpx'
    }"
  ></wd-toast>
  <wd-button type="primary" @click="showToast = true">自定义样式</wd-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 控制Toast显示
const showToast = ref(false)
</script>
```

## 注意事项

1. 函数式API使用前需要通过`useToast()`获取toast实例
2. 加载类型(loadingType)只有在iconName为'loading'时生效
3. 遮罩层(cover)会阻止背景点击
4. 时长(duration)设置为0时，toast不会自动关闭，需要手动调用close()
5. 位置(position)默认为'middle-top'
6. 布局方向(direction)默认为'horizontal'
7. 自定义图标类名(iconClass)优先级高于iconName
8. 完全展示(opened)和完全关闭(closed)回调函数在动画完成后触发
9. 函数式API创建的toast实例是全局共享的，多次调用会替换之前的toast
10. 使用组件式toast时，需要通过v-model控制显示和隐藏
11. toast组件会自动处理z-index，避免与其他组件冲突
12. 建议在适当的时机调用close()方法关闭loading类型的toast

## 组件式使用注意

当直接使用组件形式时，需要注意以下几点：

```vue
<template>
  <wd-toast
    v-model="show"
    msg="组件式使用"
    icon-name="success"
    :duration="2000"
  ></wd-toast>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const show = ref(false)

// 监听show变化，处理自动关闭
watch(show, (newVal) => {
  if (newVal) {
    setTimeout(() => {
      show.value = false
    }, 2000)
  }
})
</script>
```

## 函数式API高级使用

```vue
<template>
  <wd-button @click="showAdvancedToast">高级配置</wd-button>
</template>

<script setup lang="ts">
import { useToast } from '@/uni_modules/wot-ui-plus/components/wd-toast'

const toast = useToast()

const showAdvancedToast = () => {
  toast.show({
    msg: '高级配置示例',
    iconName: 'success',
    position: 'middle',
    duration: 3000,
    direction: 'vertical',
    iconSize: 60,
    iconColor: '#1989fa',
    zIndex: 1000,
    cover: true,
    opened: () => {
      console.log('Toast 完全展示')
    },
    closed: () => {
      console.log('Toast 完全关闭')
    }
  })
}
</script>
```
