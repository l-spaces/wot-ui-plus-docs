/**
 * @file llms-to-jsonl.js
 * @description 将纯文本格式的 LLM 数据转换为结构化 JSONL 格式的脚本
 * @author -  
 * @date -  
 * 
 * 架构定位：
 * - 该脚本属于项目的 LLM 数据处理流程，用于将 generate-llms.js 生成的纯文本 LLM 数据转换为结构化 JSONL 格式
 * - 依赖于 generate-llms.js 生成的 llms.txt 文件
 * - 输出的 JSONL 文件可直接用于 LLM 训练或提示
 * 
 * 核心功能：
 * - 从指定路径读取 llms.txt 文件
 * - 解析文件中的 URL 和纯文本内容
 * - 从 URL 推断页面标题
 * - 将文本分块，生成结构化的 JSON 记录
 * - 将记录写入 JSONL 文件
 * 
 * 设计思路：
 * - 采用正则表达式解析文件结构
 * - 从 URL 推断标题，简化处理流程
 * - 支持文本分块，控制每个 JSON 记录的大小
 * - 输出格式符合 LLM 训练数据要求
 * - 错误处理完善，确保脚本稳定性
 * 
 * 使用场景：
 * - 项目文档更新后，生成结构化的 LLM 训练数据
 * - 为 AI 助手提供格式化的文档语料
 * - 用于构建基于项目文档的问答系统
 */

// 导入依赖模块
const fs = require('fs')
const path = require('path')
const readline = require('readline')

// 文件路径配置
const workspaceRoot = path.resolve(__dirname, '..') // 项目根目录路径
const inPath = path.join(workspaceRoot, 'docs', 'public', 'llms.txt') // 输入文件路径
const outPath = path.join(workspaceRoot, 'docs', 'public', 'llms.jsonl') // 输出文件路径

// 检查输入文件是否存在
if (!fs.existsSync(inPath)){
  console.error('input not found:', inPath)
  process.exit(1)
}

// 读取输入文件内容
const content = fs.readFileSync(inPath, 'utf8')

// 解析文件内容：使用正则表达式分割 URL 和文本
// 预期文件格式：\n===== <url> =====\n<text>\n===== <url> =====\n...
const parts = content.split(/\n=====\s*(https?:\/\/[^\s]+)\s*=====\n/)
// 分割结果格式：['', url1, text1, url2, text2, ...]

// 存储生成的 JSON 记录
const records = []

// 遍历解析结果，生成 JSON 记录
for (let i = 1; i < parts.length; i += 2){
  const url = parts[i] // 当前记录的 URL
  const text = (parts[i+1] || '').trim() // 当前记录的纯文本内容
  
  // 跳过空 URL
  if (!url) continue
  
  // 从 URL 推断页面标题
  const seg = url.replace(/\/$/, '').split('/') // 移除末尾斜杠并分割 URL
  const last = seg[seg.length-1] || 'index' // 获取 URL 最后一段，默认为 'index'
  const title = decodeURIComponent(last.replace(/\.html$/, '')) // 解码并去除 .html 扩展名

  // 文本分块配置
  const chunkSize = 1200 // 每个分块的字符数（中文约 1000 字符）
  let chunkIndex = 0 // 分块索引
  
  // 将文本分块，生成多个 JSON 记录
  for (let start = 0; start < text.length; start += chunkSize){
    const chunk = text.slice(start, start + chunkSize).trim() // 获取当前分块
    
    // 跳过空分块
    if (!chunk) continue
    
    // 生成记录 ID：标题转义后加索引
    const id = `${title.replace(/[^a-zA-Z0-9_-]/g, '_')}-${chunkIndex}`
    
    // 添加 JSON 记录
    records.push({ 
      id, // 记录唯一标识
      url, // 页面 URL
      title, // 页面标题
      text: chunk, // 分块文本
      chunk_index: chunkIndex, // 分块索引
      length: chunk.length // 分块长度
    })
    
    // 递增分块索引
    chunkIndex++
  }
}

// 写出 JSONL 文件
const outStream = fs.createWriteStream(outPath, { flags: 'w' }) // 创建输出流，覆盖写入
records.forEach(r => outStream.write(JSON.stringify(r, null, 0) + '\n')) // 写入每条记录
outStream.end() // 关闭输出流

// 输出处理结果
console.log('Wrote', records.length, 'records to', outPath)
