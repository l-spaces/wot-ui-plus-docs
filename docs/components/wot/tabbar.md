# Tabbar 标签栏

## 组件概况

Tabbar 标签栏组件用于底部导航，由 `wd-tabbar` 和 `wd-tabbar-item` 两个组件配合使用。支持固定底部、圆角形态、占位补偿、自定义颜色、徽标提示和图标插槽，适用于应用底部主导航场景。

## 核心功能描述

- **底部导航切换**：通过 `v-model` 维护当前激活项
- **固定布局**：支持固定在页面底部并生成占位元素
- **圆角形态**：支持 `round` 形态的导航栏样式
- **安全区适配**：支持底部安全区留白
- **徽标提示**：支持数字徽标、红点和 `badgeProps` 透传
- **图标扩展**：支持通过插槽自定义激活态与未激活态图标

## 适用业务场景

- **应用主导航**：首页、分类、消息、我的等底部主入口
- **多主频道切换**：会员中心、商家后台等固定底部切换栏

## API

### Tabbar Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | Number / String | 0 | 否 | 当前激活项的 `name` 或索引，支持 `v-model` |
| fixed | Boolean | false | 否 | 是否固定在底部 |
| bordered | Boolean | true | 否 | 是否显示顶部边框 |
| safeAreaInsetBottom | Boolean | false | 否 | 是否适配底部安全区 |
| shape | String | `'default'` | 否 | 标签栏形状，可选值：`default` / `round` |
| activeColor | String | - | 否 | 激活项颜色 |
| inactiveColor | String | - | 否 | 未激活项颜色 |
| placeholder | Boolean | false | 否 | 固定在底部时是否生成等高占位元素 |
| zIndex | Number | 99 | 否 | 组件层级 |
| customStyle | String | `''` | 否 | 自定义根节点样式 |
| customClass | String | `''` | 否 | 自定义根节点样式类 |

### TabbarItem Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| title | String | - | 否 | 标签标题 |
| name | Number / String | - | 否 | 当前标签唯一标识，不传时默认使用子项索引 |
| icon | String | - | 否 | 图标名称 |
| value | Number / String / null | null | 否 | 徽标显示值 |
| isDot | Boolean | - | 否 | 是否显示点状徽标 |
| max | Number | - | 否 | 徽标最大值 |
| badgeProps | Object | - | 否 | 徽标属性，透传给 `wd-badge` |
| customStyle | String | `''` | 否 | 自定义根节点样式 |
| customClass | String | `''` | 否 | 自定义根节点样式类 |

### Tabbar Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| change | 点击标签并切换激活项时触发 | `({ value })` | 返回当前激活项的 `name` 或索引 |
| update:modelValue | 点击标签并切换激活项时触发 | `(value: number \| string)` | 用于同步当前激活值 |

### Tabbar Slots

| 插槽名称 | 作用域参数 | 使用场景 |
|---------|-----------|---------|
| default | - | `wd-tabbar` 默认插槽，用于放置多个 `wd-tabbar-item` |

### TabbarItem Slots

| 插槽名称 | 作用域参数 | 使用场景 |
|---------|-----------|---------|
| icon | `{ active }` | 自定义图标区域，可根据当前是否激活切换图标样式 |

## 使用示例

### 示例1：基础用法

```vue
<template>
  <wd-tabbar v-model="active" @change="handleChange">
    <wd-tabbar-item title="首页" icon="home" />
    <wd-tabbar-item title="分类" icon="category" />
    <wd-tabbar-item title="消息" icon="chat" :value="5" />
    <wd-tabbar-item title="我的" icon="user" />
  </wd-tabbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(0)

function handleChange({ value }: { value: number | string }) {
  console.log(value)
}
</script>
```

### 示例2：固定底部与占位补偿

```vue
<template>
  <wd-tabbar v-model="active" fixed placeholder safe-area-inset-bottom shape="round">
    <wd-tabbar-item title="首页" icon="home" />
    <wd-tabbar-item title="分类" icon="category" />
    <wd-tabbar-item title="消息" icon="chat" is-dot />
    <wd-tabbar-item title="我的" icon="user" />
  </wd-tabbar>
</template>
```

固定到底部时可配合 `placeholder` 避免页面内容被遮挡。

### 示例3：自定义图标插槽

```vue
<template>
  <wd-tabbar v-model="active" active-color="#ee0a24" inactive-color="#999">
    <wd-tabbar-item title="首页" :name="'home'">
      <template #icon="{ active }">
        <wd-icon name="home" :color="active ? '#ee0a24' : '#999'" />
      </template>
    </wd-tabbar-item>
    <wd-tabbar-item title="我的" :name="'mine'" icon="user" />
  </wd-tabbar>
</template>
```

`icon` 插槽会收到 `{ active }`，可以据此切换激活态图标。

## 注意事项

- `wd-tabbar-item` 未设置 `name` 时，组件会按子项索引作为激活值。
- `change` 返回的是 `{ value }`，对应当前标签的 `name` 或索引。
- 开启 `fixed` 且页面需要避免遮挡时，建议同时开启 `placeholder`。
- `placeholder` 的高度由组件挂载后测量得到，动态切换布局时建议实际验证页面回流效果。
