# Cell 单元格

<demo-model url="/subPages/cell/Index"></demo-model>

## 组件概况

### 组件概述
Cell 单元格组件是列表中的基本组成单元，用于展示一条信息，支持左侧图标、标题、描述，右侧内容、箭头等多种元素，常用于设置页面、详情页面、列表展示等场景。

### 详细功能描述
- 支持左侧图标、标题、描述信息展示
- 支持右侧内容、箭头、自定义图标
- 支持跳转链接功能
- 支持点击反馈效果
- 支持不同大小设置（默认、large）
- 支持垂直居中对齐
- 支持垂直布局（标题在上，内容在下）
- 支持必填标记显示及位置自定义
- 支持表单验证规则绑定
- 支持自定义样式和类名
- 支持省略号显示

### 适用业务场景
- 设置页面的选项列表
- 详情页面的信息展示
- 导航菜单列表
- 表单中的表单项
- 任何需要展示键值对信息的场景

## 完整API参考

### Props属性

| 名称 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| title | string | - | 否 | 标题 |
| value | string/number | - | 否 | 右侧内容 |
| icon | string | - | 否 | 图标类名 |
| iconSize | string/number | - | 否 | 图标大小 |
| label | string | - | 否 | 描述信息 |
| isLink | boolean | false | 否 | 是否为跳转链接 |
| to | string | - | 否 | 跳转地址 |
| replace | boolean | false | 否 | 跳转时是否替换栈顶页面 |
| clickable | boolean | false | 否 | 开启点击反馈，is-link 默认开启 |
| size | string | - | 否 | 设置单元格大小，可选值：large |
| border | boolean | void 0 | 否 | 是否展示边框线 |
| titleWidth | string | - | 否 | 设置左侧标题宽度 |
| center | boolean | false | 否 | 是否垂直居中，默认顶部居中 |
| required | boolean | false | 否 | 是否必填 |
| vertical | boolean | false | 否 | 表单属性，上下结构 |
| prop | string | - | 否 | 表单域 model 字段名，在使用表单校验功能的情况下，该属性是必填的 |
| rules | array | [] | 否 | 表单验证规则，结合wd-form组件使用 |
| customIconClass | string | - | 否 | icon 使用 slot 时的自定义样式 |
| customLabelClass | string | - | 否 | label 使用 slot 时的自定义样式 |
| customValueClass | string | - | 否 | value 使用 slot 时的自定义样式 |
| customTitleClass | string | - | 否 | title 使用 slot 时的自定义样式 |
| valueAlign | string | right | 否 | value 文字对齐方式，可选值：left、right、center |
| ellipsis | boolean | false | 否 | 是否超出隐藏，显示省略号 |
| useTitleSlot | boolean | true | 否 | 是否启用title插槽，默认启用，用来解决插槽传递时v-slot和v-if冲突问题 |
| markerSide | string | before | 否 | 必填标记位置，可选值：before（标签前）、after（标签后） |
| customStyle | string | - | 否 | 自定义根节点样式 |
| customClass | string | - | 否 | 自定义根节点样式类 |

### Events事件

| 事件名 | 触发条件 | 参数说明 |
|--------|----------|----------|
| click | 单元格被点击，且isLink或clickable为true时 | - |

### Methods方法

该组件没有对外暴露的方法。

### Slots插槽

| 插槽名 | 作用域变量 | 使用说明 |
|--------|------------|----------|
| default | - | 右侧内容区域，替换value属性 |
| icon | - | 左侧图标区域，替换icon属性 |
| title | - | 标题区域，替换title属性 |
| label | - | 描述信息区域，替换label属性 |
| right-icon | - | 右侧图标区域，替换默认箭头 |

## 多场景使用示例代码

### 1. 基础用法

```vue
<template>
  <wd-cell-group>
    <wd-cell title="姓名" value="张三" />
    <wd-cell title="性别" value="男" />
    <wd-cell title="年龄" value="25" />
  </wd-cell-group>
</template>

<script lang="ts" setup>
// 基础单元格用法，展示键值对信息
</script>
```

### 2. 带图标和跳转

```vue
<template>
  <wd-cell-group>
    <wd-cell 
      title="个人资料" 
      icon="user" 
      isLink 
      to="/pages/user/profile"
    />
    <wd-cell 
      title="消息中心" 
      icon="message" 
      isLink 
      to="/pages/message/list"
    >
      <wd-badge slot="right-icon" modelValue="5" />
    </wd-cell>
    <wd-cell 
      title="设置" 
      icon="setting" 
      isLink 
      to="/pages/setting/index"
    />
  </wd-cell-group>
</template>

<script lang="ts" setup>
// 带图标和跳转功能的单元格，展示导航菜单
</script>
```

### 3. 垂直布局和描述信息

```vue
<template>
  <wd-cell-group>
    <wd-cell 
      title="商品名称" 
      label="这是一个非常好用的商品，值得购买" 
      vertical 
      size="large"
    >
      <view class="custom-value">
        <text class="price">¥99.00</text>
        <text class="stock">库存: 100件</text>
      </view>
    </wd-cell>
    <wd-cell 
      title="商品描述" 
      label="商品的详细描述信息，包含商品的功能、材质、尺寸等"
      vertical
    >
      <view class="custom-value">查看详情</view>
    </wd-cell>
  </wd-cell-group>
</template>

<script lang="ts" setup>
// 垂直布局的单元格，展示商品信息
</script>

<style scoped>
.custom-value {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.price {
  font-size: 32rpx;
  color: #fa4350;
  font-weight: bold;
}

.stock {
  font-size: 24rpx;
  color: #909399;
}
</style>
```

### 4. 表单必填项

```vue
<template>
  <wd-form :model="form" :rules="rules">
    <wd-cell-group>
      <wd-cell 
        title="用户名" 
        prop="username" 
        required 
        markerSide="after"
      >
        <wd-input v-model="form.username" placeholder="请输入用户名" />
      </wd-cell>
      <wd-cell 
        title="密码" 
        prop="password" 
        required
      >
        <wd-input v-model="form.password" type="password" placeholder="请输入密码" />
      </wd-cell>
      <wd-cell 
        title="邮箱" 
        prop="email" 
        label="用于接收验证码" 
        required
      >
        <wd-input v-model="form.email" placeholder="请输入邮箱" />
      </wd-cell>
    </wd-cell-group>
  </wd-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

// 表单数据
const form = reactive({
  username: '',
  password: '',
  email: ''
})

// 表单验证规则
const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ]
}
</script>
```

### 5. 自定义样式和点击事件

```vue
<template>
  <wd-cell-group>
    <wd-cell 
      title="自定义样式" 
      value="点击查看" 
      clickable 
      customClass="custom-cell"
      customTitleClass="custom-title"
      customValueClass="custom-value"
      @click="handleClick"
    />
    <wd-cell 
      title="省略号显示" 
      value="这是一段很长的文本内容，超过一定长度会显示省略号" 
      ellipsis 
      size="large"
    />
    <wd-cell 
      title="无箭头跳转" 
      isLink 
      to="/pages/detail"
    >
      <template #right-icon>
        <wd-icon name="arrow-right" size="24" />
      </template>
    </wd-cell>
  </wd-cell-group>
</template>

<script lang="ts" setup>
import { showToast } from '@/utils/toast'

// 处理单元格点击事件
const handleClick = () => {
  showToast('点击了自定义样式单元格')
}
</script>

<style scoped>
/* 注意：需要使用 ::v-deep 或 /deep/ 穿透 scoped 样式 */
:deep(.custom-cell) {
  background-color: #f5f7fa;
}

:deep(.custom-title) {
  font-weight: bold;
  color: #4D80F0;
}

:deep(.custom-value) {
  color: #34d19d;
}
</style>
```

## 样式定制指南

### 1. 使用customStyle自定义样式

```vue
<template>
  <wd-cell 
    title="自定义样式" 
    value="示例" 
    customStyle="background-color: #f0f2f5; padding: 30rpx;"
  />
</template>
```

### 2. 使用customClass自定义类名

```vue
<template>
  <wd-cell 
    title="自定义类名" 
    value="示例" 
    customClass="my-cell"
  />
</template>

<style scoped>
/* 注意：需要使用 ::v-deep 或 /deep/ 穿透 scoped 样式 */
:deep(.my-cell) {
  margin: 20rpx;
  border-radius: 12rpx;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
</style>
```

### 3. 自定义各区域样式

```vue
<template>
  <wd-cell 
    title="自定义区域样式" 
    value="示例" 
    customIconClass="custom-icon"
    customTitleClass="custom-title"
    customLabelClass="custom-label"
    customValueClass="custom-value"
    label="描述信息"
    icon="info"
  />
</template>

<style scoped>
/* 自定义各区域样式 */
:deep(.custom-icon) {
  color: #4D80F0;
  margin-right: 20rpx;
}

:deep(.custom-title) {
  font-weight: bold;
  font-size: 32rpx;
}

:deep(.custom-label) {
  color: #909399;
  font-size: 24rpx;
}

:deep(.custom-value) {
  color: #34d19d;
  font-size: 28rpx;
}
</style>
```

## 注意事项

1. **边框线显示**：border属性默认为void 0，会继承cell-group组件的border属性值，cell-group默认显示边框线。

2. **跳转链接**：isLink为true时，点击单元格会跳转到to属性指定的页面，to属性必须是有效的路由地址。

3. **必填标记位置**：required为true时，会显示必填标记，可通过markerSide属性设置标记位置（before或after）。

4. **插槽优先级**：插槽的优先级高于对应的属性，例如title插槽会替换title属性。

5. **title插槽使用**：useTitleSlot属性默认为true，启用title插槽，当需要在title属性和title插槽之间动态切换时，可设置useTitleSlot为false。

6. **垂直布局**：vertical为true时，标题和描述信息会垂直排列，标题在上，描述信息在下。

7. **点击反馈**：isLink或clickable为true时，会启用点击反馈效果，hover-class为"is-hover"。

8. **表单校验**：当cell组件在wd-form组件内使用时，prop属性用于绑定表单数据字段，rules属性用于设置验证规则。

9. **省略号显示**：ellipsis为true时，右侧内容会显示省略号，需要确保内容区域有足够的宽度限制。

10. **单元格大小**：size属性可选值为"large"，用于设置大尺寸单元格，增加内边距和字体大小。