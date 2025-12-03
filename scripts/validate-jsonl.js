/**
 * @file validate-jsonl.js
 * @description 验证 LLM 数据 JSONL 文件有效性的脚本
 * @author -  
 * @date -  
 * 
 * 架构定位：
 * - 该脚本属于项目的 LLM 数据质量保障模块，用于验证 JSONL 文件的格式和内容有效性
 * - 依赖于 llms-to-jsonl.js 或 llms-full-to-jsonl.js 生成的 JSONL 文件
 * - 为后续 LLM 训练或使用提供数据质量保障
 * 
 * 核心功能：
 * - 检查 JSONL 文件是否存在
 * - 逐行解析 JSON 记录，验证格式有效性
 * - 检查记录是否包含必要字段（id、url、text）
 * - 检查文本内容是否为空
 * - 生成验证统计信息和样本数据
 * - 输出验证结果，便于开发人员分析
 * 
 * 设计思路：
 * - 采用同步读取方式，确保所有行都被处理
 * - 使用 try-catch 处理 JSON 解析错误
 * - 统计多种类型的错误，便于问题定位
 * - 生成样本数据，便于人工检查
 * - 输出格式简洁明了，便于自动化处理
 * 
 * 使用场景：
 * - 生成 JSONL 文件后，验证数据质量
 * - 自动化构建流程中，作为数据质量检查的一部分
 * - 人工调试时，快速定位 JSONL 文件中的问题
 * - 定期检查生成的 LLM 数据，确保格式一致性
 */

// 导入依赖模块
const fs = require('fs')
const path = require('path')

// 文件路径配置
const workspaceRoot = path.resolve(__dirname, '..') // 项目根目录路径
const inPath = path.join(workspaceRoot, 'docs', 'public', 'llms.jsonl') // 要验证的 JSONL 文件路径

// 检查输入文件是否存在
if (!fs.existsSync(inPath)){
  console.error('input not found:', inPath)
  process.exit(1)
}

// 读取文件内容并按行分割，过滤空行
const lines = fs.readFileSync(inPath, 'utf8').split(/\r?\n/).filter(Boolean)

// 验证统计信息
let total = 0 // 总记录数
let emptyText = 0 // 文本内容为空的记录数
let badJson = 0 // JSON 格式错误或缺少必要字段的记录数
const sample = [] // 有效记录的样本数据（最多 5 条）

// 逐行验证 JSON 记录
for (const line of lines){
  total++ // 递增总记录数
  
  try{
    // 解析 JSON 记录
    const obj = JSON.parse(line)
    
    // 检查是否包含必要字段
    if (!obj.id || !obj.url || !obj.text) {
      badJson++ // 缺少必要字段，标记为错误
      continue
    }
    
    // 检查文本内容是否为空
    if (!obj.text.trim()) {
      emptyText++ // 文本为空，标记为错误
    }
    
    // 收集样本数据（最多 5 条）
    if (sample.length < 5) {
      sample.push({ 
        id: obj.id, 
        url: obj.url, 
        title: obj.title, 
        len: obj.text.length 
      })
    }
  }catch(e){
    // JSON 解析错误，标记为错误
    badJson++
  }
}

// 输出验证结果
console.log({ 
  total, // 总记录数
  emptyText, // 文本内容为空的记录数
  badJson, // JSON 格式错误或缺少必要字段的记录数
  sample // 有效记录的样本数据
})
