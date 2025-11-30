const fs = require('fs')
const path = require('path')

// 递归扫描 docs 目录下的 .md 文件，排除 .vitepress、public 等目录
const workspaceRoot = path.resolve(__dirname, '..')
const docsDir = path.join(workspaceRoot, 'docs')
const outPath = path.join(workspaceRoot, 'docs', 'public', 'sitemap.txt')
const baseUrl = process.env.SITE_BASE_URL || 'https://uviewpro.cn/'

function walk(dir, cb) {
  const files = fs.readdirSync(dir, { withFileTypes: true })
  for (const file of files) {
    const full = path.join(dir, file.name)
    if (file.isDirectory()) {
      // skip .vitepress and public
      if (['.vitepress', 'public'].includes(file.name)) continue
      walk(full, cb)
    } else if (file.isFile() && file.name.endsWith('.md')) {
      cb(full)
    }
  }
}

const urls = new Set()
walk(docsDir, (filePath) => {
  const rel = path.relative(docsDir, filePath).replace(/\\/g, '/')
  // compute url: docs/zh/components/button.md -> /zh/components/button.html
  let urlPath = rel.replace(/index\.md$/, '') // index.md => folder
  urlPath = urlPath.replace(/\.md$/, '.html')
  // ensure leading slash
  if (!urlPath.startsWith('/')) urlPath = '/' + urlPath
  // remove double slashes
  urlPath = urlPath.replace(/\/+/g, '/')
  // final url
  const final = new URL(urlPath, baseUrl).href
  urls.add(final)
})

// ensure root
urls.add(baseUrl)

// write sitemap.txt
const arr = Array.from(urls).sort()
fs.writeFileSync(outPath, arr.join('\n'))
console.log('Wrote sitemap txt:', outPath, 'count=', arr.length)

// generate sitemap.xml
const xmlOut = path.join(workspaceRoot, 'docs', 'public', 'sitemap.xml')
const lines = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
]
const today = new Date().toISOString()
for (const u of arr) {
  lines.push('  <url>')
  lines.push(`    <loc>${u}</loc>`)
  lines.push(`    <lastmod>${today}</lastmod>`)
  lines.push('  </url>')
}
lines.push('</urlset>')
fs.writeFileSync(xmlOut, lines.join('\n'))
console.log('Wrote sitemap xml:', xmlOut)
