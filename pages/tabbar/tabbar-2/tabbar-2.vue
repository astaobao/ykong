<template>
	<view class="content main">

		<mt-field class="textarea" type="textarea" rows="7" placeholder="请输入你需要查询的题目" v-model="introduction"></mt-field>
		<mt-button type="primary" @click.native="query" style="margin-top: 30px;" size="large">查询</mt-button>
		<mt-button type="danger" @click.native="clear" style="margin-top: 10px;" size="large">清空</mt-button>
		<mt-popup v-model="popupVisible" class='popupOne' position="right" lockScroll="false">
			<div class="btn">
				内容
			</div>
		</mt-popup>

	</view>
</template>

<script>

	import {
		Indicator
	} from 'mint-ui';
    import { Toast } from 'mint-ui';
	export default {
		data() {
			return {
				popupVisible: false,
				introduction: ""
			}
		},
		onLoad() {
		
		},
		methods: {
			goToPage(url) {
				if (!url) return;
				uni.navigateTo({
					url
				});
			},
			query() {
				if (this.introduction.match(/^[ ]*$/)) {
					Toast("搜索内容不为空");
					return;
				}
				
				Indicator.open();  //加载提示框
				
			    var select="数据结构";
				var params = new URLSearchParams(); //和qs.stringify()的功能一样,但推荐使用qs
				params.append('course', encodeURIComponent(select)); //科目
				params.append('type', '4'); //什么都不选就是返回选择题
				this.$axios.post("http://mooc.forestpolice.org/cx/0/" + encodeURIComponent(this.introduction), params, {
					headers: {
						'Content-type': 'application/x-www-form-urlencoded'
					}
				},{timeout: 6000}).then(res => {
					 Indicator.close(); //关闭加载提示
					if (res.data.code == 1) {
						this.goToPage('/pages/tabbar/tabbar-2/tabbar-2-massage')
						 sessionStorage.setItem("tabbar-2-answer", res.data.data);
						//console.log(res.data.data);
					}
					else Toast("未找到答案");
					
				}).catch(error => {
				    Indicator.close(); //关闭加载提示
					Toast("请求失败,请检查网络是否正常");
				});
			},
			clear() {
				this.introduction="";
			}
		}
	}
</script>

<style scoped>
	.content {
		text-align: center;
		/* height: 400upx; */
		margin-top: 150upx;
	}

	.main {
		position: absolute;
		top: 0%;
		left: 5%;
		width: 90%;
		font-size: 0;
	}

	.content-title {
		color: #333;
		font-weight: bold;
		font-size: 28px;
		letter-spacing: 3px;
		padding-bottom: 40px;
	}

	.textarea {
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		margin: 0px;
		font-variant: tabular-nums;
		list-style: none;
		-webkit-font-feature-settings: 'tnum';
		font-feature-settings: 'tnum';
		position: relative;
		display: inline-block;
		width: 100%;
		/* height: 200px; */
		padding: 4px 11px;
		color: rgba(0, 0, 0, 0.65);
		font-size: 14px;
		line-height: 1.5;
		background-color: #fff;
		background-image: none;
		border: 1px solid #d9d9d9;
		border-radius: 4px;
		-webkit-transition: all .3s;
		transition: all .3s;
	}

	.textarea:focus {
		border-color: #40a9ff;
		border-right-width: 1px !important;
		outline: 0;
		-webkit-box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
		box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
	}

	.textarea::placeholder {
		color: rgb(191, 191, 191);
	}
</style>
