# FloatingPanel 悬浮面板

<demo-model url="/subPages/floatingPanel/Index"></demo-model>


## 组件概况

### 组件概述
FloatingPanel 是一个可拖拽的悬浮面板组件，支持通过拖拽调整高度并自动吸附到预设的锚点位置。它提供了一个头部拖拽区域和可滚动的内容区域，适用于需要从底部弹出并可调整大小的场景。

### 详细功能描述
- 支持通过拖拽头部或内容区域调整面板高度
- 自动吸附到预设的锚点位置
- 可配置的动画时长
- 支持底部安全区域适配
- 可配置是否显示滚动条
- 支持自定义样式和类名

### 适用业务场景
- 地图应用中的信息面板
- 图片查看器的底部操作面板
- 表单填写的底部弹出面板
- 聊天应用的消息输入面板
- 数据筛选的底部筛选面板

## 完整API参考

### Props
| 名称 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| height | number | 0 | 否 | 面板的显示高度 |
| anchors | array | [] | 否 | 设置自定义锚点，默认值 [100, windowHeight * 0.6] |
| safeAreaInsetBottom | boolean | false | 否 | 弹出面板是否设置底部安全距离（iphone X 类型的机型） |
| showScrollbar | boolean | true | 否 | 是否显示滚动条 |
| duration | number / string | 300 | 否 | 动画时长，单位毫秒 |
| contentDraggable | boolean | true | 否 | 是否允许内容区容器拖拽 |
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |

### Events
| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| update:height | 面板高度变化时触发 | height: number - 新的面板高度 |
| height-change | 面板高度变化时触发 | { height: number } - 包含新高度的对象 |

### Methods
| 方法名 | 参数 | 返回值 | 功能说明 |
| --- | --- | --- | --- |

### Slots
| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| default | - | 面板内容插槽，用于放置面板内部的内容 |

## 多场景使用示例代码

### 基础用法
```vue
<template>
  <view>
    <!-- 基础悬浮面板 -->
    <wd-floating-panel>
      <view class="panel-content">
        <text>这是悬浮面板的内容</text>
        <text>可以上下拖拽调整面板高度</text>
      </view>
    </wd-floating-panel>
  </view>
</template>

<style scoped>
.panel-content {
  padding: 20px;
}
</style>
```

### 自定义锚点
```vue
<template>
  <view>
    <!-- 自定义锚点的悬浮面板 -->
    <wd-floating-panel 
      :anchors="[100, 300, 500]"
      :height="300"
    >
      <view class="panel-content">
        <text>自定义锚点：100px、300px、500px</text>
        <text>初始高度为300px</text>
      </view>
    </wd-floating-panel>
  </view>
</template>

<style scoped>
.panel-content {
  padding: 20px;
}
</style>
```

### 自定义样式和配置
```vue
<template>
  <view>
    <!-- 自定义样式和配置的悬浮面板 -->
    <wd-floating-panel 
      :height="200"
      :safe-area-inset-bottom="true"
      :duration="500"
      :content-draggable="false"
      :custom-style="{ borderRadius: '10px 10px 0 0' }"
      custom-class="my-floating-panel"
    >
      <view class="panel-content">
        <text>自定义样式和配置</text>
        <text>底部安全区适配</text>
        <text>动画时长500ms</text>
        <text>内容区不可拖拽</text>
        <text>自定义圆角样式</text>
      </view>
    </wd-floating-panel>
  </view>
</template>

<style scoped>
.panel-content {
  padding: 20px;
}

.my-floating-panel {
  --wot-floating-panel-background: #f8f9fa;
}
</style>
```

### 表单场景使用
```vue
<template>
  <view>
    <!-- 表单场景使用 -->
    <wd-floating-panel 
      :height="400"
      :anchors="[200, 400, 600]"
      :safe-area-inset-bottom="true"
    >
      <view class="form-content">
        <view class="form-item">
          <text class="form-label">姓名</text>
          <wd-input placeholder="请输入姓名" />
        </view>
        <view class="form-item">
          <text class="form-label">电话</text>
          <wd-input placeholder="请输入电话" type="tel" />
        </view>
        <view class="form-item">
          <text class="form-label">地址</text>
          <wd-input placeholder="请输入地址" :maxlength="50" />
        </view>
        <wd-button type="primary" block>提交</wd-button>
      </view>
    </wd-floating-panel>
  </view>
</template>

<style scoped>
.form-content {
  padding: 20px;
}

.form-item {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.form-label {
  width: 80px;
  margin-right: 10px;
}
</style>
```

### 聊天输入面板
```vue
<template>
  <view>
    <!-- 聊天输入面板 -->
    <wd-floating-panel 
      :height="150"
      :anchors="[150, 300, windowHeight * 0.8]"
      :content-draggable="true"
      :safe-area-inset-bottom="true"
    >
      <view class="chat-panel">
        <wd-input
          v-model="message"
          type="textarea"
          placeholder="请输入消息"
          :autosize="{ minHeight: 100, maxHeight: 200 }"
          :show-word-limit="true"
          :maxlength="500"
        />
        <view class="chat-actions">
          <wd-icon name="emoji" @click="showEmoji = !showEmoji" />
          <wd-icon name="image" @click="chooseImage" />
          <wd-button type="primary" size="small" @click="sendMessage">发送</wd-button>
        </view>
      </view>
    </wd-floating-panel>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const message = ref('')
const showEmoji = ref(false)

const sendMessage = () => {
  console.log('发送消息:', message.value)
  message.value = ''
}

const chooseImage = () => {
  console.log('选择图片')
}
</script>

<style scoped>
.chat-panel {
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.chat-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
}
</style>
```

## 样式定制指南

### CSS变量
组件支持以下CSS变量进行样式定制：
- `--wot-floating-panel-background`: 面板背景色
- `--wot-floating-panel-header-bar-background`: 头部拖拽条背景色
- `--wot-floating-panel-header-height`: 头部高度
- `--wot-floating-panel-border-radius`: 面板圆角

### customStyle和customClass
使用`customStyle`和`customClass`属性可以自定义面板的样式：
```vue
<wd-floating-panel 
  custom-style="border-radius: 10px 10px 0 0; background-color: #f8f9fa;"
  custom-class="my-floating-panel"
>
  <!-- 面板内容 -->
</wd-floating-panel>
```

## 注意事项

1. **锚点设置**: `anchors`属性需要传入数字数组，表示面板可以吸附的高度值，建议按照从小到大的顺序排列。
2. **高度调整**: 拖拽面板时，面板高度会自动吸附到最近的锚点值。
3. **内容滚动**: 面板内容超出高度时会自动出现滚动条，可以通过`showScrollbar`属性控制是否显示。
4. **安全区域**: 在iPhone X等机型上，建议设置`safeAreaInsetBottom`为`true`，以避免内容被底部手势条遮挡。
5. **动画时长**: `duration`属性控制面板高度变化的动画时长，单位为毫秒。
6. **内容拖拽**: `contentDraggable`属性控制是否允许通过拖拽内容区域调整面板高度，默认为`true`。
7. **样式隔离**: 组件使用`styleIsolation: 'shared'`，确保自定义样式能正常生效。
