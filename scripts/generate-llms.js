/**
 * @file generate-llms.js
 * @description 生成 LLM（大语言模型）训练/提示数据的脚本
 * @author -  
 * @date -  
 * 
 * 架构定位：
 * - 该脚本属于项目的构建/工具链模块，用于生成供 LLM 使用的训练或提示数据
 * - 与项目文档系统紧密集成，依赖于 sitemap.txt 和 Markdown 文档
 * 
 * 核心功能：
 * - 从 sitemap.txt 读取网站 URL 列表
 * - 将 URL 转换为本地 Markdown 文件路径
 * - 提取 Markdown 文件中的纯文本内容（去除格式标记）
 * - 将提取的文本写入到 llms.txt 文件，供 LLM 使用
 * 
 * 设计思路：
 * - 采用本地文件优先策略，提高数据处理效率
 * - 实现远程降级方案，确保尽可能多的页面数据被采集
 * - 使用流写入方式，避免大文件内存占用问题
 * - 详细的统计信息，便于监控数据生成情况
 * 
 * 使用场景：
 * - 项目文档更新后，生成最新的 LLM 训练数据
 * - 为 AI 助手提供项目文档的文本语料
 * - 用于构建基于项目文档的问答系统
 */

// 导入依赖模块
const fs = require('fs')
const path = require('path')
const axios = require('axios')

// 文件路径配置
const workspaceRoot = path.resolve(__dirname, '..') // 项目根目录路径
const sitemapPath = path.join(workspaceRoot, 'docs', 'public', 'sitemap.txt') // 网站地图文件路径
const outPath = path.join(workspaceRoot, 'docs', 'public', 'llms.txt') // LLM 数据输出文件路径

/**
 * 将 URL 转换为本地 Markdown 文件路径的候选列表
 * @param {string} url - 要转换的网站 URL
 * @returns {string[]} 本地 Markdown 文件路径候选列表
 * @description 
 * - 处理逻辑：URL -> URL 对象 -> 路径提取 -> 格式转换 -> 候选路径生成
 * - 支持多种路径格式转换，提高本地文件匹配成功率
 * - 捕获 URL 解析异常，确保脚本稳定性
 */
function urlToLocalPath(url) {
  try {
    const u = new URL(url) // 解析 URL 为 URL 对象
    let p = u.pathname // 获取 URL 路径部分
    
    // 处理根路径或目录路径，转换为 index 文件名
    if (p.endsWith('/')) p = p + 'index'
    
    // 移除路径开头的斜杠
    if (p.startsWith('/')) p = p.slice(1)
    
    // 将 .html 扩展名替换为 .md
    p = p.replace(/\.html$/, '.md')
    
    // 生成可能的本地文件路径候选列表
    const candidates = [
      path.join(workspaceRoot, 'docs', p), // 主路径候选（如 docs/zh/components/button.md）
      path.join(workspaceRoot, 'docs', 'components', p), // 组件路径候选（如 docs/components/zh/components/button.md）
      path.join(workspaceRoot, 'docs', p.replace(/^components\//, '')), // 去除组件前缀候选（如 docs/zh/button.md）
    ]
    
    return candidates
  } catch (e) {
    // URL 解析失败时返回空数组
    return []
  }
}

/**
 * 从 Markdown 文本中提取纯文本内容
 * @param {string} md - Markdown 格式的文本
 * @returns {string} 提取的纯文本内容
 * @description 
 * - 去除 front-matter（文档元数据）
 * - 移除代码块和行内代码
 * - 提取链接文本，移除链接标记
 * - 移除图片标记
 * - 去除 HTML 标签
 * - 压缩空白字符，提高文本质量
 */
function stripMarkdown(md) {
  // 移除 Markdown 文档顶部的 front-matter
  md = md.replace(/^---[\s\S]*?---\s*/, '')
  
  // 移除代码块（``` 包裹的内容）
  md = md.replace(/```[\s\S]*?```/g, '')
  
  // 移除行内代码（` 包裹的内容）
  md = md.replace(/`[^`]*`/g, '')
  
  // 移除图片标记，保留图片描述
  md = md.replace(/!\[.*?\]\(.*?\)/g, '')
  
  // 提取链接文本，移除链接 URL
  md = md.replace(/\[(.*?)\]\(.*?\)/g, '$1')
  
  // 移除 HTML 标签
  md = md.replace(/<[^>]+>/g, '')
  
  // 将多个连续空白字符压缩为单个空格
  md = md.replace(/\s{2,}/g, ' ')
  
  // 去除首尾空白
  return md.trim()
}

/**
 * 主函数 - 执行 LLM 数据生成流程
 * @async
 * @description 
 * 1. 检查 sitemap.txt 文件是否存在
 * 2. 读取并解析 URL 列表
 * 3. 遍历每个 URL，尝试本地文件匹配
 * 4. 本地文件不存在时，尝试远程抓取
 * 5. 提取纯文本内容并写入输出文件
 * 6. 输出统计信息
 */
(async function main(){
  // 检查 sitemap.txt 文件是否存在
  if (!fs.existsSync(sitemapPath)){
    console.error('sitemap.txt not found:', sitemapPath)
    process.exit(1)
  }
  
  // 读取并解析 URL 列表
  const data = fs.readFileSync(sitemapPath, 'utf8')
  const urls = data.split(/\r?\n/).map(l=>l.trim()).filter(Boolean)
  
  // 统计信息对象：跟踪处理进度和结果
  const stats = { 
    total: urls.length, // 总 URL 数量
    found: 0, // 成功处理的 URL 数量
    missing: 0 // 处理失败的 URL 数量
  }
  
  // 创建输出文件流，使用 'w' 模式覆盖原有文件
  const outStream = fs.createWriteStream(outPath, { flags: 'w' })
  
  // 遍历所有 URL
  for (const url of urls){
    // 获取本地文件路径候选列表
    const candidates = urlToLocalPath(url)
    let foundFile = null
    
    // 遍历候选路径，查找存在的本地文件
    for (const c of candidates){
      if (fs.existsSync(c)){
        foundFile = c
        break
      }
    }
    
    // 本地文件不存在时，尝试远程抓取
    if (!foundFile){
      try {
        // 发送 HTTP 请求获取远程 HTML 内容，设置 5 秒超时
        const res = await axios.get(url, { timeout: 5000 })
        const html = res.data
        
        // 从 HTML 中提取纯文本
        const text = html
          .replace(/<script[\s\S]*?<\/script>/g, '') // 移除脚本标签
          .replace(/<style[\s\S]*?<\/style>/g, '') // 移除样式标签
          .replace(/<[^>]+>/g, ' ') // 移除所有 HTML 标签
          .replace(/\s{2,}/g, ' ') // 压缩空白字符
          .trim() // 去除首尾空白
        
        // 写入 URL 分隔符和提取的文本
        outStream.write('\n===== ' + url + ' =====\n')
        outStream.write(text + '\n')
        
        // 更新统计信息
        stats.found++
        continue
      } catch (e){
        // 远程抓取失败，更新统计信息
        stats.missing++
        console.warn('missing local file and failed remote:', url)
        continue
      }
    }
    
    // 本地文件存在，读取并处理 Markdown 内容
    const md = fs.readFileSync(foundFile, 'utf8')
    const text = stripMarkdown(md)
    
    // 写入 URL 分隔符和提取的文本
    outStream.write('\n===== ' + url + ' =====\n')
    outStream.write(text + '\n')
    
    // 更新统计信息
    stats.found++
  }
  
  // 关闭输出流
  outStream.end()
  
  // 输出处理结果统计
  console.log('Done. Stats:', stats)
})()
