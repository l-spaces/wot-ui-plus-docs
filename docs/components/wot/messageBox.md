# messageBox 消息弹窗组件

<demo-model url="/subPages/messageBox/Index"></demo-model>

## 组件概况

### 组件概述
消息弹窗组件是一个功能丰富的弹窗组件，支持多种类型的弹窗展示，包括提示框（alert）、确认框（confirm）和输入框（prompt）。组件提供了灵活的配置选项，支持自定义按钮文本、输入框校验、弹窗样式等，可通过组件方式或组合式API方式使用。

### 详细功能描述
- 支持三种弹窗类型：alert（提示框）、confirm（确认框）、prompt（输入框）
- 可通过组件方式或组合式API方式使用
- 支持自定义弹窗标题、内容和按钮文本
- 支持点击蒙层关闭弹窗
- 输入框类型支持多种类型，如text、number、password等
- 支持输入框正则校验和自定义校验函数
- 支持确认前钩子函数，可用于异步校验
- 支持自定义按钮样式和属性
- 支持设置弹窗层级
- 支持懒渲染，提高性能

### 适用业务场景
- 操作确认提示
- 信息提示
- 表单输入验证
- 登录/注册弹窗
- 内容编辑弹窗
- 任何需要用户交互确认的场景

## 完整API参考

### Props

| 名称        | 类型    | 默认值 | 必填 | 描述                                              |
| ----------- | ------- | ------ | ---- | ------------------------------------------------- |
| selector    | string  | ''     | 否   | 指定唯一标识，用于多实例管理                      |
| rootPortal  | boolean | false  | 否   | 是否从页面中脱离出来，用于解决各种 fixed 失效问题 |
| customStyle | string  | -      | 否   | 自定义样式                                        |
| customClass | string  | -      | 否   | 自定义类名                                        |

### Events

无

### Methods (组合式API)

| 方法名  | 参数                              | 返回值                 | 功能说明                             |
| ------- | --------------------------------- | ---------------------- | ------------------------------------ |
| show    | `options: MessageOptions \ string` | `Promise<MessageResult>` | 显示弹窗，支持直接传入字符串作为标题 |
| alert   | `options: MessageOptions \ string` | `Promise<MessageResult>` | 显示提示框，只有确认按钮             |
| confirm | `options: MessageOptions \ string` | `Promise<MessageResult>` | 显示确认框，包含确认和取消按钮       |
| prompt  | `options: MessageOptions \ string` | `Promise<MessageResult>` | 显示输入框弹窗，支持输入校验         |
| close   | -                                 | void                   | 关闭当前弹窗                         |

### MessageOptions

| 名称               | 类型                                                      | 默认值  | 必填 | 描述                                               |
| ------------------ | --------------------------------------------------------- | ------- | ---- | -------------------------------------------------- |
| title              | string                                                    | -       | 否   | 弹窗标题                                           |
| showCancelButton   | boolean                                                   | false   | 否   | 是否展示取消按钮                                   |
| closeOnClickModal  | boolean                                                   | true    | 否   | 是否支持点击蒙层进行关闭                           |
| confirmButtonText  | string                                                    | -       | 否   | 确定按钮文案                                       |
| cancelButtonText   | string                                                    | -       | 否   | 取消按钮文案                                       |
| msg                | string                                                    | -       | 否   | 消息文案                                           |
| type               | 'alert' \ 'confirm' \ 'prompt'                          | 'alert' | 否   | 弹框类型                                           |
| inputType          | string                                                    | 'text'  | 否   | 当type为prompt时，输入框类型                       |
| inputSize          | string                                                    | -       | 否   | 设置输入框大小，可选值：large                      |
| inputValue         | string \ number                                          | -       | 否   | 当type为prompt时，输入框初始值                     |
| inputPlaceholder   | string                                                    | -       | 否   | 当type为prompt时，输入框placeholder                |
| inputPattern       | RegExp                                                    | -       | 否   | 当type为prompt时，输入框正则校验                   |
| inputValidate      | `(inputValue: string \ number) => boolean`                 | -       | 否   | 当type为prompt时，输入框校验函数                   |
| inputError         | string                                                    | -       | 否   | 当type为prompt时，输入框检验不通过时的错误提示文案 |
| showErr            | boolean                                                   | false   | 否   | 是否展示错误信息                                   |
| zIndex             | number                                                    | 99      | 否   | 弹窗层级                                           |
| lazyRender         | boolean                                                   | true    | 否   | 弹层内容懒渲染                                     |
| beforeConfirm      | `(options: { resolve: (isPass: boolean) => void }) => void` | -       | 否   | 确认前钩子                                         |
| cancelButtonProps  | `Partial<ButtonProps>`                                      | -       | 否   | 取消按钮Props                                      |
| confirmButtonProps | `Partial<ButtonProps>`                                      | -       | 否   | 确认按钮Props                                      |

### MessageResult

| 名称   | 类型                             | 描述                                                        |
| ------ | -------------------------------- | ----------------------------------------------------------- |
| action | 'confirm' \ 'cancel' \ 'modal' | 触发方式，confirm-点击确定，cancel-点击取消，modal-点击蒙层 |
| value  | string \ number                 | 当type为prompt时，输入框的值                                |

### Slots

| 插槽名  | 作用域变量 | 使用说明                          |
| ------- | ---------- | --------------------------------- |
| default | -          | 自定义弹窗内容，替代默认的msg文本 |

## 多场景使用示例

### 基础用法（组件方式）

```vue
<template>
  <view>
    <wd-button @click="showAlert">显示提示框</wd-button>
    <wd-button @click="showConfirm">显示确认框</wd-button>
    <wd-message-box ref="messageBoxRef" />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useMessage } from '@/uni_modules/wot-ui-plus/components/wd-message-box'

const { alert, confirm } = useMessage()

const showAlert = () => {
  alert('这是一个提示框')
}

const showConfirm = () => {
  confirm('这是一个确认框')
    .then(res => {
      console.log('用户点击了确定', res)
    })
    .catch(res => {
      console.log('用户点击了取消', res)
    })
}
</script>
```

### 使用组合式API

```vue
<template>
  <view>
    <wd-button @click="showAlert">显示提示框</wd-button>
    <wd-button @click="showConfirm">显示确认框</wd-button>
    <wd-button @click="showPrompt">显示输入框</wd-button>
    <wd-message-box />
  </view>
</template>

<script lang="ts" setup>
import { useMessage } from '@/uni_modules/wot-ui-plus/components/wd-message-box'

const { alert, confirm, prompt } = useMessage()

// 提示框
const showAlert = () => {
  alert({
    title: '提示',
    msg: '这是一个提示框内容',
    confirmButtonText: '知道了'
  })
}

// 确认框
const showConfirm = () => {
  confirm({
    title: '确认',
    msg: '确定要执行此操作吗？',
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  })
    .then(res => {
      console.log('用户点击了确定', res)
    })
    .catch(res => {
      console.log('用户点击了取消', res)
    })
}

// 输入框
const showPrompt = () => {
  prompt({
    title: '输入',
    msg: '请输入您的姓名',
    inputPlaceholder: '请输入姓名',
    inputValidate: (value) => {
      return value.trim().length > 0
    },
    inputError: '姓名不能为空'
  })
    .then(res => {
      console.log('用户输入了：', res.value)
    })
    .catch(res => {
      console.log('用户取消了输入', res)
    })
}
</script>
```

### 不同类型的弹窗

```vue
<template>
  <view>
    <wd-button @click="showAlert">Alert</wd-button>
    <wd-button @click="showConfirm">Confirm</wd-button>
    <wd-button @click="showPrompt">Prompt</wd-button>
    <wd-message-box />
  </view>
</template>

<script lang="ts" setup>
import { useMessage } from '@/uni_modules/wot-ui-plus/components/wd-message-box'

const { alert, confirm, prompt } = useMessage()

// 提示框
const showAlert = () => {
  alert('这是一个提示框')
}

// 确认框
const showConfirm = () => {
  confirm('这是一个确认框')
}

// 输入框
const showPrompt = () => {
  prompt('请输入内容')
}
</script>
```

### 自定义按钮样式

```vue
<template>
  <view>
    <wd-button @click="showCustomButton">自定义按钮样式</wd-button>
    <wd-message-box />
  </view>
</template>

<script lang="ts" setup>
import { useMessage } from '@/uni_modules/wot-ui-plus/components/wd-message-box'

const { confirm } = useMessage()

const showCustomButton = () => {
  confirm({
    title: '自定义按钮',
    msg: '这是一个带有自定义按钮样式的弹窗',
    confirmButtonText: '主操作',
    cancelButtonText: '次要操作',
    confirmButtonProps: {
      type: 'primary',
      size: 'large'
    },
    cancelButtonProps: {
      type: 'default'
    }
  })
}
</script>
```

### 输入框校验

```vue
<template>
  <view>
    <wd-button @click="showValidatePrompt">带校验的输入框</wd-button>
    <wd-message-box />
  </view>
</template>

<script lang="ts" setup>
import { useMessage } from '@/uni_modules/wot-ui-plus/components/wd-message-box'

const { prompt } = useMessage()

const showValidatePrompt = () => {
  prompt({
    title: '手机号输入',
    msg: '请输入您的手机号',
    inputPlaceholder: '请输入11位手机号',
    inputType: 'number',
    inputPattern: /^1[3-9]\d{9}$/,
    inputError: '请输入正确的手机号格式',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
    .then(res => {
      console.log('手机号输入成功：', res.value)
    })
    .catch(res => {
      console.log('用户取消了输入', res)
    })
}
</script>
```

### 使用beforeConfirm钩子

```vue
<template>
  <view>
    <wd-button @click="showBeforeConfirm">带前置校验的弹窗</wd-button>
    <wd-message-box />
  </view>
</template>

<script lang="ts" setup>
import { useMessage } from '@/uni_modules/wot-ui-plus/components/wd-message-box'

const { confirm } = useMessage()

const showBeforeConfirm = () => {
  confirm({
    title: '前置校验',
    msg: '点击确定后会进行异步校验',
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    beforeConfirm: ({ resolve }) => {
      // 模拟异步校验
      setTimeout(() => {
        // 校验通过
        resolve(true)
        // 校验不通过
        // resolve(false)
      }, 1000)
    }
  })
    .then(res => {
      console.log('校验通过，用户点击了确定', res)
    })
    .catch(res => {
      console.log('用户点击了取消或校验不通过', res)
    })
}
</script>
```

## 样式定制指南

### 自定义样式

通过 `customStyle` 属性可以自定义弹窗的样式：

```vue
<wd-message-box 
  custom-class="my-message-box"
  :custom-style="{ borderRadius: '10px', padding: '20px' }"
/>
```

### 自定义类名

通过 `customClass` 属性可以添加自定义类名，然后在样式文件中定义样式：

```vue
<wd-message-box custom-class="my-message-box" />
```

```scss
.my-message-box {
  /* 自定义弹窗容器样式 */
  border-radius: 10px;
  padding: 20px;
  
  .wd-message-box__title {
    /* 自定义标题样式 */
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
  }
  
  .wd-message-box__content {
    /* 自定义内容样式 */
    font-size: 28rpx;
    color: #666;
    margin: 20rpx 0;
  }
  
  .wd-message-box__actions {
    /* 自定义按钮区域样式 */
    margin-top: 20rpx;
  }
  
  .wd-message-box__actions-btn {
    /* 自定义按钮样式 */
    margin: 0 10rpx;
  }
}
```

## 注意事项

1. 使用方式选择：
   - 组件方式：适合在单个页面中使用，需要在模板中引入组件
   - 组合式API方式：适合在多个页面中使用，无需在模板中引入组件
   - 推荐使用组合式API方式，使用更灵活

2. 弹窗类型：
   - `alert`：只有确认按钮，用于提示信息
   - `confirm`：有确认和取消按钮，用于需要用户确认的操作
   - `prompt`：带有输入框，用于需要用户输入的场景

3. 事件处理：
   - 组合式API方式返回Promise，可通过then/catch处理确定和取消事件
   - 组件方式需要通过ref调用方法

4. 输入框校验：
   - 支持正则校验和自定义函数校验
   - 校验不通过时会显示错误提示
   - 可通过`inputError`属性自定义错误提示文本

5. 自定义按钮：
   - 可通过`confirmButtonProps`和`cancelButtonProps`自定义按钮样式
   - 支持所有wd-button组件的属性

6. 性能优化：
   - 默认开启懒渲染，只有在弹窗显示时才会渲染内容
   - 可通过`lazyRender`属性关闭懒渲染

7. 层级管理：
   - 默认层级为99，可通过`zIndex`属性调整
   - 确保层级设置合理，避免被其他元素遮挡

8. 多实例管理：
   - 当需要在同一个页面中使用多个messageBox时，可通过`selector`属性区分
   - 使用组合式API时，需要传入对应的selector

9. 关闭方式：
   - 可通过点击按钮关闭
   - 可通过点击蒙层关闭（需设置`closeOnClickModal`为true）
   - 可通过调用`close`方法关闭

10. 兼容性：
    - 组件支持跨平台使用
    - `rootPortal`属性用于解决fixed定位失效问题，可根据需要开启