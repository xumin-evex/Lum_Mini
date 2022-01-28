<template>
	<view>
		<view class="wrap" :style="{'backgroundImage': 'url('+pageImage+'); height:'+screenHeight}"></view>
		<u-count-down
			:time="time"
			format="HH:mm:ss"
			autoStart
			millisecond
			@change="onTimeChange"
		>
		<view class="time" style="margin: 20rpx 20rpx;">
			<view style="color: #fa3534; margin-right: 20rpx;">First Meeting </view>
			<view class="time__custom" v-if="timeData.days>0?true:false">
				<text class="time__custom__item">{{ timeData.days>=10?timeData.days:'0'+timeData.days}}</text>
			</view>
			<text class="time__doc" v-if="timeData.days>0?true:false">-</text>
			<view class="time__custom" v-if="timeData.hours>0?true:false">
				<text class="time__custom__item">{{ timeData.hours>=10?timeData.hours:'0'+timeData.hours}}</text>
			</view>
			<text class="time__doc" v-if="timeData.hours>0?true:false">:</text>
			<view class="time__custom">
				<text class="time__custom__item">{{ timeData.minutes>=10?timeData.minutes:'0'+timeData.minutes }}</text>
			</view>
			<text class="time__doc">:</text>
			<view class="time__custom">
				<text class="time__custom__item">{{ timeData.seconds>=10?timeData.seconds:'0'+timeData.seconds }}</text>
			</view>
		</view>
		</u-count-down>
		<u-grid
				:border="true"
				col="4"
		>
			<u-grid-item
					v-for="(listItem,listIndex) in list"
					:key="listIndex"
					@click="gridClick"
			>
				<u-icon
						:customStyle="{paddingTop:20+'rpx;color:#303133'}"
						:name="listItem.name"
						:size="22"
				></u-icon>
				<text class="grid-text">{{listItem.title}}</text>
			</u-grid-item>
		</u-grid>
		<view style="padding: 40rpx; margin-top: 500rpx;">
			<view style="border: 2rpx solid #f56c6c;padding: 20rpx;">
			<u--text type="primary" :text="englishNote"></u--text>
			<u--text type="primary" :text="note"></u--text>
			<u-icon name="volume" color="#2979ff" size="28" @click="audioListen"></u-icon>
			</view>
		</view>
		<u-toast ref="uToast" />
		<u-tabbar
			:value="0"
			@change="jump"
			:fixed="true"
			:placeholder="true"
			:safeAreaInsetBottom="true"
		>
			<u-tabbar-item text="首页" icon="home"></u-tabbar-item>
			<u-tabbar-item text="生活" icon="star"></u-tabbar-item>
			<u-tabbar-item text="我的" icon="account"></u-tabbar-item>
		</u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						name: 'info-circle',
						title: '今日天气'
					},
					{
						name: 'lock',
						title: '生活窍门'
					},
					{
						name: 'star',
						title: '网易热评'
					},
					{
						name: 'heart',
						title: '每日语句'
					},
					{
						name: 'eye',
						title: '每日一笑'
					},
					{
						name: 'coupon',
						title: '二维码'
					},
					{
						name: 'play-right',
						title: '抖音解析'
					},
					{
						name: 'play-circle',
						title: '影视经典'
					},
					{
						name: 'level',
						title: '网络热搜'
					},
					{
						name: 'zhihu',
						title: '脑筋急转弯'
					},
				],
				timeData: {},
				time:'0',
				pageImage: '',
				note:'',
				englishNote:'',
				tts:'',
				screenHeight:0,
				uid:''
			}
		},
		onShow:function(){
			uni.request({
				url: getApp().globalData.LocalUrl+'countDown',
				method: 'POST',
				data: {},
				success: res => {
					if (res.data.code == 0){
						this.time = res.data.data * 1000;
					}
				},
				fail: () => {},
				complete: () => {}
			});
		},
		onLoad:function(){
			this.uid = uni.getStorageSync('UID')
			this.screenHeight = uni.getSystemInfoSync().windowHeight
			uni.request({
				url: getApp().globalData.LocalUrl+'everyday',
				method: 'POST',
				data: {},
				success: res => {
					if (res.data.code == 0){
						this.pageImage = res.data.data.imgurl
						this.note = res.data.data.note
						this.englishNote = res.data.data.content
						this.tts = res.data.data.tts
					}
				},
				fail: () => {},
				complete: () => {}
			})
			if(! this.uid){
				uni.login({
					provider:'weixin',
					onlyAuthorize:'true',
					success:function(loginRes){
						uni.request({
							url: getApp().globalData.LocalUrl+'login',
							method: 'POST',
							data: {code:loginRes.code},
							success: res => {
								if(res.data.code == 0){
									uni.setStorageSync('UID', res.data.data.uid);
									uni.setStorageSync('openid', res.data.data.openid);
								}
							},
							fail: () => {},
							complete: () => {}
						})
					}
				})
			}
		},
		methods: {
			jump(e){
				if(e == '1'){
					uni.redirectTo({
						url:"/pages/index/life"
					})
				}
				if(e == '2'){
					uni.redirectTo({
						url:"/pages/life/life"
					})
				}
			},
			onTimeChange(e) {
				this.timeData = e
			},
			audioListen() {
				let innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.autoplay = true;
				innerAudioContext.src = this.tts;
				innerAudioContext.onPlay(() => {
				    console.log('开始播放');
				});
				innerAudioContext.onError((res) => {
				  console.log(res.errMsg);
				  console.log(res.errCode);
				});
			},
			gridClick(index){
				if(index == 0){
					uni.navigateTo({
						url:"/pages/tools/weather"
					})
				}
				if(index == 1){
					uni.navigateTo({
						url:"/pages/tools/lifeEasy"
					})
				}
				if(index == 2){
					uni.navigateTo({
						url:"/pages/tools/hotReview"
					})
				}
				if(index == 3){
					uni.navigateTo({
						url:"/pages/tools/dailyWord"
					})
				}
				if(index == 4){
					uni.navigateTo({
						url:"/pages/tools/jokes"
					})
				}
				if(index == 5){
					uni.navigateTo({
						url:"/pages/tools/qrcode"
					})
				}
				if(index == 6){
					uni.navigateTo({
						url:"/pages/tools/douyin"
					})
				}
				if(index == 7){
					uni.navigateTo({
						url:"/pages/tools/movie"
					})
				}
				if(index == 8){
					uni.navigateTo({
						url:"/pages/tools/level"
					})
				}
				if(index == 9){
					uni.navigateTo({
						url:"/pages/tools/brain"
					})
				}
			},
		},
	}
</script>


<style lang="scss">
	.wrap{
		background-size: cover;
		width: 100%;
		min-height: 100%;
	    position: fixed;
		top: 0;
		left: 0;
		z-index: -1;
		background-repeat: no-repeat;
		opacity: 0.7;
	}
    .grid-text {
        font-size: 14px;
        color: #303133;
        padding: 10rpx 0 20rpx 0rpx;
        /* #ifndef APP-PLUS */
        box-sizing: border-box;
        /* #endif */
    }
	.time {
		@include flex;
		align-items: center;
		justify-content: flex-end;

		&__custom {
				 margin-top: 4px;
				 width: 22px;
				 height: 22px;
				 background-color: $u-primary;
				 border-radius: 4px;
				 /* #ifndef APP-NVUE */
				 display: flex;
				 /* #endif */
				 justify-content: center;
				 align-items: center;
		
			&__item {
				 color: #fff;
				 font-size: 12px;
				 text-align: center;
			 }
		}
	
		&__doc {
			 color: $u-primary;
			 padding: 0px 4px;
		}
	
		&__item {
			 color: #606266;
			 font-size: 15px;
			 margin-right: 4px;
		}
	}
</style>
