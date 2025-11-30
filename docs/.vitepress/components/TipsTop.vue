/**
 * 提示弹窗组件
 */
<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'

const visible = ref(true)
const rootEl = ref<HTMLElement | null>(null)
// storage key can be provided by JSON (tipsTopKey). Use fallback.
const storageKeyName = ref('wot_docs_tipsTop_closed_v3')

function readClosedFromStorage() {
    try {
        return storageKeyName.value ? localStorage.getItem(storageKeyName.value) === '1' : false
    } catch (e) {
        return false
    }
}

// tip content state
const tipText = ref('投票')
const tipButtonLabel = ref('去投票')
const tipButtonUrl = ref('https://gitee.com/my_spaces/wot-ui-plus')

async function loadTipFromJson() {
    try {
        const idxRes = await fetch('/json/tips.json', { cache: 'no-store' })
        if (!idxRes.ok) return
        const idx = await idxRes.json()
        const file = idx['support'] || 'tips-support.json'
        const tipsRes = await fetch(`/json/${file}`, { cache: 'no-store' })
        if (!tipsRes.ok) return
        const tips = await tipsRes.json()
        // pick first reason or description or title
        if (Array.isArray(tips.reasons) && tips.reasons.length > 0) {
            tipText.value = tips.reasons[0]
        } else if (tips.description) {
            tipText.value = tips.description
        } else if (tips.title) {
            tipText.value = tips.title
        }
            // set storage key from json if provided
            if (tips.tipsTopKey) storageKeyName.value = tips.tipsTopKey

            // prefer primary action for button label
            if (Array.isArray(tips.actions) && tips.actions.length > 0) {
                const primary = tips.actions.find((a: any) => a.type === 'primary' || a.type === 'success')
                const pick = primary || tips.actions[0]
                tipButtonLabel.value = pick.text || tipButtonLabel.value
                tipButtonUrl.value = pick.url || tipButtonUrl.value
            }
    } catch (e) {
        // ignore load errors
    }
}

function writeClosedToStorage() {
    try {
        if (storageKeyName.value) localStorage.setItem(storageKeyName.value, '1')
    } catch (e) {
        // ignore
    }
}

function setHtmlFlag(height = 0) {
    if (typeof document === 'undefined') return
    const html = document.documentElement
    if (height && height > 0) {
        html.classList.add('has-tips-top')
        html.style.setProperty('--vp-layout-top-height', `${height}px`)
    } else {
        html.classList.remove('has-tips-top')
        html.style.setProperty('--vp-layout-top-height', '0px')
    }
}

async function updateHtmlHeight() {
    await nextTick()
    const el = rootEl.value
    if (!el || typeof document === 'undefined') return
    const height = el.offsetHeight
    if (visible.value) setHtmlFlag(height)
}

onMounted(() => {
    // load tip content then check closed state and update html var when mounted
    loadTipFromJson().then(() => {
        if (readClosedFromStorage()) {
            visible.value = false
        } else {
            visible.value = true
        }
        updateHtmlHeight()
    }).catch(() => updateHtmlHeight())

    // update on resize
    if (typeof window !== 'undefined') {
        window.addEventListener('resize', updateHtmlHeight)
    }
})

onUnmounted(() => {
    if (typeof window !== 'undefined') {
        window.removeEventListener('resize', updateHtmlHeight)
    }
    // clear flag
    setHtmlFlag(0)
})

watch(visible, (v) => {
    if (v) {
        updateHtmlHeight()
    } else {
        setHtmlFlag(0)
    }
})

function closeBanner() {
    writeClosedToStorage()
    visible.value = false
}
</script>

<template>
    <div v-if="visible" ref="rootEl" class="tips-top" role="region" aria-label="公告横幅">
        <div class="tips-inner">
            <div class="tips-center">
                <div class="tips-left">
                    <svg class="icon" width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M12 2v4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path d="M12 18v4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path d="M4.93 4.93l2.83 2.83" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path d="M16.24 16.24l2.83 2.83" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.6" />
                    </svg>
                    <div class="tips-text" v-html="tipText"></div>
                </div>

                <div class="tips-actions">
                    <a class="vote-btn" :href="tipButtonUrl" target="_blank" rel="noopener noreferrer">{{ tipButtonLabel }}</a>
                </div>
            </div>

            <button class="close-btn" @click="closeBanner" aria-label="关闭公告">✕</button>
        </div>
    </div>
</template>

<style>
:root {
    --tips-bg-1: linear-gradient(90deg, #081229 0%, #0b2540 50%, #07213a 100%);
    --tips-accent: #00e6ff;
    --tips-text: #e6f7ff;
}

/* dark mode when html.class contains 'dark' */
html.dark {
    --tips-bg-1: linear-gradient(90deg, #02060a 0%, #031427 50%, #021824 100%);
    --tips-accent: #6ee7ff;
    --tips-text: #dff8ff;
}

.tips-top {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1100;
    width: 100%;
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    box-shadow: 0 6px 20px rgba(2, 6, 12, 0.12);
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
    overflow: hidden;
    animation: slideDownFade 520ms cubic-bezier(.2,.95,.18,1);
}

.tips-inner {
    margin: 0 auto;
    padding: 12px 20px;
    display: flex;
    align-items: center;
    justify-content: center; /* center content */
    gap: 12px;
    background: var(--tips-bg-1);
    color: var(--tips-text);
    background-size: 200% 100%;
    animation: gradientShift 6s linear infinite;
    box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.12);
    position: relative;
}

.tips-center {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding-right: 36px;
}

.tips-left {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
}

.tips-left .icon {
    color: var(--tips-accent);
    opacity: 0.95
}

.tips-left .icon {
    transform-origin: center;
    animation: iconFloat 2.6s ease-in-out infinite;
}

.tips-text {
    font-size: 16px;
    font-weight: 600;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 820px;
    color: var(--tips-text);
}

.tips-actions {
    display: flex;
    align-items: center;
    gap: 8px;
}

.vote-btn {
    min-width: 64px;
    background: linear-gradient(90deg, rgba(255,107,107,0.98), rgba(255,94,173,0.98));
    color: #fff;
    padding: 10px 16px;
    border-radius: 10px;
    text-decoration: none;
    font-weight: 800;
    box-shadow: 0 10px 30px rgba(255,94,173,0.08), 0 2px 8px rgba(0,0,0,0.12) inset;
    transform: translateZ(0) scale(1);
    transition: transform .18s ease, box-shadow .18s ease, filter .12s ease;
}

/* glowing ring and shine */
.vote-btn {
    position: relative;
    overflow: hidden;
}
.vote-btn::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) scale(0.96);
    width: 140%;
    height: 140%;
    border-radius: 12px;
    background: radial-gradient(circle at center, rgba(255,255,255,0.08), transparent 40%);
    filter: blur(10px);
    opacity: 0;
    transition: opacity .22s ease, transform .32s ease;
    pointer-events: none;
}
.vote-btn:hover::before { opacity: 0.95; transform: translate(-50%, -50%) scale(1.04); }

.vote-btn::after {
    content: '';
    position: absolute;
    left: -50%;
    top: -10%;
    width: 40%;
    height: 120%;
    background: linear-gradient(120deg, rgba(255,255,255,0.18), rgba(255,255,255,0.02), rgba(255,255,255,0.12));
    transform: skewX(-18deg);
    filter: blur(10px);
    opacity: 0.95;
    transition: left .85s cubic-bezier(.2,.8,.2,1);
}
.vote-btn:hover::after { left: 140%; transition: left .85s cubic-bezier(.2,.8,.2,1); }

.vote-btn.glow {
    animation: pulseGlowStrong 2.2s ease-in-out infinite;
}
.vote-btn.glow { box-shadow: 0 18px 44px rgba(255,94,173,0.12), 0 6px 18px rgba(123,0,255,0.06); }

.vote-btn:active { transform: scale(.98); }
.vote-btn:focus-visible { outline: 3px solid rgba(14,165,233,0.16); outline-offset: 2px; }

.vote-btn:hover {
    filter: brightness(1.05);
}

.close-btn {
    position: absolute; /* fixed to right */
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    font-size: 18px;
    cursor: pointer;
    color: rgba(255, 255, 255, 0.9);
    padding: 8px;
}

.close-btn:hover { transform: translateY(-50%) scale(1.06); color: #fff; }

/* neon accent line */
.tips-top::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -2px;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--tips-accent), transparent);
    opacity: 0.9;
    filter: blur(8px);
}

@keyframes gradientShift {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}

@keyframes slideDownFade {
    from { transform: translateY(-12px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}

@keyframes iconFloat {
    0% { transform: translateY(0) rotate(0deg); }
    20% { transform: translateY(-8px) rotate(-12deg); }
    50% { transform: translateY(6px) rotate(10deg); }
    80% { transform: translateY(-4px) rotate(-6deg); }
    100% { transform: translateY(0) rotate(0deg); }
}

@keyframes pulseGlow {
    0% { box-shadow: 0 6px 18px rgba(255,94,173,0.06); }
    50% { box-shadow: 0 14px 40px rgba(255,94,173,0.12); transform: translateY(-1px); }
    100% { box-shadow: 0 6px 18px rgba(255,94,173,0.06); }
}

@keyframes pulseGlowStrong {
    0% { box-shadow: 0 10px 28px rgba(255,94,173,0.08), 0 4px 12px rgba(123,0,255,0.04); }
    40% { box-shadow: 0 22px 62px rgba(255,94,173,0.18), 0 8px 28px rgba(123,0,255,0.08); transform: translateY(-2px); }
    100% { box-shadow: 0 10px 28px rgba(255,94,173,0.08), 0 4px 12px rgba(123,0,255,0.04); }
}

@media (prefers-reduced-motion: reduce) {
    .tips-top, .vote-btn::after, .vote-btn::before, .tips-left .icon { animation: none !important; transition: none !important; }
}

/* responsive */
@media (max-width: 760px) {
    .tips-inner {
        padding: 10px 12px;
    }

    .tips-text {
        font-size: 15px;
    }

    .vote-btn {
        padding: 7px 10px;
        font-size: 13px;
    }

}

/* small screens: allow wrapping */
@media (max-width: 420px) {
    .tips-inner {
        flex-direction: column;
        align-items: stretch;
        gap: 8px;
        padding: 10px 14px;
    }

    .tips-actions {
        justify-content: center;
        margin-top: 6px;
    }

    .tips-text {
        white-space: normal;
        overflow: visible;
        text-align: center;
        font-size: 14px;
    }

    .close-btn {
        right: 8px;
        top: 8px;
        transform: none;
    }
}
</style>
