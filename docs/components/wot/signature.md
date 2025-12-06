# Signature 签名板
<demo-model url="/subPages/signature/Index"></demo-model>

## 组件概况

### 组件概述
Signature组件是一个功能丰富的签名组件，支持签名绘制、压感模式、撤销恢复、清空等功能，并能将签名导出为图片。它适用于需要用户手写签名的场景，如合同签署、表单确认等。

### 详细功能描述
- 支持基本的签名绘制功能
- 支持压感模式（笔锋效果），根据绘制速度调整笔画宽度
- 支持撤销和恢复功能，可自定义撤销步长
- 支持清空签名功能
- 支持导出签名为图片，可自定义图片类型、质量和缩放比例
- 支持自定义签名笔颜色和宽度
- 支持自定义画布背景色
- 支持禁用画布滚动
- 支持自定义底部按钮文本和样式
- 支持多端适配

### 适用业务场景
- 合同签署页面
- 表单确认签名
- 电子签名功能
- 手写批注功能
- 身份验证签名

## 完整API参考

### Props
| 参数 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| penColor | string | '#000' | 否 | 签名笔颜色 |
| lineWidth | number | 3 | 否 | 签名笔宽度 |
| clearText | string | - | 否 | 清空按钮的文本 |
| revokeText | string | - | 否 | 撤回按钮的文本 |
| restoreText | string | - | 否 | 恢复按钮的文本 |
| confirmText | string | - | 否 | 确认按钮的文本 |
| fileType | string | 'png' | 否 | 目标文件的类型 |
| quality | number | 1 | 否 | 目标文件的质量 |
| exportScale | number | 1 | 否 | 导出图片的缩放比例 |
| disabled | boolean | false | 否 | 是否禁用签名板 |
| height | number | - | 否 | 画布的高度 |
| width | number | - | 否 | 画布的宽度 |
| backgroundColor | string | - | 否 | 画板的背景色 |
| disableScroll | boolean | true | 否 | 是否禁用画布滚动 |
| enableHistory | boolean | false | 否 | 是否开启历史记录 |
| step | number | 1 | 否 | 撤回和恢复的步长 |
| undoText | string | - | 否 | 撤回按钮的文本（已废弃，使用revokeText） |
| redoText | string | - | 否 | 恢复按钮的文本（已废弃，使用restoreText） |
| pressure | boolean | false | 否 | 是否启用压感模式(笔锋) |
| minWidth | number | 2 | 否 | 压感模式下笔画最小宽度 |
| maxWidth | number | 6 | 否 | 压感模式下笔画最大宽度 |
| minSpeed | number | 1.5 | 否 | 最小速度阈值，影响压感模式下的笔画宽度变化 |
| customClass | string | - | 否 | 自定义类名 |
| customStyle | object | - | 否 | 自定义样式，对象形式 |

### Events
| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| start | 开始绘制时 | 触摸事件对象 |
| end | 结束绘制时 | 触摸事件对象 |
| signing | 绘制过程中 | 触摸事件对象 |
| confirm | 确认签名并生成图片后 | SignatureResult对象，包含tempFilePath、success、width、height |
| clear | 清空签名后 | 无 |

### Methods
| 方法名 | 参数 | 返回值 | 功能说明 |
|--------|------|--------|----------|
| init | forceUpdate?: boolean | void | 初始化签名板 |
| clear | 无 | void | 清空签名 |
| confirm | 无 | void | 确认签名并生成图片 |
| restore | 无 | void | 恢复上一步操作 |
| revoke | 无 | void | 撤销上一步操作 |

### Slots
| 插槽名 | 作用域变量 | 说明 |
|--------|------------|------|
| footer | clear: 清空签名函数, confirm: 确认签名函数, currentStep: 当前步骤, revoke: 撤销函数, restore: 恢复函数, can-undo: 是否可撤销, can-redo: 是否可恢复, history-list: 历史线条列表 | 自定义底部按钮区域，默认显示清空、撤销、恢复、确认按钮 |

## 多场景使用示例

### 基础用法
```vue
<template>
  <view>
    <wd-signature 
      @confirm="handleConfirm" 
      @clear="handleClear"
      placeholder="请在此处签名"
    ></wd-signature>
  </view>
</template>

<script setup lang="ts">
const handleConfirm = (event: any) => {
  console.log('签名图片路径:', event.tempFilePath)
  // 处理签名图片
}

const handleClear = () => {
  console.log('签名已清空')
}
</script>
```

### 自定义样式和颜色
```vue
<template>
  <view>
    <wd-signature 
      pen-color="#409eff" 
      line-width="4" 
      background-color="#f5f7fa"
      @confirm="handleConfirm"
    ></wd-signature>
  </view>
</template>

<script setup lang="ts">
const handleConfirm = (event: any) => {
  console.log('签名图片路径:', event.tempFilePath)
}
</script>
```

### 启用压感模式
```vue
<template>
  <view>
    <wd-signature 
      pressure 
      :min-width="2" 
      :max-width="8"
      :min-speed="1.5"
      @confirm="handleConfirm"
    ></wd-signature>
  </view>
</template>

<script setup lang="ts">
const handleConfirm = (event: any) => {
  console.log('签名图片路径:', event.tempFilePath)
}
</script>
```

### 启用历史记录（撤销/恢复）
```vue
<template>
  <view>
    <wd-signature 
      enable-history 
      revoke-text="撤销" 
      restore-text="恢复"
      :step="1"
      @confirm="handleConfirm"
    ></wd-signature>
  </view>
</template>

<script setup lang="ts">
const handleConfirm = (event: any) => {
  console.log('签名图片路径:', event.tempFilePath)
}
</script>
```

### 自定义底部按钮
```vue
<template>
  <view>
    <wd-signature 
      @confirm="handleConfirm" 
      @clear="handleClear"
    >
      <template #footer="{ clear, confirm, canUndo, canRedo, revoke, restore }">
        <view class="custom-footer">
          <wd-button size="small" plain @click="revoke" :disabled="!canUndo">撤销</wd-button>
          <wd-button size="small" plain @click="restore" :disabled="!canRedo">恢复</wd-button>
          <wd-button size="small" plain @click="clear">清空</wd-button>
          <wd-button size="small" type="primary" @click="confirm">确认签名</wd-button>
        </view>
      </template>
    </wd-signature>
  </view>
</template>

<script setup lang="ts">
const handleConfirm = (event: any) => {
  console.log('签名图片路径:', event.tempFilePath)
}

const handleClear = () => {
  console.log('签名已清空')
}
</script>

<style scoped>
.custom-footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  background-color: #f5f7fa;
  border-radius: 8px;
}
</style>
```

### 自定义导出配置
```vue
<template>
  <view>
    <wd-signature 
      file-type="jpg" 
      :quality="0.8" 
      :export-scale="2"
      @confirm="handleConfirm"
    ></wd-signature>
  </view>
</template>

<script setup lang="ts">
const handleConfirm = (event: any) => {
  console.log('签名图片路径:', event.tempFilePath)
  console.log('图片质量:', event.quality)
  console.log('图片缩放比例:', event.exportScale)
}
</script>
```

## 样式定制指南

### 自定义类名
通过`customClass`属性可以为Signature组件添加自定义类名，用于覆盖默认样式。

```vue
<wd-signature custom-class="my-signature">
  <!-- 内容 -->
</wd-signature>

<style>
.my-signature {
  /* 自定义样式 */
  margin: 20px;
  border: 2px solid #ebeef5;
  border-radius: 8px;
  overflow: hidden;
}
</style>
```

### 自定义样式对象
通过`customStyle`属性可以直接设置组件的内联样式。

```vue
<wd-signature :custom-style="{ margin: '20px', border: '2px solid #ebeef5', borderRadius: '8px', overflow: 'hidden' }">
  <!-- 内容 -->
</wd-signature>
```

## 注意事项

1. **canvas上下文创建**：组件会在挂载后自动创建canvas上下文，初始化画布。

2. **图片导出**：
   - 支持png和jpg两种图片类型
   - 图片质量范围为0-1，1表示最高质量
   - 导出图片的缩放比例默认为1，可根据需要调整

3. **压感模式**：
   - 压感模式下，笔画宽度会根据绘制速度自动调整
   - 可通过minWidth和maxWidth设置笔画的最小和最大宽度
   - 可通过minSpeed调整速度阈值，影响笔画宽度的变化灵敏度

4. **历史记录**：
   - 开启历史记录后，会保存所有绘制的线条
   - 可通过step属性设置撤销和恢复的步长
   - 撤销和恢复操作会清空重做记录

5. **禁用状态**：
   - 设置disabled为true时，签名板不可绘制
   - 禁用状态下，所有按钮仍可点击

6. **事件触发**：
   - start事件在触摸开始时触发
   - end事件在触摸结束时触发
   - signing事件在绘制过程中持续触发
   - confirm事件在点击确认按钮或调用confirm方法时触发
   - clear事件在点击清空按钮或调用clear方法时触发

7. **多端适配**：
   - 组件在不同平台上可能存在细微的样式差异
   - 在微信小程序上使用了canvas 2D上下文，其他平台使用了传统的canvas上下文

8. **废弃属性**：
   - undoText和redoText属性已废弃，建议使用revokeText和restoreText替代

## 常见问题

1. **Q: 为什么签名板无法绘制？**
   A: 请检查是否设置了disabled属性为true，或者canvas上下文创建失败。

2. **Q: 如何调整签名板的大小？**
   A: 可以通过设置width和height属性来调整签名板的大小。

3. **Q: 为什么导出的图片质量不高？**
   A: 可以通过调整quality属性来提高图片质量，最大值为1。

4. **Q: 如何自定义底部按钮？**
   A: 可以使用footer插槽来自定义底部按钮，完全控制按钮的样式和行为。

5. **Q: 为什么撤销/恢复功能不生效？**
   A: 请确保enableHistory属性设置为true，并且已经绘制了线条。

6. **Q: 如何清空签名板？**
   A: 可以点击清空按钮，或者调用clear方法来清空签名板。

7. **Q: 如何获取签名图片？**
   A: 可以通过监听confirm事件来获取签名图片的路径，或者调用confirm方法手动触发。

8. **Q: 为什么压感模式没有效果？**
   A: 请确保pressure属性设置为true，并且minWidth和maxWidth属性设置合理。

## 类型定义

### SignatureResult
```typescript
type SignatureResult = {
  tempFilePath: string  // 生成图片的临时路径
  success: boolean      // 是否成功生成图片
  width: number         // 生成图片的宽度
  height: number        // 生成图片的高度
}
```

### Line
```typescript
interface Line {
  points: Point[]       // 线条所包含的所有点的数组
  color: string         // 线条颜色
  width: number         // 线条宽度
  backgroundColor?: string  // 线条背景色 (可选)
  isPressure?: boolean  // 是否为笔锋模式的线条 (可选)
}
```

### Point
```typescript
interface Point {
  x: number             // 点的横坐标
  y: number             // 点的纵坐标
  t: number             // 点的时间戳
  speed?: number        // 当前点的绘制速度 (可选)
  distance?: number     // 与上一个点的距离 (可选)
  lineWidth?: number    // 当前点的线宽 (可选，用于笔锋模式)
  lastX1?: number       // 贝塞尔曲线第一个控制点的x坐标 (可选)
  lastY1?: number       // 贝塞尔曲线第一个控制点的y坐标 (可选)
  lastX2?: number       // 贝塞尔曲线第二个控制点的x坐标 (可选)
  lastY2?: number       // 贝塞尔曲线第二个控制点的y坐标 (可选)
  isFirstPoint?: boolean  // 是否为线条的第一个点 (可选)
}
```