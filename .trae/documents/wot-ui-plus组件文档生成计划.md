# wot-ui-plus 组件文档生成实施计划

## 一、项目概况

**目标**：基于 `D:\IdeaSpace\GitSpace\wot-ui-plus\src\uni_modules\wot-ui-plus\components` 目录下的全部组件源码，以及 `D:\IdeaSpace\GitSpace\wot-ui-plus\src\subPages` 目录中的实际应用示例，在 `D:\IdeaSpace\MySpace\wot-ui-docs\docs\components\wot` 目录下生成标准化的中文 Markdown 使用文档。

**组件总数**：约 120+ 个独立组件（含关联组件）

---

## 二、组件分组清单

### 2.1 表单类组件（共 22 篇文档）

| 文档文件 | 主组件 | 关联组件 | 分组说明 |
|---------|--------|---------|---------|
| button.md | wd-button | - | 按钮组件，常用于表单提交与操作触发 |
| radio.md | wd-radio | wd-radio-group | 单选框及单选框组，配合使用 |
| checkbox.md | wd-checkbox | wd-checkbox-group | 复选框及复选框组，配合使用 |
| form.md | wd-form | wd-form-item | 表单容器及表单项，配合使用 |
| input.md | wd-input | - | 输入框，独立组件 |
| textarea.md | wd-textarea | - | 文本域，独立组件 |
| input-number.md | wd-input-number | - | 数字输入框，独立组件 |
| switch.md | wd-switch | - | 开关组件，独立组件 |
| picker.md | wd-picker | - | 选择器 |
| picker-view.md | wd-picker-view | - | 选择器视图 |
| datetime-picker.md | wd-datetime-picker | - | 日期时间选择器 |
| datetime-picker-view.md | wd-datetime-picker-view | - | 日期时间选择器视图 |
| col-picker.md | wd-col-picker | - | 多列选择器，独立组件 |
| select-picker.md | wd-select-picker | - | 下拉选择器，独立组件 |
| keyboard.md | wd-keyboard | wd-keyboard/key | 虚拟键盘（含子组件） |
| number-keyboard.md | wd-number-keyboard | wd-number-keyboard/key | 数字键盘（含子组件） |
| code.md | wd-code | - | 验证码 |
| code-input.md | wd-code-input | - | 验证码输入框 |
| password-input.md | wd-password-input | - | 密码输入框，独立组件 |
| search.md | wd-search | - | 搜索框，独立组件 |
| signature.md | wd-signature | - | 签名组件，独立组件 |
| upload.md | wd-upload | - | 上传组件，独立组件 |

### 2.2 反馈类组件（共 12 篇文档）

| 文档文件 | 主组件 | 关联组件 | 分组说明 |
|---------|--------|---------|---------|
| toast.md | wd-toast | - | 消息提示，独立组件 |
| message-box.md | wd-message-box | - | 消息框，独立组件 |
| notify.md | wd-notify | - | 通知，独立组件 |
| loading.md | wd-loading | - | 加载中，独立组件 |
| loadmore.md | wd-loadmore | - | 加载更多，独立组件 |
| loading-page.md | wd-loading-page | - | 页面加载，独立组件 |
| status-tip.md | wd-status-tip | - | 状态提示，独立组件 |
| skeleton.md | wd-skeleton | - | 骨架屏，独立组件 |
| action-sheet.md | wd-action-sheet | - | 动作面板，独立组件 |
| overlay.md | wd-overlay | - | 遮罩层，独立组件 |
| popup.md | wd-popup | - | 弹出层，独立组件 |
| curtain.md | wd-curtain | - | 幕帘，独立组件 |

### 2.3 导航类组件（共 10 篇文档）

| 文档文件 | 主组件 | 关联组件 | 分组说明 |
|---------|--------|---------|---------|
| tabbar.md | wd-tabbar | wd-tabbar-item | 标签栏及标签项，配合使用 |
| tabs.md | wd-tabs | wd-tab | 标签页及标签，配合使用 |
| sidebar.md | wd-sidebar | wd-sidebar-item | 侧边栏及侧边项，配合使用 |
| drop-menu.md | wd-drop-menu | wd-drop-menu-item | 下拉菜单及菜单项，配合使用 |
| navbar.md | wd-navbar | wd-navbar-capsule | 导航栏及胶囊导航 |
| sticky.md | wd-sticky | wd-sticky-box | 粘性定位及粘性容器 |
| backtop.md | wd-backtop | - | 回到顶部，独立组件 |
| pagination.md | wd-pagination | - | 分页，独立组件 |
| sort-button.md | wd-sort-button | - | 排序按钮，独立组件 |
| index-bar.md | wd-index-bar | wd-index-anchor | 索引栏及索引锚点 |

### 2.4 展示类组件（共 31 篇文档）

| 文档文件 | 主组件 | 关联组件 | 分组说明 |
|---------|--------|---------|---------|
| text.md | wd-text | - | 文本，独立组件 |
| icon.md | wd-icon | - | 图标，独立组件 |
| img.md | wd-img | - | 图片，独立组件 |
| divider.md | wd-divider | - | 分割线，独立组件 |
| tag.md | wd-tag | - | 标签，独立组件 |
| badge.md | wd-badge | - | 徽章，独立组件 |
| avatar.md | wd-avatar | wd-avatar-group | 头像及头像组 |
| cell.md | wd-cell | wd-cell-group | 单元格及单元格组 |
| card.md | wd-card | - | 卡片，独立组件 |
| count-down.md | wd-count-down | - | 倒计时，独立组件 |
| count-to.md | wd-count-to | - | 数字滚动，独立组件 |
| calendar.md | wd-calendar | - | 日历 |
| calendar-view.md | wd-calendar-view | - | 日历视图（含 month/panel 等子组件） |
| notice-bar.md | wd-notice-bar | - | 通知栏，独立组件 |
| progress.md | wd-progress | - | 进度条，独立组件 |
| circle.md | wd-circle | - | 圆形进度，独立组件 |
| rate.md | wd-rate | - | 评分，独立组件 |
| slider.md | wd-slider | - | 滑块 |
| slider-button.md | wd-slider-button | - | 滑块按钮 |
| segmented.md | wd-segmented | - | 分段器，独立组件 |
| collapse.md | wd-collapse | wd-collapse-item | 折叠面板及折叠项，配合使用 |
| steps.md | wd-steps | wd-step | 步骤条及步骤项 |
| swiper.md | wd-swiper | wd-swiper-nav | 轮播图及轮播导航 |
| tour.md | wd-tour | - | 新手引导，独立组件 |
| tree.md | wd-tree | - | 树形控件，独立组件 |
| watermark.md | wd-watermark | - | 水印，独立组件 |
| gap.md | wd-gap | - | 间距，独立组件 |
| resize.md | wd-resize | - | 自适应，独立组件 |
| floating-panel.md | wd-floating-panel | - | 浮动面板，独立组件 |
| tooltip.md | wd-tooltip | - | 文字提示，独立组件 |
| popover.md | wd-popover | - | 气泡卡片，独立组件 |

### 2.5 布局类组件（共 13 篇文档）

| 文档文件 | 主组件 | 关联组件 | 分组说明 |
|---------|--------|---------|---------|
| row.md | wd-row | wd-col | 行及列，配合使用 |
| grid.md | wd-grid | wd-grid-item | 网格及网格项，配合使用 |
| table.md | wd-table | wd-table-col | 表格及表格列，配合使用 |
| fab.md | wd-fab | - | 悬浮按钮，独立组件 |
| swipe-action.md | wd-swipe-action | - | 滑动操作，独立组件 |
| transition.md | wd-transition | - | 过渡动画，独立组件 |
| root-portal.md | wd-root-portal | - | 根门户，独立组件 |
| config-provider.md | wd-config-provider | - | 全局配置，独立组件 |
| lazy-load.md | wd-lazy-load | - | 懒加载，独立组件 |
| date-strip.md | wd-date-strip | - | 日期条，独立组件 |
| img-cropper.md | wd-img-cropper | - | 图片裁剪，独立组件 |
| video-preview.md | wd-video-preview | - | 视频预览，独立组件 |
| waterfall.md | wd-waterfall | - | 瀑布流，独立组件 |

---

## 三、文档标准模板结构

每篇文档必须遵循以下统一结构：

```markdown
# ComponentName 中文名称

## 组件概况

[核心功能定位、设计理念、适用场景、典型业务用途，1-2个应用场景示意图描述]

## 核心功能描述

[主要能力特性、用户交互方式、技术实现特点、使用限制条件、多端适配说明]

## 适用业务场景

[结合业务需求的场景1：具体业务案例说明]
[结合业务需求的场景2：具体业务案例说明]
[结合业务需求的场景3：具体业务案例说明]

## API

### Props

| 属性名称 | 类型 | 默认值 | 是否必填 | 说明 |
|---------|------|--------|---------|------|
| prop1 | String | - | 否 | 参数含义... |
| customStyle | String | - | 否 | 自定义样式 |
| customClass | String | - | 否 | 自定义类名 |

### Events

| 事件名称 | 触发条件 | 参数类型 | 回调数据说明 |
|---------|---------|---------|-------------|
| event1 | 具体场景描述 | (value: Type) | 参数结构说明... |

### Methods

| 方法名称 | 参数 | 返回值 | 说明 |
|---------|------|--------|------|
| method1 | (param1: Type) | ReturnType | 功能描述... |

### Slots

| 插槽名称 | 作用域参数 | 使用场景 |
|---------|-----------|---------|
| default | { value: Type } | 典型应用场景... |

## 使用示例

### 示例1：基础用法

[完整的vue代码块，包含template/script/style]

[示例效果说明]

### 示例2：[具体功能描述]

[完整的vue代码块，包含template/script/style]

[示例效果说明]

### 示例3：[具体功能描述]

[完整的vue代码块，包含template/script/style]

[示例效果说明]

### 示例4：[高级应用场景]

[完整的vue代码块，包含template/script/style]

[示例效果说明]

## 注意事项

[注意事项、常见问题、性能优化建议、已知限制]
```

---

## 四、实施步骤

### 阶段一：组件源码深度分析（预计 15 个组件批次处理）

**步骤 1.1**：读取每个组件的以下核心文件：
- `wd-xxx/wd-xxx.vue`：组件主实现
- `wd-xxx/types.ts`：类型定义
- `wd-xxx/index.scss`：样式文件

**步骤 1.2**：提取关键信息：
- Props 定义（从 props 对象或 defineProps 中提取）
- Events 声明（从 $emit 调用中提取）
- Methods 方法（从 expose 或 public 方法中提取）
- Slots 定义（从 <slot> 标签中提取）
- 组件关联关系（从 useParent/useChildren composable 中提取）

**步骤 1.3**：分析示例应用：
- 读取 `subPages/xxx/Index.vue` 及相关 demo 文件
- 提取实际使用模式和最佳实践

### 阶段二：文档批量生成

**步骤 2.1**：按照分组清单，逐组生成文档

**步骤 2.2**：每篇文档生成流程：
1. 创建文件（文件名：组件英文名小写+.md）
2. 填写一级标题（格式：`# ComponentName 中文名称`）
3. 编写组件概况（基于源码注释和功能分析）
4. 编写核心功能描述（基于实现逻辑）
5. 编写适用业务场景（基于示例文件）
6. 填写 Props 表格（严格按源码提取）
7. 填写 Events 表格（严格按 $emit 提取）
8. 填写 Methods 表格（按 expose 的方法提取）
9. 填写 Slots 表格（按 <slot> 标签提取）
10. 编写使用示例（至少3个，参考 subPages 示例）
11. 编写注意事项（基于实现细节和边界条件）

### 阶段三：文档质量校验

**步骤 3.1**：检查所有文档结构是否统一
**步骤 3.2**：验证 Props/Events/Methods/Slots 是否与源码完全一致
**步骤 3.3**：验证示例代码是否可直接运行
**步骤 3.4**：确保 customStyle、customClass 始终在 Props 表最后
**步骤 3.5**：确保表格格式统一、代码块格式规范

---

## 五、关键技术要点

### 5.1 关联组件识别

通过以下 composable 判断组件关联关系：
- `useParent`：查找父组件，说明当前组件是子组件
- `useChildren`：查找子组件，说明当前组件是父组件
- 组件名中的 `-group`、`-item`、`-view` 后缀通常是关联组件标识

### 5.2 Props 提取规则

- 从 `props` 对象提取（Vue 2/3 Options API）
- 从 `defineProps` 提取（Vue 3 Composition API）
- 必须包含：属性名、类型、默认值、必填标识、说明

### 5.3 Events 提取规则

- 从 `$emit('event-name', payload)` 调用中提取
- 必须包含：事件名、触发条件、参数类型、回调数据说明

### 5.4 Slots 提取规则

- 从 `<slot name="xxx">` 标签中提取
- 从 `<slot :value="xxx">` 中提取作用域参数
- 默认插槽使用 "default" 标识

### 5.5 示例代码编写规则

- 优先参考 `subPages/xxx/Index.vue` 中的实际用法
- 示例必须包含完整的 template 结构
- 示例必须包含必要的 script 逻辑
- 示例必须可直接复制到项目运行
- 严禁编造脱离源码实际能力的示例

---

## 六、输出清单

最终将在 `D:\IdeaSpace\MySpace\wot-ui-docs\docs\components\wot` 目录生成以下文档：

### 总计：约 88 篇文档

**表单类**：22 篇
- button.md, radio.md, checkbox.md, form.md, input.md, textarea.md, input-number.md
- switch.md, picker.md, picker-view.md, datetime-picker.md, datetime-picker-view.md
- col-picker.md, select-picker.md, keyboard.md, number-keyboard.md, code.md, code-input.md
- password-input.md, search.md, signature.md, upload.md

**反馈类**：12 篇
- toast.md, message-box.md, notify.md, loading.md, loadmore.md, loading-page.md
- status-tip.md, skeleton.md, action-sheet.md, overlay.md, popup.md, curtain.md

**导航类**：10 篇
- tabbar.md, tabs.md, sidebar.md, drop-menu.md, navbar.md, sticky.md
- backtop.md, pagination.md, sort-button.md, index-bar.md

**展示类**：31 篇
- text.md, icon.md, img.md, divider.md, tag.md, badge.md, avatar.md, cell.md, card.md
- count-down.md, count-to.md, calendar.md, calendar-view.md, notice-bar.md, progress.md
- circle.md, rate.md, slider.md, slider-button.md, segmented.md, collapse.md, steps.md
- swiper.md, tour.md, tree.md, watermark.md
- gap.md, resize.md, floating-panel.md, tooltip.md, popover.md

**布局类**：13 篇
- row.md, grid.md, table.md, fab.md, swipe-action.md, transition.md, root-portal.md
- config-provider.md, lazy-load.md, date-strip.md, img-cropper.md, video-preview.md, waterfall.md

---

## 七、执行策略

1. **分批处理**：按功能分类分批处理，每批处理 5-10 个组件组
2. **并行分析**：同时读取多个组件源码提高效率
3. **质量优先**：每个组件文档生成后立即验证结构完整性
4. **参考优先**：所有示例优先从 subPages 目录提取，确保实用性
5. **严格遵循**：严格按照源码实现编写，绝不臆造 API

---

## 八、注意事项

1. 文件编码统一为 UTF-8
2. 文件名采用组件英文名称小写+中划线格式（如 action-sheet.md）
3. 一级标题格式严格遵循 `# ComponentName 中文名称`
4. 表格使用标准 Markdown 表格语法
5. 代码块使用 ```vue、```javascript 等语言标识
6. customStyle、customClass 属性始终放在 Props 表最后
7. 所有描述基于源码实现，不虚构版本兼容性承诺
