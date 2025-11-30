const fs = require('fs')
const path = require('path')

const workspaceRoot = path.resolve(__dirname, '..')
const inPath = path.join(workspaceRoot, 'docs', 'public', 'llms.jsonl')

if (!fs.existsSync(inPath)){
  console.error('input not found:', inPath)
  process.exit(1)
}

const lines = fs.readFileSync(inPath, 'utf8').split(/\r?\n/).filter(Boolean)
let total = 0
let emptyText = 0
let badJson = 0
const sample = []
for (const line of lines){
  total++
  try{
    const obj = JSON.parse(line)
    if (!obj.id || !obj.url || !obj.text) {
      badJson++
      continue
    }
    if (!obj.text.trim()) emptyText++
    if (sample.length < 5) sample.push({ id: obj.id, url: obj.url, title: obj.title, len: obj.text.length })
  }catch(e){
    badJson++
  }
}

console.log({ total, emptyText, badJson, sample })
