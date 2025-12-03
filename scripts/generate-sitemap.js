/**
 * @file generate-sitemap.js
 * @description 生成网站地图文件的脚本
 * @author -  
 * @date -  
 * 
 * 架构定位：
 * - 该脚本属于项目的构建/工具链模块，用于生成网站的 sitemap.txt 和 sitemap.xml 文件
 * - 与项目文档系统紧密集成，扫描 docs 目录下的 Markdown 文件生成网站地图
 * - 为 SEO 优化和 LLM 数据生成提供基础 URL 列表
 * 
 * 核心功能：
 * - 递归扫描 docs 目录下的所有 Markdown 文件
 * - 排除指定目录（.vitepress、public）
 * - 将 Markdown 文件路径转换为对应的网站 URL
 * - 生成纯文本格式的网站地图（sitemap.txt）
 * - 生成 XML 格式的网站地图（sitemap.xml）
 * - 支持通过环境变量自定义网站基础 URL
 * - 确保根 URL 被包含在网站地图中
 * 
 * 设计思路：
 * - 采用递归遍历方式，确保所有 Markdown 文件被处理
 * - 使用 Set 数据结构避免重复 URL
 * - 支持通过环境变量自定义网站基础 URL
 * - 生成两种格式的网站地图，满足不同需求
 * - 输出详细的处理结果，便于监控和调试
 * - 错误处理完善，确保脚本稳定性
 * 
 * 使用场景：
 * - 项目文档更新后，重新生成网站地图
 * - 为 SEO 优化提供完整的网站 URL 列表
 * - 作为 LLM 数据生成脚本的输入源
 * - 自动化构建流程中的一部分
 */

// 导入依赖模块
const fs = require('fs')
const path = require('path')

// 文件路径和配置
const workspaceRoot = path.resolve(__dirname, '..') // 项目根目录路径
const docsDir = path.join(workspaceRoot, 'docs') // 文档目录路径
const outPath = path.join(workspaceRoot, 'docs', 'public', 'sitemap.txt') // sitemap.txt 输出路径
const baseUrl = process.env.SITE_BASE_URL || 'https://uviewpro.cn/' // 网站基础 URL，支持环境变量配置

/**
 * 递归遍历目录，处理指定类型的文件
 * @param {string} dir - 要遍历的目录路径
 * @param {Function} cb - 文件处理回调函数，接收文件路径作为参数
 * @description 
 * - 递归扫描目录下的所有文件和子目录
 * - 跳过指定目录（.vitepress、public）
 * - 只处理 .md 后缀的 Markdown 文件
 * - 对每个符合条件的文件调用回调函数
 * @returns {void} - 无返回值
 */
function walk(dir, cb) {
  // 读取目录内容，包含文件类型信息
  const files = fs.readdirSync(dir, { withFileTypes: true })
  
  // 遍历目录中的每个文件/目录
  for (const file of files) {
    const full = path.join(dir, file.name) // 完整文件/目录路径
    
    if (file.isDirectory()) {
      // 跳过指定目录
      if (['.vitepress', 'public'].includes(file.name)) continue
      // 递归处理子目录
      walk(full, cb)
    } else if (file.isFile() && file.name.endsWith('.md')) {
      // 处理 Markdown 文件，调用回调函数
      cb(full)
    }
  }
}

// 存储生成的 URL 集合，使用 Set 避免重复 URL
const urls = new Set()

// 遍历文档目录，生成 URL 列表
walk(docsDir, (filePath) => {
  // 获取文件相对于文档目录的路径，并将反斜杠转换为正斜杠
  const rel = path.relative(docsDir, filePath).replace(/\\/g, '/')
  
  // 将 Markdown 文件路径转换为网站 URL 路径
  // 示例：docs/zh/components/button.md -> /zh/components/button.html
  let urlPath = rel.replace(/index\.md$/, '') // index.md 转换为目录路径
  urlPath = urlPath.replace(/\.md$/, '.html') // 将 .md 扩展名替换为 .html
  
  // 确保 URL 路径以斜杠开头
  if (!urlPath.startsWith('/')) urlPath = '/' + urlPath
  
  // 移除重复的斜杠，确保 URL 格式正确
  urlPath = urlPath.replace(/\/+/g, '/')
  
  // 构建完整的 URL
  const final = new URL(urlPath, baseUrl).href
  
  // 将 URL 添加到集合中，自动去重
  urls.add(final)
})

// 确保根 URL 被包含在网站地图中
urls.add(baseUrl)

// 生成并写入 sitemap.txt 文件
const arr = Array.from(urls).sort() // 将 Set 转换为数组并排序
fs.writeFileSync(outPath, arr.join('\n')) // 写入文件
console.log('Wrote sitemap txt:', outPath, 'count=', arr.length) // 输出处理结果

// 生成并写入 sitemap.xml 文件
const xmlOut = path.join(workspaceRoot, 'docs', 'public', 'sitemap.xml') // sitemap.xml 输出路径
const lines = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
]
const today = new Date().toISOString() // 获取当前日期时间的 ISO 格式

// 生成 XML 格式的 URL 列表
for (const u of arr) {
  lines.push('  <url>')
  lines.push(`    <loc>${u}</loc>`) // URL 地址
  lines.push(`    <lastmod>${today}</lastmod>`) // 最后修改时间
  lines.push('  </url>')
}

lines.push('</urlset>')
fs.writeFileSync(xmlOut, lines.join('\n')) // 写入 XML 文件
console.log('Wrote sitemap xml:', xmlOut) // 输出处理结果
