# Button 按钮

## 组件概述

Button 按钮组件是 wot-ui-plus 中最基础的交互组件，用于触发操作和提交表单。支持多种类型（主要、成功、信息、警告、危险、文字、图标）、多种尺寸（小、中、大），以及幽灵模式、细边框、圆角、块状、加载状态等丰富的样式变体。同时集成了微信/支付宝小程序开放能力，可直接调用获取用户信息、拨打电话、打开设置等原生功能。

## 核心功能描述

- **多类型按钮**：支持 primary、success、info、warning、error、text、icon 七种类型
- **多尺寸**：支持 small、medium、large 三种尺寸
- **幽灵按钮**：通过 `plain` 属性设置幽灵模式，配合 `hairline` 实现细边框效果
- **圆角控制**：默认圆角，可通过 `round` 属性关闭
- **块状按钮**：通过 `block` 属性使按钮宽度 100%
- **加载状态**：通过 `loading` 属性显示加载动画，加载时自动禁止点击
- **禁用状态**：通过 `disabled` 属性禁用按钮
- **图标按钮**：支持前置图标和纯图标按钮
- **开放能力**：集成微信/支付宝小程序的 open-type 能力，如获取用户信息、拨打电话等
- **自定义图标前缀**：通过 `classPrefix` 支持自定义图标库

## 适用业务场景

- **表单提交**：在表单页面中使用块状主按钮提交数据，配合 loading 状态防止重复提交
- **操作触发**：在列表页、详情页中使用不同类型的按钮触发删除、编辑、分享等操作
- **对话框交互**：在弹窗底部使用主按钮和次按钮组合，引导用户确认或取消操作

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| type | String | 'primary' | 否 | 按钮类型，可选值：primary / success / info / warning / error / text / icon |
| size | String | 'medium' | 否 | 按钮尺寸，可选值：small / medium / large |
| plain | Boolean | false | 否 | 幽灵按钮，填充背景变为透明 |
| round | Boolean | true | 否 | 圆角按钮 |
| hairline | Boolean | false | 否 | 是否细边框，需配合 plain 使用 |
| block | Boolean | false | 否 | 块状按钮，宽度 100% |
| disabled | Boolean | false | 否 | 禁用按钮 |
| loading | Boolean | false | 否 | 加载中状态，加载时禁止点击 |
| loadingColor | String | - | 否 | 加载图标颜色，默认根据 type 自动匹配 |
| icon | String | - | 否 | 左侧图标，使用 Icon 组件的图标类名 |
| classPrefix | String | 'wd-icon' | 否 | 类名前缀，用于使用自定义图标 |
| openType | String | - | 否 | 微信/支付宝小程序开放能力，可选值：feedback / share / getUserInfo / contact / getPhoneNumber / launchApp / openSetting / chooseAvatar / getAuthorize / agreePrivacyAuthorization 等 |
| hoverStopPropagation | Boolean | false | 否 | 是否阻止本节点的祖先节点出现点击态 |
| lang | String | - | 否 | 指定返回用户信息的语言，可选值：zh_CN / zh_TW / en |
| sessionFrom | String | - | 否 | 会话来源，open-type="contact" 时有效 |
| sendMessageTitle | String | - | 否 | 会话内消息卡片标题，open-type="contact" 时有效 |
| sendMessagePath | String | - | 否 | 会话内消息卡片点击跳转小程序路径，open-type="contact" 时有效 |
| sendMessageImg | String | - | 否 | 会话内消息卡片图片，open-type="contact" 时有效 |
| appParameter | String | - | 否 | 打开 APP 时向 APP 传递的参数，open-type="launchApp" 时有效 |
| showMessageCard | Boolean | false | 否 | 是否显示会话内消息卡片，open-type="contact" 时有效 |
| buttonId | String | - | 否 | 按钮唯一标识，可用于设置隐私同意授权按钮的 id |
| scope | String | - | 否 | 支付宝小程序授权范围，open-type 为 getAuthorize 时有效，可选值：phoneNumber / userInfo |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| click | 按钮非禁用且非加载状态时点击 | (event: Event) | 原生点击事件对象 |
| getuserinfo | open-type 为 getUserInfo 时用户点击按钮授权 | (detail: Object) | 用户信息对象 |
| contact | open-type 为 contact 时用户点击按钮进入客服会话 | (detail: Object) | 会话信息 |
| getphonenumber | open-type 为 getPhoneNumber 时用户点击按钮获取手机号 | (detail: Object) | 手机号信息 |
| getrealtimephonenumber | open-type 为 getrealtimephonenumber 时获取实时手机号 | (detail: Object) | 实时手机号信息 |
| error | open-type 使用发生错误 | (detail: Object) | 错误信息 |
| launchapp | open-type 为 launchApp 时从小程序打开 APP | (detail: Object) | APP 信息 |
| opensetting | open-type 为 openSetting 时打开设置页后回调 | (detail: Object) | 设置信息 |
| chooseavatar | open-type 为 chooseAvatar 时获取用户头像 | (detail: Object) | 头像信息 |
| agreeprivacyauthorization | open-type 为 agreePrivacyAuthorization 时用户同意隐私协议 | (detail: Object) | 隐私授权信息 |

### Slots

| 插槽名称 | 作用域参数 | 使用场景 |
|---------|-----------|---------|
| default | - | 按钮文本内容 |

## 使用示例

### 示例1：基础用法

通过 `type` 属性设置按钮类型，支持 primary、success、info、warning、error 五种主要类型。

```vue
<template>
  <wd-button>主要按钮</wd-button>
  <wd-button type="success">成功按钮</wd-button>
  <wd-button type="info">信息按钮</wd-button>
  <wd-button type="warning">警告按钮</wd-button>
  <wd-button type="error">危险按钮</wd-button>
</template>
```

默认为圆角按钮，设置 `round` 为 false 可使用直角按钮。

```vue
<template>
  <wd-button :round="false">主要按钮</wd-button>
  <wd-button :round="false" type="success">成功按钮</wd-button>
</template>
```

### 示例2：幽灵按钮与细边框

通过 `plain` 属性设置幽灵按钮，配合 `hairline` 实现细边框效果。

```vue
<template>
  <wd-button plain>主要按钮</wd-button>
  <wd-button type="success" plain>成功按钮</wd-button>
  <wd-button type="info" plain>信息按钮</wd-button>
  <wd-button type="warning" plain>警告按钮</wd-button>
  <wd-button type="error" plain>危险按钮</wd-button>
</template>
```

细边框幽灵按钮：

```vue
<template>
  <wd-button plain hairline>主要按钮</wd-button>
  <wd-button type="success" plain hairline>成功按钮</wd-button>
</template>
```

### 示例3：按钮尺寸与块状按钮

通过 `size` 设置按钮大小，通过 `block` 使按钮宽度 100%。

```vue
<template>
  <wd-button size="small">小型按钮</wd-button>
  <wd-button size="medium">普通按钮</wd-button>
  <wd-button size="large">大型按钮</wd-button>
</template>
```

块状按钮：

```vue
<template>
  <wd-button block size="large">主要按钮</wd-button>
  <wd-button type="success" block size="large">成功按钮</wd-button>
</template>
```

### 示例4：加载状态与图标按钮

通过 `loading` 显示加载状态，通过 `icon` 设置前置图标，`type="icon"` 使用纯图标按钮。

```vue
<template>
  <wd-button loading>加载中</wd-button>
  <wd-button type="success" loading>加载中</wd-button>
</template>
```

带图标的按钮：

```vue
<template>
  <wd-button icon="download">下载</wd-button>
  <wd-button icon="setting">设置</wd-button>
</template>
```

纯图标按钮：

```vue
<template>
  <wd-button type="icon" plain icon="delete"></wd-button>
  <wd-button type="icon" icon="add"></wd-button>
</template>
```

文字按钮：

```vue
<template>
  <wd-button type="text">按钮</wd-button>
  <wd-button type="text" disabled>按钮</wd-button>
</template>
```

## 注意事项

- 按钮在 `disabled` 或 `loading` 状态下会自动禁止点击事件和开放能力
- 加载图标的颜色默认根据按钮 `type` 自动匹配，也可通过 `loadingColor` 自定义
- 幽灵按钮的加载图标颜色与填充按钮相反（白色背景上显示彩色图标）
- `openType` 属性仅在微信/支付宝小程序环境下有效，H5 和 App 端无效
- 支付宝小程序使用 `scope` 属性替代微信的 `open-type` 来区分授权类型
