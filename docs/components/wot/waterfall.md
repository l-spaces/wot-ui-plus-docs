# Waterfall 瀑布流
<demo-model url="/subPages/waterfall/Index"></demo-model>

## 组件概况

### 组件概述
Waterfall 是一个用于实现瀑布流布局的组件，它可以根据内容高度自动分配元素到不同列，实现美观的瀑布流效果，适用于图片画廊、商品列表等场景。

### 详细功能描述
- 支持自定义列数
- 自动根据内容高度分配元素到最短列
- 支持动态添加数据
- 提供清除和修改数据的方法
- 支持自定义添加数据的时间间隔
- 支持通过idKey标识数据项

### 适用业务场景
- 图片画廊展示
- 商品列表展示
- 信息流内容展示
- 任何需要瀑布流布局的场景

## 完整API参考

### Props

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| modelValue | array | [] | 否 | 瀑布流数据 |
| addTime | number | 200 | 否 | 每次向结构插入数据的时间间隔，单位ms，间隔越长，越能保证两列高度相近，但用户体验可能受影响 |
| idKey | string | 'id' | 否 | id值，用于清除某一条数据时，根据此idKey名称找到并移除 |
| column | number | 2 | 否 | 瀑布流的列数，不可动态修改 |
| customStyle | string | '' | 否 | 自定义根节点样式 |
| customClass | string | '' | 否 | 自定义根节点样式类 |

### Events

| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| update:modelValue | 数据变化时 | 新的数据数组 |

### Methods

| 方法名 | 参数 | 返回值 | 功能说明 |
|--------|------|--------|----------|
| clear | 无 | 无 | 清空所有数据 |
| remove | id（数据项的唯一标识） | 无 | 删除指定id的数据项 |
| modify | id（数据项的唯一标识）、key（属性名）、value（属性值） | 无 | 修改指定id的数据项的某个属性 |

### Slots

| 插槽名 | 作用域变量 | 使用说明 |
|--------|------------|----------|
| default | columnList（当前列的数据列表）、columnIndex（当前列索引） | 自定义瀑布流内容，可根据columnList渲染当前列的所有数据 |

## 多场景使用示例代码

### 基础用法

```vue
<template>
  <view>
    <wd-waterfall v-model="waterfallData">
      <template #default="{ columnList, columnIndex }">
        <view 
          class="waterfall-item" 
          v-for="(item, index) in columnList" 
          :key="item.id || index"
        >
          <text>{{ item.title }}</text>
        </view>
      </template>
    </wd-waterfall>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const waterfallData = ref([
  { id: 1, title: '项目1', height: 100 },
  { id: 2, title: '项目2', height: 150 },
  { id: 3, title: '项目3', height: 120 },
  { id: 4, title: '项目4', height: 180 },
  { id: 5, title: '项目5', height: 90 }
])
</script>

<style scoped>
.waterfall-item {
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 16px;
  margin: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
```

### 图片瀑布流

```vue
<template>
  <view>
    <wd-waterfall v-model="imageData" :column="2">
      <template #default="{ columnList }">
        <view class="image-item" v-for="(item, index) in columnList" :key="item.id">
          <image :src="item.url" :style="{ height: item.height + 'px' }" mode="widthFix" />
          <text class="image-title">{{ item.title }}</text>
        </view>
      </template>
    </wd-waterfall>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const imageData = ref([
  { id: 1, url: 'https://example.com/image1.jpg', height: 300, title: '图片1' },
  { id: 2, url: 'https://example.com/image2.jpg', height: 400, title: '图片2' },
  { id: 3, url: 'https://example.com/image3.jpg', height: 250, title: '图片3' },
  { id: 4, url: 'https://example.com/image4.jpg', height: 350, title: '图片4' },
  { id: 5, url: 'https://example.com/image5.jpg', height: 280, title: '图片5' }
])
</script>

<style scoped>
.image-item {
  margin: 8px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.image-item image {
  width: 100%;
  display: block;
}

.image-title {
  padding: 10px;
  background-color: white;
  display: block;
  font-size: 14px;
  color: #333;
}
</style>
```

### 商品列表瀑布流

```vue
<template>
  <view>
    <wd-waterfall v-model="productData" :column="2">
      <template #default="{ columnList }">
        <view class="product-item" v-for="(product, index) in columnList" :key="product.id">
          <image :src="product.image" class="product-image" mode="aspectFit" />
          <view class="product-info">
            <text class="product-name">{{ product.name }}</text>
            <text class="product-price">¥{{ product.price }}</text>
            <wd-button type="primary" size="small" @click="addToCart(product)">加入购物车</wd-button>
          </view>
        </view>
      </template>
    </wd-waterfall>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const productData = ref([
  { id: 1, name: '商品1', price: 99.9, image: 'https://example.com/product1.jpg', height: 400 },
  { id: 2, name: '商品2', price: 199.9, image: 'https://example.com/product2.jpg', height: 350 },
  { id: 3, name: '商品3', price: 149.9, image: 'https://example.com/product3.jpg', height: 420 },
  { id: 4, name: '商品4', price: 89.9, image: 'https://example.com/product4.jpg', height: 380 },
  { id: 5, name: '商品5', price: 249.9, image: 'https://example.com/product5.jpg', height: 410 }
])

const addToCart = (product) => {
  console.log('加入购物车', product)
}
</script>

<style scoped>
.product-item {
  margin: 8px;
  border-radius: 8px;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 100%;
  height: 200px;
  background-color: #f5f7fa;
}

.product-info {
  padding: 12px;
}

.product-name {
  display: block;
  font-size: 14px;
  color: #303133;
  margin-bottom: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.product-price {
  display: block;
  font-size: 16px;
  color: #f56c6c;
  margin-bottom: 12px;
  font-weight: bold;
}
</style>
```

### 动态加载数据

```vue
<template>
  <view>
    <wd-button type="primary" @click="loadMoreData">加载更多</wd-button>
    <wd-waterfall v-model="dynamicData" ref="waterfallRef" :addTime="100">
      <template #default="{ columnList }">
        <view class="dynamic-item" v-for="(item, index) in columnList" :key="item.id">
          <text class="item-title">{{ item.title }}</text>
          <text class="item-content">{{ item.content }}</text>
          <text class="item-date">{{ item.date }}</text>
        </view>
      </template>
    </wd-waterfall>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dynamicData = ref([
  { id: 1, title: '动态1', content: '这是第一条动态内容', date: '2023-01-01', height: 150 },
  { id: 2, title: '动态2', content: '这是第二条动态内容，内容稍微长一些', date: '2023-01-02', height: 180 },
  { id: 3, title: '动态3', content: '这是第三条动态内容', date: '2023-01-03', height: 160 }
])

const waterfallRef = ref(null)

let nextId = 4

const loadMoreData = () => {
  // 模拟加载更多数据
  const newData = []
  for (let i = 0; i < 5; i++) {
    newData.push({
      id: nextId++,
      title: `动态${nextId-1}`,
      content: `这是第${nextId-1}条动态内容，内容长度随机生成...`,
      date: '2023-01-04',
      height: 150 + Math.random() * 100
    })
  }
  
  // 将新数据添加到原有数据中
  dynamicData.value = [...dynamicData.value, ...newData]
}
</script>

<style scoped>
.dynamic-item {
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  margin: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.item-title {
  display: block;
  font-size: 16px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 8px;
}

.item-content {
  display: block;
  font-size: 14px;
  color: #606266;
  margin-bottom: 12px;
  line-height: 1.5;
}

.item-date {
  display: block;
  font-size: 12px;
  color: #909399;
}
</style>
```

## 样式定制指南

### 自定义列样式

```vue
<template>
  <view>
    <wd-waterfall v-model="customColumnData" custom-class="custom-waterfall">
      <template #default="{ columnList, columnIndex }">
        <view 
          class="custom-item" 
          v-for="(item, index) in columnList" 
          :key="item.id"
          :class="{'left-column': columnIndex === 0, 'right-column': columnIndex === 1}"
        >
          <text>{{ item.title }}</text>
        </view>
      </template>
    </wd-waterfall>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const customColumnData = ref([
  { id: 1, title: '左侧列项目1', height: 100 },
  { id: 2, title: '右侧列项目1', height: 150 },
  { id: 3, title: '左侧列项目2', height: 120 },
  { id: 4, title: '右侧列项目2', height: 180 }
])
</script>

<style scoped>
.custom-waterfall {
  /* 自定义瀑布流容器样式 */
  padding: 10px;
}

.custom-waterfall .wd-waterfall--column {
  /* 自定义列样式 */
  padding: 0 5px;
}

.custom-item {
  background-color: #409eff;
  color: white;
  border-radius: 8px;
  padding: 16px;
  margin: 8px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 为不同列设置不同样式 */
.left-column {
  background-color: #67c23a;
}

.right-column {
  background-color: #e6a23c;
}
</style>
```

## 注意事项

1. **数据格式**：确保提供的数据数组中包含idKey指定的唯一标识字段，以便正确使用remove和modify方法。

2. **性能优化**：
   - 对于大量数据，建议合理设置addTime参数，平衡布局精度和用户体验
   - 可以考虑实现虚拟滚动，避免一次性渲染过多元素

3. **动态修改**：
   - column属性不可动态修改，若需要改变列数，建议重新创建组件
   - 修改数据时，建议使用响应式方式更新modelValue，组件会自动处理布局

4. **图片加载**：
   - 对于图片瀑布流，建议预先获取图片高度，或使用占位符，避免布局跳动
   - 可以使用uni.getImageInfo API获取图片实际高度

5. **兼容性**：
   - 组件使用了uni.createSelectorQuery获取元素高度，确保在目标平台上支持此API
   - 对于不支持此API的平台，组件会使用轮询分配方式

6. **样式注意**：
   - 建议为瀑布流项目添加适当的margin，避免项目之间过于拥挤
   - 可以通过customClass和customStyle自定义瀑布流容器样式

7. **方法使用**：
   - 使用ref获取组件实例后，可以调用clear、remove和modify方法操作数据
   - remove和modify方法会同时更新组件内部数据和外部绑定的数据