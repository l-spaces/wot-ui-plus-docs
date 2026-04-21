import fs from 'node:fs/promises'
import path from 'node:path'

const ROOT = process.cwd()
const DOCS_DIR = path.join(ROOT, 'docs', 'components', 'wot')
const SOURCE_DIR = 'D:\\IdeaSpace\\GitSpace\\wot-ui-plus\\src\\uni_modules\\wot-ui-plus\\components'
const SUBPAGES_DIR = 'D:\\IdeaSpace\\GitSpace\\wot-ui-plus\\src\\subPages'
const BASE_PROPS_FILE = path.join(SOURCE_DIR, 'common', 'props.ts')
const SOURCE_PACKAGE_FILE = 'D:\\IdeaSpace\\GitSpace\\wot-ui-plus\\package.json'

const argv = new Map(
  process.argv.slice(2).map((arg) => {
    const [key, value = ''] = arg.split('=')
    return [key, value]
  })
)

const onlyTarget = normalizeName(argv.get('--component') || '')

const GROUP_CONFIGS = [
  { primary: 'layout', aliases: ['row', 'col'], members: ['wd-row', 'wd-col'] },
  { primary: 'cell', aliases: ['cellGroup'], members: ['wd-cell', 'wd-cell-group'] },
  { primary: 'avatar', aliases: ['avatarGroup'], members: ['wd-avatar', 'wd-avatar-group'] },
  { primary: 'checkbox', aliases: ['checkboxGroup'], members: ['wd-checkbox', 'wd-checkbox-group'] },
  { primary: 'radio', aliases: ['radioGroup'], members: ['wd-radio', 'wd-radio-group'] },
  { primary: 'collapse', aliases: ['collapseItem'], members: ['wd-collapse', 'wd-collapse-item'] },
  { primary: 'grid', aliases: ['gridItem'], members: ['wd-grid', 'wd-grid-item'] },
  { primary: 'indexBar', aliases: ['indexAnchor'], members: ['wd-index-bar', 'wd-index-anchor'] },
  { primary: 'navbar', aliases: ['navbarCapsule'], members: ['wd-navbar', 'wd-navbar-capsule'] },
  { primary: 'sidebar', aliases: ['sidebarItem'], members: ['wd-sidebar', 'wd-sidebar-item'] },
  { primary: 'steps', aliases: ['step'], members: ['wd-steps', 'wd-step'] },
  { primary: 'swiper', aliases: ['swiperNav'], members: ['wd-swiper', 'wd-swiper-nav'] },
  { primary: 'tabbar', aliases: ['tabbarItem'], members: ['wd-tabbar', 'wd-tabbar-item'] },
  { primary: 'tabs', aliases: ['tab'], members: ['wd-tabs', 'wd-tab'] },
  { primary: 'table', aliases: ['tableCol'], members: ['wd-table', 'wd-table-col'] },
  { primary: 'dropMenu', aliases: ['dropMenuItem'], members: ['wd-drop-menu', 'wd-drop-menu-item'] },
  { primary: 'form', aliases: ['formItem'], members: ['wd-form', 'wd-form-item'] },
  { primary: 'sticky', aliases: ['stickyBox'], members: ['wd-sticky', 'wd-sticky-box'] },
  { primary: 'keyboard', aliases: ['numberKeyboard'], members: ['wd-keyboard', 'wd-number-keyboard'] },
  { primary: 'loading', aliases: ['loadingPage'], members: ['wd-loading', 'wd-loading-page'] }
]

const RESERVED_IDENTIFIERS = new Set([
  'const',
  'let',
  'var',
  'function',
  'return',
  'if',
  'else',
  'for',
  'while',
  'switch',
  'case',
  'break',
  'true',
  'false',
  'null',
  'undefined',
  'console',
  'log',
  'Math',
  'Date',
  'Promise'
])

function normalizeName(value) {
  return value.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
}

function kebabToCamel(value) {
  return value.replace(/-([a-zA-Z0-9])/g, (_, char) => char.toUpperCase())
}

function ensureTrailingNewline(text) {
  return text.endsWith('\n') ? text : `${text}\n`
}

function countPairs(text) {
  let depth = 0
  let quote = ''
  let escaped = false

  for (const char of text) {
    if (quote) {
      if (escaped) {
        escaped = false
        continue
      }
      if (char === '\\') {
        escaped = true
        continue
      }
      if (char === quote) {
        quote = ''
      }
      continue
    }

    if (char === '"' || char === "'" || char === '`') {
      quote = char
      continue
    }

    if (char === '{' || char === '(' || char === '[') depth += 1
    if (char === '}' || char === ')' || char === ']') depth -= 1
  }

  return depth
}

function extractBalancedBlock(text, startIndex, openChar = '{', closeChar = '}') {
  let depth = 0
  let quote = ''
  let escaped = false

  for (let index = startIndex; index < text.length; index += 1) {
    const char = text[index]

    if (quote) {
      if (escaped) {
        escaped = false
        continue
      }
      if (char === '\\') {
        escaped = true
        continue
      }
      if (char === quote) {
        quote = ''
      }
      continue
    }

    if (char === '"' || char === "'" || char === '`') {
      quote = char
      continue
    }

    if (char === openChar) {
      depth += 1
    } else if (char === closeChar) {
      depth -= 1
      if (depth === 0) {
        return text.slice(startIndex, index + 1)
      }
    }
  }

  return ''
}

function cleanComment(raw = '') {
  return raw
    .replace(/\/\*\*/g, '')
    .replace(/\*\//g, '')
    .split(/\r?\n/)
    .map((line) => line.replace(/^\s*\*\s?/, '').replace(/^\s*\/\/\s?/, '').trim())
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
}

async function readIfExists(filePath) {
  try {
    return await fs.readFile(filePath, 'utf8')
  } catch {
    return ''
  }
}

function findPropsObject(source) {
  const match = source.match(/export\s+const\s+(\w+Props)\s*=\s*\{/)
  if (!match || match.index == null) return ''
  const braceIndex = source.indexOf('{', match.index)
  return extractBalancedBlock(source, braceIndex)
}

function extractTypeAliases(source) {
  const aliases = new Map()
  const regexp = /export\s+type\s+(\w+)\s*=\s*([\s\S]*?);/g
  for (const match of source.matchAll(regexp)) {
    aliases.set(match[1], match[2].replace(/\s+/g, ' ').trim())
  }
  return aliases
}

function normalizeDefaultValue(raw) {
  const value = raw
    .replace(/\/\/.*$/gm, '')
    .replace(/#(?:if|endif|ifdef|ifndef).*$/gm, '')
    .replace(/,\s*$/g, '')
    .trim()

  if (!value) return '-'
  if (value === "''" || value === '""') return "''"
  if (value === '() => []') return '[]'
  if (value === '() => ({})') return '{}'
  if (value === '() => undefined') return 'undefined'
  return value
}

function renderType(baseType, aliasName, aliases) {
  if (!aliasName) return baseType
  const alias = aliases.get(aliasName)
  if (!alias) return baseType || aliasName

  const normalized = alias.replace(/\s+/g, ' ').trim()
  const parts = normalized.split('|').map((part) => part.trim())
  if (parts.length > 0 && parts.length <= 8 && parts.every((part) => /^'[^']+'$/.test(part) || /^"[^"]+"$/.test(part))) {
    return parts.join(' | ')
  }

  return aliasName
}

function extractGenericArgument(text, marker) {
  const markerIndex = text.indexOf(marker)
  if (markerIndex === -1) return ''

  let depth = 1
  let buffer = ''
  for (let index = markerIndex + marker.length; index < text.length; index += 1) {
    const char = text[index]
    if (char === '<') {
      depth += 1
      buffer += char
      continue
    }
    if (char === '>') {
      depth -= 1
      if (depth === 0) return buffer.trim()
      buffer += char
      continue
    }
    if (depth > 0) buffer += char
  }

  return ''
}

function inferExplicitType(sanitizedText) {
  const propType = extractGenericArgument(sanitizedText, 'PropType<')
  if (propType) {
    return propType.replace(/\s+/g, ' ').trim()
  }

  const arrayTypeMatch = sanitizedText.match(/type:\s*\[([^\]]+)\]/)
  if (arrayTypeMatch) {
    const mapped = arrayTypeMatch[1]
      .split(',')
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        if (/^String\b/.test(part)) return 'string'
        if (/^Number\b/.test(part)) return 'number'
        if (/^Boolean\b/.test(part)) return 'boolean'
        if (/^Array\b/.test(part)) return 'array'
        if (/^Object\b/.test(part)) return 'object'
        if (/^null\b/.test(part)) return 'null'
        return part
      })
    if (mapped.length) {
      return mapped.join(' | ')
    }
  }

  return ''
}

function parsePropDescriptor(name, descriptor, comment, aliases) {
  const sanitizedText = descriptor.replace(/\/\/.*$/gm, '').replace(/#(?:if|endif|ifdef|ifndef).*$/gm, '').trim()
  const commentText = cleanComment(comment)
  let baseType = 'unknown'
  let aliasName = ''
  let defaultValue = '-'
  let required = false

  if (/makeBooleanProp\(/.test(sanitizedText)) {
    baseType = 'boolean'
    defaultValue = normalizeDefaultValue(sanitizedText.match(/makeBooleanProp\(([\s\S]*?)\)/)?.[1] || 'false')
  } else if (/makeStringProp/.test(sanitizedText)) {
    baseType = 'string'
    aliasName = sanitizedText.match(/makeStringProp(?:<([^>]+)>)?\(/)?.[1]?.trim() || ''
    defaultValue = normalizeDefaultValue(sanitizedText.match(/makeStringProp(?:<[^>]+>)?\(([\s\S]*?)\)/)?.[1] || "''")
  } else if (/makeNumberProp\(/.test(sanitizedText)) {
    baseType = 'number'
    defaultValue = normalizeDefaultValue(sanitizedText.match(/makeNumberProp\(([\s\S]*?)\)/)?.[1] || '0')
  } else if (/makeNumericProp\(/.test(sanitizedText) || /type:\s*numericProp/.test(sanitizedText)) {
    baseType = 'number | string'
    defaultValue = normalizeDefaultValue(sanitizedText.match(/makeNumericProp\(([\s\S]*?)\)/)?.[1] || "''")
  } else if (/makeArrayProp/.test(sanitizedText)) {
    baseType = 'array'
    defaultValue = '[]'
  } else if (/makeUnArrayProp/.test(sanitizedText)) {
    baseType = 'array'
    defaultValue = 'undefined'
  } else if (/makeFunctionProp/.test(sanitizedText)) {
    baseType = 'function'
    defaultValue = '() => null'
  } else if (/^String\b/.test(sanitizedText) || /type:\s*String/.test(sanitizedText)) {
    baseType = 'string'
    aliasName = sanitizedText.match(/PropType<([^>]+)>/)?.[1]?.trim() || ''
  } else if (/^Number\b/.test(sanitizedText) || /type:\s*Number/.test(sanitizedText)) {
    baseType = 'number'
  } else if (/^Boolean\b/.test(sanitizedText) || /type:\s*Boolean/.test(sanitizedText)) {
    baseType = 'boolean'
  } else if (/^Array\b/.test(sanitizedText) || /type:\s*Array/.test(sanitizedText)) {
    baseType = 'array'
  } else if (/^Object\b/.test(sanitizedText) || /type:\s*Object/.test(sanitizedText)) {
    baseType = 'object'
  } else if (/makeRequiredProp/.test(sanitizedText)) {
    required = true
    if (/String/.test(sanitizedText)) baseType = 'string'
    if (/Number/.test(sanitizedText)) baseType = 'number'
    if (/Boolean/.test(sanitizedText)) baseType = 'boolean'
    if (/Array/.test(sanitizedText)) baseType = 'array'
    if (/Object/.test(sanitizedText)) baseType = 'object'
  }

  const defaultMatch = sanitizedText.match(/default:\s*([^\n,}]+(?:\([^)]*\))?)/)
  if (defaultMatch) {
    defaultValue = normalizeDefaultValue(defaultMatch[1])
  }

  if (/required:\s*true/.test(sanitizedText)) {
    required = true
  }

  const explicitType = inferExplicitType(sanitizedText)
  if (explicitType) {
    baseType = explicitType
    aliasName = explicitType
  }

  return {
    name,
    type: renderType(baseType, aliasName, aliases),
    defaultValue,
    required,
    description: commentText || `${name} 的对外配置项。`
  }
}

function parsePropsFromSource(source, aliases, baseProps) {
  if (!source) return []
  const objectSource = findPropsObject(source)
  if (!objectSource) return []

  const body = objectSource.slice(1, -1)
  const lines = body.split(/\r?\n/)
  const props = []
  let pendingComment = ''

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]
    const trimmed = line.trim()

    if (!trimmed) continue

    if (trimmed.startsWith('/**')) {
      const block = [line]
      while (index + 1 < lines.length && !lines[index].includes('*/')) {
        index += 1
        block.push(lines[index])
        if (lines[index].includes('*/')) break
      }
      pendingComment = block.join('\n')
      continue
    }

    if (trimmed.startsWith('//')) {
      pendingComment = pendingComment ? `${pendingComment}\n${line}` : line
      continue
    }

    if (trimmed.startsWith('...baseProps')) {
      props.push(...baseProps)
      pendingComment = ''
      continue
    }

    const propertyMatch = trimmed.match(/^([A-Za-z_$][\w$]*)\s*:\s*(.*)$/)
    if (!propertyMatch) {
      pendingComment = ''
      continue
    }

    const name = propertyMatch[1]
    const entryLines = [propertyMatch[2]]
    let depth = countPairs(propertyMatch[2])

    while (index + 1 < lines.length) {
      const lastLine = entryLines[entryLines.length - 1].trim()
      if (depth <= 0 && /,\s*$/.test(lastLine)) break
      index += 1
      entryLines.push(lines[index])
      depth += countPairs(lines[index])
    }

    props.push(parsePropDescriptor(name, entryLines.join('\n'), pendingComment, aliases))
    pendingComment = ''
  }

  const trailingPropNames = new Set(['customStyle', 'customClass'])
  return [
    ...props.filter((prop) => !trailingPropNames.has(prop.name)),
    ...props.filter((prop) => trailingPropNames.has(prop.name))
  ]
}

function findMainVueFile(componentDir) {
  return path.join(componentDir, `${path.basename(componentDir)}.vue`)
}

function extractTagContent(source, tagName, attributesPattern = '') {
  const regexp = new RegExp(`<${tagName}${attributesPattern}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i')
  const match = source.match(regexp)
  return match ? match[1].trim() : ''
}

function parseEmitCalls(source) {
  const events = []
  const seen = new Set()
  const regexp = /emit\(\s*['"]([^'"]+)['"]/g

  for (const match of source.matchAll(regexp)) {
    if (match.index == null) continue
    const name = match[1]
    if (seen.has(name)) continue
    seen.add(name)

    const start = source.indexOf('(', match.index)
    const callSource = extractBalancedBlock(source, start, '(', ')')
    const commaIndex = callSource.indexOf(',')
    const payload =
      commaIndex === -1
        ? '-'
        : callSource
            .slice(commaIndex + 1, -1)
            .replace(/\s+/g, ' ')
            .trim()

    events.push({
      name,
      payload: payload || '-'
    })
  }

  return events
}

function inferEventType(payload) {
  if (!payload || payload === '-') return '-'
  if (payload === 'event' || payload === 'e') return 'Event'
  if (payload === 'event.detail' || payload === 'detail') return 'object'
  if (/^\{/.test(payload)) return 'object'
  if (/^\[/.test(payload)) return 'array'
  if (/^(true|false)$/.test(payload)) return 'boolean'
  if (/^\d+$/.test(payload)) return 'number'
  if (/['"]/.test(payload)) return 'string'
  if (/temp|list|data|value|options|columns|item/i.test(payload)) return 'object | array | primitive'
  return 'unknown'
}

function inferEventTrigger(name) {
  if (name.startsWith('update:')) {
    return '组件内部状态更新后触发，用于与外部 `v-model` 同步。'
  }

  const map = {
    click: '用户点击组件可交互区域时触发。',
    change: '组件值、选中状态或内部结果发生变化时触发。',
    input: '输入值实时变化时触发。',
    focus: '组件内输入控件获得焦点时触发。',
    blur: '组件内输入控件失去焦点时触发。',
    confirm: '用户确认当前操作时触发。',
    cancel: '用户取消当前操作时触发。',
    open: '组件进入打开状态时触发。',
    close: '组件执行关闭逻辑时触发。',
    opened: '打开动画完成后触发。',
    closed: '关闭动画完成后触发。',
    clear: '执行清空操作时触发。',
    search: '执行搜索动作时触发。',
    error: '内部流程失败或出现异常时触发。',
    finish: '流程完成时触发。',
    start: '流程开始时触发。',
    resize: '监听到尺寸变化时触发。'
  }

  return map[name] || `组件对外派发 \`${name}\` 事件时触发。`
}

function inferEventReturn(payload) {
  if (!payload || payload === '-') return '无额外返回值。'
  if (payload === 'event' || payload === 'e') return '返回原生事件对象，按运行平台的事件结构读取。'
  if (payload === 'event.detail' || payload === 'detail') return '返回原生事件的 `detail` 字段。'
  if (/^\{/.test(payload)) return '返回对象结构，字段以源码 `emit` 的实际组装结果为准。'
  return `返回事件参数：\`${payload}\`。`
}

function parseSlots(source) {
  const slots = []
  const seen = new Set()
  const regexp = /<slot(?:\s+name="([^"]+)")?[^>]*>/g

  for (const match of source.matchAll(regexp)) {
    const name = match[1] || 'default'
    if (seen.has(name)) continue
    seen.add(name)
    slots.push({
      name,
      scope: '-',
      scenario: inferSlotScenario(name)
    })
  }

  return slots
}

function inferSlotScenario(name) {
  const map = {
    default: '用于填充组件主体内容。',
    prefix: '用于扩展前置区域内容。',
    suffix: '用于扩展后置区域内容。',
    header: '用于定制头部展示内容。',
    footer: '用于定制底部展示内容。',
    title: '用于覆盖默认标题展示。',
    icon: '用于自定义图标区域。',
    label: '用于自定义标签文本或说明区域。'
  }

  return map[name] || `用于扩展 \`${name}\` 区域的自定义内容。`
}

function parseExposeMethods(source) {
  const match = source.match(/defineExpose(?:<[^>]+>)?\(\s*\{/)
  if (!match || match.index == null) return []

  const start = source.indexOf('{', match.index)
  const block = extractBalancedBlock(source, start)
  if (!block) return []

  const methods = []
  const seen = new Set()

  for (const raw of block.slice(1, -1).split(',')) {
    const candidate = raw.trim()
    if (!candidate) continue
    const name = candidate.split(':')[0].trim()
    if (!name || seen.has(name)) continue
    seen.add(name)
    methods.push({
      name,
      description: `通过组件实例调用 \`${name}\`，适用于需要命令式控制组件状态的场景。`
    })
  }

  return methods
}

function readTitleFromDoc(source, fallback) {
  return source.match(/^#\s+(.+)$/m)?.[1]?.trim() || fallback
}

function readDemoFolderFromDoc(source, fallbackStem) {
  const raw = source.match(/<demo-model\s+url="\/subPages\/([^/]+)\/Index"/)?.[1]
  return raw || fallbackStem
}

function normalizeBlockIndent(block) {
  const lines = block.split(/\r?\n/)
  return lines
    .map((line) => line.trimEnd())
    .join('\n')
    .trim()
}

function isSimpleIdentifier(value) {
  return /^[A-Za-z_$][\w$]*$/.test(value) && !['true', 'false', 'null', 'undefined'].includes(value)
}

function collectSimpleIdentifiers(template) {
  const identifiers = {
    models: new Set(),
    bindings: new Set(),
    handlers: new Set(),
    locals: new Set()
  }

  for (const match of template.matchAll(/v-for="([^"]+)"/g)) {
    const expression = match[1]
    const parts = expression.split(/\s+in\s+|\s+of\s+/)
    const left = parts[0]?.trim()
    const right = parts[1]?.trim()
    if (!left) continue
    const normalized = left.replace(/^\(|\)$/g, '')
    for (const name of normalized.split(',').map((item) => item.trim()).filter(Boolean)) {
      if (isSimpleIdentifier(name)) identifiers.locals.add(name)
    }
    if (right && isSimpleIdentifier(right) && !identifiers.locals.has(right)) {
      identifiers.bindings.add(right)
    }
  }

  for (const match of template.matchAll(/v-model(?::[\w-]+)?="([A-Za-z_$][\w$]*)"/g)) {
    if (isSimpleIdentifier(match[1]) && !identifiers.locals.has(match[1])) identifiers.models.add(match[1])
  }

  for (const match of template.matchAll(/:[\w-]+="([A-Za-z_$][\w$]*)"/g)) {
    if (isSimpleIdentifier(match[1]) && !identifiers.locals.has(match[1])) identifiers.bindings.add(match[1])
  }

  for (const match of template.matchAll(/@[\w:-]+="([A-Za-z_$][\w$]*)"/g)) {
    if (isSimpleIdentifier(match[1]) && !identifiers.locals.has(match[1])) identifiers.handlers.add(match[1])
  }

  return identifiers
}

function findTopLevelFunction(script, name) {
  const regexp = new RegExp(`function\\s+${name}\\s*\\(`)
  const match = script.match(regexp)
  if (!match || match.index == null) return ''
  const braceIndex = script.indexOf('{', match.index)
  const block = extractBalancedBlock(script, braceIndex)
  return block ? normalizeBlockIndent(`${script.slice(match.index, braceIndex)}${block}`) : ''
}

function findTopLevelAssignment(script, name) {
  const regexp = new RegExp(`(?:const|let|var)\\s+${name}\\s*=`)
  const match = script.match(regexp)
  if (!match || match.index == null) return ''
  return sliceTopLevelStatement(script, match.index)
}

function findTopLevelDestructuredAssignment(script, name) {
  const regexp = new RegExp(`(?:const|let|var)\\s*\\{[^}]*\\b${name}\\b[^}]*\\}\\s*=`)
  const match = script.match(regexp)
  if (!match || match.index == null) return ''
  return sliceTopLevelStatement(script, match.index)
}

function sliceTopLevelStatement(script, start) {
  let quote = ''
  let escaped = false
  let depth = 0

  for (let index = start; index < script.length; index += 1) {
    const char = script[index]

    if (quote) {
      if (escaped) {
        escaped = false
        continue
      }
      if (char === '\\') {
        escaped = true
        continue
      }
      if (char === quote) quote = ''
      continue
    }

    if (char === '"' || char === "'" || char === '`') {
      quote = char
      continue
    }

    if (char === '{' || char === '(' || char === '[') depth += 1
    if (char === '}' || char === ')' || char === ']') depth -= 1

    if (char === ';' && depth <= 0) {
      return normalizeBlockIndent(script.slice(start, index + 1))
    }

    if (char === '\n' && depth <= 0) {
      const rest = script.slice(index + 1)
      if (/^\s*(?:const|let|var|function)\b/.test(rest)) {
        return normalizeBlockIndent(script.slice(start, index))
      }
    }
  }

  return normalizeBlockIndent(script.slice(start))
}

function resolveDefinition(script, name) {
  return findTopLevelFunction(script, name) || findTopLevelAssignment(script, name) || findTopLevelDestructuredAssignment(script, name)
}

function buildImportMap(script) {
  const map = new Map()
  const lines = script
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith('import '))

  for (const line of lines) {
    const namedMatch = line.match(/\{([^}]+)\}/)
    if (namedMatch) {
      const names = namedMatch[1]
        .split(',')
        .map((name) => name.trim().split(/\s+as\s+/i).pop())
        .filter(Boolean)
      for (const name of names) {
        map.set(name, line)
      }
    }

    const defaultMatch = line.match(/^import\s+([A-Za-z_$][\w$]*)\s+from/)
    if (defaultMatch) {
      map.set(defaultMatch[1], line)
    }
  }

  return map
}

function extractSnippetDependencies(snippet) {
  const deps = new Set()
  for (const match of snippet.matchAll(/\b([A-Za-z_$][\w$]*)\b/g)) {
    const name = match[1]
    if (!RESERVED_IDENTIFIERS.has(name)) deps.add(name)
  }
  return deps
}

function buildFallbackValue(name) {
  if (/(actions|options|columns|items|list|data|menus|tabs|steps|records|dates|files|images|panels)/i.test(name)) {
    return `const ${name} = ref([])`
  }
  if (/(show|visible|open|checked|disabled|loading|active|readonly|expand|fold)/i.test(name)) {
    return `const ${name} = ref(false)`
  }
  if (/(count|index|current|page|height|width|size|num|step|rate|progress)/i.test(name)) {
    return `const ${name} = ref(0)`
  }
  return `const ${name} = ref('')`
}

function buildFallbackHandler(name, identifiers) {
  const visibilityName = [...identifiers.models, ...identifiers.bindings].find((id) => /(show|visible|open)/i.test(id))
  if (visibilityName && /(show|open)/i.test(name)) {
    return `function ${name}() {\n  ${visibilityName}.value = true\n}`
  }
  if (visibilityName && /(close|hide|cancel)/i.test(name)) {
    return `function ${name}() {\n  ${visibilityName}.value = false\n}`
  }
  return `function ${name}(payload: any) {\n  console.log('${name}', payload)\n}`
}

function shouldUseFallbackHandler(snippet, identifiers, importMap) {
  const allowedLocalNames = new Set([...identifiers.models, ...identifiers.bindings, ...identifiers.handlers])
  const deps = extractSnippetDependencies(snippet)

  for (const dep of deps) {
    if (allowedLocalNames.has(dep)) continue
    if (importMap.has(dep) && /\bfrom 'vue'/.test(importMap.get(dep))) continue
    if (RESERVED_IDENTIFIERS.has(dep)) continue
    if (dep === 'ref' || dep === 'reactive' || dep === 'computed') continue
    return true
  }

  return false
}

function buildExampleScript(scriptSetup, template) {
  const identifiers = collectSimpleIdentifiers(template)
  const importMap = buildImportMap(scriptSetup)
  const snippets = []
  const importedLines = new Set()
  const needsVueImports = new Set()
  const queue = [...new Set([...identifiers.bindings, ...identifiers.models, ...identifiers.handlers])]
  const processed = new Set()

  while (queue.length) {
    const name = queue.shift()
    if (!name || processed.has(name)) continue
    processed.add(name)

    const found = resolveDefinition(scriptSetup, name)
    if (!found) {
      if (identifiers.handlers.has(name)) {
        snippets.push(buildFallbackHandler(name, identifiers))
      } else {
        snippets.push(buildFallbackValue(name))
        needsVueImports.add('ref')
      }
      continue
    }

    if (identifiers.handlers.has(name) && shouldUseFallbackHandler(found, identifiers, importMap)) {
      snippets.push(buildFallbackHandler(name, identifiers))
      continue
    }

    snippets.push(found)
    for (const dep of extractSnippetDependencies(found)) {
      if (importMap.has(dep)) {
        importedLines.add(importMap.get(dep))
      } else if (!processed.has(dep) && resolveDefinition(scriptSetup, dep)) {
        queue.push(dep)
      }
    }
  }

  for (const snippet of snippets) {
    if (/\bref\(/.test(snippet) && ![...importedLines].some((line) => /\bref\b/.test(line))) needsVueImports.add('ref')
    if (/\breactive\(/.test(snippet) && ![...importedLines].some((line) => /\breactive\b/.test(line))) needsVueImports.add('reactive')
    if (/\bcomputed\(/.test(snippet) && ![...importedLines].some((line) => /\bcomputed\b/.test(line))) needsVueImports.add('computed')
  }

  const vueImports = new Set([...needsVueImports])
  const otherImports = []

  for (const line of importedLines) {
    if (/\bfrom 'vue'/.test(line)) {
      const names = line.match(/\{([^}]+)\}/)?.[1]
      if (names) {
        for (const name of names.split(',').map((item) => item.trim().split(/\s+as\s+/i).pop()).filter(Boolean)) {
          vueImports.add(name)
        }
      }
      const defaultImport = line.match(/^import\s+([A-Za-z_$][\w$]*)\s+from 'vue'/)?.[1]
      if (defaultImport) {
        otherImports.push(`import ${defaultImport} from 'vue'`)
      }
    } else {
      otherImports.push(line)
    }
  }

  const sections = []
  if (vueImports.size) {
    sections.push(`import { ${[...vueImports].sort().join(', ')} } from 'vue'`)
  }
  sections.push(...otherImports)

  const body = [...new Set(snippets)].filter(Boolean).join('\n\n').trim()
  const content = `${sections.filter(Boolean).join('\n')}${sections.length && body ? '\n\n' : ''}${body}`.trim()
  return content || '// 本示例无需额外脚本逻辑。'
}

function extractDemoExamples(demoSource, memberTags) {
  if (!demoSource) return []

  const scriptSetup = extractTagContent(demoSource, 'script', '[^>]*setup')
  const styleBlock = extractTagContent(demoSource, 'style')
  const blocks = [...demoSource.matchAll(/<demo-block[^>]*title="([^"]+)"[^>]*>([\s\S]*?)<\/demo-block>/g)]
  const tagPatterns = memberTags.map((tag) => new RegExp(`<${tag}\\b`, 'i'))

  const matched = blocks.filter((block) => tagPatterns.some((pattern) => pattern.test(block[2])))
  const examples = []
  const seenTitles = new Set()

  for (const block of matched) {
    const title = block[1].trim() || `示例 ${examples.length + 1}`
    if (seenTitles.has(title)) continue
    seenTitles.add(title)

    const template = normalizeBlockIndent(block[2].trim())
    examples.push({
      title,
      template,
      script: buildExampleScript(scriptSetup, template),
      style: styleBlock.trim() || '/* 本示例无需额外样式。 */'
    })

    if (examples.length >= 6) break
  }

  return examples
}

function buildFallbackExamples(memberTags) {
  const primaryTag = memberTags[0]
  return [
    {
      title: '基础用法',
      template: `<${primaryTag}></${primaryTag}>`,
      script: '// 本示例无需额外脚本逻辑。',
      style: '/* 本示例无需额外样式。 */'
    },
    {
      title: '受控状态示例',
      template: `<${primaryTag} v-model="value"></${primaryTag}>`,
      script: `import { ref } from 'vue'\n\nconst value = ref('')`,
      style: '/* 本示例无需额外样式。 */'
    },
    {
      title: '样式扩展示例',
      template: `<${primaryTag} custom-class="demo-block" custom-style="margin-top: 12px;"></${primaryTag}>`,
      script: '// 本示例无需额外脚本逻辑。',
      style: `.demo-block {\n  width: 100%;\n}`
    }
  ]
}

function escapeTableCell(value) {
  return String(value).replace(/\|/g, '\\|').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function renderPropsTable(props) {
  if (!props.length) {
    return '当前源码中未声明额外 Props。\n'
  }

  const lines = [
    '| 属性名称 | 数据类型 | 默认值 | 是否必填 | 说明 |',
    '| --- | --- | --- | --- | --- |'
  ]

  for (const prop of props) {
    lines.push(
      `| ${escapeTableCell(prop.name)} | ${escapeTableCell(prop.type)} | ${escapeTableCell(prop.defaultValue)} | ${prop.required ? '是' : '否'} | ${escapeTableCell(prop.description)} |`
    )
  }

  return `${lines.join('\n')}\n`
}

function renderEventsTable(events) {
  if (!events.length) {
    return '当前源码中未显式对外派发自定义事件。\n'
  }

  const lines = [
    '| 事件名称 | 触发条件 | 参数类型 | 返回值说明 |',
    '| --- | --- | --- | --- |'
  ]

  for (const event of events) {
    lines.push(
      `| ${escapeTableCell(event.name)} | ${escapeTableCell(inferEventTrigger(event.name))} | ${escapeTableCell(inferEventType(event.payload))} | ${escapeTableCell(inferEventReturn(event.payload))} |`
    )
  }

  return `${lines.join('\n')}\n`
}

function renderSlotsTable(slots) {
  if (!slots.length) {
    return '当前源码中未声明插槽。\n'
  }

  const lines = [
    '| 插槽名称 | 作用域参数 | 使用场景 |',
    '| --- | --- | --- |'
  ]

  for (const slot of slots) {
    lines.push(`| ${escapeTableCell(slot.name)} | ${escapeTableCell(slot.scope)} | ${escapeTableCell(slot.scenario)} |`)
  }

  return `${lines.join('\n')}\n`
}

function renderMethodsTable(methods) {
  if (!methods.length) {
    return '当前源码中未通过 `defineExpose` 暴露实例方法。\n'
  }

  const lines = [
    '| 方法名称 | 说明 |',
    '| --- | --- |'
  ]

  for (const method of methods) {
    lines.push(`| ${escapeTableCell(method.name)} | ${escapeTableCell(method.description)} |`)
  }

  return `${lines.join('\n')}\n`
}

function inferCategory(name) {
  const normalized = normalizeName(name)

  if (/(input|textarea|search|picker|select|form|checkbox|radio|switch|slider|upload|password|codeinput|numberkeyboard|keyboard|signature)/.test(normalized)) {
    return 'form'
  }
  if (/(popup|popover|overlay|toast|notify|messagebox|tooltip|actionsheet|loading|status|swipe|collapse|dropmenu|tour|curtain|floatingpanel)/.test(normalized)) {
    return 'feedback'
  }
  if (/(calendar|date|datetime|count|step|progress|circle|timeline)/.test(normalized)) {
    return 'time'
  }
  if (/(layout|row|col|grid|cell|navbar|tabbar|tabs|sidebar|indexbar|sticky|pagination|backtop)/.test(normalized)) {
    return 'navigation'
  }
  return 'display'
}

function inferScenarioText(primaryName) {
  const category = inferCategory(primaryName)
  const map = {
    form: '适用于表单录入、条件筛选、状态选择、提交校验等交互场景。',
    feedback: '适用于弹层反馈、消息提示、临时交互、状态确认等界面场景。',
    time: '适用于日期时间处理、进度展示、倒计时与流程状态表达等场景。',
    navigation: '适用于页面布局组织、分区导航、内容切换与信息编排等场景。',
    display: '适用于信息展示、内容承载、媒体呈现与视觉装饰等场景。'
  }
  return map[category]
}

function buildFamilyOverview(group, sourceVersion) {
  const memberTags = group.members.join('`、`')
  const first = group.members[0]
  return [
    `- **功能定位：** \`${memberTags}\` 组成同一组件族，用于在 uni-app 项目中完成与组件名称对应的界面能力封装，并通过统一的 Props、事件与插槽约定对外提供可复用接口。`,
    `- **适用场景：** ${inferScenarioText(first)}`
  ].join('\n')
}

function inferRoleLine(tag, group) {
  if (tag.endsWith('-group')) {
    return `\`${tag}\` 负责管理子项集合、统一透传公共配置，并处理分组级别的状态同步。`
  }
  if (tag.endsWith('-item')) {
    return `\`${tag}\` 作为父组件的子节点使用，主要承载单项内容与局部交互。`
  }
  if (tag.endsWith('-col')) {
    return `\`${tag}\` 用于承载布局列配置，需要配合同组父组件共同完成页面编排。`
  }
  if (tag.endsWith('-tab')) {
    return `\`${tag}\` 用于描述单个页签面板，通常由父级页签容器统一调度。`
  }
  if (tag.endsWith('-anchor')) {
    return `\`${tag}\` 用于声明索引锚点内容，需要与索引容器协同工作。`
  }
  if (tag.endsWith('-capsule')) {
    return `\`${tag}\` 提供胶囊式导航变体，适用于更紧凑的顶部切换场景。`
  }
  if (tag.endsWith('-box')) {
    return `\`${tag}\` 负责提供额外的容器层或布局边界，便于父组件实现稳定的交互定位。`
  }
  if (group.members.length > 1) {
    return `\`${tag}\` 是该组件族的主要入口，负责承载核心渲染、状态控制与对外交互能力。`
  }
  return `\`${tag}\` 提供独立的组件能力封装，可直接在页面中引入使用。`
}

function buildCapabilityLines(meta) {
  const lines = [inferRoleLine(meta.tag, meta.group)]

  if (meta.props.some((prop) => prop.name === 'modelValue') || meta.events.some((event) => event.name === 'update:modelValue')) {
    lines.push('支持受控状态同步，可配合 `v-model` 或 `update:modelValue` 完成外部数据驱动。')
  }
  if (meta.props.some((prop) => ['disabled', 'readonly', 'loading'].includes(prop.name))) {
    lines.push('提供常见状态类属性控制交互边界，便于在业务流程中管理禁用、只读或加载状态。')
  }
  if (meta.slots.length) {
    lines.push(`支持 ${meta.slots.map((slot) => `\`${slot.name}\``).join('、')} 插槽扩展，用于增强内容承载与结构定制能力。`)
  }
  if (meta.methods.length) {
    lines.push(`暴露 ${meta.methods.map((method) => `\`${method.name}\``).join('、')} 实例方法，适合复杂交互中的命令式控制。`)
  }
  if (meta.events.length) {
    lines.push(`通过 ${meta.events.map((event) => `\`${event.name}\``).join('、')} 等事件向外反馈用户操作与内部状态变化。`)
  }

  return lines
}

function describeExample(title) {
  if (/基础|基本/.test(title)) return '效果说明：展示组件的最小接入方式与默认渲染效果。'
  if (/禁用/.test(title)) return '效果说明：展示组件在禁用态下的交互边界与视觉反馈。'
  if (/加载/.test(title)) return '效果说明：展示组件在异步处理中对状态与反馈的处理方式。'
  if (/插槽|自定义/.test(title)) return '效果说明：展示如何通过插槽或样式扩展组件内容结构。'
  if (/弹|浮层|popup|抽屉/i.test(title)) return '效果说明：展示组件在弹层或临时承载容器中的使用方式。'
  if (/表单/.test(title)) return '效果说明：展示组件与表单状态、校验或数据同步的配合方式。'
  return `效果说明：演示“${title}”业务场景下的组件配置与交互方式。`
}

function renderExamples(examples) {
  return examples
    .map((example, index) => {
      const scriptBlock = example.script && example.script.trim() ? example.script.trim() : '// 本示例无需额外脚本逻辑。'
      const styleBlock = example.style && example.style.trim() ? example.style.trim() : '/* 本示例无需额外样式。 */'
      return [
        `### 示例 ${index + 1}：${example.title}`,
        '',
        describeExample(example.title),
        '',
        '```vue',
        '<template>',
        indent(example.template.trim(), 2),
        '</template>',
        '',
        '<script setup lang="ts">',
        scriptBlock,
        '</script>',
        '',
        '<style scoped lang="scss">',
        styleBlock,
        '</style>',
        '```'
      ].join('\n')
    })
    .join('\n\n')
}

function pickExamples(examples, memberTags) {
  if (examples.length <= 3) return examples

  const selected = []
  const selectedTitles = new Set()

  const pushExample = (example) => {
    if (!example || selectedTitles.has(example.title)) return
    selected.push(example)
    selectedTitles.add(example.title)
  }

  pushExample(examples[0])

  for (const tag of memberTags.slice(1)) {
    pushExample(examples.find((example) => new RegExp(`<${tag}\\b`, 'i').test(example.template)))
  }

  for (const example of examples) {
    pushExample(example)
    if (selected.length >= 3) break
  }

  return selected.slice(0, 3)
}

function indent(text, spaces) {
  const prefix = ' '.repeat(spaces)
  return text
    .split(/\r?\n/)
    .map((line) => `${prefix}${line}`)
    .join('\n')
}

function buildPrimaryDoc(group, title, demoFolder, memberMetas, groupExamples, sourceVersion) {
  const memberList = memberMetas
    .map((meta) => `- \`${meta.tag}\`：${readableTitle(meta.title, meta.tag)}`)
    .join('\n')

  const sections = [
    `# ${title}`,
    '',
    demoFolder ? `<demo-model url="/subPages/${demoFolder}/Index"></demo-model>` : '',
    '',
    '## 组件概述',
    '',
    buildFamilyOverview(group, sourceVersion),
    '',
    '## 组件成员',
    '',
    memberList,
    '',
    '## 核心功能说明',
    '',
    memberMetas
      .map((meta) => {
        const lines = buildCapabilityLines(meta).map((line) => `- ${line}`).join('\n')
        return `### ${readableTitle(meta.title, meta.tag)}\n\n${lines}`
      })
      .join('\n\n'),
    '',
    '## API 说明',
    '',
    memberMetas
      .map((meta) =>
        [
          `### ${readableTitle(meta.title, meta.tag)}（\`${meta.tag}\`）`,
          '',
          '#### 属性列表',
          '',
          renderPropsTable(meta.props).trimEnd(),
          '',
          '#### 事件说明',
          '',
          renderEventsTable(meta.events).trimEnd(),
          '',
          '#### 插槽说明',
          '',
          renderSlotsTable(meta.slots).trimEnd(),
          '',
          '#### 实例方法',
          '',
          renderMethodsTable(meta.methods).trimEnd()
        ].join('\n')
      )
      .join('\n\n'),
    '',
    '## 完整使用示例',
    '',
    renderExamples(groupExamples),
    '',
    '## 使用建议',
    '',
    '- 建议优先使用源码中已经验证过的属性组合与事件流，避免依赖未在当前版本源码中体现的隐式行为。',
    '- 当组件族包含父子或分组关系时，请优先按照文档中的配套组件组合使用，以保证状态同步和样式继承行为一致。',
    '- 若需覆盖样式，优先使用 `customStyle` 与 `customClass`，并结合当前项目的主题变量与平台差异进行验证。'
  ]

  return ensureTrailingNewline(sections.filter(Boolean).join('\n'))
}

function buildAliasDoc(title, aliasTag, primaryTitle, primaryStem) {
  return ensureTrailingNewline(
    [
      `# ${title}`,
      '',
      '## 文档归并说明',
      '',
      `\`${aliasTag}\` 已并入 [${primaryTitle}](./${primaryStem}.md) 文档统一维护。`,
      '',
      `请在主文档中查阅 \`${aliasTag}\` 对应章节，获取属性、事件、插槽、实例方法与完整示例。`
    ].join('\n')
  )
}

function readableTitle(title, fallbackTag) {
  return title || fallbackTag
}

function getComponentStem(tag) {
  return kebabToCamel(tag.replace(/^wd-/, ''))
}

function buildGroupList(componentTags) {
  const used = new Set()
  const groups = []

  for (const config of GROUP_CONFIGS) {
    if (config.members.every((tag) => componentTags.includes(tag))) {
      groups.push(config)
      config.members.forEach((tag) => used.add(tag))
    }
  }

  for (const tag of componentTags) {
    if (used.has(tag)) continue
    groups.push({
      primary: getComponentStem(tag),
      aliases: [],
      members: [tag]
    })
  }

  return groups
}

async function buildBaseProps() {
  const source = await readIfExists(BASE_PROPS_FILE)
  return parsePropsFromSource(source, extractTypeAliases(source), [])
}

async function buildDocMap() {
  const entries = await fs.readdir(DOCS_DIR, { withFileTypes: true })
  const map = new Map()

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.md')) continue
    const fullPath = path.join(DOCS_DIR, entry.name)
    map.set(normalizeName(entry.name.replace(/\.md$/i, '')), fullPath)
  }

  return map
}

async function listComponentDirs() {
  const entries = await fs.readdir(SOURCE_DIR, { withFileTypes: true })
  return entries
    .filter((entry) => entry.isDirectory() && /^wd-/.test(entry.name) && !['wd-abc'].includes(entry.name))
    .map((entry) => path.join(SOURCE_DIR, entry.name))
}

async function readDocMeta(docPath, fallbackStem, fallbackTitle) {
  const source = await readIfExists(docPath)
  return {
    title: readTitleFromDoc(source, fallbackTitle),
    demoFolder: readDemoFolderFromDoc(source, fallbackStem)
  }
}

async function collectExamples(demoFolders, memberTags) {
  const examples = []
  const seenTitles = new Set()

  for (const folder of demoFolders) {
    const demoSource = await readIfExists(path.join(SUBPAGES_DIR, folder, 'Index.vue'))
    for (const example of extractDemoExamples(demoSource, memberTags)) {
      if (seenTitles.has(example.title)) continue
      seenTitles.add(example.title)
      examples.push(example)
      if (examples.length >= 6) return examples
    }
  }

  return examples
}

async function buildMemberMeta(tag, group, baseProps, docMap) {
  const componentDir = path.join(SOURCE_DIR, tag)
  const stem = getComponentStem(tag)
  const docPath = docMap.get(normalizeName(stem))
  const docMeta = await readDocMeta(docPath, stem, tag)
  const vuePath = findMainVueFile(componentDir)
  const typePath = (await readIfExists(path.join(componentDir, 'types.ts')))
    ? path.join(componentDir, 'types.ts')
    : (await readIfExists(path.join(componentDir, 'type.ts')))
      ? path.join(componentDir, 'type.ts')
      : ''

  const typeSource = typePath ? await readIfExists(typePath) : ''
  const vueSource = await readIfExists(vuePath)
  const aliases = extractTypeAliases(typeSource)

  return {
    tag,
    stem,
    title: docMeta.title,
    demoFolder: docMeta.demoFolder,
    props: typeSource ? parsePropsFromSource(typeSource, aliases, baseProps) : [],
    events: parseEmitCalls(vueSource),
    slots: parseSlots(vueSource),
    methods: parseExposeMethods(vueSource),
    group,
    examples: []
  }
}

async function main() {
  const baseProps = await buildBaseProps()
  const docMap = await buildDocMap()
  const componentDirs = await listComponentDirs()
  const componentTags = componentDirs.map((dir) => path.basename(dir))
  const sourcePkg = JSON.parse(await fs.readFile(SOURCE_PACKAGE_FILE, 'utf8'))
  const sourceVersion = sourcePkg.version || '当前版本'
  const groups = buildGroupList(componentTags)
  const touched = []

  for (const group of groups) {
    const primaryKey = normalizeName(group.primary)
    if (onlyTarget && primaryKey !== onlyTarget && !group.members.some((tag) => normalizeName(tag) === onlyTarget || normalizeName(getComponentStem(tag)) === onlyTarget)) {
      continue
    }

    const primaryDocPath = docMap.get(primaryKey)
    if (!primaryDocPath) continue

    const primaryDocMeta = await readDocMeta(primaryDocPath, group.primary, group.members[0])
    const memberMetas = []

    for (const tag of group.members) {
      memberMetas.push(await buildMemberMeta(tag, group, baseProps, docMap))
    }

    const demoFolders = [...new Set(memberMetas.map((meta) => meta.demoFolder).filter(Boolean))]
    const collectedExamples = await collectExamples(demoFolders, group.members)
    const groupExamples = pickExamples(collectedExamples.length >= 3 ? collectedExamples : buildFallbackExamples(group.members), group.members)

    const primaryContent = buildPrimaryDoc(group, primaryDocMeta.title, primaryDocMeta.demoFolder, memberMetas, groupExamples, sourceVersion)
    const existingPrimary = await readIfExists(primaryDocPath)
    if (existingPrimary !== primaryContent) {
      await fs.writeFile(primaryDocPath, primaryContent, 'utf8')
      touched.push(path.relative(ROOT, primaryDocPath))
    }

    for (const aliasStem of group.aliases) {
      const aliasDocPath = docMap.get(normalizeName(aliasStem))
      if (!aliasDocPath) continue

      const aliasTag = group.members.find((tag) => normalizeName(getComponentStem(tag)) === normalizeName(aliasStem))
      if (!aliasTag) continue

      const aliasMeta = await readDocMeta(aliasDocPath, aliasStem, aliasTag)
      const aliasContent = buildAliasDoc(aliasMeta.title, aliasTag, primaryDocMeta.title, group.primary)
      const existingAlias = await readIfExists(aliasDocPath)
      if (existingAlias !== aliasContent) {
        await fs.writeFile(aliasDocPath, aliasContent, 'utf8')
        touched.push(path.relative(ROOT, aliasDocPath))
      }
    }
  }

  if (!touched.length) {
    console.log('No component docs were updated.')
    return
  }

  console.log(`Updated ${touched.length} component docs:`)
  for (const file of touched) {
    console.log(`- ${file}`)
  }
}

await main()
