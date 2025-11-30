# LLMS 数据生成说明

此文档说明如何将项目生成的 `llms.txt` 转为结构化 JSONL，并对生成内容进行基本校验，便于用于向量检索或下游训练流程。

文件 & 脚本

- `docs/public/llms.txt`：由脚本 `scripts/generate-llms.js` 生成，包含站点页面的纯文本（以 `===== <url> =====` 分隔）。
- `scripts/llms-to-jsonl.js`：将 `llms.txt` 解析为 `docs/public/llms.jsonl`，每行一个 JSON 对象，带 metadata（id,url,title,chunk_index,length,text）。默认按 1200 字符分块（中文近似 600-800 tokens），可按需调整。
- `scripts/validate-jsonl.js`：对生成的 `llms.jsonl` 做基本检查（JSON 有效性、字段完整性、示例采样）。

运行示例

在项目根目录运行：

```powershell
node .\\scripts\\llms-to-jsonl.js
node .\\scripts\\validate-jsonl.js
```

后续建议

- 使用 tokenizer（如 tiktoken）替代简单字符分割以实现精确 token 分块。
- 将输出改为 JSONL 中包含 `language`、`license`、`source` 等字段以便合规审计。
- 将生成流程加入 CI，在每次文档更新时自动运行并输出 JSONL（embedding 更新可单独运行以节省成本）。
