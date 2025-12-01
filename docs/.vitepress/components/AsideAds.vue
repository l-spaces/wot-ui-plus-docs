/**
* 首页 侧边栏广告
*/
<script setup lang="ts">
import { computed, ref } from 'vue'


const data = ref([
    {
        "tier": "Platinum",
        "size": "large",
        "items": [
            {
                "name": "wot-ui-plus",
                "img": "",
                "url": "https://github.com/anyup/wot-ui-plus"
            },
        ]
    },
    {
        "tier": "Gold",
        "size": "large",
        "items": [
            {
                "name": "wot-ui-plus",
                "img": "",
                "url": "https://github.com/anyup/wot-ui-plus"
            },
        ]
    }
])

// 分离超级赞助和金牌赞助
const superSponsors = computed(() => {
    return data.value?.find(sponsor => sponsor.tier === 'Platinum')
})

// 金牌赞助
const goldSponsors = computed(() => {
    return data.value?.find(sponsor => sponsor.tier === 'Gold')
})

// 判断金牌赞助数量是否为奇数
const isGoldSponsorsOdd = computed(() => {
    return (goldSponsors.value?.items?.length || 0) % 2 === 1
})
</script>

<template>
    <div class="VPDocAsideSponsors">
        <a class="sponsors-aside-text" href="/reward/sponsor">赞助位</a>
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

            <!-- <section class="vp-sponsor-section" v-if="goldSponsors?.items.length">
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
                        <a class="vp-sponsor-grid-link" href="/reward/sponsor" rel="sponsored noopener">
                            <article class="vp-sponsor-grid-box">
                                <span class="vp-sponsor-grid-text">成为赞助商</span>
                            </article>
                        </a>
                    </div>
                </div>
            </section> -->

            <section class="vp-sponsor-section">
                <div class="VPSponsorsGrid vp-sponsor-grid xmini" data-vp-grid="1">
                    <div class="vp-sponsor-grid-item">
                        <a class="vp-sponsor-grid-link" href="/reward/sponsor" rel="sponsored noopener">
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