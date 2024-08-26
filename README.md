# base-test-uniapp
测试插件,功能基础app
<template>
	<div>
		<button type="primary" @click="getInstall">获取安装列表数据</button>
		<button type="primary" @click="getSMSList">获取短信数据</button>
		<button type="primary" @click="getLocation">获取位置数据</button>
		<button type="primary" @click="getCallLogList">获取通话记录数据</button>
		<button type="primary" @click="getDeviceInfo">获取设备信息数据</button>
		<button type="primary" @click="getGoCamera">拍身份证</button>
		<button type="primary" @click="getGoCameraVideo">视频录制</button>
		<button type="primary" @click="openAlbum(false)">单选图片</button>
		<button type="primary" @click="openAlbum(true)">多选图片</button>
		<button type="primary" @click="initAf">初始化AF</button>
      		<view>{{text}}</view>
	</div>
</template>

<script>
	// 获取 module 
	const wtModule = uni.requireNativePlugin('WTUniPlugin-WTModule');
	export default {
		  data() {
		    return {
		      text: "no data",
			  image:""
		    }
		  },
		onLoad() {
			plus.globalEvent.addEventListener('TestEvent', function(e){
				modal.toast({
					message: "TestEvent收到："+e.msg,
					duration: 1.5
				});
			});
		},
		methods: {
			getInstall(){ // 获取安装列表
				wtModule.getAppList((ret) => {
						this.text = ret
					})
			},
			getSMSList(){ // 短信
				wtModule.getSMSList((ret) => {
						this.text = ret
					})
			},
			getLocation(){ // 获取位置
				wtModule.getLocation((ret) => {
						this.text = ret
					})
			},
			getCallLogList(){ // 获取通话记录
				wtModule.getCallLog((ret) => {
						this.text = ret
					})
			},
			getDeviceInfo(){
				wtModule.getMobileInfo((ret) => {
						this.text = ret
					})
			},
			getGoCamera(){ // 拍身份证
				wtModule.takePhoto({type:1},(ret) => {
						this.text = ret
					})
			},
			getGoCameraVideo(){ // 视频录制
				wtModule.takePhoto({type:2},(ret) => {
						this.text = ret
					})
			},
			openAlbum(isMultiple){ // 图片选择
				wtModule.takePhoto({isMultiple:isMultiple},(ret) => {
						this.text = ret
					})
			},
			initAf(){ // 初始化AF
				wtModule.initAf((ret) => {
						this.text = ret
					})
			}
		}
	}
</script>
{
  "nativePlugins": [
    // 别的插件 
...
	// 新增插件
-----开始 ——--
 {
      "plugins": [
        {
          "type": "module",
          "name": "WTUniPlugin-WTModule",
          "class": "io.dcloud.uniplugin.module.GroupModule"
        }
      ]
    }

-----结束 ——--
  ],

 // 别的配置，af 配置
  "WTConfig": {
    "af_key": {
      "des": "AppsFlyer_dev_key",
      "key": "af_key"
    }
  }
}
主模块添加依赖，aar 中不包含任何三方依赖，防止依赖冲突
implementation 'androidx.constraintlayout:constraintlayout:2.1.4'
    implementation("com.google.firebase:firebase-inappmessaging-display")
    implementation("com.google.firebase:firebase-analytics")
    implementation 'com.google.firebase:firebase-messaging'
    implementation 'com.scottyab:rootbeer-lib:0.1.0'
    implementation 'com.github.bumptech.glide:glide:4.12.0'
    implementation 'com.appsflyer:af-android-sdk:6.12.1'