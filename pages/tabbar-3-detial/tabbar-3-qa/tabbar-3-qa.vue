<template>
	<view class="content main">
		<mt-field class="textarea" type="textarea" rows="7" :placeholder="introduction1" v-model="textareaMsg1"></mt-field>
		<mt-button type="primary" @click.native="query" style="margin: 10px;margin-left: 0px;">开始查询</mt-button>
		<mt-button type="danger" @click.native="clear" style="margin: 10px;">清空所有</mt-button>

		<div style=" font-size: 14px;color: red;  font-weight: bold;margin:15px;text-align: left;">生成结果</div>
		<mt-field class="textarea" readonly="readonly" id="textarea-text" type="textarea" rows="7" :placeholder="introduction2"
		 v-model="textareaMsg2"></mt-field>
		<mt-button type="primary" style="margin: 10px;" @click="copy">复制结果</mt-button>
	</view>
</template>

<script>
	import {
		Toast
	} from 'mint-ui';
	import { MessageBox } from 'mint-ui';
	export default {
		data() {
			return {
				introduction1: "示例一: ￥iQhg1RJ3jgC￥\n示例二: 幅治这行话￥iQhg1RJ3jgC￥转移至淘宀┡ē【我分享给你了一个淘宝页面，快来看看吧】；或https://m.tb.cn/h.Vg07oY9?sm=ddcb37 點击鏈→接，再选择瀏lan嘂..大开",
				textareaMsg1: '',
				introduction2: '',
				textareaMsg2: ''

			}
		},
		methods: {
			clear() {
				this.textareaMsg1 = '';
				this.textareaMsg2 = '';

			},
			copy() {
				if( this.textareaMsg2==''){
					Toast("内容为空")
					}else{
				var aux = document.createElement("input"); 
				    aux.setAttribute("value", this.textareaMsg2); 
				    document.body.appendChild(aux); 
				    aux.select();
				    document.execCommand("copy"); 
				    document.body.removeChild(aux);
					MessageBox({
					  title: '提示',
					  message: '复制成功,赶快打开淘宝,领取优惠吧!',
					  //showCancelButton: true
					});
                   } 
			
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

			},
			query() {
				if (this.introduction1 == '') {
					Toast("内容不能为空")
					return null;
				}

				//正则匹配字符串里的淘口令
				let reg = /[^\d\i%u]\w{8,15}[^\d\i%u]/;
				let taokl = this.textareaMsg1.match(reg)[0];

				this.$axios.get("https://api.taokouling.com/tkl/tkljm?apikey=hVjXvsorDP&tkl=" + taokl).then(res => {
					var data = res.data;

					if (data.code != 1) {
						Toast("您输入的口令有误或不存在!");
					} else {

						this.getDiscounts(data.url); //将得到的url,转换为淘口令
					}
				}).catch(error => {

					Toast("请求失败,请检查网络是否正常");

				});
			},
			getDiscounts(url) {
				//"https://detail.m.tmall.com/item.htm?id=602659642364&sourc...."
				//"https://a.m.taobao.com/i613484410613.htm?price=17......
				//返回的url有两种格式,判断一下
				console.log("url:  " + url)
				let item = this.getUrlParam(url, 'id') //商品id
				if (item == '') {
					url = url.split('?')[0]; // 我们只要?号前的
					var urlSlashCount = url.split('/').length; // 统计有3斜杠 
					var path = url.split('/')[urlSlashCount - 1].toLowerCase(); //获取数组最后一个
					item = path.split(".")[0].substring(1); //得到商品的Id
				}


				let pid = "mm_1034160111_1395050460_110135500164";
				console.log("item:  " + item)
				//https://api.taokouling.com/tkl/TbkPrivilegeGet?apikey=hVjXvsorDP&itemid=商品ID&siteid=pid第二段&adzoneid=pid第三段&uid=高佣授权用户id
				//this.$axios.get("https://api.taokouling.com/tkl/TbkPrivilegeGet?apikey=hVjXvsorDP&itemid=" + item + "&siteid=1395050460&adzoneid=110135500164&uid=2812931586"
				this.$axios.get("http://www.mengmand.cn/get_taokouling?item=" + item + "&pid=" + pid + "&title=&pic="

				).then(res => {



					//正则匹配字符串里的淘口令
					let reg = /[^\d\i%u]\w{8,15}[^\d\i%u]/;
					let taokl = res.data.match(reg)[0];

					this.textareaMsg2 = "复制这条信息，" + taokl + "，打开👉手机淘宝 👈即可查看优惠信息";


				}).catch(error => {

					console.log(error)
					Toast("请求失败...");

				});

			}

		}
	};
</script>

<style>
	.content {
		text-align: center;
		/* height: 400upx;*/
		margin-top: 20px;
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

				/*这个copy功能失败了
				//import Clipboard from 'clipboard';  //提供复制功能
				 var clipboard = new Clipboard('#textarea-text')
				clipboard.on('success', e => {
					//success("复制成功");//这里你如果引入了elementui的提示就可以用，没有就注释即可
					Toast("复制成功");
					// 释放内存  
					clipboard.destroy()
				})
				clipboard.on('error', e => {
					// 不支持复制  
					console.log('该浏览器不支持自动复制')
					// 释放内存  
					clipboard.destroy()
				})

 */