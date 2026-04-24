# Waterfall 瀑布流

## 组件概况

Waterfall 瀑布流组件用于实现瀑布流布局，支持多列展示、动态数据添加、数据修改和删除等功能。通过插槽自定义每列的内容渲染，适用于商品列表、图片展示等场景。

## 核心功能描述

- **多列布局**：通过 `column` 设置瀑布流列数
- **动态添加**：通过 `v-model` 绑定数据数组，动态添加数据
- **数据操作**：通过 `clear`、`remove`、`modify` 方法操作数据
- **自定义渲染**：通过默认插槽自定义每列的内容
- **添加间隔**：通过 `addTime` 控制数据插入的时间间隔

## 适用业务场景

- **商品列表**：电商商品瀑布流展示
- **图片展示**：图片画廊瀑布流布局
- **信息流**：社交信息流瀑布流展示

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| modelValue | Array | [] | 否 | 瀑布流数据，支持 v-model 双向绑定 |
| addTime | Number / String | 200 | 否 | 每次向结构插入数据的时间间隔（ms） |
| idKey | String | 'id' | 否 | 数据唯一标识字段名 |
| column | Number / String | 2 | 否 | 瀑布流的列数，不可动态修改 |
| customStyle | String | '' | 否 | 自定义根节点样式 |
| customClass | String | '' | 否 | 自定义根节点样式类 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| update:modelValue | 数据更新时触发 | (value: any[]) | 当前数据数组 |

### Methods

| 方法名称 | 参数 | 返回值 | 说明 |
|---------|------|--------|------|
| clear | - | void | 清空数据列表 |
| remove | (id: string / number) | void | 清除某一条指定的数据 |
| modify | (id: string / number, key: string, value: any) | void | 修改某条数据的某个属性 |

### Slots

| 插槽名称 | 作用域参数 | 使用场景 |
|---------|-----------|---------|
| default | { columnList, columnIndex } | 瀑布流每列的内容，columnList 为当前列数据，columnIndex 为列索引 |

## 使用示例

### 示例1：基础用法

通过 `v-model` 绑定数据，默认插槽自定义每列内容。

```vue
<template>
  <wd-waterfall v-model="flowList" :column="2" ref="waterfallRef">
    <template #default="{ columnList }">
      <view class="item" v-for="(item, index) in columnList" :key="index">
        <wd-lazy-load threshold="-450" round="10" :image="item.image" :index="index" />
        <view class="title">{{ item.title }}</view>
        <view class="price">{{ item.price }}元</view>
      </view>
    </template>
  </wd-waterfall>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onLoad, onReachBottom } from '@dcloudio/uni-app'

const flowList = ref<any[]>([])
const waterfallRef = ref<any>(null)

const imageData = [
  { price: 35, title: '北国风光，千里冰封', image: 'https://scpic.chinaz.net/files/default/imgs/2024-12-20/697347db38cd20d4.jpg' },
  { price: 75, title: '望长城内外，惟余莽莽', image: 'https://scpic1.chinaz.net/files/default/imgs/2024-12-21/8834261cfdc8553f_s.jpg' },
  { price: 385, title: '大河上下，顿失滔滔', image: 'https://scpic.chinaz.net/files/default/imgs/2024-12-20/6c6a64861a36a034_s.jpg' }
]

function loadMoreData() {
  for (let i = 0; i < 10; i++) {
    const index = Math.floor(Math.random() * imageData.length)
    const item = JSON.parse(JSON.stringify(imageData[index]))
    item.id = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    flowList.value.push(item)
  }
}

onLoad(() => { loadMoreData() })
onReachBottom(() => { loadMoreData() })
</script>

<style lang="scss" scoped>
.item {
  border-radius: 8px;
  margin: 5px;
  background-color: #ffffff;
  padding: 8px;
}
.title { font-size: 14px; margin: 8px 0; }
.price { font-size: 16px; color: #f56c6c; font-weight: bold; }
</style>
```

### 示例2：删除数据

通过 ref 调用 `remove` 方法删除指定数据。

```vue
<template>
  <wd-waterfall v-model="flowList" :column="2" ref="waterfallRef">
    <template #default="{ columnList }">
      <view class="item" v-for="(item, index) in columnList" :key="index">
        <wd-lazy-load threshold="-450" round="10" :image="item.image" :index="index" />
        <view class="title">{{ item.title }}</view>
        <wd-icon name="close" color="#fa3534" size="15" @click="handleRemove(item.id)" />
      </view>
    </template>
  </wd-waterfall>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const flowList = ref<any[]>([])
const waterfallRef = ref<any>(null)

function handleRemove(id: string) {
  waterfallRef.value?.remove(id)
}
</script>
```

### 示例3：清空与修改数据

通过 `clear` 清空数据，`modify` 修改指定数据的属性。

```vue
<template>
  <wd-waterfall v-model="flowList" :column="2" ref="waterfallRef">
    <template #default="{ columnList }">
      <view class="item" v-for="(item, index) in columnList" :key="index">
        <view>{{ item.title }}</view>
      </view>
    </template>
  </wd-waterfall>
  <wd-button @click="handleClear">清空</wd-button>
  <wd-button @click="handleModify">修改</wd-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const flowList = ref<any[]>([
  { id: '1', title: '商品1', price: 100 },
  { id: '2', title: '商品2', price: 200 }
])
const waterfallRef = ref<any>(null)

function handleClear() {
  waterfallRef.value?.clear()
}
function handleModify() {
  waterfallRef.value?.modify('1', 'title', '修改后的标题')
}
</script>
```

## 注意事项

- `column` 设置列数后不可动态修改
- `idKey` 用于标识数据的唯一性，每条数据必须包含该字段
- `addTime` 控制数据插入的时间间隔，避免同时插入大量数据导致布局抖动
- 插槽中 `columnList` 为当前列的数据数组，需自行遍历渲染
