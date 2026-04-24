# ConfigProvider 全局配置

## 组件概况

ConfigProvider 全局配置组件用于在应用最外层统一配置主题和样式变量，支持深色模式切换和自定义主题变量。通过 CSS 变量实现主题定制，所有子组件会自动继承配置。

## 核心功能描述

- **主题切换**：通过 `theme` 属性切换 light/dark 模式
- **自定义主题变量**：通过 `themeVars` 对象覆盖组件默认样式变量
- **全局生效**：包裹在 ConfigProvider 内的所有组件自动应用配置
- **CSS 变量**：基于 CSS 变量实现，支持 200+ 主题变量

## 适用业务场景

- **深色模式**：应用级别的深色/浅色模式切换
- **主题定制**：自定义品牌色、组件样式
- **多主题切换**：不同场景切换不同主题

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| theme | String | 'light' | 否 | 主题风格，可选值：light / dark |
| themeVars | Object | {} | 否 | 自定义主题变量 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Slots

| 插槽名称 | 作用域参数 | 使用场景 |
|---------|-----------|---------|
| default | - | 包裹需要应用主题配置的子组件 |

## 使用示例

### 示例1：深色模式

通过 `theme` 属性切换深色模式。

```vue
<template>
  <wd-config-provider :theme="isDark ? 'dark' : 'light'">
    <view>
      <wd-cell title="切换暗黑模式" center>
        <wd-switch v-model="isDark" />
      </wd-cell>
      <wd-cell-group>
        <wd-cell title="标题文字" value="内容" />
        <wd-cell title="标题文字" value="内容" icon="setting" is-link />
      </wd-cell-group>
    </view>
  </wd-config-provider>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const isDark = ref(false)
</script>
```

### 示例2：自定义主题变量

通过 `themeVars` 覆盖默认主题变量，如品牌色、按钮颜色等。

```vue
<template>
  <wd-config-provider :theme-vars="themeVars">
    <view>
      <wd-button type="primary">主按钮</wd-button>
      <wd-button type="error">危险按钮</wd-button>
      <wd-cell-group>
        <wd-cell title="标题文字" value="内容" />
      </wd-cell-group>
    </view>
  </wd-config-provider>
</template>

<script lang="ts" setup>
const themeVars = {
  colorTheme: '#ff6b35',
  buttonPrimaryBgColor: '#ff6b35',
  buttonPrimaryBorderColor: '#ff6b35'
}
</script>
```

### 示例3：动态切换主题

结合响应式数据动态切换主题和主题变量。

```vue
<template>
  <wd-config-provider :theme="isDark ? 'dark' : 'light'" :theme-vars="isRed ? redThemeVars : {}">
    <view>
      <wd-cell title="切换暗黑模式" center>
        <wd-switch v-model="isDark" />
      </wd-cell>
      <wd-cell title="切换主题色" center>
        <wd-switch v-model="isRed" />
      </wd-cell>
      <wd-button type="primary">主按钮</wd-button>
    </view>
  </wd-config-provider>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const isDark = ref(false)
const isRed = ref(false)
const redThemeVars = {
  colorTheme: '#e54d42',
  buttonPrimaryBgColor: '#e54d42',
  buttonPrimaryBorderColor: '#e54d42'
}
</script>
```

## 注意事项

- ConfigProvider 应包裹在应用最外层，确保所有组件继承配置
- `themeVars` 中的变量名与 CSS 变量名对应，如 `colorTheme` 对应 `--wot-color-theme`
- 深色模式会自动调整所有组件的配色
- `themeVars` 支持覆盖 200+ 主题变量，具体变量名参考组件样式文件
