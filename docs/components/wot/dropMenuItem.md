# DropMenuItem 下拉菜单项

<demo-model url="/subPages/dropMenuItem/Index"></demo-model>


## 组件概况

### 组件概述
DropMenuItem 是下拉菜单组件（DropMenu）的子组件，用于定义单个下拉菜单项的内容和行为。它支持自定义选项列表、选中状态、禁用状态以及自定义内容，是构建复杂下拉菜单的核心组件。

### 详细功能描述
- 支持自定义选项列表，格式为数组，每个选项可包含label、value、tip等属性
- 支持双向绑定选中值
- 支持禁用状态
- 支持自定义选中图标
- 支持自定义菜单标题和图标
- 支持自定义菜单图标大小
- 支持自定义点击事件钩子函数
- 支持自定义选项对象的key映射
- 支持自定义弹出层样式和类名
- 支持自定义弹出层高度
- 支持从页面中脱离出来，解决fixed失效问题

### 适用业务场景
- 页面顶部筛选栏的单个筛选项
- 数据列表的排序选项
- 导航菜单的下拉选项
- 表单中的下拉选择器选项
- 自定义内容的下拉菜单

## 完整API参考

### Props
| 名称 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| modelValue | string / number | - | 否 | 当前选中项对应选中的 value |
| options | array | [] | 否 | 列表数据，对应数据结构 [{label: '标题', value: '0', tip: '提示文字'}] |
| disabled | boolean | false | 否 | 禁用菜单 |
| iconName | string | check | 选中的图标名称(可选名称在 wd-icon 组件中) |
| title | string | - | 否 | 菜单标题 |
| icon | string | arrow-down | 菜单图标 |
| iconSize | string / number | - | 否 | 菜单图标大小 |
| beforeToggle | function | - | 否 | 自定义点击事件，回调函数参数包含status和resolve，resolve(true)允许操作，resolve(false)禁止操作 |
| valueKey | string | value | 否 | 选项对象中，value 对应的 key |
| labelKey | string | label | 否 | 选项对象中，展示的文本对应的 key |
| tipKey | string | tip | 否 | 选项对象中，选项说明对应的 key |
| customPopupClass | string | '' | 否 | 自定义下拉菜单popup样式类 |
| customPopupStyle | string | '' | 否 | 自定义下拉菜单popup样式 |
| popupHeight | string | '' | 否 | 弹出层高度 |
| rootPortal | boolean | false | 否 | 是否从页面中脱离出来，用于解决各种 fixed 失效问题 |
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |
| customTitle | string | '' | 否 | DropMenuItem 左侧文字样式 |
| customIcon | string | '' | 否 | DropMenuItem 右侧 icon 样式 |

### Events
| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |
| update:modelValue | 选中值变化时触发 | value: string/number - 新的选中值 |
| change | 选中值变化时触发 | { value: string/number, selectedItem: object } - 选中的值和对应的选项对象 |
| open | 菜单打开时触发 | - |
| opened | 菜单打开动画结束后触发 | - |
| close | 菜单关闭时触发 | - |
| closed | 菜单关闭动画结束后触发 | - |

### Methods
| 方法名 | 参数 | 返回值 | 功能说明 |
| --- | --- | --- | --- |
| open | - | - | 打开菜单 |
| close | - | - | 关闭菜单 |
| toggle | - | - | 切换菜单的展开/收起状态 |
| getShowPop | - | boolean | 获取菜单是否展开的状态 |

### Slots
| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| default | - | 自定义菜单内容，当 options 为空时显示 |

## 多场景使用示例代码

### 基础用法
```vue
<template>
  <view>
    <wd-drop-menu>
      <!-- 基础下拉菜单项 -->
      <wd-drop-menu-item
        v-model="value"
        :options="options"
        title="选择项"
      />
    </wd-drop-menu>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')

const options = [
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' }
]
</script>
```

### 带提示文字的选项
```vue
<template>
  <view>
    <wd-drop-menu>
      <!-- 带提示文字的选项 -->
      <wd-drop-menu-item
        v-model="value"
        :options="options"
        title="带提示文字"
      />
    </wd-drop-menu>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')

const options = [
  { label: '选项1', value: '1', tip: '提示文字1' },
  { label: '选项2', value: '2', tip: '提示文字2' },
  { label: '选项3', value: '3', tip: '提示文字3' }
]
</script>
```

### 自定义图标和样式
```vue
<template>
  <view>
    <wd-drop-menu>
      <!-- 自定义图标和样式 -->
      <wd-drop-menu-item
        v-model="value"
        :options="options"
        title="自定义图标"
        icon="arrow-up"
        icon-size="20"
        icon-name="success"
        custom-class="custom-menu-item"
      />
    </wd-drop-menu>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')

const options = [
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' }
]
</script>

<style scoped>
.custom-menu-item {
  --wot-drop-menu-item-title-color: #333;
  --wot-drop-menu-item-active-color: #1989fa;
}
</style>
```

### 自定义选项对象的key映射
```vue
<template>
  <view>
    <wd-drop-menu>
      <!-- 自定义选项对象的key映射 -->
      <wd-drop-menu-item
        v-model="value"
        :options="options"
        title="自定义key映射"
        value-key="id"
        label-key="name"
        tip-key="desc"
      />
    </wd-drop-menu>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')

const options = [
  { name: '选项1', id: '1', desc: '描述1' },
  { name: '选项2', id: '2', desc: '描述2' },
  { name: '选项3', id: '3', desc: '描述3' }
]
</script>
```

### 自定义内容
```vue
<template>
  <view>
    <wd-drop-menu>
      <!-- 自定义内容 -->
      <wd-drop-menu-item
        v-model="value"
        title="自定义内容"
      >
        <view class="custom-content">
          <view class="custom-content-item" @click="select('custom1')">
            <wd-icon name="star" /> 自定义选项1
          </view>
          <view class="custom-content-item" @click="select('custom2')">
            <wd-icon name="heart" /> 自定义选项2
          </view>
          <view class="custom-content-item" @click="select('custom3')">
            <wd-icon name="clock" /> 自定义选项3
          </view>
        </view>
      </wd-drop-menu-item>
    </wd-drop-menu>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')

const select = (val: string) => {
  value.value = val
}
</script>

<style scoped>
.custom-content {
  padding: 10px;
}

.custom-content-item {
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid #eee;
}

.custom-content-item:last-child {
  border-bottom: none;
}
</style>
```

### 自定义弹出层样式和高度
```vue
<template>
  <view>
    <wd-drop-menu>
      <!-- 自定义弹出层样式和高度 -->
      <wd-drop-menu-item
        v-model="value"
        :options="longOptions"
        title="自定义弹出层"
        popup-height="300px"
        custom-popup-style="background-color: #f8f9fa; border-radius: 8px;"
        custom-popup-class="custom-popup"
      />
    </wd-drop-menu>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')

// 生成15个选项用于测试高度
const longOptions = ref(
  Array.from({ length: 15 }, (_, i) => ({
    label: `选项${i + 1}`,
    value: `${i + 1}`
  }))
)
</script>

<style scoped>
.custom-popup {
  border: 1px solid #eee;
}
</style>
```

## 样式定制指南

### CSS变量
组件支持以下CSS变量进行样式定制：
- `--wot-drop-menu-item-title-color`: 菜单项标题颜色
- `--wot-drop-menu-item-active-color`: 菜单项激活状态颜色
- `--wot-drop-menu-item-disabled-color`: 菜单项禁用状态颜色
- `--wot-drop-menu-item-option-background-color`: 选项背景色
- `--wot-drop-menu-item-option-active-background-color`: 选项激活状态背景色

### customStyle 和 customClass
使用 `customStyle` 和 `customClass` 属性可以自定义组件的根节点样式：
```vue
<wd-drop-menu-item 
  custom-style="color: #333;"
  custom-class="custom-menu-item"
/>
```

### 弹出层样式
使用 `customPopupStyle` 和 `customPopupClass` 属性可以自定义弹出层的样式：
```vue
<wd-drop-menu-item 
  custom-popup-style="background-color: #f8f9fa; border-radius: 8px;"
  custom-popup-class="custom-popup"
/>
```

## 注意事项

1. **父子关系**: DropMenuItem 必须作为 DropMenu 的子组件使用，不能单独使用。
2. **选项格式**: `options` 属性应为数组格式，每个选项可以是字符串或包含 label、value、tip 等属性的对象。
3. **双向绑定**: 支持使用 `v-model` 双向绑定选中值。
4. **禁用状态**: `disabled` 属性可禁用整个菜单项。
5. **自定义内容**: 当 `options` 为空数组时，可以通过插槽自定义菜单内容。
6. **beforeToggle**: 可以通过 `beforeToggle` 属性在菜单展开/收起前执行自定义逻辑，返回 `resolve(true)` 允许操作，`resolve(false)` 禁止操作。
7. **key映射**: 当选项对象的key不是默认的 label、value、tip 时，可以通过 `labelKey`、`valueKey`、`tipKey` 属性自定义映射。
8. **图标配置**: `icon` 属性控制菜单标题右侧的图标，`iconName` 属性控制选中项的图标。
9. **rootPortal**: 当遇到 fixed 定位失效问题时，可以尝试设置 `rootPortal` 为 `true`。
10. **性能优化**: 对于大量选项，建议设置 `popupHeight` 限制弹出层高度，避免渲染过多DOM节点。
