<script>
	export default {
		onLaunch: function() {
			//监听软键盘高度变化，隐藏或显示tabbar
			uni.onKeyboardHeightChange(res => {
				if (res.height > 0) {
					uni.hideTabBar();
				} else {
					uni.showTabBar();
				}
			})
			
			console.log('App Launch');
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		}
	};
</script>

<style>
	/* app不支持js引入mint-ui.css */
	@import "./static/common/css/mint-ui.css";
	@import "./static/common/css/icon.css";
	@import "./static/common/css/main.css";
	
	

</style>
