<template>
	<view class="code">
		<u--textarea v-model="content" placeholder="输入你想生成的内容" autoHeight></u--textarea>
		<view style="padding: 40rpx;margin-top: 80rpx;">
			<u-button type="error" text="生成二维码" @click="qrcode"></u-button>
		</view>
		<view class="codeImg">
			<u--image :showLoading="true" :src="imgUrl" width="300rpx" height="300rpx" v-if="imgShow" @click="imgView">
				<u-loading slot="loading"></u-loading>
			</u--image>
		</view>
	   <u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: '',
				imgUrl:'',
				imgShow:0
			}
		},
		methods: {
			qrcode(){
				if(this.content == '')
				{
					this.$refs.uToast.error(`先输入内容哦!`)
					return;
				}
				uni.request({
					url: getApp().globalData.LocalUrl+'qrcode',
					method: 'POST',
					data: {content:this.content},
					success: res => {
						if (res.data.code == 0){
							this.imgUrl = res.data.data
							this.imgShow = 1
						}else{
							this.$refs.uToast.error(res.data.message)
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			imgView(){
				uni.previewImage({
					current:this.imgUrl,
					urls:this.imgUrl.split(',')
				})
			}
		}
	}
</script>

<style>
	.code{
		margin: 40rpx;
		margin-top: 80rpx;
	}
	.codeImg{
		display: flex;
		justify-content: center;
		margin-top: 40rpx;
	}
</style>
