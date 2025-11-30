
/**
 * 开发者
 */
<template>
  <div>
    <div
      class="member-item"
      v-for="(item, index) in developerList"
      :key="index"
    >
      <div class="member-item__avatar">
        <img :src="`${item.avatar}`" />
      </div>
      <div class="member-item__info">
        <div class="member-item__name">{{ item.nickname }}</div>
        <div class="member-item__tag">
          <div class="member-item__tag__item" v-if="item.position">
            {{ item.position }}
          </div>
          <div class="member-item__tag__split" v-if="item.city">·</div>
          <div class="member-item__tag__item" v-if="item.city">
            {{ item.city }}
          </div>
          <template v-for="skill in item.skills">
            <div class="member-item__tag__split" v-if="skill.tag === 'github'">
              ·
            </div>
            <div class="member-item__tag__item" v-if="skill.tag === 'github'">
              <a :href="skill.url" target="_blank">
                <span class="iconfont">&#xe64a;</span>
              </a>
            </div>
            <div class="member-item__tag__split" v-if="skill.tag === 'uniapp'">
              ·
            </div>
            <div class="member-item__tag__item" v-if="skill.tag === 'uniapp'">
              <a :href="skill.url" target="_blank">
                <span class="iconfont">&#xe609;</span>
              </a>
            </div>
            <div class="member-item__tag__split" v-if="skill.tag === 'gitee'">
              ·
            </div>
            <div class="member-item__tag__item" v-if="skill.tag === 'gitee'">
              <a :href="skill.url" target="_blank">
                <span class="iconfont">&#xe600;</span>
              </a>
            </div>
            <div class="member-item__tag__split" v-if="skill.tag === 'csdn'">
              ·
            </div>
            <div class="member-item__tag__item" v-if="skill.tag === 'csdn'">
              <a :href="skill.url" target="_blank">
                <span class="iconfont">&#xe601;</span>
              </a>
            </div>
            <div class="member-item__tag__split" v-if="skill.tag === 'link'">
              ·
            </div>
            <div class="member-item__tag__item" v-if="skill.tag === 'link'">
              <a :href="skill.url" target="_blank">
                <span class="iconfont">&#xe67b;</span>
              </a>
            </div>
          </template>
        </div>
        <div class="member-item__job" v-if="item.duty">
          职责：{{ item.duty }}
        </div>
        <div class="member-item__intro" v-if="item.introduction">
          介绍：{{ item.introduction }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// wot-ui-plus开发者团队成员展示组件
import axios from 'axios'
import { ref, onMounted } from 'vue'
const props = defineProps({
  type: {
    type: Number,
    default: 0
  }
})

interface Skill {
  tag?: string
  url?: string
}
interface Member {
  avatar?: string
  nickname?: string
  position?: string
  introduction?: string
  duty?: string
  city?: string
  skills?: Skill[]
  type?: number
  isActive?: boolean
  sort?: number
}

const developerList = ref<Member[]>([])

const baseUrl = (import.meta as any).env.VITE_BASE_URL || '/json'

// 获取广告列表
function fetchDeveloperList() {
  axios
    .get(`${baseUrl}/developers.json?updateAt=${Date.now()}`)
    .then(({ data }) => {
      const {
        data: { list },
        code
      } = data
      if (code === 0) {
        developerList.value = list.filter(
          (item: any) => item.type === props.type
        )
      }
    })
}

onMounted(() => {
  fetchDeveloperList()
})
</script>

<style scoped lang="scss">
@font-face {
  font-family: 'doc-iconfont';
  /* project id 1839347 */
  src: url('//at.alicdn.com/t/font_1839347_q72yio5zage.ttf') format('truetype');
}

.iconfont {
  font-family: 'doc-iconfont' !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.member-item {
  background-color: rgb(242, 242, 242);
  display: flex;
  padding: 20px;
  border-radius: 5px;
  margin-top: 25px;
  max-width: 1200px;

  &__avatar {
    height: 100px;
    flex: 0 0 100px;
    width: 100px;

    img {
      width: 100%;
      border-radius: 4px;
    }
  }

  &__info {
    margin-left: 20px;
  }

  &__name {
    color: #333;
    font-weight: bold;
    font-size: 16px;
    margin-top: 5px;
  }

  &__tag {
    display: flex;
    color: #999;
    font-size: 15px;
    margin-top: 5px;
    align-items: center;

    &__split {
      font-size: 20px;
      margin: 0 7px;
      color: #000;
    }
  }

  &__job {
    color: #555;
    font-size: 15px;
    margin-top: 7px;
  }

  &__intro {
    color: #666;
    font-size: 14px;
    margin-top: 7px;
  }
}

@media screen and (max-width: 768px) {
  .member-item {
    &__avatar {
      width: 50px;
      height: 50px;
      flex: 0 0 50px;
    }

    &__info {
      margin-left: 10px;
    }

    &__name {
      margin-top: 0;
    }

    &__intro,
    &__job {
      font-size: 13px;
      line-height: 1.7;
    }
  }
}
</style>
