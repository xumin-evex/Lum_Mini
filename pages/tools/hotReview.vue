<template>
	<view class="hot">
		<view>
			<u--text type="primary" :text="content"></u--text>
		</view>
		<view class="hotSource" v-if="sourceShow">
			----{{source}}
		</view>
		<view style="padding: 40rpx;margin-top: 80rpx;">
			<u-button type="error" text="Next" @click="nextHot"></u-button>
			<view style="height: 20rpx;width: 100%;"></view>
			<u-button type="success" text="分享" openType="share"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content:'',
				source:'',
				sourceShow:0
			}
		},
		onLoad:function(){
			uni.request({
				url: getApp().globalData.LocalUrl+'hotReview',
				method: 'POST',
				data: {},
				success: res => {
					if (res.data.code == 0){
						this.content = res.data.data.content
						this.source = res.data.data.source
						if(this.source != ''){
							this.sourceShow = 1
						}else{
							this.sourceShow = 0
						}
					}else{
						this.content = res.data.message
					}
				},
				fail: () => {},
				complete: () => {}
			});
		},
		methods: {
			nextHot(){
				uni.request({
					url: getApp().globalData.LocalUrl+'hotReview',
					method: 'POST',
					data: {},
					success: res => {
						if (res.data.code == 0){
							this.content = res.data.data.content
							this.source = res.data.data.source
							if(this.source != ''){
								this.sourceShow = 1
							}else{
								this.sourceShow = 0
							}
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
