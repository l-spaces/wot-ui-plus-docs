# Tree 树形控件

## 组件概况

Tree 树形控件用于展示层级结构数据，支持复选框选择、单选高亮、级联选择、异步加载、搜索过滤、自定义字段名等功能。适用于组织架构、文件目录、权限选择等层级数据场景。

## 核心功能描述

- **复选框选择**：通过 `checkable` 开启多选
- **单选高亮**：通过 `selectable` 开启单选
- **级联选择**：通过 `cascade` 开启级联
- **异步加载**：通过 `loadNode` 实现异步加载子节点
- **搜索过滤**：通过 `pattern` 搜索过滤节点
- **自定义字段名**：通过 `keyField`、`labelField`、`childrenField` 等
- **自定义图标**：通过 `expandIcon`、`collapseIcon` 自定义展开/收缩图标
- **插槽自定义**：通过 `switcher` 和 `content` 插槽自定义节点

## 适用业务场景

- **组织架构**：部门层级展示与选择
- **文件目录**：文件夹树形展示
- **权限选择**：菜单权限树形选择

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| data | Record<string, any>[] | [] | 否 | 树形数据 |
| keyField | String | 'id' | 否 | 选项名称映射的字段名 |
| labelField | String | 'label' | 否 | 展示值映射的字段名 |
| childrenField | String | 'children' | 否 | 子级值映射的字段名 |
| isLeafField | String | 'isLeaf' | 否 | 是否是叶子节点的字段名 |
| disabledField | String | 'disabled' | 否 | 是否禁用的字段名 |
| defaultCheckedKeys | String[] | [] | 否 | 默认选中多选项 |
| defaultExpandedKeys | String[] | [] | 否 | 默认展开项 |
| checkedKeys | String[] | - | 否 | 受控的选中多选项 |
| expandedKeys | String[] | - | 否 | 受控的展开项 |
| checkable | Boolean | false | 否 | 是否可选择（复选框） |
| selectable | Boolean | false | 否 | 是否可选择（单选高亮） |
| cascade | Boolean | false | 否 | 是否级联 |
| expandOnClick | Boolean | false | 否 | 是否允许点击节点展开/收缩 |
| checkOnClick | Boolean | false | 否 | 是否允许点击节点勾选/取消勾选 |
| loadNode | Function | - | 否 | 异步加载节点数据 |
| allowCheckingNotLoaded | Boolean | false | 否 | 是否允许勾选未加载的节点 |
| pattern | String | '' | 否 | 搜索过滤 |
| showIrrelevantNodes | Boolean | true | 否 | 是否显示搜索无关的节点 |
| indentWidth | Number / String | 24 | 否 | 外观缩进宽度 |
| showSwitcher | Boolean | true | 否 | 是否显示展开/收缩按钮 |
| expandIcon | String | 'right-box-filled' | 否 | 展开图标 |
| collapseIcon | String | 'down-box-filled' | 否 | 收缩图标 |
| loadingColor | String | '' | 否 | loading 的颜色 |
| checkedColor | String | '' | 否 | checkbox 选中颜色 |
| rotatableSwitcher | Boolean | false | 否 | 是否可旋转展开/收缩按钮 |
| highlightBgColor | String | '#f9ae3d' | 否 | 高亮背景颜色 |
| selectedBgColor | String | '#f3f4f6' | 否 | 选中背景颜色 |
| switcherSize | Number / String | 14 | 否 | 展开/收缩按钮大小 |
| switcherColor | String | '#909399' | 否 | 展开/收缩按钮颜色 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| click | 节点点击时触发 | - | - |
| checked | 选中节点键值变化时触发 | (string / number)[] | 选中键值数组 |
| expanded | 展开节点键值变化时触发 | (string / number)[] | 展开键值数组 |

### Slots

| 插槽名称 | 作用域参数 | 使用场景 |
|---------|-----------|---------|
| switcher | { hide, loading, expanded } | 自定义展开/收缩按钮 |
| content | { node } | 自定义节点内容 |

## 使用示例

### 示例1：基础用法

通过 `data` 传入树形数据，`checkable` 开启复选框，`expand-on-click` 允许点击展开。

```vue
<template>
  <wd-tree :data="data" :default-expanded-keys="['1', '1-1']" expand-on-click checkable />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const data = ref([
  {
    label: '技术部', id: '1',
    children: [
      {
        label: '前端组', id: '1-1',
        children: [
          { label: 'Vue开发', id: '1-1-1' },
          { label: 'React开发', id: '1-1-2' }
        ]
      },
      { label: '后端组', id: '1-2', children: [{ label: 'Java开发', id: '1-2-1' }, { label: 'Python开发', id: '1-2-2' }] }
    ]
  }
])
</script>
```

### 示例2：级联选择与自定义字段名

通过 `cascade` 开启级联选择，`key-field`、`label-field`、`children-field` 自定义字段名。

```vue
<template>
  <wd-tree
    :data="cascadeData"
    cascade
    :default-expanded-keys="['0', '0-0']"
    :default-checked-keys="['0-0-0']"
    @checked="onChecked"
    checkable
  />
  <view>已选中: {{ checkedKeys.join(', ') || '无' }}</view>

  <wd-tree
    :data="customData"
    :default-expanded-keys="['1', '1-1']"
    key-field="key"
    label-field="name"
    children-field="items"
    selectable
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checkedKeys = ref<string[]>([])
const cascadeData = ref([
  {
    label: '文件系统', id: '0',
    children: [
      { label: '文档', id: '0-0', children: [{ label: '工作文档', id: '0-0-0' }, { label: '学习资料', id: '0-0-1' }] },
      { label: '媒体', id: '0-1', children: [{ label: '图片', id: '0-1-0' }, { label: '视频', id: '0-1-1' }] }
    ]
  }
])
const customData = ref([
  {
    name: '电子产品', key: '1',
    items: [
      { name: '手机数码', key: '1-1', items: [{ name: '智能手机', key: '1-1-1' }, { name: '平板电脑', key: '1-1-2' }] }
    ]
  }
])

function onChecked(keys: string[]) {
  checkedKeys.value = keys
}
</script>
```

### 示例3：搜索过滤与异步加载

通过 `pattern` 搜索过滤节点，`load-node` 异步加载子节点。

```vue
<template>
  <wd-input v-model="searchPattern" placeholder="输入节点名称搜索" :clearable="true" />
  <wd-tree :data="searchData" expand-on-click :pattern="searchPattern" :show-irrelevant-nodes="false" />

  <wd-tree :data="asyncData" :load-node="loadNodeData" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const searchPattern = ref('')
const searchData = ref([
  {
    label: '项目管理', id: '0',
    children: [
      { label: '需求分析', id: '0-0', children: [{ label: '用户调研', id: '0-0-0' }, { label: '功能规划', id: '0-0-1' }] },
      { label: '开发阶段', id: '0-1', children: [{ label: '前端开发', id: '0-1-0' }, { label: '后端开发', id: '0-1-1' }] }
    ]
  }
])

const asyncData = ref([
  { label: '在线课程', id: '1', children: [] },
  { label: '技术文档', id: '2', children: [] }
])

function loadNodeData(node: any): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const childrenMap: Record<string, any[]> = {
        '1': [{ label: 'Vue.js 基础教程', id: '1-1', isLeaf: true }, { label: 'React 入门指南', id: '1-2', isLeaf: true }],
        '2': [{ label: 'API 接口文档', id: '2-1' }, { label: '组件使用说明', id: '2-2' }]
      }
      node.children = childrenMap[node.id] || []
      resolve(true)
    }, 1000)
  })
}
</script>
```

## 注意事项

- `checkable` 和 `selectable` 不要同时开启
- `cascade` 为 true 时，勾选父节点会级联勾选子节点
- `loadNode` 函数接收 node 参数，需返回 Promise<boolean>
- `pattern` 搜索时，`showIrrelevantNodes` 为 false 会隐藏不匹配的节点
- `expandOnClick` 为 true 时，点击节点文本即可展开/收缩
