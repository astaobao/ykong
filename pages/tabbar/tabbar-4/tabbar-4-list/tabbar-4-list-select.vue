<template>
	<view>
		<mt-cell v-if="history>1" class="mt-cell-class" :title="'历史播放 第'+history+'集'"></mt-cell>
		<mt-cell title="请选择" class="mt-cell-class" v-else>
		
		</mt-cell>
		<ul style="width: 88%;margin-right: 20px;">
			<li v-for="(item, index)  in playList" :key="index">
				<mt-button type="default" @click="byUrlPlay(item.playUrl,item.label)" 
				style="width:100%;">
					{{index+1}}
				</mt-button>
			</li>
		</ul>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				popupVisible: false,
				history: 1,
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
					this.popupVisible =true; 

			},
			byUrlPlay(playUrl, label) {

				sessionStorage.setItem(playUrl, label);
				this.dialogPlay(playUrl);

			},
			dialogPlay(playUrl) {
				//playUrl: '/dalu/sanshengsanshizhenshangshu/play-0-0.html'

				//发送get请求,向https://www.lookpian.com搜索数据
				this.$axios.get("https://www.lookpian.com" + playUrl).then(resp => {
					let $ = this.$cheerio.load(resp.data, {
						_useHtmlParser2: true
					}); //将获取的整个页面,这里的$就相当于整个页面
					let iframeSrc = $('.info.clearfix').find('iframe').attr('src');

					iframeSrc = 'https://www.lookpian.com' + iframeSrc;


					sessionStorage.setItem("tabbar-4-iframeSrc", iframeSrc);
					this.goToPage('/pages/tabbar/tabbar-4/tabbar-4-play')

				}).catch(err => {
					console.log("出现错误");
				});


			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: sessionStorage.getItem("tabbar-4-name")
			})
		},
		created() { //此时data已经初始化完成
			this.playList = JSON.parse(sessionStorage.getItem("tabbar-4-playList"));
			this.history = sessionStorage.getItem("tabbar-4-history");

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
