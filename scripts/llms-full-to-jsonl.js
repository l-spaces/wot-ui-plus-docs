/**
 * @file llms-full-to-jsonl.js
 * @description 将完整的 LLM 数据文件转换为 JSONL 格式的脚本
 * @author -  
 * @date -  
 * 
 * 架构定位：
 * - 该脚本属于项目的 LLM 数据处理流程，用于将完整的 LLM 数据转换为结构化的 JSONL 格式
 * - 依赖于构建过程中生成的 llms-full.txt 文件
 * - 输出的 JSONL 文件可直接用于 LLM 训练或提示
 * 
 * 核心功能：
 * - 从指定路径读取 llms-full.txt 文件
 * - 解析文件中的 URL 和 Markdown 内容
 * - 提取页面标题（优先从 # 标题获取，否则从 URL 推断）
 * - 清理 Markdown 内容，提取纯文本
 * - 将文本分块，生成结构化的 JSON 记录
 * - 将记录写入 JSONL 文件
 * 
 * 设计思路：
 * - 采用正则表达式解析文件结构
 * - 使用 URL 和标题双重机制生成唯一标识
 * - 支持文本分块，控制每个 JSON 记录的大小
 * - 输出格式符合 LLM 训练数据要求
 * - 错误处理完善，确保脚本稳定性
 * 
 * 使用场景：
 * - 项目构建完成后，生成结构化的 LLM 训练数据
 * - 为 AI 助手提供格式化的文档语料
 * - 用于构建基于项目文档的问答系统
 */

const fs = require('fs')
const path = require('path')

// 从 docs/.vitepress/dist/llms-full.txt 解析出每个页面（前置 YAML: url），并将内容分块写入 docs/public/llms.jsonl

const workspaceRoot = path.resolve(__dirname, '..')
const inPath = path.join(workspaceRoot, 'docs', '.vitepress', 'dist', 'llms-full.txt')
const outPath = path.join(workspaceRoot, 'docs', '.vitepress', 'dist', 'llms.jsonl')

if (!fs.existsSync(inPath)){
  console.error('input not found:', inPath)
  process.exit(1)
}

const raw = fs.readFileSync(inPath, 'utf8')

// 分割：文件是由重复的前置块组成：
// ---\nurl: 'https://...'
// ---\n
// 然后是页面 markdown 内容

const parts = raw.split(/\n---\nurl:\s*'([^']+)'\n---\n/)
// split 会产生 ['', url1, text1, url2, text2, ...]

const records = []
for (let i = 1; i < parts.length; i += 2){
  const url = parts[i]
  const md = (parts[i+1] || '').trim()
  if (!url) continue

  // 简单从 md 中提取 title：优先第一行的 # 标题
  let title = 'index'
  const lines = md.split(/\r?\n/)
  for (const ln of lines){
    const m = ln.match(/^#\s+(.*)/)
    if (m){ title = m[1].trim(); break }
  }
  // 如果没找到，则用 url 最后一段
  if (!title){
    const seg = url.replace(/\/$/, '').split('/')
    title = decodeURIComponent((seg[seg.length-1] || 'index').replace(/\.md$|\.html$/i, ''))
  }

  // 去除 Markdown 代码块/前后标记、图片、链接、HTML 标签，保留文字
  let text = md
  // remove code fences
  text = text.replace(/```[\s\S]*?```/g, ' ')
  // remove inline code
  text = text.replace(/`[^`]*`/g, ' ')
  // remove images
  text = text.replace(/!\[.*?\]\(.*?\)/g, ' ')
  // replace links [text](url) => text
  text = text.replace(/\[(.*?)\]\([^\)]*\)/g, '$1')
  // strip HTML tags
  text = text.replace(/<[^>]+>/g, ' ')
  // remove remaining markdown headings and list markers but keep text
  text = text.replace(/^#+\s*/gm, ' ')
  text = text.replace(/^[\-*+]\s+/gm, ' ')
  // collapse multiple whitespaces
  text = text.replace(/\s{2,}/g, ' ')
  text = text.trim()

  // chunk
  const chunkSize = 1200
  let chunkIndex = 0
  /**
   * 从 URL 生成友好的 slug
   * @param {string} u - 要处理的 URL
   * @returns {string|null} 生成的 slug，失败时返回 null
   * @description 
   * - 解析 URL 路径
   * - 去除文件扩展名
   * - 将路径分隔符替换为连字符
   * - 只保留 ASCII 字母、数字和连字符
   * - 压缩连续的连字符
   * - 限制长度为 64 个字符
   */
  function slugFromUrl(u){
    try{
      const parsed = new URL(u) // 解析 URL 为 URL 对象
      let p = parsed.pathname || '' // 获取 URL 路径部分
      
      // 处理目录路径，添加 index
      if (p.endsWith('/')) p = p + 'index'
      
      // 移除路径开头的斜杠
      if (p.startsWith('/')) p = p.slice(1)
      
      // 移除文件扩展名
      p = p.replace(/\.md$|\.html?$/i, '')
      
      // 将路径分隔符替换为连字符
      p = p.replace(/\//g, '-')
      
      // 只保留 ASCII 字母、数字和连字符
      p = p.replace(/[^a-zA-Z0-9-]/g, '-')
      
      // 压缩连续的连字符
      p = p.replace(/-+/g, '-')
      
      // 移除开头和结尾的连字符
      p = p.replace(/^-+|-+$/g, '')
      
      // 检查是否为空
      if (!p) return null
      
      // 限制长度并转为小写
      return p.toLowerCase().slice(0, 64)
    }catch(e){
      // URL 解析失败时返回 null
      return null
    }
  }

  /**
   * 从标题生成友好的 slug
   * @param {string} t - 要处理的标题
   * @returns {string} 生成的 slug
   * @description 
   * - 将标题转为小写
   * - 将空格和标点符号替换为连字符
   * - 只保留小写字母、数字和连字符
   * - 压缩连续的连字符
   * - 移除开头和结尾的连字符
   * - 限制长度为 64 个字符
   * - 为空时返回默认值 'page'
   */
  function slugFromTitle(t){
    if (!t) return 'page' // 标题为空时返回默认值
    let s = t.trim().toLowerCase() // 转为小写并去除首尾空白
    
    // 将空格替换为连字符
    s = s.replace(/\s+/g, '-')
    
    // 只保留小写字母、数字和连字符
    s = s.replace(/[^a-z0-9-]/g, '-')
    
    // 压缩连续的连字符
    s = s.replace(/-+/g, '-')
    
    // 移除开头和结尾的连字符
    s = s.replace(/^-+|-+$/g, '')
    
    // 再次检查是否为空
    if (!s) s = 'page'
    
    // 限制长度为 64 个字符
    return s.slice(0, 64)
  }
  for (let start = 0; start < text.length; start += chunkSize){
    const chunk = text.slice(start, start + chunkSize).trim()
    if (!chunk) continue
    const urlSlug = slugFromUrl(url)
    const titleSlug = slugFromTitle(title)
    const idBase = (urlSlug || titleSlug)
    const id = `${idBase}-${chunkIndex}`
    records.push({ id, url, title, text: chunk, chunk_index: chunkIndex, length: chunk.length })
    chunkIndex++
  }
}

const outStream = fs.createWriteStream(outPath, { flags: 'w' })
records.forEach(r => outStream.write(JSON.stringify(r) + '\n'))
outStream.end()
console.log('Wrote', records.length, 'records to', outPath)
