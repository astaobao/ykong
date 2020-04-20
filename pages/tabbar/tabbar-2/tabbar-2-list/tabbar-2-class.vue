<template>
	<view class="main">
		<div class="Content">
			<div class="Week">
				<ul>
					<li class="fl">周日</li>
					<li class="fl">周一</li>
					<li class="fl">周二</li>
					<li class="fl">周三</li>
					<li class="fl">周四</li>
					<li class="fl">周五</li>
					<li class="fl">周六</li>
				</ul>
			</div>
			<div class="Source">
				<!--       节数-->
				<div class="Num fl">
					<ul>
						<li>1</li>
						<li>2</li>
						<li>3</li>
						<li>4</li>
						<li>5</li>
						<li>6</li>
						<li>7</li>
						<li>8</li>
						<li>9</li>
						<li>10</li>
					</ul>
				</div>
				<!--     星期日课程信息-->
				<div class="Sun fl">
					<ul class="KeCheng">
						<li style="border: none;box-shadow: none;width: 50px;"></li>
					</ul>
				</div>
				<!--=========================  -->

				<div v-for="(items, indexs)  in classList" :key="indexs" class="Mon fl">
					<ul class="KeCheng">
						<li v-for="(item, index)  in items" 
						@click="alertTitle(item.title)"
						:key="index" 
						:id="item.text==''?'noClass':'yesClass'">
							<p>{{item.text}}</p>
						</li>

					</ul>
				</div>
				<!-- ========================= -->
				<!--     星期六课程信息-->
				<div class="Sat fl">
					<ul class="KeCheng">
						<!-- 	<li class="Huodong">团日活动</li>
						<li>班会</li> -->
						<li style="border: none;box-shadow: none;width: 50px;"></li>
					</ul>
				</div>
			</div>
		</div>
		<div>
				<!--分享弹出窗 begin-->
				<mt-popup class="sharePopup" v-model="popupVisible" style="background-color:#ffff00;width: 75%;">
					<div ref="divPopup" style="margin: 6px;">
						
					</div>
				</mt-popup>
				<!--分享弹出窗 end-->
			</div>
		
	</view>
</template>


<script>
	export default {
		data() {
			return {
				classList: [],
				popupVisible:false,
		
			}
		},
		methods: {
			alertTitle(title){
				if(title=='')return;
				this.popupVisible=true;
				this.$refs.divPopup.innerHTML=title;
			},
			getDay() { //得到今天日期,返回"2020-04-20"
				let date = new Date();
				let y = date.getFullYear(); //获取完整的年份(4位)		
				let m = date.getMonth(); //获取当前月份(0-11,0代表1月)
				
				if(m<9){//8以下
				m++;
				m="0"+m;//让1->01,2->02	
				}
				let d = date.getDate(); //获取当前日(1-31)
				return y + '-' + m + '-' + d;
			},
			getWeek() { //得到现在是今年的第几周
				let d1 = new Date();
				let d2 = new Date();
				d2.setMonth(0);
				d2.setDate(1);
				let rq = d1 - d2;
				let s1 = Math.ceil(rq / (24 * 60 * 60 * 1000));
				let s2 = Math.ceil(s1 / 7);
				return s2;
				//alert("今天是本年第"+s1+"天，第"+s2+"周");	
			},
			addDate(date, days) { //对时间加减,addDate(new Date("2020-4-20"),+7)
				var d = new Date(date);
				d.setDate(d.getDate() + days);
				var m = d.getMonth() + 1;
				
				if(m<=9){//9以下
				m="0"+m;//让1->01,2->02	
				}
				return d.getFullYear() + '-' + m + '-' + d.getDate();
			},
			judgeWeek(classList) {
				var arr = new Array(); //先声明一维 
				for (let i = 0; i < 5; i++) {
					arr[i] = new Array(i); //在声明二维 
					for (let j = 0; j < 4; j++) {
						let count = i + 1 + j * 8;
						arr[i][j] = classList[count];
					}
				}
				return arr;
			},
			async getClassList(rq) { //传入rq="2020-04-20",返回当前日期这周的课表
				function Pclass(text, title) { //声明对象
					this.text = text;
					this.title = title;
				}
				let classList = [];
				var resp = await this.$axios({
					method: 'post',
					url: 'https://jw.webvpn.jxust.edu.cn/jsxsd/framework/main_index_loadkb.jsp',
					data: this.$qs.stringify({
						rq: rq
					})
				});
               
				let $ = this.$cheerio.load(resp.data, {
					_useHtmlParser2: true
				}); //将获取的整个页面,这里的$就相当于整个页面

				$('tbody tr td').each(function(i, elem) {
					classList.push(new Pclass($(this).find('p').text(),
						$(this).find('p').attr("title") == undefined ? '' : $(this).find('p').attr("title")
					));
				});
                
				return this.judgeWeek(classList);
            }
			
		},
		onLoad() {
			let count = this.getWeek() - 7;
			uni.setNavigationBarTitle({
				title: '课程表 第'+count+'周'
			})
			
		},
		created() {

			if (localStorage.getItem("jxust_classeList_local") != null) {
				//在2020年本是16周时,但=上课算第9周
				let count = this.getWeek() - 7;
				this.classList =
					JSON.parse(localStorage.getItem("jxust_classeList_local"))[count-1];//count从0开始

			} else {
				//先得到今天的结果
				 this.getClassList(this.getDay())
				.then(resp => {
					this.classList =resp;
					});

				 let jxust_classeList_local = new Array();
				let time = "2020-02-24";
				for (let i = 0; i < 21; i++) {
					//循环获取结果保留到本地
					//2020-04-20是第9周,所以2020-2-24是第1周	
					this.getClassList(time)
					.then(resp =>{
						jxust_classeList_local[i] = resp;
					    time = this.addDate(new Date(time), +7);
						if(i==20){
							console.log(jxust_classeList_local[3])
							localStorage.setItem("jxust_classeList_local", JSON.stringify(jxust_classeList_local));				
						}
					});
				
					
				}
			   
			}

		}
	}
</script>

<style scoped>
	.Content {
		margin: 0% auto;
		padding: 0;
		background: #fff;
		text-align: center;
	}

	.Content>div {
		margin-right: auto;
		margin-left: auto;
		text-align: center;
	}

	div,
	form,
	ul,
	ol,
	li,
	span,
	p,
	dl,
	dt,
	dd,
	img {
		margin: 0;
		padding: 0;
		border: 0;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		margin: 0;
		padding: 0;
		font-size: 12px;
		font-weight: normal;
	}

	ul,
	ol,
	li {
		list-style: none
	}

	/*清除列表默认样式*/
	/*设置浮动*/
	.fl {
		float: left
	}

	#yesClass {
		background-color: #55aaff;
	}

	/*课程背景颜色    */

	.content {
		background: url('~@/static/other/backgroud_edu.jpg')no-repeat;
		margin: 0 auto;
		background-size: 100% 100%;
		background-attachment: fixed;
	}

	.Week {

		width: 100%;
		height: 28px;
		background-color: #fff;
		filter: alpha(opacity=60);
		opacity: 0.6;
	}

	.Week ul {
		padding-left: 23px;
	}

	.Week ul li {
		font-family: 微软雅黑;
		font-size: 13px;
		color: #333;
		text-align: center;
		width: 50px;
		line-height: 26px;
	}

	/*设置节次CSS规则*/
	.Source {
		position: absolute;

		width: 100%;

		height: 100%-50px;
		margin-top: 3px;
		background-image: url('~@/static/other/backgroud_edu.jpg');
		background-size: 100% 100%;
		background-attachment: fixed;
	}

	.Num {
		width: 19px;
		/* height: 858px; */
		margin-top: 1px;
		background-color: #fff;
		filter: alpha(opacity=60);
		opacity: 0.6;
	}

	.Num ul li {
		font-family: 微软雅黑;
		font-size: 15px;
		color: #333;
		width: 21px;
		height: 65px;
		line-height: 55px;
		text-align: center;
	}

	/*设置课程CSS规则*/
	/* .Sun ul li{width: 98px;height: 149px;} */
	.Mon,
	Tue,
	Wed,
	Thu,
	Fri,
	Sat,
	Sun ul {
		margin-top: 1px;
	}

	#noClass {
		border: none;
		box-shadow: none;
		width: 45px;
		height: 130px;
	}

	.KeCheng li {
		width: 38px;
		height: 120px;
		border-radius: 10px;
		border: 5px solid #fff;
		margin-bottom: 3px;
		margin-left: 2px;
		box-shadow: inset 0 1px 8px #666;
	}

	.KeCheng li p {
		font-family: 微软雅黑;
		color: #fff;
		font-size: 11px;
		width: 38px;
		height: 120px;
		display: -webkit-box;
		-webkit-box-align: center;
		-webkit-box-pack: center;
	}
</style>
