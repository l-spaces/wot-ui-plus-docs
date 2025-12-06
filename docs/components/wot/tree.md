# Tree 树形组件
<demo-model url="/subPages/tree/Index"></demo-model>

## 组件概况

### 组件概述
Tree 树形组件是一种用于展示层级结构数据的组件，支持节点的展开/折叠、选择、勾选等功能，可用于构建菜单、文件目录、分类列表等场景。

### 详细功能描述
- 支持静态数据和动态异步加载数据
- 支持节点的展开/折叠操作
- 支持单选和多选（复选框）模式
- 支持级联选择和非级联选择
- 支持节点搜索和高亮
- 支持自定义节点内容和展开/折叠按钮
- 支持受控和非受控两种模式
- 提供丰富的事件回调
- 支持自定义样式和主题

### 适用业务场景
- 导航菜单展示
- 文件目录结构
- 分类列表展示
- 组织架构图
- 权限管理树形结构
- 任何需要展示层级关系数据的场景

## 完整API参考

### Props

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| data | array | [] | 否 | 树形结构数据 |
| keyField | string | 'id' | 否 | 节点唯一标识字段名 |
| labelField | string | 'label' | 否 | 节点标签字段名 |
| childrenField | string | 'children' | 否 | 子节点字段名 |
| isLeafField | string | 'isLeaf' | 否 | 是否为叶子节点的字段名 |
| disabledField | string | 'disabled' | 否 | 是否禁用的字段名 |
| defaultCheckedKeys | array | [] | 否 | 默认选中节点键值数组 |
| defaultExpandedKeys | array | [] | 否 | 默认展开节点键值数组 |
| checkedKeys | array | undefined | 否 | 受控选中节点键值数组 |
| expandedKeys | array | undefined | 否 | 受控展开节点键值数组 |
| checkable | boolean | false | 否 | 是否显示复选框 |
| selectable | boolean | false | 否 | 是否可选择 |
| cascade | boolean | false | 否 | 是否级联选择 |
| expandOnClick | boolean | false | 否 | 是否点击节点展开/收缩 |
| checkOnClick | boolean | false | 否 | 是否点击节点勾选/取消勾选 |
| loadNode | function | - | 否 | 异步加载节点数据的函数 |
| allowCheckingNotLoaded | boolean | false | 否 | 是否允许勾选未加载的节点 |
| pattern | string | '' | 否 | 搜索过滤模式 |
| showIrrelevantNodes | boolean | true | 否 | 是否显示搜索无关的节点 |
| indentWidth | number | 24 | 否 | 节点缩进宽度 |
| showSwitcher | boolean | true | 否 | 是否显示展开/收缩按钮 |
| expandIcon | string | 'right-box-filled' | 否 | 展开图标 |
| collapseIcon | string | 'down-box-filled' | 否 | 收缩图标 |
| loadingColor | string | '' | 否 | 加载图标颜色 |
| checkedColor | string | '' | 否 | 复选框选中颜色 |
| rotatableSwitcher | boolean | false | 否 | 展开/收缩按钮是否可旋转 |
| highlightBgColor | string | '#f9ae3d' | 否 | 搜索高亮背景颜色 |
| selectedBgColor | string | '#f3f4f6' | 否 | 选中节点背景颜色 |
| switcherSize | number | 14 | 否 | 展开/收缩按钮大小 |
| switcherColor | string | '#909399' | 否 | 展开/收缩按钮颜色 |
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |

### Events

| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| click | 点击节点时 | 无 |
| checked | 选中状态变化时 | 选中节点键值数组 |
| expanded | 展开状态变化时 | 展开节点键值数组 |
| update:checked-keys | 选中节点键值变化时（受控模式） | 选中节点键值数组 |
| update:expanded-keys | 展开节点键值变化时（受控模式） | 展开节点键值数组 |

### Methods

该组件没有对外暴露的方法。

### Slots

| 插槽名 | 作用域变量 | 使用说明 |
|--------|------------|----------|
| switcher | hide（是否隐藏）、loading（是否加载中）、expanded（是否展开） | 自定义展开/收缩按钮 |
| content | node（当前节点数据） | 自定义节点内容 |

## 多场景使用示例代码

### 基础用法

```vue
<template>
  <view>
    <wd-tree :data="treeData" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const treeData = ref([
  {
    id: '1',
    label: '节点1',
    children: [
      {
        id: '1-1',
        label: '节点1-1'
      },
      {
        id: '1-2',
        label: '节点1-2'
      }
    ]
  },
  {
    id: '2',
    label: '节点2',
    children: [
      {
        id: '2-1',
        label: '节点2-1'
      }
    ]
  }
])
</script>
```

### 可勾选模式

```vue
<template>
  <view>
    <wd-tree 
      :data="treeData" 
      checkable 
      :cascade="true"
      @checked="onChecked"
    />
    <view class="result">
      选中的节点: {{ checkedKeys.join(',') }}
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const treeData = ref([
  {
    id: '1',
    label: '节点1',
    children: [
      {
        id: '1-1',
        label: '节点1-1'
      },
      {
        id: '1-2',
        label: '节点1-2'
      }
    ]
  },
  {
    id: '2',
    label: '节点2',
    children: [
      {
        id: '2-1',
        label: '节点2-1'
      }
    ]
  }
])

const checkedKeys = ref<string[]>([])

const onChecked = (keys: string[]) => {
  checkedKeys.value = keys
}
</script>

<style scoped>
.result {
  margin-top: 20px;
  padding: 10px;
  background-color: #f5f7fa;
  border-radius: 8px;
}
</style>
```

### 异步加载节点

```vue
<template>
  <view>
    <wd-tree :data="asyncTreeData" :load-node="loadNode" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const asyncTreeData = ref([
  {
    id: '1',
    label: '异步节点1',
    isLeaf: false
  },
  {
    id: '2',
    label: '异步节点2',
    isLeaf: false
  }
])

const loadNode = (node: any) => {
  return new Promise((resolve) => {
    // 模拟异步加载
    setTimeout(() => {
      resolve([
        {
          id: `${node.id}-1`,
          label: `异步加载子节点 ${node.id}-1`,
          isLeaf: true
        },
        {
          id: `${node.id}-2`,
          label: `异步加载子节点 ${node.id}-2`,
          isLeaf: true
        }
      ])
    }, 1000)
  })
}
</script>
```

### 自定义节点内容

```vue
<template>
  <view>
    <wd-tree :data="customTreeData">
      <template #content="{ node }">
        <view class="custom-content">
          <wd-icon name="folder" v-if="node.children && node.children.length > 0" color="#e6a23c" />
          <wd-icon name="file" v-else color="#909399" />
          <text class="node-label">{{ node.label }}</text>
          <wd-tag v-if="node.tag" :type="node.tag.type" size="small">{{ node.tag.text }}</wd-tag>
        </view>
      </template>
    </wd-tree>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const customTreeData = ref([
  {
    id: '1',
    label: '文件夹1',
    tag: { type: 'primary', text: 'new' },
    children: [
      {
        id: '1-1',
        label: '文件1-1',
        tag: { type: 'success', text: 'done' }
      },
      {
        id: '1-2',
        label: '文件1-2',
        tag: { type: 'warning', text: 'warning' }
      }
    ]
  },
  {
    id: '2',
    label: '文件夹2',
    children: [
      {
        id: '2-1',
        label: '文件2-1'
      }
    ]
  }
])
</script>

<style scoped>
.custom-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.node-label {
  flex: 1;
}
</style>
```

### 搜索过滤

```vue
<template>
  <view>
    <wd-input 
      v-model="searchText" 
      placeholder="搜索节点" 
      clearable 
      style="margin-bottom: 20px;"
    />
    <wd-tree 
      :data="searchTreeData" 
      :pattern="searchText"
      highlight-bg-color="#fff3cd"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const searchText = ref('')

const searchTreeData = ref([
  {
    id: '1',
    label: '北京',
    children: [
      {
        id: '1-1',
        label: '朝阳区'
      },
      {
        id: '1-2',
        label: '海淀区'
      },
      {
        id: '1-3',
        label: '西城区'
      }
    ]
  },
  {
    id: '2',
    label: '上海',
    children: [
      {
        id: '2-1',
        label: '浦东新区'
      },
      {
        id: '2-2',
        label: '黄浦区'
      }
    ]
  },
  {
    id: '3',
    label: '广州',
    children: [
      {
        id: '3-1',
        label: '天河区'
      },
      {
        id: '3-2',
        label: '越秀区'
      }
    ]
  }
])
</script>
```

## 样式定制指南

### 自定义展开/收缩按钮

```vue
<template>
  <view>
    <wd-tree :data="customSwitcherTreeData">
      <template #switcher="{ hide, loading, expanded }">
        <view class="custom-switcher" v-if="!hide">
          <wd-loading v-if="loading" mode="semicircle" size="12" color="#409eff" />
          <text v-else class="switcher-icon">{{ expanded ? '▼' : '▶' }}</text>
        </view>
      </template>
    </wd-tree>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const customSwitcherTreeData = ref([
  {
    id: '1',
    label: '节点1',
    children: [
      {
        id: '1-1',
        label: '节点1-1'
      }
    ]
  },
  {
    id: '2',
    label: '节点2'
  }
])
</script>

<style scoped>
.custom-switcher {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.switcher-icon {
  font-size: 12px;
  color: #909399;
}
</style>
```

### 自定义节点样式

```vue
<template>
  <view>
    <wd-tree 
      :data="customStyleTreeData" 
      selectable 
      selected-bg-color="#ecf5ff"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const customStyleTreeData = ref([
  {
    id: '1',
    label: '节点1',
    children: [
      {
        id: '1-1',
        label: '节点1-1'
      }
    ]
  },
  {
    id: '2',
    label: '节点2'
  }
])
</script>

<style scoped>
/* 自定义树形组件样式 */
.wd-tree {
  /* 自定义节点间距 */
  .wd-tree__content {
    padding: 8px 0;
    border-radius: 4px;
    margin: 2px 0;
  }
  
  /* 自定义标签样式 */
  .wd-tree__label {
    font-size: 14px;
    color: #606266;
  }
  
  /* 自定义选中状态样式 */
  .wd-tree__content {
    &:active {
      background-color: #f5f7fa;
    }
  }
}
</style>
```

## 注意事项

1. **数据格式**：确保传入的数据格式正确，每个节点必须包含唯一的keyField字段。
2. **异步加载**：使用loadNode异步加载数据时，需要在节点数据中设置isLeafField为false，否则不会触发加载。
3. **级联选择**：开启cascade后，父节点的选择状态会影响子节点，子节点的选择状态也会影响父节点。
4. **搜索过滤**：pattern属性用于搜索过滤，会自动展开匹配节点的所有祖先节点。
5. **性能优化**：对于大量节点的数据，建议使用虚拟滚动或分页加载，避免一次性渲染过多节点影响性能。
6. **受控模式**：使用checkedKeys和expandedKeys时，需要配合update:checked-keys和update:expanded-keys事件使用，实现受控模式。
7. **自定义样式**：可以通过customClass、customStyle以及插槽来自定义组件样式。
8. **事件处理**：组件提供了丰富的事件回调，可以根据业务需求进行处理。