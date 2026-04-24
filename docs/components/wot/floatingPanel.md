# FloatingPanel 浮动面板

## 组件概况

FloatingPanel 浮动面板组件用于在页面底部展示可拖拽的浮动面板，支持自定义锚点、拖拽控制、安全区适配等功能。面板可通过拖拽头部或内容区域改变高度，适用于筛选面板、详情展示、操作面板等场景。

## 核心功能描述

- **拖拽调整**：通过拖拽改变面板高度
- **自定义锚点**：通过 `anchors` 设置面板吸附的锚点高度
- **头部拖拽**：支持仅头部拖拽，内容区不可拖拽
- **安全区适配**：通过 `safeAreaInsetBottom` 适配底部安全距离
- **动画过渡**：通过 `duration` 设置动画时长
- **滚动条控制**：通过 `showScrollbar` 控制滚动条显示

## 适用业务场景

- **筛选面板**：商品筛选、条件选择
- **详情展示**：地图详情、商品详情
- **操作面板**：评论面板、操作列表

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| height | Number | 0 | 否 | 面板的显示高度，支持 v-model:height 双向绑定 |
| anchors | Number[] | [] | 否 | 设置自定义锚点，默认 [100, windowHeight * 0.6] |
| safeAreaInsetBottom | Boolean | false | 否 | 是否设置底部安全距离 |
| showScrollbar | Boolean | true | 否 | 是否显示滚动条 |
| duration | Number / String | 300 | 否 | 动画时长（毫秒） |
| contentDraggable | Boolean | true | 否 | 是否允许内容区容器拖拽 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| height-change | 拖拽结束后面板高度变化时触发 | ({ height: number }) | 当前面板高度 |

### Slots

| 插槽名称 | 作用域参数 | 使用场景 |
|---------|-----------|---------|
| default | - | 浮动面板内容区域 |

## 使用示例

### 示例1：基础用法

默认面板可拖拽调整高度，内容区域可滚动。

```vue
<template>
  <wd-floating-panel safe-area-inset-bottom>
    <wd-cell-group border>
      <wd-cell v-for="item in data" :key="item" :title="item" />
    </wd-cell-group>
  </wd-floating-panel>
</template>

<script lang="ts" setup>
const data = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
</script>
```

### 示例2：自定义锚点

通过 `anchors` 设置面板吸附的锚点高度，`v-model:height` 绑定当前高度。

```vue
<template>
  <wd-floating-panel v-model:height="height" :anchors="anchors" safe-area-inset-bottom @height-change="handleHeightChange">
    <view style="padding: 1rem; text-align: center; font-size: 16px; font-weight: bold;">
      自定义锚点 {{ anchors }} - {{ height.toFixed(0) }}px
    </view>
  </wd-floating-panel>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getSystemInfo } from '@/uni_modules/wot-ui-plus/components/common/util'

const height = ref(0)
const anchors = ref<number[]>([])

onLoad(() => {
  const windowHeight = getSystemInfo().windowHeight
  anchors.value = [100, Math.round(0.4 * windowHeight), Math.round(0.7 * windowHeight)]
  height.value = anchors.value[1]
})

function handleHeightChange({ height }: { height: number }) {
  console.log('面板高度:', height)
}
</script>
```

### 示例3：仅头部拖拽

设置 `content-draggable` 为 false，仅允许拖拽头部改变面板高度。

```vue
<template>
  <wd-floating-panel :content-draggable="false">
    <view style="padding: 1rem; text-align: center; font-size: 16px; font-weight: bold;">
      内容区不可以拖拽
    </view>
  </wd-floating-panel>
</template>
```

## 注意事项

- `anchors` 为空时使用默认锚点 [100, windowHeight * 0.6]
- `contentDraggable` 为 false 时，仅头部可拖拽，内容区域不可拖拽
- `safeAreaInsetBottom` 为 true 时，面板底部会适配安全距离
- `height` 支持 v-model:height 双向绑定，可获取当前面板高度
