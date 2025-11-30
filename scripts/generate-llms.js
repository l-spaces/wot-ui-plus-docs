const fs = require('fs')
const path = require('path')
const axios = require('axios')

// 说明：
// - 从 docs/public/sitemap.txt 读取 URL 列表
// - 将每个 URL 转换为相对路径，尝试找到本地对应的 .md 文件（优先 docs/、docs/zh/）
// - 提取 Markdown 文件中的纯文本（去掉 front-matter、代码块、HTML）
// - 将每个页面提取的纯文本追加到 docs/public/llms.txt，页面之间用分隔符

const workspaceRoot = path.resolve(__dirname, '..')
const sitemapPath = path.join(workspaceRoot, 'docs', 'public', 'sitemap.txt')
const outPath = path.join(workspaceRoot, 'docs', 'public', 'llms.txt')

function urlToLocalPath(url) {
  // 将 https://uviewpro.cn/zh/components/button.html -> docs/zh/components/button.md
  try {
    const u = new URL(url)
    // 去掉开头的 /
    let p = u.pathname
    if (p.endsWith('/')) p = p + 'index'
    // remove leading /
    if (p.startsWith('/')) p = p.slice(1)
    // replace .html with .md
    p = p.replace(/\.html$/, '.md')

    const candidates = [
      path.join(workspaceRoot, 'docs', p),
      path.join(workspaceRoot, 'docs', 'zh', p),
      path.join(workspaceRoot, 'docs', p.replace(/^zh\//, '')),
    ]
    return candidates
  } catch (e) {
    return []
  }
}

function stripMarkdown(md) {
  // 简单去除 front-matter
  md = md.replace(/^---[\s\S]*?---\s*/, '')
  // 去除代码块
  md = md.replace(/```[\s\S]*?```/g, '')
  // 去除 inline code
  md = md.replace(/`[^`]*`/g, '')
  // 去除图片和链接语法，保留文字
  md = md.replace(/!\[.*?\]\(.*?\)/g, '')
  md = md.replace(/\[(.*?)\]\(.*?\)/g, '$1')
  // 去除 HTML 标签
  md = md.replace(/<[^>]+>/g, '')
  // 多个空白换成一个
  md = md.replace(/\s{2,}/g, ' ')
  return md.trim()
}

(async function main(){
  if (!fs.existsSync(sitemapPath)){
    console.error('sitemap.txt not found:', sitemapPath)
    process.exit(1)
  }
  const data = fs.readFileSync(sitemapPath, 'utf8')
  const urls = data.split(/\r?\n/).map(l=>l.trim()).filter(Boolean)

  const stats = { total: urls.length, found: 0, missing: 0 }
  const outStream = fs.createWriteStream(outPath, { flags: 'w' })
  for (const url of urls){
    const candidates = urlToLocalPath(url)
    let foundFile = null
    for (const c of candidates){
      if (fs.existsSync(c)){
        foundFile = c
        break
      }
    }
    if (!foundFile){
      // 尝试远程抓取 HTML 并提取文本（降级方案）
      try {
        const res = await axios.get(url, { timeout: 5000 })
        const html = res.data
        // strip tags
        const text = html.replace(/<script[\s\S]*?<\/script>/g, '')
          .replace(/<style[\s\S]*?<\/style>/g, '')
          .replace(/<[^>]+>/g, ' ')
          .replace(/\s{2,}/g, ' ')
          .trim()
        outStream.write('\n===== ' + url + ' =====\n')
        outStream.write(text + '\n')
        stats.found++
        continue
      } catch (e){
        stats.missing++
        console.warn('missing local file and failed remote:', url)
        continue
      }
    }

    const md = fs.readFileSync(foundFile, 'utf8')
    const text = stripMarkdown(md)
    outStream.write('\n===== ' + url + ' =====\n')
    outStream.write(text + '\n')
    stats.found++
  }
  outStream.end()
  console.log('Done. Stats:', stats)
})()
