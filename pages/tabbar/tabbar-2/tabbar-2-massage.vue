<template>
	<view>
		<div class="message">
		{{answer}}
		</div>
	</view>
</template>
<!--   顺序队的“假溢出”是怎样产生的？如何知道循环队列是空还是满？ -->
<script>
	export default {
		data() {
			return {
				answer: ''
			}
		},
		methods: {

		},
		created() {
			this.answer =sessionStorage.getItem("tabbar-2-answer");
		}
	}
</script>

<style scoped>
	.message {
		margin: 20px;
		margin-top: 30px;

	}
</style>
