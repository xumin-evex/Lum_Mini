<template>
	<view class="code">
		<u--textarea v-model="content" placeholder="输入抖音链接" autoHeight></u--textarea>
		<view style="margin-top: 80rpx;margin-bottom: 80rpx;">
			<u-button type="error" text="解析视频" @click="qrcode"></u-button>
		</view>
		<view class="codeImg" v-if="imgShow">
			<video style="margin-bottom: 40rpx;width: 100%;" :src="videoUrl" controls></video>
			<u-button type="success" text="视频下载" @click="videoDownload"></u-button>
		</view>
	   <u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: '',
				videoUrl:'',
				imgShow:0
			}
		},
		methods: {
			qrcode(){
				if(this.content == '')
				{
					this.$refs.uToast.error(`先输入链接哦!`)
					return;
				}
				uni.request({
					url: getApp().globalData.LocalUrl+'douyinVideo',
					method: 'POST',
					data: {content:this.content},
					success: res => {
						if (res.data.code == 0){
							this.videoUrl = res.data.data.url
							this.imgShow = 1
						}else{
							this.$refs.uToast.error(res.data.message)
							this.imgShow = 0
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			videoDownload(){
				var VideoUrl = this.videoUrl
				uni.authorize({
				    scope: 'scope.writePhotosAlbum',
				    success() {
						uni.downloadFile({
							url:VideoUrl,
							success: (res) => {
								if(res.statusCode === 200){
									uni.saveVideoToPhotosAlbum({
										filePath: res.tempFilePath,
										success: function () {
											console.log('video save success');
										}
									});
								}
							}
						})
				    }
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
		flex-flow: column;
	}
</style>
