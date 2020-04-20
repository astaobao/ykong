<template>
	
	<view class="main">
		<h1></h1>
		<ul>
			<li v-for="(item, index)  in list" :key="index">

				<div class="single-member effect-2" @click="byUrlPlay(item.playUrl,item.name,index)">
					<div class="member-image">
						<img alt="" v-lazy.container="item.imageUrl">
					</div>
					<div class="member-info">
						<h3>{{item.name}}</h3>
						<h5>{{item.latestOrder}}</h5>
						<!-- <p v-if="item.focus!=''">{{item.focus}}</p> -->
						<!-- <p v-else>查看详情</p> -->
					</div>
				</div>
			</li>
		</ul>


	</view>
</template>

<script>
	import {
		Toast
	} from 'mint-ui';
	import {
		Indicator
	} from 'mint-ui';
	
	export default {
		data() {
			return {
				list: [{
					playUrl: 'https://v.qq.com/x/cover/639agzdh10yu2q2.html',
					name: '扶摇',
					imageUrl: 'https://puui.qpic.cn/vcover_vt_pic/0/639agzdh10yu2q21559732517/220',
					focus: '杨幂阮经天热血逆战守河山',
					latestOrder: '全66集',
					// channelId: '1' //channelId是播放类型,1为电视剧;2电影
				}]

			}
		},
		methods: {
			goToPage(url) {
				if (!url) return;
				uni.navigateTo({
					url
				});
			},
			byUrlPlay(playUrl, name,index) {
				if (playUrl == '') {
					Toast('播放失败,内容为空');
					return;
				}
		     
				Indicator.open(); //加载提示框
				
				let playList = [];

				function play(playUrl, label) {
					this.playUrl = playUrl;
					this.label = label; //第几集
				} //声明一个对象

				//发送get请求,向https://www.lookpian.com搜索数据
				this.$axios.get("http://www.goodpian.com" + playUrl)
					.then(resp => {
						Indicator.close(); //关闭加载提示
						let $ = this.$cheerio.load(resp.data, {
							_useHtmlParser2: true
						}); //将获取的整个页面,这里的$就相当于整个页面
						
						this.list[index].focus = $('div.plot').text().trim(); //获取简介
						
						let hrefLis = $('ul.playlistlink-1 li'); //和jquery里的选择器是一样的
						for (let i = 0; i < hrefLis.length; i++) {
							playList.push(new play(hrefLis.eq(i).find("a").attr("href"), hrefLis.eq(i).find("a").text()))
						}
						sessionStorage.setItem("tabbar-4-name", name); //储存电影名字
						this.getPlayList(playList,index); //将抓取的数据,向下传递

					}).catch(err => {
						Indicator.close(); //关闭加载提示
						Toast('请求失败');

					});

			},
			getPlayList(playList,index) {
				
				sessionStorage.setItem("tabbar-4-video-msg-select", JSON.stringify(this.list[index]));  //储存
           
				if (playList.length == 0) {
					Toast('请求失败');
					return;
				}else { //选择页面
					sessionStorage.setItem("tabbar-4-playList", JSON.stringify(playList));					
					this.goToPage('/pages/tabbar/tabbar-4/tabbar-4-list/tabbar-4-list-select')
				}

			}
		
		},
		created() { //此时data已经初始化完成
			//JSON.stringify()将对象a变成了字符串c，那么我就用JSON.parse()将字符串c还原成对象a。
			this.list = JSON.parse(sessionStorage.getItem("videosList"));
		},
		beforeDestroy() {
			Indicator.close(); //关闭加载提示
		}
	}
</script>

<style>
	.main {
		width: 100%;
		height: 100%;
		background-color: #00aaff;

	}

	li {
	
		list-style-type: none;
		/* 去掉小点*/
	}

	img[lazy=loading] {
		height: 100px;
		margin: auto;
		/* background: url("../assets/lazy.png") no-repeat fixed center; */
	}

	/*= common css to all effects =*/
	.single-member {
		width: 280px;
		float: left;
		margin: 30px 2.5%;
		margin-left: 4%;

		background-color: #aaff7f;
		text-align: center;
		position: relative;
	}

	.member-image img {
		max-width: 100%;
		vertical-align: middle;
	}

	h3 {
		font-size: 24px;
		font-weight: normal;
		margin: 10px 0 0;
		text-transform: uppercase;
	}

	h5 {
		font-size: 13px;
		font-weight: 300;
		margin: 0 0 15px;
		line-height: 22px;
	}

	p {
		font-size: 14px;
		font-weight: 300;
		line-height: 22px;
		padding: 0 30px;
		margin-bottom: 10px;
	}

	/* .social-touch a{display: inline-block; width: 27px; height: 26px; vertical-align: middle; margin: 0 2px; */
	/* background-image: url(../images/social-icons.png); */
	/* background-repeat: no-repeat; opacity: 0.7; transition: 0.3s;} */
	/* .social-touch a:hover{opacity: 1; transition: 0.3s;} */
	/* 	.fb-touch{background-position: 0 0;}
	.tweet-touch{background-position: -35px 0;}
	.linkedin-touch{background-position: -71px 0;}
	.icon-colored .fb-touch{background-position: 0 -27px;}
	.icon-colored .tweet-touch{background-position: -35px -27px;}
	.icon-colored .linkedin-touch{background-position: -71px -27px;} */
	/*= common css to all effects end =*/
	/*= effect-2 css =*/
	.effect-2 {
		max-height: 572px;
		min-height: 302px;
		overflow: hidden;
	}

	.effect-2 h3 {
		padding-top: 7px;
		line-height: 33px;
	}

	.effect-2 img {
		width: 100%;
		height: 100%;
	}

	.effect-2 .member-image {
		border-bottom: 5px solid #55aaff;
		height: 370px;
		/* overflow: hidden; */
		width: 100%;
		transition: 0.4s;
		display: inline-block;
		float: none;
		vertical-align: middle;
	}

	/* .effect-2 .member-info{transition: 0.4s;} */
	/* .effect-2 .member-image img{width: 100%; vertical-align: bottom;} */
	/* .effect-2 .social-touch{background-color: #ffff7f; float: left; left: 0; bottom: 0; overflow: hidden; padding: 5px 0; width: 100%; transition: 0.4s;} */
	/* .effect-2:hover .member-image{height: 81px; transition: 0.4s;} */
	/*= effect-2 css end =*/
</style>
