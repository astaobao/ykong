<template>
	<view>
		<mt-cell v-if="history>=1" class="mt-cell-class" :title="'播放到 第'+history+'集'"></mt-cell>
		<mt-cell title="请选择" class="mt-cell-class" v-else>

		</mt-cell>
		<ul style="width: 88%;margin-right: 20px;">
			<li v-for="(item, index)  in playList" :key="index">
				<mt-button type="default" @click="byUrlPlay(item.playUrl,item.label,index)" style="width:100%;">
					{{index+1}}
				</mt-button>
			</li>
		</ul>

	</view>
</template>

<script>
	import {
		Indicator
	} from 'mint-ui';
	export default {
		data() {
			return {
				popupVisible: false,
				history: 0,
				playList: [

				]
			}
		},
		methods: {
			goToPage(url) {
				if (!url) return;
				uni.navigateTo({
					url
				});
			},
			setVisible() {
				console.log(this.popupVisible)
				this.popupVisible = true;

			},
			byUrlPlay(playUrl, label,index) {
				this.history = index+1; //记忆播放到第几集 
				
				this.dialogPlay(playUrl, label);

			},
			dialogPlay(playUrl) {
				//playUrl: '/dalu/sanshengsanshizhenshangshu/play-0-0.html'
	            Indicator.open(); //加载提示框
				//发送get请求,向https://www.lookpian.com搜索数据
				this.$axios.get("http://www.goodpian.com" + playUrl).then(resp => {
					
					Indicator.close(); //关闭加载提示
					 
					let $ = this.$cheerio.load(resp.data, {
						_useHtmlParser2: true
					}); //将获取的整个页面,这里的$就相当于整个页面
					let iframeSrc = $('.info.clearfix').find('iframe').attr('src');
	                
					iframeSrc = 'http://www.goodpian.com' + iframeSrc;


					let list = JSON.parse(sessionStorage.getItem("tabbar-4-video-msg-select"))
					list.playUrl = iframeSrc;

					list["playLabel"] = this.history; //给list添加播放集数

					var videoPlayUrl = this.getUrlParam(list.playUrl, "v") //获取url后面v对应的参数

					if (videoPlayUrl == '') { //跳转到老页面
						sessionStorage.setItem("tabbar-4-iframeSrc", iframeSrc);
						this.goToPage('/pages/tabbar/tabbar-4/tabbar-4-play')
					
					} else {
						list.playUrl = videoPlayUrl; //将处理后的m3u8真实路径传下去
						localStorage.setItem("tabbar-4-video-msg", JSON.stringify(list)); //储存视频信息
						this.goToHybrid(); //跳转到外部路径  hybrid-->html

					} 


				}).catch(err => {
					Indicator.close(); //关闭加载提示
					console.log("出现错误");
					
				});


			},
			goToHybrid() {
				var url = window.location.origin + window.location.pathname;
				var index = url.lastIndexOf("\/");
				//获取前半部分
				var strPre = url.substring(0, index);
				var playUrl = strPre + "/hybrid/html/play.html";


				//相当于window.location.href,但返回效果更好,传信息要使用 localStorage
				var w = plus.webview.create(playUrl);
				w.show(); //显示窗口

			},
			getUrlParam(url, paras) {
				//var url = location.href;
				var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
				var paraObj = {};

				for (var j = 0; j = paraString[j]; j++) {
					paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
				}

				var returnValue = paraObj[paras.toLowerCase()];
				if (typeof(returnValue) == "undefined" || returnValue == "undefined") {
					return "";
				} else {
					return returnValue;
				}
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: sessionStorage.getItem("tabbar-4-name")
			})
		},
		created() { //此时data已经初始化完成
			this.playList = JSON.parse(sessionStorage.getItem("tabbar-4-playList"));
			

		},
		beforeDestroy() {
			Indicator.close(); //关闭加载提示
		}
	}
</script>

<style>
	li {
		float: left;
		width: 13%;
		margin: 8px;
		list-style: none;
		/* 去掉小点*/
	}

	.mt-cell-class {
		background-color: #ffff7f;
		margin-bottom: 15px;
	}
</style>
