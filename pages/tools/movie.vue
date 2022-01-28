<template>
	<view class="hot">
		<view>
			<u--text type="primary" :text="content"></u--text>
			<u--text type="primary" :text="english"></u--text>
		</view>
		<view class="hotSource" v-if="authorShow">
			----{{author}}
		</view>
		<view style="padding: 40rpx;margin-top: 80rpx;">
			<u-button type="error" text="Next" @click="nextWord"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content:'',
				author:'',
				english:'',
				authorShow:0
			}
		},
		onLoad:function(){
			uni.request({
				url: getApp().globalData.LocalUrl+'movie',
				method: 'POST',
				data: {},
				success: res => {
					if (res.data.code == 0){
						this.content = res.data.data.content
						this.english = res.data.data.english
						this.author = res.data.data.author
						if(this.author != ''){
							this.authorShow = 1
						}else{
							this.authorShow = 0
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
			nextWord(){
				uni.request({
					url: getApp().globalData.LocalUrl+'movie',
					method: 'POST',
					data: {},
					success: res => {
						if (res.data.code == 0){
							this.content = res.data.data.content
							this.english = res.data.data.english
							this.author = res.data.data.author
							if(this.author != ''){
								this.authorShow = 1
							}else{
								this.authorShow = 0
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
