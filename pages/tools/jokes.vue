<template>
	<view class="hot">
		<view>
			<u--text type="primary" :text="content"></u--text>
		</view>
		<view style="padding: 40rpx;margin-top: 80rpx;">
			<u-button type="error" text="Next" @click="nextJokes"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content:'',
			}
		},
		onLoad:function(){
			uni.request({
				url: getApp().globalData.LocalUrl+'jokes',
				method: 'POST',
				data: {},
				success: res => {
					if (res.data.code == 0){
						this.content = res.data.data
					}else{
						this.content = res.data.message
					}
				},
				fail: () => {},
				complete: () => {}
			});
		},
		methods: {
			nextJokes(){
				uni.request({
					url: getApp().globalData.LocalUrl+'jokes',
					method: 'POST',
					data: {},
					success: res => {
						if (res.data.code == 0){
							this.content = res.data.data
						}else{
							this.content = res.data.message
						}
					},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style>
	.hot{
		margin: 40rpx;
		margin-top: 80rpx;
	}
	.hotSource{
		color: #3c9cff;
		margin-top: 20rpx;
		display: flex;
		justify-content: flex-end;
	}
</style>
