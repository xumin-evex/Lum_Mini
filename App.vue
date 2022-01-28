<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-ui/index.scss";
</style>
<script>
	export default {
		globalData:{
			LocalUrl: 'http://122.112.172.168/api/',
			// LocalUrl: 'http://xm-laravel.cn/api/'
		},
		onLaunch: function() {
			console.log('爱小宝')
		},
		onShow: function() {
			console.log('爱大宝')
		},
		onHide: function() {
			console.log('大宝爱小宝')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
