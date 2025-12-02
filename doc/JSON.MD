# JSON数据结构说明文档

## 概述

本文档详细描述了项目中位于 `docs/public/json/` 目录下的各个JSON文件的数据结构，包括字段含义、数据类型、约束条件等信息，以便开发人员更好地理解和使用这些数据。

## 文件列表

- [advs.json](#advsjson)
- [developers.json](#developersjson)
- [donation.json](#donationjson)
- [messages.json](#messagesjson)
- [tips.json](#tipsjson)
- [tips-release.json](#tips-releasejson)
- [tips-star.json](#tips-starjson)
- [tips-support.json](#tips-supportjson)

## advs.json

### 文件路径
`docs/public/json/advs.json`

### 结构概述

广告数据配置文件，包含广告列表信息。

### 详细结构

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "list": [
      {
        "title": "精美浏览器插件",
        "imageUrl": "https://haowallpaper.com/",
        "link": "https://nbtab.com",
        "hidden": true
      }
    ]
  }
}
```

#### 字段说明

| 字段名 | 数据类型 | 含义 | 约束条件 |
|-------|---------|------|---------|
| `code` | 整数 | 响应状态码 | 0表示成功 |
| `message` | 字符串 | 响应消息 | 通常为"success" |
| `data` | 对象 | 数据主体 | 包含广告列表 |
| `data.list` | 数组 | 广告列表 | 包含多个广告对象 |

#### 广告对象字段说明

| 字段名 | 数据类型 | 含义 | 约束条件 |
|-------|---------|------|---------|
| `title` | 字符串 | 广告标题 | 不能为空 |
| `imageUrl` | 字符串 | 广告图片URL | 不能为空，必须是有效的URL |
| `link` | 字符串 | 广告链接 | 不能为空，必须是有效的URL |
| `hidden` | 布尔值 | 是否隐藏广告 | 可选，默认为false |

## developers.json

### 文件路径
`docs/public/json/developers.json`

### 结构概述

开发者信息配置文件，包含项目开发者和贡献者的详细信息。

### 详细结构

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "list": [
      {
        "avatar": "https://github.com",
        "nickname": "哈哈先生",
        "position": "全栈开发",
        "introduction": "专全栈开发者，欢迎关注。",
        "city": "",
        "skills": [
          {
            "tag": "github",
            "url": "https://github.com"
          }
        ],
        "type": 0,
        "isAuthor": true,
        "isActive": true,
        "sort": 0
      }
    ]
  }
}
```

#### 字段说明

| 字段名 | 数据类型 | 含义 | 约束条件 |
|-------|---------|------|---------|
| `code` | 整数 | 响应状态码 | 0表示成功 |
| `message` | 字符串 | 响应消息 | 通常为"success" |
| `data` | 对象 | 数据主体 | 包含开发者列表 |
| `data.list` | 数组 | 开发者列表 | 包含多个开发者对象 |

#### 开发者对象字段说明

| 字段名 | 数据类型 | 含义 | 约束条件 |
|-------|---------|------|---------|
| `avatar` | 字符串 | 头像URL | 可为空 |
| `nickname` | 字符串 | 昵称 | 不能为空 |
| `position` | 字符串 | 职位 | 不能为空 |
| `introduction` | 字符串 | 个人简介 | 不能为空 |
| `city` | 字符串 | 城市 | 可为空 |
| `skills` | 数组 | 技能/社交链接 | 包含多个技能对象 |
| `type` | 整数 | 开发者类型 | 0表示作者，2表示贡献者 |
| `isAuthor` | 布尔值 | 是否为作者 | true或false |
| `isActive` | 布尔值 | 是否活跃 | true或false |
| `sort` | 整数 | 排序权重 | 数值越小，排序越靠前 |

#### 技能对象字段说明

| 字段名 | 数据类型 | 含义 | 约束条件 |
|-------|---------|------|---------|
| `tag` | 字符串 | 技能标签 | 不能为空，如github、gitee、csdn等 |
| `url` | 字符串 | 链接地址 | 不能为空，必须是有效的URL |

## donation.json

### 文件路径
`docs/public/json/donation.json`

### 结构概述

捐赠记录配置文件，包含项目捐赠者的详细信息和捐赠记录。

### 详细结构

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "list": [
      {
        "amount": 1.0,
        "avatar": "",
        "comment": "",
        "donationDate": "2025-10-01",
        "name": "哈哈先生",
        "platform": "wechat"
      }
    ]
  }
}
```

#### 字段说明

| 字段名 | 数据类型 | 含义 | 约束条件 |
|-------|---------|------|---------|
| `code` | 整数 | 响应状态码 | 0表示成功 |
| `message` | 字符串 | 响应消息 | 通常为"success" |
| `data` | 对象 | 数据主体 | 包含捐赠记录列表 |
| `data.list` | 数组 | 捐赠记录列表 | 包含多个捐赠记录对象 |

#### 捐赠记录对象字段说明

| 字段名 | 数据类型 | 含义 | 约束条件 |
|-------|---------|------|---------|
| `amount` | 数字/字符串 | 捐赠金额 | 数字或"-"（表示金额未知） |
| `avatar` | 字符串 | 捐赠者头像URL | 可为空 |
| `comment` | 字符串 | 捐赠留言 | 可为空 |
| `donationDate` | 字符串 | 捐赠日期 | 格式为"YYYY-MM-DD" |
| `name` | 字符串 | 捐赠者名称 | 不能为空 |
| `platform` | 字符串 | 捐赠平台 | 不能为空，如wechat、alipay、dcloud等 |

## messages.json

### 文件路径
`docs/public/json/messages.json`

### 结构概述

消息通知配置文件，包含项目的最新消息和通知列表。

### 详细结构

```json
[
  {
    "id": "release-v3.1.0",
    "title": "v3.1.0 已发布",
    "desc": "3.1.0 带来多主题体系、暗黑模式与主题管理能力的全面升级，推荐尽快体验与迁移。",
    "date": "2025-11-30 00:00:00",
    "type": "tips",
    "tipsKey": "release",
    "pinned": true
  }
]
```

#### 字段说明

| 字段名 | 数据类型 | 含义 | 约束条件 |
|-------|---------|------|---------|
| `id` | 字符串 | 消息唯一标识符 | 不能为空，格式为"msg-xxx" |
| `title` | 字符串 | 消息标题 | 不能为空 |
| `desc` | 字符串 | 消息描述 | 不能为空 |
| `date` | 字符串 | 消息发布日期 | 格式为"YYYY-MM-DD HH:mm:ss" |
| `type` | 字符串 | 消息类型 | 不能为空，如"tips"、"url"等 |
| `tipsKey` | 字符串 | 提示键 | 当type为"tips"时必须存在，与tips.json中的键对应 |
| `pinned` | 布尔值 | 是否置顶 | 当type为"tips"时可选，默认为false |
| `url` | 字符串 | 链接地址 | 当type为"url"时必须存在，必须是有效的URL |

## tips.json

### 文件路径
`docs/public/json/tips.json`

### 结构概述

提示信息映射文件，用于将提示键与对应的提示信息文件关联起来。

### 详细结构

```json
{
  "support": "tips-support.json",
  "star": "tips-star.json",
  "release": "tips-release.json"
}
```

#### 字段说明

| 字段名 | 数据类型 | 含义 | 约束条件 |
|-------|---------|------|---------|
| `support` | 字符串 | 支持提示对应的JSON文件名 | 不能为空 |
| `star` | 字符串 | Star提示对应的JSON文件名 | 不能为空 |
| `release` | 字符串 | 版本发布提示对应的JSON文件名 | 不能为空 |

## tips-release.json

### 文件路径
`docs/public/json/tips-release.json`

### 结构概述

版本发布提示信息配置文件，包含版本更新的详细信息和操作按钮。

### 详细结构

```json
{
  "key": "release_v3.1.0",
  "title": "新版本已发布：v3.1.0",
  "subtitle": "更新日期：2025-11-30",
  "description": "3.1.0 带来多主题体系、暗黑模式与主题管理能力的全面升级，推荐尽快体验与迁移。",
  "reasons": [
    "实现自定义多主题与运行时主题切换，支持多套主题并兼容单主题场景。支持安卓/iOS/鸿蒙，小程序等多平台。"
  ],
  "proceed": "进入文档",
  "actions": [
    {
      "text": "进入文档",
      "type": "default"
    },
    {
      "text": "点亮 Gitee ✨",
      "icon": "custom-icon custom-icon-gitee",
      "type": "primary",
      "url": "https://gitee.com/"
    }
  ]
}
```

#### 字段说明

| 字段名 | 数据类型 | 含义 | 约束条件 |
|-------|---------|------|---------|
| `key` | 字符串 | 提示信息唯一标识符 | 不能为空 |
| `title` | 字符串 | 提示标题 | 不能为空 |
| `subtitle` | 字符串 | 提示副标题 | 不能为空 |
| `description` | 字符串 | 提示详细描述 | 不能为空 |
| `reasons` | 数组 | 更新理由/特性列表 | 包含多个字符串元素 |
| `proceed` | 字符串 | 继续按钮文本 | 不能为空 |
| `actions` | 数组 | 操作按钮列表 | 包含多个操作按钮对象 |

#### 操作按钮对象字段说明

| 字段名 | 数据类型 | 含义 | 约束条件 |
|-------|---------|------|---------|
| `text` | 字符串 | 按钮文本 | 不能为空 |
| `icon` | 字符串 | 按钮图标类名 | 可选 |
| `type` | 字符串 | 按钮类型 | 不能为空，如"primary"、"default"等 |
| `url` | 字符串 | 按钮链接地址 | 可选，必须是有效的URL |

## tips-star.json

### 文件路径
`docs/public/json/tips-star.json`

### 结构概述

Star提示信息配置文件，用于引导用户为项目点赞。

### 详细结构

```json
{
  "key": "tips_star_v1",
  "title": "请给 wot ui plus 点个 Star",
  "subtitle": "支持开源，鼓励维护与迭代",
  "description": "开源不易，如果 wot ui plus 对你有帮助，请帮忙点个 Star 支持我们持续维护！",
  "reasons": [
    "你的 Star 能帮助更多人发现项目，让我们有动力继续改进。"
  ],
  "proceed": "我已 Star，进入文档",
  "actions": [
    {
      "text": "在 GitHub 上 Star",
      "icon": "custom-icon custom-icon-github",
      "type": "primary",
      "url": "https://github.com"
    }
  ]
}
```

#### 字段说明

与 [tips-release.json](#tips-releasejson) 字段结构完全相同。

## tips-support.json

### 文件路径
`docs/public/json/tips-support.json`

### 结构概述

支持提示信息配置文件，用于引导用户支持项目。

### 详细结构

```json
{
  "key": "tips_checked_v1",
  "tipsTopKey": "tipsTop_checked_v1",
  "title": "uView Pro 需要您的支持",
  "subtitle": "支持开源，鼓励维护与迭代",
  "description": "开源不易，uView Pro 需要您的支持！",
  "reasons": [
    "我正在参加 Gitee 2025 最受欢迎的开源软件投票活动，快来给我投票吧！"
  ],
  "proceed": "进入文档",
  "actions": [
    {
      "text": "已经投票",
      "type": "default",
      "url": "https://gitee.com"
    }
  ]
}
```

#### 字段说明

与 [tips-release.json](#tips-releasejson) 字段结构基本相同，增加了一个额外字段：

| 字段名 | 数据类型 | 含义 | 约束条件 |
|-------|---------|------|---------|
| `tipsTopKey` | 字符串 | 顶部提示唯一标识符 | 可选 |

## 数据关系图

```
┌─────────────────┐     ┌─────────────────┐
│   messages.json │────▶│     tips.json   │
└─────────────────┘     └─────────┬───────┘
                                   │
           ┌───────────────────────┼───────────────────────┐
           ▼                       ▼                       ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│tips-release.json│     │  tips-star.json │     │tips-support.json│
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## 使用建议

1. 所有JSON文件中的字符串值都应使用UTF-8编码
2. 日期格式应保持统一（如"YYYY-MM-DD HH:mm:ss"或"YYYY-MM-DD"）
3. URL字段应确保是有效的、可访问的链接
4. 新增字段时应考虑向后兼容性
5. 对于大型JSON文件（如donation.json），建议定期进行数据清理和优化

