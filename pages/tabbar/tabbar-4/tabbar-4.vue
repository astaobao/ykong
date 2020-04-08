<template>
	<view>

		<div class="content">
			<div class="search bar6">
				<form>
					<input type="text" placeholder="请输入您要搜索的内容..." v-model="searchword">
					<button type="submit" @click="search"></button>
				</form>
			</div>
		</div>
		</br>
		</br>
		<h1 style="text-align: center;" class='text'>搜你所想</h1>
		</br>

		<mt-swipe :auto="4000" class='mtswipe' style="height: 230px;">
			<mt-swipe-item> <img src="../../../static/other/Tencent.jpg"> </mt-swipe-item>
			<mt-swipe-item> <img src="../../../static/other/aqiyi.jpg"> </mt-swipe-item>
			<mt-swipe-item> <img src="../../../static/other/youku.jpg"> </mt-swipe-item>
			<mt-swipe-item> <img src="../../../static/other/all.jpg"> </mt-swipe-item>
		</mt-swipe>


		<!-- <div class="box"> <img src="/static/other/encouragement.jpg"> 这里是居中的文字</div> -->
	</view>
</template>

<script>
	import {
		Indicator
	} from 'mint-ui';
	import {
		Toast
	} from 'mint-ui';

	export default {
		data() {
			return {
				searchword: ''
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
			search() {

				if (this.searchword.match(/^[ ]*$/)) {
					Toast({
						message: "搜索内容不为空",
						position: 'top'
					});
					return;
				}

				function video(playUrl, name, imageUrl, focus, latestOrder) { //声明对象
					this.playUrl = playUrl;
					this.name = name;
					this.imageUrl = imageUrl;
					this.focus = focus;
					this.latestOrder = latestOrder;
				}

				Indicator.open(); //加载提示框
				let videosList = [];
				//发送post请求,向https://www.lookpian.com搜索数据
				this.$axios.post("https://www.lookpian.com/search.php",
					this.$qs.stringify({
						'searchword': this.searchword
					}), {
						headers: {
							'Content-type': 'application/x-www-form-urlencoded'
						}
					}, {
						timeout: 6000
					}).then(resp => {

					Indicator.close(); //关闭加载提示

					let $ = this.$cheerio.load(resp.data, {
						_useHtmlParser2: true
					}); //将获取的整个页面,这里的$就相当于整个页面

					let hrefLis = $('div.hy-main-content .head'); //和jquery里的选择器是一样的
					let imgLis = $('.videopic.lazy');
					let noteLis = $('.note.textbg');
					let num = '';
					for (let i = 0; i < hrefLis.length; i++) {
						num = noteLis.eq(i).text();
						let n = Number(num); //将字符串转化为数字
						if (!isNaN(n)) {
							num = "全" + num + "集"
						}
						videosList.push(new video(hrefLis.eq(i).find("h3 a").attr("href") //电影播放地址
							, hrefLis.eq(i).find("h3 a").text() //电影名字
							, imgLis.eq(i).attr("data-original") //电影图片
							, "" //简介
							, num //播放级数
						));
					}

					sessionStorage.setItem("videosList", JSON.stringify(videosList));

					this.goToPage('/pages/tabbar/tabbar-4/tabbar-4-list/tabbar-4-list')

				}).catch(err => {
					Indicator.close(); //关闭加载提示
					console.log(err);
				});


			}

		}
	}
</script>

<style scoped>
	.content {
		margin-top: 10%;
		padding: 0;
		/* background: #494A5F; */
		font-weight: 500;
		font-family: "Microsoft YaHei", "宋体", "Segoe UI", "Lucida Grande", Helvetica, Arial, sans-serif, FreeSans, Arimo;
	}

	.text {
		width: 300px;
		height: 200px;
		position: absolute;
		left: 50%;
		margin-left: -150px;
		background-image: -webkit-linear-gradient(left, blue, #66ffff 10%, #cc00ff 20%, #CC00CC 30%, #CCCCFF 40%, #00FFFF 50%, #CCCCFF 60%, #CC00CC 70%, #CC00FF 80%, #66FFFF 90%, blue 100%);
		-webkit-text-fill-color: transparent;
		/* 将字体设置成透明色 */
		-webkit-background-clip: text;
		/* 裁剪背景图，使文字作为裁剪区域向外裁剪 */
		-webkit-background-size: 200% 100%;
		-webkit-animation: masked-animation 4s linear infinite;
		font-size: 35px;
	}

	/* 
	.box {
		width: 90%;
		text-align: center;
		font-szie: 18px;
	}

	.box img {
		margin-left: 10%;
		width: 90%;
	}
 */
	.mtswipe {
		/* height: 70%; */
		margin: 10px;
		margin-top: 40px;
		text-align: center;
		font-szie: 18px;


	}

	.mtswipe img {
		width: 96%;
		height: 96%;
		border: solid 4px rgb(0, 0, 0);
	}

	form {
		margin: 0 auto;
	}

	input,
	button {
		border: none;
		outline: none;
	}

	input {
		width: 75%;
		height: 42px;
		/* margin-left: 8px; */
		padding-left: 13px;
		padding-right: 25px;
	}

	button {
		height: 46px;
		width: 70px;
		margin-right: 7px;
		cursor: pointer;
		position: absolute;
	}



	/*搜索框6*/
	.bar6 {
		background: #F9F0DA;
		width: 94%;
		margin-left: 8px;
	}

	.bar6 input {
		border: 2px solid #c5464a;
		border-radius: 5px;
		background: transparent;
		top: 0;
		right: 0;
	}

	.bar6 button {
		background: #c5464a;
		border-radius: 0 5px 5px 0;
		/* width: 60px; */
		top: 0;
		right: 0;
	}

	.bar6 button:before {
		content: "搜索";
		font-size: 13px;
		color: #F9F0DA;
	}
</style>
