
/**
 * 颜色选择器
 */
<template>
	<div class="picker">
		<div
			class="picker__item"
			:style="{
				backgroundColor: value,
				color: color
			}"
		>
			<div class="picker__item__name">{{ name }}</div>
			<div class="picker__item__value">{{ value }}</div>
		</div>
		<el-row class="picker__tool" type="flex" justify="space-between">
			<el-col :span="15"><el-input class="picker__input" readonly :placeholder="value"></el-input></el-col>
			<el-col :span="9" class="picker__tool__picker"><el-color-picker @change="change" v-model="pickerColor"></el-color-picker></el-col>
		</el-row>
	</div>
</template>

<script setup lang="ts">
// 颜色选择器组件，支持显示名称、当前颜色值，并通过el-color-picker选择颜色
import { ref, watch } from 'vue'

// 组件props定义
const props = defineProps({
  color: {
    type: String,
    default: '#ffffff'
  },
  bgColor: {
    type: String,
    default: '#2979ff'
  },
  name: {
    type: String,
    default: ''
  },
  value: {
    type: String,
    default: ''
  }
})

// pickerColor为el-color-picker的绑定值，初始为value
const pickerColor = ref(props.value)

// 监听外部value变化，保持pickerColor同步
watch(() => props.value, (val) => {
  pickerColor.value = val
})

// 颜色选择变化时触发，向父组件派发事件
function change(e: string) {
  // 统一小写，便于样式处理
  emit('update:modelValue', e.toLowerCase())
}

// 事件派发
const emit = defineEmits(['update:modelValue'])
</script>

<style lang="scss" scoped>
.picker {
	margin: 1rem 0;

	&__item {
		border-radius: 5px;
		padding: 1.1rem;

		&__name {
			font-size: 16px;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}

		&__value {
			font-size: 12px;
			margin-top: 8px;
			opacity: 0.8;
		}
	}

	&__tool {
		margin-top: 10px;

		&__picker :deep(.el-color-picker__trigger) {
			height: 35px;
		}

		&__picker {
			text-align: right;
		}
	}

	&__input :deep(input) {
		cursor: pointer;
		height: 35px;
		padding: 0 10px;
	}
}
</style>
