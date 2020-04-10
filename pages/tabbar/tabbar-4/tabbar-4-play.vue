<template>
	<view>
		<span class='alertBox' ref='alertBox'>
			<iframe id="palybox" :src="iframeSrc" frameborder="0" scrolling="no" allowfullscreen="true" allowtransparency="true"
			 name='jx_play' width="100%" height="100%"></iframe>
		</span>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				playUrl: '',
				iframeSrc: 'https://www.lookpian.com/js/dplay.html?v=https://hong.tianzhen-zuida.com/20200122/19042_f3b50f37/index.m3u8'
			}
		},
		methods: {
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

			let url = sessionStorage.getItem("tabbar-4-iframeSrc");
			/* 
				this.playUrl = this.getUrlParam(url, "v") //获取url后面v对应的参数
				let player = "https://www.lookpian.com/js/dplay.html?v=" //播放器
				//let player = this.jks[0].url //切换播放器
				this.iframeSrc = player + this.playUrl;
				 */
			this.iframeSrc = url;

		},
		mounted() { //页面加载完成了
			//plus在电脑端会报错,打包到app以后就没事了
			// plus.screen.lockOrientation('landscape'); //横屏正方向或反方向，根据设备重力感应器自动调整；
			plus.screen.lockOrientation('default'); //它代表 portrait-primary 和 landscape-primary 主要取决于设备的自然方向

		},
		beforeDestroy() {
			plus.screen.lockOrientation('portrait-primary'); //竖屏正方向
		}
	}
</script>

<style>
	.alertBox {
		position: absolute;
		/*        right: 0;
            left: 0;
            z-index: 10000;
            opacity: 1; */
		width: 100%;
		height: 100%;
		/* margin: 0 auto; */
		/*0px;*/
		/*        border: 1px solid rgba(0, 0, 0, .2);
            border-radius: 6px; */
		background-color: #FFF;
		/* background-clip: padding-box; */
		/* box-shadow: 0 5px 10px rgba(0, 0, 0, 1); */

	}
</style>
