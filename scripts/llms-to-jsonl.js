const fs = require('fs')
const path = require('path')
const readline = require('readline')

// 将 docs/public/llms.txt 转为结构化 JSONL
// 预期 llms.txt 格式为：\n===== <url> =====\n<text>\n===== <url> =====\n...

const workspaceRoot = path.resolve(__dirname, '..')
const inPath = path.join(workspaceRoot, 'docs', 'public', 'llms.txt')
const outPath = path.join(workspaceRoot, 'docs', 'public', 'llms.jsonl')

if (!fs.existsSync(inPath)){
  console.error('input not found:', inPath)
  process.exit(1)
}

const content = fs.readFileSync(inPath, 'utf8')
const parts = content.split(/\n=====\s*(https?:\/\/[^\s]+)\s*=====\n/)
// split 会产生 ['', url1, text1, url2, text2, ...]

const records = []
for (let i = 1; i < parts.length; i += 2){
  const url = parts[i]
  const text = (parts[i+1] || '').trim()
  if (!url) continue
  // 简单 title 推断：使用 URL 的最后一段
  const seg = url.replace(/\/$/, '').split('/')
  const last = seg[seg.length-1] || 'index'
  const title = decodeURIComponent(last.replace(/\.html$/, ''))

  // 将 text 按字符切分为较小块（中文约 1000 字符作为默认），也可以改为 tokenizer
  const chunkSize = 1200
  let chunkIndex = 0
  for (let start = 0; start < text.length; start += chunkSize){
    const chunk = text.slice(start, start + chunkSize).trim()
    if (!chunk) continue
    const id = `${title.replace(/[^a-zA-Z0-9_-]/g, '_')}-${chunkIndex}`
    records.push({ id, url, title, text: chunk, chunk_index: chunkIndex, length: chunk.length })
    chunkIndex++
  }
}

// 写出 JSONL
const outStream = fs.createWriteStream(outPath, { flags: 'w' })
records.forEach(r => outStream.write(JSON.stringify(r, null, 0) + '\n'))
outStream.end()
console.log('Wrote', records.length, 'records to', outPath)
