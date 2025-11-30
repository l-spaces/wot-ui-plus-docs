/**
 * 环境变量配置
 */
import { readFileSync } from 'fs'
import { resolve } from 'path'

// 解析 .env 文件
function parseEnvFile(filePath: string): Record<string, string> {
  try {
    const content = readFileSync(filePath, 'utf-8')
    const env: Record<string, string> = {}
    
    content.split('\n').forEach(line => {
      line = line.trim()
      if (line && !line.startsWith('#')) {
        const [key, ...valueParts] = line.split('=')
        if (key && valueParts.length > 0) {
          env[key.trim()] = valueParts.join('=').trim()
        }
      }
    })
    
    return env
  } catch (error) {
    console.warn(`Failed to read env file: ${filePath}`, error)
    return {}
  }
}

// 获取环境变量
export function getEnvVars() {
  const isDev = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'dev'
  const isProd = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod'
  
  // 确定环境
  const env = isDev ? 'development' : isProd ? 'production' : 'development'
  
  // 加载对应的环境变量文件
  const envFile = isProd ? '.env.production' : '.env'
  const envPath = resolve(process.cwd(), envFile)
  
  console.log(`Loading environment: ${env}, file: ${envFile}`)
  
  const envVars = parseEnvFile(envPath)
  
  // 合并 process.env 和文件中的环境变量
  const allEnvVars = {
    ...process.env,
    ...envVars
  }
  
  return allEnvVars
}

// 获取特定的环境变量
export function getEnvVar(key: string, defaultValue?: string): string {
  const envVars = getEnvVars()
  return envVars[key] || defaultValue || ''
}
