<template>
	<view>
		<div class="polaroid" @click="jxust_class">
			<img src="../../../static/other/jxust/class.jpg" style="width: 100%; height:80%; background-color: #0099FF; ">
			<div class="container">
				<p>课程表</p>
			</div>
		</div>
		<div class="polaroid" style="float: right;" @click="more">
			<img src="../../../static/other/jxust/loginGif.gif" style="width: 100%; height:80%; background-color: #0099FF; ">
			<div class="container">
				<p>更多...</p>
			</div>
		</div>

	</view>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	export default {
		data() {
			return {

			}
		},
		methods: {
			jxust_class() { //jxust_class	
				if (sessionStorage.getItem("jxust_login_session") != null
				||localStorage.getItem("jxust_classeList_local")!=null) {
					//已登录,或者有缓存,可以直接跳转
					uni.navigateTo({
						url: '/pages/tabbar/tabbar-2/tabbar-2-list/tabbar-2-class'
					});
				} else {
					//未登录,且没有缓存,跳转到登录页面
					let gotoUrl = '/pages/tabbar/tabbar-2/tabbar-2-list/tabbar-2-class';
					uni.navigateTo({
						url: '/pages/tabbar/tabbar-2/tabbar-2?gotoUrl=' + gotoUrl
					})

				}
			},
			more(){
				MessageBox('补考进行时...', '更多功能,将推迟.....');
				
				}

		},
		created() {


		}
	}
</script>

<style>
	/*  */
	.polaroid {

		width: 40%;
		height: 180px;
		margin: 25px;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
		text-align: center;
		display: inline-block;
		background-color: #ddd;
	}

	.container {

		background-color: #ddd;
		padding: 5px;
	}
</style>
