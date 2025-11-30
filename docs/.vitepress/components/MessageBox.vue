/**
 * 消息中心
 */
<template>
  <el-popover v-model:visible="showMessages" placement="bottom-end" width="400" popper-class="message-popover"
    trigger="click">
    <div class="message-panel">
      <div class="panel-header">
        <div class="title">消息中心</div>
        <div class="actions">
          <a class="mark-all" @click.prevent="markAllRead">全部标为已读</a>
          <!-- <a class="clear" @click.prevent="clearMessages">清空</a> -->
        </div>
      </div>

      <div class="panel-body">
        <ul class="message-list">
          <li v-for="(m, idx) in messages" :key="m.id || idx" class="message-item"
            :class="{ read: m.read, pointer: m.url || m.tipsKey }" @click.prevent="onMessageClick(m)">
            <div class="avatar"></div>
            <div class="meta">
              <div class="row">
                <div class="m-title">
                  {{ m.title }}
                  <span v-if="m.pinned" class="pinned-label">置顶</span>
                </div>
                <div class="m-time">
                  {{ m.displayTime }}
                  <el-tooltip :content="m.pinned ? '取消置顶' : '置顶'" placement="top">
                    <span class="pin" @click.stop.prevent="togglePin(m)">{{ m.pinned ? '📌' : '📍' }}</span>
                  </el-tooltip>
                </div>
              </div>
              <div class="m-desc" v-html="m.desc"></div>
            </div>
          </li>
        </ul>
        <div v-if="messages.length === 0" class="empty">暂无消息</div>
      </div>

      <div class="panel-footer">
        <!-- <el-button type="primary" plain size="mini" @click="openAll">查看所有消息</el-button> -->
      </div>
    </div>

    <template #reference>
      <el-badge :value="unreadCount" :show-zero="false" class="item" :class="{ pulse: badgePulse }">
        <a class="bell custom-icon custom-icon-bell-solid-1"></a>
      </el-badge>
    </template>
  </el-popover>
</template>

<script setup>
import { ref, onMounted, computed, watch, onBeforeUnmount } from 'vue'

const emit = defineEmits(['click-tips'])

//  interface MessageBoxItem {
//   "id": String,
//   "title": String,
//   "desc": String,
//   "date": String,
//   "type": String,
//   "url": String
// } 

// message center state
const showMessages = ref(false)
const messages = ref([])
// read ids persisted in localStorage
const READ_KEY = 'wot-ui-plus_messages_read_v1'
// pinned ids persisted in localStorage
const PINS_KEY = 'wot-ui-plus_messages_pins_v1'
// badge pulse state
const badgePulse = ref(false)
let refreshTimer = null

function loadReadIds() {
  try {
    const raw = localStorage.getItem(READ_KEY)
    if (!raw) return new Set()
    const arr = JSON.parse(raw)
    return new Set(Array.isArray(arr) ? arr : [])
  } catch (e) {
    return new Set()
  }
}

function saveReadIds(set) {
  try {
    localStorage.setItem(READ_KEY, JSON.stringify(Array.from(set)))
  } catch (e) { }
}

function loadPinMap() {
  try {
    const raw = localStorage.getItem(PINS_KEY)
    if (!raw) return {}
    const obj = JSON.parse(raw)
    return typeof obj === 'object' && obj ? obj : {}
  } catch (e) {
    return {}
  }
}

function savePinMap(map) {
  try {
    localStorage.setItem(PINS_KEY, JSON.stringify(map))
  } catch (e) {}
}

// fetch messages from public/messages.json
async function fetchMessages() {
  try {
    const res = await fetch('/json/messages.json', { cache: 'no-store' })
    if (!res.ok) return
    const data = await res.json()
    const readSet = loadReadIds()
    const pinMap = loadPinMap()
    messages.value = data.map(m => {
      // normalize date for parsing
      const dateStr = typeof m.date === 'string' && m.date.includes(' ') ? m.date.replace(' ', 'T') : m.date
      return { ...m, date: dateStr, read: readSet.has(m.id), pinned: !!(m.pinned || pinMap[m.id]), displayTime: computeRelativeTime(dateStr) }
    })
    // sort pinned first, then by date desc
    messages.value.sort((a, b) => {
      if (a.pinned === b.pinned) {
        const ta = new Date(a.date).getTime() || 0
        const tb = new Date(b.date).getTime() || 0
        return tb - ta
      }
      return (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)
    })
    // start periodic refresh to update relative times every minute
    startAutoRefresh()
  } catch (e) {
    // swallow
  }
}

const unreadCount = computed(() => messages.value.filter(m => !m.read).length)

watch(unreadCount, (n, o) => {
  // pulse animation on change when increases or decreases
  badgePulse.value = true
  setTimeout(() => (badgePulse.value = false), 420)
})

function startAutoRefresh() {
  stopAutoRefresh()
  refreshTimer = setInterval(() => {
    messages.value.forEach(m => {
      m.displayTime = computeRelativeTime(m.date)
    })
  }, 60 * 1000)
}

function stopAutoRefresh() {
  if (refreshTimer) {
    clearInterval(refreshTimer)
    refreshTimer = null
  }
}

onBeforeUnmount(() => {
  stopAutoRefresh()
})

function clearMessages() {
  messages.value = []
  try {
    localStorage.removeItem(READ_KEY)
  } catch (e) { }
}

function markMessageRead(id) {
  try {
    const readSet = loadReadIds()
    readSet.add(id)
    saveReadIds(readSet)
    const item = messages.value.find(m => m.id === id)
    if (item) item.read = true
  } catch (e) { }
}

function markAllRead() {
  try {
    const readSet = loadReadIds()
    messages.value.forEach(m => {
      readSet.add(m.id)
      m.read = true
    })
    saveReadIds(readSet)
  } catch (e) { }
}

function togglePin(m) {
  if (!m || !m.id) return
  const pinMap = loadPinMap()
  m.pinned = !m.pinned
  pinMap[m.id] = !!m.pinned
  savePinMap(pinMap)
  // re-sort messages so pinned ones float to top
  messages.value.sort((a, b) => {
    if (a.pinned === b.pinned) {
      const ta = new Date(a.date).getTime() || 0
      const tb = new Date(b.date).getTime() || 0
      return tb - ta
    }
    return (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)
  })
}

// compute relative time from ISO date string
function computeRelativeTime(iso) {
  if (!iso) return ''
  try {
    const t = new Date(iso).getTime()
    if (isNaN(t)) return ''
    const now = Date.now()
    const diff = Math.floor((now - t) / 1000)
    if (diff < 10) return '刚刚'
    if (diff < 60) return `${diff} 秒前`
    const mins = Math.floor(diff / 60)
    if (mins < 60) return `${mins} 分钟前`
    const hours = Math.floor(mins / 60)
    if (hours < 24) return `${hours} 小时前`
    const days = Math.floor(hours / 24)
    if (days < 30) return `${days} 天前`
    // fallback date
    const d = new Date(iso)
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
  } catch (e) {
    return ''
  }
}

function onMessageClick(m) {
  if (!m) return
  markMessageRead(m.id)
  if (m.type==='url' && m.url) {
    try {
      window.open(m.url, '_blank', 'noopener')
    } catch (e) {
      location.href = m.url
    }
    return
  }
  if (m.type === 'tips' && m.tipsKey) {
    emit('click-tips', m.tipsKey)
  }
}

onMounted(() => {
  // load messages from static JSON
  fetchMessages()
})
</script>

<style>
/* remove double background from element-plus popover wrapper */
.message-popover {
  padding: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
  border-radius: 4px !important;
  /* border-color: rgba(10,12,20,0.98) !important; */
  border: 0;
}
</style>

<style lang="scss" scoped>
.bell {
  cursor: pointer;
  color: #666;
  margin-left: 13px;
  width: 20px;
  height: 20px;
  font-size: 20px;
}

/* primary-like glow updated for pill buttons */
::v-deep(.el-button--primary) {
  background: linear-gradient(90deg, #06b6d4, #3b82f6);
  border: none;
  color: #fff;
  box-shadow: 0 8px 28px rgba(59, 130, 246, 0.18);
}

::v-deep(.el-button--primary):hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 44px rgba(59, 130, 246, 0.24);
}

::v-deep(.el-button--success):hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 44px rgba(59, 130, 246, 0.24);
}

/* Message popover styles */
.message-popover {
  border-radius: 4px;
  padding: 0;
}

/* remove double background from element-plus popover wrapper */
::v-deep(.message-popover),
::v-deep(.message-popover .el-popper),
::v-deep(.message-popover .el-popover__popper) {
  background: transparent !important;
  box-shadow: none !important;
}

.message-panel {
  // width: 400px;
  max-height: 500px;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, rgba(10, 12, 20, 0.98), rgba(6, 8, 15, 0.98));
  color: #e6eef8;
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 4px;
  overflow: hidden;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.02);
}

.panel-header .title {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.2px;
  color: #fff;
  font-weight: 700;
}

.panel-header .actions .clear {
  color: #9fb0d6;
  font-size: 13px;
  cursor: pointer;
}

.panel-header .actions .mark-all {
  color: #9fb0d6;
  font-size: 13px;
  margin-right: 10px;
  cursor: pointer;
}

.panel-body {
  padding: 8px 10px;
  overflow: auto;
}

.message-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.message-item {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  padding: 8px;
  border-radius: 8px;
  transition: background 0.12s ease;
}

.message-item.pointer {
  cursor: pointer;
}

.message-item:hover {
  background: rgba(255, 255, 255, 0.02);
}

.message-item.read {
  opacity: 0.62;
}

.avatar {
  width: 38px;
  height: 38px;
  border-radius: 8px;
  flex: 0 0 38px;
}

.message-item:nth-child(odd) .avatar {
  background: linear-gradient(90deg, #06b6d4, #3b82f6);
}

.message-item:nth-child(even) .avatar {
  background: linear-gradient(90deg, #f97316, #fb7185);
}

.meta {
  flex: 1 1 auto;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.m-title {
  font-weight: 700;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.m-time {
  font-size: 12px;
  color: #9fb0d6;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}

.m-desc {
  margin-top: 4px;
  font-size: 13px;
  color: #9fb0d6;
}

.pinned-label {
  display: inline-block;
  padding: 2px 6px;
  background: rgba(255,255,255,0.04);
  border-radius: 6px;
  font-size: 12px;
  color: #ffd26a;
  white-space: nowrap;
}

.pin {
  margin-left: 4px;
  cursor: pointer;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 140ms ease, opacity 120ms ease;
}

.pin:hover {
  transform: scale(1.12);
  opacity: 0.95;
}

.empty {
  padding: 28px 10px;
  text-align: center;
  color: #9fb0d6;
}

.panel-footer {
  padding: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.02);
  display: flex;
  justify-content: center;
}

/* badge pulse animation */
.item.pulse ::v-deep(.el-badge__content) {
  animation: badge-pop 420ms cubic-bezier(.2, .8, .2, 1);
}

@keyframes badge-pop {
  0% {
    transform: scale(1);
  }

  30% {
    transform: scale(1.42);
  }

  60% {
    transform: scale(0.96);
  }

  100% {
    transform: scale(1);
  }
}
</style>
