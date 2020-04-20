<template>
	<view class="content">
		<div class="dowebok">
			<div class="logo"></div>

			<div class="form-item" style="margin-top: 25px;">
				<input id="userAccount" style="width:95%;" v-model="userAccount" type="text" autocomplete="off" placeholder="一卡通号">

			</div>
			<div class="form-item">
				<input id="userPassword" style="width:95%;" v-model="userPassword" type="password" autocomplete="off" placeholder="登录密码">

			</div>
			<div class="form-item">
				<input id="RANDOMCODE" v-model="RANDOMCODE" style=" width:47%;position:absolute;" autocomplete="off" placeholder="验证码">
				<img :src="imgCodeUrl" @click="changeCode" style="	border-radius: 15px;">
			</div>

			<div class="form-item" style="margin-top: 60px;">
				<button id="submit" @click="jxust()" style="width:95%;">登 录</button>
			</div>

		</div>
		<!-- <div style="margin: 15px;color:rgb(255,255,255);font-size: 5px;">
			1.登录教务系统会验证码,而且每次登陆都有。
			<br />
			2.我本已写好破解验证码的代码（但需要调用java的orc识别）
			在本地无法调用java接口,从而导致无法实现本地识别。
			<br />
			3.本想使用服务器来挂载程序,来破解验证码,简化登录流程,但使用服务器的话,与我初衷不符。
			<br />
			4.因为我就想写一个不使用服务器,源源不断来爬取数据的app
			<br />
			5.所以请放心所有的数据均保留在本地
		</div>
 -->
	</view>
</template>

<script>
	import {
		Toast
	} from 'mint-ui';

	export default {
		data() {
			return {
				userAccount: '',
				userPassword: '',
				RANDOMCODE: '',
				imgCodeUrl: '',
				gotoUrl: '/pages/tabbar/tabbar-2/tabbar-2-list/tabbar-2-class',
			}
		},
		methods: {
			goToPage(url) {
				if (!url) return;
				uni.navigateTo({
					url
				});
			},
			jxust() {
				if (sessionStorage.getItem("jxust_login_session") != null) {
					//已是登录状态,无需重新登录
					Toast({
						message: "您已登录,无需重复登录",
						position: 'top'
					});
              
				} else {

					if (this.userAccount.match(/^[ ]*$/) ||
						this.userPassword.match(/^[ ]*$/) ||
						this.RANDOMCODE.match(/^[ ]*$/)) {
						Toast({
							message: "请完善表单内容",
							position: 'top'
						});
						return;
					}
					this.getEncoded(); //得到encode
				}
			},
			getEncoded() {
				this.$axios({
					method: 'post',
					url: 'https://jw.webvpn.jxust.edu.cn/Logon.do?method=logon&flag=sess',
				}).then(resp => {
					var dataStr = resp.data;
					//以下,是从教务系统复制过来的 
					if (dataStr == "no") {
						return false;
					} else {
						var scode = dataStr.split("#")[0];
						var sxh = dataStr.split("#")[1];
						var code = this.userAccount + "%%%" + this.userPassword;
						var encoded = "";
						for (var i = 0; i < code.length; i++) {
							if (i < 20) {
								encoded = encoded + code.substring(i, i + 1) + scode.substring(0, parseInt(sxh.substring(i, i + 1)));
								scode = scode.substring(parseInt(sxh.substring(i, i + 1)), scode.length);
							} else {
								encoded = encoded + code.substring(i, code.length);
								i = code.length;
							}
						}
						this.login(encoded);
					}
				}).catch(err => {
					console.log(err);

				});

			},
			login(encoded) {

				let list = {
					userAccount: this.userAccount,
					userPassword: '',
					RANDOMCODE: this.RANDOMCODE,
					encoded: encoded
				};
				this.$axios({
					method: 'post',
					url: 'https://jw.webvpn.jxust.edu.cn/Logon.do?method=logon',
					data: this.$qs.stringify(list)
				}).then(resp => {

					let $ = this.$cheerio.load(resp.data, {
						_useHtmlParser2: true
					}); //将获取的整个页面,这里的$就相当于整个页面

					let formId = $('#loginForm'); //和jquery里的选择器是一样的
					
					//formId.length为0代表成功,为1代表失败
					if (formId.length == 1) {
						//登录失败,刷新验证码
						this.RANDOMCODE = '';
						this.changeCode = '';
						this.changeCode(); //刷新cookie
						Toast({
							message: "账号或者密码错误",
							position: 'top'
						});

					} else {
						//登录成功
						localStorage.setItem("jxust_userAccount", this.userAccount);
						localStorage.setItem("jxust_userPassword", window.btoa(this.userPassword));
						sessionStorage.setItem("jxust_login_session", "现已登录");
						this.goToPage(this.gotoUrl);
						//this.goToPage('/pages/tabbar/tabbar-2/tabbar-2-index');
					}

				}).catch(err => {
					console.log(err)

				});

			},
			changeCode() { //刷新验证码
				this.imgCodeUrl = "https://jw.webvpn.jxust.edu.cn/verifycode.servlet?t=" + Math.random();
			}
		},
		onLoad(options) {
			//这里一定onLoad ，只能用onLoad才能接收到url后面的参数
			if (options.gotoUrl != null) {
				this.gotoUrl = options.gotoUrl;
			}
		},
		created() {
			if (localStorage.getItem("jxust_userAccount") != null) {
				//说明登录信息已保留到了本地,直接取出来,就可以了
				this.userAccount = localStorage.getItem("jxust_userAccount");
				this.userPassword = window.atob(localStorage.getItem("jxust_userPassword"));
			}

			this.$axios.get("https://jw.webvpn.jxust.edu.cn/")
				.then(resp => {
					this.changeCode(); //刷新验证码
				}).catch(err => {
					console.log(err)

				});
		}
	}
</script>

<style scoped>
	* {
		margin: 0;
		padding: 0;

	}

	.content {

		position: absolute;
		width: 100%;
		height: 100%;
		background: #fff url('~@/static/other/login/backgroud.jpg');
		background-size: 100% 100%;
		/* background-attachment:fixed; */
	}

	.dowebok {
		/* position: absolute; */
		/* 		left: 50%;
		top: 40%; */
		/* 	width: 430px;
		height: 550px; */
		margin: -200px 0 0 -215px;
		border: 1px solid #fff;
		border-radius: 20px;
		overflow: hidden;
	}

	.logo {
		width: 90%;
		height: 35px;

		/* background-size:100px 50px; */
		/* margin: 30px auto 50px; */
		background:
			/* url('~@/static/other/login/login.png') */
			url('~@/static/other/login/jxedu.png') 0 0 no-repeat;
		background-size: 100% 100%;
		/* background-size:cover; */
	}

	.form-item {
		position: relative;
		width: 360px;
		margin: 5px auto;
		padding-bottom: 15px;
	}

	.form-item input {
		width: 288px;
		height: 48px;
		padding-left: 70px;
		border: 1px solid #fff;
		border-radius: 25px;
		font-size: 18px;
		color: #fff;
		background-color: transparent;
		outline: none;
	}

	.form-item button {
		width: 360px;
		height: 50px;
		border: 0;
		border-radius: 25px;
		font-size: 18px;
		color: #1f6f4a;
		outline: none;
		cursor: pointer;
		background-color: #fff;
	}

	#userAccount {
		background: url('~@/static/other/login/user.png') 13px 14px no-repeat;
	}

	#userPassword {
		background: url('~@/static/other/login/password.png') 13px 11px no-repeat;
	}

	#RANDOMCODE {

		background: url('~@/static/other/login/code.png') 13px 11px no-repeat;

	}

	img {

		height: 48px;
		float: right;
		margin-right: 25px;
		margin-bottom: 25px;
	}

	.tip {
		display: none;
		position: absolute;
		left: 20px;
		top: 52px;
		font-size: 14px;
		color: #f50;
	}

	.reg-bar {
		width: 360px;
		margin: 20px auto 0;
		font-size: 14px;
		overflow: hidden;
	}

	.reg-bar a {
		color: #fff;
		text-decoration: none;
	}

	.reg-bar a:hover {
		text-decoration: underline;
	}

	.reg-bar .reg {
		float: left;
	}

	.reg-bar .forget {
		float: right;
	}

	.dowebok ::-webkit-input-placeholder {
		font-size: 18px;
		line-height: 1.4;
		color: #fff;
	}

	.dowebok :-moz-placeholder {
		font-size: 18px;
		line-height: 1.4;
		color: #fff;
	}

	.dowebok ::-moz-placeholder {
		font-size: 18px;
		line-height: 1.4;
		color: #fff;
	}

	.dowebok :-ms-input-placeholder {
		font-size: 18px;
		line-height: 1.4;
		color: #fff;
	}

	@media screen and (max-width: 500px) {
		* {
			box-sizing: border-box;
		}

		.dowebok {
			position: static;
			width: auto;
			height: auto;
			margin: 0 30px;
			border: 0;
			border-radius: 0;
		}

		.logo {
			margin: 30px auto;
		}

		.form-item {
			width: auto;

		}

	}
</style>
