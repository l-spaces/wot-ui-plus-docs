<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import advList from './../../public/json/r-sponsor.json'
import axios from 'axios'

const data = ref<any[]>([])

const baseUrl = '/wot-ui-plus-docs/json/r-sponsor.json'

// 广告赞助商展示区域的不同尺寸规格
export type GridSize = 'xmini' | 'mini' | 'small' | 'medium' | 'big'

// 单个赞助商信息接口
export interface Sponsor {
    /** 赞助商名称 */
    name: string
    /** 赞助商logo图片URL */
    img: string
    /** 赞助商跳转链接 */
    url: string,
    /** 是否隐藏赞助商项（可选） */
    hidden?: boolean
}

// 赞助商集合接口
export interface Sponsors {
    /** 赞助商级别标识（可选） */
    tier?: string
    /** 展示网格尺寸（可选） */
    size?: GridSize
    /** 赞助商列表 */
    items: Sponsor[]
}

function linkMe() {
    window.open('https://gitee.com/my_spaces/wot-ui-plus')
}
// 获取广告列表
function fetchAdvList() {
    data.value = advList.data
    // axios.get(`${baseUrl}?updateAt=${Date.now()}`).then(({ data }) => {
    //     const {
    //         data: { list },
    //         code
    //     } = data
    //     if (code === 0) {
    //         advList.value = list
    //     }
    // })
}

// 分离超级赞助和金牌赞助
const superSponsors = computed(() => {
    return data.value?.find(sponsor => sponsor.tier === 'Platinum')
})

const goldSponsors = computed(() => {
    return data.value?.find(sponsor => sponsor.tier === 'Gold')
})

// 判断金牌赞助数量是否为奇数
const isGoldSponsorsOdd = computed(() => {
    return (goldSponsors.value?.items?.length || 0) % 2 === 1
})

onMounted(() => {
    fetchAdvList()
})
</script>

<template>
    <div class="VPDocAsideSponsors">
        <a class="sponsors-aside-text" href="/resource/donation">赞助商</a>
        <div class="VPSponsors vp-sponsor">

            <section class="vp-sponsor-section" v-if="superSponsors?.items.length">
                <div class="VPSponsorsGrid vp-sponsor-grid mini" data-vp-grid="1">
                    <div class="vp-sponsor-grid-item" v-for="sponsor in superSponsors.items" :key="sponsor.name">
                        <a class="vp-sponsor-grid-link" :href="sponsor.url" target="_blank" rel="sponsored noopener">
                            <article class="vp-sponsor-grid-box">
                                <h4 class="visually-hidden">{{ sponsor.url }}</h4>
                                <img v-if="sponsor.img" class="vp-sponsor-grid-image" :src="sponsor.img"
                                    :alt="sponsor.name">
                                <span v-else class="vp-sponsor-grid-text">{{ sponsor.name }}</span>
                            </article>
                        </a>
                    </div>
                </div>
            </section>

            <section class="vp-sponsor-section" v-if="goldSponsors?.items.length">
                <div class="VPSponsorsGrid vp-sponsor-grid xmini" data-vp-grid="2">
                    <div class="vp-sponsor-grid-item" v-for="sponsor in goldSponsors.items" :key="sponsor.name">
                        <a class="vp-sponsor-grid-link" :href="sponsor.url" target="_blank" rel="sponsored noopener">
                            <article class="vp-sponsor-grid-box">
                                <h4 class="visually-hidden">{{ sponsor.name }}</h4>
                                <img v-if="sponsor.img" class="vp-sponsor-grid-image" :src="sponsor.img"
                                    :alt="sponsor.name">
                                <span v-else class="vp-sponsor-grid-text">{{ sponsor.name }}</span>
                            </article>
                        </a>
                    </div>

                    <div class="vp-sponsor-grid-item" v-if="isGoldSponsorsOdd">
                        <a class="vp-sponsor-grid-link" href="/resource/donation" rel="sponsored noopener">
                            <article class="vp-sponsor-grid-box">
                                <span class="vp-sponsor-grid-text">成为赞助商</span>
                            </article>
                        </a>
                    </div>
                </div>
            </section>

            <section class="vp-sponsor-section" v-if="!isGoldSponsorsOdd || !goldSponsors?.items.length">
                <div class="VPSponsorsGrid vp-sponsor-grid xmini" data-vp-grid="1">
                    <div class="vp-sponsor-grid-item">
                        <a class="vp-sponsor-grid-link" href="/resource/donation" rel="sponsored noopener">
                            <article class="vp-sponsor-grid-box">
                                <span class="vp-sponsor-grid-text">成为赞助商</span>
                            </article>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
<style>
.vp-sponsor-grid-text {
    color: var(--vp-c-text-2);
    font-size: 12px;
}

.dark .vp-sponsor-grid-text {
    color: var(--vp-c-gray-1);
}

.vp-sponsor-grid-image {
    max-width: 120px;
    max-height: 72px !important;
    filter: none !important;
}

a.sponsors-aside-text {
    color: var(--vp-c-text-3);
    display: block;
    margin: 2em 0 1em;
    font-weight: 700;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.4px;
}
</style>