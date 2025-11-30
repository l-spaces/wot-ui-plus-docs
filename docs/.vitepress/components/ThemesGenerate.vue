/**
 * 主题色生成器
 */
<template>
  <h2>主题色</h2>
  <el-alert style="margin: 20px 0" v-if="lastTime" :title="lastTime" type="success" effect="dark"></el-alert>
  <p>请为下列色票选择颜色，支持可选的暗黑模式色值。支持智能生成颜色值，随机主题颜色等。</p>
  <!-- <div class="global-actions">
    <el-button type="primary" plain size="small" @click="randomizeBrandColors">随机主题色</el-button>
  </div> -->

  <div class="colors-grid">
    <div class="colors-toolbar">
      <span class="colors-toolbar__label">色票分组</span>
      <div class="colors-toolbar__actions">
        <el-button size="small" link @click="expandAllGroups">全部展开</el-button>
        <el-divider direction="vertical" />
        <el-button size="small" link @click="collapseAllGroups">全部折叠</el-button>
      </div>
    </div>
    <div v-for="section in colorSections" :key="section.id" class="color-section">
      <div class="color-section__header">
        <div>
          <h3>{{ section.label }}</h3>
          <p v-if="section.description">{{ section.description }}</p>
        </div>
      </div>
      <div v-for="group in section.groups" :key="group.id" class="color-group">
        <div class="color-group__header">
          <h4>{{ group.label }}</h4>
          <div class="color-group__actions">
            <el-popover placement="top-end" title="随机生成当前所有主题色" :width="210" trigger="hover" effect="dark">
              <template #reference>
                <el-button v-if="!collapsedGroups[group.id] && group.id === 'theme'" link size="small" type="success"
                  @click="randomizeBrandColors('theme')">
                  随机主题
                </el-button>
              </template>
            </el-popover>

            <el-popover placement="top-end" title="选定首色，其他三色智能生成" :width="240" trigger="hover" effect="dark">
              <template #reference>
                <el-button v-if="!collapsedGroups[group.id] && toneGroupIds.has(group.id)" link size="small"
                  type="primary" @click="generateGroupVariants(group.id)">
                  智能生成
                </el-button>
              </template>
            </el-popover>
            <el-button link size="small" @click="toggleGroup(group.id)">
              {{ collapsedGroups[group.id] ? '展开' : '折叠' }}
            </el-button>
          </div>
        </div>
        <transition name="fade">
          <el-row v-if="!collapsedGroups[group.id]" :gutter="8">
            <el-col v-for="key in group.keys" :key="key" :span="5" :xs="12">
              <div class="color-item">
                <div class="color-label">{{ labelMap[key] || key }}</div>
                <color-picker v-model="themeMeta.color[key]" :bg-color="themeMeta.color[key]" :name="key"
                  :value="themeMeta.color[key]"></color-picker>
              </div>
            </el-col>
          </el-row>
        </transition>
      </div>
    </div>
  </div>

  <!-- 预览面板 -->
  <div class="preview-panel">
    <h3>实时预览</h3>
    <div class="preview-area" :style="previewStyle">
      <div class="preview-swatches">
        <div v-for="swatch in previewSwatches" :key="swatch.key" class="preview-swatch">
          <span class="preview-swatch__dot" :style="{ background: swatch.value }"></span>
          <span class="preview-swatch__label">{{ swatch.label }}</span>
        </div>
      </div>
      <div class="preview-top">
        <button class="preview-btn primary">主按钮</button>
        <button class="preview-btn ghost">次按钮</button>
      </div>
      <div class="preview-card">
        <h4>卡片标题</h4>
        <p>这是一段示例内容，用于展示文字色与背景色的搭配。</p>
        <div class="preview-chip-group">
          <span class="preview-chip success">成功</span>
          <span class="preview-chip warning">警告</span>
          <span class="preview-chip info">信息</span>
        </div>
      </div>
    </div>
  </div>

  <el-divider />
  <el-row style="margin-bottom:12px">
    <el-col :span="24">
      <div class="dark-toggle">
        <el-switch v-model="enableDark" active-text="启用暗黑色值（可选）"></el-switch>
        <el-button size="small" type="primary" link :disabled="!enableDark" @click="refreshDarkColors">
          刷新暗黑色值
        </el-button>
      </div>
    </el-col>
  </el-row>
  <div style="margin: 8px 0 12px; color: #888; font-size:13px">
    提示：开启暗黑色值后，系统会基于亮色方案智能生成暗黑初始色值，您可以逐项覆盖。
  </div>

  <div v-if="enableDark" class="dark-section">
    <p>暗黑色值（可选，默认由亮色智能生成）：</p>
    <div v-for="section in colorSections" :key="'dark-' + section.id" class="color-section color-section--dark">
      <div class="color-section__header">
        <h4>dark - {{ section.label }}</h4>
      </div>
      <div v-for="group in section.groups" :key="'dark-group-' + group.id" class="color-group color-group--compact">
        <div class="color-group__header">
          <h5>{{ group.label }}</h5>
        </div>
        <el-row :gutter="8">
          <el-col v-for="key in group.keys" :key="'d-' + key" :span="5" :xs="12">
            <div class="color-item">
              <div class="color-label">dark - {{ labelMap[key] || key }}</div>
              <color-picker v-model="themeMeta.darkColor[key]" :bg-color="themeMeta.darkColor[key]"
                :name="'dark-' + key" :value="themeMeta.darkColor[key]"
                @change="markDarkColorEdited(key)"></color-picker>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>

  <p>请填写主题元信息（name/label/description），为上述已选择颜色赋予名称。</p>
  <el-row class="meta-row meta-row--bottom" :gutter="8">
    <el-col :span="6">
      <el-input v-model="themeMeta.name" placeholder="name（英文必填，如 blue）" required></el-input>
    </el-col>
    <el-col :span="6">
      <el-input v-model="themeMeta.label" placeholder="label（显示名称，如 蓝色）"></el-input>
    </el-col>
    <el-col :span="12">
      <el-input v-model="themeMeta.description" placeholder="description（简短描述）"></el-input>
    </el-col>
  </el-row>

  <CustomBlock text="如需多个主题，请先将当前已配置好的变量添加到导出队列，继续进行下一套主题配置，最后导出即可！"></CustomBlock>


  <div class="submit-btn-group">
    <el-button type="warning" @click="resetTheme">重置</el-button>
    <el-button type="info" @click="addToQueue">添加到导出队列</el-button>
    <el-button type="danger" @click="clearQueue">清空队列</el-button>
    <el-button type="primary" @click="downThemeFileTs">导出</el-button>
  </div>

  <div v-if="themesList.length" style="margin-top:12px">
    <h4>导出队列（{{ themesList.length }}）</h4>
    <ul>
      <li v-for="(t, i) in themesList" :key="i">{{ i + 1 }}. {{ t.label }} ({{ t.name }})</li>
    </ul>
  </div>
</template>
<script setup lang="ts">
// 主题色生成与下载组件，支持主题色自定义、重置和下载
import { ref, onMounted, watch, computed, PropType } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'


const defaultColorTokens: Record<string, string> = {
  primary: '#2979ff',
  primaryDark: '#2b85e4',
  primaryDisabled: '#a0cfff',
  primaryLight: '#ecf5ff',
  success: '#19be6b',
  successDark: '#18b566',
  successDisabled: '#71d5a1',
  successLight: '#dbf1e1',
  error: '#fa3534',
  errorDark: '#dd6161',
  errorDisabled: '#fab6b6',
  errorLight: '#fef0f0',
  warning: '#ff9900',
  warningDark: '#f29100',
  warningDisabled: '#fcbd71',
  warningLight: '#fdf6ec',
  info: '#909399',
  infoDark: '#82848a',
  infoDisabled: '#c8c9cc',
  infoLight: '#f4f4f5',
  mainColor: '#303133',
  contentColor: '#606266',
  tipsColor: '#909399',
  lightColor: '#c0c4cc',
  borderColor: '#dcdfe6',
  dividerColor: '#ebeef5',
  bgColor: '#f3f4f6',
  bgWhite: '#ffffff',
  bgGrayLight: '#f5f7fa',
  bgGrayDark: '#2f343c',
  bgBlack: '#000000',
  whiteColor: '#ffffff',
  blackColor: '#000000',
  maskColor: 'rgba(0, 0, 0, 0.4)',
  shadowColor: 'rgba(0, 0, 0, 0.1)'
}

// --------- UI / preview / batch export state ---------
const collapsedGroups = ref<Record<string, boolean>>({})

const previewSwatches = computed(() => {
  const swatchOrder = [
    { key: 'primary', label: '主题色' },
    { key: 'success', label: '成功色' },
    { key: 'warning', label: '警告色' },
    { key: 'error', label: '错误色' },
    { key: 'info', label: '信息色' }
  ]
  return swatchOrder.map(item => ({
    ...item,
    value: getTokenValue(item.key, defaultColorTokens[item.key] || '#2979ff')
  }))
})

// 预览样式，根据当前颜色动态计算
const previewStyle = computed(() => {
  const background = getTokenValue('bgColor', '#fff')
  const text = getTokenValue('mainColor', '#303133')
  const cardBg = getTokenValue('bgWhite', '#ffffff')
  const muted = getTokenValue('tipsColor', '#909399')
  const border = getTokenValue('borderColor', '#e4e7ed')
  return {
    background,
    color: text,
    padding: '16px',
    borderRadius: '8px',
    ['--u-primary']: getTokenValue('primary', '#2979ff'),
    ['--u-success']: getTokenValue('success', '#19be6b'),
    ['--u-warning']: getTokenValue('warning', '#ff9900'),
    ['--u-info']: getTokenValue('info', '#909399'),
    ['--u-error']: getTokenValue('error', '#fa3534'),
    ['--u-card-bg']: cardBg,
    ['--u-card-text']: text,
    ['--u-muted-text']: muted,
    ['--u-border-color']: border
  }
})

// 主题队列（批量导出）
const themesList = ref<Array<any>>([])
const enableDark = ref(false)
const manualDarkKeys = ref<Record<string, boolean>>({})

function addToQueue() {
  if (!ensureThemeName()) return
  const payload = {
    name: themeMeta.value.name,
    label: themeMeta.value.label || themeMeta.value.name,
    description: themeMeta.value.description || '',
    color: { ...(themeMeta.value.color || {}) },
    darkColor: enableDark.value ? { ...(themeMeta.value.darkColor || {}) } : {}
  }
  themesList.value.push(payload)
}

function clearQueue() {
  themesList.value = []
}

function updateThemeColors(patch: Record<string, string>) {
  themeMeta.value.color = {
    ...(themeMeta.value.color || {}),
    ...patch
  }
}

function ensureThemeName() {
  const trimmed = (themeMeta.value.name || '').trim()
  if (!trimmed) {
    ElMessage.error('请先填写主题名称（name）')
    return false
  }
  themeMeta.value.name = trimmed
  return true
}

// --------- 暗黑生成算法（按用户提供的实现移植） ---------
const baseDarkColorTokens: Record<string, string> = {
  primary: '#8ab4ff',
  primaryDark: '#7aa7ff',
  primaryDisabled: '#5f7ecb',
  primaryLight: '#a8c7ff',
  success: '#42d392',
  successDark: '#39b67d',
  successDisabled: '#3e9d72',
  successLight: '#73e2b8',
  error: '#ff8c8c',
  errorDark: '#e57373',
  errorDisabled: '#d16b6b',
  errorLight: '#ffb1b1',
  warning: '#ffb74d',
  warningDark: '#f0a23c',
  warningDisabled: '#d68f35',
  warningLight: '#ffd48c',
  info: '#9aa0a6',
  infoDark: '#888d92',
  infoDisabled: '#6b6e73',
  infoLight: '#b8bec5',
  mainColor: '#f5f5f5',
  contentColor: '#dcdcdc',
  tipsColor: '#b5b5b5',
  lightColor: '#999999',
  borderColor: '#2a2c30',
  dividerColor: '#36383d',
  bgColor: '#141414',
  bgWhite: '#1e1e1e',
  bgGrayLight: '#1d1d1d',
  bgGrayDark: '#050505',
  bgBlack: '#f5f5f5',
  whiteColor: '#1b1b1b',
  blackColor: '#f5f5f5',
  maskColor: 'rgba(0, 0, 0, 0.65)',
  shadowColor: 'rgba(0, 0, 0, 0.75)'
}

const backgroundTokenKeys = new Set(['bgColor', 'bgGrayLight', 'bgGrayDark', 'bgWhite', 'bgBlack'])
const textTokenKeys = new Set(['mainColor', 'contentColor', 'tipsColor', 'lightColor', 'blackColor', 'whiteColor'])
const neutralTokenKeys = new Set(['borderColor', 'dividerColor'])
const overlayTokenKeys = new Set(['maskColor', 'shadowColor'])

const backgroundLadderTargets: Record<string, string> = {
  bgWhite: '#050505',
  bgColor: '#0c0d10',
  bgGrayLight: '#15161a',
  bgGrayDark: '#1f2025',
  bgBlack: '#2a2b31'
}

const textLadderTargets: Record<string, string> = {
  whiteColor: '#f8f9fb',
  mainColor: '#f2f3f5',
  contentColor: '#dee0e5',
  tipsColor: '#c7c9cf',
  lightColor: '#b1b3bb',
  blackColor: '#8f9097'
}

function normalizeHex(color: string): string | null {
  if (!color) return null
  const hex = color.trim()
  if (/^#([0-9a-fA-F]{6})$/.test(hex)) return hex.toLowerCase()
  return null
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const match = /^#([0-9a-fA-F]{6})$/.exec(hex)
  if (!match) return null
  return {
    r: parseInt(match[1].slice(0, 2), 16),
    g: parseInt(match[1].slice(2, 4), 16),
    b: parseInt(match[1].slice(4, 6), 16),
  }
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (val: number) => val.toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

function mixHex(fromHex: string, toHex: string, ratio: number): string {
  const from = hexToRgb(fromHex)
  const to = hexToRgb(toHex)
  if (!from || !to) return toHex
  const clamp = (val: number) => Math.min(255, Math.max(0, Math.round(val)))
  const r = clamp(from.r * (1 - ratio) + to.r * ratio)
  const g = clamp(from.g * (1 - ratio) + to.g * ratio)
  const b = clamp(from.b * (1 - ratio) + to.b * ratio)
  return rgbToHex(r, g, b)
}

function getLuminance(hex: string): number {
  const rgb = hexToRgb(hex)
  if (!rgb) return 0
  const channel = (val: number) => {
    const srgb = val / 255
    return srgb <= 0.03928 ? srgb / 12.92 : Math.pow((srgb + 0.055) / 1.055, 2.4)
  }
  const r = channel(rgb.r)
  const g = channel(rgb.g)
  const b = channel(rgb.b)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function createDarkVariantFromLight(color: string, fallback?: string): string {
  const normalized = normalizeHex(color)
  const fallbackHex = fallback ? normalizeHex(fallback) : null
  if (normalized && fallbackHex) {
    return mixHex(normalized, fallbackHex, 0.6)
  }
  if (fallbackHex) return fallbackHex
  return normalized || color
}

function generateDarkFromLight(palette: Partial<Record<string, string>>): Partial<Record<string, string>> {
  const result: Partial<Record<string, string>> = {}
  Object.entries(palette).forEach(([key, value]) => {
    if (typeof value !== 'string') return
      ; (result as any)[key] = transformTokenForDark(key, value)
  })
  return result
}

function mixTowardsTarget(source: string | null, target: string, weight = 0.65): string {
  const normalizedTarget = normalizeHex(target)
  if (!normalizedTarget) return source || target
  if (!source) return normalizedTarget
  return mixHex(source, normalizedTarget, weight)
}

function transformTokenForDark(key: string, value: string): string {
  const fallback = (baseDarkColorTokens as Record<string, string>)[key]
  const normalized = normalizeHex(value)

  if (backgroundTokenKeys.has(key)) {
    if (backgroundLadderTargets[key]) {
      return mixTowardsTarget(normalized, backgroundLadderTargets[key], 0.75)
    }
    if (normalized) {
      const luminance = getLuminance(normalized)
      if (luminance < 0.35) {
        return '#f5f5f5'
      }
      return mixHex(normalized, '#111111', 0.8)
    }
    return fallback || value
  }

  if (textTokenKeys.has(key)) {
    if (textLadderTargets[key]) {
      return mixTowardsTarget(normalized, textLadderTargets[key], 0.7)
    }
    if (normalized) {
      return mixHex(normalized, '#f6f6f6', 0.85)
    }
    return fallback || value
  }

  if (neutralTokenKeys.has(key)) {
    if (normalized) {
      return mixHex(normalized, '#2b2b2b', 0.6)
    }
    return fallback || value
  }

  if (overlayTokenKeys.has(key)) {
    return fallback || value
  }

  return createDarkVariantFromLight(value, fallback)
}

function computeVariantColor(base: string, spec: ToneVariantSpec): string {
  const normalized = normalizeHex(base)
  const fallback = defaultColorTokens[spec.key] || base
  if (!normalized) return fallback
  switch (spec.strategy) {
    case 'darken':
      return mixHex(normalized, '#000000', spec.ratio)
    case 'lighten':
      return mixHex(normalized, '#ffffff', spec.ratio)
    case 'mix': {
      const target = normalizeHex(spec.mixColor || '#ffffff') || '#ffffff'
      return mixHex(normalized, target, spec.ratio)
    }
    default:
      return fallback
  }
}

function buildToneVariants(baseColor: string, variants: ToneVariantSpec[]) {
  const result: Record<string, string> = {}
  variants.forEach(spec => {
    result[spec.key] = computeVariantColor(baseColor, spec)
  })
  return result
}

function generateGroupVariants(groupId: string) {
  const config = toneGenerationByGroupId[groupId]
  if (!config) return
  const baseColor = themeMeta.value.color?.[config.base] || defaultColorTokens[config.base]
  if (!baseColor) return
  const next = {
    [config.base]: baseColor,
    ...buildToneVariants(baseColor, config.variants)
  }
  updateThemeColors(next)
  ElMessage.success(`${labelMap[config.base] || config.base} 已生成梯度`)
}

function randomHexColor() {
  return `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')}`
}

function randomizeBrandColors(id?: string) {
  const patch: Record<string, string> = {}
  if (id) {
    const config = toneGenerationByGroupId[id]
    if (!config) return
    const randomColor = randomHexColor()
    patch[config.base] = randomColor
    Object.assign(patch, buildToneVariants(randomColor, config.variants))
  } else {
    Object.values(toneGenerationByGroupId).forEach((config) => {
      const randomColor = randomHexColor()
      patch[config.base] = randomColor
      Object.assign(patch, buildToneVariants(randomColor, config.variants))
    })
  }
  updateThemeColors(patch)
  ElMessage.success('已随机生成一套主题色')
}
// 主题编辑数据（单个主题）
const themeMeta = ref<any>({
  name: '',
  label: '',
  description: '',
  color: {},
  darkColor: {}
})

// 默认将要编辑的 color keys（按用户提供的 ColorType 列表）
const colorKeys = [
  { key: 'primary', label: 'Primary' },
  { key: 'primaryDark', label: 'Primary Dark' },
  { key: 'primaryDisabled', label: 'Primary Disabled' },
  { key: 'primaryLight', label: 'Primary Light' },
  { key: 'bgColor', label: 'Background' },
  { key: 'bgWhite', label: 'BG White' },
  { key: 'bgGrayLight', label: 'BG Gray Light' },
  { key: 'bgGrayDark', label: 'BG Gray Dark' },
  { key: 'bgBlack', label: 'BG Black' },
  { key: 'info', label: 'Info' },
  { key: 'infoDark', label: 'Info Dark' },
  { key: 'infoDisabled', label: 'Info Disabled' },
  { key: 'infoLight', label: 'Info Light' },
  { key: 'warning', label: 'Warning' },
  { key: 'warningDark', label: 'Warning Dark' },
  { key: 'warningDisabled', label: 'Warning Disabled' },
  { key: 'warningLight', label: 'Warning Light' },
  { key: 'error', label: 'Error' },
  { key: 'errorDark', label: 'Error Dark' },
  { key: 'errorDisabled', label: 'Error Disabled' },
  { key: 'errorLight', label: 'Error Light' },
  { key: 'success', label: 'Success' },
  { key: 'successDark', label: 'Success Dark' },
  { key: 'successDisabled', label: 'Success Disabled' },
  { key: 'successLight', label: 'Success Light' },
  { key: 'mainColor', label: 'Main Text' },
  { key: 'contentColor', label: 'Content Text' },
  { key: 'tipsColor', label: 'Tips Text' },
  { key: 'lightColor', label: 'Light Color' },
  { key: 'borderColor', label: 'Border' },
  { key: 'whiteColor', label: 'White' },
  { key: 'blackColor', label: 'Black' },
  { key: 'dividerColor', label: 'Divider' },
  { key: 'maskColor', label: 'Mask' },
  { key: 'shadowColor', label: 'Shadow' }
]

// 上次主题配置时间提示
const lastTime = ref('')

interface ColorGroupConfig {
  id: string
  label: string
  keys: string[]
}

interface ColorSectionConfig {
  id: string
  label: string
  description?: string
  groups: ColorGroupConfig[]
}

interface ToneVariantSpec {
  key: string
  strategy: 'lighten' | 'darken' | 'mix'
  ratio: number
  mixColor?: string
}

interface ToneGenerationConfig {
  base: string
  variants: ToneVariantSpec[]
}

const colorSections: ColorSectionConfig[] = [
  {
    id: 'brand',
    label: '品牌与状态',
    description: '主题主色与成功/警告/错误/信息色阶梯',
    groups: [
      { id: 'theme', label: '主题色', keys: ['primary', 'primaryDark', 'primaryDisabled', 'primaryLight'] },
      { id: 'error', label: '错误色', keys: ['error', 'errorDark', 'errorDisabled', 'errorLight'] },
      { id: 'warning', label: '警告色', keys: ['warning', 'warningDark', 'warningDisabled', 'warningLight'] },
      { id: 'info', label: '信息色', keys: ['info', 'infoDark', 'infoDisabled', 'infoLight'] },
      { id: 'success', label: '成功色', keys: ['success', 'successDark', 'successDisabled', 'successLight'] },
    ]
  },
  {
    id: 'content',
    label: '文本与描边',
    description: '文字、提示与描边需要清晰的层级关系',
    groups: [
      { id: 'text', label: '文字阶梯', keys: ['whiteColor', 'mainColor', 'contentColor', 'tipsColor', 'lightColor', 'blackColor'] },
      { id: 'border', label: '描边与分割', keys: ['borderColor', 'dividerColor'] }
    ]
  },
  {
    id: 'surface',
    label: '背景与表面',
    description: '背景、卡片、深浅灰背景根据明暗形成阶梯',
    groups: [
      { id: 'bg', label: '背景阶梯', keys: ['bgWhite', 'bgColor', 'bgGrayLight', 'bgGrayDark', 'bgBlack'] }
    ]
  },
  {
    id: 'decor',
    label: '遮罩与阴影',
    groups: [
      { id: 'mask', label: '遮罩/阴影', keys: ['maskColor', 'shadowColor'] }
    ]
  }
]

const colorGroups: ColorGroupConfig[] = colorSections.flatMap(section => section.groups)

const toneGenerationByGroupId: Record<string, ToneGenerationConfig> = {
  theme: {
    base: 'primary',
    variants: [
      { key: 'primaryDark', strategy: 'darken', ratio: 0.2 },
      { key: 'primaryDisabled', strategy: 'mix', ratio: 0.55, mixColor: '#f2f6ff' },
      { key: 'primaryLight', strategy: 'lighten', ratio: 0.82 }
    ]
  },
  error: {
    base: 'error',
    variants: [
      { key: 'errorDark', strategy: 'darken', ratio: 0.18 },
      { key: 'errorDisabled', strategy: 'mix', ratio: 0.52, mixColor: '#ffecec' },
      { key: 'errorLight', strategy: 'lighten', ratio: 0.82 }
    ]
  },
  warning: {
    base: 'warning',
    variants: [
      { key: 'warningDark', strategy: 'darken', ratio: 0.16 },
      { key: 'warningDisabled', strategy: 'mix', ratio: 0.5, mixColor: '#fff0d3' },
      { key: 'warningLight', strategy: 'lighten', ratio: 0.78 }
    ]
  },
  info: {
    base: 'info',
    variants: [
      { key: 'infoDark', strategy: 'darken', ratio: 0.16 },
      { key: 'infoDisabled', strategy: 'mix', ratio: 0.48, mixColor: '#f5f6f8' },
      { key: 'infoLight', strategy: 'lighten', ratio: 0.78 }
    ]
  },
  success: {
    base: 'success',
    variants: [
      { key: 'successDark', strategy: 'darken', ratio: 0.18 },
      { key: 'successDisabled', strategy: 'mix', ratio: 0.5, mixColor: '#e8f8f1' },
      { key: 'successLight', strategy: 'lighten', ratio: 0.8 }
    ]
  },
}

const toneGroupIds = new Set(Object.keys(toneGenerationByGroupId))

// key -> friendly label 映射
const labelMap: Record<string, string> = {
  primary: '主题色',
  primaryDark: '主题色(深)',
  primaryDisabled: '主题色(禁用)',
  primaryLight: '主题色(淡)',
  success: '成功色',
  successDark: '成功色(深)',
  successDisabled: '成功(禁用)',
  successLight: '成功(淡)',
  error: '错误色',
  errorDark: '错误色(深)',
  errorDisabled: '错误(禁用)',
  errorLight: '错误(淡)',
  warning: '警告色',
  warningDark: '警告色(深)',
  warningDisabled: '警告(禁用)',
  warningLight: '警告(淡)',
  info: '信息色',
  infoDark: '信息色(深)',
  infoDisabled: '信息(禁用)',
  infoLight: '信息(淡)',
  mainColor: '主要文字',
  contentColor: '常规文字',
  tipsColor: '提示文字',
  lightColor: '占位/弱色',
  borderColor: '边框颜色',
  dividerColor: '分割线',
  bgColor: '背景色',
  bgWhite: '纯白背景',
  bgGrayLight: '浅灰背景',
  bgGrayDark: '深灰背景',
  bgBlack: '黑色背景',
  whiteColor: '纯白色值',
  blackColor: '纯黑色值',
  maskColor: '遮罩颜色',
  shadowColor: '阴影颜色'
}

function setAllGroups(collapsed: boolean) {
  const next: Record<string, boolean> = {}
  colorGroups.forEach(group => {
    next[group.id] = collapsed
  })
  collapsedGroups.value = next
}

function expandAllGroups() {
  setAllGroups(false)
}

function collapseAllGroups() {
  setAllGroups(true)
}

function getTokenValue(tokenKey: string, fallback = '') {
  const color = themeMeta.value.color || {}
  const dark = themeMeta.value.darkColor || {}
  if (enableDark.value && dark[tokenKey]) return dark[tokenKey]
  return color[tokenKey] || fallback
}

function toggleGroup(groupId: string) {
  collapsedGroups.value = {
    ...collapsedGroups.value,
    [groupId]: !collapsedGroups.value[groupId]
  }
}

function setupCollapsedGroups() {
  setAllGroups(false)
}

// helper: map old keys (type-*) -> new keys
function initThemeFromDefault() {
  const obj: Record<string, string> = {}
  colorKeys.forEach(k => {
    obj[k.key] = defaultColorTokens[k.key] || ''
  })
  themeMeta.value.color = obj
  themeMeta.value.darkColor = {}
  manualDarkKeys.value = {}
}

onMounted(() => {
  try {
    const raw = JSON.parse(localStorage.getItem('themesData') || 'null')
    const themeTime = localStorage.getItem('themesTime')
    if (raw) {
      // if stored is new format with name
      if (raw.name && raw.color) {
        themeMeta.value = raw
        lastTime.value = themeTime ? `您于${themeTime}配置过一次主题，已为您读取上一次的配置。` : ''
      } else {
        // older format: map keys
        initThemeFromDefault()
        for (const oldKey in raw) {
          const v = (raw as any)[oldKey]
          // map known old keys like type-primary -> primary
          const mapped = oldKey.replace(/^type-/, '').replace(/-([a-z])/g, (_, c) => c.toUpperCase())
          themeMeta.value.color[mapped] = v
        }
        lastTime.value = themeTime ? `您于${themeTime}配置过一次主题，已为您读取上一次的配置（自动映射旧格式）。` : ''
      }
    } else {
      initThemeFromDefault()
    }
  } catch (e) {
    initThemeFromDefault()
  }
  if (enableDark.value) {
    manualDarkKeys.value = {}
    applyDarkDefaults({ force: true })
  }
  setupCollapsedGroups()
})

// watch enableDark toggle to fill defaults when turned on
watch(enableDark, (val) => {
  if (val) {
    manualDarkKeys.value = {}
    applyDarkDefaults({ force: true })
  }
})

watch(() => themeMeta.value.color, () => {
  if (enableDark.value) applyDarkDefaults()
}, { deep: true })

function applyDarkDefaults(options: { force?: boolean } = {}) {
  if (!enableDark.value) return
  const { force = false } = options
  const generated = generateDarkFromLight(themeMeta.value.color || {})
  const next = { ...(themeMeta.value.darkColor || {}) }
  Object.entries(generated).forEach(([key, value]) => {
    if (force || !manualDarkKeys.value[key]) {
      next[key] = value
      if (force) manualDarkKeys.value[key] = false
    }
  })
  themeMeta.value.darkColor = next
}

function refreshDarkColors() {
  if (!enableDark.value) return
  manualDarkKeys.value = {}
  applyDarkDefaults({ force: true })
  ElMessage.success('已根据当前亮色重新生成暗黑色值')
}

function markDarkColorEdited(key: string) {
  manualDarkKeys.value = {
    ...manualDarkKeys.value,
    [key]: true
  }
}

// 下载 TS/JS 格式导出：数组格式
function downThemeFileTs() {
  if (!ensureThemeName()) return
  const payload = themesList.value.length
    ? themesList.value
    : [
      {
        name: themeMeta.value.name,
        label: themeMeta.value.label || themeMeta.value.name,
        description: themeMeta.value.description || '',
        color: themeMeta.value.color || {},
        darkColor: enableDark.value ? (themeMeta.value.darkColor || {}) : {}
      }
    ]
  const content = `// 此自定义wot-ui-plus 主题生成于${dateTime()}\n` +
    `// 地址：https://wot-ui-plus.cn/zh/guide/themeGenerate.html\n\nexport default ${JSON.stringify(payload, null, 2)}\n`
  try {
    localStorage.setItem('themesData', JSON.stringify(themeMeta.value))
    localStorage.setItem('themesTime', dateTime())
  } catch (err) { }
  download('wot-ui-plus.theme.ts', content)
}

// 文件下载实现
function download(filename: string, text: string) {
  const element = document.createElement('a')
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
  element.setAttribute('download', filename)
  element.style.display = 'none'
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}

// 重置主题色
function resetTheme() {
  ElMessageBox.confirm('确定要重置主题吗？').then(() => {
    initThemeFromDefault()
    themeMeta.value.name = ''
    themeMeta.value.label = ''
    themeMeta.value.description = ''
    lastTime.value = ''
    manualDarkKeys.value = {}
    clearQueue()
    try {
      localStorage.removeItem('themesData')
      localStorage.removeItem('themesTime')
    } catch (err) { }
  })
}

// 获取当前时间字符串
function dateTime() {
  const time = new Date()
  const year = time.getFullYear()
  const month = time.getMonth() + 1
  const day = time.getDate()
  const hour = time.getHours()
  const minu = time.getMinutes()
  return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day} ${hour < 10 ? '0' : ''}${hour}:${minu < 10 ? '0' : ''}${minu}`
}
</script>

<style scoped lang="scss">
h4 {
  margin-top: 10px !important;
}

.submit-btn-group {
  margin-top: 2rem;
  text-align: left;
}

.preview-panel {
  margin: 16px 0;
}

.global-actions {
  margin: 8px 0 20px;
}

.global-actions .el-button {
  padding: 6px 12px;
}

.colors-grid {
  margin-bottom: 24px;
}

.color-section {
  border: 1px solid #f1f1f5;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
  background: #fff;
}

.color-section__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.color-section__header h3,
.color-section__header h4 {
  margin: 0;
}

.color-section__header p {
  margin: 4px 0 0;
  color: #909399;
  font-size: 13px;
}

.color-section--dark {
  background: #0f1117;
  border-color: #1f2230;
}

.color-section--dark .color-section__header h4 {
  color: #f3f3f3;
}

.color-section--dark .color-label {
  color: #c5c7ce;
}

.colors-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.colors-toolbar__label {
  font-weight: 500;
  color: #555;
}

.colors-toolbar__actions {
  display: flex;
  align-items: center;
  gap: 4px;
}

.dark-toggle {
  display: flex;
  align-items: center;
  gap: 12px;
}

.meta-row--bottom {
  margin-top: 16px;
}

.preview-area {
  border: 1px solid #eaeaea;
  padding: 12px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.preview-swatches {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.preview-swatch {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(0, 0, 0, 0.03);
  border-radius: 12px;
  padding: 4px 10px;
  font-size: 12px;
}

.preview-swatch__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.preview-swatch__label {
  color: var(--u-muted-text, #757575);
}

.preview-top {
  display: flex;
  gap: 10px;
  justify-content: flex-start;
}

.preview-btn {
  padding: 8px 14px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 500;
}

.preview-btn.primary {
  background: var(--u-primary, #2979ff);
  color: #fff;
  border: 1px solid var(--u-primary, #2979ff);
}

.preview-btn.ghost {
  background: transparent;
  color: var(--u-primary, #2979ff);
  border: 1px solid var(--u-border-color, #dcdfe6);
}

.preview-card {
  background: var(--u-card-bg, #fff);
  padding: 12px;
  border-radius: 6px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--u-border-color, #eaeaea);
}

.preview-card h4 {
  margin: 0 0 4px;
}

.preview-card p {
  margin: 0 0 8px;
  color: var(--u-muted-text, #909399);
}

.preview-chip-group {
  display: flex;
  gap: 8px;
}

.preview-chip {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 999px;
  color: #fff;
}

.preview-chip.success {
  background: var(--u-success, #19be6b);
}

.preview-chip.warning {
  background: var(--u-warning, #ff9900);
}

.preview-chip.info {
  background: var(--u-info, #909399);
}

.color-group {
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
  background: #fafafa;
}

.color-group__actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.color-group--compact {
  background: transparent;
  border-color: rgba(255, 255, 255, 0.08);
}

.color-group__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

.dark-section {
  margin-bottom: 12px;
}
</style>
