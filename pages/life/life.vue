<template>
	<view class="main">
		<u-link href="http://122.112.172.168/timeline" text="网址: http://122.112.172.168/timeline" color="#f56c6c" line-color="#f56c6c" :under-line="true"></u-link>
		<view class="" style="height: 20rpx;">
			
		</view>
		<u-modal :show="modalShow" :content='modalContent' :closeOnClickOverlay="true" confirmColor="#fa3534"
		 @confirm="confirmDel" @cancel="() => modalShow = false" @close="modalClose" showCancelButton></u-modal>
		<u--textarea v-model="desc" placeholder="不说点什么吗?" autoHeight></u--textarea>
		<u-upload
				:fileList="fileList1"
				@afterRead="afterRead"
				@delete="deletePic"
				name="1"
				multiple
				:maxCount="10"
				:previewFullImage="true"
			></u-upload>
		<!-- <u--text mode="link" text="网址: http://122.112.172.168/timeline" href="http://122.112.172.168/timeline" ></u--text> -->
		<view class="flexImage">
			<view class="leftImage">
				<view class="imageBox" v-for="(item, index) in photos" :key="index" v-if="index%2==0">
					<image :src="item.img" mode="widthFix" style="width: 320rpx;" @click="imgView(item.img)"></image>
					<view style="width: 320rpx;">
						<u--text type="info" :text="item.desc"></u--text>						
					</view>
					<view class="iconImage">
						<u-icon name="close-circle-fill" color="#fa3534" size="20"  @click="removeImage(item.id, index)"></u-icon>
					</view>
				</view>
			</view>
			<view class="rightImage">
				<view class="imageBox" v-for="(item, index) in photos" :key="index" v-if="index%2==1">
					<image :src="item.img" mode="widthFix" style="width: 320rpx;" @click="imgView(item.img)"></image>
					<view style="width: 320rpx;">
						<u--text type="info" :text="item.desc"></u--text>
					</view>
					<view class="iconImage">
						<u-icon name="close-circle-fill" color="#fa3534" size="20"  @click="removeImage(item.id, index)"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" @loadmore="addRandomData"></u-loadmore>
		<u-tabbar
			:value="2"
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
				fileList1: [],
				loadStatus: 'loadmore',
				photos: [],
				desc:'',
				page: 1,
				modalShow:false,
				modalContent:'是否确认删除!'
			}
		},
		onLoad() {
			this.addRandomData();
		},
		onShow:function(){
			wx.hideHomeButton({
				
			})
		},
		onReachBottom() {
			this.loadStatus = 'loading';
			this.page++;
			setTimeout(() => {
				this.addRandomData();
				this.loadStatus = 'loadmore';
			}, 200)
		},
		methods: {
			imgView(imageUrl){
				uni.previewImage({
					current:imageUrl,
					urls:imageUrl.split(',')
				})
			},
			addRandomData() {
				this.photoList()
				this.page++;
			},
			removeImage(id, index){
				this.modalShow = true;
				uni.setStorageSync('photoID', id);
				uni.setStorageSync('photoIndex', index);
			},
			modalClose(){
				this.modalShow = false;
			},
			confirmDel(){
				let id = uni.getStorageSync('photoID');
				let index = uni.getStorageSync('photoIndex');
				this.modalShow = false;
				uni.request({
					url: getApp().globalData.LocalUrl+'delImage',
					method: 'POST',
					data: {
						'id': id
					},
					success: res => {
						if(res.data.code == 0){
							this.photos.splice(index, 1);
							uni.removeStorageSync('photoID');
							uni.removeStorageSync('photoIndex');
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			photoList(){
				uni.request({
					url: getApp().globalData.LocalUrl+'imageList',
					method: 'POST',
					data: {
						'page': this.page
					},
					success: res => {
						if(res.data.code == 0){
							if(res.data.data.length > 0){
								for(var i =0; i<res.data.data.length; i++){
									this.photos.push(res.data.data[i])
								}
							}
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			jump(e){
				if(e == '0'){
					uni.redirectTo({
						url:"/pages/index/index"
					})
				}
				if(e == '1'){
					uni.redirectTo({
						url:"/pages/index/life"
					})
				}
			},
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].thumb)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
				uni.redirectTo({
					url:"/pages/life/life"
				})
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: getApp().globalData.LocalUrl+'uploadImage',
						filePath: url,
						name: 'file',
						formData: {
							uid: uni.getStorageSync('UID'),
							desc: this.desc
						},
						success: (res) => {
							let result = JSON.parse(res.data);
							setTimeout(() => {
								resolve(result.data)
							}, 1000)
						}
					});
				})
			},
		}
	}
</script>

<style>
	page {
		background-color: rgb(240, 240, 240);
	}
	.main{
		margin: 40rpx;
	}
	.flexImage{
		display: flex;flex-direction: row;justify-content: space-between;flex-wrap: wrap;margin-top: 10rpx;
	}
	.leftImage,.rightImage{
		width: 330rpx;justify-content: center;display: flex;flex-wrap: wrap;align-content:flex-start
	}
	.iconImage{
		position: absolute;top: 12rpx;right: 12rpx;
	}
	.imageBox{
		position: relative;margin-bottom: 26rpx;
	}
</style>
