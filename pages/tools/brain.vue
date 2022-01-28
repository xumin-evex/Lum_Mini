<template>
	<view class="brain">
		<u--text type="primary" :text="quest"></u--text>
		<u--text type="error" margin="20rpx 0 0 0" :text="result" v-if="is_show"></u--text>
		<view class="answer">
			<u--textarea v-model="answer" placeholder="请输入答案" border="none"></u--textarea>
			<view style="height: 20rpx;width: 100%;"></view>
			<u-button type="info" text="确认" @click="brainConfirm"></u-button>
		</view>
		<u-button type="success" text="Answer" @click="seeResult"></u-button>
		<view style="height: 20rpx;width: 100%;"></view>
		<u-button type="error" text="Next" @click="nextBrain"></u-button>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				quest:'',
				result:'',
				answer:'',
				is_show:0
			}
		},
		onLoad:function(){
			uni.request({
				url: getApp().globalData.LocalUrl+'brainTeaser',
				method: 'POST',
				data: {},
				success: res => {
					if (res.data.code == 0){
						this.quest = res.data.data.quest
						this.result = res.data.data.result
					}else{
						this.$refs.uToast.error(res.data.message)
					}
				},
				fail: () => {},
				complete: () => {}
			});
		},
		methods: {
			seeResult(){
				this.is_show = 1;
			},
			nextBrain(){
				this.is_show = 0;
				uni.request({
					url: getApp().globalData.LocalUrl+'brainTeaser',
					method: 'POST',
					data: {},
					success: res => {
						if (res.data.code == 0){
							this.quest = res.data.data.quest
							this.result = res.data.data.result
						}else{
							this.$refs.uToast.error(res.data.message)
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			brainConfirm(){
				if(!this.answer){
					this.$refs.uToast.error('先输入答案哦!')
				}
				uni.request({
					url: getApp().globalData.LocalUrl+'brainCompare',
					method: 'POST',
					data: {
						result:this.result,
						answer:this.answer
					},
					success: res => {
						if (res.data.code == 0){
							this.$refs.uToast.success('答对啦!')
							this.is_show = 1;
						}else{
							this.$refs.uToast.error(res.data.message)
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
	.brain{
		margin: 40rpx;
		margin-top: 80rpx;
	}
	.answer{
		margin-top: 40rpx;
		margin-bottom: 40rpx;
		border: 2rpx solid #f9ae3d;
	}
</style>
