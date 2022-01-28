<template>
	<view class="life">
		<u--textarea v-model="content" placeholder="备忘提醒" autoHeight></u--textarea>
		<u-datetime-picker
				:show="show"
				v-model="remindTime"
				mode="datetime"
				@cancel="remindClose"
				@confirm="remindConfirm"
		></u-datetime-picker>
		<u-datetime-picker
				:show="timeshow"
				v-model="remindTimes"
				mode="time"
				@cancel="remindClose"
				@confirm="remindConfirms"
		></u-datetime-picker>
		<view>
			<u-picker :show="chooseShow" :columns="columns" :defaultIndex=[0] @change="chooseConfirm" @cancel="chooseCance" @confirm="chooseCance"></u-picker>
		</view>
		<view style="margin-top: 20rpx;display: flex;">
			<view style="width: 40%;margin: 0;margin-right: 60rpx;">
				<u-button @click="chooseShow = true" >选择提醒时间</u-button>
			</view>
			<view style="color: #3C9CFF;line-height: 80rpx;">
				<span v-if="everyday" style="margin-right: 20rpx;">每日提醒: </span>
				{{remindDate}}
			</view>
		</view>
		<view style="margin-top: 20rpx;color: #F9AE3D;">
			<u-radio-group
			    v-model="telTo"
			    placement="row"
			    @change="telChange"
			  >
			  		提醒对象 :
			    <u-radio
				  :customStyle="{marginLeft: '40rpx',marginRight:'10rpx'}"
			      v-for="(item, index) in telList"
			      :key="index"
			      :label="item.text"
			      :name="item.name"
				  activeColor="#f9ae3d"
			    >
			    </u-radio>
			  </u-radio-group>
		</view>
		<view style="margin-top: 40rpx;margin-bottom: 80rpx;">
			<u-button type="error" text="保存" @click="lifeSave"></u-button>
			<view style="margin-top:20rpx">
				
			</view>
			<u-button type="info" text="授权" @click="lifeLimit"></u-button>
		</view>
		<view style="margin-bottom: 80rpx; display: flex;" v-for="(listItem,listIndex) in contentList">
			<view class="listLifeItem">
				<view style="border-bottom: 2rpx solid #dadbde;word-break: break-all;padding: 10rpx;">
					{{listItem.content}}
				</view>
				<view class="remindDate" v-if="listItem.remindDate != null">
					提醒时间: {{listItem.remindDate}}
				</view>
				<view class="remindDate" v-if="listItem.everyday == 1">
					每日提醒: {{listItem.day_time}}
				</view>
			</view>
			<view style="padding-top: 40rpx;">
				<u-icon name="close" color="#f56c6c" size="44rpx" @click="lifeDel(listIndex, listItem.id)"></u-icon>
			</view>
		</view>
		<u-toast ref="uToast" />
		<u-tabbar
			:value="1"
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
				content:'',
				contentList:[],
				show: false,
				chooseShow: false,
				timeshow:false,
				columns: [
					['选定提醒时间', '每日提醒']
				],
				remindTimes: '',
				remindTime: Number(new Date()),
				remindDate:'',
				telList: [{
					name: '0',
					disabled: false,
					text: '自己'
			    },
				{
					name: '1',
					disabled: false,
					text: '他(她)'
				},
				{
					name: '2',
					disabled: false,
					text: '全部'
				}
			  ],
			  telTo: '0',
			  everyday:0
			}
		},
		onShow:function(){
			wx.hideHomeButton({
				
			})
		},
		onLoad:function(){
			this.loadmore()
		},
		methods: {
			jump(e){
				if(e == '0'){
					uni.redirectTo({
						url:"/pages/index/index"
					})
				}
				if(e == '2'){
					uni.redirectTo({
						url:"/pages/life/life"
					})
				}
			},
			telChange(n) {
				this.telTo = n;
			  },
			remindClose(){
				this.show = false;
				this.timeshow = false;
			},
			chooseCance(){
				this.chooseShow = false
				if(this.everyday == 0){
					this.show = true;
				}
				if(this.everyday == 1){
					this.timeshow = true;
				}
			},
			chooseConfirm(e){
				const {
					index,
					value
				} = e
				this.everyday = index
			},
			remindConfirm(e){
				this.show = false;
				uni.request({
					url: getApp().globalData.LocalUrl+'timeToDate',
					method: 'POST',
					data: {
						time: e.value
					},
					success: res => {
						if(res.data.code == 0){
							this.remindDate = res.data.data
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			remindConfirms(e){
				this.timeshow = false;
				this.remindDate = e.value
			},
			loadmore() {
				uni.request({
					url: getApp().globalData.LocalUrl+'lifeList',
					method: 'POST',
					data: {
						uid:uni.getStorageSync('UID'),
					},
					success: res => {
						if(res.data.code == 0){
							// let contentData = res.data.data
							// let length = contentData.length;
							// for(let i = 0; i < length; i++){
							// 	this.contentList.push(contentData[i].content)
							// }
							this.contentList = res.data.data;
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			lifeDel(lifeIndex, lifeId){
				uni.request({
					url: getApp().globalData.LocalUrl+'lifeDel',
					method: 'POST',
					data: {
						lifeId: lifeId
					},
					success: res => {
						if(res.data.code == 0){
							this.contentList.splice(lifeIndex, 1)
						}
						this.$refs.uToast.success(`删除成功!`)
					},
					fail: () => {},
					complete: () => {}
				});
			},
			lifeLimit(){
				uni.requestSubscribeMessage({
				  tmplIds: ['jhQCfYwxvs9y5hLEM7m3d6bpMZKBpQ4BpV69W2euNyE'],
				})
			},
			lifeSave(){
				if(this.content == ''){
					this.$refs.uToast.error(`先先输入内容哦!`)
					return;
				}
				if (this.remindDate == ''){
					this.$refs.uToast.error(`提醒时间没选哦!`)
					return;
				}
				uni.requestSubscribeMessage({
				  tmplIds: ['jhQCfYwxvs9y5hLEM7m3d6bpMZKBpQ4BpV69W2euNyE'],
				})
				uni.request({
					url: getApp().globalData.LocalUrl+'life',
					method: 'POST',
					data: {
						uid:uni.getStorageSync('UID'),
						content: this.content,
						remindDate: this.remindDate,
						toOther:this.telTo,
						everyday:this.everyday
					},
					success: res => {
						this.contentList.unshift(res.data.data)
						uni.request({
							url: getApp().globalData.LocalUrl+'sendMsg',
							method: 'POST',
							data: {
								openid:uni.getStorageSync('openid'),
								content: this.content,
								remindDate: this.remindDate,
								toOther:this.telTo,
								everyday:this.everyday
							},
							success: res => {
								this.content = ''
							},
							fail: () => {},
							complete: () => {}
						});
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
	.listLifeItem{
		width: 90%;
		padding: 10rpx;
	}
	.remindDate{
		display: flex;
		justify-content: flex-end;
		color: #6D6D72;
		font-size: 24rpx;
		margin-top: 10rpx;
	}
</style>
