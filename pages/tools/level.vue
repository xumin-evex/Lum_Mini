<template>
	<view class="main">
		<view v-for="(listItem,listIndex) in diglist">
			<u--text type="error" :text="listItem.title"></u--text>
			<u--text lineHeight="50rpx" margin="20rpx 0 0 0" type="primary" :text="listItem.digest"></u--text>
			<u-divider text="分割线" :dot="true"></u-divider>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				diglist:[]
			}
		},
		onLoad:function(){
			uni.request({
				url: getApp().globalData.LocalUrl+'nethot',
				method: 'POST',
				data: {},
				success: res => {
					if (res.data.code == 0){
						this.diglist = res.data.data
					}else{
						this.content = res.data.message
					}
				},
				fail: () => {},
				complete: () => {}
			});
		},
		methods: {
			
		}
	}
</script>

<style>
	.main{
		margin: 40rpx;
	}
	.digest{
		margin-top: 20rpx;
	}
</style>
