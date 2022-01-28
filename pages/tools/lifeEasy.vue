<template>
	<view class="life">
		<view>
			<u--text type="primary" :text="content"></u--text>
		</view>
		<view style="padding: 40rpx;margin-top: 80rpx;">
			<u-button type="error" text="Next" @click="nextLife"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content:''
			}
		},
		onLoad:function(){
			uni.request({
				url: getApp().globalData.LocalUrl+'lifeEasy',
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
			nextLife(){
				uni.request({
					url: getApp().globalData.LocalUrl+'lifeEasy',
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
	.life{
		margin: 40rpx;
		margin-top: 80rpx;
	}
</style>
