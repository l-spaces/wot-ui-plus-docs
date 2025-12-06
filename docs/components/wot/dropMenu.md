# DropMenu 下拉菜单

<demo-model url="/subPages/dropMenu/Index"></demo-model>


## 组件概况

### 组件概述
DropMenu 是一个下拉菜单组件，支持多个菜单项，可配置展开方向、动画时长、遮罩层等，常用于页面顶部的筛选栏或导航栏。

### 详细功能描述
- 支持多个下拉菜单项组合使用
- 支持向上和向下两种展开方向
- 支持配置遮罩层和点击遮罩层关闭菜单
- 支持自定义动画时长
- 支持配置菜单层级
- 支持单个菜单项禁用
- 支持自动管理菜单的打开和关闭，打开一个菜单时自动关闭其他菜单
- 支持自定义菜单项内容

### 适用业务场景
- 页面顶部的筛选栏
- 数据列表的排序和筛选
- 导航栏的下拉菜单
- 表单的下拉选择器
- 多条件查询的筛选面板

## 完整API参考

### Props
| 名称 | 类型 | 默认值 | 必填 | 描述 |
| --- | --- | --- | --- | --- |
| zIndex | number | 12 | 否 | 弹框层级 |
| direction | string | down | 否 | 菜单展开方向，可选值为 up 或 down |
| modal | boolean | true | 否 | 是否展示蒙层 |
| closeOnClickModal | boolean | true | 否 | 是否点击蒙层时关闭 |
| duration | number | 200 | 否 | 菜单展开收起动画时间，单位 ms |
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |

### Events
| 事件名 | 触发条件 | 参数说明 |
| --- | --- | --- |

### Methods
| 方法名 | 参数 | 返回值 | 功能说明 |
| --- | --- | --- | --- |

### Slots
| 插槽名 | 作用域变量 | 使用说明 |
| --- | --- | --- |
| default | - | 用于放置 wd-drop-menu-item 子组件 |

## 多场景使用示例代码

### 基础用法
```vue
<template>
  <view>
    <!-- 基础下拉菜单 -->
    <wd-drop-menu>
      <wd-drop-menu-item
        v-model="value1"
        :options="options1"
        title="选择项1"
      />
      <wd-drop-menu-item
        v-model="value2"
        :options="options2"
        title="选择项2"
      />
    </wd-drop-menu>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')

const options1 = [
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' }
]

const options2 = [
  { label: 'A选项', value: 'a' },
  { label: 'B选项', value: 'b' },
  { label: 'C选项', value: 'c' }
]
</script>
```

### 向上展开
```vue
<template>
  <view>
    <!-- 向上展开的下拉菜单 -->
    <wd-drop-menu direction="up">
      <wd-drop-menu-item
        v-model="value1"
        :options="options1"
        title="选择项1"
      />
      <wd-drop-menu-item
        v-model="value2"
        :options="options2"
        title="选择项2"
      />
    </wd-drop-menu>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')

const options1 = [
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' }
]

const options2 = [
  { label: 'A选项', value: 'a' },
  { label: 'B选项', value: 'b' },
  { label: 'C选项', value: 'c' }
]
</script>
```

### 自定义样式和配置
```vue
<template>
  <view>
    <!-- 自定义样式和配置的下拉菜单 -->
    <wd-drop-menu 
      :duration="300"
      :modal="false"
      custom-class="custom-drop-menu"
    >
      <wd-drop-menu-item
        v-model="value1"
        :options="options1"
        title="选择项1"
        custom-class="custom-menu-item"
      />
      <wd-drop-menu-item
        v-model="value2"
        :options="options2"
        title="选择项2"
        custom-class="custom-menu-item"
      />
    </wd-drop-menu>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')

const options1 = [
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' }
]

const options2 = [
  { label: 'A选项', value: 'a' },
  { label: 'B选项', value: 'b' },
  { label: 'C选项', value: 'c' }
]
</script>

<style scoped>
.custom-drop-menu {
  background-color: #f8f9fa;
  border-bottom: 1px solid #eee;
}

.custom-menu-item {
  --wot-drop-menu-item-title-color: #333;
  --wot-drop-menu-item-active-color: #1989fa;
}
</style>
```

### 禁用菜单项
```vue
<template>
  <view>
    <!-- 禁用菜单项的下拉菜单 -->
    <wd-drop-menu>
      <wd-drop-menu-item
        v-model="value1"
        :options="options1"
        title="可选择"
      />
      <wd-drop-menu-item
        v-model="value2"
        :options="options2"
        title="禁用项"
        disabled
      />
    </wd-drop-menu>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')

const options1 = [
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' }
]

const options2 = [
  { label: 'A选项', value: 'a' },
  { label: 'B选项', value: 'b' }
]
</script>
```

### 自定义菜单项内容
```vue
<template>
  <view>
    <!-- 自定义菜单项内容 -->
    <wd-drop-menu>
      <wd-drop-menu-item
        v-model="value1"
        title="自定义内容"
      >
        <view class="custom-content">
          <view class="custom-content-item" @click="selectCustom('custom1')">
            自定义选项1
          </view>
          <view class="custom-content-item" @click="selectCustom('custom2')">
            自定义选项2
          </view>
          <view class="custom-content-item" @click="selectCustom('custom3')">
            自定义选项3
          </view>
        </view>
      </wd-drop-menu-item>
    </wd-drop-menu>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref('')

const selectCustom = (value: string) => {
  value1.value = value
}
</script>

<style scoped>
.custom-content {
  padding: 10px;
}

.custom-content-item {
  padding: 15px;
  border-bottom: 1px solid #eee;
}

.custom-content-item:last-child {
  border-bottom: none;
}
</style>
```

## 样式定制指南

### CSS变量
组件支持以下CSS变量进行样式定制：
- `--wot-drop-menu-background-color`: 菜单背景色
- `--wot-drop-menu-item-title-color`: 菜单项标题颜色
- `--wot-drop-menu-item-active-color`: 菜单项激活状态颜色
- `--wot-drop-menu-item-disabled-color`: 菜单项禁用状态颜色

### customStyle 和 customClass
使用 `customStyle` 和 `customClass` 属性可以自定义组件的根节点样式：
```vue
<wd-drop-menu 
  custom-style="background-color: #f8f9fa; border-radius: 8px;"
  custom-class="custom-drop-menu"
/>
```

## 注意事项

1. **父子关系**: DropMenu 组件必须与 DropMenuItem 组件配合使用，DropMenuItem 必须作为 DropMenu 的子组件使用。
2. **方向设置**: `direction` 属性控制所有菜单项的展开方向，单个菜单项无法单独设置方向。
3. **遮罩层**: `modal` 属性控制是否显示遮罩层，`closeOnClickModal` 属性控制点击遮罩层是否关闭菜单。
4. **队列管理**: 组件内部使用队列管理多个菜单项，打开一个菜单时会自动关闭其他菜单。
5. **自定义内容**: 当 DropMenuItem 没有设置 `options` 属性时，可以使用插槽自定义菜单内容。
6. **事件处理**: DropMenu 组件本身不直接处理选项选择事件，选项选择事件由 DropMenuItem 组件处理。
7. **样式隔离**: 组件使用 `styleIsolation: 'shared'`，确保自定义样式能正常生效。
