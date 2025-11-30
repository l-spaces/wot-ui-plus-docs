
/**
 * 图标列表
 */
<template>
	<el-row class="icon-box" :gutter="0">
		<el-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4" v-for="(item, index) in iconList" :key="index">
			<div class="item">
				<i class="iconfont" :class="['uicon-' + item]"></i>
				<div class="name">{{ item }}</div>
			</div>
		</el-col>
	</el-row>
</template>

<script setup lang="ts">
// 图标列表组件，展示所有可用iconfont图标
import { ref } from 'vue'

// 图标名称列表（压缩版）
const iconList = ref([
  'level','woman','man','arrow-left-double','arrow-right-double','chat','chat-fill','red-packet','red-packet-fill','order','checkbox-mark','arrow-up-fill','arrow-down-fill','backspace','photo','photo-fill','lock','lock-fill','lock-open','lock-opened-fill','hourglass','hourglass-half-fill','home','home-fill','fingerprint','cut','star','star-fill','share','share-fill','volume-up','volume-up-fill','volume-off','volume-off-fill','trash','trash-fill','rewind-right','rewind-right-fill','rewind-left','rewind-left-fill','shopping-cart','shopping-cart-fill','question','question-circle','question-circle-fill','plus','plus-circle','plus-circle-fill','tags','tags-fill','pause','pause-circle','pause-circle-fill','play-circle','play-circle-fill','map','map-fill','phone','phone-fill','list','list-dot','man-delete','man-add','man-add-fill','person-delete-fill','info','info-circle','info-circle-fill','minus','minus-circle','minus-circle-fill','mic','mic-off','grid','grid-fill','eye','eye-fill','eye-off','file-text','file-text-fill','edit-pen','edit-pen-fill','email','email-fill','download','checkmark','checkmark-circle','checkmark-circle-fill','clock','clock-fill','close','close-circle','close-circle-fill','calendar','calendar-fill','car','car-fill','bell','bell-fill','bookmark','bookmark-fill','attach','play-right','play-right-fill','play-left','play-left-fill','error','error-circle','error-circle-fill','wifi','wifi-off','skip-back-left','skip-forward-right','search','setting','setting-fill','volume','volume-fill','more-dot-fill','more-circle','more-circle-fill','bag','bag-fill','arrow-upward','arrow-downward','arrow-leftward','arrow-rightward','arrow-up','arrow-down','arrow-left','arrow-right','rmb','rmb-circle','rmb-circle-fill','thumb-up','thumb-up-fill','thumb-down','thumb-down-fill','coupon','coupon-fill','kefu-ermai','server-fill','server-man','scan','warning','warning-fill','google','google-circle-fill','chrome-circle-fill','ie','IE-circle-fill','github-circle-fill','android-fill','android-circle-fill','apple-fill','camera','camera-fill','pushpin','pushpin-fill','minus-square-fill','plus-square-fill','heart','heart-fill','reload','account','account-fill','minus-people-fill','plus-people-fill','integral','integral-fill','zhihu','zhihu-circle-fill','gift','gift-fill','zhifubao','zhifubao-circle-fill','weixin-fill','weixin-circle-fill','twitter','twitter-circle-fill','taobao','taobao-circle-fill','weibo','weibo-circle-fill','qq-fill','qq-circle-fill','moments','moments-circel-fill','qzone','qzone-circle-fill','facebook','facebook-circle-fill','baidu','baidu-circle-fill','zhuanfa'
])
</script>

<style scoped>
/* @import url("//at.alicdn.com/t/font_1529455_adug8z8qzbi.css"); */
@import url('/styles/iconfont.css');

.icon-box {
	display: flex;
	flex-wrap: wrap;
	border-left: 1px solid #eaeefb;
	border-top: 1px solid #eaeefb;
	margin-top: 20px;
}

.item {
	flex: 0 0 16.666666666666668%;
	text-align: center;
	color: #666;
	font-size: 13px;
	border-right: 1px solid #eaeefb;
	border-bottom: 1px solid #eaeefb;
	padding: 0 5px;
	height: 120px;
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	box-sizing: border-box;
}

.item .iconfont {
	font-size: 28px;
	color: #606266;
}

.item .name {
	font-size: 15px;
	margin-top: 10px;
}
</style>
