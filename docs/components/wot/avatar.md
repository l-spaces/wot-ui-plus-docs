# Avatar 头像

## 组件概况

Avatar 头像组件用于展示用户头像、图标头像或文字头像，同时提供头像组能力，适合用户中心、评论列表、成员展示等常见场景。组件由 `wd-avatar` 和 `wd-avatar-group` 组成，前者负责单个头像渲染，后者负责批量头像叠放和超出数量提示。

## 核心功能描述

- **多种头像来源**：支持图片、文字、图标，以及小程序原生头像展示
- **尺寸与形状可配**：支持数字尺寸和圆形、方形两种形状
- **展示增强能力**：支持随机背景色、性别角标、等级角标、默认兜底头像等
- **头像组展示**：支持数组数据驱动、最大展示数量限制和超出数量提示
- **样式扩展**：支持 `customStyle`、`customClass` 以及头像组重叠间距配置

## 适用业务场景

- **用户资料卡**：展示个人头像、昵称首字母头像或默认图标头像
- **团队成员列表**：通过头像组快速展示参与人、审批人或协作者
- **社交互动场景**：在评论区、点赞列表、群聊列表中呈现紧凑的头像排布

## API

### Avatar Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| src | String | '' | 否 | 头像图片地址，不能为相对路径 |
| shape | String | 'circle' | 否 | 头像形状，可选值：circle / square |
| size | String / Number | 40 | 否 | 头像尺寸 |
| mode | String | 'scaleToFill' | 否 | 图片裁剪模式 |
| text | String | '' | 否 | 头像文字内容 |
| bgColor | String | '#c0c4cc' | 否 | 背景色 |
| color | String | '#ffffff' | 否 | 文字颜色 |
| fontSize | String / Number | 18 | 否 | 文字字号 |
| icon | String | '' | 否 | 图标名称 |
| mpAvatar | Boolean | false | 否 | 是否显示小程序原生头像，仅百度、微信、QQ 小程序有效 |
| randomBgColor | Boolean | false | 否 | 是否启用随机背景色 |
| defaultUrl | String | '' | 否 | 加载失败时的兜底头像地址 |
| colorIndex | Number | - | 否 | 随机背景色索引，取值范围 0 - 19 |
| name | String | '' | 否 | 组件标识符 |
| sexIcon | String | '' | 否 | 性别角标，可选值：male / female |
| sexBgColor | String | '' | 否 | 性别角标背景色 |
| showLevel | Boolean | false | 否 | 是否显示等级角标 |
| levelBgColor | String | '' | 否 | 等级角标背景色 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Avatar Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| click | 点击头像时触发 | `(name: string, event)` | 头像 name 和原生事件 |

### Avatar Slots

| 插槽名称 | 作用域参数 | 使用场景 |
|---------|-----------|---------|
| default | - | 自定义头像内容 |

### AvatarGroup Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| urls | Array | [] | 否 | 头像数据数组 |
| maxCount | String / Number | 5 | 否 | 最多展示的头像数量 |
| shape | String | 'circle' | 否 | 头像组形状，可选值：circle / square |
| mode | String | 'scaleToFill' | 否 | 图片裁剪模式 |
| showMore | Boolean | true | 否 | 超出 `maxCount` 时是否显示查看更多提示 |
| size | String / Number | 40 | 否 | 头像尺寸 |
| keyName | String | '' | 否 | 当 `urls` 为对象数组时，用于读取图片地址的字段名 |
| gap | String / Number | 0.5 | 否 | 头像之间的遮挡比例，取值范围 0 - 1 |
| extraValue | String / Number | 0 | 否 | 需额外显示的值，通常与查看更多提示配合使用 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### AvatarGroup Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| showMore | 点击查看更多时触发 | - | - |

## 使用示例

### 示例1：基础用法

展示图片头像、图标头像和文字头像三种常见形态。

```vue
<template>
  <wd-avatar src="https://example.com/avatar.jpg" />
  <wd-avatar icon="user" />
  <wd-avatar text="W" />
</template>
```

### 示例2：自定义样式与扩展信息

通过尺寸、背景色、性别角标和等级角标增强头像信息密度。

```vue
<template>
  <wd-avatar
    text="王"
    :size="56"
    bg-color="#4d80f0"
    color="#ffffff"
    sex-icon="male"
    sex-bg-color="#4d80f0"
    show-level
    level-bg-color="#faad14"
  />
</template>
```

### 示例3：头像组

使用 `wd-avatar-group` 统一管理多头像展示，并通过 `maxCount` 控制折叠数量。

```vue
<template>
  <wd-avatar-group
    :urls="avatars"
    key-name="src"
    :max-count="3"
    :gap="0.35"
    :extra-value="2"
  />
</template>

<script lang="ts" setup>
const avatars = [
  { src: 'https://example.com/a1.jpg' },
  { src: 'https://example.com/a2.jpg' },
  { src: 'https://example.com/a3.jpg' },
  { src: 'https://example.com/a4.jpg' },
  { src: 'https://example.com/a5.jpg' }
]
</script>
```

## 注意事项

- 单个头像内容优先级通常表现为 `src > icon > text`，建议同一时间只配置一种主要展示方式
- `colorIndex` 仅在 `randomBgColor` 为 `true` 时生效，且取值必须在 0 - 19 之间
- 头像组的 `gap` 为遮挡比例，不是像素值；配置过大可能影响头像可读性
- 小程序原生头像能力受平台限制，跨端使用前需要确认目标平台兼容性
