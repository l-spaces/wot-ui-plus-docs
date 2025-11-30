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
  // 尝试从 URL 生成更友好的 slug（优先）。回退到标题 slug。
  function slugFromUrl(u){
    try{
      const parsed = new URL(u)
      let p = parsed.pathname || ''
      if (p.endsWith('/')) p = p + 'index'
      if (p.startsWith('/')) p = p.slice(1)
      // remove extension
      p = p.replace(/\.md$|\.html?$/i, '')
      // replace slashes with hyphens
      p = p.replace(/\//g, '-')
      // keep only ascii letters, numbers and hyphens
      p = p.replace(/[^a-zA-Z0-9-]/g, '-')
      p = p.replace(/-+/g, '-')
      p = p.replace(/^-+|-+$/g, '')
      if (!p) return null
      return p.toLowerCase().slice(0, 64)
    }catch(e){
      return null
    }
  }

  function slugFromTitle(t){
    if (!t) return 'page'
    let s = t.trim().toLowerCase()
    // replace whitespace and punctuation with hyphen
    s = s.replace(/\s+/g, '-')
    s = s.replace(/[^a-z0-9-]/g, '-')
    s = s.replace(/-+/g, '-')
    s = s.replace(/^-+|-+$/g, '')
    if (!s) s = 'page'
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
