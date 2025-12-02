
/**
 * 提示弹窗组件
 */
<template>
  <el-dialog v-model="visible" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false"
    append-to-body class="tips-dialog">
    <template #title>
      <div class="header">
        <div class="stars">
          <span class="star s1">★</span>
          <span class="star s2">★</span>
          <span class="star s3">★</span>
        </div>
        <div class="title-wrap">
          <div class="title">{{ data.title }}</div>
          <div class="subtitle">{{ data.subtitle }}</div>
        </div>
      </div>
    </template>

    <div class="tips-body">
      <p class="lead">{{ data.description }}</p>

      <ul class="reasons">
        <li v-for="(reason, index) in data.reasons" :key="index" v-html="reason"></li>
      </ul>

      <!-- 手动弹窗 -->
      <div v-if="manually" class="actions">

        <el-button v-for="(action, index) in primaryActions" :key="index" :type="action.type" @click="action.onClick"
          class="action-btn">
          <span v-if="action.icon" :class="action.icon" style="margin-right: 6px"></span>
          {{ action.text }}
        </el-button>

        <el-button type="default" @click="onProceed" class="action-btn">
          关闭
        </el-button>

      </div>

      <!-- 已经点击过按钮 -->
      <div v-else-if="clickedLink" class="actions">
        <el-button v-for="(action, index) in primaryActions" :key="index" :type="action.type" @click="action.onClick"
          class="action-btn">
          <span v-if="action.icon" :class="action.icon" style="margin-right: 6px"></span>
          {{ action.text }}
        </el-button>
        <el-button type="default" @click="onProceed" class="action-btn">
          {{ data.proceed }}
        </el-button>
      </div>

      <!-- 按钮组 -->
      <div v-else class="actions">
        <el-button v-for="(action, index) in data.actions" :key="index" :type="action.type" @click="action.onClick"
          class="action-btn">
          <span v-if="action.icon" :class="action.icon" style="margin-right: 6px"></span>
          {{ action.text }}
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted, computed, } from 'vue'

// tips data (will be loaded from JSON index + selected file)
const data = ref({ title: '', description: '', reasons: [], proceed: '', actions: [] })

// component prop to choose which tips to load (e.g. 'support' or 'star')
const props = defineProps({
  tipsKey: { type: Object, default: [] }
})

async function loadTipsByParam(keyArg) {
  try {
    const idxRes = await fetch('/json/tips.json', { cache: 'no-store' })
    if (!idxRes.ok) return
    const idx = await idxRes.json()
    let key = keyArg || ''
    try {
      if (!key && typeof location !== 'undefined') {
        const qs = new URLSearchParams(location.search)
        key = qs.get('tips') || ''
      }
    } catch (e) { }
    if (!key) key = 'support'
    const file = idx[key] || idx['support'] || 'tips-support.json'
    const tipsRes = await fetch(`/json/${file}`, { cache: 'no-store' })
    if (!tipsRes.ok) return
    const tips = await tipsRes.json()
    // map actions: attach onClick handlers that open action.url via handleAction
    const mapped = {
      key: tips.key || '',
      title: tips.title || '',
      subtitle: tips.subtitle || '',
      description: tips.description || '',
      reasons: Array.isArray(tips.reasons) ? tips.reasons : [],
      proceed: tips.proceed || '',
      actions: Array.isArray(tips.actions)
        ? tips.actions.map(a => ({ ...a, onClick: () => handleAction(a.url || '') }))
        : []
    }
    storageKey.value = tips.key || ''
    data.value = mapped
  } catch (e) {
    // ignore load errors
  }
}

// localStorage key to remember the user has clicked proceed
const storageKey = ref('')
const visible = ref(false)
const clickedLink = ref(false)
const manually = ref(false)

const primaryActions = computed(() => {
  return data.value.actions.filter(action => action.type === 'primary' || action.type === 'success')
})

async function showDialog(key) {
  // if a key is provided, load that tips file before showing
  if (key) {
    try {
      await loadTipsByParam(key)
    } catch (e) {
      // ignore
    }
  }
  visible.value = true
  manually.value = true
}

function hasChecked() {
  try {
    return storageKey.value ? localStorage.getItem(storageKey.value) === '1' : true
  } catch (e) {
    return false
  }
}

onMounted(async () => {
  // If not previously confirmed, show blocking dialog
  if (props.tipsKey && props.tipsKey.length > 0) {
    for (let i = 0; i < props.tipsKey.length; i++) {
      await loadTipsByParam(props.tipsKey[i])
      if (!hasChecked()) {
        visible.value = true
        break;
      }
    }
  }
})

function handleAction(url) {
  if (!url) {
    onProceed()
    return
  }
  clickedLink.value = true
  try {
    if (!storageKey.value) return
    localStorage.setItem(storageKey.value, '1')
  } catch (e) { }
  try {
    if (!url.startsWith('http')) {
      location.href = url
      return
    }
    window.open(url, '_blank', 'noopener')
  } catch (e) {
    location.href = url
  }
}

function onProceed() {
  try {
    if (!storageKey.value) return
    localStorage.setItem(storageKey.value, '1')
  } catch (e) { }
  visible.value = false
}

defineExpose({
  showDialog
})
</script>

<style>
/* Dialog base and deep styling for Element Plus internals */
.tips-dialog {
  width: 640px;
}

@media (max-width: 640px) {
  .tips-dialog {
    width: 90%;
    min-width: 320px;

    .header {
      flex-direction: column;
    }

    .actions {
      flex-direction: column;
      align-items: stretch;

      .el-button+.el-button {
        margin: 0;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
::v-deep(.el-dialog) {
  border-radius: 12px;
  overflow: hidden;
  background: linear-gradient(180deg,
      rgba(10, 12, 20, 0.98),
      rgba(6, 8, 15, 0.98));
  color: #e6eef8;
  box-shadow: 0 20px 40px rgba(3, 6, 23, 0.7),
    inset 0 1px 0 rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.04);
}

/* Header with gradient and stars */
.header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px 20px;
  background: linear-gradient(90deg, #7c3aed 0%, #06b6d4 50%, #f97316 100%);
  color: white;
}

.stars {
  display: flex;
  gap: 8px;
  align-items: center;
}

.star {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.95);
  filter: drop-shadow(0 6px 18px rgba(252, 211, 77, 0.18));
  transform-origin: center;
}

.star.s1 {
  animation: twinkle 2.6s infinite linear;
  transform: translateY(-2px) rotate(-8deg);
}

.star.s2 {
  animation: twinkle 3.2s infinite linear;
  transform: translateY(0) rotate(6deg);
}

.star.s3 {
  animation: twinkle 3.8s infinite linear;
  transform: translateY(-1px) rotate(-4deg);
}

@keyframes twinkle {
  0% {
    opacity: 0.6;
    transform: scale(0.9);
  }

  50% {
    opacity: 1;
    transform: scale(1.06);
  }

  100% {
    opacity: 0.8;
    transform: scale(0.95);
  }
}

.title-wrap {
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.2px;
  color: #fff;
}

.subtitle {
  font-size: 12px;
  opacity: 0.95;
  margin-top: 4px;
}

.tips-body {
  padding-top: 10px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), transparent);
}

/* Improved lead: accent left bar + subtle glass panel */
.lead {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 14px;
  padding: 12px 14px;
  border-radius: 10px;
  background: linear-gradient(180deg,
      rgba(255, 255, 255, 0.02),
      rgba(255, 255, 255, 0.01));
  border: 1px solid rgba(255, 255, 255, 0.02);
  color: #7c3aed;
  position: relative;
  box-shadow: inset 0 -1px 0 rgba(255, 255, 255, 0.01);
}

.lead::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 6px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  background: linear-gradient(180deg, #7c3aed, #06b6d4);
}

/* Reasons: remove default bullets, use custom gradient dot and make links appear as chips */
.reasons {
  margin: 10px 0 14px 0;
  color: #71809b;
  list-style: none;
  padding-left: 0;
}

.reasons li {
  margin: 8px 0;
  padding-left: 18px;
  position: relative;
  line-height: 1.5;
}

.reasons li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: linear-gradient(90deg, #facc15, #fb7185);
  box-shadow: 0 6px 16px rgba(249, 115, 135, 0.12);
}

/* Style inline links inside reasons as tag/chip */
.reasons a {
  display: inline-block;
  padding: 6px 10px;
  margin-left: 6px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 999px;
  color: #ffffff;
  text-decoration: none;
  border: 1px solid rgba(255, 255, 255, 0.04);
  font-weight: 600;
  font-size: 13px;
  transition: transform 0.16s ease, box-shadow 0.16s ease, background 0.16s ease;
}

.reasons a:hover {
  transform: translateY(-2px);
  background: linear-gradient(90deg, #06b6d4, #3b82f6);
  box-shadow: 0 12px 30px rgba(59, 130, 246, 0.12);
}

.actions {
  display: flex;
  gap: 12px;
  margin-top: 30px;
  margin-bottom: 8px;
  justify-content: flex-end;
}

.action-btn {
  min-width: 140px;
  border-radius: 999px;
  padding: 8px 14px;
  font-weight: 600;
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

.proceed {
  text-align: right;
  margin-top: 6px;
}

.proceed-btn {
  border-radius: 999px;
  padding: 8px 16px;
}

/* ensure dialog wrapper high z-index */
::v-deep(.el-dialog__wrapper) {
  z-index: 9999;
}
</style>
