<template>
	<view class="content" >
		<a href="javascript:void(0);">
			<h1 ref='main'>
				<span>这</span>
				<span>仅</span>
				<span>仅</span>
				<span>是</span> 
				<span>一</span> 
				<span>个</span> 
				<span>开</span>
				<span>始</span>
				<span>。</span>
			</h1>
		</a>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			
			};
		},
		mounted() {
            var h1= this.$refs.main;
			var span = h1.getElementsByTagName("span"),
				spanLen = span.length;
			var arr = [];
			for (var j = 0; j < spanLen; j++) {
				var left = span[j].offsetLeft;
				arr.push(left);
			}
			for (var j = 0; j < spanLen; j++) {
				var left = span[j].offsetLeft;
				var random = "rgb(" + parseInt(Math.random() * 255) + "," + parseInt(Math.random() * 255) + "," + parseInt(Math
					.random() * 255) + ")";
				span[j].style.position = "absolute";
				span[j].style.left = arr[j] + "px";
				span[j].style.color = random;
			}

		},
		methods: {}
	};
</script>

<style scoped>
	.content {
		text-align: center;
		background-color: #ffff7f;
		height: 100%;
		/*height: 400upx;
		margin-top: 200upx; */
	}


	* {
		margin: 0;
		padding: 0;
	}


	uni-page-body {
		position: relative;
		width: 100%;
		height: 100%;
		font-size: 16px;
		font-family: "宋体", Arial;
	}

	h1 {
		font-size: 25px;
		font-family: "宋体", Arial;
		text-align: center;
		position: absolute;
		top: 50%;
		width: 100%;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
		-o-transform: translateY(-50%);
		-ms-transform: translateY(-50%);
	}

	h1 span {
		animation-name: lala;
		animation-timing-function: linear;
		animation-duration: 1s;
		animation-iteration-count: infinite;
		animation-direction: alternate;
		-webkit-animation-name: lala;
		-webkit-animation-timing-function: linear;
		-webkit-animation-duration: 1s;
		-webkit-animation-iteration-count: infinite;
		-webkit-animation-direction: alternate;
		-o-animation-name: lala;
		-o-animation-timing-function: linear;
		-o-animation-duration: 1s;
		-o-animation-iteration-count: infinite;
		-o-animation-direction: alternate;
		-ms-animation-name: lala;
		-ms-animation-timing-function: linear;
		-ms-animation-duration: 1s;
		-ms-animation-iteration-count: infinite;
		-ms-animation-direction: alternate;
		display: inline-block;
		width: 40px;
		background: rgba(187, 187, 187, 0.3);
		border-radius: 50%;
		margin: 35px;
	}

	h1 span:after {
		position: absolute;
		content: "";
		width: 1px;
		height: 1000px;
		border-left: 1px dotted #C3C3C3;
		top: -1000px;
		left: 50%;
	}

	h1 span:nth-child(8):after,
	h1 span:nth-child(14):after {
		display: none;
	}

	@keyframes lala {
		0% {
			top: -20px;
		}

		50% {
			top: 0px;
		}

		100% {
			top: 20px;
		}
	}

	@-webkit-keyframes lala {
		0% {
			top: -20px;
		}

		50% {
			top: 0px;
		}

		100% {
			top: 20px;
		}
	}

	@-o-keyframes lala {
		0% {
			top: -10px;
		}

		50% {
			top: 0px;
		}

		100% {
			top: 10px;
		}
	}

	@-ms-keyframes lala {
		0% {
			top: -10px;
		}

		50% {
			top: 0px;
		}

		100% {
			top: 10px;
		}
	}

	h1 span:nth-child(1) {
		animation-delay: 0s;
		-webkit-animation-delay: 0s;
		-o-animation-delay: 0s;
		-ms-animation-delay: 0s;
	}

	h1 span:nth-child(2) {
		animation-delay: 0.1s;
		-webkit-animation-delay: 0.1s;
		-o-animation-delay: 0.1s;
		-ms-animation-delay: 0.1s;
	}

	h1 span:nth-child(3) {
		animation-delay: 0.2s;
		-webkit-animation-delay: 0.2s;
		-o-animation-delay: 0.2s;
		-ms-animation-delay: 0.2s;
	}

	h1 span:nth-child(4) {
		animation-delay: 0.3s;
		-webkit-animation-delay: 0.3s;
		-o-animation-delay: 0.3s;
		-ms-animation-delay: 0.3s;
	}

	h1 span:nth-child(5) {
		animation-delay: 0.4s;
		-webkit-animation-delay: 0.4s;
		-o-animation-delay: 0.4s;
		-ms-animation-delay: 0.4s;
	}

	h1 span:nth-child(6) {
		animation-delay: 0.5s;
		-webkit-animation-delay: 0.5s;
		-o-animation-delay: 0.5s;
		-ms-animation-delay: 0.5s;
	}

	h1 span:nth-child(7) {
		animation-delay: 0.6s;
		-webkit-animation-delay: 0.6s;
		-o-animation-delay: 0.6s;
		-ms-animation-delay: 0.6s;
	}

	h1 span:nth-child(8) {
		animation-delay: 0.7s;
		-webkit-animation-delay: 0.7s;
		-o-animation-delay: 0.7s;
		-ms-animation-delay: 0.7s;
	}

	h1 span:nth-child(9) {
		animation-delay: 0.8s;
		-webkit-animation-delay: 0.8s;
		-o-animation-delay: 0.8s;
		-ms-animation-delay: 0.8s;
	}

	h1 span:nth-child(10) {
		animation-delay: 0.9s;
		-webkit-animation-delay: 0.9s;
		-o-animation-delay: 0.9s;
		-ms-animation-delay: 0.9s;
	}

	h1 span:nth-child(11) {
		animation-delay: 1s;
		-webkit-animation-delay: 1s;
		-o-animation-delay: 1s;
		-ms-animation-delay: 1s;
	}

	h1 span:nth-child(12) {
		animation-delay: 1.1s;
		-webkit-animation-delay: 1.1s;
		-o-animation-delay: 1.1s;
		-ms-animation-delay: 1.1s;
	}

	h1 span:nth-child(13) {
		animation-delay: 1.2s;
		-webkit-animation-delay: 1.2s;
		-o-animation-delay: 1.2s;
		-ms-animation-delay: 1.2s;
	}

	h1 span:nth-child(14) {
		animation-delay: 1.3s;
		-webkit-animation-delay: 1.3s;
		-o-animation-delay: 1.3s;
		-ms-animation-delay: 1.3s;
	}

	@media screen and (max-width: 640px) {
		h1 span {
			font-size: 25px;
			width: auto;
			margin: 4px;
		}
	}
</style>
