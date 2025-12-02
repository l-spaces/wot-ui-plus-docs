/** * 捐赠 */
<template>
  <div>
    开发一个多端适配的 UI 框架是一项庞大的工程，尤其需要持续跟进 uni-app
    官方的更新。wot-ui-plus 作者常常为此加班到深夜，只为给开发者带来更好的体验。
    <br />
    <br />
    wot-ui-plus 文档和源码全部开源免费。如果 wot-ui-plus
    对您的开发工作有所帮助，欢迎捐赠支持项目持续维护与更新。捐赠金额不限，哪怕是一杯可乐，也能带来莫大的鼓励！
    <el-row :gutter="20">
      <el-col :md="8" :sm="12" :xs="24">
        <div class="sponsor-type">
          <img src="" />
        </div>
      </el-col>
      <el-col :md="8" :sm="12" :xs="24">
        <div class="sponsor-type">
          <img src="" />
        </div>
      </el-col>
    </el-row>

    下方为历史捐赠者名单，无论金额多少，我们都心怀感激，感谢您的支持！
    <br />
    如有遗漏，请及时联系我们，我们会尽快补充。

    <br />
    <br />

    <!-- <div class="table-header">
      <el-select
        v-model="order"
        placeholder="排序方式"
        size="small"
        @change="fetchDonationList"
      >
        <el-option label="按日期排序" value="donationDate"></el-option>
        <el-option label="按金额排序" value="amount"></el-option>
      </el-select>
    </div> -->

    <el-table :data="donationList" border size="small">
      <el-table-column prop="name" label="昵称" />
      <!-- <el-table-column prop="avatar" label="头像">
        <template #default="scope">
          <el-avatar
            v-if="scope.row.avatar"
            :src="scope.row.avatar"
            :size="30"
          ></el-avatar>
          <span v-else>--</span>
        </template>
      </el-table-column> -->
      <el-table-column prop="amount" label="金额(元)" />
      <el-table-column prop="donationDate" label="日期" />
      <el-table-column prop="platform" label="平台">
        <template #default="scope">
          <span v-if="scope.row.platform === 'wechat'">微信</span>
          <span v-else-if="scope.row.platform === 'alipay'">支付宝</span>
          <span v-else-if="scope.row.platform === 'dcloud'">DCloud</span>
          <span v-else>其他</span>
        </template>
      </el-table-column>
      <el-table-column prop="comment" label="留言">
        <template #default="scope">
          <span>{{ scope.row.comment || '--' }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
// 捐赠者名单展示组件，支持历史捐赠者列表展示
import { ref, onMounted } from 'vue'
import axios from 'axios'

interface Donation {
  amount: number
  avatar: string
  comment: string
  donationDate: Date
  name: string
  platform: string
}

// 云端静态资源基础地址
const baseUrl = (import.meta as any).env.VITE_BASE_URL || '/json'
// 捐赠者列表数据
const donationList = ref<Donation[]>([])
// 排序方式（可扩展）
const order = ref('donationDate')

// 获取捐赠者列表
function fetchDonationList() {
  axios
    .get(`${baseUrl}/donation.json?updateAt=${Date.now()}`)
    .then(({ data }) => {
      const {
        data: { list },
        code
      } = data
      if (code === 0) {
        donationList.value = list
      }
    })
}

// 页面加载时获取数据
onMounted(() => {
  fetchDonationList()
})
</script>

<style scoped>
.sponsor-type {
  width: 100%;
  text-align: center;
  margin: 30px 0;
  display: inline-block;
}

.sponsor-type img {
  max-width: 200px;
  display: inline-block;
}

.table-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}

:deep(td),
:deep(th),
:deep(tr) {
  border: none;
}

:deep(table) {
  margin: 0;
}
</style>
