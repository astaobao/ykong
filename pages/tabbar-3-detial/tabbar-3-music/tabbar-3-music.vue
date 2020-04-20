<template>
	<view class="content alertBox">
		<!-- 
		<iframe src="http://tool.liumingye.cn/music/?name=%E5%90%AC%E5%A6%88%E5%A6%88%E7%9A%84%E8%AF%9D" frameborder="0"
		 scrolling="no" allowfullscreen="true" allowtransparency="true" name='jx_play' width="100%" height="100%"></iframe>
	 -->
<!-- 	<div align="center" style="margin:0 auto;">
	 
	    <div style="width:800px;height:600px;overflow:hidden;border:0px"> 
	         <div style="width:500px;height:800px;margin:-153px 0px 0px -10px;">
	              <iFrame src="http://www.baidu.com" width="800" height="600" scrolling="no">
	             </iFrame>
	         </div> 
	     </div> 
	</div> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				musicName: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			search() {






			}
		}
	}
</script>

<style>
	.content {
		text-align: center;
		/* height: 400upx; */
		/* margin-top: 200upx; */
	}

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
