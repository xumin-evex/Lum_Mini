<template>
	<view style="margin: 60rpx 20rpx;border: 2rpx solid #fa3534;">
		<view class="u-demo-block__content" style="padding: 40rpx 20rpx 20rpx;">
			<u-row>
				<u-col span="3">
					<view class="demo-layout bg-purple-light" style="color: #fa3534;">城市名:</view>
				</u-col>
				<u-col span="9">
					<view class="demo-layout bg-purple">{{weather.city}}</view>
				</u-col>
			</u-row>
		</view>
		<u-divider :hairline="true" style="color: #fa3534;"></u-divider>
		<view class="u-demo-block__content" style="padding: 0 20rpx;">
			<u-row>
				<view class="demo-layout bg-purple-light" style="color: #fa3534;margin-bottom: 20rpx;">实时数据:</view>
			</u-row>
			<view class="demo-layout bg-purple-light" style="margin: 14rpx 0;">气温: {{weather.realtime.temperature}}℃</view>
			<view class="demo-layout bg-purple-light" style="margin: 14rpx 0;">湿度: {{weather.realtime.humidity}}</view>
			<view class="demo-layout bg-purple-light" style="margin: 14rpx 0;">天气: {{weather.realtime.info}}</view>
			<view class="demo-layout bg-purple-light" style="margin: 14rpx 0;">风向: {{weather.realtime.direct}}</view>
			<view class="demo-layout bg-purple-light" style="margin: 14rpx 0;">风力: {{weather.realtime.power}}</view>
		</view>
		<u-divider :hairline="true" style="color: #fa3534;"></u-divider>
		<view class="u-demo-block__content" style="padding: 0 20rpx 20rpx 20rpx;">
			<u-row>
				<view class="demo-layout bg-purple-light" style="color: #fa3534;margin-bottom: 20rpx;">今日数据:</view>
			</u-row>
			<view class="demo-layout bg-purple-light" style="margin: 14rpx 0;">日期: {{weather.today.date}}</view>
			<view class="demo-layout bg-purple-light" style="margin: 14rpx 0;">温度: {{weather.today.temperature}}</view>
			<view class="demo-layout bg-purple-light" style="margin: 14rpx 0;">天气: {{weather.today.weather}}</view>
			<view class="demo-layout bg-purple-light" style="margin: 14rpx 0;">风向: {{weather.today.direct}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				weather:''
			}
		},
		onLoad:function(){
			uni.request({
				url: getApp().globalData.LocalUrl+'weather',
				method: 'POST',
				data: {},
				success: res => {
					if (res.data.code == 0){
						this.weather = res.data.data
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

</style>
